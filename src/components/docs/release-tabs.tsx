"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "cli", label: "CLI versions" },
  { id: "skill", label: "Agent Skill releases" },
] as const;

type Tab = (typeof tabs)[number]["id"];

export function ReleaseTabs({
  cli,
  skill,
}: {
  cli: ReactNode;
  skill: ReactNode;
}) {
  const [selected, setSelected] = useState<Tab>("cli");
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const target = document.getElementById(hash);
      const panel = target?.closest<HTMLElement>("[data-release-panel]");
      if (panel) setSelected(panel.dataset.releasePanel as Tab);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("docs-content-change", { detail: selected }),
    );
  }, [selected]);

  function select(tab: Tab) {
    setSelected(tab);
    window.history.replaceState(
      window.history.state,
      "",
      tab === "cli" ? "#version-2" : "#skill-releases",
    );
  }

  return (
    <div className="mt-8">
      <div
        role="tablist"
        aria-label="Release history"
        className="flex gap-1 rounded-xl border border-hairline bg-surface-soft p-1"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`release-tab-${tab.id}`}
            aria-controls={`release-panel-${tab.id}`}
            aria-selected={selected === tab.id}
            tabIndex={selected === tab.id ? 0 : -1}
            className={cn(
              "flex-1 rounded-lg px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-coral",
              selected === tab.id
                ? "bg-canvas text-ink shadow-sm"
                : "text-body-muted hover:text-ink",
            )}
            onClick={() => select(tab.id)}
            onKeyDown={(event) => {
              let next: number;
              if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
              else if (event.key === "ArrowLeft")
                next = (index + tabs.length - 1) % tabs.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = tabs.length - 1;
              else return;
              event.preventDefault();
              select(tabs[next].id);
              buttons.current[next]?.focus();
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`release-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`release-tab-${tab.id}`}
          data-release-panel={tab.id}
          hidden={selected !== tab.id}
          className="focus-visible:outline-2 focus-visible:outline-brand-coral"
        >
          {tab.id === "cli" ? cli : skill}
        </div>
      ))}
    </div>
  );
}
