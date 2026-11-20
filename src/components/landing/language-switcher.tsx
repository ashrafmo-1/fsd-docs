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
 * Language switcher (I18N-01). Lists available locales and planned ones
 * disabled with "soon". Features a custom styled chevron and scroll-jump fix.
 */
export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = localeOfPath(pathname);
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <div className="inline-flex items-center relative">
      <span className="sr-only">Language</span>
      <select
        ref={selectRef}
        aria-label="Language"
        value={current}
        onMouseDown={() => {
          if (selectRef.current) {
            selectRef.current.focus({ preventScroll: true });
          }
        }}
        onChange={(event) => {
          router.push(
            pathForLocale(pathname, event.target.value as LocaleCode),
          );
        }}
        className="h-9 appearance-none rounded-[12px] border border-hairline bg-canvas pl-3 pr-8 text-sm font-medium text-ink cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring"
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
      <ChevronDown
        size={14}
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink/60"
      />
    </div>
  );
}
