import posthog from "posthog-js";

// Site analytics — PostHog in its strictest privacy mode so the
// website matches the macOS app's posture (see /privacy):
//   - persistence: "memory" → no cookies, no localStorage, no
//     cross-session identifier. Each tab is a fresh anonymous beat.
//   - person_profiles: "never" → no person record is created server-side.
//   - autocapture: false → only the explicit $pageview event ships,
//     no rage-clicks / form fills / surveys / heatmaps / surveys.
//   - disable_session_recording: true → no replay.
//   - ip: false → PostHog's project-level IP scrub is the source of
//     truth; this is belt-and-suspenders.
// No banner is required for this configuration under EU/UK GDPR &
// ePrivacy (no terminal storage, no persistent ID); a disclosure in
// the privacy policy is sufficient.
//
// Wiring: each Vite entry calls initAnalytics() once on load. If the
// env var isn't set (typical local dev), this no-ops silently.
export function initAnalytics() {
  const key = import.meta.env.VITE_POSTHOG_KEY;
  if (!key) return;
  const host = import.meta.env.VITE_POSTHOG_HOST ?? "https://us.i.posthog.com";
  posthog.init(key, {
    api_host: host,
    persistence: "memory",
    person_profiles: "never",
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: false,
    disable_session_recording: true,
    disable_surveys: true,
    ip: false,
  });
}

// Fire-and-forget capture that no-ops when posthog wasn't initialized
// (env key missing in local dev). Use for explicit CTAs we want to
// measure — autocapture is off by design, so anything not captured
// here doesn't show up in PostHog.
export function captureEvent(
  name: string,
  props?: Record<string, unknown>,
) {
  if (!posthog.__loaded) return;
  posthog.capture(name, props);
}
