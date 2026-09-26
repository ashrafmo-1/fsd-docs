import type { MetadataRoute } from "next";
import { CLI_RELEASES } from "@/lib/releases";
import { siteConfig } from "@/lib/site";

const routes = [
  "",
  "/docs",
  "/docs/getting-started",
  "/docs/configuration",
  "/docs/slice-generator",
  "/docs/auth-generator",
  "/docs/upgrade",
  "/docs/frameworks/vue",
  "/docs/frameworks/react",
  "/docs/frameworks/nextjs",
  "/docs/frameworks/nuxt",
  "/docs/frameworks/sveltekit",
  "/docs/releases",
  ...CLI_RELEASES.map((release) => `/docs/releases/${release.version}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/docs" ? 0.9 : 0.8,
  }));
}
