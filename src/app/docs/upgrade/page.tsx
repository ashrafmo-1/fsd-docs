import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Safe project upgrades",
  description:
    "Inspect and safely apply versioned FSD CLI tooling migrations without re-scaffolding business code.",
  alternates: { canonical: "/docs/upgrade" },
};

const PLAN_STATUSES = [
  ["CREATE", "A new CLI-owned file will be created."],
  ["UPDATE", "Verified managed content has a safe migration."],
  ["ALREADY_APPLIED", "The current content already matches the target state."],
  ["PRESERVE", "The file or content remains unchanged."],
  [
    "CONFLICT",
    "Ownership or content changed, so the CLI refuses to overwrite it.",
  ],
  ["MANUAL", "The state needs a developer decision before migration."],
  ["DELETE", "A verified managed regular file will be removed."],
] as const;

const EXIT_CODES = [
  ["0", "The project is current."],
  ["2", "A conflict-free upgrade is available."],
  ["3", "Conflicts or manual actions block the upgrade."],
  ["4", "The project state or configuration is invalid or unsupported."],
] as const;

export default function UpgradePage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Available in CLI 2.6.0
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Safely upgrade an existing FSD CLI project
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-body">
        The <code>upgrade</code> command migrates only configuration and tooling
        that FSD CLI can prove it owns. It does not clone a new template over
        your project or rewrite features, entities, widgets, pages, components,
        styles, routes, environment files, secrets, custom scripts, or Git
        history.
      </p>

      <section className="mt-10 space-y-4">
        <h2
          id="inspect-before-applying"
          className="text-2xl font-semibold text-ink"
        >
          Inspect before applying
        </h2>
        <p>
          Start inside the project root or any nested folder. The CLI locates a
          reliable root containing both <code>fsd.config.json</code> and
          <code> package.json</code>, then prints the migration path, file plan,
          conflicts, and validation steps.
        </p>
        <CodeBlock
          code={`# Read-only plan with file-level changes
npx create-fsd-architecture@latest upgrade --dry-run

# Read-only status for local checks or CI
npx create-fsd-architecture@latest upgrade --check`}
        />
        <p className="text-sm text-body-muted">
          Both commands are non-mutating: they do not create a manifest, backup,
          log, lockfile, or temporary project file.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="understand-the-plan"
          className="text-2xl font-semibold text-ink"
        >
          Understand the plan
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-surface-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {PLAN_STATUSES.map(([status, meaning]) => (
                <tr key={status} className="border-t border-hairline">
                  <td className="px-4 py-3 font-mono text-xs text-brand-coral">
                    {status}
                  </td>
                  <td className="px-4 py-3">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Resolve every <code>CONFLICT</code> and <code>MANUAL</code> item
          before applying. <code>--yes</code> only skips confirmation; it never
          overrides a conflict. Upgrade intentionally has no{" "}
          <code>--force</code>, blind adoption, or downgrade mode.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 id="apply-a-safe-plan" className="text-2xl font-semibold text-ink">
          Apply a safe plan
        </h2>
        <CodeBlock
          code={`# Review and confirm interactively
npx create-fsd-architecture@latest upgrade

# Apply a conflict-free plan without a prompt
npx create-fsd-architecture@latest upgrade --yes

# Skip dependency installation when a migration changes dependencies
npx create-fsd-architecture@latest upgrade --yes --no-install`}
        />
        <p>
          The CLI checks planned content again immediately before each write. If
          a file changed after you reviewed the plan, the operation stops rather
          than applying a stale update.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 id="ownership-manifest" className="text-2xl font-semibold text-ink">
          Ownership manifest
        </h2>
        <p>
          Projects created with 2.6.0 contain <code>.fsd/manifest.json</code>.
          It records deterministic SHA-256 hashes for CLI-owned files, precise
          marker regions, and dependency entries. It does not store secrets,
          environment values, application data, or <code>node_modules</code>.
        </p>
        <p>
          Generated Redux reducer registration refreshes its managed hash only
          when the store still matches the recorded state. A user-modified
          managed file becomes a conflict instead of being silently accepted.
          Unclaimed dependency versions and unrelated package metadata stay
          user-owned.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 id="legacy-projects" className="text-2xl font-semibold text-ink">
          Projects created before 2.6.0
        </h2>
        <p>
          A project without a manifest enters conservative legacy mode. The CLI
          adopts only content matching known released signatures. Customized,
          missing, or ambiguous managed files require manual resolution;
          business code outside CLI-owned surfaces remains untouched.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-surface-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Framework</th>
                <th className="px-4 py-3 font-semibold">
                  Recognized legacy baseline
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["React + Vite", "2.3.2 signatures"],
                ["Next.js", "2.3.2 signatures"],
                ["Vue + Vite", "2.3.2 signatures"],
                ["Nuxt", "2.4.0 signatures"],
                ["SvelteKit", "2.5.0 signatures"],
              ].map(([framework, baseline]) => (
                <tr key={framework} className="border-t border-hairline">
                  <td className="px-4 py-3 font-semibold text-ink">
                    {framework}
                  </td>
                  <td className="px-4 py-3">{baseline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-body-muted">
          Planning has unit coverage across npm, pnpm, Yarn, and Bun. The normal
          framework CI continues to build freshly generated projects; it is not
          a claim that every customized historical project can be migrated
          automatically.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 id="ci-exit-codes" className="text-2xl font-semibold text-ink">
          CI exit codes
        </h2>
        <CodeBlock code="npx create-fsd-architecture@latest upgrade --check" />
        <div className="grid gap-3 sm:grid-cols-2">
          {EXIT_CODES.map(([code, meaning]) => (
            <div
              key={code}
              className="rounded-2xl border border-hairline bg-surface-soft p-5"
            >
              <p className="font-mono text-lg font-semibold text-brand-coral">
                Exit {code}
              </p>
              <p className="mt-2 text-sm">{meaning}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="git-backup-and-recovery"
          className="text-2xl font-semibold text-ink"
        >
          Git, backup, and recovery
        </h2>
        <p>
          Applying is refused in a dirty Git worktree by default. After
          reviewing the plan, <code>--allow-dirty</code> accepts that risk and
          uses the same internal affected-path backup. The CLI never resets,
          stashes, commits, switches branches, or treats Git as its only backup.
        </p>
        <CodeBlock code="npx create-fsd-architecture@latest upgrade --allow-dirty" />
        <p>
          Before writing, affected regular files and lockfiles are snapshotted
          under <code>.fsd/backups/</code>. Writes are atomic and failures roll
          back in reverse order. Successful upgrades remove their temporary
          backup; failed rollback retains it and prints its exact location.
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Read the complete error and any printed recovery-backup path.</li>
          <li>Inspect the restored files before making another attempt.</li>
          <li>
            If installation failed, run your package manager&apos;s install
            command to restore <code>node_modules</code>.
          </li>
          <li>
            Run <code>upgrade --dry-run</code> again and resolve remaining
            conflicts.
          </li>
        </ol>
      </section>
    </article>
  );
}
