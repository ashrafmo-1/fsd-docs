import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

// Pages that describe the current CLI must read the version from
// LATEST_CLI_RELEASE instead of naming an old npm release as current.
const CURRENT_STATE_PAGES = [
  "src/app/docs/ai-agent-skill/page.tsx",
  "src/app/docs/auth-generator/page.tsx",
];

const STALE_CURRENT_CLAIMS = [
  /\bnpm 2\.6\.\d\b/,
  /\bpublished (?:CLI |create-fsd-architecture )?2\.6\.\d\b/i,
  /\b2\.6\.\d baseline\b/,
];

test("current-state docs do not present a 2.6.x release as current", () => {
  for (const file of CURRENT_STATE_PAGES) {
    const source = fs.readFileSync(path.join(process.cwd(), file), "utf8");
    for (const pattern of STALE_CURRENT_CLAIMS)
      assert.doesNotMatch(source, pattern, `${file} matches ${pattern}`);
    assert.match(
      source,
      /LATEST_CLI_RELEASE\.version/,
      `${file} should render the latest CLI version`,
    );
  }
});
