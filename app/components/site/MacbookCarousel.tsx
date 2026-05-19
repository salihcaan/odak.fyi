import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
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
  title: React.ReactNode;
  lead: React.ReactNode;
  /** One clip for a single demo; two for a sequential pair (§1). */
  clips: [Clip] | [Clip, Clip];
};

const FEATURES: Feature[] = [
  {
    id: "search",
    eyebrow: "⌥ Space · Search",
    title: (
      <>
        Three letters in. <span className="accent">Window in focus.</span>
      </>
    ),
    lead:
      "Every detour through Finder breaks the train of thought. ⌥ Space, three letters, ↵ — and you're back where you were, without ever touching the trackpad.",
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
    eyebrow: "⌥ Tab · Switch",
    title: (
      <>
        ⌘ Tab switches apps. <span className="accent">⌥ Tab switches windows.</span>
      </>
    ),
    lead:
      "The app switcher hands you back whichever Cursor window came up first — not the one you actually wanted. ⌥ Tab lists every editor window as its own row, grouped by project, most-recent first.",
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
    eyebrow: "⌘ K · Actions",
    title: (
      <>
        One actions library, <span className="accent">every project.</span>
      </>
    ),
    lead:
      "Write your shortcuts once in ~/.odak/config.yaml, drop a tiny .odak file in any project, and the right action fires for the right project.",
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
    eyebrow: "Notch · Always visible",
    title: (
      <>
        The notch, <span className="accent">finally useful.</span>
      </>
    ),
    lead:
      "Apple gave you a strip of screen back. Odak parks the project you're working on up there — one glance and you know where you are.",
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

const SHORT_LABELS = ["Search", "Switch", "Actions", "Notch"] as const;
const KEY_HINTS = ["⌥ Space", "⌥ Tab", "⌘ K", "—"] as const;

export function MacbookCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  // videoRefs[featureIdx][clipIdx] — flat array of refs the order matches DOM.
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const tabRefs = useRef<HTMLButtonElement[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [inView, setInView] = useState(false);
  const [captionText, setCaptionText] = useState<string>("");
  const prefersReducedMotion = useReducedMotion();

  // Scroll-grow on entry: 0.78 → 1.0 across the first 35% of the section's
  // scroll progress, then holds at 1.0 so the carousel runs at full size
  // while the user watches.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.82, 1, 1]
  );
  const transform = useMotionTemplate`scale(${scale})`;

  // Flattened list of (feature, clip) pairs in DOM order — keeps videoRefs
  // indexable by a single number and matches the JSX iteration below.
  const clipSlots: Array<{ featureIdx: number; clipIdx: number; clip: Clip }> = [];
  FEATURES.forEach((f, fi) => {
    f.clips.forEach((clip, ci) => clipSlots.push({ featureIdx: fi, clipIdx: ci, clip }));
  });
  const activeSlot = clipSlots.findIndex(
    (s) => s.featureIdx === activeIdx && s.clipIdx === subIdx
  );

  // Autoplay on in-view; pause on out-of-view. Off-screen 60s clips
  // shouldn't burn CPU.
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

  // Drive playback whenever active slot or in-view changes. The incoming
  // clip is rewound to 0 and played; outgoing clips are only paused —
  // never rewound mid-crossfade, since flipping a fading-out frame back
  // to t=0 masks the opacity transition and reads as a hard cut.
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
    // Two-clip feature (§1): on first clip end, swap to the second.
    if (cur.clips.length === 2 && subIdx === 0) {
      setSubIdx(1);
      return;
    }
    // Otherwise advance to the next feature, looping back to 0 after the
    // last one so the carousel runs forever for visitors who stay parked.
    setActiveIdx((activeIdx + 1) % FEATURES.length);
    setSubIdx(0);
  }

  function jumpTo(idx: number) {
    setActiveIdx(idx);
    setSubIdx(0);
  }

  // Drive both (a) the active tab's progress fill and (b) the caption
  // text from the active video's timeupdate event. Progress fill goes
  // direct-DOM (timeupdate fires every ~250ms and we don't want to
  // re-render the world for a moving width); caption uses state because
  // AnimatePresence needs React to see the change to crossfade.
  useEffect(() => {
    const v = videoRefs.current[activeSlot];
    const tab = tabRefs.current[activeIdx];
    if (!v) return;
    const fill = tab?.querySelector<HTMLElement>(".mc-progress-fill") ?? null;
    const cur = FEATURES[activeIdx];
    const captions = cur.clips[subIdx]?.captions ?? [];

    const onTime = () => {
      // (a) Tab progress fill — combined across both clips for 2-clip features.
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

      // (b) Caption — latest beat whose `at` <= currentTime wins. Empty
      // string before the first beat fires, so the strip stays clear
      // during the cold-start moment of each clip.
      const t = v.currentTime;
      let next = "";
      for (const cap of captions) {
        if (cap.at <= t) next = cap.text;
        else break;
      }
      setCaptionText((prev) => (prev === next ? prev : next));
    };

    // Reset on clip change so a fresh clip doesn't briefly show the
    // previous clip's last caption before the first timeupdate fires.
    setCaptionText("");

    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, [activeIdx, subIdx, activeSlot, prefersReducedMotion]);

  // Reset progress fills on inactive tabs so they don't carry stale
  // widths into the next cycle.
  useEffect(() => {
    tabRefs.current.forEach((tab, i) => {
      if (!tab) return;
      const fill = tab.querySelector<HTMLElement>(".mc-progress-fill");
      if (!fill) return;
      if (i !== activeIdx) fill.style.width = "0%";
    });
  }, [activeIdx]);

  const active = FEATURES[activeIdx];

  return (
    <section
      ref={sectionRef}
      className="mc-section"
      id="features"
      style={{ position: "relative" }}
    >
      {/* Copy stack — every feature's headline is mounted at all times,
          inactive ones fade to 0 opacity. Position:absolute on the
          inactive items keeps height equal to the tallest headline so
          the layout doesn't jump as the active feature changes. */}
      <div className="mc-copy-stack">
        {FEATURES.map((f, i) => (
          <div
            key={f.id}
            className={`mc-copy ${i === activeIdx ? "is-active" : ""}`}
            aria-hidden={i !== activeIdx}
          >
            <div className="mc-eyebrow">{f.eyebrow}</div>
            <h2 className="mc-title">{f.title}</h2>
            <p className="mc-lead">{f.lead}</p>
          </div>
        ))}
      </div>

      {/* Tabs — jump-to-feature buttons with a fill bar showing video
          progress on the active one. */}
      <div className="mc-tabs" role="tablist" aria-label="Features">
        {FEATURES.map((f, i) => (
          <button
            key={f.id}
            ref={(el) => {
              if (el) tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={i === activeIdx}
            className={`mc-tab ${i === activeIdx ? "is-active" : ""}`}
            onClick={() => jumpTo(i)}
          >
            <span className="mc-tab-label">{SHORT_LABELS[i]}</span>
            <span className="mc-tab-key">{KEY_HINTS[i]}</span>
            <span className="mc-progress" aria-hidden="true">
              <span className="mc-progress-fill" />
            </span>
          </button>
        ))}
      </div>

      {/* MacBook stage. We reuse the legacy .mb-stage / .macbook-wrap /
          .macbook / .screen rules verbatim (perspective, drop-shadows,
          screen radius, notch-overlay). The scroll-grow scale is applied
          one level up so it doesn't disturb the macbook's perspective. */}
      <motion.div className="mc-stage-wrap" style={{ transform }}>
        <div className="mb-stage">
          <div className="glow" />
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
                {/* Subtitle overlay — crossfades on text change via
                    AnimatePresence keyed on the text itself. Sits inside
                    .screen so the macbook's rounded corners clip it. */}
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
      </motion.div>

      {/* Caption strip under the macbook — same title as the active
          headline above, but compact. Reads as a chyron during the
          autoplay loop. */}
      <div className="mc-caption" aria-live="polite">
        {active.eyebrow}
      </div>
    </section>
  );
}
