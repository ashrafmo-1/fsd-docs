import assert from "node:assert/strict";
import { mock, test } from "node:test";
import {
  fetchGitHubStars,
  fetchLifetimeDownloads,
  formatStarCount,
  GITHUB_STATS_URL,
  getDownloadRanges,
  isCount,
  PROJECT_STATS_SNAPSHOT,
  parseGitHubRepo,
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

test("parseGitHubRepo extracts owner and repo from valid GitHub URLs", () => {
  assert.deepEqual(parseGitHubRepo("https://github.com/FSD-CLI/cli"), {
    owner: "FSD-CLI",
    repo: "cli",
  });
  assert.deepEqual(parseGitHubRepo("https://github.com/FSD-CLI/cli.git/"), {
    owner: "FSD-CLI",
    repo: "cli",
  });
  assert.equal(parseGitHubRepo("https://example.com/FSD-CLI/cli"), null);
  assert.equal(parseGitHubRepo("not-a-url"), null);
});

test("formatStarCount formats integers and compact thousands, falling back to snapshot", () => {
  assert.equal(formatStarCount(13), "13");
  assert.equal(formatStarCount(1_000), "1k");
  assert.equal(formatStarCount(1_450), "1.4k");
  assert.equal(formatStarCount(1_460), "1.5k");
  assert.equal(
    formatStarCount(Number.NaN),
    PROJECT_STATS_SNAPSHOT.stars.toString(),
  );
});

test("fetchGitHubStars deduplicates concurrent calls and validates repository payload", async () => {
  let calls = 0;
  let status = 403;
  let payload: unknown = { full_name: "FSD-CLI/cli", stargazers_count: 42 };

  const fetchMock = mock.method(
    globalThis,
    "fetch",
    async (input: Parameters<typeof fetch>[0]) => {
      assert.equal(String(input), GITHUB_STATS_URL);
      calls += 1;
      await new Promise((resolve) => setTimeout(resolve, 10));
      return new Response(JSON.stringify(payload), { status });
    },
  );

  try {
    await assert.rejects(fetchGitHubStars());

    status = 200;
    payload = { full_name: "other/repo", stargazers_count: 42 };
    await assert.rejects(fetchGitHubStars());

    payload = { full_name: "FSD-CLI/cli", stargazers_count: 42 };
    const [a, b] = await Promise.all([fetchGitHubStars(), fetchGitHubStars()]);
    assert.equal(a, 42);
    assert.equal(b, 42);

    const cached = await fetchGitHubStars();
    assert.equal(cached, 42);
    assert.equal(calls, 3);
  } finally {
    fetchMock.mock.restore();
  }
});
