"use client";

import { Heart, X } from "lucide-react";
import { createContext, type ReactNode, useContext, useRef } from "react";
import { SupportProject } from "./support-project";

const SupportContext = createContext<(() => void) | null>(null);

export function SupportButton({ floating = false }: { floating?: boolean }) {
  const open = useContext(SupportContext);

  return (
    <button
      type="button"
      onClick={() => open?.()}
      aria-label={
        floating ? "Support FSD CLI — donation options" : "Support FSD CLI"
      }
      aria-haspopup="dialog"
      aria-controls="support-dialog"
      title="Support FSD CLI"
      className={
        floating
          ? "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[60] flex h-14 w-14 items-center justify-center rounded-full border border-rose-200 bg-rose-600 text-white shadow-lg transition-colors hover:bg-rose-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-600"
          : "inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-600"
      }
    >
      <Heart
        className={floating ? "h-6 w-6 fill-current" : "h-4 w-4"}
        aria-hidden="true"
      />
      {!floating && <span>Support</span>}
    </button>
  );
}

export function SupportProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <SupportContext.Provider value={() => dialog.current?.showModal()}>
      {children}
      <SupportButton floating />
      <dialog
        ref={dialog}
        id="support-dialog"
        aria-labelledby="support-dialog-title"
        className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-hairline bg-canvas p-0 text-ink shadow-xl backdrop:bg-black/40"
      >
        <div className="flex justify-end px-4 pt-4">
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close donation options"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-hairline hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <SupportProject compact />
      </dialog>
    </SupportContext.Provider>
  );
}
