import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Upcoming changes and release readiness",
  description:
    "Published CLI 2.6.1 versus upcoming Supabase auth, light Git hooks, and Skill-based existing-project migration.",
  alternates: { canonical: "/docs/release-readiness" },
};

const CLI_SOURCE =
  "https://github.com/FSD-CLI/cli/tree/d5a0bb1e464f2364593800deede428a957b5c32b";
const SKILL_SOURCE =
  "https://github.com/FSD-CLI/create-fsd-architecture/tree/v2.0.0-beta.1";

export default function ReleaseReadinessPage() {
  return (
    <article className="max-w-4xl space-y-10">
      <header>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
          Verified source snapshot · October 6, 2026
        </p>
        <h1 className="text-4xl font-semibold tracking-[-1.5px] text-ink md:text-5xl">
          Upcoming changes and release readiness
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-body">
          npm latest is 2.6.1. Supabase auth and light hooks are implemented on
          candidate branches and await review, CI, and release. The migration
          pilot belongs to the Agent Skill repository and has its own delivery.
          No newer npm version or release date is announced here.
        </p>
      </header>

      <section className="space-y-4">
        <h2
          id="published-and-candidate"
          className="text-2xl font-semibold text-ink"
        >
          Published and candidate source
        </h2>
        <p>
          CLI PR6 merged into main at <code>060bc5d</code>; its 30 checks
          passed. That source includes post-2.6.1 work and is not a new
          published artifact. The{" "}
          <a href={CLI_SOURCE} className="text-brand-coral underline">
            follow-up candidate d5a0bb1
          </a>{" "}
          needs a new PR and CI on its own head.
        </p>
        <p>
          Candidate local verification passed 118 CLI tests and npm pack
          dry-run. Supabase-generated output passed lint, typecheck, and build
          in React + Vite, Next.js, Vue + Vite, Nuxt, and SvelteKit. These
          results cover source output; they do not certify a released npm
          artifact or a live auth backend.
        </p>
      </section>

      <section className="space-y-4">
        <h2
          id="generator-workflows"
          className="text-2xl font-semibold text-ink"
        >
          Batch slices, preserving segments, and architectural checks
        </h2>
        <p>
          The candidate adds native batch generation with complete preflight and
          rollback of earlier slices, affected routes/store files, and the
          ownership manifest if a later operation fails. Batch --force is
          refused.
        </p>
        <CodeBlock
          code={`node /path/to/cli/bin/index.mjs -g entity product customer --dry-run
node /path/to/cli/bin/index.mjs -g entity product customer
node /path/to/cli/bin/index.mjs -g feature cart --segments ui,api --root src/lib
node /path/to/cli/bin/index.mjs -g shared --segments ui,lib --root src`}
        />
        <p>
          --segments creates missing directories and empty TypeScript public
          APIs, preserving existing files. It generates no components, routes,
          backend, or state registration. --root is supported only with this
          structure-only mode; it does not rewrite framework aliases or routing.
          Segments are one comma-separated argument. Symlinks and path
          collisions are rejected.
        </p>
        <CodeBlock
          code={`# Install in the application using its package manager:
npm install -D steiger @feature-sliced/steiger-plugin
node /path/to/cli/bin/index.mjs check --architecture`}
        />
        <p>
          This opt-in runs the project's installed Steiger against its framework
          source root and propagates failure. It downloads nothing
          automatically; rules and exceptions remain project-owned. Normal
          check/doctor inspect config, layers, and toolchain, without analyzing
          import architecture. Native entity batch output passed
          lint/types/build across all five frameworks.
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="supabase-auth" className="text-2xl font-semibold text-ink">
          Supabase Auth adapter candidate
        </h2>
        <p>
          The opt-in adapter replaces example auth requests with Supabase SDK
          operations in all five supported frameworks. It writes inside the auth
          slice and does not install an SDK, provision a project, or edit env
          files. Run these commands from the candidate CLI checkout inside a
          compatible project; npm 2.6.1 does not support the new flag.
        </p>
        <CodeBlock
          code={`# Replace /path/to/cli with the reviewed candidate checkout
node /path/to/cli/bin/index.mjs -g feature auth --auth-provider supabase --dry-run
node /path/to/cli/bin/index.mjs -g feature auth --auth-provider supabase
npm install @supabase/supabase-js`}
        />
        <p>
          The actual SDK 2.117.2 declaration was typechecked; that SDK requires
          Node.js 22 or later. The CLI runtime requirement remains separate.
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
        </ul>
        <p>
          When server state is disabled, wire submit handlers to exported API
          methods. Handle failures without logging passwords, OTPs, or tokens.
          Before live acceptance, verify signup/confirmation/login, recovery
          mail and expired codes, password reset, refresh/logout, and RLS on an
          isolated staging project. Those backend checks remain pending.
        </p>
        <p>
          <a
            href="https://github.com/FSD-CLI/cli/blob/d5a0bb1e464f2364593800deede428a957b5c32b/docs/AUTH-SUPABASE-CONTRACT.md"
            className="text-brand-coral underline"
          >
            Full adapter contract
          </a>
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="light-hooks" className="text-2xl font-semibold text-ink">
          Light hooks and optional automation
        </h2>
        <p>
          The candidate policy uses staged and unstaged whitespace checks on
          pre-commit, conventional commit validation on commit-msg, and quality
          checks in CI. Local lint and pre-push lint/build are opt-in:
        </p>
        <CodeBlock
          code={`FSD_PRE_COMMIT_LINT=1 git commit -m "feat: add catalog"
FSD_PRE_PUSH_CHECKS=1 git push
# Explicit bypass when needed:
HUSKY=0 git commit -m "docs: update guide"`}
        />
        <p>
          React Auto-PR and labeler workflows move to optional-workflows.
          Auto-PR is manually dispatched; configure repository labels and
          workflow permissions before enabling either workflow. No automatic
          publishing is enabled.
        </p>
        <p>
          The CLI candidate adds light-hooks-v1, managed state 2 to 3. Only
          unchanged owned hooks update; customized hooks remain conflicts.
          Review{" "}
          <a href="/docs/upgrade" className="text-brand-coral underline">
            upgrade --dry-run
          </a>{" "}
          before applying. Existing npm 2.6.1 does not contain this migration.
        </p>
      </section>

      <section className="space-y-4">
        <h2
          id="existing-project-migration"
          className="text-2xl font-semibold text-ink"
        >
          Existing-project migration through the Skill
        </h2>
        <p>
          Migration v1 is an agent-guided workflow: inventory the existing app,
          establish a passing baseline, map responsibilities to FSD, then move
          code in small batches. Keep routes, API contracts, product behavior,
          SSR boundaries, and locale handling intact. Update public APIs and
          their consumers together; validate each batch and restore affected
          files on failure.
        </p>
        <p>
          A representative React/Vite legacy catalog pilot passed lint, types,
          builds, and Chromium checks across baseline, batch 1, final state, and
          rollback. Browser checks covered catalog routes, controlled API
          success and error responses, cart interactions, and wildcard handling.
          An injected type failure restored exact batch bytes while preserving
          package and lock files.
        </p>
        <p>
          This is one synthetic React pilot, not certification of arbitrary
          production apps or other frameworks. Skill v2.0.0-beta.1 is tagged and
          installable, with 15 tests passing in all nine OS/Node CI jobs;
          companion branch merge into main remains pending. No arbitrary-app CLI
          migrate command is shipped. See the{" "}
          <a href={SKILL_SOURCE} className="text-brand-coral underline">
            tagged Skill and migration fixture
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2
          id="roadmap-and-release-gates"
          className="text-2xl font-semibold text-ink"
        >
          Roadmap and release gates
        </h2>
        <p>
          The{" "}
          <a
            href="https://www.figma.com/board/T5W8vOeZ6QIvlG4FaFHWql"
            className="text-brand-coral underline"
          >
            canonical FigJam roadmap
          </a>
          separates published, merged source, candidates, and blocked work. Add
          and plugin systems remain in the Parking Lot; broader arbitrary
          migration is research without a promised CLI release.
        </p>
        <p>
          Nuxt production security findings still block a production-readiness
          claim. Angular is outside the current CLI integration. Old React PR2
          and PR3 are obsolete and await owner closure; they are not release
          requirements.
        </p>
        <ol className="list-decimal space-y-2 pl-6 text-body">
          <li>
            Review and merge the required template and CLI changes; run CI
            against their exact heads.
          </li>
          <li>
            Complete Supabase staging acceptance before claiming live auth
            support.
          </li>
          <li>
            Select a version, update changelog and package metadata, and verify
            the packed artifact.
          </li>
          <li>
            Publish manually and verify npm version, integrity, and gitHead. A
            Git tag creates a GitHub Release but does not publish npm.
          </li>
          <li>
            Run post-release smoke against the exact published version, then
            update the release archive and announcements.
          </li>
        </ol>
        <p>
          English GitHub/DEV.to drafts and Egyptian Arabic LinkedIn copy are
          prepared. Recording and publication remain owner actions; no content
          was published as part of this candidate work.
        </p>
      </section>
    </article>
  );
}
