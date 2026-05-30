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
          <a href="/" className="nav-brand">
            <Mark size={28} loading="lazy" fetchpriority="auto" />
            <span>Odak</span>
          </a>
          <p className="mission">
            A keyboard-first project switcher for macOS. Made for developers
            who live in their editor.
          </p>
          <div style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
            <a href="https://x.com/odak_fyi" target="_blank" rel="noopener noreferrer" className="foot-social" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18, color: 'var(--dim)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--fg)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--dim)'}>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path>
              </svg>
            </a>
            <a href="https://discord.gg/pzrVgj9dnV" target="_blank" rel="noopener noreferrer" className="foot-social" aria-label="Discord">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20, color: 'var(--dim)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--fg)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--dim)'}>
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
              </svg>
            </a>
            <a href="https://www.youtube.com/channel/UCF-BBJSCAwTjFhYN2wgH6rg" target="_blank" rel="noopener noreferrer" className="foot-social" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22, color: 'var(--dim)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--fg)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--dim)'}>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
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
              <a href="/blog.html">Blog</a>
            </li>
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
