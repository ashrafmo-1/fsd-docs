"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const DOC_LINKS = [
  { label: "Overview", href: "/docs" },
  { label: "Getting started", href: "/docs/getting-started" },
  { label: "Project configuration", href: "/docs/configuration" },
  { label: "Slice generator", href: "/docs/slice-generator" },
  { label: "Auth generator", href: "/docs/auth-generator", child: true },
  { label: "Vue + Vite", href: "/docs/frameworks/vue" },
  { label: "Nuxt", href: "/docs/frameworks/nuxt" },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-24 lg:h-fit">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-body-muted">
        Documentation
      </p>
      <nav
        aria-label="Documentation"
        className="grid grid-cols-2 gap-1 lg:grid-cols-1"
      >
        {DOC_LINKS.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-[10px] px-3 py-2 text-sm font-medium transition-colors",
                link.child && "lg:ml-4 lg:border-l lg:border-hairline lg:pl-4",
                active
                  ? "bg-ink text-on-primary"
                  : "text-body-muted hover:bg-surface-soft hover:text-ink",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
