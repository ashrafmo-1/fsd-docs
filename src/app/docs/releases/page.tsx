import type { Metadata } from "next";
import Link from "next/link";
import { ReleaseTabs } from "@/components/docs/release-tabs";
import {
  CLI_RELEASES,
  LEGACY_NPM_VERSIONS,
  SKILL_RELEASES,
} from "@/lib/releases";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Releases",
  description:
    "FSD CLI npm releases and independent Agent Skill tagged release history.",
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
        Explore CLI npm versions and Agent Skill releases. Choose a tab to view
        its release history and compatibility notes.
      </p>
      <ReleaseTabs
        cli={
          <>
            {" "}
            <h2
              id="version-2"
              className="mt-10 text-2xl font-semibold text-ink"
            >
              CLI version 2
            </h2>
            <div className="mt-5 space-y-4">
              {CLI_RELEASES.filter((release) =>
                release.version.startsWith("2."),
              ).map((release) => (
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
              ))}
            </div>
            <h2
              id="version-1"
              className="mt-10 text-2xl font-semibold text-ink"
            >
              CLI version 1 archive
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
          </>
        }
        skill={
          <>
            {" "}
            <section className="mt-10" aria-labelledby="skill-releases">
              <h2
                id="skill-releases"
                className="text-2xl font-semibold text-ink"
              >
                Agent Skill releases
              </h2>
              <p className="mt-3 text-body">
                Skill versions are Git tags in the Agent Skill repository,
                separate from CLI npm versions. v2.0.0 and v2.0.0-beta.1 were
                released on October 6, 2026. Use the pinned install command in
                the{" "}
                <Link
                  href="/docs/ai-agent-skill#install"
                  className="text-brand-coral underline"
                >
                  Skill guide
                </Link>
                .
              </p>
              <div className="mt-5 space-y-4">
                {SKILL_RELEASES.map((release) => (
                  <section
                    key={release.version}
                    className="rounded-2xl border border-hairline p-6"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`${siteConfig.repositories.skill}/tree/v${release.version}`}
                        className="text-xl font-semibold text-ink underline"
                      >
                        Skill v{release.version}
                      </a>
                      <span className="rounded-full bg-surface-soft px-3 py-1 text-xs">
                        {release.status}
                      </span>
                    </div>
                    <p className="mt-3 leading-7">{release.summary}</p>
                  </section>
                ))}
              </div>
            </section>
          </>
        }
      />
    </article>
  );
}
