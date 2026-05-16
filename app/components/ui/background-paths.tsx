"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";

// Warm palette adaptation of the upstream BackgroundPaths.
//
// The upstream version uses slate-950 strokes which clash with Odak's
// warm dark/light surfaces. We drive stroke color via currentColor so
// the SVG inherits a warm cream in dark mode and a warm taupe in light
// mode — both stay below the H1's contrast threshold so the paths read
// as ambient haze rather than scaffolding.
//
// prefers-reduced-motion: paths render as a static still frame and the
// letter stagger collapses to a single fade. We keep the visual layer
// because removing it entirely shifts the layout; we just stop motion.

export function FloatingPaths({
  position,
  fill = false,
}: {
  position: number;
  // When true, the SVG uses preserveAspectRatio="xMidYMid slice" so the
  // curves fill the entire container even on portrait viewports — the
  // sweep gets cropped left/right instead of letterboxed top/bottom.
  // Used by the fixed-variant ambient layer so the paths cover the full
  // viewport regardless of aspect ratio.
  fill?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-[#4a3828] dark:text-[#f5ede0]"
        viewBox="0 0 696 316"
        preserveAspectRatio={fill ? "xMidYMid slice" : "xMidYMid meet"}
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.018}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={
              prefersReducedMotion
                ? { pathLength: 1, opacity: 0.45 }
                : {
                    pathLength: 1,
                    opacity: [0.3, 0.6, 0.3],
                    pathOffset: [0, 1, 0],
                  }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: 24 + Math.random() * 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }
            }
          />
        ))}
      </svg>
    </div>
  );
}

// Decoration-only layer. Two variants:
//   "absolute" (default) — scoped to a position:relative parent, used to
//     sit the paths behind a specific section (e.g. the original hero).
//   "fixed"    — viewport-pinned, sits at z-index:-1 alongside the aurora
//     and grid-bg so the curves bleed seamlessly through every section of
//     the page (hero → macbook stage → features → pricing → faq) instead
//     of getting clipped at the hero's overflow:hidden edge. Same z as
//     aurora; rendered later in the DOM so the crisp paths paint on top
//     of the warm radial blur.
export function BackgroundPathsLayer({
  className,
  variant = "absolute",
}: {
  className?: string;
  variant?: "absolute" | "fixed";
}) {
  if (variant === "fixed") {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none overflow-hidden ${className ?? ""}`}
        style={{ position: "fixed", inset: 0, zIndex: -1 }}
      >
        <FloatingPaths position={1} fill />
        <FloatingPaths position={-1} fill />
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}

export function BackgroundPaths({
  title = "Any project. Two keys.",
  ctaLabel = "Try free for 14 days",
  ctaHref = "https://github.com/salihcaan/odak.fyi/releases/latest/download/Odak.dmg",
  className,
}: {
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const words = title.split(" ");

  return (
    <div
      className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f7f4ef] dark:bg-[#0a0908] ${className ?? ""}`}
    >
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.2 }}
          className="mx-auto max-w-4xl"
        >
          <h1 className="mb-8 font-sans text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
            {words.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="mr-4 inline-block last:mr-0"
              >
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={
                      prefersReducedMotion
                        ? { y: 0, opacity: 0 }
                        : { y: 80, opacity: 0 }
                    }
                    animate={{ y: 0, opacity: 1 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.3, delay: 0 }
                        : {
                            delay:
                              wordIndex * 0.08 + letterIndex * 0.025,
                            type: "spring",
                            stiffness: 160,
                            damping: 22,
                          }
                    }
                    className="inline-block bg-gradient-to-r from-[#3a2a1a] to-[#5a4a3a] bg-clip-text text-transparent dark:from-[#f5ede0] dark:to-[#c9b89a]"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <div className="group relative inline-block overflow-hidden rounded-2xl bg-gradient-to-b from-[#d4a86a]/30 to-[#3a2a1a]/10 p-px shadow-lg backdrop-blur-lg transition-shadow duration-300 hover:shadow-xl dark:from-[oklch(78%_0.14_75)]/40 dark:to-[#0a0908]/40">
            <Button
              asChild
              variant="ghost"
              className="rounded-[1.15rem] border border-[#d4a86a]/30 bg-[#fffaf0]/95 px-8 py-6 text-base font-semibold text-[#1a1410] backdrop-blur-md transition-all duration-300 hover:bg-[#fffaf0] group-hover:-translate-y-0.5 hover:shadow-md dark:border-[oklch(78%_0.14_75)]/30 dark:bg-[#1b1816]/95 dark:text-[#f5ede0] dark:hover:bg-[#1b1816]"
            >
              <a href={ctaHref}>
                <span className="opacity-90 transition-opacity group-hover:opacity-100">
                  {ctaLabel}
                </span>
                <span className="ml-3 opacity-70 transition-all duration-300 group-hover:translate-x-1.5 group-hover:opacity-100">
                  →
                </span>
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
