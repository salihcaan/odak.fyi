import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";
const KEY = "odak-theme";

// Read the persisted theme synchronously on mount and mirror it onto the
// <body data-theme> attribute, matching the inline-script behavior on every
// existing page. We also expose a toggle that flips the attribute, persists
// the choice, and triggers a re-render so any consumer (e.g. the theme icon)
// can pick the right glyph.
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (localStorage.getItem(KEY) as Theme | null) ?? "dark";
    setThemeState(stored);
    document.body.setAttribute("data-theme", stored);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(KEY, next);
    document.body.setAttribute("data-theme", next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
