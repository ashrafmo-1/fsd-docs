import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { PublishedDocumentationVideo } from "@/components/docs/published-documentation-video";

export const metadata: Metadata = {
  title: "CLI Reference",
  description:
    "Every create-fsd-architecture and fsd command, generator type, and flag, with accepted values and exit codes.",
  alternates: { canonical: "/docs/cli-reference" },
};

// Mirrors `fsd --help` and bin/generator.mjs in CLI 2.7.1.
const REFERENCE_VERSION = "2.7.1";

type Row = [flag: string, values: string, description: string];

const COMMANDS: Row[] = [
  ["create [project-name]", "default action", "Scaffold a new FSD project."],
  [
    "generate <type> <name...>",
    "alias g, -g, --generate",
    "Generate one or more slices in the current project.",
  ],
  [
    "check",
    "--architecture",
    "Inspect config and layers. With --architecture, run the project's installed Steiger.",
  ],
  [
    "doctor",
    "--architecture",
    "Run check plus toolchain diagnostics (Node.js, Git, package manager).",
  ],
  ["config", "", "Print the resolved fsd.config.json."],
  [
    "upgrade",
    "see upgrade options",
    "Safely migrate CLI-owned project tooling.",
  ],
  ["--list-templates", "", "Show stable and planned framework templates."],
];

const GENERATE_TYPES: Row[] = [
  ["feature", "<name...>", "User interactions, e.g. auth, cart, search."],
  ["entity", "<name...>", "Business entities, e.g. product, customer."],
  [
    "widget",
    "<name...>",
    "Composite UI blocks. navbar, sidebar, footer, and bottom-bar are accessible layout presets.",
  ],
  [
    "page",
    "<name...>",
    "Routed pages. home, about, and consult are content presets.",
  ],
  [
    "shared",
    "ui [components...] | api",
    "Shared primitives (button, input, label, card) or an apiClient.",
  ],
  [
    "shared, app",
    "--segments only",
    "Structure-only layers without a slice name.",
  ],
];

const CREATE_OPTIONS: Row[] = [
  [
    "-f, --framework <id>",
    "react-vite | nextjs | vue-vite | nuxt | sveltekit",
    "Select the framework without the template prompt.",
  ],
  [
    "-y, --yes",
    "",
    "Accept defaults. Requires a project name and --framework.",
  ],
  [
    "--package-manager <id>",
    "npm | pnpm | yarn | bun",
    "Package manager and lockfile.",
  ],
  ["--api-client <id>", "axios | fetch", "Generated request helpers."],
  [
    "--server-state <id>",
    "react-query | vue-query | svelte-query | none",
    "Override the framework server-state default.",
  ],
  [
    "--client-state <id>",
    "zustand | redux | pinia | svelte-store | none",
    "Override the framework client-state default.",
  ],
  [
    "--forms <id>",
    "react-hook-form-zod | vee-validate-zod | sveltekit-superforms-zod | none",
    "Override the framework forms default.",
  ],
  ["--no-install", "", "Create the project without installing packages."],
  ["--no-start", "", "Do not start the development server."],
  ["--dry-run", "", "Preview every planned change without writing files."],
  ["--force", "", "Replace an existing target, with automatic rollback."],
];

const GENERATE_OPTIONS: Row[] = [
  [
    "--dry-run",
    "",
    "Print planned files and route/store edits; write nothing.",
  ],
  ["--force", "", "Overwrite an existing slice. Refused in batch mode."],
  [
    "--segments <names>",
    "comma-separated, e.g. ui,api",
    "Structure-only mode: create missing segment folders and empty public APIs, keep existing files.",
  ],
  [
    "-r, --root <path>",
    "e.g. src/lib",
    "Source root for structure-only mode. Requires --segments.",
  ],
  [
    "--auth-provider <id>",
    "supabase",
    "Only with feature auth: generate the opt-in Supabase browser adapter.",
  ],
];

const UPGRADE_OPTIONS: Row[] = [
  ["--dry-run", "", "Show the upgrade plan and make no changes."],
  ["--check", "", "Read-only status for CI; see exit codes below."],
  ["-y, --yes", "", "Apply only when the complete plan has no conflicts."],
  [
    "--no-install",
    "",
    "Skip installing dependencies after a dependency migration.",
  ],
  [
    "--allow-dirty",
    "",
    "Permit apply in a dirty Git worktree after a warning.",
  ],
];

const GLOBAL_OPTIONS: Row[] = [
  ["-h, --help", "", "Show help."],
  ["-v, --version", "", "Show the installed CLI version."],
];

const EXIT_CODES: [code: string, meaning: string][] = [
  ["0", "Success. For upgrade --check: the project is current."],
  ["1", "The command failed (invalid arguments, failed check, write error)."],
  ["2", "upgrade --check: an upgrade is available."],
  ["3", "upgrade --check: an upgrade is blocked by conflicts."],
  ["4", "upgrade --check: the project or its manifest is invalid."],
];

function ReferenceTable({
  id,
  title,
  rows,
}: {
  id: string;
  title: string;
  rows: Row[];
}) {
  return (
    <section className="mt-10 space-y-4">
      <h2 id={id} className="text-2xl font-semibold tracking-[-0.5px] text-ink">
        {title}
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-hairline">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-surface-soft text-ink">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Values</th>
              <th className="px-4 py-3 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([flag, values, description]) => (
              <tr key={flag} className="border-t border-hairline align-top">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink">
                  {flag}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-brand-coral">
                  {values}
                </td>
                <td className="px-4 py-3 text-body">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function CliReferencePage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Reference · CLI {REFERENCE_VERSION}
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        CLI reference
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        <code>fsd</code> and <code>create-fsd-architecture</code> are the same
        CLI. Install it globally to use <code>fsd</code>, or run it once with{" "}
        <code>npx</code>. Run <code>fsd --help</code> for the same summary in
        your terminal.
      </p>

      <PublishedDocumentationVideo pageKey="/docs/cli-reference" />

      <section className="mt-10 space-y-4">
        <h2
          id="usage"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Usage
        </h2>
        <CodeBlock
          code={`fsd create [project-name] [options]
fsd generate <type> <name...> [--force] [--dry-run]   # alias: fsd g
fsd <check|doctor> [--architecture]
fsd config
fsd upgrade [--dry-run] [--check] [--yes] [--no-install] [--allow-dirty]`}
        />
        <p className="text-base leading-relaxed text-body">
          The flag form works everywhere, including <code>npx</code>:
        </p>
        <CodeBlock
          code={`npx create-fsd-architecture@latest [project-name] [options]
npx create-fsd-architecture@latest -g <type> <name...> [--force] [--dry-run]
npx create-fsd-architecture@latest -g <type> [names...] --segments ui,api [--root src]
npx create-fsd-architecture@latest -g shared <ui|api> [components...]`}
        />
      </section>

      <ReferenceTable id="commands" title="Commands" rows={COMMANDS} />
      <ReferenceTable
        id="generator-types"
        title="Generator types"
        rows={GENERATE_TYPES}
      />
      <p className="mt-4 text-sm text-body-muted">
        Several names create a batch: every slice is checked before writing, and
        earlier slices roll back if a later one fails. See the{" "}
        <Link
          href="/docs/slice-generator"
          className="text-brand-coral underline"
        >
          slice generator guide
        </Link>
        .
      </p>
      <ReferenceTable
        id="create-options"
        title="Create options"
        rows={CREATE_OPTIONS}
      />
      <p className="mt-4 text-sm text-body-muted">
        State and forms values must match the framework; the CLI rejects mixed
        stacks such as Pinia in a React project. See{" "}
        <Link href="/docs/configuration" className="text-brand-coral underline">
          project configuration
        </Link>
        .
      </p>
      <ReferenceTable
        id="generate-options"
        title="Generate options"
        rows={GENERATE_OPTIONS}
      />
      <ReferenceTable
        id="upgrade-options"
        title="Upgrade options"
        rows={UPGRADE_OPTIONS}
      />
      <ReferenceTable
        id="global-options"
        title="Global options"
        rows={GLOBAL_OPTIONS}
      />

      <section className="mt-10 space-y-4">
        <h2
          id="exit-codes"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Exit codes
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-surface-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Code</th>
                <th className="px-4 py-3 font-semibold">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {EXIT_CODES.map(([code, meaning]) => (
                <tr key={code} className="border-t border-hairline">
                  <td className="px-4 py-3 font-mono text-xs text-brand-coral">
                    {code}
                  </td>
                  <td className="px-4 py-3 text-body">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="examples"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Examples
        </h2>
        <CodeBlock
          code={`fsd create my-app --framework react-vite --yes
fsd g entity product customer --dry-run
fsd g widget navbar sidebar footer bottom-bar
fsd g page about consult
fsd g feature auth --auth-provider supabase
fsd g shared ui button input
fsd g shared api
fsd g feature cart --segments ui,api --root src/lib
fsd check --architecture
fsd upgrade --check`}
        />
      </section>
    </article>
  );
}
