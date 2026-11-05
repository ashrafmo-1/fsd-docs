import type { Metadata } from "next";
import { lastCommitDate, pageSourceFile } from "@/lib/page-dates";
import { siteConfig } from "@/lib/site";

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

export const HOME_SHARE_TITLE =
  "FSD CLI — Build Scalable Frontends from Day One";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Canonical path, e.g. `/docs/getting-started`. */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Extra alternates (languages, RSS, …). `canonical` is always `path`. */
  alternates?: Omit<NonNullable<Metadata["alternates"]>, "canonical">;
  /** Absolute share title; defaults to `${title} | FSD CLI`. */
  shareTitle?: string;
  locale?: string;
};

/**
 * Full page metadata including openGraph + twitter.
 * Nested OG/Twitter objects replace the root layout values entirely, so every
 * field needed for share cards must be set here.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  alternates,
  shareTitle = `${title} | ${siteConfig.name}`,
  locale = "en_US",
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      ...alternates,
      canonical: path,
    },
    openGraph: {
      type,
      locale,
      url: path,
      siteName: siteConfig.name,
      title: shareTitle,
      description,
      images: [defaultOgImage],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [defaultOgImage],
    },
  };
}

/**
 * Docs/release pages: article OG type + last-commit modified time when available.
 * Only set publishedTime when the caller provides it (e.g. release notes); never
 * treat the latest edit as the original publication date.
 */
export function docsPageMetadata(
  input: Omit<PageMetadataInput, "type"> & { type?: "article" },
): Metadata {
  const file = pageSourceFile(input.path);
  const modified = file ? lastCommitDate(file) : null;
  const modifiedTime =
    input.modifiedTime ?? (modified ? modified.toISOString() : undefined);

  return pageMetadata({
    ...input,
    type: "article",
    publishedTime: input.publishedTime,
    modifiedTime,
  });
}
