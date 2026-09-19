"use client";

import { Link2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

export function OnThisPage() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    if (!pathname.startsWith("/docs")) return;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "#docs-content h2, #docs-content h3",
      ),
    );
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
    setCopyStatus("");

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
  }, [pathname]);

  if (headings.length < 2) return null;

  return (
    <aside className="order-2 lg:col-start-2 xl:col-start-3 xl:row-start-1 xl:order-3 xl:sticky xl:top-24 xl:h-fit">
      <details open className="max-h-[70vh] overflow-y-auto">
        <summary className="mb-4 cursor-pointer text-sm font-semibold text-ink">
          On this page
        </summary>
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
                    aria-current={
                      activeId === heading.id ? "location" : undefined
                    }
                    className={cn(
                      "group flex items-start gap-2 text-sm leading-5 transition-colors hover:text-ink",
                      heading.level === 3 && "pl-3",
                      activeId === heading.id
                        ? "font-medium text-ink"
                        : "text-body-muted",
                    )}
                    onClick={() => setActiveId(heading.id)}
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
                    className="shrink-0 rounded p-1 text-body-muted hover:text-ink"
                    aria-label={`Copy link to ${heading.label}`}
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(
                          `${window.location.origin}${pathname}#${heading.id}`,
                        );
                        setCopyStatus(`Link copied: ${heading.label}`);
                      } catch {
                        setCopyStatus(
                          "Could not copy. Use the section link to copy the URL from your browser.",
                        );
                      }
                    }}
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
      </details>
    </aside>
  );
}
