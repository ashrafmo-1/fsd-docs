"use client";

import { ArrowRight, Copy, Check } from "lucide-react";
import { GitHubIcon } from "./github-icon";
import { useState } from "react";

function TerminalPreview() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm create fsd-architecture@latest");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full overflow-hidden rounded-[16px] border border-hairline bg-surface-dark shadow-lg">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-brand-coral/80" />
        <div className="h-3 w-3 rounded-full bg-brand-ochre/80" />
        <div className="h-3 w-3 rounded-full bg-brand-mint/80" />
        <span className="ml-2 text-xs text-white/40 font-mono">terminal</span>
      </div>
      <div className="px-5 py-5 font-mono text-sm leading-relaxed">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-0">
            <span className="text-brand-mint">$</span>
            <span className="ml-2 text-white/90">npm create fsd-architecture@latest</span>
            <span className="ml-1 inline-block h-4 w-2 bg-brand-mint/70 animate-terminal-blink" />
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex-shrink-0 rounded-md p-1.5 text-white/40 transition-colors hover:text-white/70"
            aria-label="Copy command"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-brand-mint" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
        <div className="mt-4 space-y-1.5 text-white/50">
          <p>
            <span className="text-brand-lavender">?</span>{" "}
            <span className="text-white/70">Project name:</span>{" "}
            <span className="text-brand-peach">my-app</span>
          </p>
          <p>
            <span className="text-brand-lavender">?</span>{" "}
            <span className="text-white/70">Select template:</span>{" "}
            <span className="text-brand-peach">React + Vite</span>
          </p>
          <p className="mt-3">
            <span className="text-brand-mint">✓</span>{" "}
            <span className="text-white/60">Scaffolding project in ./my-app</span>
          </p>
          <p>
            <span className="text-brand-mint">✓</span>{" "}
            <span className="text-white/60">Installing dependencies...</span>
          </p>
          <p>
            <span className="text-brand-mint">✓</span>{" "}
            <span className="text-white/60">Setting up ESLint + Husky</span>
          </p>
          <p className="mt-3 text-brand-mint">
            Done! cd my-app && npm run dev
          </p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative mx-auto max-w-[1280px] px-6 pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-[9999px] border border-hairline bg-surface-soft px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-mint" />
              <span className="text-xs font-medium text-body-muted">
                React + Vite and NextJs template available
              </span>
            </div>

            <h1 className="text-4xl font-medium leading-[1.05] tracking-[-2px] text-ink sm:text-5xl md:text-[56px] lg:text-[64px]">
              Ship Scalable Frontend Architecture{" "}
              <span className="text-brand-lavender">in Seconds</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-body">
              Scaffold production-ready React projects with{" "}
              <span className="font-medium text-ink">Feature-Sliced Design</span>{" "}
              — the architecture pattern trusted by teams who outgrow component
              folders.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#docs"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] bg-ink px-6 text-sm font-semibold text-on-primary transition-colors hover:bg-ink/90"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] border border-hairline bg-canvas px-6 text-sm font-semibold text-ink transition-colors hover:bg-surface-soft"
              >
                <GitHubIcon className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </div>

          <div className="animate-fade-in-up animate-delay-300">
            <TerminalPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
