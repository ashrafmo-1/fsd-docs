import fs from "node:fs";
import path from "node:path";
import { DOCS_NAV_ITEMS } from "./docs-navigation.ts";
import type { SearchEntry } from "./search-index-query.ts";

export type { SearchEntry };

const HEADING = /<h([23])\b[^>]*?\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;

function headingText(markup: string) {
  return markup
    .replace(/\{"\s*"\}/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/[{}]/g, "")
    .replace(/&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Section headings with literal ids and text from a page's TSX source. */
export function extractHeadings(source: string) {
  return [...source.matchAll(HEADING)]
    .map(([, , id, markup]) => ({ id, text: headingText(markup) }))
    .filter((heading) => heading.text && !heading.text.includes("("));
}

/** Runs at build time in the static docs layout; reads page sources from disk. */
export function buildSearchIndex(root = process.cwd()): SearchEntry[] {
  return DOCS_NAV_ITEMS.flatMap((item) => {
    const page: SearchEntry = {
      href: item.href,
      title: item.label,
      page: "",
      description: item.description,
    };
    const file = path.join(root, "src/app", item.href, "page.tsx");
    if (!fs.existsSync(file)) return [page];
    const sections = extractHeadings(fs.readFileSync(file, "utf8")).map(
      (heading): SearchEntry => ({
        href: `${item.href}#${heading.id}`,
        title: heading.text,
        page: item.label,
        description: "",
      }),
    );
    return [page, ...sections];
  });
}
