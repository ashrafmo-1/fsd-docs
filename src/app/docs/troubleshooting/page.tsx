import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description:
    "Error messages from the FSD CLI with their cause and fix: Node.js version, project names, generators, segments, Supabase auth, architecture checks, upgrades, and template downloads.",
  alternates: { canonical: "/docs/troubleshooting" },
};

type Entry = { id: string; message: string; cause: string; fix: string };
type Group = { id: string; title: string; entries: Entry[] };

// Messages are quoted from CLI 2.7.1; <value> marks text filled in at runtime.
const GROUPS: Group[] = [
  {
    id: "runtime",
    title: "Node.js and toolchain",
    entries: [
      {
        id: "node-version",
        message:
          "Node.js >=22.12.0 is required by the CLI (found 20.x). Upgrade Node.js to satisfy the supported runtime range before running this command.",
        cause:
          "The running Node.js is older than the CLI or the selected framework needs. Nuxt and SvelteKit need 22.22.2 or later.",
        fix: "Install a supported Node.js (for example with nvm install 22), open a new shell, and check node --version. See Compatibility for each framework.",
      },
      {
        id: "unsupported-package-manager",
        message: 'Unsupported package manager "<name>".',
        cause:
          "--package-manager or fsd.config.json names something other than npm, pnpm, yarn, or bun.",
        fix: "Use one of npm, pnpm, yarn, or bun. doctor also reports when the installed version is below the minimum.",
      },
    ],
  },
  {
    id: "create",
    title: "Creating a project",
    entries: [
      {
        id: "yes-requires-framework",
        message:
          "--framework is required when using --yes (for example, --framework react-vite).",
        cause: "--yes skips every prompt, including the template choice.",
        fix: "Add --framework react-vite, nextjs, vue-vite, nuxt, or sveltekit, and pass a project name.",
      },
      {
        id: "project-name-required",
        message: "A project name is required when using --yes.",
        cause: "Non-interactive mode cannot ask for the name.",
        fix: "Pass the name first: create-fsd-architecture my-app --framework react-vite --yes.",
      },
      {
        id: "target-exists",
        message: '"<name>" already exists. Re-run with --force to replace it.',
        cause: "The target directory is not empty.",
        fix: "Choose another name, or pass --force to replace it. --force rolls back automatically if creation fails.",
      },
      {
        id: "project-inside-cwd",
        message:
          "Project directory must be created inside the current directory.",
        cause: "The name contains .. or an absolute path.",
        fix: "cd to the parent folder first and pass a plain or nested relative name such as apps/web.",
      },
      {
        id: "template-download",
        message:
          "Cannot download template <repo> at pinned commit <ref>: <reason>",
        cause:
          "The CLI fetches the pinned template commit with git over HTTPS, and Git is missing or github.com is unreachable (offline, proxy, or firewall).",
        fix: "Check that git --version works and that you can reach https://github.com. Behind a proxy, set git config --global http.proxy, then retry.",
      },
      {
        id: "install-failed",
        message:
          "Dependency installation failed; project changes were rolled back.",
        cause:
          "The package manager exited with an error, usually network, registry auth, or an engines mismatch.",
        fix: "Read the package manager output printed below the message. Retry with --no-install to inspect the project, then install manually.",
      },
    ],
  },
  {
    id: "generate",
    title: "Generating slices",
    entries: [
      {
        id: "unknown-type",
        message:
          'Invalid type "<type>". Allowed types: feature, entity, widget, page.',
        cause:
          "The first argument after -g is not a layer the generator supports.",
        fix: "Use feature, entity, widget, page, or shared. app and shared accept only --segments.",
      },
      {
        id: "slice-exists",
        message: '"<path>" already exists. Re-run with --force to replace it.',
        cause: "A slice with that name is already in the layer.",
        fix: "Pick another name or pass --force for a single slice. Review with --dry-run first.",
      },
      {
        id: "batch-force",
        message:
          "Batch generation does not support --force; replace one reviewed slice at a time.",
        cause: "Several names were passed together with --force.",
        fix: "Run one command per slice you intend to overwrite.",
      },
      {
        id: "slice-name",
        message:
          "Slice name must start with a letter after normalization (for example, product-123).",
        cause: "The name starts with a digit or contains only symbols.",
        fix: "Use letters, numbers, and dashes, starting with a letter.",
      },
      {
        id: "options-after-generate",
        message: "Place generate options after --generate.",
        cause: "Flags such as --dry-run came before -g.",
        fix: "Write -g <type> <names...> first, then the flags.",
      },
    ],
  },
  {
    id: "segments",
    title: "Structure-only segments",
    entries: [
      {
        id: "root-requires-segments",
        message: "--root requires --segments (structure-only generation).",
        cause: "--root only applies to the structure-only mode.",
        fix: "Add --segments ui,api (or the segments you need).",
      },
      {
        id: "segments-format",
        message:
          "Segments must be comma-separated lowercase names (for example ui,api,model).",
        cause: "Segments were passed with spaces or uppercase letters.",
        fix: "Pass one argument: --segments ui,api,model.",
      },
      {
        id: "segments-force",
        message:
          "--segments cannot be combined with --force or --auth-provider.",
        cause:
          "Structure-only mode never overwrites files and generates no auth code.",
        fix: "Drop --force and --auth-provider from structure-only commands.",
      },
      {
        id: "shared-app-names",
        message: "For shared/app use --segments without slice names.",
        cause: "shared and app have no slices.",
        fix: "Run -g shared --segments ui,lib without a name.",
      },
      {
        id: "symlink",
        message: "Refusing symlink path: <path>",
        cause:
          "A target folder is a symlink; the CLI refuses to write through it.",
        fix: "Replace the symlink with a real directory or choose another --root.",
      },
    ],
  },
  {
    id: "auth",
    title: "Supabase auth adapter",
    entries: [
      {
        id: "auth-provider-scope",
        message: "--auth-provider supabase is only valid for feature auth.",
        cause: "The flag was used with another slice.",
        fix: "Run -g feature auth --auth-provider supabase.",
      },
      {
        id: "configure-client",
        message:
          "Configure the browser Supabase Auth client before submitting a form.",
        cause:
          "Generated forms ran before configureSupabaseAuth(client) was called.",
        fix: "Call configureSupabaseAuth with a browser client at app start. See Feature status for the setup snippet.",
      },
    ],
  },
  {
    id: "check",
    title: "check, doctor, and architecture checks",
    entries: [
      {
        id: "steiger-missing",
        message:
          "Install steiger and @feature-sliced/steiger-plugin in this project before using --architecture. No packages are downloaded automatically.",
        cause: "check --architecture runs the project's own Steiger.",
        fix: "npm install -D steiger @feature-sliced/steiger-plugin, add a Steiger config, and run the check again.",
      },
      {
        id: "steiger-failed",
        message: "Steiger architecture validation failed (<status>).",
        cause: "Steiger found layer or public-API violations.",
        fix: "Fix the reported imports, or adjust the rules in your Steiger config. The command exits non-zero so CI fails.",
      },
      {
        id: "schema-version",
        message: "Unsupported fsd.config.json schemaVersion: <version>.",
        cause: "The config was written by a newer CLI.",
        fix: "Run the latest CLI with npx create-fsd-architecture@latest.",
      },
    ],
  },
  {
    id: "upgrade",
    title: "Upgrades",
    entries: [
      {
        id: "check-with-yes",
        message: "--check cannot be combined with --yes or --no-install.",
        cause: "--check is read-only and never applies changes.",
        fix: "Use upgrade --check in CI and upgrade --yes locally.",
      },
      {
        id: "upgrade-rolled-back",
        message:
          "Upgrade failed: <reason> Affected source, configuration, manifest, and lockfile paths were rolled back.",
        cause: "A migration step or the dependency install failed.",
        fix: "Nothing was left half-applied. Fix the reason shown, review upgrade --dry-run, and apply again.",
      },
      {
        id: "upgrade-conflicts",
        message: "upgrade --check exits with code 3",
        cause: "CLI-owned files were customized, so the plan has conflicts.",
        fix: "Run upgrade --dry-run to list the conflicting files and resolve them manually.",
      },
    ],
  },
];

export default function TroubleshootingPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Error catalog
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Troubleshooting
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        Find the message the CLI printed, then apply the fix. Values in{" "}
        <code>&lt;angle brackets&gt;</code> differ per run. Start with{" "}
        <code>npx create-fsd-architecture@latest doctor</code>: it checks
        Node.js, Git, your package manager, and the project layout in one go.
        Exit codes are listed in the{" "}
        <Link
          href="/docs/cli-reference#exit-codes"
          className="text-brand-coral underline"
        >
          CLI reference
        </Link>
        .
      </p>

      {GROUPS.map((group) => (
        <section key={group.id} className="mt-10 space-y-4">
          <h2
            id={group.id}
            className="text-2xl font-semibold tracking-[-0.5px] text-ink"
          >
            {group.title}
          </h2>
          {group.entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-2xl border border-hairline p-5"
            >
              <h3 id={entry.id} className="font-mono text-sm text-ink">
                {entry.message}
              </h3>
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-[80px_1fr]">
                <dt className="font-semibold text-ink">Cause</dt>
                <dd className="text-body">{entry.cause}</dd>
                <dt className="font-semibold text-ink">Fix</dt>
                <dd className="text-body">{entry.fix}</dd>
              </dl>
            </div>
          ))}
        </section>
      ))}

      <section className="mt-10 rounded-2xl border border-hairline bg-surface-soft p-5">
        <h2 id="still-stuck" className="text-lg font-semibold text-ink">
          Still stuck?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-body">
          Open an issue on{" "}
          <a
            href="https://github.com/FSD-CLI/cli/issues"
            className="text-brand-coral underline"
          >
            GitHub
          </a>{" "}
          with the full command, the output, and the result of{" "}
          <code>doctor</code>.
        </p>
      </section>
    </article>
  );
}
