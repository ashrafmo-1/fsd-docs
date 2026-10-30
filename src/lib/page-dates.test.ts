import assert from "node:assert/strict";
import { test } from "node:test";
import {
  lastCommitDate,
  pageSourceFile,
  routeLastModified,
} from "./page-dates.ts";

test("maps routes to their page source", () => {
  assert(
    pageSourceFile("/docs/upgrade")?.endsWith("src/app/docs/upgrade/page.tsx"),
  );
  assert.equal(pageSourceFile("/docs/does-not-exist"), null);
});

test("reads the last commit date of a tracked page", () => {
  const date = lastCommitDate("src/app/docs/upgrade/page.tsx");
  assert(date instanceof Date && !Number.isNaN(date.getTime()));
});

test("falls back when Git has no history for the route", () => {
  const fallback = new Date("2026-01-01T00:00:00.000Z");
  assert.equal(routeLastModified("/docs/does-not-exist", fallback), fallback);
});
