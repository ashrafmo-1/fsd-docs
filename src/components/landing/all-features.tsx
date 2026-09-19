"use client";

import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  CheckCircle2,
  Code2,
  Database,
  FileCode2,
  GitCommit,
  GitPullRequest,
  KeyRound,
  Layers,
  PanelsTopLeft,
  Route,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wrench,
} from "lucide-react";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

type Capability = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  textColor: string;
};

const CAPABILITY_GROUPS: {
  label: string;
  title: string;
  description: string;
  accent: string;
  items: Capability[];
}[] = [
  {
    label: "Architecture",
    title: "FSD structure that stays readable",
    description:
      "The generated projects start with clear layers, import direction, shared primitives, and typed configuration so teams know where every slice belongs.",
    accent: "bg-brand-lavender",
    items: [
      {
        title: "Feature-Sliced Design layers",
        description:
          "app, pages, widgets, features, entities, and shared layers are ready from day one.",
        icon: Layers,
        color: "bg-brand-lavender",
        textColor: "text-ink",
      },
      {
        title: "Layer dependency rules",
        description:
          "Upper layers compose lower layers, keeping shared code independent and feature code focused.",
        icon: Route,
        color: "bg-brand-mint",
        textColor: "text-ink",
      },
      {
        title: "Path aliases",
        description:
          "Use @/* imports from each framework's source root for clean imports across every starter edition.",
        icon: FileCode2,
        color: "bg-brand-peach",
        textColor: "text-ink",
      },
    ],
  },
  {
    label: "Frameworks",
    title: "Five editions for different project shapes",
    description:
      "Choose React or Vue on Vite for client-side apps, Next.js for App Router, Nuxt for Vue SSR, or SvelteKit for Svelte SSR applications.",
    accent: "bg-brand-coral",
    items: [
      {
        title: "React + Vite edition",
        description:
          "React 19, Vite 8, TypeScript, Tailwind CSS 4, ESLint, Steiger, and fast local builds.",
        icon: Sparkles,
        color: "bg-brand-peach",
        textColor: "text-ink",
      },
      {
        title: "Next.js App Router edition",
        description:
          "Next 16, React 19, React Compiler, App Router, Tailwind CSS 4, Biome, and Steiger.",
        icon: Blocks,
        color: "bg-brand-teal",
        textColor: "text-white",
      },
      {
        title: "Vue + Vite edition",
        description:
          "Vue 3, Vite 8, Pinia, TanStack Vue Query, VeeValidate + Zod, Tailwind CSS 4, and ESLint.",
        icon: PanelsTopLeft,
        color: "bg-brand-mint",
        textColor: "text-ink",
      },
      {
        title: "Nuxt 4 edition",
        description:
          "Nuxt 4, Vue 3, SSR, native Fetch, Pinia, Vue Query hydration, VeeValidate + Zod, and generated routes.",
        icon: Server,
        color: "bg-brand-lavender",
        textColor: "text-ink",
      },
      {
        title: "SvelteKit edition",
        description:
          "Svelte 5, SvelteKit 2, SSR, native Fetch, Svelte Query, stores, Superforms + Zod, and generated routes.",
        icon: Server,
        color: "bg-brand-peach",
        textColor: "text-ink",
      },
    ],
  },
  {
    label: "Quality",
    title: "Tooling wired before the first feature",
    description:
      "Linting, formatting, type checks, commit discipline, and git hooks are part of the starter instead of an afterthought.",
    accent: "bg-brand-ochre",
    items: [
      {
        title: "Strict TypeScript",
        description:
          "Strict type checking, noEmit builds, typed configs, and confident refactors.",
        icon: Code2,
        color: "bg-brand-mint",
        textColor: "text-ink",
      },
      {
        title: "ESLint and Biome",
        description:
          "React, Vue, Nuxt, and SvelteKit starters ship ESLint rules; Next ships Biome for linting, formatting, and import organization.",
        icon: Wrench,
        color: "bg-brand-lavender",
        textColor: "text-ink",
      },
      {
        title: "Husky, Commitlint, Commitizen",
        description:
          "Local hooks and conventional commits keep quality checks close to the workflow.",
        icon: GitCommit,
        color: "bg-brand-pink",
        textColor: "text-white",
      },
    ],
  },
  {
    label: "Generators",
    title: "New slices follow the same decisions",
    description:
      "The project configuration keeps generated features aligned with the framework, API client, state tools, and forms stack selected at creation time.",
    accent: "bg-brand-teal",
    items: [
      {
        title: "Project configuration",
        description:
          "fsd.config.json stores the selected framework and stack as a versioned source of truth.",
        icon: Database,
        color: "bg-brand-ochre",
        textColor: "text-ink",
      },
      {
        title: "Stack-aware generation",
        description:
          "Output adapts to Axios or Fetch, React, Vue or Svelte Query, framework-native stores, and form choices.",
        icon: CheckCircle2,
        color: "bg-brand-coral",
        textColor: "text-white",
      },
      {
        title: "Complete auth flow",
        description:
          "Generate login, registration, password recovery, reset, and verification files together.",
        icon: KeyRound,
        color: "bg-brand-teal",
        textColor: "text-white",
      },
    ],
  },
  {
    label: "Workflow",
    title: "Commands and CI habits included",
    description:
      "The templates document the same commands teams already expect in a production starter.",
    accent: "bg-brand-mint",
    items: [
      {
        title: "Quality commands",
        description:
          "Run lint, typecheck, build, FSD checks, and CI from a predictable workflow.",
        icon: Terminal,
        color: "bg-brand-peach",
        textColor: "text-ink",
      },
      {
        title: "CI-ready scripts",
        description:
          "React, Next, Vue, Nuxt, and SvelteKit editions expose scripts that can be dropped into automated checks.",
        icon: GitPullRequest,
        color: "bg-surface-card",
        textColor: "text-ink",
      },
      {
        title: "Guard rails for teams",
        description:
          "Commit rules, import organization, validation, and shared UI reduce drift as the codebase grows.",
        icon: ShieldCheck,
        color: "bg-brand-lavender",
        textColor: "text-ink",
      },
    ],
  },
];

function MiniCard({
  item,
  index,
  visible,
}: {
  item: Capability;
  index: number;
  visible: boolean;
}) {
  const Icon = item.icon;

  return (
    <div
      className={cn(
        "rounded-[20px] p-5 transition-all duration-500",
        item.color,
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className={cn(
          "mb-4 inline-flex h-9 w-9 items-center justify-center rounded-[12px]",
          item.textColor === "text-white" ? "bg-white/20" : "bg-ink/10",
        )}
      >
        <Icon
          className={cn(
            "h-4 w-4",
            item.textColor === "text-white" ? "text-white" : "text-ink",
          )}
        />
      </div>
      <h4
        className={cn("text-base font-semibold tracking-tight", item.textColor)}
      >
        {item.title}
      </h4>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed opacity-80",
          item.textColor,
        )}
      >
        {item.description}
      </p>
    </div>
  );
}

export function AllFeatures() {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.05,
  });

  return (
    <section id="capabilities" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-body-muted">
            Included Capabilities
          </p>
          <h2 className="text-3xl font-medium tracking-[-1.5px] text-ink sm:text-4xl md:text-[40px]">
            Every feature from the starters, visible in one place
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-body">
            The landing page reflects all five starters: React + Vite, Next.js
            App Router, Vue + Vite, Nuxt, and SvelteKit, plus the shared quality
            workflow that ties them together.
          </p>
        </div>

        <div ref={ref} className="space-y-8">
          {CAPABILITY_GROUPS.map((group, groupIndex) => (
            <article
              key={group.title}
              className={cn(
                "grid gap-5 rounded-[24px] border border-hairline bg-surface-soft p-5 transition-all duration-500 lg:grid-cols-[0.8fr_1.2fr]",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: `${groupIndex * 120}ms` }}
            >
              <div className="rounded-[20px] bg-canvas p-6">
                <span
                  className={cn(
                    "mb-5 inline-flex rounded-[9999px] px-3 py-1 text-xs font-semibold uppercase tracking-[1.5px] text-ink",
                    group.accent,
                  )}
                >
                  {group.label}
                </span>
                <h3 className="text-2xl font-medium tracking-[-0.5px] text-ink">
                  {group.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-body">
                  {group.description}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {group.items.map((item, itemIndex) => (
                  <MiniCard
                    key={item.title}
                    item={item}
                    index={itemIndex + groupIndex}
                    visible={isVisible}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
