import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Aurora } from "@/components/site/Aurora";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { SvgSprite } from "@/components/site/SvgSprite";
import { BackgroundPathsLayer } from "@/components/ui/background-paths";
import indexBody from "../legacy/index-body.html?raw";

// Index = home. Renders chrome (sprite, aurora, nav, hero, footer) as React;
// hero gets motion + BackgroundPaths layered behind. Everything below the
// hero (mb-stage through faq, ~1290 lines) is injected as the original HTML
// verbatim — too much markup for a faithful JSX translation in one pass, and
// the inline-JS demo loops in legacy/index-runtime.js target stable DOM IDs
// in that exact markup. The runtime script is loaded after first paint via
// useEffect so React's commit beats it to the DOM.

export function Index() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/legacy/index-runtime.js";
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  const enter = (delay: number) =>
    prefersReducedMotion
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.2 },
        }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            delay,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        };

  return (
    <>
      <SvgSprite />
      <Aurora />
      <div className="grid-bg" />

      <Nav showBuy hashHrefs />

      <section
        className="hero"
        id="hero"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <BackgroundPathsLayer />
        <div
          className="hero-text"
          style={{ position: "relative", zIndex: 10 }}
        >
          <motion.a
            className="hero-bar"
            href="/changelog.html#v0-1-4"
            {...enter(0)}
          >
            <span className="tag">v0.1.4</span>
            <span>Same-name projects, everywhere</span>
            <span className="sep">·</span>
            <span>Read the changelog</span>
            <span className="arrow" aria-hidden="true">
              <svg viewBox="0 0 12 12">
                <path d="M3 6h6m-3-3l3 3-3 3" />
              </svg>
            </span>
          </motion.a>

          <motion.h1 className="hero-h" {...enter(0.09)}>
            Any project. <span className="accent">Two keys.</span>
          </motion.h1>

          <motion.p className="hero-sub" {...enter(0.18)}>
            Press ⌥ Space (that's Option + Space), type three letters, hit ↵.
            Odak brings the right window into focus — even when ten Cursor
            windows share one icon.
          </motion.p>

          <motion.div className="hero-cta" {...enter(0.27)}>
            <a
              href="https://github.com/salihcaan/odak.fyi/releases/latest/download/Odak.dmg"
              className="btn-primary"
            >
              Try free for 14 days <span className="k">⌘ + D</span>
            </a>
            <button
              className="btn-link down"
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See how it works
              <span className="arrow" aria-hidden="true">
                <svg viewBox="0 0 12 12">
                  <path d="M6 3v6m-3-3l3 3 3-3" />
                </svg>
              </span>
            </button>
          </motion.div>

          <motion.div className="hero-fine" {...enter(0.36)}>
            <span>14-day trial · no card</span>
            <span className="dot"></span>
            <span>macOS 26+ · Apple Silicon</span>
          </motion.div>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{ __html: indexBody }} />

      <Footer />
    </>
  );
}
