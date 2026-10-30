import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const cache = new Map<string, Date | null>();

/** Source file that renders a route, e.g. "/docs/upgrade" -> src/app/docs/upgrade/page.tsx. */
export function pageSourceFile(route: string, root = process.cwd()) {
  const file = path.join(root, "src/app", route, "page.tsx");
  return fs.existsSync(file) ? file : null;
}

/**
 * Date of the last commit that touched a file. Returns null outside a Git
 * checkout (or for an uncommitted file) so callers can fall back.
 */
export function lastCommitDate(file: string): Date | null {
  if (cache.has(file)) return cache.get(file) ?? null;
  let date: Date | null = null;
  try {
    const output = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", file],
      {
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
  const file = pageSourceFile(route);
  return (file && lastCommitDate(file)) || fallback;
}
