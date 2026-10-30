import type { Metadata } from "next";
import { PublishedDocumentationVideo } from "@/components/docs/published-documentation-video";

export const metadata: Metadata = {
  title: "FAQ and Glossary",
  description:
    "Answers to common FSD CLI questions and definitions of the Feature-Sliced Design and CLI terms used across the docs.",
  alternates: { canonical: "/docs/faq" },
};

const FAQ: { id: string; question: string; answer: string }[] = [
  {
    id: "fsd-vs-cli",
    question: "Is this the official Feature-Sliced Design tool?",
    answer:
      "No. FSD is a methodology maintained at feature-sliced.design. FSD CLI is an independent tool that scaffolds projects and generates slices that follow it.",
  },
  {
    id: "fsd-or-create",
    question: "What is the difference between fsd and create-fsd-architecture?",
    answer:
      "Nothing. They are two names for the same CLI. Install it globally with npm install -g create-fsd-architecture to get the shorter fsd command, or run it once with npx create-fsd-architecture@latest.",
  },
  {
    id: "which-frameworks",
    question: "Which frameworks are supported?",
    answer:
      "React + Vite, Next.js, Vue + Vite, Nuxt, and SvelteKit can be scaffolded and generated. Angular projects can be inspected read-only; scaffolding Angular is not available yet.",
  },
  {
    id: "node-version",
    question: "Which Node.js version do I need?",
    answer:
      "Node.js 22.12.0 or later for the CLI. Nuxt and SvelteKit projects need 22.22.2 or later. Node.js 20 is not supported since CLI 2.7.0.",
  },
  {
    id: "existing-project",
    question: "Can I use the CLI in a project it did not create?",
    answer:
      "Yes. Generators infer the stack from package.json when fsd.config.json is missing, and structure-only generation with --segments adds layers without touching existing files. For a guided migration, use the AI Agent Skill.",
  },
  {
    id: "install-deps",
    question: "Does generating a slice install dependencies?",
    answer:
      "No. Only project creation runs the package manager. Generators use the stack already recorded in fsd.config.json.",
  },
  {
    id: "overwrite",
    question: "Can a generator overwrite my code?",
    answer:
      "Not by default. Existing slices are protected; --force replaces a single slice you name, and batch generation refuses --force. Preview any command with --dry-run.",
  },
  {
    id: "source-root",
    question: "Where are slices created?",
    answer:
      "Under the framework's source root: src/ for React, Next.js, Vue, and SvelteKit, and app/ for Nuxt. Structure-only mode accepts a different --root.",
  },
  {
    id: "check-imports",
    question: "Does the CLI enforce FSD import rules?",
    answer:
      "The CLI creates the structure; Steiger enforces the rules. Every template installs Steiger and runs it in npm run ci, and check --architecture runs it on demand.",
  },
  {
    id: "upgrade-project",
    question: "Does installing a newer CLI update my project?",
    answer:
      "No. Run upgrade --dry-run to see the plan and upgrade --yes to apply it. Only CLI-owned files change, and the upgrade rolls back on failure.",
  },
  {
    id: "package-managers",
    question: "Can I use pnpm, Yarn, or Bun?",
    answer:
      "Yes. Pass --package-manager pnpm, yarn, or bun when creating the project. The choice is saved in fsd.config.json and used for lockfiles and commands.",
  },
  {
    id: "backend",
    question: "Does the CLI create a backend or database?",
    answer:
      "No. It generates frontend code. Auth and API slices call endpoints you provide, and the optional Supabase adapter talks to a Supabase project you own.",
  },
  {
    id: "telemetry",
    question: "Does the CLI collect telemetry?",
    answer:
      "No. It downloads the pinned template and runs your package manager; it sends nothing about you or your project.",
  },
  {
    id: "license",
    question: "Can I use it in commercial projects?",
    answer:
      "The CLI is released under the MIT license. Before reusing a template repository on its own, outside a generated project, check that repository for its license terms.",
  },
];

const GLOSSARY: [term: string, definition: string][] = [
  [
    "Layer",
    "A top-level folder with a fixed rank: app, pages, widgets, features, entities, shared. Code imports only from lower layers.",
  ],
  [
    "Slice",
    "A folder inside a layer named after a business concept, such as entities/product or features/cart.",
  ],
  [
    "Segment",
    "A folder inside a slice grouped by technical purpose: ui, model, api, lib, config.",
  ],
  [
    "Public API",
    "The slice's index.ts. Other code imports the slice only through it.",
  ],
  [
    "Entity",
    "A business object the product works with, like a product or user.",
  ],
  [
    "Feature",
    "A user interaction that brings value, like adding to a cart or signing in.",
  ],
  [
    "Widget",
    "A large, self-contained UI block composed from features and entities.",
  ],
  [
    "Preset",
    "A generator name with ready-made content: navbar, sidebar, footer, bottom-bar widgets and home, about, consult pages.",
  ],
  [
    "Structure-only mode",
    "Generation with --segments that creates folders and empty public APIs without overwriting files.",
  ],
  [
    "Batch generation",
    "Passing several names in one command; all slices are checked first and earlier ones roll back if a later one fails.",
  ],
  [
    "fsd.config.json",
    "The project file that records framework and stack choices so generators produce matching code.",
  ],
  [
    "Ownership manifest",
    "The .fsd/manifest.json file that records which files the CLI owns, so upgrades change only those.",
  ],
  [
    "Managed upgrade",
    "A migration applied by the upgrade command to CLI-owned tooling, with conflict detection and rollback.",
  ],
  ["Steiger", "The FSD linter that checks layer, slice, and public-API rules."],
  [
    "Agent Skill",
    "The fsd-cli skill that lets coding agents inspect, implement, and migrate FSD projects using the CLI.",
  ],
];

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <article className="max-w-4xl">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Static JSON-LD built from constants on this page.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Help
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        FAQ and glossary
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        Quick answers to the questions people ask most, and the terms used
        across these docs. If a command fails, run{" "}
        <code>npx create-fsd-architecture@latest doctor</code> first.
      </p>

      <PublishedDocumentationVideo pageKey="/docs/faq" />

      <section className="mt-10 space-y-3">
        <h2
          id="faq"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Frequently asked questions
        </h2>
        {FAQ.map((item) => (
          <details
            key={item.id}
            id={item.id}
            className="group rounded-2xl border border-hairline p-5"
          >
            <summary className="cursor-pointer list-none font-semibold text-ink [&::-webkit-details-marker]:hidden">
              <h3 className="inline">{item.question}</h3>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-body">
              {item.answer}
            </p>
          </details>
        ))}
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="glossary"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Glossary
        </h2>
        <dl className="divide-y divide-hairline rounded-2xl border border-hairline">
          {GLOSSARY.map(([term, definition]) => (
            <div
              key={term}
              className="grid gap-1 px-5 py-4 sm:grid-cols-[200px_1fr]"
            >
              <dt className="font-semibold text-ink">{term}</dt>
              <dd className="text-sm leading-relaxed text-body">
                {definition}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
