"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { type ThemePreference, useTheme } from "./theme-provider";

export function ThemeSwitcher() {
  const { preference, setPreference } = useTheme();

  const Icon =
    preference === "system" ? Monitor : preference === "dark" ? Moon : Sun;

  const cycleTheme = () => {
    if (preference === "system") setPreference("light");
    else if (preference === "light") setPreference("dark");
    else setPreference("system");
  };

  return (
    <div className="theme-switcher relative inline-flex items-center">
      <button
        type="button"
        onClick={cycleTheme}
        className="p-2 rounded-md hover:bg-muted transition-colors flex items-center justify-center"
        title={`Current theme: ${preference}. Click to change.`}
      >
        <Icon size={16} aria-hidden="true" />
        <span className="sr-only">Toggle color theme</span>
      </button>

      {/* Strictly sr-only so it never intercepts mouse clicks on the button */}
      <select
        aria-label="Color theme"
        value={preference}
        onChange={(event) =>
          setPreference(event.target.value as ThemePreference)
        }
        className="sr-only"
        tabIndex={-1}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
