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

// Pull the latest release (highest <sparkle:version> integer) out of
// appcast.xml so the nav tag, "What's new" link, and Download size
// badge all track the actual shipped DMG without manual edits. The
// appcast is the source of truth for releases — the website used to
// hardcode "v0.1.4" and "26 MB" in three places, which drifted every
// release. Falls back to package.json + a dash so dev builds without
// an appcast (tarball checkout) still render.
function latestRelease(): { version: string; size: string } {
  try {
    const xml = readFileSync(path.resolve(__dirname, "appcast.xml"), "utf8");
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map((m) => {
        const body = m[1];
        const buildNo = Number(
          body.match(/<sparkle:version>(\d+)<\/sparkle:version>/)?.[1] ?? 0,
        );
        const version = body.match(
          /<sparkle:shortVersionString>([^<]+)<\/sparkle:shortVersionString>/,
        )?.[1];
        const bytes = Number(
          body.match(/<enclosure[^>]+length="(\d+)"/)?.[1] ?? 0,
        );
        return { buildNo, version, bytes };
      })
      .filter((i) => i.buildNo && i.version && i.bytes)
      .sort((a, b) => b.buildNo - a.buildNo);
    if (!items.length) throw new Error("no appcast items parsed");
    const top = items[0];
    return {
      version: top.version!,
      size: `${Math.round(top.bytes / (1024 * 1024))} MB`,
    };
  } catch {
    return { version: pkg.version, size: "—" };
  }
}
const release = latestRelease();

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
  "docs/activate",
] as const;
// Static HTML pages (currently /docs/actions.html) can't use the
// __APP_VERSION__/__DMG_SIZE__ defines that React reads, so swap
// {{APP_VERSION}} and {{DMG_SIZE}} placeholders at build/dev time
// against the same release info parsed from appcast.xml.
const htmlReleasePlugin = {
  name: "odak:html-release-vars",
  transformIndexHtml(html: string) {
    return html
      .replace(/\{\{APP_VERSION\}\}/g, release.version)
      .replace(/\{\{DMG_SIZE\}\}/g, release.size);
  },
};

const cleanUrlsPlugin = {
  name: "odak:clean-mpa-urls",
  configureServer(server: import("vite").ViteDevServer) {
    server.middlewares.use((req, _res, next) => {
      const url = req.url ?? "";
      const match = url.match(
        /^\/(buy|buy-stage|changelog|privacy|refund|terms|docs\/actions|docs\/activate)(\?.*)?$/,
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
  plugins: [react(), cleanUrlsPlugin, htmlReleasePlugin],
  // Tell Vite this is an MPA so it skips SPA-style index.html fallback
  // and trusts the URL-to-entry mapping (combined with cleanUrlsPlugin
  // above, /buy resolves to /buy.html in dev like it does in prod).
  appType: "mpa",
  root: "app",
  // Load .env files from the repo root, not from `app/`, so .env.local
  // sits next to package.json where deploy tooling expects it.
  envDir: "..",
  define: {
    __BUILD_SHA__: JSON.stringify(gitSha()),
    __APP_VERSION__: JSON.stringify(release.version),
    __DMG_SIZE__: JSON.stringify(release.size),
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
        "docs-activate": path.resolve(__dirname, "app/docs/activate.html"),
      },
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});
