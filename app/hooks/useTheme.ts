import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";
const KEY = "odak-theme";

// Read the persisted theme synchronously on mount and mirror it onto both
// <html data-theme> and <body data-theme>. The html attribute is what
// drives the page bg (the html element paints --bg as the canvas; body
// no longer carries a bg, so the BackgroundPaths ambient layer behind
// body is visible). Body keeps the attribute too so existing CSS rules
// scoped to `body[data-theme="..."]` (and legacy inline scripts on
// non-React pages) keep matching.
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");

  const apply = (t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
    document.body.setAttribute("data-theme", t);
  };

  useEffect(() => {
    const stored = (localStorage.getItem(KEY) as Theme | null) ?? "dark";
    setThemeState(stored);
    apply(stored);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(KEY, next);
    apply(next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
