import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Project Configuration",
  description:
    "Learn how fsd.config.json stores framework and stack choices for repeatable FSD generation.",
  alternates: { canonical: "/docs/configuration" },
};

const OPTIONS = [
  [
    "framework",
    "react-vite | nextjs | vue-vite | nuxt | sveltekit",
    "Controls framework-native components, providers, and generators.",
  ],
  [
    "packageManager",
    "npm | pnpm | yarn | bun",
    "Keeps setup commands and lockfiles consistent.",
  ],
  ["apiClient", "axios | fetch", "Chooses generated request helpers."],
  [
    "serverState",
    "react-query | vue-query | svelte-query | none",
    "Controls the framework-compatible TanStack Query output.",
  ],
  [
    "clientState",
    "zustand | redux | pinia | svelte-store | none",
    "Controls client-state files and provider wiring.",
  ],
  [
    "forms",
    "react-hook-form-zod | vee-validate-zod | sveltekit-superforms-zod | none",
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
        <h2
          id="example"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
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

      <section className="mt-10 space-y-4">
        <h2
          id="nuxt-example"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Nuxt example
        </h2>
        <CodeBlock
          language="json"
          code={`{
  "$schema": "https://raw.githubusercontent.com/FSD-CLI/cli/main/schema/fsd.config.schema.json",
  "schemaVersion": 1,
  "framework": "nuxt",
  "packageManager": "npm",
  "apiClient": "fetch",
  "serverState": "vue-query",
  "clientState": "pinia",
  "forms": "vee-validate-zod",
  "ui": "shared-ui"
}`}
        />
        <p className="text-sm leading-relaxed text-body-muted">
          Nuxt defaults to its native <code>$fetch</code> client. Pinia and
          VeeValidate are registered as Nuxt modules, while Vue Query uses an
          SSR-aware plugin.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="vue-vite-example"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Vue + Vite example
        </h2>
        <CodeBlock
          language="json"
          code={`{
  "$schema": "https://raw.githubusercontent.com/FSD-CLI/cli/main/schema/fsd.config.schema.json",
  "schemaVersion": 1,
  "framework": "vue-vite",
  "packageManager": "npm",
  "apiClient": "axios",
  "serverState": "vue-query",
  "clientState": "pinia",
  "forms": "vee-validate-zod",
  "ui": "shared-ui"
}`}
        />
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="sveltekit-example"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          SvelteKit example
        </h2>
        <CodeBlock
          language="json"
          code={`{
  "$schema": "https://raw.githubusercontent.com/FSD-CLI/cli/main/schema/fsd.config.schema.json",
  "schemaVersion": 1,
  "framework": "sveltekit",
  "packageManager": "npm",
  "apiClient": "fetch",
  "serverState": "svelte-query",
  "clientState": "svelte-store",
  "forms": "sveltekit-superforms-zod",
  "ui": "shared-ui"
}`}
        />
        <p className="text-sm leading-relaxed text-body-muted">
          These defaults generate Svelte 5 components, TanStack Svelte Query
          accessors, framework-native stores, and progressively enhanced
          Superforms backed by Zod 4.
        </p>
      </section>

      <section className="mt-10">
        <h2
          id="supported-fields"
          className="mb-4 text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
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
          <h2
            id="when-the-file-exists"
            className="text-lg font-semibold text-ink"
          >
            When the file exists
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            The CLI validates <code>schemaVersion</code> and generates files
            from the saved choices without asking the stack questions again.
          </p>
        </div>
        <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
          <h2 id="existing-projects" className="text-lg font-semibold text-ink">
            Existing projects
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            If the file is missing, the generator infers a compatible setup from
            dependencies in <code>package.json</code>. Adding the config later
            makes that behavior explicit and repeatable.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-hairline bg-surface-soft p-5">
        <h2
          id="framework-compatibility-is-validated"
          className="text-lg font-semibold text-ink"
        >
          Framework compatibility is validated
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-body">
          The capability matrix rejects mixed stacks such as Pinia in a React
          project, Zustand in a Vue project, or Pinia in a SvelteKit project.
          Defaults are selected from the chosen framework before
          <code>--yes</code> is applied.
        </p>
      </section>
    </article>
  );
}
