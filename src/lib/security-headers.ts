// Every origin the browser talks to. Keep in sync when adding embeds or
// client-side fetches, otherwise the CSP will block them.
const CONNECT_ORIGINS = [
  "https://api.github.com", // landing project stats
  "https://api.npmjs.org", // landing download counts
  "https://*.supabase.co", // dashboard auth and video CRUD
];

const FRAME_ORIGINS = [
  "https://www.youtube-nocookie.com",
  "https://www.youtube.com",
];

export function contentSecurityPolicy({ dev = false } = {}) {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    // Next.js streams inline bootstrap scripts into statically generated
    // pages, so nonces are not available; dev mode also needs eval.
    "script-src": [
      "'self'",
      "'unsafe-inline'",
      ...(dev ? ["'unsafe-eval'"] : []),
    ],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'"],
    "connect-src": ["'self'", ...CONNECT_ORIGINS, ...(dev ? ["ws:"] : [])],
    "frame-src": FRAME_ORIGINS,
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    ...(dev ? {} : { "upgrade-insecure-requests": [] }),
  };
  return Object.entries(directives)
    .map(([name, values]) => [name, ...values].join(" "))
    .join("; ");
}

export function securityHeaders({ dev = false } = {}) {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy({ dev }) },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains",
    },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ];
}
