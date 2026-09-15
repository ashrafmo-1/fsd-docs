import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Project Configuration",
  description:
    "Learn how fsd.config.json stores framework and stack choices for repeatable FSD generation.",
  alternates: { canonical: "/docs/configuration" },
};

const OPTIONS = [
  ["framework", "react-vite | nextjs", "Controls framework-specific output."],
  [
    "packageManager",
    "npm | pnpm | yarn | bun",
    "Keeps setup commands and lockfiles consistent.",
  ],
  ["apiClient", "axios | fetch", "Chooses generated request helpers."],
  [
    "serverState",
    "react-query | none",
    "Controls TanStack React Query output.",
  ],
  [
    "clientState",
    "zustand | redux | none",
    "Controls client-state files and provider wiring.",
  ],
  [
    "forms",
    "react-hook-form-zod | none",
    "Controls typed forms and validation schemas.",
  ],
  ["ui", "shared-ui", "Targets the starter's shared UI primitives."],
];

export default function ConfigurationPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Project source of truth
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Configure once, generate consistently
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        Every project created by the wizard receives an{" "}
        <code>fsd.config.json</code> file. Generators read it automatically, so
        developers do not repeat the same stack decisions for every feature.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.5px] text-ink">
          Example
        </h2>
        <CodeBlock
          language="json"
          code={`{
  "$schema": "https://raw.githubusercontent.com/FSD-CLI/cli/main/schema/fsd.config.schema.json",
  "schemaVersion": 1,
  "packageManager": "npm",
  "apiClient": "axios",
  "serverState": "react-query",
  "clientState": "zustand",
  "forms": "react-hook-form-zod",
  "ui": "shared-ui",
  "framework": "react-vite"
}`}
        />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-[-0.5px] text-ink">
          Supported fields
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-hairline bg-canvas">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead className="bg-surface-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Field</th>
                <th className="px-4 py-3 font-semibold">Values</th>
                <th className="px-4 py-3 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {OPTIONS.map(([field, values, purpose]) => (
                <tr key={field} className="border-t border-hairline">
                  <td className="px-4 py-3 font-mono text-xs text-ink">
                    {field}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-body">
                    {values}
                  </td>
                  <td className="px-4 py-3 leading-relaxed text-body">
                    {purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
          <h2 className="text-lg font-semibold text-ink">
            When the file exists
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            The CLI validates <code>schemaVersion</code> and generates files
            from the saved choices without asking the stack questions again.
          </p>
        </div>
        <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
          <h2 className="text-lg font-semibold text-ink">Existing projects</h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            If the file is missing, the generator infers a compatible setup from
            dependencies in <code>package.json</code>. Adding the config later
            makes that behavior explicit and repeatable.
          </p>
        </div>
      </section>
    </article>
  );
}
