import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security and Privacy",
  description:
    "How to report a vulnerability in the FSD CLI, what the CLI downloads and runs, how generated projects handle secrets, and what this documentation site stores.",
  alternates: { canonical: "/docs/security" },
};

const REPORT_URL = "https://github.com/FSD-CLI/cli/security/advisories/new";
const POLICY_URL = "https://github.com/FSD-CLI/cli/blob/main/SECURITY.md";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 space-y-4">
      <h2 id={id} className="text-2xl font-semibold tracking-[-0.5px] text-ink">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function SecurityPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Trust
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Security and privacy
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        How to report a problem, what the CLI does on your machine, and what
        this site keeps about you.
      </p>

      <section className="mt-10 rounded-2xl border border-brand-coral/30 bg-brand-peach/50 p-5">
        <h2
          id="report-a-vulnerability"
          className="text-lg font-semibold text-ink"
        >
          Report a vulnerability
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-body">
          Do not open a public issue. Use GitHub&apos;s{" "}
          <a href={REPORT_URL} className="text-brand-coral underline">
            private vulnerability report
          </a>{" "}
          for the CLI repository and include the CLI version, Node.js version,
          operating system, a minimal reproduction, and the impact. Maintainers
          confirm receipt, coordinate a fix, and publish details only after a
          fixed release is available. Template-only issues should also be
          reported to that template&apos;s repository. Fixes go to the latest
          release line; the full{" "}
          <a href={POLICY_URL} className="text-brand-coral underline">
            security policy
          </a>{" "}
          is in the repository.
        </p>
      </section>

      <Section id="what-the-cli-runs" title="What the CLI downloads and runs">
        <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-body">
          <li>
            <strong className="text-ink">Templates at pinned commits.</strong>{" "}
            <code>create</code> fetches the chosen template from GitHub with Git
            at a full, immutable commit hash built into the CLI release, and
            refuses the download if the fetched commit does not match.
          </li>
          <li>
            <strong className="text-ink">Your package manager.</strong> It runs
            npm, pnpm, Yarn, or Bun to install the template&apos;s dependencies,
            unless you pass <code>--no-install</code>. Commands run without a
            shell; on Windows, package-manager shims that need{" "}
            <code>cmd.exe</code> accept only simple arguments, and anything else
            is refused.
          </li>
          <li>
            <strong className="text-ink">Nothing else.</strong> The CLI has no
            telemetry or analytics and sends nothing about you or your project.
            Its only runtime dependencies are <code>chalk</code>,{" "}
            <code>ora</code>, and <code>prompts</code>.
          </li>
          <li>
            <strong className="text-ink">Local writes only.</strong> Generators
            write inside the project, preview with <code>--dry-run</code>,
            refuse symlinked paths, and roll back on failure.{" "}
            <code>check --architecture</code> runs the Steiger you installed and
            downloads nothing.
          </li>
        </ul>
      </Section>

      <Section id="generated-projects" title="Secrets in generated projects">
        <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-body">
          <li>
            Variables prefixed <code>VITE_</code>, <code>NEXT_PUBLIC_</code>,{" "}
            <code>NUXT_PUBLIC_</code>, or <code>PUBLIC_</code> end up in the
            browser bundle. Put only public values there.
          </li>
          <li>
            The Supabase adapter needs only the public URL and the publishable
            or anon key. Never ship a service-role or secret key to the browser,
            and enforce access with Row Level Security.
          </li>
          <li>
            When you extend the generated auth code, never log passwords,
            one-time codes, or tokens, including in error handlers.
          </li>
          <li>
            Templates include Dependabot and a dependency-security workflow.
            Keep them enabled and merge security updates promptly.
          </li>
        </ul>
      </Section>

      <Section id="site-privacy" title="What this site stores">
        <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-body">
          <li>
            No analytics, tracking scripts, or advertising cookies. The site
            does not ask for or store personal data from readers.
          </li>
          <li>
            Your light or dark theme choice is saved in your browser&apos;s
            local storage and never leaves your device.
          </li>
          <li>
            The home page loads public download and star counts directly from
            the npm and GitHub APIs, so your browser contacts those services.
          </li>
          <li>
            Documentation videos are embedded from{" "}
            <code>youtube-nocookie.com</code>, YouTube&apos;s privacy-enhanced
            mode.
          </li>
          <li>
            The maintainer dashboard uses a Supabase sign-in session cookie for
            maintainers only. Readers never see or need it.
          </li>
          <li>
            Like any website, the hosting provider may keep standard request
            logs such as IP address and user agent.
          </li>
        </ul>
      </Section>
    </article>
  );
}
