import assert from "node:assert/strict";
import { test } from "node:test";
import { breadcrumbJsonLd, jsonLdScript } from "./json-ld.ts";
import { softwareJsonLd, websiteJsonLd } from "./structured-data.ts";

test("software entry names the latest CLI version", () => {
  const data = softwareJsonLd();
  assert.equal(data["@type"], "SoftwareApplication");
  assert.match(data.softwareVersion, /^\d+\.\d+\.\d+$/);
  assert.equal(websiteJsonLd().url, "https://fsdcli.me");
});

test("breadcrumbs are numbered absolute URLs", () => {
  const data = breadcrumbJsonLd([
    { name: "Docs", path: "/docs" },
    { name: "Upgrade", path: "/docs/upgrade" },
  ]);
  assert.deepEqual(
    data.itemListElement.map((item) => [item.position, item.item]),
    [
      [1, "https://fsdcli.me/docs"],
      [2, "https://fsdcli.me/docs/upgrade"],
    ],
  );
});

test("script serialization cannot close the script tag", () => {
  assert.doesNotMatch(jsonLdScript({ text: "</script><x>" }), /<\/script>/);
});
