"use client";

import { ChevronDown, Link2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

type Heading = {
  id: string;
  label: string;
  level: 2 | 3;
};

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function TocNav({
  headings,
  activeId,
  copyStatus,
  onActivate,
  onCopy,
}: {
  headings: Heading[];
  activeId: string;
  copyStatus: string;
  onActivate: (id: string) => void;
  onCopy: (heading: Heading) => void;
}) {
  return (
    <div className="border-l border-hairline pl-5">
      <nav aria-label="On this page">
        <ol className="space-y-2.5">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className="flex items-start justify-between gap-1"
            >
              <a
                href={`#${heading.id}`}
                aria-current={activeId === heading.id ? "location" : undefined}
                className={cn(
                  "group flex min-h-6 items-start gap-2 py-0.5 text-sm leading-5 transition-colors hover:text-ink",
                  heading.level === 3 && "pl-3",
                  activeId === heading.id
                    ? "font-medium text-ink"
                    : "text-body-muted",
                )}
                onClick={() => onActivate(heading.id)}
              >
                <Link2
                  className={cn(
                    "mt-0.5 h-3.5 w-3.5 flex-none opacity-0 transition-opacity group-hover:opacity-60",
                    activeId === heading.id && "opacity-60",
                  )}
                  aria-hidden="true"
                />
                <span>{heading.label}</span>
              </a>
              <button
                type="button"
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded text-body-muted hover:text-ink"
                aria-label={`Copy link to ${heading.label}`}
                onClick={() => onCopy(heading)}
              >
                <Link2 className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <p className="sr-only" role="status">
        {copyStatus}
      </p>
    </div>
  );
}

export function OnThisPage() {
  const pathname = usePathname();
  const [contentRevision, setContentRevision] = useState(0);

  useEffect(() => {
    const refresh = () => setContentRevision((revision) => revision + 1);
    window.addEventListener("docs-content-change", refresh);
    return () => window.removeEventListener("docs-content-change", refresh);
  }, []);

  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");
  const [copiedLabel, setCopiedLabel] = useState("");
  const {
    status: linkCopyStatus,
    copy,
    reset: resetCopyStatus,
  } = useCopyToClipboard();
  const copyStatus =
    linkCopyStatus === "copied"
      ? `Link copied: ${copiedLabel}`
      : linkCopyStatus === "error"
        ? "Could not copy. Use the section link to copy the URL from your browser."
        : "";

  // biome-ignore lint/correctness/useExhaustiveDependencies: Tab visibility changes must refresh the heading list after the DOM updates.
  useEffect(() => {
    if (!pathname.startsWith("/docs")) return;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "#docs-content h2, #docs-content h3",
      ),
    ).filter((heading) => !heading.closest("[hidden]"));
    const usedIds = new Set<string>();

    const nextHeadings = elements.flatMap((heading) => {
      const label = heading.textContent?.trim();
      if (!label) return [];

      const baseId = heading.id || slugifyHeading(label) || "section";
      let id = baseId;
      let suffix = 2;

      while (usedIds.has(id)) {
        id = `${baseId}-${suffix}`;
        suffix += 1;
      }

      usedIds.add(id);
      heading.id = id;

      return [
        {
          id,
          label,
          level: heading.tagName === "H3" ? 3 : 2,
        } satisfies Heading,
      ];
    });

    setHeadings(nextHeadings);
    setActiveId(nextHeadings[0]?.id ?? "");
    resetCopyStatus();

    let frame = 0;
    const updateActive = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const current = [...elements]
          .reverse()
          .find((heading) => heading.getBoundingClientRect().top <= 140);
        setActiveId(current?.id ?? nextHeadings[0]?.id ?? "");
      });
    };
    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();

    const hash = window.location.hash.slice(1);
    let hashFrame = 0;
    if (hash) {
      hashFrame = window.requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView();
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(hashFrame);
      window.removeEventListener("scroll", updateActive);
    };
  }, [pathname, contentRevision]);

  if (headings.length < 2) return null;

  const onCopy = (heading: Heading) => {
    setCopiedLabel(heading.label);
    copy(`${window.location.origin}${pathname}#${heading.id}`);
  };

  return (
    <aside className="min-w-0 lg:[grid-area:toc] xl:sticky xl:top-24 xl:h-fit">
      {/*
        One TOC in the HTML. Collapsed <details> below xl (placed above the
        article in layout). On xl+ the panel stays visible without duplicating
        the heading list.
      */}
      <details className="group max-h-[70vh] overflow-y-auto rounded-[12px] border border-hairline xl:max-h-[70vh] xl:border-0 xl:rounded-none">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-sm font-semibold text-ink xl:hidden [&::-webkit-details-marker]:hidden">
          On this page
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 text-body-muted transition-transform group-open:rotate-180"
          />
        </summary>
        <div className="border-t border-hairline px-3 pb-4 pt-3 xl:border-0 xl:p-0 xl:!block">
          <p className="mb-4 hidden text-sm font-semibold text-ink xl:block">
            On this page
          </p>
          <TocNav
            headings={headings}
            activeId={activeId}
            copyStatus={copyStatus}
            onActivate={setActiveId}
            onCopy={onCopy}
          />
        </div>
      </details>
    </aside>
  );
}
