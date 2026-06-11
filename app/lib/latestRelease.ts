// The site's version surfaces (nav "What's new" tag, Download size
// badge, footer status) used to come only from appcast.xml at build
// time, so they went stale whenever a release shipped on GitHub
// without a site redeploy. GitHub Releases is the source of truth at
// runtime; the build-time values render first so nothing flashes
// empty, then swap once the API answers. Failures keep the fallback.
export type LatestRelease = { version: string; size: string };

const API_URL =
  "https://api.github.com/repos/salihcaan/odak.fyi/releases/latest";
const CACHE_KEY = "odak:latest-release";
const CACHE_TTL_MS = 10 * 60 * 1000;

export const buildRelease: LatestRelease = {
  version: __APP_VERSION__,
  size: __DMG_SIZE__,
};

function readCache(): LatestRelease | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, release } = JSON.parse(raw) as {
      at: number;
      release: LatestRelease;
    };
    if (Date.now() - at > CACHE_TTL_MS) return null;
    if (!release?.version || !release?.size) return null;
    return release;
  } catch {
    return null;
  }
}

function writeCache(release: LatestRelease) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ at: Date.now(), release }),
    );
  } catch {
    // Private mode / storage full — refetching next page load is fine.
  }
}

export async function fetchLatestRelease(): Promise<LatestRelease | null> {
  const cached = readCache();
  if (cached) return cached;
  try {
    const res = await fetch(API_URL, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      tag_name?: string;
      assets?: { name?: string; size?: number }[];
    };
    const version = (data.tag_name ?? "").replace(/^v/, "");
    if (!/^\d+\.\d+/.test(version)) return null;
    const dmg = data.assets?.find((a) => a.name?.endsWith(".dmg"));
    const size = dmg?.size
      ? `${Math.round(dmg.size / (1024 * 1024))} MB`
      : buildRelease.size;
    const release = { version, size };
    writeCache(release);
    return release;
  } catch {
    return null;
  }
}
