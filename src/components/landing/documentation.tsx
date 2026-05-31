"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check, ChevronDown } from "lucide-react";

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
      aria-label="Copy"
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

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-hairline">
      <button
        type="button"
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-base font-medium text-ink">{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 flex-shrink-0 text-body-muted transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-base leading-relaxed text-body">{answer}</p>
        </div>
      </div>
    </div>
  );
}

const TEMPLATES = [
  {
    name: "React + Vite",
    status: "Available",
    statusColor: "bg-brand-mint text-ink",
    description: "React 18+, Vite, TypeScript, ESLint, Husky, commitlint",
  },
  {
    name: "Next.js",
    status: "Available",
    statusColor: "bg-brand-lavender text-ink",
    description: "App Router, Server Components, TypeScript, ESLint, Husky",
  },
];

const ROADMAP = [
  { item: "React + Vite template", done: true },
  { item: "Interactive CLI prompts", done: true },
  { item: "ESLint + Husky + commitlint", done: true },
  { item: "FSD folder structure generation", done: true },
  { item: "Next.js App Router template", done: false },
  { item: "Vue + Vite template", done: false },
  { item: "Custom layer configuration", done: false },
  { item: "Slice generators (add feature/entity)", done: false },
];

const FAQ_ITEMS = [
  {
    question: "What is Feature-Sliced Design?",
    answer:
      "Feature-Sliced Design (FSD) is an architectural methodology for frontend applications. It divides your codebase into layers (app, pages, widgets, features, entities, shared) with strict import rules — upper layers can import from lower layers, but never the reverse. This keeps your codebase predictable and maintainable as it grows.",
  },
  {
    question: "Do I need to know FSD before using this tool?",
    answer:
      "No. The CLI generates the full structure for you with clear folder naming. The architecture is self-documenting — you'll learn FSD naturally by working within the generated structure. Each layer has a clear purpose that guides where new code should go.",
  },
  {
    question: "Can I customize the generated structure?",
    answer:
      "The generated project gives you a clean starting point. You can add, remove, or rename slices within any layer. The key principle to follow is the layer dependency rule: only import from layers below your current layer.",
  },
  {
    question: "What's included in the React + Vite template?",
    answer:
      "The template includes React 18+, Vite with fast HMR, TypeScript, ESLint with recommended rules, Husky pre-commit hooks, commitlint for conventional commits, and the complete FSD folder structure with example slices.",
  },
  {
    question: "When is Next.js support coming?",
    answer:
      "Next.js with App Router support is actively in development. It will include Server Components, the complete FSD structure adapted for Next.js conventions, and the same tooling setup (ESLint, Husky, commitlint).",
  },
  {
    question: "Is this tool free and open source?",
    answer:
      "Yes. create-fsd-architecture is completely free and open source under the MIT license. Contributions are welcome on GitHub.",
  },
];

export function Documentation() {
  return (
    <section id="docs" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-body-muted">
            Documentation
          </p>
          <h2 className="text-3xl font-medium tracking-[-1.5px] text-ink sm:text-4xl md:text-[40px]">
            Get started in minutes
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-[7fr_5fr] lg:gap-24">
          <div className="space-y-16">
            {/* Installation */}
            <div>
              <h3 className="mb-4 text-xl font-medium tracking-[-0.3px] text-ink">
                Installation
              </h3>
              <p className="mb-4 text-base leading-relaxed text-body">
                No global install needed. Run the CLI directly with your
                preferred package manager:
              </p>
              <div className="space-y-3">
                <CodeBlock code="npm create fsd-architecture@latest" />
                <CodeBlock code="yarn create fsd-architecture" />
                <CodeBlock code="pnpm create fsd-architecture" />
              </div>
            </div>

            {/* Usage */}
            <div>
              <h3 className="mb-4 text-xl font-medium tracking-[-0.3px] text-ink">
                Usage
              </h3>
              <p className="mb-4 text-base leading-relaxed text-body">
                The CLI walks you through setup with interactive prompts:
              </p>
              <CodeBlock
                language="bash"
                code={`$ npm create fsd-architecture@latest

? Project name: my-app
? Select a template: React + Vite

Scaffolding project in ./my-app...

Done. Now run:

  cd my-app
  npm install
  npm run dev`}
              />
            </div>

            {/* Project Structure */}
            <div>
              <h3 className="mb-4 text-xl font-medium tracking-[-0.3px] text-ink">
                Project Structure
              </h3>
              <p className="mb-4 text-base leading-relaxed text-body">
                The generated project follows the Feature-Sliced Design
                methodology:
              </p>
              <CodeBlock
                language="text"
                code={`my-app/
├── src/
│   ├── app/            # App initialization, providers, routing
│   ├── pages/          # Page compositions (route-level)
│   ├── widgets/        # Complex UI blocks (header, sidebar)
│   ├── features/       # User interactions (auth, forms)
│   ├── entities/       # Business entities (user, product)
│   └── shared/         # Reusable code (UI kit, utils, config)
├── .husky/             # Git hooks
├── .eslintrc.cjs       # ESLint configuration
├── commitlint.config.cjs
├── vite.config.ts
├── tsconfig.json
└── package.json`}
              />
            </div>

            {/* CLI Flow */}
            <div>
              <h3 className="mb-4 text-xl font-medium tracking-[-0.3px] text-ink">
                CLI Flow
              </h3>
              <p className="mb-4 text-base leading-relaxed text-body">
                Here&apos;s what happens when you run the CLI:
              </p>
              <ol className="space-y-3 text-base leading-relaxed text-body">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-surface-card text-xs font-semibold text-ink">
                    1
                  </span>
                  <span>
                    <span className="font-medium text-ink">Project name</span> —
                    enter a name for your new project directory.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-surface-card text-xs font-semibold text-ink">
                    2
                  </span>
                  <span>
                    <span className="font-medium text-ink">Template selection</span>{" "}
                    — choose from available templates (React + Vite).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-surface-card text-xs font-semibold text-ink">
                    3
                  </span>
                  <span>
                    <span className="font-medium text-ink">Scaffolding</span> —
                    the FSD folder structure is generated with all layers.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-surface-card text-xs font-semibold text-ink">
                    4
                  </span>
                  <span>
                    <span className="font-medium text-ink">Tooling setup</span> —
                    ESLint, Husky, and commitlint are configured automatically.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-surface-card text-xs font-semibold text-ink">
                    5
                  </span>
                  <span>
                    <span className="font-medium text-ink">Ready</span> — install
                    dependencies and start the dev server.
                  </span>
                </li>
              </ol>
            </div>
          </div>

          <div className="space-y-16">
            {/* Templates */}
            <div>
              <h3 className="mb-4 text-xl font-medium tracking-[-0.3px] text-ink">
                Available Templates
              </h3>
              <div className="space-y-3">
                {TEMPLATES.map((t) => (
                  <div
                    key={t.name}
                    className="rounded-[16px] border border-hairline bg-canvas p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base font-semibold text-ink">
                        {t.name}
                      </span>
                      <span
                        className={cn(
                          "rounded-[9999px] px-2.5 py-0.5 text-xs font-medium",
                          t.statusColor
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

            {/* Roadmap */}
            {/* <div>
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
                          : "border border-hairline bg-canvas text-body-muted"
                      )}
                    >
                      {r.done ? "✓" : ""}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        r.done ? "text-ink" : "text-body-muted"
                      )}
                    >
                      {r.item}
                    </span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* FAQ */}
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
