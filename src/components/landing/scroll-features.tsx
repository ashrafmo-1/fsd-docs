"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "step-name",
    title: "Choose your project name",
    description:
      "Run the CLI and name your project. The scaffolder creates a clean directory with your chosen name, ready for development.",
    terminal: [
      { type: "command" as const, text: "npm create fsd-architecture@latest" },
      { type: "prompt" as const, text: "Project name: ", answer: "my-app" },
    ],
    accentText: "text-brand-mint",
    accentBackground: "bg-brand-mint",
    accentForeground: "text-ink",
  },
  {
    id: "step-template",
    title: "Select your template",
    description:
      "Pick from four production-ready templates. React + Vite, Next.js, Vue + Vite, and Nuxt each include the full FSD structure.",
    terminal: [
      { type: "command" as const, text: "npm create fsd-architecture@latest" },
      { type: "prompt" as const, text: "Project name: ", answer: "my-app" },
      {
        type: "prompt" as const,
        text: "Select template: ",
        answer: "React, Next.js, Vue, or Nuxt",
      },
    ],
    accentText: "text-brand-lavender",
    accentBackground: "bg-brand-lavender",
    accentForeground: "text-ink",
  },
  {
    id: "step-scaffold",
    title: "Download the template",
    description:
      "The CLI downloads the selected template with the complete Feature-Sliced Design folder structure — app, pages, widgets, features, entities, and shared layers.",
    terminal: [
      { type: "command" as const, text: "npm create fsd-architecture@latest" },
      { type: "success" as const, text: "✓ Template downloaded" },
      { type: "success" as const, text: "✓ Complete FSD layers ready" },
      { type: "success" as const, text: "✓ fsd.config.json written" },
      { type: "success" as const, text: "✓ Git and Husky configured" },
    ],
    accentText: "text-brand-peach",
    accentBackground: "bg-brand-peach",
    accentForeground: "text-ink",
  },
  {
    id: "step-deps",
    title: "Install dependencies",
    description:
      "Choose whether to install dependencies now. The selected stack, linting, strict TypeScript, Steiger, Husky, Commitlint, and Tailwind configuration are already prepared.",
    terminal: [
      { type: "success" as const, text: "✓ Template configured" },
      { type: "info" as const, text: "  Installing dependencies..." },
      { type: "success" as const, text: "✓ Dependencies installed" },
      { type: "success" as const, text: "✓ ESLint or Biome configured" },
      { type: "success" as const, text: "✓ TypeScript checks ready" },
      { type: "success" as const, text: "✓ Husky hooks set up" },
      { type: "success" as const, text: "✓ Commitlint ready" },
    ],
    accentText: "text-brand-ochre",
    accentBackground: "bg-brand-ochre",
    accentForeground: "text-ink",
  },
  {
    id: "step-dev",
    title: "Start building",
    description:
      "Run the dev server and start writing features. Your project already has a scalable architecture — just add slices to the right layers.",
    terminal: [
      { type: "command" as const, text: "cd my-app && npm run dev" },
      { type: "info" as const, text: " " },
      { type: "info" as const, text: "  Development server ready" },
      { type: "info" as const, text: "" },
      {
        type: "success" as const,
        text: "  ➜  Local:   http://localhost:5173/",
      },
      {
        type: "info" as const,
        text: "  ➜  Network: http://192.168.1.10:5173/",
      },
    ],
    accentText: "text-brand-coral",
    accentBackground: "bg-brand-coral",
    accentForeground: "text-white",
  },
  {
    id: "step-ship",
    title: "Ship scalable architecture",
    description:
      "Your project follows Feature-Sliced Design from day one. Clear boundaries make future refactors smaller and easier to reason about as the team grows.",
    terminal: [
      { type: "info" as const, text: "src/ or app/" },
      { type: "info" as const, text: "├── app/          # providers, routing" },
      {
        type: "info" as const,
        text: "├── pages/        # route compositions",
      },
      {
        type: "info" as const,
        text: "├── widgets/      # complex UI blocks",
      },
      { type: "info" as const, text: "├── features/     # user interactions" },
      { type: "info" as const, text: "├── entities/     # business models" },
      { type: "info" as const, text: "└── shared/       # reusable code" },
      { type: "info" as const, text: "" },
      {
        type: "success" as const,
        text: "✓ Architecture scales with your team",
      },
    ],
    accentText: "text-brand-mint",
    accentBackground: "bg-brand-mint",
    accentForeground: "text-ink",
  },
];

function TerminalVisual({
  lines,
  accentText,
}: {
  lines: (typeof STEPS)[number]["terminal"];
  accentText: string;
}) {
  return (
    <div className="rounded-[16px] border border-hairline bg-surface-dark shadow-lg overflow-hidden">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-brand-coral/80" />
        <div className="h-3 w-3 rounded-full bg-brand-ochre/80" />
        <div className="h-3 w-3 rounded-full bg-brand-mint/80" />
      </div>
      <div className="px-5 py-5 font-mono text-sm leading-relaxed">
        {lines.map((line) => (
          <div
            key={`${line.type}-${line.text}-${"answer" in line ? line.answer : "output"}`}
            className="min-h-[1.5em]"
          >
            {line.type === "command" && (
              <span>
                <span className={accentText}>$</span>{" "}
                <span className="text-white/90">{line.text}</span>
              </span>
            )}
            {line.type === "prompt" && (
              <span>
                <span className="text-brand-lavender">?</span>{" "}
                <span className="text-white/70">{line.text}</span>
                {"answer" in line && (
                  <span className="text-brand-peach">{line.answer}</span>
                )}
              </span>
            )}
            {line.type === "success" && (
              <span>
                <span className="text-brand-mint">
                  {line.text.startsWith("✓") ? "" : "  "}
                </span>
                <span className="text-brand-mint">{line.text}</span>
              </span>
            )}
            {line.type === "info" && (
              <span className="text-white/50">{line.text}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScrollFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(
              entry.target as HTMLDivElement,
            );
            if (index !== -1) setActiveIndex(index);
          }
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0.2 },
    );

    for (const ref of stepRefs.current) {
      if (ref) observer.observe(ref);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-body-muted">
            How It Works
          </p>
          <h2 className="text-3xl font-medium tracking-[-1.5px] text-ink sm:text-4xl md:text-[40px]">
            From one command to a scalable foundation
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-body">
            Six steps. One command. A production-ready architecture that grows
            with your team.
          </p>
        </div>

        <div className="relative lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="space-y-8 lg:space-y-0">
            {STEPS.map((step, i) => (
              <div
                key={step.id}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="lg:min-h-[40vh] lg:flex lg:items-center"
              >
                <div
                  className={cn(
                    "rounded-[24px] p-8 transition-all duration-500",
                    activeIndex === i ? "bg-surface-soft" : "bg-transparent",
                  )}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300",
                        activeIndex === i
                          ? `${step.accentBackground} ${step.accentForeground}`
                          : "bg-surface-card text-body-muted",
                      )}
                    >
                      {i + 1}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-[1.5px] text-body-muted">
                      Step {i + 1}
                    </p>
                  </div>
                  <h3 className="text-2xl font-medium tracking-[-0.5px] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-body">
                    {step.description}
                  </p>

                  <div className="mt-6 lg:hidden">
                    <TerminalVisual
                      lines={step.terminal}
                      accentText={step.accentText}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-32 min-h-[360px]">
              <div className="relative">
                {STEPS.map((step, i) => (
                  <div
                    key={step.id}
                    className={cn(
                      "absolute inset-0 transition-all duration-500",
                      activeIndex === i
                        ? "opacity-100 translate-y-0"
                        : i < activeIndex
                          ? "opacity-0 -translate-y-4"
                          : "opacity-0 translate-y-4",
                    )}
                    style={{ position: i === 0 ? "relative" : "absolute" }}
                  >
                    <TerminalVisual
                      lines={step.terminal}
                      accentText={step.accentText}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
