"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DOCS_NAVIGATION, getDocsGroup } from "@/lib/docs-navigation";
import { cn } from "@/lib/utils";

function SidebarNav({
  header,
  pathname,
  setOpen,
  isOpen,
  idPrefix,
}: {
  header?: React.ReactNode;
  pathname: string;
  setOpen: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  isOpen: (label: string) => boolean;
  idPrefix: string;
}) {
  return (
    <>
      {header}
      <nav aria-label="Documentation" className="space-y-6">
        {DOCS_NAVIGATION.map((group) => {
          const labelId = `${idPrefix}-${group.label}`;
          const itemsId = `${idPrefix}-${group.label}-items`;

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
    </>
  );
}

export function DocsSidebar({
  mobileHeader,
  desktopHeader,
}: {
  mobileHeader?: React.ReactNode;
  desktopHeader?: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeGroup = getDocsGroup(pathname)?.label;
  const mobileDetailsRef = useRef<HTMLDetailsElement>(null);
  // "Start" and the group holding the current page are open by default.
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (activeGroup) setOpen((state) => ({ ...state, [activeGroup]: true }));
  }, [activeGroup]);

  // Collapse the mobile menu after navigation without controlling desktop open state.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger.
  useEffect(() => {
    const details = mobileDetailsRef.current;
    if (details) details.open = false;
  }, [pathname]);

  const isOpen = (label: string) =>
    open[label] ?? (label === "Start" || label === activeGroup);

  return (
    <>
      {/* Mobile: closed by default; no JS required to keep it closed. */}
      <details
        ref={mobileDetailsRef}
        className="group rounded-[12px] border border-hairline bg-canvas lg:hidden"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
          Browse docs
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 text-body-muted transition-transform group-open:rotate-180"
          />
        </summary>
        <div className="max-h-[min(70vh,28rem)] overflow-y-auto border-t border-hairline px-3 pb-4 pt-3">
          <SidebarNav
            header={mobileHeader}
            pathname={pathname}
            setOpen={setOpen}
            isOpen={isOpen}
            idPrefix="docs-mobile"
          />
        </div>
      </details>

      {/* Desktop: always visible; does not depend on details/matchMedia. */}
      <aside className="hidden lg:sticky lg:top-24 lg:block lg:h-fit lg:[grid-area:sidebar]">
        <SidebarNav
          header={desktopHeader}
          pathname={pathname}
          setOpen={setOpen}
          isOpen={isOpen}
          idPrefix="docs"
        />
      </aside>
    </>
  );
}
