"use client";

import {
  ArrowRight,
  Boxes,
  Check,
  ChevronDown,
  Copy,
  KeyRound,
  PanelsTopLeft,
  Settings2,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute right-3 top-3 rounded-md p-1.5 text-white/30 transition-colors hover:text-white/60"
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-brand-mint" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

function CodeBlock({
  code,
  language = "bash",
}: {
  code: string;
  language?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[12px] bg-surface-dark">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
        <span className="text-xs text-white/30">{language}</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-white/80">
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const answerId = useId();

  return (
    <div className="border-b border-hairline">
      <button
        type="button"
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={answerId}
      >
        <span className="text-base font-medium text-ink">{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 flex-shrink-0 text-body-muted transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <section
        id={answerId}
        aria-label={question}
        className={cn(
          "grid transition-[grid-template-rows] duration-200",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-base leading-relaxed text-body">{answer}</p>
        </div>
      </section>
    </div>
  );
}

const DOC_LINKS = [
  {
    title: "Project scaffolding",
    description:
      "Create a new React + Vite, Next.js, Vue + Vite, or Nuxt FSD project through the interactive wizard.",
    href: "/docs/getting-started",
    icon: Terminal,
    color: "bg-brand-peach",
  },
  {
    title: "Project configuration",
    description:
      "See how fsd.config.json stores stack choices and keeps every generator consistent.",
    href: "/docs/configuration",
    icon: Settings2,
    color: "bg-brand-peach",
  },
  {
    title: "Slice generator",
    description:
      "Generate features, entities, widgets, and pages inside an existing project using its framework source root.",
    href: "/docs/slice-generator",
    icon: Boxes,
    color: "bg-brand-mint",
  },
  {
    title: "Auth generator",
    description:
      "Create five auth flows with framework-native Query, state, and form integrations.",
    href: "/docs/auth-generator",
    icon: KeyRound,
    color: "bg-brand-lavender",
  },
  {
    title: "Vue + Vite guide",
    description:
      "Learn the Vue template defaults, FSD structure, native generators, and quality workflow.",
    href: "/docs/frameworks/vue",
    icon: PanelsTopLeft,
    color: "bg-brand-mint",
  },
  {
    title: "Nuxt guide",
    description:
      "Learn the Nuxt app-root structure, SSR providers, native API client, routes, and generators.",
    href: "/docs/frameworks/nuxt",
    icon: PanelsTopLeft,
    color: "bg-brand-lavender",
  },
];

const TEMPLATES = [
  {
    name: "React + Vite",
    status: "Available",
    statusColor: "bg-brand-mint text-ink",
    description:
      "React 19, Vite 8, TypeScript, Tailwind CSS 4, ESLint, Steiger, Husky, Commitlint",
  },
  {
    name: "Next.js",
    status: "Available",
    statusColor: "bg-brand-lavender text-ink",
    description:
      "Next 16, React 19, App Router, React Compiler, Tailwind CSS 4, Biome, Steiger",
  },
  {
    name: "Vue + Vite",
    status: "Available",
    statusColor: "bg-brand-mint text-ink",
    description:
      "Vue 3, Vite 8, Pinia, TanStack Vue Query, VeeValidate + Zod, Tailwind CSS 4, ESLint, Steiger",
  },
  {
    name: "Nuxt",
    status: "Available",
    statusColor: "bg-brand-lavender text-ink",
    description:
      "Nuxt 4, Vue 3, SSR, native Fetch, Pinia, Vue Query hydration, VeeValidate + Zod, Nuxt ESLint, Steiger",
  },
];

const ROADMAP = [
  { item: "React + Vite template", done: true },
  { item: "Next.js App Router template", done: true },
  { item: "Interactive project wizard", done: true },
  { item: "In-project slice generators", done: true },
  { item: "Auth feature generator", done: true },
  { item: "React Query, Zustand, Redux Toolkit presets", done: true },
  { item: "Framework adapter core", done: true },
  { item: "Branded starter home experience", done: true },
  { item: "Vue + Vite template and generators", done: true },
  { item: "Nuxt template and generators", done: true },
  { item: "Cross-package E2E test matrix", done: true },
  { item: "SvelteKit adapter", done: false },
];

const FAQ_ITEMS = [
  {
    question: "What changed in version 2?",
    answer:
      "The CLI scaffolds full projects and generates FSD slices inside existing projects. Version 2.4 adds stable Nuxt 4 scaffolding, SSR-aware providers, native Fetch, and generated file-based routes.",
  },
  {
    question: "Does the generator install dependencies?",
    answer:
      "Project creation can install dependencies when you approve the wizard prompt. In-project generation does not run a package manager; it uses the dependencies and stack recorded in fsd.config.json.",
  },
  {
    question: "Where are generated slices created?",
    answer:
      "The framework adapter owns the source root. React, Next.js, and Vue + Vite use src/* layers, while Nuxt uses app/* layers.",
  },
  {
    question: "Can I overwrite an existing slice?",
    answer:
      "Existing slices are protected by default. Use --force when you intentionally want to overwrite one.",
  },
];

export function Documentation() {
  return (
    <section id="docs" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-body-muted">
            Documentation
          </p>
          <h2 className="text-3xl font-medium tracking-[-1.5px] text-ink sm:text-4xl md:text-[40px]">
            One source of truth for the CLI
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-body">
            Create projects, understand their saved configuration, and generate
            typed slices from the same package.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-[7fr_5fr] lg:gap-24">
          <div className="space-y-12">
            <div className="grid gap-4 sm:grid-cols-2">
              {DOC_LINKS.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="group rounded-[16px] border border-hairline bg-canvas p-5 transition-colors hover:bg-surface-soft"
                  >
                    <span
                      className={cn(
                        "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[12px]",
                        link.color,
                      )}
                    >
                      <Icon className="h-5 w-5 text-ink" />
                    </span>
                    <h3 className="text-base font-semibold text-ink">
                      {link.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">
                      {link.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                      Read docs
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>

            <div>
              <h3 className="mb-4 text-xl font-medium tracking-[-0.3px] text-ink">
                Project scaffolding
              </h3>
              <p className="mb-4 text-base leading-relaxed text-body">
                No generator flag keeps the existing interactive project
                creation wizard.
              </p>
              <div className="space-y-3">
                <CodeBlock code="npm create fsd-architecture@latest" />
                <CodeBlock code="npx create-fsd-architecture@latest" />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-medium tracking-[-0.3px] text-ink">
                In-project slice generation
              </h3>
              <p className="mb-4 text-base leading-relaxed text-body">
                Generate FSD features, entities, widgets, and pages from inside
                an existing project.
              </p>
              <CodeBlock
                code={`npx create-fsd-architecture --generate feature auth
npx create-fsd-architecture -g entity product
npx create-fsd-architecture --generate widget navbar
npx create-fsd-architecture --generate page checkout`}
              />
            </div>
          </div>

          <div className="space-y-16">
            <div>
              <h3 className="mb-4 text-xl font-medium tracking-[-0.3px] text-ink">
                Available templates
              </h3>
              <div className="space-y-3">
                {TEMPLATES.map((t) => (
                  <div
                    key={t.name}
                    className="rounded-[16px] border border-hairline bg-canvas p-5"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-base font-semibold text-ink">
                        {t.name}
                      </span>
                      <span
                        className={cn(
                          "rounded-[9999px] px-2.5 py-0.5 text-xs font-medium",
                          t.statusColor,
                        )}
                      >
                        {t.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-body">{t.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-medium tracking-[-0.3px] text-ink">
                Roadmap
              </h3>
              <div className="space-y-2">
                {ROADMAP.map((r) => (
                  <div key={r.item} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full text-xs",
                        r.done
                          ? "bg-brand-mint text-ink"
                          : "border border-hairline bg-canvas text-body-muted",
                      )}
                    >
                      {r.done ? "✓" : ""}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        r.done ? "text-ink" : "text-body-muted",
                      )}
                    >
                      {r.item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-medium tracking-[-0.3px] text-ink">
                FAQ
              </h3>
              <div>
                {FAQ_ITEMS.map((item) => (
                  <FaqItem
                    key={item.question}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
