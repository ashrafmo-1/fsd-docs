import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = [
  "",
  "/docs",
  "/docs/getting-started",
  "/docs/configuration",
  "/docs/slice-generator",
  "/docs/auth-generator",
  "/docs/frameworks/vue",
  "/docs/frameworks/nuxt",
  "/docs/frameworks/sveltekit",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/docs" ? 0.9 : 0.8,
  }));
}
