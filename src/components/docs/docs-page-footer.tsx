"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardCopy,
  ExternalLink,
  FileCode2,
  History,
  Pencil,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getDocsNavigation, getDocsSourcePath } from "@/lib/docs-navigation";
import { htmlToMarkdown } from "@/lib/html-to-markdown";
import { siteConfig } from "@/lib/site";

export function DocsPageFooter() {
  const pathname = usePathname();
  const navigation = getDocsNavigation(pathname);
  const sourcePath = getDocsSourcePath(pathname);
  const editUrl = `${siteConfig.repositories.docs}/edit/main/${sourcePath}`;
  const issueUrl = `${siteConfig.repositories.docs}/issues/new?title=${encodeURIComponent(`Docs feedback: ${pathname}`)}`;
  const sourceUrl = `${siteConfig.repositories.docs}/blob/main/${sourcePath}`;
  const historyUrl = `${siteConfig.repositories.docs}/commits/main/${sourcePath}`;
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const [voted, setVoted] = useState(false);

  // Feedback goes to a prefilled GitHub issue: nothing is tracked on the site.
  const feedbackUrl = (helpful: boolean) => {
    const title = `Docs feedback (${helpful ? "helpful" : "not helpful"}): ${pathname}`;
    const body = `Page: ${siteConfig.url}${pathname}\n\n${
      helpful ? "What worked well?" : "What was missing or wrong?"
    }\n\n`;
    return `${siteConfig.repositories.docs}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
  };

  const copyMarkdown = async () => {
    const content = document.getElementById("docs-content");
    if (!content) return;
    const markdown = `${htmlToMarkdown(content)}\n\nSource: ${siteConfig.url}${pathname}\n`;
    try {
      await navigator.clipboard.writeText(markdown);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  };

  return (
    <footer className="mt-16 border-t border-hairline pt-8">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <a
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-8 items-center gap-2 font-medium text-body-muted transition-colors hover:text-ink"
        >
          <Pencil className="h-4 w-4" />
          Edit this page
        </a>
        <a
          href={issueUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-8 items-center gap-2 font-medium text-body-muted transition-colors hover:text-ink"
        >
          <ExternalLink className="h-4 w-4" />
          Report an issue
        </a>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-medium text-body-muted transition-colors hover:text-ink"
        >
          <FileCode2 className="h-4 w-4" />
          View source
        </a>
        <a
          href={historyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-medium text-body-muted transition-colors hover:text-ink"
        >
          <History className="h-4 w-4" />
          Page history
        </a>
        <button
          type="button"
          onClick={copyMarkdown}
          className="inline-flex items-center gap-2 font-medium text-body-muted transition-colors hover:text-ink"
        >
          {copyState === "copied" ? (
            <Check className="h-4 w-4 text-brand-teal" />
          ) : (
            <ClipboardCopy className="h-4 w-4" />
          )}
          Copy page as Markdown
        </button>
        <span className="sr-only" role="status">
          {copyState === "copied"
            ? "Page copied as Markdown"
            : copyState === "error"
              ? "Copy failed. Select the page text to copy it."
              : ""}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
        {voted ? (
          <p role="status" className="text-body">
            Thanks! Finish your note in the GitHub tab that just opened.
          </p>
        ) : (
          <>
            <span className="font-medium text-ink">Was this page helpful?</span>
            {[true, false].map((helpful) => (
              <a
                key={String(helpful)}
                href={feedbackUrl(helpful)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setVoted(true)}
                className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-hairline px-3 font-medium text-body-muted transition-colors hover:bg-surface-soft hover:text-ink"
              >
                {helpful ? (
                  <ThumbsUp className="h-4 w-4" />
                ) : (
                  <ThumbsDown className="h-4 w-4" />
                )}
                {helpful ? "Yes" : "No"}
              </a>
            ))}
          </>
        )}
      </div>

      {(navigation.previous || navigation.next) && (
        <nav
          aria-label="Documentation pagination"
          className="mt-8 grid gap-4 sm:grid-cols-2"
        >
          {navigation.previous ? (
            <Link
              href={navigation.previous.href}
              className="group rounded-2xl border border-hairline bg-canvas p-5 transition-colors hover:bg-surface-soft"
            >
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[1.2px] text-body-muted">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                Previous
              </span>
              <span className="mt-2 block font-semibold text-ink">
                {navigation.previous.label}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {navigation.next && (
            <Link
              href={navigation.next.href}
              className="group rounded-2xl border border-hairline bg-canvas p-5 text-right transition-colors hover:bg-surface-soft"
            >
              <span className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-[1.2px] text-body-muted">
                Next
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-2 block font-semibold text-ink">
                {navigation.next.label}
              </span>
            </Link>
          )}
        </nav>
      )}
    </footer>
  );
}
