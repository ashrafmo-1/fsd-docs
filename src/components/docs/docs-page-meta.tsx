"use client";

import { usePathname } from "next/navigation";

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

/**
 * "Applies to" and "Last updated" line under the breadcrumbs. Dates are
 * computed at build time from Git history and passed in by route.
 */
export function DocsPageMeta({
  version,
  updated,
}: {
  version: string;
  updated: Record<string, string>;
}) {
  const pathname = usePathname();
  // Release notes describe their own version and date in the page body.
  if (pathname.startsWith("/docs/releases/")) return null;
  const date = updated[pathname];

  return (
    <p className="-mt-4 mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-body-muted">
      <span className="rounded-full bg-brand-mint/15 px-2 py-0.5 font-medium text-brand-teal">
        Applies to CLI v{version}
      </span>
      {date ? (
        <span>
          Last updated{" "}
          <time dateTime={date}>{DATE_FORMAT.format(new Date(date))}</time>
        </span>
      ) : null}
    </p>
  );
}
