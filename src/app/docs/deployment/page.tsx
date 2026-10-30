import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { PublishedDocumentationVideo } from "@/components/docs/published-documentation-video";

export const metadata: Metadata = {
  title: "Deployment",
  description:
    "Build output, environment variables, and hosting setup for generated React, Vue, Next.js, Nuxt, and SvelteKit FSD projects.",
  alternates: { canonical: "/docs/deployment" },
};

const TARGETS: [
  framework: string,
  build: string,
  output: string,
  env: string,
][] = [
  ["React + Vite", "npm run build", "Static files in dist/", "VITE_API_URL"],
  ["Vue + Vite", "npm run build", "Static files in dist/", "VITE_API_URL"],
  [
    "Next.js",
    "npm run build",
    "Node.js server (next start)",
    "NEXT_PUBLIC_API_URL",
  ],
  [
    "Nuxt",
    "npm run build or npm run generate",
    "Node.js server in .output/, or static files with generate",
    "NUXT_PUBLIC_API_BASE",
  ],
  [
    "SvelteKit",
    "npm run build",
    "Depends on the adapter (adapter-auto by default)",
    "PUBLIC_API_BASE",
  ],
];

export default function DeploymentPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Shipping
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Deployment
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        Generated projects deploy like any project of their framework. FSD
        changes how code is organized, not how it is built. This page lists what
        each template produces and the settings hosts usually need.
      </p>

      <PublishedDocumentationVideo pageKey="/docs/deployment" />

      <section className="mt-10 space-y-4">
        <h2
          id="build-output"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Build output by framework
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Framework</th>
                <th className="px-4 py-3 font-semibold">Build command</th>
                <th className="px-4 py-3 font-semibold">Output</th>
                <th className="px-4 py-3 font-semibold">API base variable</th>
              </tr>
            </thead>
            <tbody>
              {TARGETS.map(([framework, build, output, env]) => (
                <tr
                  key={framework}
                  className="border-t border-hairline align-top"
                >
                  <td className="px-4 py-3 font-semibold text-ink">
                    {framework}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-body">
                    {build}
                  </td>
                  <td className="px-4 py-3 text-body">{output}</td>
                  <td className="px-4 py-3 font-mono text-xs text-brand-coral">
                    {env}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-base leading-relaxed text-body">
          Use Node.js 22.12.0 or later on the build machine, and 22.22.2 or
          later for Nuxt and SvelteKit. Most hosts read the version from{" "}
          <code>.nvmrc</code> or an engines field, or let you set it in the
          project settings.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="environment-variables"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Environment variables
        </h2>
        <p className="text-base leading-relaxed text-body">
          The generated API client reads its base URL from the variable above.
          These variables are public: they are embedded in the browser bundle at
          build time, so set them in the host before building and never put
          secrets in them.
        </p>
        <CodeBlock
          code={`# React + Vite, Vue + Vite
VITE_API_URL=https://api.example.com

# Next.js
NEXT_PUBLIC_API_URL=https://api.example.com

# Nuxt (overrides runtimeConfig.public.apiBase)
NUXT_PUBLIC_API_BASE=https://api.example.com

# SvelteKit
PUBLIC_API_BASE=https://api.example.com`}
        />
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="static-spa"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          React and Vue: static hosting with an SPA fallback
        </h2>
        <p className="text-base leading-relaxed text-body">
          Both templates use history-mode routing (React Router&apos;s{" "}
          <code>createBrowserRouter</code>, Vue Router&apos;s{" "}
          <code>createWebHistory</code>). Deep links such as{" "}
          <code>/catalog</code> only work when the host serves{" "}
          <code>index.html</code> for unknown paths.
        </p>
        <CodeBlock
          language="json"
          code={`// vercel.json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`}
        />
        <CodeBlock
          language="text"
          code={`# Netlify: public/_redirects (copied into dist/)
/*  /index.html  200`}
        />
        <CodeBlock
          language="nginx"
          code={`location / {
  try_files $uri $uri/ /index.html;
}`}
        />
        <p className="text-base leading-relaxed text-body">
          Deploying under a sub-path such as GitHub Pages? Set Vite&apos;s{" "}
          <code>base</code> option to that path before building.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="nextjs"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Next.js
        </h2>
        <p className="text-base leading-relaxed text-body">
          Vercel detects the project with no extra settings. On your own server,
          build once and run the Node.js server:
        </p>
        <CodeBlock
          code={`npm ci
npm run build
npm run start   # listens on PORT, default 3000`}
        />
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="nuxt"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Nuxt
        </h2>
        <p className="text-base leading-relaxed text-body">
          <code>npm run build</code> produces a server-rendered app in{" "}
          <code>.output/</code>. Most hosts detect it automatically; on your own
          server, run it with Node.js. For a fully static site, use{" "}
          <code>npm run generate</code> and deploy <code>.output/public</code>.
        </p>
        <CodeBlock
          code={`npm run build
node .output/server/index.mjs`}
        />
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="sveltekit"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          SvelteKit
        </h2>
        <p className="text-base leading-relaxed text-body">
          The template uses <code>@sveltejs/adapter-auto</code>, which detects
          Vercel, Netlify, and Cloudflare Pages during their builds. For any
          other target, install a specific adapter and set it in{" "}
          <code>vite.config.ts</code>:
        </p>
        <CodeBlock
          code={`npm install -D @sveltejs/adapter-node     # Node.js server
npm install -D @sveltejs/adapter-static   # static files`}
        />
      </section>

      <section className="mt-10 rounded-2xl border border-hairline bg-surface-soft p-5">
        <h2 id="before-you-ship" className="text-lg font-semibold text-ink">
          Before you ship
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-body">
          Run <code>npm run ci</code> locally or in CI first: it runs the FSD
          architecture check, lint, type checks, and the production build that
          the host will run.
        </p>
      </section>
    </article>
  );
}
