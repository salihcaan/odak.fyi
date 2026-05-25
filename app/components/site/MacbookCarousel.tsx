import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MacbookFrame, MacbookNotchOverlay } from "./MacbookFrame";

/** A caption beat: shows `text` once `currentTime` of the parent clip
 *  crosses `at` (seconds). Latest matching beat wins. Optional `ides`
 *  renders a row of editor icons inside the pill. */
type Caption = { at: number; text: string; ides?: string[] };

type Clip = {
  src: string;
  captions: Caption[];
};

const IDE = {
  cursor: "/assets/ide/cursor.webp",
  vscode: "/assets/ide/vscode.webp",
  intellij: "/assets/ide/intellij.webp",
  antigravity: "/assets/ide/antigravity.png",
  xcode: "/assets/ide/xcode.webp",
  androidStudio: "/assets/ide/android-studio.png",
} as const;

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
    lead: "⌥ Space, three letters, ↵. Right window, in front.",
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
          {
            at: 7.0,
            text: "Open it in any editor.",
            ides: [IDE.cursor, IDE.vscode, IDE.intellij, IDE.antigravity, IDE.xcode, IDE.androidStudio],
          },
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
          { at: 1.5, text: "⌥ Tab. Every window you have open." },
          { at: 6.0, text: "Across every editor." },
          {
            at: 11.0,
            text: "Same project, different IDE? Listed separately.",
            ides: [IDE.cursor, IDE.vscode, IDE.intellij],
          },
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
          { at: 9.5, text: "Pick, and you're there." },
          { at: 15.5, text: "Same project, another IDE.", ides: [IDE.cursor, IDE.vscode] },
          { at: 19.5, text: "From any app, always one click away." },
        ],
      },
    ],
  },
];

export function MacbookCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const tabRefs = useRef<HTMLButtonElement[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [inView, setInView] = useState(false);
  const [activeCaption, setActiveCaption] = useState<Caption | null>(null);
  const prefersReducedMotion = useReducedMotion();



  const clipSlots: Array<{ featureIdx: number; clipIdx: number; clip: Clip }> = [];
  FEATURES.forEach((f, fi) => {
    f.clips.forEach((clip, ci) => clipSlots.push({ featureIdx: fi, clipIdx: ci, clip }));
  });
  const activeSlot = clipSlots.findIndex(
    (s) => s.featureIdx === activeIdx && s.clipIdx === subIdx
  );

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

  useEffect(() => {
    if (prefersReducedMotion) return;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeSlot && inView) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [activeSlot, inView, prefersReducedMotion]);

  function handleEnded() {
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
  }

  // Tab progress fill — tracks playback time across the active
  // feature's clips so the tab pill fills as the demo plays.
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
        fill.style.transform = `scaleX(${pct / 100})`;
        if (pct >= 99.5) fill.dataset.full = "true";
        else delete fill.dataset.full;
      }

      const t = v.currentTime;
      let next: Caption | null = null;
      for (const cap of captions) {
        if (cap.at <= t) next = cap;
        else break;
      }
      setActiveCaption((prev) => (prev?.text === next?.text ? prev : next));
    };

    setActiveCaption(null);
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, [activeIdx, subIdx, activeSlot, prefersReducedMotion]);

  useEffect(() => {
    tabRefs.current.forEach((tab, i) => {
      if (!tab) return;
      const fill = tab.querySelector<HTMLElement>(".mc-tab-fill");
      if (!fill) return;
      if (i !== activeIdx) {
        fill.style.transform = "scaleX(0)";
        delete fill.dataset.full;
      }
    });
  }, [activeIdx]);

  const active = FEATURES[activeIdx];

  return (
    <div className="mc-pin-wrap" ref={pinWrapRef}>
      <div className="mc-particles" aria-hidden="true">
        <div className="mc-particle-layer">
          <div className="mc-dot" style={{ top: "10%", left: "15%", width: 140, height: 140, opacity: 0.12 }} />
          <div className="mc-dot" style={{ top: "40%", left: "80%", width: 220, height: 220, opacity: 0.08 }} />
          <div className="mc-dot" style={{ top: "75%", left: "10%", width: 180, height: 180, opacity: 0.1 }} />
        </div>
        <div className="mc-particle-layer">
          <div className="mc-dot" style={{ top: "25%", left: "75%", width: 90, height: 90, opacity: 0.15 }} />
          <div className="mc-dot" style={{ top: "60%", left: "20%", width: 120, height: 120, opacity: 0.12 }} />
          <div className="mc-dot" style={{ top: "85%", left: "85%", width: 160, height: 160, opacity: 0.09 }} />
        </div>
        <div className="mc-particle-layer">
          <div className="mc-dot" style={{ top: "5%", left: "50%", width: 60, height: 60, opacity: 0.2 }} />
          <div className="mc-dot" style={{ top: "50%", left: "60%", width: 80, height: 80, opacity: 0.18 }} />
          <div className="mc-dot" style={{ top: "95%", left: "30%", width: 100, height: 100, opacity: 0.15 }} />
        </div>
      </div>
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
          <div className="glow" aria-hidden="true" />
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
                    {activeCaption && (
                      <motion.span
                        key={activeCaption.text}
                        className="mc-subtitle-text"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.28,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <span className="mc-subtitle-copy">{activeCaption.text}</span>
                        {activeCaption.ides && activeCaption.ides.length > 0 && (
                          <span className="mc-subtitle-ides" aria-hidden="true">
                            {activeCaption.ides.map((src) => (
                              <img key={src} src={src} alt="" loading="lazy" />
                            ))}
                          </span>
                        )}
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
