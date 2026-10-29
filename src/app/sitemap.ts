import type { MetadataRoute } from "next";
import { DOCS_NAV_ITEMS } from "@/lib/docs-navigation";
import { routeLastModified } from "@/lib/page-dates";
import { CLI_RELEASES } from "@/lib/releases";
import { siteConfig } from "@/lib/site";

const latestReleaseDate = new Date(`${CLI_RELEASES[0].date}T00:00:00.000Z`);

const pages = [
  "",
  "/architecture",
  "/capabilities",
  ...DOCS_NAV_ITEMS.map((item) => item.href),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pageEntries = pages.map((route) => ({
    url: `${siteConfig.url}${route}`,
    // The home page and the release archive change with every release.
    lastModified:
      route === "" || route === "/docs/releases"
        ? latestReleaseDate
        : routeLastModified(route || "/", latestReleaseDate),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : route === "/docs" ? 0.9 : 0.8,
  }));

  // Release notes are fixed once published; legacy ones matter least.
  const releaseEntries = CLI_RELEASES.map((release) => ({
    url: `${siteConfig.url}/docs/releases/${release.version}`,
    lastModified: new Date(`${release.date}T00:00:00.000Z`),
    changeFrequency: "yearly" as const,
    priority: release.status === "legacy" ? 0.3 : 0.6,
  }));

  return [...pageEntries, ...releaseEntries];
}
