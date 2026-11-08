# Adding a language to fsdcli.me (I18N-01)

English is the default locale and lives at the existing URLs (no prefix).
Every other locale lives under its own top-level prefix (e.g. `/ar`) — the
same per-locale page pattern the Arabic quick start (`/ar`) already uses.
There is no i18n library and no locale middleware/proxy: the site is fully
static and `src/proxy.ts` only handles Supabase auth for `/dashboard`.

The locale registry is `src/lib/i18n.ts`. To add a language:

1. **Build its pages** under `src/app/<locale>/`, following the existing
   `/ar` page: a static page that sets `lang`/`dir` on its content, keeps
   code blocks left-to-right, and sets metadata with
   `languages: languageAlternates("<english-path>")`.
2. **Register translated paths** in `TRANSLATED_PATHS` in `src/lib/i18n.ts`:
   map each English path to its translated path, e.g.
   `"/docs/getting-started": { ru: "/ru/docs/getting-started" }`. Pages
   without an entry fall back to the locale home page in the switcher.
3. **Flip the locale to `available: true`** in `LOCALES` in
   `src/lib/i18n.ts`. The language switcher and the hreflang map pick it up
   automatically — no other code changes.
4. **Add the locale's routes to the sitemap** (`src/app/sitemap.ts`) if they
   are top-level pages like `/ar` is today.
5. **Verify**: `npm run lint && npm run typecheck && npm run test && npm run build && npm run check:static`.
   The build output must list the new locale routes as static.

Per-language work beyond the site:

- The CLI README translation (`README.<locale>.md` in `FSD-CLI/cli`) is a
  separate PR in the same language task (I18N-03..07).
- Per-language `llms.txt` and SEO are I18N-08, not part of adding one
  language.
- Arabic is not in the plan — the only existing translation is the `/ar`
  quick-start page.
