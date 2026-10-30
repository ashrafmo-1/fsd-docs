import assert from "node:assert/strict";
import { test } from "node:test";
import { writeToClipboard } from "./clipboard.ts";

test("reports success only after writeText resolves", async () => {
  let written = "";
  const ok = await writeToClipboard("npx fsd", {
    writeText: async (text) => {
      written = text;
    },
  });
  assert.equal(ok, true);
  assert.equal(written, "npx fsd");
});

test("reports failure when writeText rejects", async () => {
  const ok = await writeToClipboard("npx fsd", {
    writeText: () =>
      Promise.reject(new DOMException("denied", "NotAllowedError")),
  });
  assert.equal(ok, false);
});

test("reports failure when the Clipboard API is unavailable", async () => {
  assert.equal(await writeToClipboard("npx fsd", undefined), false);
});
