"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

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
        aria-label={`Color theme: ${preference}. Switch theme`}
        title={`Current theme: ${preference}. Click to change.`}
        className="p-2 rounded-md hover:bg-muted transition-colors flex items-center justify-center"
      >
        <Icon size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
