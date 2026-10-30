"use client";

import { FileText, Hash, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { type SearchEntry, searchDocs } from "@/lib/search-index-query";
import { cn } from "@/lib/utils";

export function DocsSearch({ index }: { index: SearchEntry[] }) {
  const router = useRouter();
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = searchDocs(index, query);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = (entry: SearchEntry) => {
    setOpen(false);
    setQuery("");
    router.push(entry.href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-6 flex w-full items-center gap-2 rounded-lg border border-hairline bg-surface-soft px-3 py-2 text-sm text-body-muted transition-colors hover:text-ink"
        aria-haspopup="dialog"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span>Search docs</span>
        <kbd className="ml-auto rounded border border-hairline px-1.5 font-mono text-xs">
          ⌘K
        </kbd>
      </button>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) setQuery("");
        }}
      >
        <DialogContent className="top-[15%] translate-y-0 gap-0 p-0 sm:max-w-xl">
          <DialogTitle className="sr-only">Search documentation</DialogTitle>
          <div className="flex items-center gap-2 border-b border-hairline px-4 py-3 pr-10">
            <Search className="h-4 w-4 text-body-muted" aria-hidden="true" />
            <input
              autoFocus
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setActive((i) => Math.min(i + 1, results.length - 1));
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  setActive((i) => Math.max(i - 1, 0));
                } else if (event.key === "Enter" && results[active]) {
                  event.preventDefault();
                  go(results[active]);
                }
              }}
              placeholder="Search pages and sections"
              className="w-full bg-transparent text-base text-ink outline-none placeholder:text-body-muted"
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls={listId}
              aria-activedescendant={
                results[active] ? `${listId}-${active}` : undefined
              }
              aria-label="Search documentation"
            />
          </div>
          <div
            id={listId}
            role="listbox"
            className="max-h-[60vh] overflow-y-auto p-2"
          >
            {query.trim() && results.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-body-muted">
                No results for “{query.trim()}”.
              </p>
            ) : null}
            {results.map((entry, i) => (
              <div
                key={entry.href}
                id={`${listId}-${i}`}
                role="option"
                tabIndex={-1}
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(event) => {
                  event.preventDefault();
                  go(entry);
                }}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-md px-3 py-2",
                  i === active && "bg-surface-soft",
                )}
              >
                {entry.page ? (
                  <Hash
                    className="mt-0.5 h-4 w-4 shrink-0 text-body-muted"
                    aria-hidden="true"
                  />
                ) : (
                  <FileText
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-coral"
                    aria-hidden="true"
                  />
                )}
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink">
                    {entry.title}
                  </span>
                  <span className="block truncate text-xs text-body-muted">
                    {entry.page || entry.description}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
