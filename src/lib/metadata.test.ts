import assert from "node:assert/strict";
import { test } from "node:test";
import {
  defaultOgImage,
  docsPageMetadata,
  pageMetadata,
} from "./metadata.ts";

test("pageMetadata sets openGraph and twitter for the page, not the homepage", () => {
  const meta = pageMetadata({
    title: "Getting Started",
    description: "Create an FSD project.",
    path: "/docs/getting-started",
  });

  assert.equal(meta.title, "Getting Started");
  assert.equal(meta.description, "Create an FSD project.");
  assert.deepEqual(meta.alternates, { canonical: "/docs/getting-started" });

  assert.equal(meta.openGraph?.url, "/docs/getting-started");
  assert.equal(meta.openGraph?.title, "Getting Started | FSD CLI");
  assert.equal(meta.openGraph?.description, "Create an FSD project.");
  assert.deepEqual(meta.openGraph?.images, [defaultOgImage]);

  assert.equal(meta.twitter?.card, "summary_large_image");
  assert.equal(meta.twitter?.title, "Getting Started | FSD CLI");
  assert.equal(meta.twitter?.description, "Create an FSD project.");
  assert.deepEqual(meta.twitter?.images, [defaultOgImage]);
});

test("pageMetadata accepts a distinct share description", () => {
  const meta = pageMetadata({
    title: "Architecture",
    description: "Long SEO description of the architecture page.",
    path: "/architecture",
    shareDescription: "Six layers. Clear boundaries.",
  });

  assert.equal(meta.description, "Long SEO description of the architecture page.");
  assert.equal(meta.openGraph?.description, "Six layers. Clear boundaries.");
  assert.equal(meta.twitter?.description, "Six layers. Clear boundaries.");
});

test("docsPageMetadata uses article type without inventing timestamps", () => {
  const meta = docsPageMetadata({
    title: "Upgrade",
    description: "Upgrade guide.",
    path: "/docs/upgrade",
  });

  assert.equal(meta.openGraph?.type, "article");
  assert.equal(
    "publishedTime" in (meta.openGraph ?? {}),
    false,
  );
  assert.equal(
    "modifiedTime" in (meta.openGraph ?? {}),
    false,
  );
});

test("docsPageMetadata keeps explicit release timestamps", () => {
  const publishedTime = "2026-01-15T00:00:00.000Z";
  const meta = docsPageMetadata({
    title: "1.0.0",
    description: "Release notes.",
    path: "/docs/releases/1.0.0",
    publishedTime,
    modifiedTime: publishedTime,
  });

  assert.equal(meta.openGraph?.type, "article");
  assert.equal(meta.openGraph?.publishedTime, publishedTime);
  assert.equal(meta.openGraph?.modifiedTime, publishedTime);
});
