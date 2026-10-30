import type { ReactNode } from "react";

/**
 * Typography for MDX docs content. Styles apply to Markdown output and to
 * raw JSX in the MDX file alike, matching the hand-written TSX pages.
 */
export function MdxContent({ children }: { children: ReactNode }) {
  return (
    <div className="mt-5 space-y-4 text-base leading-relaxed text-body [&_a]:text-brand-coral [&_a]:underline [&_h2]:!mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:!mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_thead]:bg-surface-soft [&_thead]:text-ink [&_th]:px-4 [&_th]:py-3 [&_th]:font-semibold [&_td]:border-t [&_td]:border-hairline [&_td]:px-4 [&_td]:py-3 [&_td:first-child]:font-semibold [&_td:first-child]:text-ink">
      {children}
    </div>
  );
}
