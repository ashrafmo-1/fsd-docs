import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { PublishedDocumentationVideo } from "@/components/docs/published-documentation-video";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Feature status",
  description:
    "Which FSD CLI features are stable, which are in preview, and what is planned: Supabase auth, batch and structure-only generation, architecture checks, light hooks, and Skill-based migration.",
  alternates: { canonical: "/docs/release-readiness" },
};

type Status = "Stable" | "Preview" | "Planned";

const STATUS_VARIANT = {
  Stable: "success",
  Preview: "warning",
  Planned: "neutral",
} as const;

const FEATURES: {
  name: string;
  status: Status;
  since: string;
  href: string;
}[] = [
  {
    name: "Batch slice generation",
    status: "Stable",
    since: "CLI 2.7.0",
    href: "#generator-workflows",
  },
  {
    name: "Structure-only segments (--segments, --root)",
    status: "Stable",
    since: "CLI 2.7.0",
    href: "#generator-workflows",
  },
  {
    name: "Architecture check (check --architecture)",
    status: "Stable",
    since: "CLI 2.7.0",
    href: "#generator-workflows",
  },
  {
    name: "Light Git hooks",
    status: "Stable",
    since: "CLI 2.7.0",
    href: "#light-hooks",
  },
  {
    name: "Supabase auth adapter (--auth-provider supabase)",
    status: "Preview",
    since: "CLI 2.7.0",
    href: "#supabase-auth",
  },
  {
    name: "Existing-project migration",
    status: "Preview",
    since: "Agent Skill v2.0.0",
    href: "#existing-project-migration",
  },
  {
    name: "Angular scaffolding and generators",
    status: "Planned",
    since: "Inspection only today",
    href: "#planned",
  },
];

function StatusBadge({ status }: { status: Status }) {
  return <Badge variant={STATUS_VARIANT[status]}>{status}</Badge>;
}

export default function ReleaseReadinessPage() {
  return (
    <article className="max-w-4xl space-y-10">
      <header>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
          Feature status
        </p>
        <h1 className="text-4xl font-semibold tracking-[-1.5px] text-ink md:text-5xl">
          What is stable, in preview, and planned
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-body">
          Stable features are released on npm and covered by CI. Preview
          features are released but still waiting on a live acceptance check, so
          verify them in your own staging environment first. Planned work is not
          available yet. For the full change list, see the{" "}
          <a href="/docs/releases" className="text-brand-coral underline">
            release notes
          </a>
          .
        </p>
      </header>

      <PublishedDocumentationVideo pageKey="/docs/release-readiness" />

      <section className="space-y-4">
        <h2 id="status-overview" className="text-2xl font-semibold text-ink">
          Status overview
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-surface-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Feature</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Available in</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((feature) => (
                <tr key={feature.name} className="border-t border-hairline">
                  <td className="px-4 py-3 font-semibold text-ink">
                    <a href={feature.href} className="hover:underline">
                      {feature.name}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={feature.status} />
                  </td>
                  <td className="px-4 py-3 text-body">{feature.since}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2
            id="generator-workflows"
            className="text-2xl font-semibold text-ink"
          >
            Batch slices, preserving segments, and architecture checks
          </h2>
          <StatusBadge status="Stable" />
        </div>
        <p>
          Batch generation creates several slices in one run. It checks every
          slice before writing and rolls back earlier slices, affected
          route/store files, and the ownership manifest if a later one fails.{" "}
          <code>--force</code> is refused in batch mode.
        </p>
        <CodeBlock
          code={`npx create-fsd-architecture@latest -g entity product customer --dry-run
npx create-fsd-architecture@latest -g entity product customer
npx create-fsd-architecture@latest -g feature cart --segments ui,api --root src/lib
npx create-fsd-architecture@latest -g shared --segments ui,lib --root src`}
        />
        <p>
          <code>--segments</code> creates missing directories and empty
          TypeScript public APIs and keeps existing files. It generates no
          components, routes, backend, or state registration.{" "}
          <code>--root</code> works only in this structure-only mode and does
          not rewrite framework aliases or routing. Pass segments as one
          comma-separated argument. Symlinks and path collisions are rejected.
        </p>
        <CodeBlock
          code={`# Install in the application using its package manager:
npm install -D steiger @feature-sliced/steiger-plugin
npx create-fsd-architecture@latest check --architecture`}
        />
        <p>
          <code>check --architecture</code> runs the project&apos;s installed
          Steiger against its framework source root and fails when Steiger
          fails. It downloads nothing; rules and exceptions stay in your
          project. Plain <code>check</code> and <code>doctor</code> inspect
          config, layers, and toolchain without analyzing imports.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="supabase-auth" className="text-2xl font-semibold text-ink">
            Supabase auth adapter
          </h2>
          <StatusBadge status="Preview" />
        </div>
        <p>
          The opt-in adapter replaces example auth requests with Supabase SDK
          calls in all five supported frameworks. It writes inside the auth
          slice and does not install the SDK, provision a project, or edit env
          files. Generated output builds in every framework, but end-to-end
          acceptance against a live Supabase project is still pending, so test
          sign-up, recovery, and RLS in a staging project before production.
        </p>
        <CodeBlock
          code={`npx create-fsd-architecture@latest -g feature auth --auth-provider supabase --dry-run
npx create-fsd-architecture@latest -g feature auth --auth-provider supabase
npm install @supabase/supabase-js`}
        />
        <p>
          <code>@supabase/supabase-js</code> requires Node.js 22 or later.
          Initialize the adapter at the framework browser boundary before form
          submission:
        </p>
        <CodeBlock
          language="typescript"
          code={`import { createClient } from '@supabase/supabase-js';
import { configureSupabaseAuth } from '@/features/auth';

// Values from the application's public browser configuration.
const client = createClient(publicUrl, publishableKey);
configureSupabaseAuth(client);`}
        />
        <p>
          Use a public publishable or anon key. Never ship secret or
          service-role keys to the browser. Server configuration of the browser
          singleton is rejected; SSR cookies, callbacks, and authorization need
          a separate request-scoped server integration.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-body">
          <li>
            Login returns a normalized user/session; provider errors and missing
            sessions reject.
          </li>
          <li>
            Registration can return null when email confirmation is required;
            show confirmation instructions.
          </li>
          <li>
            Password recovery uses an email recovery OTP. Configure the recovery
            email template to expose <code>{"{{ .Token }}"}</code>.
          </li>
          <li>
            Reset requires matching password confirmation and verified recovery
            identity; recovery proof is consumed once.
          </li>
          <li>
            Logout calls provider signOut. Clearing UI state alone does not
            revoke a session.
          </li>
          <li>
            The SDK owns persistence and refresh. Subscribe to onAuthStateChange
            to synchronize application state.
          </li>
        </ul>{" "}
        <p>
          When server state is disabled, wire submit handlers to exported API
          methods. Handle failures without logging passwords, OTPs, or tokens.
        </p>
        <p>
          <a
            href="https://github.com/FSD-CLI/cli/blob/main/docs/AUTH-SUPABASE-CONTRACT.md"
            className="text-brand-coral underline"
          >
            Full adapter contract
          </a>
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="light-hooks" className="text-2xl font-semibold text-ink">
            Light hooks and optional automation
          </h2>
          <StatusBadge status="Stable" />
        </div>
        <p>
          New projects check staged and unstaged whitespace on pre-commit,
          validate conventional commit messages on commit-msg, and leave quality
          checks to CI. Local lint and pre-push lint/build are opt-in:
        </p>
        <CodeBlock
          code={`FSD_PRE_COMMIT_LINT=1 git commit -m "feat: add catalog"
FSD_PRE_PUSH_CHECKS=1 git push

# Explicit bypass when needed:
HUSKY=0 git commit -m "docs: update guide"`}
        />
        <p>
          React Auto-PR and labeler workflows live in{" "}
          <code>optional-workflows</code>. Auto-PR runs only when dispatched
          manually; configure repository labels and workflow permissions before
          enabling either one. Nothing is published automatically.
        </p>
        <p>
          Existing projects move to light hooks through the managed{" "}
          <code>light-hooks-v1</code> migration. Only unchanged CLI-owned hooks
          are updated; customized hooks are reported as conflicts. Review{" "}
          <a href="/docs/upgrade" className="text-brand-coral underline">
            <code>upgrade --dry-run</code>
          </a>{" "}
          before applying.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2
            id="existing-project-migration"
            className="text-2xl font-semibold text-ink"
          >
            Existing-project migration through the Agent Skill
          </h2>
          <StatusBadge status="Preview" />
        </div>
        <p>
          Migration is an agent-guided workflow in the{" "}
          <a href="/docs/ai-agent-skill" className="text-brand-coral underline">
            AI Agent Skill
          </a>
          , not a CLI command. The agent inventories the existing app,
          establishes a passing baseline, maps responsibilities to FSD, and then
          moves code in small batches. Routes, API contracts, product behavior,
          SSR boundaries, and locale handling stay intact. Each batch is
          validated and restored on failure.
        </p>
        <p>
          It has been verified on a representative React + Vite application,
          including rollback. It is not certified for arbitrary production apps
          or other frameworks yet, so migrate on a branch and review every
          batch.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="planned" className="text-2xl font-semibold text-ink">
            Planned
          </h2>
          <StatusBadge status="Planned" />
        </div>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Angular: projects can be inspected read-only today. Scaffolding,
            generators, reconfiguration, and managed upgrades are not available
            yet and are rejected before any write.
          </li>
          <li>
            A CLI command for migrating arbitrary existing apps is not planned
            for a specific release; use the Agent Skill workflow above.
          </li>
        </ul>
      </section>
    </article>
  );
}
