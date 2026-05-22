import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MacbookFrame, MacbookNotchOverlay } from "./MacbookFrame";

/** A caption beat: shows `text` once `currentTime` of the parent clip
 *  crosses `at` (seconds). Latest matching beat wins. */
type Caption = { at: number; text: string };

type Clip = {
  src: string;
  captions: Caption[];
};

type Feature = {
  id: string;
  eyebrow: string;
  key: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  /** One clip for a single demo; two for a sequential pair (§1). */
  clips: [Clip] | [Clip, Clip];
};

const FEATURES: Feature[] = [
  {
    id: "search",
    eyebrow: "Search",
    key: "⌥ Space",
    title: (
      <>
        Three letters in. <span className="accent">Window in focus.</span>
      </>
    ),
    lead: "⌥ Space, three letters, ↵ — right window, in front.",
    clips: [
      {
        src: "/videos/1-windows.mp4",
        captions: [
          { at: 2.5, text: "Wait, how many do I have open?" },
          { at: 6.5, text: "Which one is the project you want?" },
        ],
      },
      {
        src: "/videos/1-search.mp4",
        captions: [
          { at: 1.0, text: "⌥ Space." },
          { at: 3.5, text: "Find any project." },
          { at: 7.0, text: "Open it — in any editor." },
          { at: 11.5, text: "Same shortcut, every project." },
          { at: 16.5, text: "From anywhere." },
        ],
      },
    ],
  },
  {
    id: "switch",
    eyebrow: "Switch",
    key: "⌥ Tab",
    title: (
      <>
        ⌘ Tab for apps. <span className="accent">⌥ Tab for windows.</span>
      </>
    ),
    lead: "Every editor window, grouped by project, most-recent first.",
    clips: [
      {
        src: "/videos/2-option-tab.mp4",
        captions: [
          { at: 1.5, text: "⌥ Tab — every window you have open." },
          { at: 6.0, text: "Across every editor." },
          { at: 11.0, text: "Same project, different IDE? Listed separately." },
          { at: 18.0, text: "Pick. Press. Done." },
        ],
      },
    ],
  },
  {
    id: "actions",
    eyebrow: "Actions",
    key: "⌘ K",
    title: (
      <>
        One actions library, <span className="accent">every project.</span>
      </>
    ),
    lead: "Define shortcuts once. The right action fires per project.",
    clips: [
      {
        src: "/videos/3-actions.mp4",
        captions: [
          { at: 1.0, text: "Find your project." },
          { at: 5.0, text: "Pick an action for it." },
          { at: 8.0, text: "Open the repo on GitHub." },
          { at: 13.5, text: "Same project, different action." },
          { at: 18.0, text: "Reveal it in Finder." },
        ],
      },
    ],
  },
  {
    id: "notch",
    eyebrow: "Notch",
    key: "Always",
    title: (
      <>
        The notch, <span className="accent">finally useful.</span>
      </>
    ),
    lead: "The active project lives in the notch. Always visible.",
    clips: [
      {
        src: "/videos/4-notch.mp4",
        captions: [
          { at: 1.5, text: "Click the notch." },
          { at: 4.5, text: "Every project window, one menu." },
          { at: 9.5, text: "Pick — and you're there." },
          { at: 15.5, text: "Same project, another IDE." },
          { at: 19.5, text: "From any app, always one click away." },
        ],
      },
    ],
  },
];

export function MacbookCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const tabRefs = useRef<HTMLButtonElement[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [inView, setInView] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [captionText, setCaptionText] = useState<string>("");
  const prefersReducedMotion = useReducedMotion();

  const clipSlots: Array<{ featureIdx: number; clipIdx: number; clip: Clip }> = [];
  FEATURES.forEach((f, fi) => {
    f.clips.forEach((clip, ci) => clipSlots.push({ featureIdx: fi, clipIdx: ci, clip }));
  });
  const activeSlot = clipSlots.findIndex(
    (s) => s.featureIdx === activeIdx && s.clipIdx === subIdx
  );

  // Desktop + non-reduced-motion gets the scroll-driven scrub treatment;
  // everything else keeps the old IntersectionObserver + auto-advance.
  // Mirrors the .mc-pin-wrap media query (sticky pin is desktop-only).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 721px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const scrubMode = isDesktop && !prefersReducedMotion;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fallback playback path (mobile + reduced motion): auto-play the
  // active clip while the section is in view; advance on `ended`.
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (scrubMode) return;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeSlot && inView) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [activeSlot, inView, prefersReducedMotion, scrubMode]);

  // Desktop scroll-scrub: map scroll position within the pin track to
  // a (slotIdx, withinSlotProgress) pair, then set the active video's
  // currentTime directly. Videos stay paused — they're scrubbed
  // frame-by-frame as the user scrolls. Tab fill and captions key off
  // currentTime via the existing timeupdate listener so they ride
  // along automatically.
  useEffect(() => {
    if (!scrubMode) return;
    if (typeof window === "undefined") return;

    let raf = 0;
    let lastSlot = -1;

    const update = () => {
      raf = 0;
      const track = pinRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const usable = Math.max(1, track.offsetHeight - vh);
      const scrolled = Math.max(0, Math.min(usable, -rect.top));
      const progress = scrolled / usable;
      const n = clipSlots.length;
      const sp = progress * n;
      const slotIdx = Math.max(0, Math.min(n - 1, Math.floor(sp)));
      const within = Math.max(0, Math.min(1, sp - slotIdx));

      if (slotIdx !== lastSlot) {
        lastSlot = slotIdx;
        const slot = clipSlots[slotIdx];
        setActiveIdx(slot.featureIdx);
        setSubIdx(slot.clipIdx);
        videoRefs.current.forEach((v, i) => {
          if (!v) return;
          if (i !== slotIdx) v.pause();
        });
      }

      const v = videoRefs.current[slotIdx];
      if (v && Number.isFinite(v.duration) && v.duration > 0) {
        if (!v.paused) v.pause();
        const target = within * v.duration;
        if (Math.abs(v.currentTime - target) > 0.04) {
          try {
            v.currentTime = target;
          } catch {
            /* ignore — happens briefly before metadata loads */
          }
        }
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
    // clipSlots is rebuilt on every render but holds the same shape;
    // depending on scrubMode is sufficient to (de)activate this loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrubMode]);

  function handleEnded() {
    if (scrubMode) return;
    const cur = FEATURES[activeIdx];
    if (cur.clips.length === 2 && subIdx === 0) {
      setSubIdx(1);
      return;
    }
    setActiveIdx((activeIdx + 1) % FEATURES.length);
    setSubIdx(0);
  }

  function jumpTo(idx: number) {
    setActiveIdx(idx);
    setSubIdx(0);
    if (!scrubMode) return;
    const track = pinRef.current;
    if (!track) return;
    const targetSlot = clipSlots.findIndex(
      (s) => s.featureIdx === idx && s.clipIdx === 0
    );
    if (targetSlot < 0) return;
    const vh = window.innerHeight;
    const usable = Math.max(1, track.offsetHeight - vh);
    const trackTop = window.scrollY + track.getBoundingClientRect().top;
    // aim for ~5% into the slot so the stage settles before scrubbing
    const slotProgress = (targetSlot + 0.05) / clipSlots.length;
    const targetY = trackTop + slotProgress * usable;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }

  useEffect(() => {
    const v = videoRefs.current[activeSlot];
    const tab = tabRefs.current[activeIdx];
    if (!v) return;
    const fill = tab?.querySelector<HTMLElement>(".mc-tab-fill") ?? null;
    const cur = FEATURES[activeIdx];
    const captions = cur.clips[subIdx]?.captions ?? [];

    const onTime = () => {
      if (fill && !prefersReducedMotion) {
        let total = 0;
        let elapsed = 0;
        cur.clips.forEach((_, ci) => {
          const idx = clipSlots.findIndex(
            (s) => s.featureIdx === activeIdx && s.clipIdx === ci
          );
          const node = videoRefs.current[idx];
          const d = node?.duration || 0;
          total += d;
          if (ci < subIdx) elapsed += d;
          else if (ci === subIdx) elapsed += node?.currentTime || 0;
        });
        const pct = total > 0 ? Math.min(100, (elapsed / total) * 100) : 0;
        fill.style.width = `${pct}%`;
      }

      const t = v.currentTime;
      let next = "";
      for (const cap of captions) {
        if (cap.at <= t) next = cap.text;
        else break;
      }
      setCaptionText((prev) => (prev === next ? prev : next));
    };

    setCaptionText("");
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, [activeIdx, subIdx, activeSlot, prefersReducedMotion]);

  useEffect(() => {
    tabRefs.current.forEach((tab, i) => {
      if (!tab) return;
      const fill = tab.querySelector<HTMLElement>(".mc-tab-fill");
      if (!fill) return;
      if (i !== activeIdx) fill.style.width = "0%";
    });
  }, [activeIdx]);

  const active = FEATURES[activeIdx];

  return (
    <div
      className="mc-pin-wrap"
      ref={pinRef}
      data-scrub={scrubMode ? "on" : "off"}
    >
    <section
      ref={sectionRef}
      className="mc-section"
      id="features"
      data-active={active.id}
    >
      <div className="mc-tabs" role="tablist" aria-label="Features">
        <div className="mc-tabs-pill">
          {FEATURES.map((f, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={f.id}
                ref={(el) => {
                  if (el) tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`mc-tab ${isActive ? "is-active" : ""}`}
                onClick={() => jumpTo(i)}
              >
                {isActive && (
                  <motion.span
                    layoutId="mc-tab-active-bg"
                    className="mc-tab-active-bg"
                    aria-hidden="true"
                    transition={{
                      type: "tween",
                      duration: 0.85,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                )}
                <span className="mc-tab-content">
                  <span className="mc-tab-label">{f.eyebrow}</span>
                  <span
                    className="mc-tab-key"
                    aria-hidden={!isActive}
                  >
                    {f.key}
                  </span>
                </span>
                <span className="mc-tab-fill" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mc-meta">
        <motion.h3
          key={`title-${active.id}`}
          className="mc-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {active.title}
        </motion.h3>
        <motion.p
          key={`lead-${active.id}`}
          className="mc-lead"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.7,
            delay: prefersReducedMotion ? 0 : 0.14,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {active.lead}
        </motion.p>
      </div>

      <div className="mc-stage">
        <div className="mb-stage">
          <div className="macbook-wrap">
            <div className="macbook">
              <MacbookFrame />
              <div className="screen">
                {clipSlots.map((slot, i) => (
                  <video
                    key={`${slot.featureIdx}-${slot.clipIdx}`}
                    ref={(el) => {
                      if (el) videoRefs.current[i] = el;
                    }}
                    className="mc-video"
                    src={slot.clip.src}
                    muted
                    playsInline
                    preload="auto"
                    aria-label={`${FEATURES[slot.featureIdx].eyebrow} demo`}
                    onEnded={handleEnded}
                    style={{ opacity: i === activeSlot ? 1 : 0 }}
                  />
                ))}
                <div className="mc-subtitle" aria-live="polite">
                  <AnimatePresence mode="wait" initial={false}>
                    {captionText && (
                      <motion.span
                        key={captionText}
                        className="mc-subtitle-text"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.28,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {captionText}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <MacbookNotchOverlay />
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
