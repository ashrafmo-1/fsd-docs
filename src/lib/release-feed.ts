import { CLI_RELEASES } from "./releases.ts";
import { siteConfig } from "./site.ts";

export const RELEASE_FEED_PATH = "/docs/releases/feed.xml";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** RSS 2.0 feed of CLI releases that have release notes, newest first. */
export function getReleaseFeed() {
  const releases = CLI_RELEASES.filter(
    (release) => release.sections.length > 0,
  );
  const items = releases.map((release) => {
    const url = `${siteConfig.url}/docs/releases/${release.version}`;
    const notes = release.sections
      .map(
        (section) =>
          `<h3>${escapeXml(section.title)}</h3><ul>${section.items
            .map((item) => `<li>${escapeXml(item)}</li>`)
            .join("")}</ul>`,
      )
      .join("");
    return [
      "<item>",
      `<title>FSD CLI ${release.version}</title>`,
      `<link>${url}</link>`,
      `<guid isPermaLink="true">${url}</guid>`,
      `<pubDate>${new Date(`${release.date}T00:00:00.000Z`).toUTCString()}</pubDate>`,
      `<description>${escapeXml(release.summary)}</description>`,
      `<content:encoded><![CDATA[<p>${escapeXml(release.summary)}</p>${notes}]]></content:encoded>`,
      "</item>",
    ].join("");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">',
    "<channel>",
    "<title>FSD CLI releases</title>",
    `<link>${siteConfig.url}/docs/releases</link>`,
    `<atom:link href="${siteConfig.url}${RELEASE_FEED_PATH}" rel="self" type="application/rss+xml"/>`,
    "<description>New versions of create-fsd-architecture and what changed in each.</description>",
    "<language>en</language>",
    releases[0]
      ? `<lastBuildDate>${new Date(`${releases[0].date}T00:00:00.000Z`).toUTCString()}</lastBuildDate>`
      : "",
    ...items,
    "</channel>",
    "</rss>",
  ].join("\n");
}
