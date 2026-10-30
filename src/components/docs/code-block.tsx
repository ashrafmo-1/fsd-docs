"use client";

import { Check, Copy, X } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

export function CopyCodeButton({ text }: { text: string }) {
  const { status, copy } = useCopyToClipboard();

  return (
    <>
      <button
        type="button"
        onClick={() => copy(text)}
        className="absolute right-3 top-3 rounded-md p-1.5 text-white/30 transition-colors hover:text-white/60"
        aria-label="Copy code"
      >
        {status === "copied" ? (
          <Check className="h-3.5 w-3.5 text-brand-mint" />
        ) : status === "error" ? (
          <X className="h-3.5 w-3.5 text-red-300" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
      {status === "error" ? (
        <span className="absolute right-11 top-3.5 text-xs text-red-300">
          Copy failed. Select the code to copy it.
        </span>
      ) : null}
      <span className="sr-only" aria-live="polite">
        {status === "copied"
          ? "Code copied"
          : status === "error"
            ? "Copy failed. Select the code to copy it manually."
            : ""}
      </span>
    </>
  );
}

export function CodeBlock({
  code,
  language = "bash",
}: {
  code: string;
  language?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[12px] bg-surface-dark">
      <div
        data-markdown="skip"
        className="flex items-center gap-2 border-b border-white/10 px-4 py-2"
      >
        <span className="text-xs text-white/30">{language}</span>
      </div>
      <pre
        data-language={language}
        className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-white/80"
      >
        <code>{code}</code>
      </pre>
      <CopyCodeButton text={code} />
    </div>
  );
}
