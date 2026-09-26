import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/docs/code-block";
import { CLI_RELEASES, getRelease, getReleaseNavigation } from "@/lib/releases";

type Props = { params: Promise<{ version: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return CLI_RELEASES.map(({ version }) => ({ version }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { version } = await params;
  const release = getRelease(version);
  if (!release) notFound();
  return {
    title: `Release ${version}`,
    description: release.summary,
    alternates: { canonical: `/docs/releases/${version}` },
  };
}
export default async function ReleasePage({ params }: Props) {
  const { version } = await params;
  const release = getRelease(version);
  if (!release) notFound();
  const { newer, older } = getReleaseNavigation(version);
  return (
    <article>
      <time dateTime={release.date} className="text-sm text-body-muted">
        {release.dateLabel}
      </time>
      <h1 className="mt-3 text-4xl font-semibold text-ink">
        Release {version}
      </h1>
      <p className="mt-5 text-lg leading-8">{release.summary}</p>
      <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium text-brand-coral">
        <a
          href={`https://www.npmjs.com/package/create-fsd-architecture/v/${version}`}
          className="underline"
        >
          Package on npm
        </a>
        {["2.6.0", "2.5.0", "2.4.0", "2.3.2"].includes(version) && (
          <a
            href={`https://github.com/FSD-CLI/cli/releases/tag/v${version}`}
            className="underline"
          >
            GitHub Release
          </a>
        )}
        <a
          href="https://github.com/FSD-CLI/cli/blob/main/docs/CHANGELOG.md"
          className="underline"
        >
          Source changelog
        </a>
      </div>
      {release.sections.map((section) => (
        <section key={section.title} className="mt-10">
          <h2
            id={section.title.toLowerCase()}
            className="text-2xl font-semibold text-ink"
          >
            {section.title}
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
      <section className="mt-10 space-y-4">
        <h2 id="use-this-version" className="text-2xl font-semibold text-ink">
          Use this version
        </h2>
        <CodeBlock code={`npx create-fsd-architecture@${version}`} />
        <p className="text-sm text-body-muted">
          Installing a newer CLI alone does not migrate an existing project.
          Review compatibility notes, then use the documented upgrade command.
        </p>
      </section>
      <nav
        aria-label="Release navigation"
        className="mt-10 flex flex-wrap justify-between gap-5 border-t border-hairline pt-6"
      >
        {newer && (
          <Link
            href={`/docs/releases/${newer.version}`}
            className="font-semibold text-brand-coral"
          >
            ← Newer: {newer.version}
          </Link>
        )}
        {older && (
          <Link
            href={`/docs/releases/${older.version}`}
            className="font-semibold text-brand-coral"
          >
            Older: {older.version} →
          </Link>
        )}
      </nav>
    </article>
  );
}
