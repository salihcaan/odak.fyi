import { useReducedMotion } from "motion/react";
import type { Transition, Variants } from "motion/react";

// Shared entrance choreography for static pages (Buy/Changelog/Privacy/
// Refund/Terms). Returns variants you spread onto motion components so
// each chrome block (Nav, main, Footer) fades + lifts in slightly behind
// the one above it. Honors prefers-reduced-motion: collapses to a fast
// fade with no transform (so we don't fight sticky/fixed positioning).
//
// We deliberately avoid a single <motion.div> wrapper: applying a
// transform to a parent of a position:sticky child creates a new
// containing block and breaks the sticky.
export function usePageEnter() {
  const reduced = useReducedMotion();

  const transition: Transition = reduced
    ? { duration: 0.22 }
    : {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      };

  const item = (delay = 0): Variants => ({
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { ...transition, delay: reduced ? 0 : delay },
    },
  });

  return { item, reduced };
}
