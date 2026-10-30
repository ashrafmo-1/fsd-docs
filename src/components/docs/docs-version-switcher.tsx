import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { CLI_RELEASES, LATEST_CLI_RELEASE } from "@/lib/releases";

/**
 * The docs describe the latest release only. Older versions link to their
 * release notes, which carry the pinned install command and compatibility
 * notes for that version.
 */
export function DocsVersionSwitcher() {
  const older = CLI_RELEASES.filter(
    (release) => release.version !== LATEST_CLI_RELEASE.version,
  );

  return (
    <details className="group relative mb-6 px-3 lg:px-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-[10px] border border-hairline px-3 py-2 text-sm text-ink [&::-webkit-details-marker]:hidden">
        <span>
          <span className="sr-only">Documentation version: </span>v
          {LATEST_CLI_RELEASE.version}
          <span className="ml-2 rounded-full bg-brand-mint/15 px-2 py-0.5 text-xs text-brand-teal">
            latest
          </span>
        </span>
        <ChevronDown
          className="h-4 w-4 text-body-muted transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="mt-2 rounded-[10px] border border-hairline bg-canvas p-2 shadow-sm">
        <p className="px-2 pb-2 text-xs leading-relaxed text-body-muted">
          These docs cover v{LATEST_CLI_RELEASE.version}. For an older version,
          open its release notes and pinned install command.
        </p>
        <ul className="max-h-64 overflow-y-auto">
          {older.map((release) => (
            <li key={release.version}>
              <Link
                href={`/docs/releases/${release.version}#use-this-version`}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-body-muted hover:bg-surface-soft hover:text-ink"
              >
                v{release.version}
                <span className="text-xs">{release.status}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
