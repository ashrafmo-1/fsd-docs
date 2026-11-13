import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const cache = new Map<string, Date | null>();
let shallowRepo: boolean | null = null;

/** True when history is truncated (e.g. `git clone --depth 1`). */
export function isShallowGitRepo(root = process.cwd()): boolean {
  if (shallowRepo !== null) return shallowRepo;
  try {
    const output = execFileSync(
      "git",
      ["rev-parse", "--is-shallow-repository"],
      {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      },
    ).trim();
    shallowRepo = output === "true";
  } catch {
    shallowRepo = false;
  }
  return shallowRepo;
}

/** Source file that renders a route, e.g. "/docs/upgrade" -> src/app/docs/upgrade/page.tsx. */
export function pageSourceFile(route: string, root = process.cwd()) {
  const file = path.join(root, "src/app", route.replace(/^\//, ""), "page.tsx");
  return fs.existsSync(file) ? file : null;
}

/**
 * Content file for a docs route when it lives outside page.tsx
 * (e.g. "/docs/upgrade" -> src/content/docs/upgrade.mdx).
 *
 * Dates must not come from page.tsx: metadata/SEO PRs touch those files and
 * would reset "last updated" / sitemap lastmod / article:modified_time.
 */
export function contentSourceFile(route: string, root = process.cwd()) {
  if (!route.startsWith("/docs/")) return null;
  const slug = route.slice("/docs/".length);
  if (!slug || slug.includes("..")) return null;
  const file = path.join(root, "src/content/docs", `${slug}.mdx`);
  return fs.existsSync(file) ? file : null;
}

/**
 * Date of the last commit that touched a file. Returns null outside a Git
 * checkout, for an uncommitted file, or in a shallow clone (where every file
 * often reports HEAD's date).
 */
export function lastCommitDate(
  file: string,
  root = process.cwd(),
): Date | null {
  if (cache.has(file)) return cache.get(file) ?? null;
  if (isShallowGitRepo(root)) {
    cache.set(file, null);
    return null;
  }
  let date: Date | null = null;
  try {
    const output = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", file],
      {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      },
    ).trim();
    if (output) date = new Date(output);
  } catch {
    date = null;
  }
  cache.set(file, date);
  return date;
}

/** When a route's content last changed, or `fallback` if Git cannot tell. */
export function routeLastModified(route: string, fallback: Date) {
  const file = contentSourceFile(route);
  return (file && lastCommitDate(file)) || fallback;
}
