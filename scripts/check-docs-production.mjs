import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";

const origin = "http://127.0.0.1:3105";
// Refuse a busy port so an unrelated server cannot satisfy readiness checks.
await new Promise((resolve, reject) => {
  const probe = createServer();
  probe.once("error", reject);
  probe.listen(3105, "127.0.0.1", () => probe.close(resolve));
});
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3105",
  ],
  { stdio: "inherit", env: process.env },
);
let serverError;
server.on("error", (error) => {
  serverError = error;
});
const stopped = new Promise((resolve) => server.once("exit", resolve));

try {
  const deadline = Date.now() + 60_000;
  let ready = false;
  while (Date.now() < deadline) {
    if (serverError) throw serverError;
    assert.equal(
      server.exitCode,
      null,
      "production server exited before smoke checks",
    );
    try {
      const response = await fetch(`${origin}/sitemap.xml`, {
        signal: AbortSignal.timeout(1000),
      });
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {
      /* Wait for the production server to bind its port. */
    }
    await delay(200);
  }
  assert(ready, "production server did not become ready within 60 seconds");
  const smoke = spawn(process.execPath, ["scripts/check-docs.mjs"], {
    stdio: "inherit",
    env: { ...process.env, DOCS_TEST_ORIGIN: origin },
  });
  const result = await new Promise((resolve, reject) => {
    smoke.once("error", reject);
    smoke.once("exit", (code) => resolve(code));
  });
  assert.equal(result, 0, "production HTTP and internal-link smoke failed");
} finally {
  if (server.exitCode === null && !serverError) {
    server.kill("SIGTERM");
    const forced = globalThis.setTimeout(() => server.kill("SIGKILL"), 5000);
    await stopped;
    clearTimeout(forced);
  }
}
