import { Mark } from "./Logo";

export function Footer() {
  return (
    <footer className="site-foot">
      <div className="foot-grid">
        <div className="foot-brand">
          <a href="/" className="nav-brand" style={{ fontSize: 18 }}>
            <Mark size={28} loading="lazy" fetchPriority="auto" />
            <span>Odak</span>
          </a>
          <p className="mission">
            A keyboard-first project switcher for macOS. Made for developers
            who live in their editor.
          </p>
        </div>
        <div className="foot-col">
          <h4>Product</h4>
          <ul>
            <li>
              <a href="/#features">Features</a>
            </li>
            <li>
              <a href="/#pricing">Pricing</a>
            </li>
            <li>
              <a href="https://github.com/salihcaan/odak.fyi/releases/latest/download/Odak.dmg">
                Download
              </a>
            </li>
            <li>
              <a href="/changelog.html">Changelog</a>
            </li>
          </ul>
        </div>
        <div className="foot-col">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="https://github.com/salihcaan/odak.fyi">GitHub</a>
            </li>
            <li>
              <a href="/appcast.xml">Appcast</a>
            </li>
            <li>
              <a href="mailto:support@odak.fyi">Support</a>
            </li>
          </ul>
        </div>
        <div className="foot-col">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="mailto:hello@odak.fyi">Contact</a>
            </li>
            <li>
              <a href="/privacy.html">Privacy</a>
            </li>
            <li>
              <a href="/terms.html">Terms</a>
            </li>
            <li>
              <a href="/refund.html">Refund</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="foot-bottom">
        <div>© 2026 Odak</div>
        <div className="istanbul">
          Made in Istanbul ·{" "}
          <b>
            ⌥ Space
          </b>
        </div>
      </div>
    </footer>
  );
}
