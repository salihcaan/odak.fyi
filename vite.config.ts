import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const pkg = JSON.parse(
  readFileSync(path.resolve(__dirname, "package.json"), "utf8"),
) as { version: string };

// Short git SHA at build/dev time. The footer status row shows it so
// the brand reads as a developer tool that ships frequently. Falls
// back to "dev" when git isn't reachable so a tarball checkout still
// builds.
function gitSha(): string {
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "dev";
  }
}

// Production hosting rewrites /buy → /buy.html etc.; dev needs the
// same mapping or Vite's TS resolver wins and serves /buy as the
// compiled buy.tsx module (Chrome renders the script as text in a
// <pre>, breaking the page). Tiny dev-only middleware matches the
// known MPA entries and rewrites before Vite's resolver runs.
const MPA_ENTRIES = [
  "buy",
  "buy-stage",
  "changelog",
  "privacy",
  "refund",
  "terms",
  "docs/actions",
] as const;
const cleanUrlsPlugin = {
  name: "odak:clean-mpa-urls",
  configureServer(server: import("vite").ViteDevServer) {
    server.middlewares.use((req, _res, next) => {
      const url = req.url ?? "";
      const match = url.match(
        /^\/(buy|buy-stage|changelog|privacy|refund|terms|docs\/actions)(\?.*)?$/,
      );
      if (match && MPA_ENTRIES.includes(match[1] as (typeof MPA_ENTRIES)[number])) {
        req.url = `/${match[1]}.html${match[2] ?? ""}`;
      }
      next();
    });
  },
};

// MPA build — one HTML entry per URL on the existing site. Output path
// matches today's URL structure (e.g. /buy.html, /changelog.html) so
// inbound links from Release builds, search engines, and bookmarks keep
// working after cutover.
export default defineConfig({
  plugins: [react(), cleanUrlsPlugin],
  // Tell Vite this is an MPA so it skips SPA-style index.html fallback
  // and trusts the URL-to-entry mapping (combined with cleanUrlsPlugin
  // above, /buy resolves to /buy.html in dev like it does in prod).
  appType: "mpa",
  root: "app",
  define: {
    __BUILD_SHA__: JSON.stringify(gitSha()),
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  // app/public/ contains a symlink to ../assets so CSS paths like
  // url('/assets/bundled/inter-latin.woff2') resolve correctly.
  publicDir: "public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "app/index.html"),
        buy: path.resolve(__dirname, "app/buy.html"),
        "buy-stage": path.resolve(__dirname, "app/buy-stage.html"),
        changelog: path.resolve(__dirname, "app/changelog.html"),
        privacy: path.resolve(__dirname, "app/privacy.html"),
        refund: path.resolve(__dirname, "app/refund.html"),
        terms: path.resolve(__dirname, "app/terms.html"),
        "docs-actions": path.resolve(__dirname, "app/docs/actions.html"),
      },
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});
