import {
  ArrowRight,
  Boxes,
  FolderTree,
  KeyRound,
  Terminal,
} from "lucide-react";
import { CodeBlock } from "@/components/docs/code-block";

const DOC_CARDS = [
  {
    title: "Project scaffolding",
    description:
      "Create a fresh React + Vite or Next.js FSD project through the existing interactive wizard.",
    href: "/docs/getting-started",
    icon: Terminal,
    color: "bg-brand-peach",
  },
  {
    title: "Slice generation",
    description:
      "Generate features, entities, widgets, and pages directly inside an existing project.",
    href: "/docs/slice-generator",
    icon: Boxes,
    color: "bg-brand-mint",
  },
  {
    title: "Auth generation",
    description:
      "Build an auth feature with optional login, register, and forgot password flow modules.",
    href: "/docs/auth-generator",
    icon: KeyRound,
    color: "bg-brand-lavender",
  },
];

export default function DocsPage() {
  return (
    <article>
      <div className="mb-12 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-body-muted">
          Version 2
        </p>
        <h1 className="text-4xl font-medium leading-tight tracking-[-1.5px] text-ink md:text-5xl">
          create-fsd-architecture documentation
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-body">
          The CLI now supports two workflows in one package: full project
          scaffolding and in-project FSD slice generation.
        </p>
      </div>

      <div className="mb-12 grid gap-4 md:grid-cols-3">
        {DOC_CARDS.map((card) => {
          const Icon = card.icon;

          return (
            <a
              key={card.title}
              href={card.href}
              className="group rounded-[16px] border border-hairline bg-canvas p-5 transition-colors hover:bg-surface-soft"
            >
              <span
                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[12px] ${card.color}`}
              >
                <Icon className="h-5 w-5 text-ink" />
              </span>
              <h2 className="text-base font-semibold text-ink">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-body">
                {card.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                Read docs
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          );
        })}
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink">
          CLI workflows
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[16px] border border-hairline bg-surface-soft p-5">
            <FolderTree className="mb-4 h-5 w-5 text-ink" />
            <h3 className="font-semibold text-ink">Start a new project</h3>
            <p className="mt-2 text-sm leading-relaxed text-body">
              No generator flag opens the existing interactive project creation
              wizard.
            </p>
            <div className="mt-4">
              <CodeBlock code="npm create fsd-architecture@latest" />
            </div>
          </div>

          <div className="rounded-[16px] border border-hairline bg-surface-soft p-5">
            <Boxes className="mb-4 h-5 w-5 text-ink" />
            <h3 className="font-semibold text-ink">
              Generate inside a project
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-body">
              Use the generator command from an existing codebase to add FSD
              slices.
            </p>
            <div className="mt-4">
              <CodeBlock code="npx create-fsd-architecture --generate feature auth" />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
