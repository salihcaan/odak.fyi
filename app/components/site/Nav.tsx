import { useScrollNav } from "@/hooks/useScrollNav";
import { captureEvent } from "@/lib/analytics";
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
          <Mark size={28} />
          <span>Odak</span>
        </a>
        <div className="nav-links">
          <a href={`${prefix}#features`}>Features</a>
          <a href={`${prefix}#comparison`}>Comparison</a>
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
          <a href="/actions">Actions</a>
          <a href="/docs/actions.html">Docs</a>
          <a
            href={`/changelog.html#v${__APP_VERSION__.replace(/\./g, "-")}`}
            className="nav-changelog"
            aria-label={`What's new in v${__APP_VERSION__}`}
          >
            <span className="tag">v{__APP_VERSION__}</span>
            <span className="label">What's new</span>
            <span className="arrow" aria-hidden="true">
              <svg viewBox="0 0 12 12">
                <path d="M3 6h6m-3-3l3 3-3 3" />
              </svg>
            </span>
          </a>
        </div>
        <div className="nav-cta">
          {/* Mobile-only "Buy" link. The nav-links menu (which carries the
              desktop "Buy" link) is hidden under 760px, so without this the
              bar had no path to checkout on a phone. Same plain accent
              treatment as the desktop link — not a second button. Hidden on
              /buy (redundant there). */}
          {!currentPath.startsWith("/buy") && (
            <a
              href="/buy"
              className="nav-buy"
              onClick={() =>
                captureEvent("buy_clicked", { source: "nav_mobile" })
              }
            >
              Buy
            </a>
          )}
          <a
            href="https://github.com/salihcaan/odak.fyi/releases/latest/download/Odak.dmg"
            className="btn-primary"
            onClick={() =>
              captureEvent("download_clicked", {
                source: "nav",
                version: __APP_VERSION__,
              })
            }
          >
            <svg
              viewBox="0 0 14 17"
              aria-hidden="true"
              style={{
                width: 12,
                height: 14,
                fill: "currentColor",
                marginTop: -2,
              }}
            >
              <path
                fill="currentColor"
                d="M11.182 8.91c-.018-2.022 1.65-2.992 1.725-3.038-.94-1.376-2.404-1.564-2.925-1.586-1.247-.126-2.434.733-3.067.733-.633 0-1.61-.715-2.65-.696-1.363.02-2.62.793-3.32 2.013-1.416 2.456-.363 6.094 1.018 8.087.674.974 1.477 2.073 2.53 2.034 1.014-.04 1.397-.658 2.624-.658 1.226 0 1.572.658 2.65.638 1.094-.02 1.787-.997 2.456-1.974.774-1.13 1.093-2.224 1.112-2.28-.024-.012-2.135-.82-2.153-3.273zM9.176 2.985C9.737 2.31 10.114 1.371 10.011.434c-.806.033-1.78.537-2.36 1.21-.52.598-.974 1.553-.851 2.473.898.07 1.815-.456 2.376-1.132z"
              />
            </svg>
            Download{" "}
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                opacity: 0.65,
                fontWeight: 500,
              }}
            >
              {__DMG_SIZE__}
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
          <Mark size={20} />
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
