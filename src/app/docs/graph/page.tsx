import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { PublishedDocumentationVideo } from "@/components/docs/published-documentation-video";

export const metadata: Metadata = {
  title: "Project Graph",
  description:
    "Print the import graph of an FSD project with fsd graph: nodes, edges, and layer-boundary violations, as text or JSON.",
  alternates: { canonical: "/docs/graph" },
};

export default function GraphPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Diagnostics
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        See the import graph
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        <code>fsd graph</code> prints the import graph of the current project:
        every source file as a node, every import as an edge, and every import
        that crosses a layer boundary the wrong way as a violation. It is
        read-only — it never writes files — and it reports violations without
        enforcing anything: failing a build on violations is a separate{" "}
        <code>fsd check</code> feature, not this command. New in the upcoming
        2.9.0 release.
      </p>

      <PublishedDocumentationVideo pageKey="/docs/graph" />

      <section className="mt-10 space-y-4">
        <h2
          id="usage"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Usage
        </h2>
        <CodeBlock
          code={`fsd graph
fsd graph --json`}
        />
        <p className="text-base leading-relaxed text-body">
          Run it inside an FSD project: the command reads{" "}
          <code>fsd.config.json</code> to find the framework and the source
          root. <code>--json</code> is the only flag; any other argument is a
          usage error.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="what-it-prints"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          What it prints
        </h2>
        <p className="text-base leading-relaxed text-body">
          The summary counts nodes, edges, and layer-boundary violations, then
          breaks nodes down per layer and lists every violation:
        </p>
        <CodeBlock
          code={`  FSD graph

  11 nodes, 11 edges, 0 layer-boundary violations

  Nodes per layer:
  app: 1
  pages: 1
  widgets: 1
  features: 3
  entities: 3
  shared: 2

  No layer-boundary violations.`}
        />
        <p className="text-base leading-relaxed text-body">
          With violations, the last block names each one as{" "}
          <code>from -&gt; to</code> plus its message:
        </p>
        <CodeBlock
          code={`  Layer-boundary violations:
  entities/product/model/product.types -> features/auth/model/auth
    entities must not import from features (layer-boundaries)
  features/auth/model/auth -> pages/home/ui/home-page
    features must not import from pages (layer-boundaries)`}
        />
        <p className="text-base leading-relaxed text-body">
          The exit code stays 0 even when violations exist: the command is a
          report, not a gate.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="json-output"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          JSON output
        </h2>
        <p className="text-base leading-relaxed text-body">
          <code>fsd graph --json</code> prints the same graph as JSON, with{" "}
          <code>nodes</code>, <code>edges</code>, and <code>violations</code>
          keys, for scripts and other tooling:
        </p>
        <CodeBlock
          language="json"
          code={`{
  "nodes": [
    {
      "id": "features/auth/model/auth",
      "file": "src/features/auth/model/auth.ts",
      "layer": "features",
      "slice": "auth"
    }
  ],
  "edges": [
    {
      "from": "features/auth/model/auth",
      "to": "entities/product/model/product.types",
      "specifier": "../../entities/product/model/product.types",
      "resolved": true
    }
  ],
  "violations": []
}`}
        />
        <div className="overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Object</th>
                <th className="px-4 py-3 font-semibold">Fields</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-hairline align-top">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink">
                  node
                </td>
                <td className="px-4 py-3 text-body">
                  <code>id</code> — path relative to the source root, without
                  the extension (for example{" "}
                  <code>features/auth/model/auth</code>). <code>file</code> —
                  path relative to the project root, with the extension.{" "}
                  <code>layer</code> — one of app, pages, widgets, features,
                  entities, shared. <code>slice</code> — the slice name, or the
                  segment name for app and shared (for example{" "}
                  <code>providers</code>, <code>ui</code>).
                </td>
              </tr>
              <tr className="border-t border-hairline align-top">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink">
                  edge
                </td>
                <td className="px-4 py-3 text-body">
                  <code>from</code> — the importing node&apos;s id.{" "}
                  <code>to</code> — the imported node&apos;s id, or{" "}
                  <code>null</code> when the specifier could not be resolved to
                  a node. <code>specifier</code> — the raw import specifier as
                  written in the source. <code>resolved</code> — whether{" "}
                  <code>to</code> is a node. One edge per (file, specifier):
                  importing the same module twice is a single dependency.
                </td>
              </tr>
              <tr className="border-t border-hairline align-top">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink">
                  violation
                </td>
                <td className="px-4 py-3 text-body">
                  <code>rule</code> — always <code>layer-boundaries</code>.{" "}
                  <code>from</code> / <code>to</code> — the edge&apos;s node
                  ids. <code>fromLayer</code> / <code>toLayer</code> — the two
                  layers. <code>specifier</code> — the import specifier that
                  violates the rule. <code>message</code> — for example{" "}
                  <code>
                    entities must not import from features (layer-boundaries)
                  </code>
                  .
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="violations"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          What counts as a violation
        </h2>
        <p className="text-base leading-relaxed text-body">
          A violation is a resolved edge that imports from a layer above its own
          — a lower layer reaching up. The layer order is app, pages, widgets,
          features, entities, shared, so for example entities importing
          features, shared importing features, and features importing pages are
          all violations. The rule id is <code>layer-boundaries</code>, the same
          rule the policy system defines.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="limits"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Limits
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-body">
          <li>
            Only <code>.js</code>, <code>.mjs</code>, <code>.ts</code>,{" "}
            <code>.tsx</code>, and <code>.jsx</code> files are scanned.
            Single-file-component sources (<code>.vue</code>,{" "}
            <code>.svelte</code>, <code>.astro</code>) are not discovered or
            parsed yet.
          </li>
          <li>
            Files that belong to no slice or segment — for example{" "}
            <code>src/main.tsx</code> or <code>src/shared/index.ts</code> — are
            skipped.
          </li>
          <li>
            Bare imports (for example <code>react</code>) and alias imports (for
            example <code>@/...</code>) are recorded as edges with{" "}
            <code>to: null</code> and <code>resolved: false</code> instead of
            being dropped. Alias resolution through <code>tsconfig.json</code>{" "}
            paths is a follow-up, not part of this command.
          </li>
          <li>
            Imports inside comments never become edges: comments are stripped
            before parsing, respecting string literals.
          </li>
        </ul>
        <p className="text-base leading-relaxed text-body">
          See the{" "}
          <Link
            href="/docs/cli-reference"
            className="text-brand-coral underline"
          >
            CLI reference
          </Link>{" "}
          for the command summary and the other diagnostic commands.
        </p>
      </section>
    </article>
  );
}
