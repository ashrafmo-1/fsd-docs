"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GitHubIcon } from "./github-icon";

const NAV_LINKS = [
  { label: "Architecture", href: "/#architecture" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Docs", href: "/docs" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="FSD CLI home"
        >
          <Image
            src="/fsd-logo.png"
            alt="FSD CLI"
            width={40}
            height={40}
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="text-base font-semibold tracking-tight text-ink">
              FSD CLI
            </span>
            <span className="mt-1 hidden text-[10px] font-medium text-body-muted sm:block">
              create-fsd-architecture
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/docs" ? pathname.startsWith("/docs") : false;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-ink",
                  active ? "text-ink" : "text-body-muted",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-[12px] border border-hairline bg-canvas px-4 text-sm font-semibold text-ink transition-colors hover:bg-surface-soft"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
          <Link
            href="/docs/getting-started"
            className="inline-flex h-9 items-center rounded-[12px] bg-ink px-4 text-sm font-semibold text-on-primary transition-colors hover:bg-ink/90"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-hairline md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={
            mobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-hairline bg-canvas px-6 pb-6 pt-4 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/docs" ? pathname.startsWith("/docs") : false;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-ink",
                    active ? "text-ink" : "text-body-muted",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <hr className="border-hairline" />
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[12px] border border-hairline bg-canvas text-sm font-semibold text-ink"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
            <Link
              href="/docs/getting-started"
              className="inline-flex h-10 items-center justify-center rounded-[12px] bg-ink text-sm font-semibold text-on-primary"
              onClick={() => {
                setMobileOpen(false);
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
