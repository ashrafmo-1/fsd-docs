"use client";

import { Coffee, Copy, Heart } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

export function SupportProject({ compact = false }: { compact?: boolean }) {
  const [message, setMessage] = useState("");

  async function copyUsername() {
    try {
      await navigator.clipboard.writeText(siteConfig.support.instapayUsername);
      setMessage("InstaPay username copied.");
    } catch {
      setMessage("Could not copy. Select and copy the username shown above.");
    }
  }

  return (
    <section
      id={compact ? "support-dialog-content" : "support"}
      aria-labelledby={compact ? "support-dialog-title" : "support-title"}
      className={
        compact
          ? "p-6 sm:p-8"
          : "mt-12 rounded-2xl border border-hairline bg-canvas p-6 sm:p-8"
      }
    >
      <div className="flex items-center gap-2 text-ink">
        <Heart className="h-5 w-5" aria-hidden="true" />
        <h2
          id={compact ? "support-dialog-title" : "support-title"}
          className="text-xl font-semibold"
        >
          Support FSD CLI
        </h2>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-body-muted">
        If FSD CLI helps you build, consider supporting its development and
        documentation. Donations are optional.
      </p>
      <div
        className={
          compact ? "mt-6 grid gap-4" : "mt-6 grid gap-4 sm:grid-cols-2"
        }
      >
        <a
          href={siteConfig.support.buyMeACoffee}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border border-hairline p-5 text-sm font-semibold text-ink transition-colors hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <Coffee className="h-5 w-5 shrink-0" aria-hidden="true" />
          Buy Me a Coffee <span className="sr-only">(opens in a new tab)</span>
        </a>
        <div className="rounded-xl border border-hairline p-5">
          <p className="text-sm font-semibold text-ink">InstaPay · Egypt</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <code dir="ltr" className="select-all text-sm text-ink">
              {siteConfig.support.instapayUsername}
            </code>
            <button
              type="button"
              onClick={copyUsername}
              aria-label="Copy InstaPay username"
              className="inline-flex items-center gap-2 rounded-lg border border-hairline px-3 py-2 text-sm text-ink hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <Copy className="h-4 w-4" aria-hidden="true" />
              Copy
            </button>
          </div>
          <p
            lang="ar"
            dir="rtl"
            className="mt-3 text-sm leading-6 text-body-muted"
          >
            للدعم من مصر عبر إنستا باي. تأكد من بيانات المستلم قبل تأكيد
            التحويل.
          </p>
          <p role="status" className="mt-2 text-xs text-body-muted">
            {message}
          </p>
        </div>
      </div>
    </section>
  );
}
