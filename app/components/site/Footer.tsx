import { motion, useReducedMotion } from "motion/react";
import { Mark } from "./Logo";

// Footer columns stagger-in when the grid scrolls into view. Triggers
// once via viewport.once so it doesn't replay on scroll-back. Reduced-
// motion: a single fast fade with no transform.
export function Footer() {
  const reduced = useReducedMotion();
  const colVariants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0.22 }
        : { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  } as const;
  const gridVariants = {
    hidden: {},
    show: {
      transition: reduced ? { duration: 0 } : { staggerChildren: 0.07 },
    },
  } as const;

  return (
    <footer className="site-foot">
      <motion.div
        className="foot-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridVariants}
      >
        <motion.div className="foot-brand" variants={colVariants}>
          <a href="/" className="nav-brand" style={{ fontSize: 18 }}>
            <Mark size={28} loading="lazy" fetchPriority="auto" />
            <span>Odak</span>
          </a>
          <p className="mission">
            A keyboard-first project switcher for macOS. Made for developers
            who live in their editor.
          </p>
          <div style={{ marginTop: '16px' }}>
            <a href="https://x.com/odak_fyi" target="_blank" rel="noopener noreferrer" className="foot-social" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18, color: 'var(--dim)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--fg)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--dim)'}>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path>
              </svg>
            </a>
          </div>
        </motion.div>
        <motion.div className="foot-col" variants={colVariants}>
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
        </motion.div>
        <motion.div className="foot-col" variants={colVariants}>
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
        </motion.div>
        <motion.div className="foot-col" variants={colVariants}>
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
        </motion.div>
      </motion.div>
      <div className="foot-bottom">
        <div>© 2026 Odak</div>
        <div className="foot-status" aria-label="Build status">
          <span className="foot-status-dot" aria-hidden="true" />
          <span>v{__APP_VERSION__}</span>
          <span className="foot-status-sep">·</span>
          <span className="foot-status-sha">{__BUILD_SHA__}</span>
          <span className="foot-status-sep">·</span>
          <span>shipping</span>
        </div>
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
