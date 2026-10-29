import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
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

export default nextConfig;
