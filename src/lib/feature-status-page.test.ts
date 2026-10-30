import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";

const source = fs.readFileSync(
  "src/app/docs/release-readiness/page.tsx",
  "utf8",
);

test("feature status page has no commit hashes or internal QA notes", () => {
  assert.doesNotMatch(source, /\b[0-9a-f]{7,40}\b/, "commit hash");
  assert.doesNotMatch(source, /\bcandidate\b/i, "candidate wording");
  assert.doesNotMatch(source, /\/path\/to\/cli/, "local checkout command");
  assert.doesNotMatch(source, /\bPR ?\d+\b/, "pull request reference");
});

test("every feature section carries a status badge next to its heading", () => {
  const headings = [
    ...source.matchAll(
      /<h2[^>]*id="([^"]+)"[\s\S]*?<\/h2>\s*(<StatusBadge[^>]*>)?/g,
    ),
  ];
  const featureHeadings = headings.filter(([, id]) => id !== "status-overview");
  assert(featureHeadings.length >= 4);
  for (const [heading, id, badge] of featureHeadings) {
    assert(badge, `${id}: missing status badge`);
    assert.doesNotMatch(
      heading.split("</h2>")[0],
      /StatusBadge/,
      `${id}: badge inside heading`,
    );
  }
});
