"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/dashboard", label: "Dashboard", exact: true },
  { href: "/dashboard/videos", label: "Videos", exact: false },
];

function isActive(pathname: string, href: string, exact: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard" className={className}>
      <p className="mb-2 hidden px-3 text-xs font-semibold uppercase tracking-[1.5px] text-body-muted md:block">
        Admin
      </p>
      <div className="flex gap-2 md:flex-col md:gap-1">
        {LINKS.map((link) => {
          const active = isActive(pathname, link.href, link.exact);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-sm px-3 py-2 text-sm font-medium",
                active
                  ? "bg-ink text-on-primary"
                  : "text-body-muted hover:bg-surface-soft hover:text-ink",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
