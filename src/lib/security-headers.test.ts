import assert from "node:assert/strict";
import { test } from "node:test";
import { contentSecurityPolicy, securityHeaders } from "./security-headers.ts";

test("production CSP locks down objects, framing, and eval", () => {
  const csp = contentSecurityPolicy();
  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /object-src 'none'/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /upgrade-insecure-requests/);
  assert.doesNotMatch(csp, /unsafe-eval/);
});

test("CSP allows the origins the site loads in the browser", () => {
  const csp = contentSecurityPolicy();
  for (const origin of [
    "https://api.github.com",
    "https://api.npmjs.org",
    "https://*.supabase.co",
    "https://www.youtube-nocookie.com",
  ])
    assert(csp.includes(origin), origin);
});

test("dev CSP allows eval and HMR websockets only in dev", () => {
  const csp = contentSecurityPolicy({ dev: true });
  assert.match(csp, /'unsafe-eval'/);
  assert.match(csp, /connect-src [^;]*ws:/);
});

test("security headers include HSTS and nosniff", () => {
  const keys = securityHeaders().map((header) => header.key);
  for (const key of [
    "Content-Security-Policy",
    "Strict-Transport-Security",
    "X-Content-Type-Options",
    "Referrer-Policy",
    "Permissions-Policy",
  ])
    assert(keys.includes(key), key);
});
