"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAVIGATION } from "@/lib/docs-navigation";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-24 lg:h-fit lg:row-span-2">
      <nav aria-label="Documentation" className="space-y-6">
        {DOCS_NAVIGATION.map((group) => (
          <section key={group.label} aria-labelledby={`docs-${group.label}`}>
            <h2
              id={`docs-${group.label}`}
              className="mb-2 px-3 text-xs font-semibold uppercase tracking-[1.5px] text-body-muted"
            >
              {group.label}
            </h2>
            <ul className="grid grid-cols-2 gap-1 lg:grid-cols-1">
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
