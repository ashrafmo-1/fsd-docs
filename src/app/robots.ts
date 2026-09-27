import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/dashboard" },
      { userAgent: "GPTBot", allow: "/", disallow: "/dashboard" },
      { userAgent: "ClaudeBot", allow: "/", disallow: "/dashboard" },
      { userAgent: "PerplexityBot", allow: "/", disallow: "/dashboard" },
      { userAgent: "Google-Extended", allow: "/", disallow: "/dashboard" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
