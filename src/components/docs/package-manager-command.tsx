"use client";

import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";

const MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const;
type Manager = (typeof MANAGERS)[number];

const STORAGE_KEY = "fsd-docs-package-manager";
const CHANGE_EVENT = "fsd-docs-package-manager-change";

function readStored(): Manager {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return MANAGERS.includes(value as Manager) ? (value as Manager) : "npm";
  } catch {
    return "npm";
  }
}

/** One command per package manager; the choice is shared across the page. */
export function PackageManagerCommand({
  commands,
}: {
  commands: Record<Manager, string>;
}) {
  const id = useId();
  const [manager, setManager] = useState<Manager>("npm");

  useEffect(() => {
    setManager(readStored());
    const sync = () => setManager(readStored());
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const choose = (next: Manager) => {
    setManager(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Package manager"
        className="mb-2 flex gap-1"
      >
        {MANAGERS.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            id={`${id}-${name}`}
            aria-selected={manager === name}
            aria-controls={`${id}-panel`}
            tabIndex={manager === name ? 0 : -1}
            onClick={() => choose(name)}
            onKeyDown={(event) => {
              const step =
                event.key === "ArrowRight"
                  ? 1
                  : event.key === "ArrowLeft"
                    ? -1
                    : 0;
              if (!step) return;
              event.preventDefault();
              const next =
                MANAGERS[
                  (MANAGERS.indexOf(name) + step + MANAGERS.length) %
                    MANAGERS.length
                ];
              choose(next);
              document.getElementById(`${id}-${next}`)?.focus();
            }}
            className={cn(
              "rounded-md px-3 py-1.5 font-mono text-xs transition-colors",
              manager === name
                ? "bg-ink text-on-primary"
                : "text-body-muted hover:bg-surface-soft hover:text-ink",
            )}
          >
            {name}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-${manager}`}
      >
        <CodeBlock code={commands[manager]} />
      </div>
    </div>
  );
}
