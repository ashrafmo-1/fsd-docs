import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security-headers";

// Files under /icons and /og carry a version suffix in their name,
// so they can be cached forever; ship a new filename to bust the cache.
const immutableAssetHeaders = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders({
          dev: process.env.NODE_ENV === "development",
        }),
      },
      { source: "/icons/:path*", headers: immutableAssetHeaders },
      { source: "/og/:path*", headers: immutableAssetHeaders },
    ];
  },
  async redirects() {
    return [
      // 1.0.x had no release notes and no longer has its own page.
      {
        source: "/docs/releases/:version(1\\.0\\.\\d+)",
        destination: "/docs/releases#version-1",
        permanent: true,
      },
    ];
  },
};

// Docs content can live in src/content/docs/*.mdx. Plugins are referenced by
// name so Turbopack can load them.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
