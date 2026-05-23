/// <reference types="vite/client" />

// Globals injected by vite.config.ts `define`. Replaced at build/dev
// time so the footer status row can show the running build.
declare const __BUILD_SHA__: string;
declare const __APP_VERSION__: string;
declare const __DMG_SIZE__: string;

interface ImportMetaEnv {
  readonly VITE_POSTHOG_KEY?: string;
  readonly VITE_POSTHOG_HOST?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
