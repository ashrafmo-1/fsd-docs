"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  availableLocales,
  type LocaleCode,
  localeOfPath,
  pathForLocale,
  plannedLocales,
} from "@/lib/i18n";

/**
 * Language switcher (I18N-01). Lists the available locales as links and the
 * planned ones (zh-CN, es, pt-BR, ja) disabled with "soon" until their
 * content exists — flipping a locale to `available: true` in src/lib/i18n.ts
 * enables it here with no other change.
 */
export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = localeOfPath(pathname);

  return (
    <label className="inline-flex items-center">
      <span className="sr-only">Language</span>
      <select
        aria-label="Language"
        value={current}
        onChange={(event) => {
          router.push(
            pathForLocale(pathname, event.target.value as LocaleCode),
          );
        }}
        className="h-9 rounded-[12px] border border-hairline bg-canvas px-2 text-sm font-medium text-ink"
      >
        {availableLocales().map((locale) => (
          <option
            key={locale.code}
            value={locale.code}
            lang={locale.hreflang}
            dir={locale.dir}
          >
            {locale.label}
          </option>
        ))}
        {plannedLocales().map((locale) => (
          <option key={locale.code} value={locale.code} disabled>
            {locale.label} — soon
          </option>
        ))}
      </select>
    </label>
  );
}
