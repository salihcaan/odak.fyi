import { useEffect } from "react";

// Mirrors the inline scroll-state script that's duplicated across every
// existing page: when scrollY > 4 the nav drops its expensive backdrop-filter
// (toggled via a `.scrolled` class). rAF-throttled so we don't thrash on
// scroll. Returns nothing — it just owns a side-effect.
export function useScrollNav(selector = ".nav") {
  useEffect(() => {
    const nav = document.querySelector(selector);
    if (!nav) return;
    let last = false;
    let raf: number | null = null;
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
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [selector]);
}
