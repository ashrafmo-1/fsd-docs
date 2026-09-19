"use client";

import { ArrowRight, Check, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { GitHubIcon } from "./github-icon";

function TerminalPreview() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      "npx create-fsd-architecture --generate feature auth",
    );
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
            <span className="ml-2 text-white/90">
              npx create-fsd-architecture --generate feature auth
            </span>
            <span className="ml-1 inline-block h-4 w-2 bg-brand-mint/70 animate-terminal-blink" />
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex-shrink-0 rounded-md p-1.5 text-white/40 transition-colors hover:text-white/70"
            aria-label="Copy generator command"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-brand-mint" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Command copied" : ""}
          </span>
        </div>
        <div className="mt-4 space-y-1.5 text-white/50">
          <p>
            <span className="text-brand-mint">✓</span>{" "}
            <span className="text-white/70">Loaded fsd.config.json</span>
          </p>
          <p>
            <span className="text-brand-lavender">◆</span>{" "}
            <span className="text-white/70">Stack:</span>{" "}
            <span className="text-brand-peach">
              Fetch + Svelte Query + Svelte store
            </span>
          </p>
          <p className="mt-3">
            <span className="text-brand-mint">✓</span>{" "}
            <span className="text-white/60">
              Detected SvelteKit and created src/features/auth
            </span>
          </p>
          <p>
            <span className="text-brand-mint">✓</span>{" "}
            <span className="text-white/60">Generated public index.ts API</span>
          </p>
          <p>
            <span className="text-brand-mint">✓</span>{" "}
            <span className="text-white/60">
              Added framework-native auth boilerplate
            </span>
          </p>
          <p className="mt-3 text-brand-mint">Done! Auth flow created</p>
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
                v2.5: SvelteKit support is now stable
              </span>
            </div>

            <h1 className="text-4xl font-medium leading-[1.05] tracking-[-2px] text-ink sm:text-5xl md:text-[56px] lg:text-[64px]">
              Build scalable frontends{" "}
              <span className="text-brand-lavender">from day one</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-body">
              Create React + Vite, Next.js, Vue + Vite, Nuxt, or SvelteKit
              projects and generate{" "}
              <span className="font-medium text-ink">
                Feature-Sliced Design slices
              </span>{" "}
              inside existing codebases. Your framework and stack choices stay
              consistent through one project configuration.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/docs/getting-started"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] bg-ink px-6 text-sm font-semibold text-on-primary transition-colors hover:bg-ink/90"
              >
                Read the Docs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={siteConfig.github}
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
