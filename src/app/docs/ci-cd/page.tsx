import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "CI/CD",
  description:
    "What CI the generated FSD projects ship with, the local Git hooks, and how to add architecture and upgrade checks to GitHub Actions, GitLab CI, or any other pipeline.",
  alternates: { canonical: "/docs/ci-cd" },
};

const QUALITY_SCRIPTS: [framework: string, ci: string][] = [
  ["React + Vite", "fsd:check → lint → build"],
  ["Next.js", "check:template → fsd:check → lint → typecheck → build"],
  ["Vue + Vite", "fsd:check → lint → build"],
  ["Nuxt", "fsd:check → lint → typecheck → build"],
  ["SvelteKit", "fsd:check → lint → typecheck → build"],
];

export default function CiCdPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Automation
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        CI/CD
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        Every generated project can run its full quality gate with one command
        and already includes a GitHub Actions workflow for it. This page shows
        what you get, how to run the same checks elsewhere, and which CLI checks
        are worth adding.
      </p>

      <section className="mt-10 space-y-4">
        <h2
          id="one-command"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          One command for the quality gate
        </h2>
        <p className="text-base leading-relaxed text-body">
          <code>npm run ci</code> runs the project&apos;s checks in order and
          stops at the first failure. <code>fsd:check</code> runs Steiger, which
          every template installs, so FSD layer and public-API rules are
          enforced from the first commit.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-surface-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Framework</th>
                <th className="px-4 py-3 font-semibold">npm run ci</th>
              </tr>
            </thead>
            <tbody>
              {QUALITY_SCRIPTS.map(([framework, ci]) => (
                <tr key={framework} className="border-t border-hairline">
                  <td className="px-4 py-3 font-semibold text-ink">
                    {framework}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-body">
                    {ci}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="included-workflows"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Included GitHub workflows
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-body">
          <li>
            <strong className="text-ink">CI</strong>: on pushes to main and on
            pull requests, installs with <code>npm ci</code>, rejects whitespace
            errors, runs <code>npm run ci</code>, and audits production
            dependencies.
          </li>
          <li>
            <strong className="text-ink">Dependency security</strong> and{" "}
            <strong className="text-ink">Dependabot</strong> keep dependencies
            patched.
          </li>
          <li>
            Vue, Nuxt, and SvelteKit include{" "}
            <strong className="text-ink">CodeQL</strong>. React and Vue add a{" "}
            <strong className="text-ink">commitlint</strong> check for pull
            requests, and React ships manually dispatched Auto-PR and labeler
            workflows.
          </li>
        </ul>
        <p className="text-base leading-relaxed text-body">
          Nothing publishes or deploys automatically. Review the workflows in{" "}
          <code>.github/workflows</code> and delete the ones you do not need.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="git-hooks"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Local Git hooks
        </h2>
        <p className="text-base leading-relaxed text-body">
          Hooks stay light so commits stay fast: pre-commit checks whitespace,
          commit-msg enforces conventional commits, and heavier checks run in
          CI. Opt in to more locally, or bypass when needed:
        </p>
        <CodeBlock
          code={`FSD_PRE_COMMIT_LINT=1 git commit -m "feat: add catalog"
FSD_PRE_PUSH_CHECKS=1 git push
HUSKY=0 git commit -m "docs: update guide"   # skip hooks once`}
        />
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="cli-checks"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Add CLI checks
        </h2>
        <p className="text-base leading-relaxed text-body">
          Two CLI commands are useful in a pipeline. Both are read-only.
        </p>
        <CodeBlock
          language="yaml"
          code={`      - name: FSD architecture
        run: npx create-fsd-architecture@latest check --architecture

      - name: CLI upgrade status
        run: |
          set +e
          npx create-fsd-architecture@latest upgrade --check
          code=$?
          # 0 current, 2 upgrade available, 3 blocked by conflicts, 4 invalid
          if [ "$code" -eq 2 ]; then echo "::warning::A CLI upgrade is available"; exit 0; fi
          exit $code`}
        />
        <p className="text-base leading-relaxed text-body">
          The snippet treats an available upgrade as a warning and fails only on
          conflicts or an invalid project. See{" "}
          <Link href="/docs/upgrade" className="text-brand-coral underline">
            safe upgrades
          </Link>{" "}
          for what each state means.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="other-providers"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Other CI providers
        </h2>
        <p className="text-base leading-relaxed text-body">
          The gate is plain npm scripts, so any runner with Node.js 22 works.
          GitLab CI example:
        </p>
        <CodeBlock
          language="yaml"
          code={`# .gitlab-ci.yml
quality:
  image: node:22
  cache:
    paths: [.npm/]
  script:
    - npm ci --cache .npm --prefer-offline
    - npm run ci
    - npx create-fsd-architecture@latest check --architecture`}
        />
        <p className="text-base leading-relaxed text-body">
          With another package manager, install with its frozen-lockfile mode:{" "}
          <code>pnpm install --frozen-lockfile</code>,{" "}
          <code>yarn install --immutable</code>, or{" "}
          <code>bun install --frozen-lockfile</code>, then{" "}
          <code>pnpm run ci</code>, <code>yarn ci</code>, or{" "}
          <code>bun run ci</code>.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-hairline bg-surface-soft p-5">
        <h2 id="deploying" className="text-lg font-semibold text-ink">
          Deploying
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-body">
          Deployment depends on the framework&apos;s output (static files or a
          Node.js server). Connect the repository to your host and use{" "}
          <code>npm run build</code> as the build command.
        </p>
      </section>
    </article>
  );
}
