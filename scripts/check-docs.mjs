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
  assert(html.includes('id="support"'), `${path}: support section`);
  assert(html.includes('id="support-dialog"'), `${path}: donation dialog`);
  assert(html.includes('aria-haspopup="dialog"'), `${path}: donation trigger`);
  assert(
    html.includes('href="https://buymeacoffee.com/ashrafqopiah"'),
    `${path}: donation link`,
  );
  assert(html.includes("ashrafmo-1"), `${path}: InstaPay username`);
  for (const match of html.matchAll(/href="(\/[^"?#]*)"/g)) {
    const target = match[1];
    if (target.startsWith("/_next") || /\.[a-z]+$/.test(target)) continue;
    assert(pages.has(target), `${path}: missing sitemap page ${target}`);
  }
}
const releases = paths.filter((path) => path.startsWith("/docs/releases/"));
for (const framework of ["react", "nextjs", "vue", "nuxt", "sveltekit"]) {
  const path = `/docs/frameworks/${framework}`;
  assert(pages.has(path), `${framework}: framework page in sitemap`);
  assert(
    pages.get("/docs").includes(`href="${path}"`),
    `${framework}: overview link`,
  );
  assert(
    pages.get(path).includes('id="default-stack"'),
    `${framework}: stack section`,
  );
  if (["react", "nextjs"].includes(framework)) {
    assert(
      pages.get(path).includes('id="template-source"'),
      `${framework}: source section`,
    );
  }
}
assert(releases.length > 0, "release archive must not be empty");
assert(releases.includes("/docs/releases/2.6.0"), "2.6.0 release in sitemap");
assert(
  /Version\s*(?:<!--.*?-->\s*)*2\.6\.0/.test(pages.get("/docs")),
  "documentation introduction shows the current release",
);
for (const path of ["/", "/docs/releases"]) {
  assert(
    pages.get(path).includes('href="/docs/releases/2.6.0"'),
    `${path}: current release link`,
  );
}
assert(pages.has("/docs/upgrade"), "upgrade guide in sitemap");
assert(
  pages.get("/docs").includes('href="/docs/upgrade"'),
  "upgrade guide on documentation overview",
);
for (const anchor of [
  "inspect-before-applying",
  "understand-the-plan",
  "ownership-manifest",
  "legacy-projects",
  "ci-exit-codes",
  "git-backup-and-recovery",
]) {
  assert(
    pages.get("/docs/upgrade").includes(`id="${anchor}"`),
    `upgrade: ${anchor}`,
  );
}
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
