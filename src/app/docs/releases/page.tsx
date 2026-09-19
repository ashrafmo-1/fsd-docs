import type { Metadata } from "next";
import Link from "next/link";
import { CLI_RELEASES, LEGACY_NPM_VERSIONS } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Releases",
  description:
    "FSD CLI release history, features, fixes, and compatibility notes.",
  alternates: { canonical: "/docs/releases" },
};

export default function ReleasesPage() {
  return (
    <article>
      <p className="text-sm font-semibold text-brand-coral">Changelog</p>
      <h1 className="mt-3 text-4xl font-semibold text-ink">
        Every release, in one place
      </h1>
      <p className="mt-5 text-lg text-body">
        Explore changes to the CLI. Dates below are npm publication dates;
        release notes describe the behavior at that version.
      </p>
      <h2 id="version-2" className="mt-10 text-2xl font-semibold text-ink">
        Version 2
      </h2>
      <div className="mt-5 space-y-4">
        {CLI_RELEASES.filter((release) => release.version.startsWith("2.")).map(
          (release) => (
            <section
              key={release.version}
              className="rounded-2xl border border-hairline p-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/docs/releases/${release.version}`}
                  className="text-xl font-semibold text-ink underline-offset-4 hover:underline"
                >
                  v{release.version}
                </Link>
                <span className="rounded-full bg-surface-soft px-3 py-1 text-xs">
                  {release.status}
                </span>
                <time
                  dateTime={release.date}
                  className="text-sm text-body-muted"
                >
                  {release.dateLabel}
                </time>
              </div>
              <p className="mt-3 leading-7">{release.summary}</p>
              <p className="mt-3 text-xs text-body-muted">
                {release.frameworks.join(" · ")}
              </p>
            </section>
          ),
        )}
      </div>
      <h2 id="version-1" className="mt-10 text-2xl font-semibold text-ink">
        Version 1 archive
      </h2>
      <p className="mt-3">
        These published versions predate the maintained changelog. Package
        history is available on npm.
      </p>
      <ul className="mt-4 space-y-3">
        {LEGACY_NPM_VERSIONS.map((release) => (
          <li key={release.version}>
            <Link
              className="font-medium text-brand-coral underline"
              href={`/docs/releases/${release.version}`}
            >
              v{release.version}
            </Link>{" "}
            · {release.date}
          </li>
        ))}
      </ul>
    </article>
  );
}
