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
  // Per-language llms.txt (I18N-08): one static route per translated locale.
  "/ar/llms.txt",
  "/ru/llms.txt",
  "/zh-CN/llms.txt",
  "/es/llms.txt",
  "/pt-BR/llms.txt",
  "/ja/llms.txt",
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

// Pages that override openGraph/twitter must not drop the share image.
// Locale pages use localizedOpenGraph (I18N-08) for the same reason.
for (const page of [
  "architecture",
  "capabilities",
  "ar",
  "ru",
  "zh-CN",
  "es",
  "pt-BR",
  "ja",
]) {
  const html = fs.readFileSync(`.next/server/app/${page}.html`, "utf8");
  for (const tag of [
    '<meta property="og:image" content="https://fsdcli.me/og/fsd-cli-og-1200x630-v1.png"',
    '<meta property="og:image:width" content="1200"',
    '<meta property="og:image:height" content="630"',
    '<meta name="twitter:image" content="https://fsdcli.me/og/fsd-cli-og-1200x630-v1.png"',
    '<meta name="twitter:image:alt"',
  ]) {
    assert(html.includes(tag), `/${page}: missing ${tag}`);
  }
}

console.log(
  `Passed: ${new Set(requiredStaticRoutes).size} landing, docs, metadata, and LLM routes are prerendered statically.`,
);
