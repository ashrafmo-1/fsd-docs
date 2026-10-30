import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { PublishedDocumentationVideo } from "@/components/docs/published-documentation-video";
import {
  CLI_NODE_RANGE,
  COMPATIBILITY_CLI_VERSION,
  FRAMEWORK_COMPATIBILITY,
  PACKAGE_MANAGER_MINIMUMS,
} from "@/lib/compatibility";

export const metadata: Metadata = {
  title: "Compatibility",
  description:
    "Node.js and package manager requirements for the FSD CLI and every generated React, Next.js, Vue, Nuxt, and SvelteKit project.",
  alternates: { canonical: "/docs/compatibility" },
};

export default function CompatibilityPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Runtime requirements
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Compatibility
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        The CLI and the project it generates can need different Node.js
        versions. Use the stricter of the two. Every range below matches what
        CLI {COMPATIBILITY_CLI_VERSION} enforces.
      </p>

      <PublishedDocumentationVideo pageKey="/docs/compatibility" />

      <section className="mt-10 space-y-4">
        <h2
          id="cli-runtime"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          CLI runtime
        </h2>
        <p className="text-base leading-relaxed text-body">
          The CLI requires Node.js <code>{CLI_NODE_RANGE}</code> since 2.7.0.
          That is the lowest version that runs the CLI itself and every
          Vite-based template. Node.js 20 is no longer supported.
        </p>
        <CodeBlock code="node --version" />
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="generated-projects"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Generated projects
        </h2>
        <p className="text-base leading-relaxed text-body">
          Nuxt and SvelteKit templates declare a stricter floor than the CLI.
          The other templates build on any Node.js version the CLI accepts.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Framework</th>
                <th className="px-4 py-3 font-semibold">Node.js</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Package managers</th>
              </tr>
            </thead>
            <tbody>
              {FRAMEWORK_COMPATIBILITY.map((row) => (
                <tr key={row.configValue} className="border-t border-hairline">
                  <td className="px-4 py-3 font-semibold text-ink">
                    {row.framework}
                    <span className="block font-mono text-xs font-normal text-body-muted">
                      {row.configValue}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-brand-coral">
                    {row.nodeRange}
                  </td>
                  <td className="px-4 py-3 text-body">{row.evidence}</td>
                  <td className="px-4 py-3 text-body">{row.packageManagers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-body-muted">
          Angular projects are supported for read-only inspection only.
          Scaffolding, generation, and managed upgrades reject Angular before
          writing files.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="package-managers"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Package managers
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-surface-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Package manager</th>
                <th className="px-4 py-3 font-semibold">Minimum</th>
                <th className="px-4 py-3 font-semibold">Why this version</th>
              </tr>
            </thead>
            <tbody>
              {PACKAGE_MANAGER_MINIMUMS.map(([name, minimum, reason]) => (
                <tr key={name} className="border-t border-hairline">
                  <td className="px-4 py-3 font-semibold text-ink">{name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-brand-coral">
                    {minimum}
                  </td>
                  <td className="px-4 py-3 text-body">{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-hairline bg-surface-soft p-5">
        <h2 id="how-the-cli-checks" className="text-lg font-semibold text-ink">
          How the CLI checks this
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-body">
          Before it downloads or writes anything, <code>create</code> compares
          the running Node.js version with both the CLI range and the selected
          framework range, and names the range that failed. <code>doctor</code>{" "}
          runs the same check against the framework saved in{" "}
          <code>fsd.config.json</code> and also compares the configured package
          manager with the minimums above.
        </p>
        <CodeBlock code="npx create-fsd-architecture@latest doctor" />
      </section>
    </article>
  );
}
