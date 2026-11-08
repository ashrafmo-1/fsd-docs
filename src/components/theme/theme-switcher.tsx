"use client";

import { type LucideIcon, Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ThemePreference, useTheme } from "./theme-provider";

const THEME_OPTIONS: {
  value: ThemePreference;
  label: string;
  Icon: LucideIcon;
}[] = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
];

export function ThemeSwitcher() {
  const { preference, setPreference } = useTheme();

  return (
    <fieldset
      aria-label="Color theme"
      className="m-0 hidden min-w-0 items-center gap-0.5 rounded-[10px] border border-hairline bg-canvas p-0.5 sm:inline-flex"
    >
      {THEME_OPTIONS.map(({ value, label, Icon }) => {
        const active = preference === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={active}
            title={label}
            onClick={() => setPreference(value)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors",
              active
                ? "bg-surface-soft text-ink"
                : "text-body-muted hover:text-ink",
            )}
          >
            <Icon size={15} aria-hidden="true" />
          </button>
        );
      })}
    </fieldset>
  );
}
