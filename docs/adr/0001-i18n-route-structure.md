# ADR 0001: I18N route structure (prefix segment vs separate routes)

- **Status:** Accepted
- **Date:** 2026-11-17
- **Task:** I18N-01
- **Deciders:** FSD docs maintainers

## Context

fsdcli.me is a documentation site that must stay fully static (verified by
`scripts/check-static-output.mjs`), keep every existing English URL working
(`/`, `/docs/*`, `/architecture`, and so on), and must not introduce
locale-aware middleware. `src/proxy.ts` already exists solely for Supabase
auth on `/dashboard` and must stay out of locale routing.

English is the default locale. Non-English languages need URL prefixes
(for example `/ar`, `/ru`). Two App Router layouts were compared.

### Option A — `app/[locale]/...` with `generateStaticParams`

Put the whole tree under a dynamic `[locale]` segment. Enumerate locales at
build time with `generateStaticParams`, and try to serve English **without**
a prefix so `/docs/getting-started` stays the canonical English URL.

### Option B — Separate routes per language

Keep English pages at their current paths (`src/app/docs/...`, `src/app/page.tsx`,
…). Add each translated language as its own top-level static tree
(`src/app/ar/...`, `src/app/ru/...`, …). A small locale registry
(`src/lib/i18n.ts`) owns prefixes, hreflang, and path mapping. Language
switching is plain links between static pages.

## Decision drivers

1. **Fully static output** — every public page must appear in the prerender
   manifest as `compute: "static"` with no runtime revalidation
   (`npm run check:static`).
2. **Stable English URLs** — old `/docs/*` (and other English) links must not
   break; no forced `/en/...` migration.
3. **No locale middleware** — no rewrite/redirect layer that maps unprefixed
   English URLs onto a `[locale]` tree, and no entanglement with the
   dashboard auth proxy.
4. **Incremental translation** — ship one locale (or one page) at a time
   without relocating the English docs tree.

## Comparison

| Concern | (A) `app/[locale]/...` | (B) Separate routes per language |
| --- | --- | --- |
| English without `/en` prefix | Needs optional catch-alls, duplicated unprefixed trees, or middleware rewrites. Hard to keep `/docs/*` identical without one of those. | Native: English stays where it already is. |
| Fully static + `generateStaticParams` | Possible for prefixed locales, but unprefixed English still fights the dynamic segment. | Each locale page is an ordinary static route; `force-static` as needed. |
| Middleware | Usually required for “default locale has no prefix”. Conflicts with the “no locale middleware” rule and with keeping `proxy.ts` auth-only. | Not required; switcher links between static paths. |
| Blast radius | Moves every route under `[locale]`; high risk of breaking `/docs/*`, sitemap, and dashboard layout boundaries. | Touches only new `src/app/<locale>/` trees plus the registry. |
| Adding a language | One more `generateStaticParams` value, but shared layouts must handle `lang`/`dir` for every page. | Copy the existing per-locale page pattern; flip `available: true` in the registry (see `docs/i18n-adding-a-language.md`). |
| Partial translations | Shared segment tempts 404s or English fallbacks inside the wrong prefix. | Missing translations fall back via `pathForLocale` to the locale home or English path map — explicit and static. |

## Decision

**Choose option B: separate routes per language.**

- Default locale (English): no URL prefix; existing paths remain canonical.
- Other locales: top-level prefix folders under `src/app/<locale>/`.
- Registry, hreflang, and switcher live in `src/lib/i18n.ts` (no i18n library).
- Locale detection/redirect middleware is out of scope permanently for this
  site’s public docs.

Option A is rejected for this project: serving English without a prefix under
`[locale]` either breaks the “no middleware” constraint or forces a large
restructure that would invalidate existing `/docs/*` links and complicate the
static-output guarantee.

## Consequences

### Positive

- Existing English bookmarks, search results, and inbound `/docs/*` links keep
  working with no redirects.
- `check-static-output.mjs` continues to assert concrete static routes
  (including per-locale `/<locale>/llms.txt`).
- Auth proxy stays limited to `/dashboard`; locale routing stays pure static
  HTML.
- Translators can land one language at a time following
  `docs/i18n-adding-a-language.md` and `docs/i18n-translation-workflow.md`.

### Negative / accepted trade-offs

- Translated pages are duplicated as separate route files rather than one
  parameterized page. Acceptable while the translated surface is mostly
  quick starts; revisit only if many full doc trees are translated and
  duplication becomes costly.
- Cross-locale path mapping must be maintained in `TRANSLATED_PATHS` instead
  of being derived from a single `[locale]` segment.

### Follow-ups

- Keep `docs/i18n-adding-a-language.md` as the operational how-to; this ADR
  is the why.
- Do not introduce `app/[locale]` for public docs without a new ADR that
  re-evaluates middleware and URL stability.
