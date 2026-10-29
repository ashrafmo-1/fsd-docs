import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Migration Guide",
  description:
    "Move to the latest FSD CLI release and migrate an existing frontend to Feature-Sliced Design: version upgrades, legacy projects, and a folder-by-folder mapping plan.",
  alternates: { canonical: "/docs/migration" },
};

const FOLDER_MAP: [from: string, to: string, note: string][] = [
  [
    "components/ (generic)",
    "shared/ui",
    "Buttons, inputs, and layout primitives with no business meaning.",
  ],
  [
    "components/ (business)",
    "entities/<name>/ui or widgets/<name>",
    "A ProductCard belongs to the product entity; a header with search is a widget.",
  ],
  [
    "pages/, routes/, views/",
    "pages/<name>",
    "Keep the framework's route files; they import the page slice.",
  ],
  [
    "hooks/",
    "slice model or lib",
    "Move each hook to the slice that owns its data; generic ones go to shared/lib.",
  ],
  [
    "services/, api/",
    "shared/api + entities/<name>/api",
    "Keep one HTTP client in shared/api and entity requests next to their entity.",
  ],
  [
    "store/, redux/, stores/",
    "entities/<name>/model or features/<name>/model",
    "Split global stores by the concept they describe.",
  ],
  [
    "utils/, helpers/",
    "shared/lib",
    "Only truly generic helpers; business rules move into their slice.",
  ],
  [
    "constants/, config/",
    "shared/config",
    "Environment and app-wide constants.",
  ],
  [
    "App, providers, global CSS",
    "app",
    "Providers, routing setup, and global styles.",
  ],
];

export default function MigrationPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Migration
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Migration guide
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        There are two kinds of migration. Upgrading the CLI moves a project the
        CLI created to a newer release. Adopting FSD moves an existing app that
        the CLI did not create into layers and slices. Pick the section that
        matches your project.
      </p>

      <section className="mt-10 space-y-4">
        <h2
          id="upgrade-the-cli"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Upgrade a CLI-created project
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-base leading-relaxed text-body">
          <li>
            Commit or stash your work. Upgrades refuse a dirty worktree unless
            you pass <code>--allow-dirty</code>.
          </li>
          <li>
            Check the runtime. CLI 2.7.0 and later need Node.js 22.12.0 or
            later; Nuxt and SvelteKit need 22.22.2. See the{" "}
            <Link
              href="/docs/getting-started#requirements"
              className="text-brand-coral underline"
            >
              requirements
            </Link>
            .
          </li>
          <li>
            Preview the plan, then apply it only when it has no conflicts.
          </li>
        </ol>
        <CodeBlock
          code={`node --version
npx create-fsd-architecture@latest upgrade --dry-run
npx create-fsd-architecture@latest upgrade --yes`}
        />
        <p className="text-base leading-relaxed text-body">
          The upgrade touches only files the CLI owns and rolls everything back
          if a step fails. Customized CLI-owned files are reported as conflicts
          for you to resolve by hand. The{" "}
          <Link href="/docs/upgrade" className="text-brand-coral underline">
            safe upgrades guide
          </Link>{" "}
          explains the plan, the ownership manifest, and the CI exit codes.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="version-notes"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Notes by version
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-surface-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">From</th>
                <th className="px-4 py-3 font-semibold">What to do</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "2.6.x → 2.7.x",
                  "Breaking: Node.js 20 is no longer supported. Upgrade Node.js first, then run upgrade. The light-hooks-v1 migration updates unchanged Git hooks and reports customized ones.",
                ],
                [
                  "Created before 2.6.1",
                  "Upgrade with CLI 2.7.1 or later, which recognizes the older fsd-stack.ts rendering instead of reporting a conflict.",
                ],
                [
                  "Created before 2.6.0",
                  "No .fsd/manifest.json yet. The CLI adopts only files that match known released signatures (legacy mode); anything customized needs a manual merge.",
                ],
                [
                  "1.0.x",
                  "Legacy releases with no managed upgrade path. Treat the project as an existing app and follow the section below.",
                ],
              ].map(([from, todo]) => (
                <tr key={from} className="border-t border-hairline align-top">
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-ink">
                    {from}
                  </td>
                  <td className="px-4 py-3 text-body">{todo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="adopt-fsd"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Adopt FSD in an existing app
        </h2>
        <p className="text-base leading-relaxed text-body">
          There is no command that rewrites an arbitrary app, and that is on
          purpose: every codebase splits differently. Migrate incrementally so
          the app builds and ships after every step.
        </p>
        <ol className="list-decimal space-y-2 pl-6 text-base leading-relaxed text-body">
          <li>
            <strong className="text-ink">Baseline.</strong> Make sure lint, type
            checks, tests, and the build pass before you move anything.
          </li>
          <li>
            <strong className="text-ink">Create the structure.</strong>{" "}
            Structure-only generation adds layers and empty public APIs and
            never overwrites files.
          </li>
          <li>
            <strong className="text-ink">Move one concept at a time.</strong>{" "}
            Start with <code>shared</code>, then entities, then features. Update
            imports to the slice&apos;s <code>index.ts</code> in the same
            commit.
          </li>
          <li>
            <strong className="text-ink">Verify each batch.</strong> Re-run the
            baseline checks; revert the batch if they fail.
          </li>
          <li>
            <strong className="text-ink">Lock it in.</strong> Add Steiger and{" "}
            <code>check --architecture</code> to CI so new code follows the
            rules.
          </li>
        </ol>
        <CodeBlock
          code={`npx create-fsd-architecture@latest -g shared --segments ui,lib,api,config --root src
npx create-fsd-architecture@latest -g entity product user --segments ui,model,api --root src
npx create-fsd-architecture@latest check --architecture`}
        />
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="folder-mapping"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Where common folders go
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Typical folder</th>
                <th className="px-4 py-3 font-semibold">FSD location</th>
                <th className="px-4 py-3 font-semibold">How to decide</th>
              </tr>
            </thead>
            <tbody>
              {FOLDER_MAP.map(([from, to, note]) => (
                <tr key={from} className="border-t border-hairline align-top">
                  <td className="px-4 py-3 font-mono text-xs text-ink">
                    {from}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-brand-coral">
                    {to}
                  </td>
                  <td className="px-4 py-3 text-body">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-hairline bg-surface-soft p-5">
        <h2 id="agent-guided" className="text-lg font-semibold text-ink">
          Let an agent do the moves
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-body">
          The{" "}
          <Link
            href="/docs/ai-agent-skill"
            className="text-brand-coral underline"
          >
            AI Agent Skill
          </Link>{" "}
          runs this same plan with a coding agent: it inventories the app,
          proposes the mapping, moves code in validated batches, and restores a
          batch that fails. It is in preview, so review every batch.
        </p>
      </section>
    </article>
  );
}
