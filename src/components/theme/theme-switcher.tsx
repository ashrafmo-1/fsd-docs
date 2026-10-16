"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { type ThemePreference, useTheme } from "./theme-provider";

export function ThemeSwitcher() {
  const { preference, setPreference } = useTheme();
  const Icon =
    preference === "system" ? Monitor : preference === "dark" ? Moon : Sun;
  return (
    <label className="theme-switcher" title="Color theme">
      <Icon size={15} aria-hidden="true" />
      <span className="sr-only">Color theme</span>
      <select
        aria-label="Color theme"
        value={preference}
        onChange={(event) =>
          setPreference(event.target.value as ThemePreference)
        }
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
