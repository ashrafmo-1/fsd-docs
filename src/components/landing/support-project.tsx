"use client";

import { ArrowUpRight, Coffee, Heart } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GitHubIcon } from "./github-icon";

export function SupportProject({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id={compact ? "support-dialog-content" : "support"}
      aria-labelledby={compact ? "support-dialog-title" : "support-title"}
      className={cn(
        compact
          ? "p-6 sm:p-7"
          : "mt-12 rounded-2xl border border-hairline bg-canvas p-6 sm:p-8",
      )}
    >
      <div className="flex items-center gap-2.5 text-ink">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-surface-soft text-rose-500">
          <Heart className="h-4 w-4 fill-rose-500/15" aria-hidden="true" />
        </span>
        <h2
          id={compact ? "support-dialog-title" : "support-title"}
          className={cn(
            "font-semibold tracking-tight",
            compact ? "text-lg" : "text-xl",
          )}
        >
          Support FSD CLI
        </h2>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-body-muted">
        If FSD CLI helps you build, consider supporting its development and
        documentation. Donations are optional.
      </p>

      <div
        className={cn(
          "mt-6 grid gap-3.5",
          compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2",
        )}
      >
        <a
          href={siteConfig.support.githubSponsors}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-3 rounded-xl border border-hairline bg-canvas p-4 text-ink transition-all hover:border-ink/25 hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface-soft">
              <GitHubIcon className="h-5 w-5" />
            </span>
            <span className="flex flex-col text-left">
              <span className="text-sm font-semibold">GitHub Sponsors</span>
              <span className="text-xs text-body-muted">
                Ongoing open-source backing
              </span>
            </span>
          </span>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-body-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
            aria-hidden="true"
          />
          <span className="sr-only">(opens in a new tab)</span>
        </a>

        <a
          href={siteConfig.support.buyMeACoffee}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-3 rounded-xl border border-hairline bg-canvas p-4 text-ink transition-all hover:border-ink/25 hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface-soft text-amber-500">
              <Coffee className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col text-left">
              <span className="text-sm font-semibold">Buy Me a Coffee</span>
              <span className="text-xs text-body-muted">
                One-time tip for the maintainers
              </span>
            </span>
          </span>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-body-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
            aria-hidden="true"
          />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}
