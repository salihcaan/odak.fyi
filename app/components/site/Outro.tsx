import { motion, useReducedMotion } from "motion/react";
import { captureEvent } from "@/lib/analytics";
import { useLatestRelease } from "@/hooks/useLatestRelease";

// Closing CTA — the page's final beat after the FAQ. One last display
// line and the same two paths the hero offers (download / buy), so a
// reader who scrolled the whole page never has to scroll back up.
export function Outro() {
  const prefersReducedMotion = useReducedMotion();
  const { version } = useLatestRelease();

  const reveal = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.2 },
        viewport: { once: true, amount: 0.4 },
      }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        transition: {
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
        viewport: { once: true, amount: 0.4 },
      };

  return (
    <section className="block outro" id="download">
      <div className="outro-bloom" aria-hidden="true" />
      <motion.div className="outro-inner" {...reveal}>
        <h2 className="outro-h">
          Your next project is
          <br />
          <span className="accent">two keystrokes away.</span>
        </h2>
        <p className="outro-sub">
          Free for 14 days, then $19 once. No account, no subscription.
        </p>
        <div className="outro-cta">
          <a
            href="https://github.com/salihcaan/odak.fyi/releases/latest/download/Odak.dmg"
            className="btn-primary"
            onClick={() =>
              captureEvent("download_clicked", { source: "outro", version })
            }
          >
            Download Odak
          </a>
          <a href="/buy" className="btn-link">
            Buy now · $19
            <span className="arrow" aria-hidden="true">
              <svg viewBox="0 0 12 12">
                <path d="M3 6h6m-3-3l3 3-3 3" />
              </svg>
            </span>
          </a>
        </div>
        <p className="outro-fine">
          14-day trial · no card · macOS 15+ · Apple Silicon
        </p>
      </motion.div>
    </section>
  );
}
