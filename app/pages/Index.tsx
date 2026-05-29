import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Aurora } from "@/components/site/Aurora";
import { Footer } from "@/components/site/Footer";
import { IdeMarquee } from "@/components/site/IdeMarquee";
import { MacbookCarousel } from "@/components/site/MacbookCarousel";
import { Nav } from "@/components/site/Nav";
import { SvgSprite } from "@/components/site/SvgSprite";
import { captureEvent } from "@/lib/analytics";
import indexBody from "../legacy/index-body.html?raw";

// Index = home. Hero text on top, MacbookCarousel (compact tabbed card)
// below it, then the legacy HTML body for comparison/pricing/faq. Legacy
// HTML carries stable DOM ids the inline-JS demos in
// legacy/index-runtime.js target — the runtime script is appended after
// first paint via useEffect so React's commit beats it to the DOM.

export function Index() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/legacy/index-runtime.js";
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  // Scroll-linked motion: the hero text drifts up and softens as the reader
  // scrolls toward the MacBook demo below. Natural parallax tied to scroll —
  // no scroll-jacking, no arrow-key hijack (Design Principle 1). The cue
  // chevron fades out the moment scrolling begins so it stops looping forever.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  // prefers-reduced-motion: hold the drift still (Design Principle, a11y).
  const stillY = useTransform(scrollYProgress, () => 0);

  // Cinematic entrance. A blur-in reveal (the signature cap.so / Bridgemind
  // feel) layered on the existing y-rise, on the codebase's smooth ease.
  // Reduced motion collapses to a plain, fast fade.
  const enter = (delay: number) => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 },
      };
    }
    return {
      initial: { opacity: 0, y: 16, filter: "blur(10px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      transition: {
        duration: 0.72,
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
      <section className="hero" id="hero" style={{ position: "relative" }} ref={heroRef}>
        <motion.div
          className="hero-text"
          style={{ y: prefersReducedMotion ? stillY : textY }}
        >
          <motion.div className="mt-2 sm:mt-4" {...enter(0)}>
            <span className="hero-eyebrow">Project launcher for developers</span>
          </motion.div>

          <h1 className="hero-h">
            <motion.span className="hero-line" {...enter(0.1)}>
              Jump to any project
            </motion.span>
            <motion.span className="hero-line accent" {...enter(0.2)}>
              in two keystrokes.
            </motion.span>
          </h1>

          <motion.p className="hero-sub" {...enter(0.3)}>
            Open or switch to any project from your keyboard. Hit ⌥ Space,
            type a few letters, press ↵ — Odak launches it or focuses
            the window if it's already open.
          </motion.p>

          <motion.div className="hero-cta" {...enter(0.4)}>
            <a
              href="https://github.com/salihcaan/odak.fyi/releases/latest/download/Odak.dmg"
              className="btn-primary"
              onClick={() =>
                captureEvent("download_clicked", {
                  source: "hero",
                  version: __APP_VERSION__,
                })
              }
            >
              Try free for 14 days <span className="k">⌘ + D</span>
            </a>
            <a
              href="https://discord.gg/pzrVgj9dnV"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              onClick={() =>
                captureEvent("discord_clicked", { source: "hero" })
              }
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join the Discord
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

          <motion.div className="hero-fine" {...enter(0.5)}>
            <span>14-day trial · no card</span>
            <span className="dot"></span>
            <span>macOS 26+ · Apple Silicon</span>
          </motion.div>

          <motion.div
            className="mt-10 sm:mt-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <IdeMarquee />
          </motion.div>

          {/* Wrapper owns the scroll-driven fade-out; the inner link keeps its
              one-time entrance fade-in. Kept on separate elements so the two
              opacities compose instead of fighting over the same property. */}
          <motion.div style={{ opacity: prefersReducedMotion ? undefined : cueOpacity }}>
            <motion.a
              href="#features"
              className="mt-2 sm:mt-4 pb-4 flex justify-center text-white/40 hover:text-white/80 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <motion.div
                animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
      </div>

      <MacbookCarousel />

      <div className="rest-of-page">
        <div dangerouslySetInnerHTML={{ __html: indexBody }} />

        <Footer />
      </div>
    </>
  );
}
