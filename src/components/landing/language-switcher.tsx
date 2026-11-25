"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import {
  availableLocales,
  type LocaleCode,
  localeOfPath,
  pathForLocale,
  plannedLocales,
} from "@/lib/i18n";

/**
 * Language switcher (I18N-01). Lists the available locales as options and the
 * planned ones (es, pt-BR, ja) disabled with "soon" until their content exists —
 * flipping a locale to `available: true` in src/lib/i18n.ts enables it here
 * with no other change.
 */
export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = localeOfPath(pathname);
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Language</span>
      <select
        ref={selectRef}
        aria-label="Language"
        value={current}
        onMouseDown={() => {
          selectRef.current?.focus({ preventScroll: true });
        }}
        onChange={(event) => {
          const nextLocale = event.target.value as LocaleCode;
          router.push(pathForLocale(pathname, nextLocale), { scroll: false });
        }}
        className="h-9 appearance-none rounded-[12px] border border-hairline bg-canvas ps-3 pe-8 text-sm font-medium text-ink transition-colors hover:border-ink/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
      >
        {availableLocales().map((locale) => (
          <option
            key={locale.code}
            value={locale.code}
            lang={locale.hreflang}
            dir={locale.dir}
            className="bg-canvas text-ink"
          >
            {locale.label}
          </option>
        ))}
        {plannedLocales().map((locale) => (
          <option
            key={locale.code}
            value={locale.code}
            disabled
            className="bg-canvas text-ink/50"
          >
            {locale.label} — soon
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        aria-hidden="true"
        className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-ink/60"
      />
    </label>
  );
}
