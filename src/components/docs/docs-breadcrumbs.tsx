"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAV_ITEMS, getDocsGroup } from "@/lib/docs-navigation";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/json-ld";

export function DocsBreadcrumbs() {
  const pathname = usePathname();
  const releaseVersion = pathname.match(/^\/docs\/releases\/([^/]+)$/)?.[1];
  const page = DOCS_NAV_ITEMS.find((item) => item.href === pathname);
  const label = releaseVersion ? `v${releaseVersion}` : page?.label;
  const group = getDocsGroup(pathname);

  if (pathname === "/docs") return null;

  const crumbs = [
    { name: "Docs", path: "/docs" },
    ...(releaseVersion ? [{ name: "Releases", path: "/docs/releases" }] : []),
    ...(label ? [{ name: label, path: pathname }] : []),
  ];

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD built from nav constants, escaped by jsonLdScript.
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(breadcrumbJsonLd(crumbs)),
        }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-body-muted">
        <li>
          <Link
            href="/docs"
            className="inline-flex min-h-6 items-center transition-colors hover:text-ink"
          >
            Docs
          </Link>
        </li>
        {group && (
          <>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>{group.label}</li>
          </>
        )}
        {releaseVersion && (
          <>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link
                href="/docs/releases"
                className="inline-flex min-h-6 items-center transition-colors hover:text-ink"
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
