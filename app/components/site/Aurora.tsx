// Ambient backdrop — grid, soft orbs, vignette, grain. Styled by the
// .ambient classes in styles/base.css (plain CSS, not Tailwind) so the
// same atmosphere renders on every entry, including the ones that don't
// load Tailwind.
export function Aurora() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-grid"></div>
      <div className="ambient-grid ambient-grid--fine"></div>

      {/* Central soft white orb */}
      <div className="ambient-orb ambient-orb--white"></div>

      {/* Warm accent orb (Bridgemind style) */}
      <div className="ambient-orb ambient-orb--warm"></div>

      {/* Vignette */}
      <div className="ambient-vignette"></div>

      {/* Floating particles */}
      <div className="ambient-dot" style={{ left: "12%", top: "28%", background: "rgba(255,255,255,.2)" }}></div>
      <div className="ambient-dot" style={{ right: "14%", top: "36%", background: "rgba(255,255,255,.15)", animationDelay: "1.2s" }}></div>
      <div className="ambient-dot" style={{ left: "18%", bottom: "24%", width: 3, height: 3, background: "rgba(218,84,39,.4)", animation: "none" }}></div>
      <div className="ambient-dot" style={{ right: "20%", bottom: "30%", background: "rgba(255,255,255,.2)", animationDelay: "0.6s" }}></div>

      {/* Noise overlay */}
      <div className="ambient-noise"></div>
    </div>
  );
}
