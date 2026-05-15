import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// MPA build — one HTML entry per URL on the existing site. Output path
// matches today's URL structure (e.g. /buy.html, /changelog.html) so
// inbound links from Release builds, search engines, and bookmarks keep
// working after cutover.
export default defineConfig({
  plugins: [react()],
  root: "app",
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
      },
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});
