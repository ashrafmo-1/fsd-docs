import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { LogoutButton } from "@/components/dashboard/logout-button";

export function DashboardShell({
  email,
  children,
}: {
  email: string | null;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-canvas text-body">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-hairline bg-canvas md:flex">
        <div className="h-1 bg-gradient-to-r from-brand-mint via-brand-coral to-brand-lavender" />
        <Link
          href="/"
          className="flex h-16 items-center gap-2.5 px-5"
          aria-label="FSD CLI home"
        >
          <Image src="/fsd-logo.png" alt="" width={36} height={36} />
          <span className="text-sm font-semibold tracking-tight text-ink">
            FSD CLI
          </span>
        </Link>
        <DashboardNav className="px-3" />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-hairline bg-canvas px-5">
          <p className="text-sm font-semibold text-ink md:hidden">FSD CLI</p>
          <div className="ml-auto flex items-center gap-3">
            {email ? (
              <p className="hidden text-sm text-body-muted sm:block">
                <span className="sr-only">Signed in as </span>
                {email}
              </p>
            ) : null}
            <LogoutButton />
          </div>
        </header>
        <DashboardNav className="border-b border-hairline bg-canvas px-4 py-3 md:hidden" />
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
