import { DOCS_NAV_ITEMS } from "./docs-navigation.ts";
import type { LocaleCode } from "./i18n.ts";
import { getLocale } from "./i18n.ts";
import { CLI_RELEASES, LATEST_CLI_RELEASE } from "./releases.ts";
import { siteConfig } from "./site.ts";

const latestRelease = LATEST_CLI_RELEASE;

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
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "FSD CLI is the command-line package " +
      inlineCode(siteConfig.packageName) +
      ". It creates new Feature-Sliced Design projects and generates supported slices inside compatible projects. The official Feature-Sliced Design site owns the methodology; FSD CLI owns the scaffolding workflow documented here.",
    "",
    "## Documentation",
    "",
    ...docsLinks(),
    "",
    "## Translated quick starts",
    "",
    ...localizedLlmsLinks(),
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

interface LocalizedLlmsContent {
  /** Translated "Documentation" section heading. */
  docsHeading: string;
  /** Translated one-line description of the site (reuses the locale page). */
  description: string;
  /** Translated intro sentence about the CLI. */
  intro: string;
  /** Translated "Quick start" section heading. */
  quickStartHeading: string;
  /** Translated quick-start page title. */
  quickStartTitle: string;
  /** Translated note that the rest of the docs are English-only. */
  englishOnlyNote: string;
}

/**
 * Per-locale llms.txt content (I18N-08). English has no entry here — it
 * uses getLlmsIndex(). Keys follow LOCALES order in ./i18n.ts; adding a
 * language means adding its entry here plus its route under
 * src/app/<locale>/llms.txt/ (see docs/i18n-adding-a-language.md).
 */
const LOCALIZED_LLMS: Record<
  Exclude<LocaleCode, "en">,
  LocalizedLlmsContent
> = {
  ar: {
    docsHeading: "التوثيق",
    description:
      "دليل عربي مختصر لإنشاء مشروع Feature-Sliced Design باستخدام FSD CLI: المتطلبات، إنشاء المشروع، توليد الشرائح، والترقية الآمنة.",
    intro:
      "FSD CLI هي أداة سطر أوامر تنشئ مشاريع React وNext.js وVue وNuxt وSvelteKit بهيكل Feature-Sliced Design كامل، ثم تولّد الشرائح أثناء نمو المشروع.",
    quickStartHeading: "البدء السريع",
    quickStartTitle: "البدء السريع بالعربية",
    englishOnlyNote: "باقي التوثيق متوفر باللغة الإنجليزية فقط.",
  },
  ru: {
    docsHeading: "Документация",
    description:
      "Краткое руководство на русском языке по созданию проекта Feature-Sliced Design с помощью FSD CLI: требования, создание проекта, генерация срезов и безопасное обновление.",
    intro:
      "FSD CLI — это инструмент командной строки, который создаёт проект React, Next.js, Vue, Nuxt или SvelteKit с полной структурой Feature-Sliced Design, а затем генерирует срезы по мере роста проекта.",
    quickStartHeading: "Быстрый старт",
    quickStartTitle: "Быстрый старт на русском",
    englishOnlyNote:
      "Остальная документация пока доступна только на английском.",
  },
  "zh-CN": {
    docsHeading: "文档",
    description:
      "简体中文快速入门指南：使用 FSD CLI 创建 Feature-Sliced Design 项目——环境要求、创建项目、生成切片与安全升级。",
    intro:
      "FSD CLI 是一个命令行工具，用于创建具有完整 Feature-Sliced Design 结构的 React、Next.js、Vue、Nuxt 或 SvelteKit 项目，并随着项目增长生成切片。",
    quickStartHeading: "快速入门",
    quickStartTitle: "简体中文快速入门",
    englishOnlyNote: "其余文档目前仅提供英文版。",
  },
  es: {
    docsHeading: "Documentación",
    description:
      "Guía de inicio rápido en español: crea un proyecto con Feature-Sliced Design usando FSD CLI — requisitos, creación de proyectos, generación de slices y actualizaciones seguras.",
    intro:
      "FSD CLI es una herramienta de línea de comandos que crea proyectos de React, Next.js, Vue, Nuxt o SvelteKit con una estructura completa de Feature-Sliced Design y genera slices a medida que el proyecto crece.",
    quickStartHeading: "Inicio rápido",
    quickStartTitle: "Inicio rápido en español",
    englishOnlyNote:
      "El resto de la documentación está disponible solo en inglés.",
  },
  "pt-BR": {
    docsHeading: "Documentação",
    description:
      "Guia de início rápido em português: crie um projeto com Feature-Sliced Design usando o FSD CLI — requisitos, criação de projetos, geração de slices e atualizações seguras.",
    intro:
      "O FSD CLI é uma ferramenta de linha de comando que cria projetos React, Next.js, Vue, Nuxt ou SvelteKit com uma estrutura completa de Feature-Sliced Design e gera slices conforme o projeto cresce.",
    quickStartHeading: "Início rápido",
    quickStartTitle: "Início rápido em português",
    englishOnlyNote:
      "O restante da documentação está disponível apenas em inglês.",
  },
  ja: {
    docsHeading: "ドキュメント",
    description:
      "日本語クイックスタートガイド：FSD CLIでFeature-Sliced Designのプロジェクトを作成する — 要件、プロジェクト作成、スライス生成、安全なアップグレード。",
    intro:
      "FSD CLIは、完全なFeature-Sliced Design構造を持つReact、Next.js、Vue、Nuxt、SvelteKitプロジェクトを作成し、プロジェクトの成長に合わせてスライスを生成するコマンドラインツールです。",
    quickStartHeading: "クイックスタート",
    quickStartTitle: "日本語クイックスタート",
    englishOnlyNote: "その他のドキュメントは英語のみで提供されています。",
  },
};

/** Markdown links to every translated llms.txt, for the English index. */
function localizedLlmsLinks(): string[] {
  return (Object.keys(LOCALIZED_LLMS) as Exclude<LocaleCode, "en">[]).map(
    (code) => {
      const locale = getLocale(code);
      const content = LOCALIZED_LLMS[code];
      return (
        "- [" +
        locale.label +
        "](" +
        absoluteUrl(`${locale.prefix}/llms.txt`) +
        "): " +
        content.quickStartTitle +
        " (llms.txt)"
      );
    },
  );
}

/**
 * Localized llms.txt index for one non-English locale, served at
 * /<locale>/llms.txt. It links the locale's quick start plus the English
 * documentation and full reference — the rest of the docs are English-only.
 */
export function getLlmsIndexForLocale(code: LocaleCode): string {
  if (code === "en") {
    throw new Error("Use getLlmsIndex() for the English index.");
  }
  const locale = getLocale(code);
  const content = LOCALIZED_LLMS[code];
  return [
    `# ${siteConfig.name}`,
    "",
    `> ${content.description}`,
    "",
    "FSD CLI is the command-line package " +
      inlineCode(siteConfig.packageName) +
      ". " +
      content.intro,
    "",
    `## ${content.quickStartHeading}`,
    "",
    "- [" +
      content.quickStartTitle +
      "](" +
      absoluteUrl(locale.prefix) +
      "): " +
      content.description,
    "",
    "## " + content.docsHeading,
    "",
    "- [Getting Started](" +
      absoluteUrl("/docs/getting-started") +
      "): Create a React, Next.js, Vue, Nuxt, or SvelteKit project with a complete Feature-Sliced Design structure. (English)",
    "- [Full FSD CLI reference](" +
      absoluteUrl("/llms-full.txt") +
      "): Consolidated commands, framework support, boundaries, and latest release details. (English)",
    "- [llms.txt in English](" +
      absoluteUrl("/llms.txt") +
      "): Short index of the English documentation. (English)",
    "",
    content.englishOnlyNote,
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
    "## Release 2.7.0 (October 29, 2026)",
    "",
    "CLI 2.7.0 requires Node.js 22.12.0 or later and adds the opt-in Supabase auth adapter (--auth-provider supabase), light hooks with managed light-hooks-v1 migration state 2 to 3, batch and structure-only generation, check --architecture, layout widget presets, and shared ui/api generators. Supabase staging E2E remains pending. Use only public browser keys; SSR authorization and RLS require application integration.",
    "",
    "Tagged Skill v2.0.0 implements incremental existing-project migration with a verified synthetic React/Vite browser and rollback pilot. It is not a shipped arbitrary-app CLI migrate command or broad production-app certification. See " +
      absoluteUrl("/docs/release-readiness") +
      " for the status of each feature (stable, preview, planned).",
    "",
    "## Generator workflows (CLI 2.7.0)",
    "",
    "Native batch slices with preflight/rollback; --segments ui,api creates preserving TypeScript structure, and --root requires this structure-only mode. Shared/app use segments without slice names. --force and Supabase options cannot be combined with structure-only mode. check --architecture runs project-local Steiger without downloading dependencies and propagates its failure. -g widget navbar|sidebar|footer|bottom-bar generates accessible layout widget presets. -g shared ui [button input label card] and -g shared api generate shared primitives and an apiClient, keeping existing files. These options require CLI 2.7.0 or later.",
    "",
    "## Runtime requirements",
    "",
    "- CLI runtime: Node.js 22.12.0 or later (since 2.7.0).",
    "- Generated Nuxt projects: Node.js ^22.22.2 || ^24.11.0 || >=26.0.0. Generated SvelteKit projects: ^22.22.2 || >=24.0.0.",
    "- Package managers: npm 10.9.0+, pnpm 10.26.0+, Yarn 4.18.0+, or Bun 1.2.0+.",
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
    "CLI 2.6.3 accepts Angular native configuration for read-only inspection. Angular scaffolding, generation, reconfiguration, and managed upgrades remain unsupported and are rejected before writes.",
    "",
    "## AI Agent Skill",
    "",
    "    npx skills@1.7.0 add https://github.com/FSD-CLI/create-fsd-architecture/tree/v2.0.0/skills/fsd-cli --skill fsd-cli",
    "",
    "The " +
      inlineCode("fsd-cli") +
      " skill is currently released as " +
      inlineCode("v2.0.0") +
      ". It adds discovery, domain decisions, implementation, review, Supabase guidance, incremental migration/rollback, framework guides, and three read-only evidence helpers. It was verified against CLI 2.6.1, so it still labels the batch, segment, custom-root, Supabase, and Steiger flags as candidate-only even though they ship in CLI 2.7.0 and later. It inspects existing code first, prefers the CLI for supported operations, protects existing slices, and leaves business implementation to the coding agent. Review generated changes because agent behavior can vary across tools and existing project structures.",
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
