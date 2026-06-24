import { useEffect, useState } from "react";

// The hero headline, typed out like someone at a keyboard — on-theme for a
// launcher whose whole pitch is "two keystrokes". A hidden ghost copy reserves
// the full two-line box up front so the layout never shifts while the visible
// copy types in over the top, and a caret rides the cursor: solid while typing,
// blinking once it lands. prefers-reduced-motion skips straight to the full
// headline with no caret.

const LINES = [
  { text: "Any project.", className: "hero-line" },
  { text: "Two keystrokes.", className: "hero-line accent" },
] as const;

const FULL = LINES.map((l) => l.text).join(" ");
const TOTAL = LINES.reduce((n, l) => n + l.text.length, 0);
const LINE0 = LINES[0].text.length;

const CHAR_MS = 42; // cadence per character
const LINE_PAUSE_MS = 300; // beat between the two lines
const START_MS = 220; // settle before the first key lands

export function HeroHeadline({ reduced }: { reduced: boolean }) {
  const [typed, setTyped] = useState(reduced ? TOTAL : 0);
  const done = typed >= TOTAL;

  useEffect(() => {
    if (reduced) {
      setTyped(TOTAL);
      return;
    }
    setTyped(0);
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      i += 1;
      setTyped(i);
      if (i >= TOTAL) return;
      // Hold a beat at the line break so the two lines read as separate keys.
      timer = setTimeout(step, i === LINE0 ? LINE_PAUSE_MS : CHAR_MS);
    };
    timer = setTimeout(step, START_MS);
    return () => clearTimeout(timer);
  }, [reduced]);

  // The cursor sits on line 0 until it's fully typed, then drops to line 1
  // (and stays there once done).
  const caretLine = !done && typed <= LINE0 ? 0 : 1;

  let consumed = 0;
  return (
    <h1 className="hero-h hero-type">
      {/* Sizing ghost: occupies the exact two-line box, never painted. */}
      <span className="hero-type-ghost" aria-hidden="true">
        {LINES.map((l, i) => (
          <span key={i} className={l.className}>
            {l.text}
          </span>
        ))}
      </span>
      <span className="hero-type-live" aria-label={FULL}>
        {LINES.map((l, i) => {
          const shown = Math.max(0, Math.min(l.text.length, typed - consumed));
          consumed += l.text.length;
          return (
            <span key={i} className={l.className}>
              {l.text.slice(0, shown)}
              {!reduced && caretLine === i && (
                <span
                  className="hero-caret"
                  data-done={done ? "true" : undefined}
                  aria-hidden="true"
                />
              )}
            </span>
          );
        })}
      </span>
    </h1>
  );
}
