import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildSearchIndex,
  extractHeadings,
  extractMdxHeadings,
} from "./search-index.ts";
import { searchDocs } from "./search-index-query.ts";

test("extracts h2/h3 ids and readable text from TSX", () => {
  const headings = extractHeadings(`
    <h2
      id="apply-a-safe-plan"
      className="text-2xl"
    >
      Apply a <code>safe</code> plan
    </h2>
    <h3 id="ci">CI{" "}exit codes</h3>
    <h2 className="x">No id</h2>`);
  assert.deepEqual(headings, [
    { id: "apply-a-safe-plan", text: "Apply a safe plan" },
    { id: "ci", text: "CI exit codes" },
  ]);
});

test("index covers every docs page and their sections", () => {
  const index = buildSearchIndex();
  assert(index.some((entry) => entry.href === "/docs/getting-started"));
  assert(
    index.some((entry) => entry.href === "/docs/upgrade#ownership-manifest"),
  );
  for (const entry of index) assert.match(entry.href, /^\/docs/);
});

test("search requires every word and ranks pages first", () => {
  const index = buildSearchIndex();
  const results = searchDocs(index, "upgrade");
  assert.equal(results[0].href, "/docs/upgrade");
  assert.deepEqual(searchDocs(index, "upgrade zzzz-nothing"), []);
  assert.deepEqual(searchDocs(index, "   "), []);
});

test("extracts MDX headings with rehype-slug ids", () => {
  assert.deepEqual(
    extractMdxHeadings(
      '## Git, backup, and recovery\n\nText\n\n### `--check` exit codes\n\n<h2 id="legacy">Before 2.6.0</h2>',
    ),
    [
      { id: "git-backup-and-recovery", text: "Git, backup, and recovery" },
      { id: "--check-exit-codes", text: "--check exit codes" },
      { id: "legacy", text: "Before 2.6.0" },
    ],
  );
});
