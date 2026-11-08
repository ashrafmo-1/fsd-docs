"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DOCS_NAVIGATION, getDocsGroup } from "@/lib/docs-navigation";
import { cn } from "@/lib/utils";

export function DocsSidebar({ header }: { header?: React.ReactNode }) {
  const pathname = usePathname();
  const activeGroup = getDocsGroup(pathname)?.label;
  const detailsRef = useRef<HTMLDetailsElement>(null);
  // "Start" and the group holding the current page are open by default.
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (activeGroup) setOpen((state) => ({ ...state, [activeGroup]: true }));
  }, [activeGroup]);

  // Collapse the mobile menu after navigation. Also close on click so tapping
  // the current page (pathname unchanged) does not leave the menu open.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger.
  useEffect(() => {
    const details = detailsRef.current;
    if (details) details.open = false;
  }, [pathname]);

  const closeMobileMenu = () => {
    const details = detailsRef.current;
    if (details) details.open = false;
  };

  const isOpen = (label: string) =>
    open[label] ?? (label === "Start" || label === activeGroup);

  return (
    <aside className="min-w-0 lg:sticky lg:top-24 lg:h-fit lg:[grid-area:sidebar]">
      {/*
        One nav in the HTML. On mobile it lives in a closed <details>.
        On lg+ author CSS keeps the panel visible even when details is closed,
        so desktop never depends on the open attribute or matchMedia.
      */}
      <details
        ref={detailsRef}
        className="group rounded-[12px] border border-hairline bg-canvas lg:border-0 lg:bg-transparent lg:rounded-none"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-sm font-semibold text-ink lg:hidden [&::-webkit-details-marker]:hidden">
          Browse docs
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 text-body-muted transition-transform group-open:rotate-180"
          />
        </summary>
        <div className="max-h-[min(70vh,28rem)] overflow-y-auto border-t border-hairline px-3 pb-4 pt-3 lg:max-h-none lg:overflow-visible lg:border-0 lg:p-0 lg:!block">
          {header}
          <nav aria-label="Documentation" className="space-y-6">
            {DOCS_NAVIGATION.map((group) => {
              const labelId = `docs-${group.label}`;
              const itemsId = `docs-${group.label}-items`;

              return (
                <section key={group.label} aria-labelledby={labelId}>
                  {/* A label, not a heading: the sidebar precedes the page's h1. */}
                  <p
                    id={labelId}
                    className="mb-3 text-sm font-extrabold uppercase tracking-[1px] text-ink"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen(group.label)}
                      aria-controls={itemsId}
                      onClick={() =>
                        setOpen((state) => ({
                          ...state,
                          [group.label]: !isOpen(group.label),
                        }))
                      }
                      className="flex w-full items-center justify-between rounded-md px-3 py-1 uppercase hover:bg-surface-soft"
                    >
                      {group.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "h-4 w-4 text-body-muted transition-transform",
                          isOpen(group.label) ? "rotate-0" : "-rotate-90",
                        )}
                      />
                    </button>
                  </p>
                  <ul
                    id={itemsId}
                    hidden={!isOpen(group.label)}
                    className="grid grid-cols-1 gap-1"
                  >
                    {group.items.map((link) => {
                      const active =
                        pathname === link.href ||
                        (link.href === "/docs/releases" &&
                          pathname.startsWith("/docs/releases/"));

                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            aria-current={active ? "page" : undefined}
                            onClick={closeMobileMenu}
                            className={cn(
                              "block rounded-[10px] px-3 py-2 text-sm font-medium transition-colors",
                              active
                                ? "bg-ink text-on-primary"
                                : "text-body-muted hover:bg-surface-soft hover:text-ink",
                            )}
                          >
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </nav>
        </div>
      </details>
    </aside>
  );
}
