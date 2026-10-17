// Verified public API snapshot, retained when the visitor cannot reach a source.
export const PROJECT_STATS_SNAPSHOT = {
  downloads: 3808,
  downloadsStart: "2026-05-30",
  downloadsEnd: "2026-10-15",
  stars: 13,
  starsCheckedAt: "2026-10-16",
} as const;

export const GITHUB_STATS_URL = "https://api.github.com/repos/FSD-CLI/cli";
const DAY = 86_400_000;

// Disjoint one-year windows keep lifetime totals within npm's range limit as
// the package ages. A missing window must fail the whole total, not undercount it.
export function getDownloadRanges(end: string) {
  const last = Date.parse(`${end}T00:00:00Z`);
  let start = Date.parse(`${PROJECT_STATS_SNAPSHOT.downloadsStart}T00:00:00Z`);
  if (!Number.isFinite(last) || last < start)
    throw new Error("Invalid download range");
  const ranges: { start: string; end: string; url: string }[] = [];
  while (start <= last) {
    const stop = Math.min(last, start + 364 * DAY);
    const from = new Date(start).toISOString().slice(0, 10);
    const to = new Date(stop).toISOString().slice(0, 10);
    ranges.push({
      start: from,
      end: to,
      url: `https://api.npmjs.org/downloads/point/${from}:${to}/create-fsd-architecture`,
    });
    start = stop + DAY;
  }
  return ranges;
}

export function isCount(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

export async function fetchLifetimeDownloads(
  end: string,
  signal?: AbortSignal,
) {
  const ranges = getDownloadRanges(end);
  const counts = await Promise.all(
    ranges.map(async (range) => {
      const response = await fetch(range.url, { signal });
      if (!response.ok) throw new Error("npm statistics unavailable");
      const data = await response.json();
      if (
        !isCount(data.downloads) ||
        data.package !== "create-fsd-architecture" ||
        data.start !== range.start ||
        data.end !== range.end
      )
        throw new Error("Invalid npm statistics");
      return data.downloads;
    }),
  );
  return counts.reduce((total, count) => total + count, 0);
}
