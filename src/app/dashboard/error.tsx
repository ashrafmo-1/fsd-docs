"use client";

import Link from "next/link";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-ink">
          Dashboard unavailable
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-body-muted">
          The dashboard could not be loaded. Try again in a moment.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" className="button-secondary" onClick={reset}>
            Try again
          </button>
          <Link className="button-primary" href="/dashboard/login">
            Back to sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
