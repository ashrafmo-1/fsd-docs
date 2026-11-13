import { siteConfig } from "./site";

// Next.js replaces nested metadata objects instead of merging them, so any
// page that defines its own openGraph or twitter must repeat the image.
export const defaultOgImage = {
  url: "/og/fsd-cli-og-1200x630-v1.png",
  width: 1200,
  height: 630,
  alt: "FSD CLI logo",
} as const;

/**
 * Open Graph for a translated quick-start page. A page-level openGraph
 * replaces the layout's whole object, so locale pages must repeat the
 * share image, site name, and type themselves — without this they ship
 * with no og:image, og:site_name, or og:type (I18N-08).
 */
export function localizedOpenGraph(locale: string, url: string) {
  return {
    type: "website" as const,
    locale,
    url,
    siteName: siteConfig.name,
    images: [defaultOgImage],
  };
}
