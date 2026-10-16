"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  THEME_MEDIA_QUERY as MEDIA_QUERY,
  THEME_STORAGE_KEY as STORAGE_KEY,
  type ThemePreference,
} from "@/lib/theme";

export type { ThemePreference } from "@/lib/theme";

function readPreference(): ThemePreference {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "light" || value === "dark") return value;
  } catch {
    // Theme selection still works when browser storage is unavailable.
  }
  return "system";
}

const ThemeContext = createContext<{
  preference: ThemePreference;
  resolvedTheme: "light" | "dark";
  setPreference: (theme: ThemePreference) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const media = window.matchMedia(MEDIA_QUERY);
    let current = readPreference();
    const apply = () => {
      const resolved =
        current === "system" ? (media.matches ? "dark" : "light") : current;
      document.documentElement.classList.toggle("dark", resolved === "dark");
      document.documentElement.dataset.theme = current;
      document.documentElement.style.colorScheme = resolved;
      setPreferenceState(current);
      setResolvedTheme(resolved);
    };
    const select = (event: Event) => {
      current = (event as CustomEvent<ThemePreference>).detail;
      apply();
    };
    const sync = (event: StorageEvent) => {
      if (event.key !== null && event.key !== STORAGE_KEY) return;
      current = readPreference();
      apply();
    };
    apply();
    media.addEventListener("change", apply);
    window.addEventListener("fsd-theme-change", select);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", apply);
      window.removeEventListener("fsd-theme-change", select);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function setPreference(theme: ThemePreference) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Keep the in-memory preference active for this visit.
    }
    window.dispatchEvent(
      new CustomEvent("fsd-theme-change", { detail: theme }),
    );
  }

  return (
    <ThemeContext.Provider value={{ preference, resolvedTheme, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
