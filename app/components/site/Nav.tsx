import { useScrollNav } from "@/hooks/useScrollNav";
import { useTheme } from "@/hooks/useTheme";
import { Mark } from "./Logo";

const SUN_PATH = (
  <>
    <path d="M8 2v1m0 10v1m6-6h-1M3 8H2m10.2-4.2l-.7.7M4.5 11.5l-.7.7m8.4 0l-.7-.7M4.5 4.5l-.7-.7" />
    <circle cx="8" cy="8" r="3" />
  </>
);
const MOON_PATH = (
  <path d="M13 9.5a5 5 0 1 1-6.5-6.5 5 5 0 0 0 6.5 6.5z" />
);

function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className="icon-btn"
      id="theme-toggle"
      title="Toggle theme"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      <svg viewBox="0 0 16 16" id="theme-icon">
        {theme === "dark" ? MOON_PATH : SUN_PATH}
      </svg>
    </button>
  );
}

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
          <ThemeButton />
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
          <ThemeButton />
          <a href="/" className="nav-back">
            ← Back to odak.fyi
          </a>
        </div>
      </div>
    </nav>
  );
}
