"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { GitHubIcon } from "./github-icon";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Architecture", href: "#architecture" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Docs", href: "#docs" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2.5">
          <Image src={"/fsd logo.png"} alt="" width={40} height={40} />
          <span className="text-base font-semibold tracking-tight text-ink">
            create-fsd-architecture
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-body-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-[12px] border border-hairline bg-canvas px-4 text-sm font-semibold text-ink transition-colors hover:bg-surface-soft"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
          <a
            href="#docs"
            className="inline-flex h-9 items-center rounded-[12px] bg-ink px-4 text-sm font-semibold text-on-primary transition-colors hover:bg-ink/90"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-hairline md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-hairline bg-canvas px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-body-muted transition-colors hover:text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <hr className="border-hairline" />
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[12px] border border-hairline bg-canvas text-sm font-semibold text-ink"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-[12px] bg-ink text-sm font-semibold text-on-primary"
              onClick={() => {
                setMobileOpen(false);
                document
                  .getElementById("docs")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
