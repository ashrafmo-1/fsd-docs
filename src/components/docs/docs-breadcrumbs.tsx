"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAV_ITEMS } from "@/lib/docs-navigation";

export function DocsBreadcrumbs() {
  const pathname = usePathname();
  const releaseVersion = pathname.match(/^\/docs\/releases\/([^/]+)$/)?.[1];
  const page = DOCS_NAV_ITEMS.find((item) => item.href === pathname);
  const label = releaseVersion ? `v${releaseVersion}` : page?.label;

  if (pathname === "/docs") return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-body-muted">
        <li>
          <Link href="/docs" className="transition-colors hover:text-ink">
            Docs
          </Link>
        </li>
        {releaseVersion && (
          <>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link
                href="/docs/releases"
                className="transition-colors hover:text-ink"
              >
                Releases
              </Link>
            </li>
          </>
        )}
        {label && (
          <>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="font-medium text-ink" aria-current="page">
              {label}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
