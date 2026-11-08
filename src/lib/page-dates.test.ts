import assert from "node:assert/strict";
import path from "node:path";
import { test } from "node:test";
import {
  contentSourceFile,
  isShallowGitRepo,
  lastCommitDate,
  pageSourceFile,
  routeLastModified,
} from "./page-dates.ts";

function endsWithPath(file: string | null, expected: string) {
  return Boolean(
    file?.replaceAll("\\", "/").endsWith(expected.replaceAll("\\", "/")),
  );
}

test("maps routes to their page source", () => {
  assert(
    endsWithPath(
      pageSourceFile("/docs/upgrade"),
      path.join("src", "app", "docs", "upgrade", "page.tsx"),
    ),
  );
  assert.equal(pageSourceFile("/docs/does-not-exist"), null);
});

test("maps docs routes to content files when present", () => {
  assert(
    endsWithPath(
      contentSourceFile("/docs/upgrade"),
      path.join("src", "content", "docs", "upgrade.mdx"),
    ),
  );
  assert.equal(contentSourceFile("/docs/getting-started"), null);
  assert.equal(contentSourceFile("/architecture"), null);
});

test("reads the last commit date of a tracked content file", () => {
  if (isShallowGitRepo()) return;
  const date = lastCommitDate("src/content/docs/upgrade.mdx");
  assert(date instanceof Date && !Number.isNaN(date.getTime()));
});

test("falls back when Git has no content history for the route", () => {
  const fallback = new Date("2026-01-01T00:00:00.000Z");
  assert.equal(routeLastModified("/docs/does-not-exist", fallback), fallback);
  // page.tsx-only routes must not invent dates from metadata edits
  assert.equal(
    routeLastModified("/docs/getting-started", fallback),
    fallback,
  );
});
