import { useScrollNav } from "@/hooks/useScrollNav";
import { Mark } from "./Logo";

// Full-site nav with the page links menu. Used by index, changelog,
// privacy, refund, terms.
export function Nav({
  currentPath = "",
  showBuy = false,
  hashHrefs = false,
}: {
  currentPath?: string;
  showBuy?: boolean;
  hashHrefs?: boolean;
}) {
  useScrollNav();
  // Index page uses bare hash anchors (#features) since the targets live on
  // the same page. Other pages route back to / and then the hash.
  const prefix = hashHrefs ? "" : "/";
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href={hashHrefs ? "#" : "/"} className="nav-brand">
          <Mark />
          <span>Odak</span>
        </a>
        <div className="nav-links">
          <a href={`${prefix}#features`}>Features</a>
          <a href={`${prefix}#positioning`}>Positioning</a>
          <a href={`${prefix}#pricing`}>Pricing</a>
          {showBuy && (
            <a
              href="/buy"
              style={{ color: "var(--accent)", fontWeight: 600 }}
            >
              Buy
            </a>
          )}
          <a href={`${prefix}#faq`}>FAQ</a>
          <a href="/docs/actions.html">Docs</a>
          <a
            href="/changelog.html"
            style={{ opacity: currentPath === "/changelog.html" ? 1 : 0.7 }}
          >
            Changelog
          </a>
        </div>
        <div className="nav-cta">
          <a
            href="https://github.com/salihcaan/odak.fyi/releases/latest/download/Odak.dmg"
            className="btn-primary"
          >
            Download{" "}
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                opacity: 0.65,
                fontWeight: 500,
              }}
            >
              26 MB
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}

// Stripped-down nav for /buy and /buy-stage — drops the page links menu and
// swaps the Download CTA for a ← Back to odak.fyi link. Distinct CSS class
// for `.nav-back` lives in styles/buy.css.
export function NavBuy() {
  useScrollNav();
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="/" className="nav-brand">
          <Mark />
          <span>Odak</span>
        </a>
        <div className="nav-cta">
          <a href="/" className="nav-back">
            ← Back to odak.fyi
          </a>
        </div>
      </div>
    </nav>
  );
}
