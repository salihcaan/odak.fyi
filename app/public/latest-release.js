// Static-page counterpart of app/lib/latestRelease.ts (docs pages have
// no React): swaps the build-time {{APP_VERSION}}/{{DMG_SIZE}} values
// for the live GitHub release so the nav stays correct when a release
// ships without a site redeploy. Keep cache key/TTL in sync with the lib.
(function () {
  var API_URL =
    "https://api.github.com/repos/salihcaan/odak.fyi/releases/latest";
  var CACHE_KEY = "odak:latest-release";
  var CACHE_TTL_MS = 10 * 60 * 1000;

  function apply(release) {
    document.querySelectorAll(".nav-changelog").forEach(function (link) {
      link.href = "/changelog.html#v" + release.version.replace(/\./g, "-");
      link.setAttribute("aria-label", "What's new in v" + release.version);
      var tag = link.querySelector(".tag");
      if (tag) tag.textContent = "v" + release.version;
    });
    var sizeEl = document.querySelector(".nav .btn-primary span");
    if (sizeEl) sizeEl.textContent = release.size;
  }

  function readCache() {
    try {
      var raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var entry = JSON.parse(raw);
      if (Date.now() - entry.at > CACHE_TTL_MS) return null;
      if (!entry.release || !entry.release.version || !entry.release.size)
        return null;
      return entry.release;
    } catch (e) {
      return null;
    }
  }

  var cached = readCache();
  if (cached) {
    apply(cached);
    return;
  }

  fetch(API_URL, { headers: { Accept: "application/vnd.github+json" } })
    .then(function (res) {
      return res.ok ? res.json() : null;
    })
    .then(function (data) {
      if (!data) return;
      var version = String(data.tag_name || "").replace(/^v/, "");
      if (!/^\d+\.\d+/.test(version)) return;
      var dmg = (data.assets || []).find(function (a) {
        return a.name && a.name.endsWith(".dmg");
      });
      var release = {
        version: version,
        size:
          dmg && dmg.size
            ? Math.round(dmg.size / (1024 * 1024)) + " MB"
            : (document.querySelector(".nav .btn-primary span") || {})
                .textContent || "",
      };
      try {
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ at: Date.now(), release: release }),
        );
      } catch (e) {
        /* private mode — fine */
      }
      apply(release);
    })
    .catch(function () {
      /* offline / rate-limited — build-time values stay */
    });
})();
