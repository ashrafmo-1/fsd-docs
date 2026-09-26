import assert from "node:assert/strict";
import fs from "node:fs";

const manifestPath = ".next/prerender-manifest.json";
assert(fs.existsSync(manifestPath), "run next build before check:static");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const sitemap = fs.readFileSync(".next/server/app/sitemap.xml.body", "utf8");
const sitemapPaths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => new URL(match[1]).pathname,
);
const requiredStaticRoutes = [
  "/",
  ...sitemapPaths,
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/llms-full.txt",
];

for (const route of new Set(requiredStaticRoutes)) {
  const prerendered = manifest.routes[route];
  assert(prerendered, `${route}: missing from prerender manifest`);
  assert.equal(prerendered.compute, "static", `${route}: must be static`);
  assert.equal(
    prerendered.initialRevalidateSeconds,
    false,
    `${route}: must not require runtime revalidation`,
  );
}

assert.equal(
  manifest.dynamicRoutes["/docs/releases/[version]"]?.fallback,
  false,
  "release routes must only use build-time generateStaticParams values",
);

console.log(
  `Passed: ${new Set(requiredStaticRoutes).size} landing, docs, metadata, and LLM routes are prerendered statically.`,
);
