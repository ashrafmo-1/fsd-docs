"use client";

import type { LucideIcon } from "lucide-react";
import {
  Clock,
  FileJson2,
  FolderTree,
  GitBranch,
  Layers,
  MessageSquareCode,
  PackagePlus,
  PanelsTopLeft,
  Settings2,
  Shield,
  Terminal,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  textColor: string;
  badge?: string;
}

const FEATURES: Feature[] = [
  {
    title: "Feature-Sliced Design",
    description:
      "A battle-tested architecture with clear layer boundaries. Every file has a home, every import follows the rules.",
    icon: Layers,
    color: "bg-brand-lavender",
    textColor: "text-ink",
  },
  {
    title: "React + Vite Template",
    description:
      "Start with a fast, modern stack. Vite's instant HMR paired with a scalable architecture from day one.",
    icon: Zap,
    color: "bg-brand-peach",
    textColor: "text-ink",
  },
  {
    title: "Next.js Support",
    description:
      "App Router, React Compiler, Tailwind CSS, Biome, and framework-aware FSD route composition.",
    icon: GitBranch,
    color: "bg-brand-teal",
    textColor: "text-white",
  },
  {
    title: "Vue + Vite Support",
    description:
      "Vue 3, Pinia, TanStack Vue Query, VeeValidate + Zod, and framework-native FSD generators.",
    icon: PanelsTopLeft,
    color: "bg-brand-mint",
    textColor: "text-ink",
  },
  {
    title: "Nuxt 4 Support",
    description:
      "SSR-aware Vue Query, Pinia and VeeValidate modules, native Fetch, and generated file-based routes.",
    icon: PanelsTopLeft,
    color: "bg-brand-lavender",
    textColor: "text-ink",
    badge: "New in 2.4",
  },
  {
    title: "SvelteKit Support",
    description:
      "Svelte 5, SSR-ready Svelte Query, native stores, Superforms + Zod, and generated file-based routes.",
    icon: PanelsTopLeft,
    color: "bg-brand-peach",
    textColor: "text-ink",
    badge: "New in 2.5",
  },
  {
    title: "Husky Git Hooks",
    description:
      "Pre-commit hooks configured out of the box. Catch issues before they hit your repository.",
    icon: Shield,
    color: "bg-brand-ochre",
    textColor: "text-ink",
  },
  {
    title: "Commit Linting",
    description:
      "Enforce conventional commits automatically. Keep your git history clean and meaningful.",
    icon: MessageSquareCode,
    color: "bg-brand-pink",
    textColor: "text-white",
  },
  {
    title: "ESLint Configured",
    description:
      "ESLint powers the React, Vue, Nuxt, and SvelteKit starters, while Biome powers Next with linting, formatting, and import organization.",
    icon: Settings2,
    color: "bg-surface-card",
    textColor: "text-ink",
  },
  {
    title: "Clean Scaffolding",
    description:
      "No leftover boilerplate. Every file has a purpose, every folder follows the FSD convention.",
    icon: FolderTree,
    color: "bg-brand-mint",
    textColor: "text-ink",
  },
  {
    title: "Slice Generators",
    description:
      "Add features, entities, widgets, pages, and auth flows using each framework's configured source directory.",
    icon: PackagePlus,
    color: "bg-surface-card",
    textColor: "text-ink",
  },
  {
    title: "Project Configuration",
    description:
      "Save framework, API, state, forms, UI, and package-manager choices once in fsd.config.json.",
    icon: FileJson2,
    color: "bg-brand-lavender",
    textColor: "text-ink",
  },
  {
    title: "Developer-Friendly CLI",
    description:
      "Interactive prompts guide you through setup. No memorizing flags — just answer questions.",
    icon: Terminal,
    color: "bg-brand-coral",
    textColor: "text-white",
  },
  {
    title: "Fast Setup",
    description:
      "Move from one command to a runnable project without rebuilding the same architecture and tooling setup by hand.",
    icon: Clock,
    color: "bg-brand-peach",
    textColor: "text-ink",
  },
  {
    title: "Scales With Your Team",
    description:
      "FSD's layer system means your architecture stays clean whether you're solo or a team of fifty.",
    icon: TrendingUp,
    color: "bg-brand-lavender",
    textColor: "text-ink",
  },
];

function FeatureCard({
  feature,
  index,
  isVisible,
}: {
  feature: Feature;
  index: number;
  isVisible: boolean;
}) {
  const Icon = feature.icon;

  return (
    <div
      className={cn(
        "rounded-[24px] p-8 transition-all duration-500",
        feature.color,
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      )}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      {feature.badge && (
        <span
          className={cn(
            "mb-4 inline-block rounded-[9999px] px-3 py-1 text-xs font-semibold",
            feature.textColor === "text-white"
              ? "bg-white/20 text-white"
              : "bg-ink/10 text-ink",
          )}
        >
          {feature.badge}
        </span>
      )}
      <div
        className={cn(
          "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[12px]",
          feature.textColor === "text-white" ? "bg-white/20" : "bg-ink/10",
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5",
            feature.textColor === "text-white" ? "text-white" : "text-ink",
          )}
        />
      </div>
      <h3
        className={cn(
          "text-lg font-semibold tracking-tight",
          feature.textColor,
        )}
      >
        {feature.title}
      </h3>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed opacity-80",
          feature.textColor,
        )}
      >
        {feature.description}
      </p>
    </div>
  );
}

export function FeatureCards() {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.05,
  });

  return (
    <section id="features" className="bg-surface-soft py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-body-muted">
            Features
          </p>
          <h2 className="text-3xl font-medium tracking-[-1.5px] text-ink sm:text-4xl md:text-[40px]">
            A complete foundation, not an empty folder tree
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-body">
            Every template comes with the tooling and structure your team needs
            — configured, not just installed.
          </p>
        </div>

        <div ref={ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
