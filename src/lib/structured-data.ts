import { CLI_RELEASES } from "./releases.ts";
import { siteConfig } from "./site.ts";

export { jsonLdScript } from "./json-ld.ts";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function softwareJsonLd() {
  const latest =
    CLI_RELEASES.find((release) => release.status === "latest") ??
    CLI_RELEASES[0];
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    alternateName: siteConfig.packageName,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, macOS, Linux",
    softwareVersion: latest.version,
    datePublished: latest.date,
    description: siteConfig.description,
    url: siteConfig.url,
    downloadUrl: siteConfig.npm,
    codeRepository: siteConfig.repositories.cli,
    license: "https://opensource.org/licenses/MIT",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}
