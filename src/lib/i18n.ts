/**
 * Locale registry for fsdcli.me (I18N-01).
 *
 * English is the default locale and lives at the existing URLs (no prefix).
 * Every other locale lives under its own top-level prefix (e.g. /ar) — the
 * same per-locale page pattern the Arabic quick start (/ar) already uses.
 * Restructuring the whole app/ tree under a [locale] segment was rejected:
 * it would touch every route and break existing links (/docs/*, / etc.).
 *
 * No i18n library and no locale middleware/proxy: the site is fully static
 * (see scripts/check-static-output.mjs) and the existing proxy.ts only
 * handles Supabase auth for /dashboard. Locale detection/redirect would
 * entangle auth with routing, so locale pages are plain static routes and
 * the switcher links between them.
 *
 * How to add a language: see docs/i18n-adding-a-language.md. In short:
 * 1. Add its pages under src/app/<locale>/ (or extend TRANSLATED_PATHS).
 * 2. Flip the locale below to `available: true`.
 * 3. hreflang (`languageAlternates`) and the switcher pick it up
 *    automatically — no other code changes.
 */

export type LocaleCode = "en" | "ar" | "ru" | "zh-CN" | "es" | "pt-BR" | "ja";

export interface Locale {
  code: LocaleCode;
  /** BCP 47 tag used in hreflang and html lang. */
  hreflang: string;
  /** Native name shown in the language switcher. */
  label: string;
  /** Writing direction of the locale. */
  dir: "ltr" | "rtl";
  /** URL prefix, "" for the default locale. */
  prefix: string;
  /** True once the locale has at least one published page. */
  available: boolean;
}

export const DEFAULT_LOCALE: LocaleCode = "en";

export const LOCALES: readonly Locale[] = [
  {
    code: "en",
    hreflang: "en",
    label: "English",
    dir: "ltr",
    prefix: "",
    available: true,
  },
  {
    code: "ar",
    hreflang: "ar",
    label: "العربية",
    dir: "rtl",
    prefix: "/ar",
    available: true,
  },
  {
    code: "ru",
    hreflang: "ru",
    label: "Русский",
    dir: "ltr",
    prefix: "/ru",
    available: true,
  },
  {
    code: "zh-CN",
    hreflang: "zh-CN",
    label: "中文（简体）",
    dir: "ltr",
    prefix: "/zh-CN",
    available: true,
  },
  {
    code: "es",
    hreflang: "es",
    label: "Español",
    dir: "ltr",
    prefix: "/es",
    available: true,
  },
  {
    code: "pt-BR",
    hreflang: "pt-BR",
    label: "Português (Brasil)",
    dir: "ltr",
    prefix: "/pt-BR",
    available: true,
  },
  {
    code: "ja",
    hreflang: "ja",
    label: "日本語",
    dir: "ltr",
    prefix: "/ja",
    available: false,
  },
];

export function getLocale(code: LocaleCode): Locale {
  const locale = LOCALES.find((entry) => entry.code === code);
  if (!locale) throw new Error(`Unknown locale: ${code}`);
  return locale;
}

/** Locales with at least one published page (shown as links in the switcher). */
export function availableLocales(): Locale[] {
  return LOCALES.filter((locale) => locale.available);
}

/** Planned locales with no pages yet (shown disabled in the switcher). */
export function plannedLocales(): Locale[] {
  return LOCALES.filter((locale) => !locale.available);
}

/**
 * Pages that exist in more than one locale, keyed by their English path.
 * Each value maps locale code -> translated path. /ar, /ru, /zh-CN, /es
 * and /pt-BR exist today: the Arabic, Russian, Chinese, Spanish and
 * Brazilian Portuguese quick starts are translations of the English
 * getting-started guide. I18N-07 extends this map as it lands.
 */
export const TRANSLATED_PATHS: Readonly<
  Record<string, Partial<Record<LocaleCode, string>>>
> = {
  "/docs/getting-started": {
    ar: "/ar",
    ru: "/ru",
    "zh-CN": "/zh-CN",
    es: "/es",
    "pt-BR": "/pt-BR",
  },
};

/** English path of a page, resolving translated paths back to English. */
export function englishPathOf(pathname: string): string {
  for (const [english, translations] of Object.entries(TRANSLATED_PATHS)) {
    if (Object.values(translations).includes(pathname)) return english;
  }
  const current = localeOfPath(pathname);
  if (current === DEFAULT_LOCALE) return pathname;
  return pathname.slice(getLocale(current).prefix.length) || "/";
}

/** Locale of a pathname, matched on a full path segment (so /architecture is not /ar). */
export function localeOfPath(pathname: string): LocaleCode {
  for (const locale of LOCALES) {
    if (
      locale.prefix &&
      (pathname === locale.prefix || pathname.startsWith(`${locale.prefix}/`))
    ) {
      return locale.code;
    }
  }
  return DEFAULT_LOCALE;
}

/**
 * Path of the same page in another locale. If that page has no translation
 * yet, returns the target locale's home page (its prefix, or "/" for
 * English). Planned locales resolve to their prefix even though no page
 * exists there yet — the switcher disables them, so this is unreachable
 * from the UI.
 */
export function pathForLocale(pathname: string, target: LocaleCode): string {
  const english = englishPathOf(pathname);
  if (target === DEFAULT_LOCALE) return english;
  return TRANSLATED_PATHS[english]?.[target] ?? getLocale(target).prefix;
}

/**
 * hreflang map for a page's metadata `alternates.languages`, keyed by its
 * English path. Includes x-default (the English path) plus every available
 * locale that has a translation of this page. New languages slot in
 * automatically once they are in TRANSLATED_PATHS and marked available.
 */
export function languageAlternates(
  englishPath: string,
): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": englishPath,
    [DEFAULT_LOCALE]: englishPath,
  };
  const translations = TRANSLATED_PATHS[englishPath] ?? {};
  for (const locale of availableLocales()) {
    if (locale.code === DEFAULT_LOCALE) continue;
    const translated = translations[locale.code];
    if (translated) languages[locale.hreflang] = translated;
  }
  return languages;
}
