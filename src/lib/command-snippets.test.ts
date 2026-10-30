import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

function sourceFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith(".test.ts")
      ? [full]
      : [];
  });
}

// Guides always run the newest CLI; only release pages pin a version, and
// they do it through a variable, never a hand-written number.
test("CLI commands use @latest or a version variable", () => {
  for (const file of sourceFiles("src")) {
    const source = fs.readFileSync(file, "utf8");
    assert.doesNotMatch(
      source,
      /npx create-fsd-architecture(?=[^@A-Za-z0-9-]|$)/m,
      `${file}: npx command without @latest`,
    );
    if (file.endsWith(path.join("lib", "releases.ts"))) continue;
    assert.doesNotMatch(
      source,
      /create-fsd-architecture@\d/,
      `${file}: hard-coded CLI version in a command`,
    );
  }
});
