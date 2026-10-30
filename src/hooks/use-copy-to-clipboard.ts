"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type CopyStatus, writeToClipboard } from "@/lib/clipboard";

/** Shows "copied" only after the write succeeds; errors stay until the next attempt. */
export function useCopyToClipboard(resetMs = 2000) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      clearTimeout(timer.current);
      const ok = await writeToClipboard(text);
      setStatus(ok ? "copied" : "error");
      if (ok) timer.current = setTimeout(() => setStatus("idle"), resetMs);
      return ok;
    },
    [resetMs],
  );

  const reset = useCallback(() => {
    clearTimeout(timer.current);
    setStatus("idle");
  }, []);

  return { status, copy, reset };
}
