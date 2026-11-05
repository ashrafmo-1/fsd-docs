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
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (activeGroup) setOpen((state) => ({ ...state, [activeGroup]: true }));
  }, [activeGroup]);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setMenuOpen(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  // biome-ignore lint/correctness/useExhaustiveDependencies: close mobile menu on navigate
  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) setMenuOpen(false);
  }, [pathname]);
  const isOpen = (label: string) =>
    open[label] ?? (label === "Start" || label === activeGroup);

  return (
    <aside className="order-1 lg:order-none lg:sticky lg:top-24 lg:h-fit lg:[grid-area:sidebar]">
      <details
        className="group rounded-[12px] border border-hairline lg:border-0"
        open={menuOpen}
        onToggle={(event) => setMenuOpen(event.currentTarget.open)}
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-sm font-semibold text-ink lg:hidden [&::-webkit-details-marker]:hidden">
          Browse docs
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 text-body-muted transition-transform group-open:rotate-180"
          />
        </summary>
        <div className="border-t border-hairline px-3 pb-4 pt-3 lg:border-0 lg:p-0">
          {header}
          <nav aria-label="Documentation" className="space-y-6">
            {DOCS_NAVIGATION.map((group) => (
              <section
                key={group.label}
                aria-labelledby={`docs-${group.label}`}
              >
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
            ))}
          </nav>
        </div>
      </details>
    </aside>
  );
}
