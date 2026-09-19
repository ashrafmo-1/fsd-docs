"use client";

import { ArrowLeft, ArrowRight, ExternalLink, Pencil } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDocsNavigation, getDocsSourcePath } from "@/lib/docs-navigation";
import { siteConfig } from "@/lib/site";

export function DocsPageFooter() {
  const pathname = usePathname();
  const navigation = getDocsNavigation(pathname);
  const sourcePath = getDocsSourcePath(pathname);
  const editUrl = `${siteConfig.repositories.docs}/edit/main/${sourcePath}`;
  const issueUrl = `${siteConfig.repositories.docs}/issues/new?title=${encodeURIComponent(`Docs feedback: ${pathname}`)}`;

  return (
    <footer className="mt-16 border-t border-hairline pt-8">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <a
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-medium text-body-muted transition-colors hover:text-ink"
        >
          <Pencil className="h-4 w-4" />
          Edit this page
        </a>
        <a
          href={issueUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-medium text-body-muted transition-colors hover:text-ink"
        >
          <ExternalLink className="h-4 w-4" />
          Report an issue
        </a>
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
