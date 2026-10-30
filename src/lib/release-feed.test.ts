import assert from "node:assert/strict";
import { test } from "node:test";
import { getReleaseFeed } from "./release-feed.ts";
import { CLI_RELEASES } from "./releases.ts";

test("feed lists the latest release first with absolute links", () => {
  const feed = getReleaseFeed();
  assert(feed.startsWith('<?xml version="1.0"'));
  const first = feed.indexOf("<item>");
  assert(
    feed.slice(first).includes(`/docs/releases/${CLI_RELEASES[0].version}`),
  );
  assert.match(
    feed,
    /<atom:link href="https:\/\/fsdcli\.me\/docs\/releases\/feed\.xml"/,
  );
});

test("feed escapes text and skips releases without notes", () => {
  const feed = getReleaseFeed();
  const items = feed.match(/<item>/g) ?? [];
  assert.equal(
    items.length,
    CLI_RELEASES.filter((release) => release.sections.length > 0).length,
  );
  const outsideCdata = feed.replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, "");
  assert.doesNotMatch(outsideCdata, /&(?!amp;|lt;|gt;|quot;)/);
});
