# Translation workflow for fsdcli.me (I18N-02)

How a new language goes from an empty task to published pages. This is the
process doc; the companion files are:

- `docs/i18n-adding-a-language.md` (I18N-01) — the technical steps: page
  layout, the locale registry (`src/lib/i18n.ts`), metadata, verification.
- `docs/i18n-glossary.md` (this task) — the FSD terms every translator uses.
  Read it before translating a single sentence.

Status: the i18n structure (locale registry, hreflang, language switcher)
lands in PR #96 (I18N-01). This workflow assumes it is merged; the steps
below do not work on the pre-I18N-01 site.

## Scope

Translated:

- Website pages under `src/app/<locale>/` (one page per English source
  page, starting with the getting-started guide).
- The CLI README translation, `README.<locale>.md` in `FSD-CLI/cli`
  (a separate PR in the same language task, I18N-03..07).

Not translated here:

- Per-language `llms.txt` and SEO — I18N-08.
- CLI messages themselves — I18N-09 (evaluation only).
- Arabic — not in the plan. The only existing translation is the `/ar`
  quick-start page.

Planned languages (from the locale registry): Russian (`ru`), Simplified
Chinese (`zh-CN`), Spanish (`es`), Brazilian Portuguese (`pt-BR`),
Japanese (`ja`). English is the source of truth and stays at the existing
URLs with no prefix.

## Roles

- **Translator** — a native speaker of the target language who knows
  Feature-Sliced Design. Writes the translation.
- **Reviewer** — a second native speaker who knows FSD. Reviews before
  merge. The translator never merges their own language.
- **Maintainer** — owns the locale registry, the glossary, and the final
  `available: true` flip. Usually the person who opened the language PR.

One language per task, one task per translator at a time.

## Workflow per language

1. **Claim the task.** Take the language task (I18N-03..07) in Mujtahid OS,
   move it to In Progress, assign it to yourself.
2. **Read the glossary first** (`docs/i18n-glossary.md`). If a term you need
   is missing, add it to the glossary in the same PR — never invent a
   translation for an FSD term on the fly.
3. **Translate the getting-started guide first.** It is the page every new
   user reads, and the Arabic `/ar` page is its model: same structure, same
   code blocks, prose translated. Then translate the remaining pages in the
   order of `src/lib/docs-navigation.ts` (Start group first).
4. **Build the pages** exactly as `docs/i18n-adding-a-language.md`
   describes: under `src/app/<locale>/`, `lang`/`dir` set, code blocks
   left-to-right, metadata with `languages: languageAlternates(...)`.
5. **Translate the CLI README** as `README.<locale>.md` in `FSD-CLI/cli`
   and open it as a second PR. A PR cannot span repos, so each language
   task always produces two PRs: website (fsd-docs) + README (cli).
6. **Open the website PR** against `main` with the language code in the
   title, e.g. `feat(docs): add Russian (ru) pages`. Link the Mujtahid OS
   task in the description.
7. **Review.** The reviewer checks the review checklist below, not just the
   prose. Fix, re-request review, and only then merge.
8. **Flip the locale to `available: true`** in `LOCALES` in
   `src/lib/i18n.ts` in the same PR (or a follow-up PR if the pages land
   in parts). The switcher and hreflang pick it up automatically.
9. **Verify** with `npm run lint && npm run typecheck && npm run test &&
   npm run build && npm run check:static`. The build output must list the
   new locale routes as static.
10. **Move the task to Review** in Mujtahid OS with both PR links, then to
    Done once both PRs merge.

## Rules — what never gets translated

- Code blocks, commands, flags, and their output. `npx
  create-fsd-architecture@latest`, `fsd check`, `fsd g`, `--dry-run`,
  `--architecture` stay exactly as written.
- File and folder names: `src/app`, `features/cart`, `entities/product`,
  `index.ts`, `fsd.config.json`, `README.md`, `llms.txt`. Layer folder
  names (`app`, `pages`, `widgets`, `features`, `entities`, `shared`)
  and segment names (`ui`, `model`, `api`, `lib`, `config`) stay in
  English even inside translated prose.
- Product and tool names: FSD CLI, Feature-Sliced Design, `fsd`,
  `create-fsd-architecture`, Steiger, Next.js, and framework names.
- Link targets. Translate the link text, never the URL.
- `lang`/`dir` metadata values and BCP 47 tags (`ru`, `zh-CN`, `pt-BR`).

Translate the prose around these, and keep code blocks left-to-right
(`dir="ltr"`) even on right-to-left pages.

## Rules — what gets translated

- Page prose, headings, and link text.
- Page metadata: `title` and `description` in each translated page.
- UI copy on translated pages (buttons, callouts, table headers).
- The README prose in `README.<locale>.md` — same never-translate rules
  apply inside it.

## Review checklist

- [ ] Every translated page matches the structure of its English source
  (same sections, same order, same code blocks).
- [ ] No code block, command, flag, file path, or product name was
  translated.
- [ ] FSD terms match the glossary (`docs/i18n-glossary.md`) exactly, and
  any new term was added to it.
- [ ] One term, one translation: the same English term is never rendered
  two different ways in one language.
- [ ] `lang`/`dir` are set, code blocks are LTR, metadata title and
  description are translated.
- [ ] `TRANSLATED_PATHS` in `src/lib/i18n.ts` covers every translated page.
- [ ] `npm run lint && npm run typecheck && npm run test && npm run build
      && npm run check:static` all pass; new routes are static in the
  build output.
- [ ] The README PR exists in `FSD-CLI/cli` and is linked from the task.

## Keeping translations alive

English is the source of truth. When an English page changes, its
translations are stale until re-translated — a stale translation is worse
than no translation, because it teaches the wrong thing.

- Fix the English page first, then re-translate. Never edit a translation
  to fix a fact that is wrong in English.
- If a translated page falls behind and nobody can update it, remove it
  and flip the locale back to `available: false` rather than shipping a
  page that contradicts the English docs.
- New FSD terms go into the glossary (`docs/i18n-glossary.md`) before they
  are used in any translation.
