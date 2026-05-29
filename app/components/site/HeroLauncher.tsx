// A still glimpse of the real launcher in the hero fold: an actual
// screenshot (launcher-hero.jpg) framed as a floating window with a subtle
// 3D tilt that straightens on hover. The carousel below carries the full
// motion demo. Pure CSS tilt + reduced-motion handling — no JS needed.
// width/height on the img + aspect-ratio on the frame reserve the box so
// the fold never shifts as the image decodes (CLS guard).
export function HeroLauncher() {
  return (
    <div className="hero-launcher">
      <div className="hero-launcher-glow" aria-hidden="true" />
      <div className="hero-launcher-frame">
        <img
          className="hero-launcher-img"
          src="/assets/launcher-hero.jpg"
          width={1200}
          height={1136}
          decoding="async"
          alt="The Odak launcher: type a few letters to filter every project, with the matched repo highlighted and editor icons to open it."
        />
      </div>
    </div>
  );
}
