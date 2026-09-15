import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-canvas px-6">
      <div className="max-w-xl text-center">
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
