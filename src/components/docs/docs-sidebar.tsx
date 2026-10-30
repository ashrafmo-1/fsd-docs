"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DOCS_NAVIGATION, getDocsGroup } from "@/lib/docs-navigation";
import { cn } from "@/lib/utils";

export function DocsSidebar({ header }: { header?: React.ReactNode }) {
  const pathname = usePathname();
  const activeGroup = getDocsGroup(pathname)?.label;
  // "Start" and the group holding the current page are open by default.
  const [open, setOpen] = useState<Record<string, boolean>>({});
  useEffect(() => {
    if (activeGroup) setOpen((state) => ({ ...state, [activeGroup]: true }));
  }, [activeGroup]);
  const isOpen = (label: string) =>
    open[label] ?? (label === "Start" || label === activeGroup);

  return (
    <aside className="lg:sticky lg:top-24 lg:h-fit lg:row-span-2">
      {header}
      <nav aria-label="Documentation" className="space-y-6">
        {DOCS_NAVIGATION.map((group) => (
          <section key={group.label} aria-labelledby={`docs-${group.label}`}>
            {/* A label, not a heading: the sidebar precedes the page's h1. */}
            <p
              id={`docs-${group.label}`}
              className="mb-3 text-sm font-extrabold uppercase tracking-[1px] text-ink"
            >
              <button
                type="button"
                aria-expanded={isOpen(group.label)}
                aria-controls={`docs-${group.label}-items`}
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
              id={`docs-${group.label}-items`}
              hidden={!isOpen(group.label)}
              className="grid grid-cols-2 gap-1 lg:grid-cols-1"
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
        ))}
      </nav>
    </aside>
  );
}
