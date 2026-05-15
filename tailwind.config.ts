import type { Config } from "tailwindcss";

export default {
  darkMode: "media",
  content: ["./app/**/*.{ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        // Mirror Odak's existing CSS tokens so Tailwind utilities stay on-brand.
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        "bg-3": "var(--bg-3)",
        surface: "var(--surface)",
        border: "var(--border)",
        fg: "var(--fg)",
        "fg-2": "var(--fg-2)",
        dim: "var(--dim)",
        mute: "var(--mute)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        lg: "calc(var(--radius) + 4px)",
        md: "var(--radius)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
