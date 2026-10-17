import assert from "node:assert/strict";
import { mock, test } from "node:test";
import {
  fetchLifetimeDownloads,
  getDownloadRanges,
  isCount,
} from "./project-stats.ts";

test("lifetime ranges cover every day exactly once across yearly boundaries", () => {
  const ranges = getDownloadRanges("2028-06-01");
  assert.equal(ranges[0].start, "2026-05-30");
  assert.equal(ranges.at(-1)?.end, "2028-06-01");
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    assert(Date.parse(range.end) - Date.parse(range.start) <= 364 * 86_400_000);
    if (i)
      assert.equal(
        Date.parse(range.start) - Date.parse(ranges[i - 1].end),
        86_400_000,
      );
  }
  assert.throws(() => getDownloadRanges("2026-05-29"));
  assert.throws(() => getDownloadRanges("invalid"));
});

test("downloads require every complete matching npm window; partial data is never a total", async () => {
  const ranges = getDownloadRanges("2027-06-01");
  const fixtures = ranges.map((range, i) => ({
    package: "create-fsd-architecture",
    start: range.start,
    end: range.end,
    downloads: i + 10,
  }));
  let failedWindow = false;
  let wrongPackage = false;
  const fetchMock = mock.method(
    globalThis,
    "fetch",
    async (input: Parameters<typeof fetch>[0]) => {
      const index = ranges.findIndex((range) => range.url === String(input));
      if (failedWindow && index === 1)
        return new Response("unavailable", { status: 503 });
      const fixture = fixtures[index];
      return Response.json({
        ...fixture,
        ...(wrongPackage ? { package: "other-package" } : {}),
      });
    },
  );
  try {
    assert.equal(await fetchLifetimeDownloads("2027-06-01"), 21);
    failedWindow = true;
    await assert.rejects(fetchLifetimeDownloads("2027-06-01"));
    failedWindow = false;
    wrongPackage = true;
    await assert.rejects(fetchLifetimeDownloads("2027-06-01"));
  } finally {
    fetchMock.mock.restore();
  }
});

test("only finite non-negative integer counts can replace verified statistics", () => {
  assert(isCount(0));
  assert(isCount(3808));
  for (const value of [-1, NaN, Infinity, 2.5, "13", null])
    assert(!isCount(value));
});
