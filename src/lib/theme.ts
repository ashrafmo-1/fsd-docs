export type ThemePreference = "light" | "dark" | "system";
export const THEME_STORAGE_KEY = "fsd-theme";
export const THEME_MEDIA_QUERY = "(prefers-color-scheme: dark)";

// Runs before the page paints; no user content is interpolated into this script.
export const THEME_INIT_SCRIPT = `(()=>{let t="system";try{const v=localStorage.getItem("${THEME_STORAGE_KEY}");if(v==="light"||v==="dark")t=v}catch{}const d=t==="dark"||(t==="system"&&matchMedia("${THEME_MEDIA_QUERY}").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=d?"dark":"light"})()`;
