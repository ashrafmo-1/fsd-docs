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
};

export default nextConfig;
