import { useReducedMotion } from "motion/react";

// A glimpse of the real launcher in the hero fold, framed as a floating
// window with a subtle 3D tilt that straightens on hover. By default it plays
// a short, muted, looping screen capture (hero.mp4) so "two keystrokes" is
// provable at first glance; the carousel below carries the full demo.
//
// The still screenshot (launcher-hero.jpg) is the <video> poster, so the fold
// paints instantly and never shifts as the clip buffers (CLS guard). When the
// reader prefers reduced motion we drop the video entirely and render the
// still image — no autoplay, no loop (a11y: reduced-motion).
export function HeroLauncher() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="hero-launcher">
      <div className="hero-launcher-glow" aria-hidden="true" />
      <div className="hero-launcher-frame">
        {prefersReducedMotion ? (
          <img
            className="hero-launcher-img"
            src="/assets/launcher-hero.jpg"
            width={1200}
            height={1136}
            decoding="async"
            alt="The Odak launcher: type a few letters to filter every project, with the matched repo highlighted and editor icons to open it."
          />
        ) : (
          <video
            className="hero-launcher-img"
            src="/videos/hero.mp4"
            poster="/assets/launcher-hero.jpg"
            width={1200}
            height={1136}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="The Odak launcher in motion: hit Option-Space, type a few letters, and the matched project is launched or focused."
          />
        )}
      </div>
    </div>
  );
}
