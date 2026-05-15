import { useEffect } from "react";

// Mirrors the inline scroll-state script that's duplicated across every
// existing page: when scrollY > 4 the nav drops its expensive backdrop-filter
// (toggled via a `.scrolled` class). rAF-throttled so we don't thrash on
// scroll. Returns nothing — it just owns a side-effect.
//
// Also toggles body.scrolling for the duration of active scrolling so
// the aurora (and any other ambient animation) can pause during scroll,
// matching index-runtime.js. 150ms idle timer matches the legacy script.
// Safe to coexist on Index, where the legacy script also sets/removes
// the same class.
export function useScrollNav(selector = ".nav") {
  useEffect(() => {
    const nav = document.querySelector(selector);
    if (!nav) return;
    let last = false;
    let raf: number | null = null;
    let idleTimer: number | null = null;
    const body = document.body;
    const update = () => {
      const s = window.scrollY > 4;
      if (s !== last) {
        nav.classList.toggle("scrolled", s);
        last = s;
      }
      raf = null;
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(update);
      body.classList.add("scrolling");
      if (idleTimer != null) clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        body.classList.remove("scrolling");
        idleTimer = null;
      }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
      if (idleTimer != null) clearTimeout(idleTimer);
    };
  }, [selector]);
}
