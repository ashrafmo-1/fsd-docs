import { DOCS_NAV_ITEMS } from "@/lib/docs-navigation";
import { CLI_RELEASES } from "@/lib/releases";
import { siteConfig } from "@/lib/site";

const latestRelease =
  CLI_RELEASES.find((release) => release.status === "latest") ??
  CLI_RELEASES[0];

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

function inlineCode(value: string) {
  const marker = String.fromCharCode(96);
  return marker + value + marker;
}

function docsLinks() {
  return DOCS_NAV_ITEMS.map(
    (item) =>
      "- [" +
      item.label +
      "](" +
      absoluteUrl(item.href) +
      "): " +
      item.description,
  );
}

export function getLlmsIndex() {
  return [
    "# " + siteConfig.name,
    "",
    "> " + siteConfig.description,
    "",
    "FSD CLI is the command-line package " +
      inlineCode(siteConfig.packageName) +
      ". It creates new Feature-Sliced Design projects and generates supported slices inside compatible projects. The official Feature-Sliced Design site owns the methodology; FSD CLI owns the scaffolding workflow documented here.",
    "",
    "## Documentation",
    "",
    ...docsLinks(),
    "",
    "## Machine-readable resources",
    "",
    "- [Full FSD CLI reference](" +
      absoluteUrl("/llms-full.txt") +
      "): Consolidated commands, framework support, boundaries, and latest release details.",
    "- [GitHub source](" +
      siteConfig.github +
      "): CLI source, schemas, and tests.",
    "- [Agent Skill repository](" +
      siteConfig.repositories.skill +
      "): Stable portable " +
      inlineCode("fsd-cli") +
      " Agent Skill.",
    "- [npm package](" +
      siteConfig.npm +
      "): Published package and version history.",
    "- [Support on GitHub Sponsors](" +
      siteConfig.support.githubSponsors +
      "): Optional funding for ongoing FSD CLI development and documentation.",
    "- [Official FSD methodology](" +
      siteConfig.fsdOfficial +
      "): Architectural concepts and rules.",
    "",
    "## Agent Skill",
    "",
    "Install the execution-focused skill with " +
      inlineCode(
        "npx skills@1.7.0 add https://github.com/FSD-CLI/create-fsd-architecture/tree/v2.0.0/skills/fsd-cli --skill fsd-cli",
      ) +
      ". The pinned installer requires Node.js >=22.20.0; helpers require >=20. The current Skill release is " +
      inlineCode("v2.0.0") +
      ". It teaches compatible coding agents to inspect a project and use verified CLI operations instead of inventing commands or manually rebuilding supported scaffolds. Agent behavior can vary across tools and project structures, so generated changes should be reviewed before commit.",
    "",
  ].join("\n");
}

export function getLlmsFull() {
  const releaseDetails = latestRelease.sections.flatMap((section) => [
    "### " + section.title,
    "",
    ...section.items.map((item) => "- " + item),
    "",
  ]);
  const releaseArchive = CLI_RELEASES.map(
    (release) =>
      "- [" +
      release.version +
      "](" +
      absoluteUrl("/docs/releases/" + release.version) +
      "): " +
      release.summary,
  );
  const supportedFrameworks = [
    "react-vite",
    "nextjs",
    "vue-vite",
    "nuxt",
    "sveltekit",
  ]
    .map(inlineCode)
    .join(", ");
  const createOptions = [
    "--framework",
    "--template",
    "-f",
    "--yes",
    "-y",
    "--package-manager",
    "--api-client",
    "--server-state",
    "--client-state",
    "--forms",
    "--no-install",
    "--no-start",
    "--dry-run",
    "--force",
  ]
    .map(inlineCode)
    .join(", ");

  return [
    "# FSD CLI complete reference",
    "",
    "Canonical site: " + siteConfig.url,
    "Package: " + siteConfig.packageName,
    "Current documented release: " +
      latestRelease.version +
      " (" +
      latestRelease.date +
      ")",
    "Source: " + siteConfig.github,
    "Support: " + siteConfig.support.githubSponsors,
    "",
    "## Product scope",
    "",
    "FSD CLI creates new React + Vite, Next.js, Vue + Vite, Nuxt, and SvelteKit projects with all Feature-Sliced Design layers. Inside a compatible project it generates feature, entity, widget, and page slices, creates each slice public API, and performs framework-specific page route integration.",
    "",
    "The CLI is an execution and scaffolding tool. It does not replace the official Feature-Sliced Design methodology, provision an application backend, or implement product-specific business logic.",
    "",
    "## Upcoming source candidates (October 6, 2026)",
    "",
    "npm latest remains 2.6.1. CLI candidate d5a0bb1 adds an opt-in Supabase auth adapter (--auth-provider supabase), light hooks, and managed light-hooks-v1 migration state 2 to 3. These changes await follow-up PR review/CI/release; do not issue the new flag against npm 2.6.1. Supabase staging E2E remains pending. Use only public browser keys; SSR authorization and RLS require application integration.",
    "",
    "Tagged Skill v2.0.0 implements incremental existing-project migration with a verified synthetic React/Vite browser and rollback pilot. It is not a shipped arbitrary-app CLI migrate command or broad production-app certification. See " +
      absoluteUrl("/docs/release-readiness") +
      " for contracts and remaining release gates.",
    "",
    "## Candidate generator workflows",
    "",
    "Candidate-only: native batch slices with preflight/rollback; --segments ui,api creates preserving TypeScript structure, and --root requires this structure-only mode. Shared/app use segments without slice names. --force and Supabase options cannot be combined with structure-only mode. check --architecture runs project-local Steiger without downloading dependencies and propagates its failure. These options are absent from npm 2.6.1.",
    "",
    "## Runtime requirements",
    "",
    "- CLI runtime: Node.js 20 or later.",
    "- Generated Nuxt and SvelteKit projects: Node.js 22.22.2 or later.",
    "- Package managers: npm, pnpm, Yarn, or Bun.",
    "",
    "## Create a project",
    "",
    "Interactive:",
    "",
    "    npx create-fsd-architecture@latest my-app",
    "",
    "Repeatable example:",
    "",
    "    npx create-fsd-architecture@latest my-app --framework nextjs --package-manager pnpm --yes --no-start",
    "",
    "Supported framework IDs: " + supportedFrameworks + ".",
    "",
    "Create options: " +
      createOptions +
      ". " +
      inlineCode("--template") +
      " and " +
      inlineCode("-f") +
      " are aliases for " +
      inlineCode("--framework") +
      ".",
    "",
    "Project creation saves the selected stack in " +
      inlineCode("fsd.config.json") +
      ". Generators reuse that configuration without prompting again.",
    "",
    "## Generate slices",
    "",
    "    npx create-fsd-architecture@latest --generate feature cart",
    "    npx create-fsd-architecture@latest -g entity product",
    "    npx create-fsd-architecture@latest -g widget site-header",
    "    npx create-fsd-architecture@latest -g page checkout",
    "    npx create-fsd-architecture@latest -g feature auth",
    "",
    "Only " +
      ["feature", "entity", "widget", "page"].map(inlineCode).join(", ") +
      " are valid generator types. " +
      inlineCode("--dry-run") +
      " previews files. Existing slices are protected unless " +
      inlineCode("--force") +
      " is explicitly used.",
    "",
    "The special " +
      inlineCode("feature auth") +
      " scaffold includes login, registration, forgot-password, reset-password, and verification-code flows. API, query, state, and validation files depend on the saved stack. Generated " +
      inlineCode("/auth/*") +
      " endpoints are integration placeholders, not a deployed backend.",
    "",
    "There is no standalone segment generator and no command that initializes an arbitrary existing application in place. Do not invent " +
      ["init", "segment", "add", "migrate"].map(inlineCode).join(", ") +
      " commands.",
    "",
    "## Inspect and upgrade",
    "",
    "    npx create-fsd-architecture@latest check",
    "    npx create-fsd-architecture@latest doctor",
    "    npx create-fsd-architecture@latest config",
    "    npx create-fsd-architecture@latest upgrade --dry-run",
    "    npx create-fsd-architecture@latest upgrade --check",
    "    npx create-fsd-architecture@latest upgrade --yes",
    "",
    "Upgrade changes only tooling the CLI can prove it owns. It does not re-scaffold application code. Start with a read-only plan. Upgrade has no " +
      inlineCode("--force") +
      " option.",
    "",
    "## Framework behavior",
    "",
    "- React + Vite: FSD layers under " +
      inlineCode("src") +
      "; generated pages update the managed React Router entry.",
    "- Next.js: FSD layers under " +
      inlineCode("src") +
      "; generated pages receive thin App Router wrappers.",
    "- Vue + Vite: FSD layers under " +
      inlineCode("src") +
      "; generated pages update the managed Vue Router entry.",
    "- Nuxt: FSD layers under " +
      inlineCode("app") +
      "; route wrappers live under " +
      inlineCode("app/app/routes") +
      ".",
    "- SvelteKit: FSD layers under " +
      inlineCode("src") +
      "; route wrappers live under " +
      inlineCode("src/routes") +
      ".",
    "",
    "Angular is not supported by the current CLI release.",
    "",
    "## AI Agent Skill",
    "",
    "    npx skills@1.7.0 add https://github.com/FSD-CLI/create-fsd-architecture/tree/v2.0.0/skills/fsd-cli --skill fsd-cli",
    "",
    "The " +
      inlineCode("fsd-cli") +
      " skill is currently released as " +
      inlineCode("v2.0.0") +
      ". It adds discovery, domain decisions, implementation, review, Supabase guidance, incremental migration/rollback, framework guides, and three read-only evidence helpers. Published CLI 2.6.1 and candidate-only flags are explicitly separated. It inspects existing code first, prefers the CLI for supported operations, protects existing slices, and leaves business implementation to the coding agent. Review generated changes because agent behavior can vary across tools and existing project structures.",
    "",
    "## Documentation directory",
    "",
    ...docsLinks(),
    "",
    "## Latest release: " + latestRelease.version,
    "",
    latestRelease.summary,
    "",
    ...releaseDetails,
    "## Release archive",
    "",
    ...releaseArchive,
    "",
  ].join("\n");
}

export function llmsTextResponse(content: string) {
  return new Response(content, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
