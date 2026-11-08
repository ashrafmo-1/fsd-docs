import type { Metadata } from "next";
import Link from "next/link";
import { defaultOgImage } from "@/lib/metadata";

const title = "Page not found";
const description =
  "This page does not exist. Jump to Getting Started, CLI Reference, or Troubleshooting.";
const shareTitle = `${title} | FSD CLI`;

export const metadata: Metadata = {
  title,
  description,
  // Replace the root layout canonical so a 404 does not claim to be the homepage.
  // Next already emits noindex for not-found pages; do not set robots here.
  alternates: { canonical: null },
  openGraph: {
    title: shareTitle,
    description,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description,
    images: [defaultOgImage],
  },
};

const RESCUE_LINKS = [
  {
    href: "/docs/getting-started",
    label: "Getting Started",
    hint: "Scaffold a project",
  },
  {
    href: "/docs/cli-reference",
    label: "CLI Reference",
    hint: "Commands and flags",
  },
  {
    href: "/docs/troubleshooting",
    label: "Troubleshooting",
    hint: "Common errors and fixes",
  },
] as const;

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="outline-none grid min-h-screen place-items-center bg-canvas px-6 py-16"
    >
      <div className="w-full max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-coral">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
          This slice does not exist.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-body-muted">
          The page may have moved, or the URL points to a route that has not
          been generated yet.
        </p>

        <ul className="mt-8 grid gap-2 text-left sm:grid-cols-3">
          {RESCUE_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-[12px] border border-hairline px-3 py-3 transition-colors hover:bg-surface-soft"
              >
                <span className="block text-sm font-semibold text-ink">
                  {link.label}
                </span>
                <span className="mt-1 block text-xs text-body-muted">
                  {link.hint}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="button-primary" href="/">
            Back to home
          </Link>
          <Link className="button-secondary" href="/docs">
            Browse documentation
          </Link>
        </div>
      </div>
    </main>
  );
}
