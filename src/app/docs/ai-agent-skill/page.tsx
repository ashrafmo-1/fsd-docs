import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Agent Skill (Beta)",
  description:
    "Install the beta fsd-cli Agent Skill so compatible coding agents can use verified FSD CLI scaffolding commands.",
  alternates: { canonical: "/docs/ai-agent-skill" },
};

const EXAMPLE_PROMPTS = [
  "Create a cart feature.",
  "Add a product entity.",
  "Create a checkout page.",
  "Create a new Next.js project with Feature-Sliced Design.",
];

export default function AiAgentSkillPage() {
  return (
    <article className="max-w-4xl">
      <div className="mb-3 flex items-center gap-3">
        <p className="text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
          Agent Skills
        </p>
        <span className="rounded-full border border-brand-coral/30 bg-brand-peach px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-ink">
          Beta
        </span>
      </div>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Use FSD CLI through your coding agent
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        The <code>fsd-cli</code> skill teaches Codex, Claude Code, Cursor, and
        other compatible agents how to inspect a project, map a request to a
        supported FSD operation, run the real CLI, and verify the generated
        structure before implementing business logic.
      </p>

      <div
        role="note"
        className="mt-6 rounded-2xl border border-brand-coral/30 bg-brand-peach/50 p-5"
      >
        <p className="font-semibold text-ink">Beta availability</p>
        <p className="mt-2 text-sm leading-relaxed text-body">
          The installation flow and documented CLI commands are verified against
          create-fsd-architecture 2.6.0. Agent behavior can still vary across
          coding tools and existing project structures, so review generated
          changes before committing them.
        </p>
      </div>

      <section className="mt-10 space-y-4">
        <h2
          id="install"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Install the skill
        </h2>
        <CodeBlock code="npx skills add FSD-CLI/create-fsd-architecture --skill fsd-cli" />
        <p className="text-base leading-relaxed text-body">
          The source lives in the{" "}
          <a
            className="font-semibold text-brand-coral underline"
            href={`${siteConfig.repositories.skill}/tree/main/skills/fsd-cli`}
          >
            create-fsd-architecture Agent Skill repository
          </a>
          . The current beta release is <code>v1.0.0-beta.1</code>. Its core
          instructions are portable; agent-specific UI metadata is kept
          separate.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="how-it-works"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          How it works
        </h2>
        <ol className="list-decimal space-y-3 pl-5 text-base leading-relaxed text-body">
          <li>
            Inspect the framework, package manager, FSD layers, and config.
          </li>
          <li>Map the request to a supported CLI structural operation.</li>
          <li>Preview uncertain work and protect existing slices.</li>
          <li>Run the CLI and inspect every generated or changed path.</li>
          <li>
            Implement the requested business logic and validate the result.
          </li>
        </ol>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="example-prompts"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Example prompts
        </h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <li
              key={prompt}
              className="rounded-2xl border border-hairline bg-surface-soft p-4 font-mono text-sm text-ink"
            >
              “{prompt}”
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="verified-scope"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Verified scope
        </h2>
        <p className="text-base leading-relaxed text-body">
          The skill covers project creation, the feature, entity, widget, and
          page generators, the complete auth feature scaffold, project checks,
          and safe upgrades across React, Next.js, Vue, Nuxt, and SvelteKit.
        </p>
        <p className="text-base leading-relaxed text-body">
          It does not invent an in-place initialization command or a standalone
          segment generator. If the CLI cannot perform an operation, the agent
          keeps that limitation explicit and handles only the authorized manual
          implementation.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="responsibility-boundary"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Responsibility boundary
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
            <h3 className="font-semibold text-ink">FSD CLI owns</h3>
            <p className="mt-2 text-sm leading-relaxed text-body">
              Supported architecture, scaffolding, slice files, public APIs,
              route wrappers, project configuration, and managed upgrades.
            </p>
          </div>
          <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
            <h3 className="font-semibold text-ink">The coding agent owns</h3>
            <p className="mt-2 text-sm leading-relaxed text-body">
              Business logic, API integration, state behavior, forms,
              validation, domain rules, and unsupported manual changes.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
