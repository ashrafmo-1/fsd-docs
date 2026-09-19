import assert from "node:assert/strict";

// Run against an already-started production build; never starts or stops servers.
const origin = process.env.DOCS_TEST_ORIGIN || "http://localhost:3105";
const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200, "sitemap");
const sitemap = await sitemapResponse.text();
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => new URL(match[1]).pathname,
);
assert(paths.length > 0, "sitemap must not be empty");
const pages = new Map();
for (const path of paths) {
  const response = await fetch(`${origin}${path}`);
  assert.equal(response.status, 200, path);
  pages.set(path, await response.text());
}
for (const [path, html] of pages) {
  for (const match of html.matchAll(/href="(\/[^"?#]*)"/g)) {
    const target = match[1];
    if (target.startsWith("/_next") || /\.[a-z]+$/.test(target)) continue;
    assert(pages.has(target), `${path}: missing sitemap page ${target}`);
  }
}
const releases = paths.filter((path) => path.startsWith("/docs/releases/"));
assert(releases.length > 0, "release archive must not be empty");
for (const path of releases) {
  assert(pages.get(path).includes('id="use-this-version"'), `${path}: anchor`);
  const version = path.split("/").at(-1);
  assert(pages.get(path).includes(`create-fsd-architecture@${version}`), path);
}
assert.equal((await fetch(`${origin}/docs/releases/99.0.0`)).status, 404);
assert(pages.get("/").includes("Latest release:"), "homepage release link");
console.log(
  `Passed: ${paths.length} sitemap pages, internal page links, ${releases.length} releases, version commands, section anchors, and unknown-release 404.`,
);
