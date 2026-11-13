# FSD glossary for translators (I18N-02)

The canonical English terms used across the FSD CLI docs and README, and
how to render them in translation. Every translator reads this before
translating; every language task uses it as the review checklist for
terminology.

Source of the definitions: `/docs/concepts` on fsdcli.me (layers, slices,
segments, public API, the import rule) and the CLI reference
(`/docs/cli-reference`).

## How to use this glossary

- **Never translate** means the English word stays as-is everywhere,
  including inside translated sentences.
- **Translate consistently** means pick one rendering per language, use it
  everywhere, and never render the same term two ways in one language.
- **Keep the English term** means there is no good equivalent: use the
  English word (as a loanword) and use it consistently.
- If a term you need is missing, add it here in the same PR that first
  uses it — never invent a translation on the fly.

## Methodology

| Term                        | Translate?                                                                      | Meaning                                                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature-Sliced Design (FSD) | Never translate                                                                 | The methodology itself: frontend code organized by what it does for the product, not by file type. The abbreviation `FSD` also stays.                                   |
| layer                       | Translate consistently                                                          | A top-level folder under the source root. Six layers, most specific to most generic: `app`, `pages`, `widgets`, `features`, `entities`, `shared`.                       |
| slice                       | Translate consistently, or keep the English term if there is no good equivalent | Inside `pages`, `widgets`, `features`, and `entities`, code split by business concept (`product`, `cart`, `checkout`). A slice groups everything that changes together. |
| segment                     | Translate consistently                                                          | Inside a slice, code grouped by technical purpose: `ui`, `model`, `api`, `lib`, `config`.                                                                               |
| public API                  | Translate consistently                                                          | The `index.ts` a slice exposes. Other layers import only from that file, never from a path inside the slice.                                                            |
| import rule                 | Translate consistently                                                          | A module may import only from layers below its own; slices on the same layer never import each other.                                                                   |
| business logic              | Translate consistently                                                          | The rules of the product itself (prices, permissions, state transitions), as opposed to UI or plumbing.                                                                 |
| business value              | Translate consistently                                                          | The user-facing value an interaction delivers (e.g. adding to cart, checking out).                                                                                      |
| business concept            | Translate consistently                                                          | The real-world idea a slice is named after (`product`, `cart`, `checkout`).                                                                                             |

## Layers (folder names are never translated)

| Term       | Translate?                                                       | Meaning                                                                                                                                                                  |
| ---------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app`      | Never translate (folder name)                                    | Entry point, providers, routing, global styles. Has no slices.                                                                                                           |
| `pages`    | Never translate (folder name)                                    | Full routed screens, composed from lower layers.                                                                                                                         |
| `widgets`  | Never translate (folder name)                                    | Large self-contained UI blocks reused across pages.                                                                                                                      |
| `features` | Never translate (folder name)                                    | User interactions that bring business value.                                                                                                                             |
| `entities` | Never translate (folder name)                                    | Business entities the product works with.                                                                                                                                |
| `shared`   | Never translate (folder name)                                    | Reusable code with no business meaning. Has no slices.                                                                                                                   |
| feature    | Translate consistently in prose; never translate the folder name | In prose, a user interaction (e.g. add-to-cart). Do not confuse with the everyday word "feature" (a product capability) — when the docs mean the layer, keep `features`. |
| entity     | Translate consistently in prose; never translate the folder name | In prose, a business object the product works with (e.g. a product, an order).                                                                                           |
| widget     | Translate consistently in prose; never translate the folder name | In prose, a large reusable UI block (e.g. a navbar, a cart summary).                                                                                                     |
| page       | Translate consistently in prose; never translate the folder name | In prose, a full routed screen.                                                                                                                                          |

## Segments (names are never translated)

| Term     | Translate?                     | Meaning                                       |
| -------- | ------------------------------ | --------------------------------------------- |
| `ui`     | Never translate (segment name) | Components, styles, and view-only formatting. |
| `model`  | Never translate (segment name) | Types, schemas, stores, and business logic.   |
| `api`    | Never translate (segment name) | Requests and data mapping for this slice.     |
| `lib`    | Never translate (segment name) | Helpers used inside the slice.                |
| `config` | Never translate (segment name) | Constants and feature flags.                  |

## CLI and tooling (never translate)

| Term                      | Translate?                                                  | Meaning                                                                                                      |
| ------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| FSD CLI                   | Never translate                                             | The command-line tool itself.                                                                                |
| `fsd`                     | Never translate                                             | The command users run (`fsd check`, `fsd g`, `fsd upgrade`).                                                 |
| `create-fsd-architecture` | Never translate                                             | The npm package (`npx create-fsd-architecture@latest`).                                                      |
| `fsd check`               | Never translate                                             | The command that validates a project (use `--architecture` to lint layer and public-API violations).         |
| `fsd g` / generator       | Never translate the command; translate "generator" in prose | `fsd g` (generate) creates a slice with its segments and public API. The slice generator covers every layer. |
| `fsd upgrade`             | Never translate                                             | The command that plans and applies protected migrations.                                                     |
| `fsd config`              | Never translate                                             | The command that manages project configuration.                                                              |
| `--dry-run`               | Never translate                                             | A flag that previews a command without changing anything. In prose, "dry run" may be translated.             |
| `fsd.config.json`         | Never translate                                             | The project configuration file.                                                                              |
| scaffold / scaffolding    | Translate consistently                                      | Generating the initial project structure and files.                                                          |
| template                  | Translate consistently                                      | A starter project the CLI generates from (framework templates).                                              |
| framework                 | Translate consistently                                      | The UI framework of a project (Next.js, Vue, Svelte, Nuxt). Framework names themselves are never translated. |
| Steiger                   | Never translate                                             | The external linter for FSD layer and public-API violations.                                                 |
| Agent Skill               | Translate "skill" in prose; keep the product name           | The FSD CLI Agent Skill teaches AI agents the FSD workflow. The product name stays in English.               |

## Docs and site (never translate file names)

| Term                               | Translate?                  | Meaning                                                                     |
| ---------------------------------- | --------------------------- | --------------------------------------------------------------------------- |
| getting started                    | Translate consistently      | The first guide a new user follows to create a complete FSD project.        |
| quick start                        | Translate consistently      | A short guide that gets a user running fast (the `/ar` page is one).        |
| `README.md` / `README.<locale>.md` | Never translate (file name) | The CLI repository README and its translations.                             |
| `llms.txt`                         | Never translate (file name) | The machine-readable site summary for AI tools.                             |
| onboarding                         | Translate consistently      | The guided first experience of a new project (see `fsd explain`).           |
| exit code                          | Translate consistently      | The numeric status a command returns (0 = success).                         |
| code block                         | Translate consistently      | A block of code in a doc page. Code inside it is never translated.          |
| flag                               | Translate consistently      | A command-line option such as `--dry-run`. Flag names are never translated. |
