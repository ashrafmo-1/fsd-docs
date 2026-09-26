import type { MetadataRoute } from "next";
import { DOCS_NAV_ITEMS } from "@/lib/docs-navigation";
import { CLI_RELEASES } from "@/lib/releases";
import { siteConfig } from "@/lib/site";

const routes = [
  "",
  ...DOCS_NAV_ITEMS.map((item) => item.href),
  ...CLI_RELEASES.map((release) => `/docs/releases/${release.version}`),
];

const lastModified = new Date(`${CLI_RELEASES[0].date}T00:00:00.000Z`);

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/docs" ? 0.9 : 0.8,
  }));
}
