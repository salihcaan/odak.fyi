import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Aurora } from "@/components/site/Aurora";
import { Footer } from "@/components/site/Footer";
import { MacbookCarousel } from "@/components/site/MacbookCarousel";
import { Nav } from "@/components/site/Nav";
import { SvgSprite } from "@/components/site/SvgSprite";
import indexBody from "../legacy/index-body.html?raw";

// Index = home. Hero text on top, MacbookCarousel (compact tabbed card)
// below it, then the legacy HTML body for positioning/pricing/faq. Legacy
// HTML carries stable DOM ids the inline-JS demos in
// legacy/index-runtime.js target — the runtime script is appended after
// first paint via useEffect so React's commit beats it to the DOM.

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

  const enter = (delay: number) => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 },
      };
    }
    return {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    };
  };

  return (
    <>
      <SvgSprite />
      <Aurora />
      <div className="grid-bg" />

      <Nav showBuy hashHrefs />

      <div className="hero-stage-combined">
      <div className="stage-grid" aria-hidden="true" />
      <section className="hero" id="hero" style={{ position: "relative" }}>
        <div className="hero-text">
          <motion.h1 className="hero-h mt-8 sm:mt-12" {...enter(0)}>
            Any project<br /><span className="accent">Two keys.</span>
          </motion.h1>

          <motion.p className="hero-sub" {...enter(0.18)}>
            Press ⌥ Space, type three letters, hit ↵. Odak brings the right
            window into focus — even across ten Cursor windows.
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
          
          <motion.div 
            className="mt-16 sm:mt-24 pb-12 flex justify-center text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
            </motion.div>
          </motion.div>
        </div>
      </section>
      </div>

      <MacbookCarousel />

      <div dangerouslySetInnerHTML={{ __html: indexBody }} />

      <Footer />
    </>
  );
}
