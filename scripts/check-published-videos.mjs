import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile, rename, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DOCS_NAV_ITEMS } from "../src/lib/docs-navigation.ts";

// Exercise the real static renderer against an isolated anonymous REST fixture.
const seen = new Set();
const backup = join(tmpdir(), `fsd-docs-next-backup-${process.pid}`);
let building = false;
const hadBuild = existsSync(".next");
const server = createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  const key = url.searchParams.get("page_key")?.replace(/^eq\./, "");
  if (
    url.pathname !== "/rest/v1/videos" ||
    url.searchParams.get("is_published") !== "eq.true" ||
    !DOCS_NAV_ITEMS.some((page) => page.href === key)
  ) {
    response.writeHead(400).end();
    return;
  }
  seen.add(key);
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(
    JSON.stringify([
      {
        id: "11111111-1111-4111-8111-111111111111",
        page_key: key,
        title: `Published video for ${key}`,
        youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        youtube_video_id: "dQw4w9WgXcQ",
        description: "Rendering fixture",
        is_published: true,
        display_order: 0,
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
      },
    ]),
  );
});

try {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  if (hadBuild) await rename(".next", backup);
  building = true;
  const code = await new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      ["node_modules/next/dist/bin/next", "build"],
      {
        stdio: "inherit",
        env: {
          ...process.env,
          NEXT_PUBLIC_SUPABASE_URL: `http://127.0.0.1:${server.address().port}`,
          NEXT_PUBLIC_SUPABASE_ANON_KEY: "video-render-test-anon-key",
        },
      },
    );
    child.once("error", reject);
    child.once("exit", resolve);
  });
  assert.equal(code, 0, "Fixture build must succeed");
  for (const { href } of DOCS_NAV_ITEMS) {
    assert.ok(seen.has(href), `Missing published query: ${href}`);
    const html = await readFile(`.next/server/app${href}.html`, "utf8");
    assert.ok(
      html.includes(`Published video for ${href}`),
      `Missing video title: ${href}`,
    );
    assert.ok(
      html.includes("youtube-nocookie.com/embed/dQw4w9WgXcQ"),
      `Missing iframe: ${href}`,
    );
  }
  console.log(
    `Published video rendering passed for all ${DOCS_NAV_ITEMS.length} assignable pages.`,
  );
} finally {
  await new Promise((resolve) => server.close(resolve));
  // Never leave a fixture build available for deployment or HTTP smoke checks.
  if (building) await rm(".next", { recursive: true, force: true });
  if (existsSync(backup)) await rename(backup, ".next");
}
