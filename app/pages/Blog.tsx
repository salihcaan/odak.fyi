import { Aurora } from "@/components/site/Aurora";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { captureEvent } from "@/lib/analytics";
import { useLatestRelease } from "@/hooks/useLatestRelease";

// The alt-tab chaos, illustrated. Every window is the same editor, the same
// blue icon — that's the whole joke. Positions are hand-placed so the pile
// reads as messy-but-real; the CSS lives in blog.css (.window-wall).
const WINDOWS = [
  { t: "orders-service — Cursor", x: 0, y: 92, r: -9, z: 1 },
  { t: "auth-service — Cursor", x: 12, y: 24, r: -4, z: 3 },
  { t: "cron-runner — Cursor", x: 7, y: 162, r: -6, z: 2 },
  { t: "gateway — Cursor", x: 24, y: 150, r: 6, z: 4 },
  { t: "billing-api — Cursor", x: 34, y: 70, r: -5, z: 5 },
  { t: "search-svc — Cursor", x: 38, y: 4, r: 4, z: 8 },
  { t: "payments — Cursor", x: 49, y: 150, r: 7, z: 6 },
  { t: "inventory — Cursor", x: 56, y: 22, r: 3, z: 7 },
  { t: "notifications — Cursor", x: 67, y: 96, r: -3, z: 9 },
];

// First post on the Odak build-log. Hand-authored like the other content
// pages (changelog/privacy/terms) — there's no CMS yet. When a second post
// lands, this becomes /blog/<slug>.html and a small index page lists them.
export function Blog() {
  const { version, size } = useLatestRelease();
  return (
    <>
      <Aurora />
      <Nav currentPath="/blog.html" />
      <main>
        <a href="/" className="post-back">
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M9 6H3m3-3L3 6l3 3" />
          </svg>
          odak.fyi
        </a>

        <div className="eyebrow">Build log</div>
        <h1>Why I rewrote my launcher three times</h1>
        <p className="lede">
          Let’s start with a confession. 📣 I built the same app three times
          before it shipped. Same idea, same one-line pitch, three completely
          different codebases — two of which I deleted. Not because I’m slow.
          Because twice I was confidently, expensively wrong.
        </p>
        <div className="post-byline">
          <span>May 30, 2026</span>
          <span className="sep">·</span>
          <span>7 min read</span>
          <span className="sep">·</span>
          <span className="by">The story behind Odak</span>
        </div>

        <article className="post">
          <p>
            Everyone repeats the same line: a context switch costs you two
            seconds. They’re wrong — and not in the way you think. 🤷‍♂️
          </p>

          <p>
            The two seconds aren’t the problem. The problem is that somewhere
            between alt-tabbing past nine identical editor windows and finding
            the right one, you forget what you came here to do.
          </p>

          <p>
            I work across a pile of microservices. On a normal day I bounce
            between a dozen of them — fix a bug in one, tail a log in another,
            open a PR in a third. Each jump is tiny. Find the window. Cycle
            ⌘-Tab past four editors that share the same icon and the same shade
            of blue. Or worse: the project isn’t even open, so I go spelunking
            through <code>~/code</code> for the folder. 🫠
          </p>

          <p>None of it is hard. All of it is a tax.</p>

          {/* The alt-tab chaos, illustrated: nine windows, one editor, one blue. */}
          <figure className="window-wall">
            <div className="ww-stage" aria-hidden="true">
              {WINDOWS.map((w, i) => (
                <div
                  className="win"
                  key={i}
                  style={{
                    left: `${w.x}%`,
                    top: `${w.y}px`,
                    transform: `rotate(${w.r}deg)`,
                    zIndex: w.z,
                  }}
                >
                  <div className="win-bar">
                    <span className="tl r" />
                    <span className="tl y" />
                    <span className="tl g" />
                    <span className="win-title">{w.t}</span>
                  </div>
                  <div className="win-body">
                    <div className="win-line blue" style={{ width: "62%" }} />
                    <div className="win-line" style={{ width: "90%" }} />
                    <div className="win-line" style={{ width: "74%" }} />
                  </div>
                  <span className="win-badge">
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M6 5L3 8l3 3M10 5l3 3-3 3" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
            <figcaption>
              Nine windows. One editor. One shade of blue. Now find the right
              one — fast. 🙃
            </figcaption>
          </figure>

          <div className="pullquote">
            The tax isn’t the time. <span>It’s the focus.</span> And when you
            cross a dozen services a day, you pay it dozens of times.
          </div>

          <p>
            So I decided to fix it. One feature: hit a shortcut, type three
            letters of any project, and land in it — open it if it’s closed,
            focus the window if it’s already running. That’s the whole pitch.
            🖖
          </p>

          <p>
            It took three tries. The two that failed taught me more than the
            one that worked.
          </p>

          <h2>
            <span className="num">01</span>Raycast
          </h2>
          <p className="attempt-tag fail">
            <span className="n">✗</span> couldn’t reach the system 🔒
          </p>
          <p>
            Raycast was the obvious first move. Fast, extensible, already open
            on my Mac. I wrote an extension that scanned my git repos and
            opened them. For the “open a project” half — honestly? Fine. ✅
          </p>
          <p>
            Then I hit the wall: switching to a window that’s already open, and
            binding my own global keys the way I wanted. That needs to talk to
            macOS at a level an extension simply doesn’t get — enumerating
            other apps’ windows, catching keystrokes before they reach the
            focused app.
          </p>
          <p>
            Raycast runs your extension in its own sandbox. It owns the
            permissions, not you. I could ride on whatever it chose to expose,
            and not one inch further. The thing I actually wanted to build
            lived on the other side of a door I didn’t have the key to. 🔑
          </p>

          <h2>
            <span className="num">02</span>Electron
          </h2>
          <p className="attempt-tag fail">
            <span className="n">✗</span> worked, but felt foreign 👽
          </p>
          <p>
            Fine. I’ll own the whole app, then. Electron is the default answer
            when you want to ship a desktop app this weekend, and with native
            node addons you <em>can</em> reach the system APIs Raycast hid from
            me. I got a prototype running. It opened projects. It switched
            windows. It worked. 🎉
          </p>
          <p>
            And it felt wrong. Not broken — <em>wrong</em>. 😮‍💨
          </p>
          <p>
            A launcher is something you summon a hundred times a day; it has to
            feel like it was always part of the OS. The Electron build felt
            like a web page that got handed a window: a beat of lag on every
            keystroke, a panel that didn’t quite blur like a real macOS
            surface, a couple hundred megs of Chromium resident in memory to
            draw a search box.
          </p>
          <p>
            For a tool whose entire job is “don’t break my flow,” shipping
            something that itself felt like a tiny interruption was a
            contradiction I couldn’t live with. 🚫
          </p>

          <h2>
            <span className="num">03</span>Swift, native
          </h2>
          <p className="attempt-tag win">
            <span className="n">✓</span> it finally felt like the OS ✨
          </p>
          <p>
            So I gave up on the easy path and wrote it natively in Swift. More
            work up front. But it bought the two things the first two tries
            couldn’t: real access to the system, and the feel of an app that
            belongs there.
          </p>
          <p>
            The global shortcuts are a <code>CGEvent</code> tap — Odak sees the
            keystroke at the session level, before it reaches whatever app is
            focused, so the launcher can be summoned from anywhere: ⌨️
          </p>
          <figure>
            <pre><code><span className="c">// A session-level event tap: the launcher hears keys</span>{"\n"}<span className="c">// before the focused app does. Needs Accessibility.</span>{"\n"}<span className="k">let</span> tap = CGEvent.tapCreate({"\n"}{"  "}tap: .cgSessionEventTap,{"\n"}{"  "}place: .headInsertEventTap,{"\n"}{"  "}eventsOfInterest: keyDownMask,{"\n"}{"  "}callback: handleHotkey{"\n"})</code></pre>
            <figcaption>The hotkey path, in ~6 lines of native API.</figcaption>
          </figure>
          <p>
            Window tracking is the <strong>Accessibility API</strong> —{" "}
            <code>AXObserver</code> — and the detail I’m proudest of is that
            it’s <em>event-driven</em>. Odak doesn’t poll a list of windows on
            a timer the way a lot of switchers do; it subscribes to “a window
            was created,” “focused,” “closed,” and updates its picture only
            when something actually changes. That’s what keeps it quiet in the
            background and instant when you summon it. ⚡️
          </p>
          <p>
            And the panels are real <code>NSPanel</code>s — floating above
            everything, surviving Mission Control, showing on every Space.
            That’s the difference you feel but can’t name: it blurs like the
            menu bar blurs, it appears without a frame of lag, it’s{" "}
            <em>there</em> the instant you ask for it. Native isn’t a bullet
            point. It’s the whole product. 🫶
          </p>

          <h2>
            <span className="num">04</span>What it became
          </h2>
          <p>Two keystrokes. That’s the shape it settled into.</p>
          <ul>
            <li>
              <strong>⌥ Space</strong> — search every git repo on your Mac.
              Fuzzy, so <code>ord</code> finds <code>orders-service</code>. It
              learns what you open most and floats it to the top, so it’s
              usually two letters and ↵. Open it in your editor, or jump to the
              window if it’s already running.
            </li>
            <li>
              <strong>The window switcher</strong> — like ⌘-Tab, but for
              editors, grouped by project and sorted most-recent-first. Never
              four identical “Cursor” entries again. 🙏
            </li>
            <li>
              <strong>⌘ K on any project</strong> — because Odak knows the{" "}
              <em>project</em>, not just a window, it knows the git branch and
              can run per-project actions: deploy, open the PR, tail the logs,
              all without leaving the keyboard.
            </li>
          </ul>

          <h2>
            <span className="num">05</span>The lesson
          </h2>
          <p>
            If I’d been building almost anything else — a dashboard, a settings
            screen, a form — Electron would’ve been the right call and I’d have
            shipped in a weekend. 🤷
          </p>
          <p>
            But for a tool that lives at the OS level and gets summoned a
            hundred times a day, “feels native” isn’t polish you sprinkle on at
            the end. It’s the entire point.
          </p>
          <p>
            The two dead prototypes weren’t wasted. They’re how I learned
            exactly which wall I was hitting, and why nothing but native would
            clear it. 🧱
          </p>
          <p>
            That’s also why Odak ships the way it does: a notarized{" "}
            <code>.dmg</code> with auto-updates, not a Mac App Store listing.
            Same instinct — keep it native, keep it direct, don’t put a layer
            between the tool and the machine it runs on. But that’s a story for
            the next post. 📦
          </p>

          <p>Three rewrites sounds like failure. It was the opposite.</p>
          <p>
            <strong>The slow path was never the wrong one. Pretending there
            was a fast one was. ⚠️</strong>
          </p>

          <div className="post-cta">
            <h3>Try the thing this story is about.</h3>
            <p>
              macOS 15+, Apple Silicon, native. Telemetry is opt-in. $19
              once, no subscription. 14-day trial, no card.
            </p>
            <div className="row">
              <a
                href="https://github.com/salihcaan/odak.fyi/releases/latest/download/Odak.dmg"
                className="btn-primary"
                onClick={() =>
                  captureEvent("download_clicked", {
                    source: "blog",
                    version,
                  })
                }
              >
                <svg
                  viewBox="0 0 14 17"
                  aria-hidden="true"
                  style={{
                    width: 12,
                    height: 14,
                    fill: "currentColor",
                    marginTop: -2,
                  }}
                >
                  <path
                    fill="currentColor"
                    d="M11.182 8.91c-.018-2.022 1.65-2.992 1.725-3.038-.94-1.376-2.404-1.564-2.925-1.586-1.247-.126-2.434.733-3.067.733-.633 0-1.61-.715-2.65-.696-1.363.02-2.62.793-3.32 2.013-1.416 2.456-.363 6.094 1.018 8.087.674.974 1.477 2.073 2.53 2.034 1.014-.04 1.397-.658 2.624-.658 1.226 0 1.572.658 2.65.638 1.094-.02 1.787-.997 2.456-1.974.774-1.13 1.093-2.224 1.112-2.28-.024-.012-2.135-.82-2.153-3.273zM9.176 2.985C9.737 2.31 10.114 1.371 10.011.434c-.806.033-1.78.537-2.36 1.21-.52.598-.974 1.553-.851 2.473.898.07 1.815-.456 2.376-1.132z"
                  />
                </svg>
                Download Odak{" "}
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    opacity: 0.65,
                    fontWeight: 500,
                  }}
                >
                  {size}
                </span>
              </a>
              <a href="/#features" className="ghost">
                See what it does →
              </a>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
