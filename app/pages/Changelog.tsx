import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Aurora } from "@/components/site/Aurora";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { usePageEnter } from "@/components/site/PageEnter";

// Single release article. Animates in when its top edge crosses ~12% of
// the viewport (matches the legacy .reveal IntersectionObserver
// threshold). Reduced-motion: snap to visible.
function Release({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      className="release rel"
      id={id}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={
        reduced
          ? { duration: 0.22 }
          : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.article>
  );
}

export function Changelog() {
  const { item } = usePageEnter();
  return (
    <>
      <Aurora />
      <Nav currentPath="/changelog.html" />
      <motion.main variants={item(0.05)} initial="hidden" animate="show">
        <div className="eyebrow">Changelog</div>
        <h1>What's new</h1>
        <p className="lede">
          Every release of Odak, with notes about what changed and why.
          Updates ship through Sparkle — your copy will pick them up
          automatically.
        </p>
        <p className="meta">
          Subscribe via the <a href="/appcast.xml">appcast</a> · See full
          builds on{" "}
          <a
            href="https://github.com/salihcaan/odak.fyi/releases"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </p>

        <Release id="v0-1-4">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.4</span>
              <span className="rel-pill">Latest</span>
            </div>
            <span className="rel-date">2026-05-08</span>
          </div>
          <h2 className="rel-title">Same-name projects, everywhere</h2>
          <p className="rel-lead">
            When two projects share a name (e.g. an{" "}
            <code>odak.fyi</code> checkout in <code>~/code/</code> and
            another in <code>~/code/configs/</code>), Odak now shows the
            disambiguating parent folder as a small chip next to the project
            name on every surface, not just the search results.
          </p>

          <h3>Improvements</h3>
          <ul>
            <li>
              <strong>Parent-folder chip in the Quick Switcher and Dynamic Island.</strong>{" "}
              Two windows or rows for same-named projects in different
              folders now show a <code>configs</code> / <code>code</code>{" "}
              pill next to the title, the same one you've seen in search.
              The notch uses a higher-contrast variant so the pill stays
              readable on the dark notch surface in light mode.
            </li>
          </ul>

          <h3>Fixes</h3>
          <ul>
            <li>
              <strong>
                Xcode-opened projects now match their scanned project
                correctly.
              </strong>{" "}
              Opening Odak (or any Xcode project whose inner source
              directory shares the project name) used to produce two rows
              in the notch — one for the scanned project, one phantom row
              labelled like <code>Odak Odak</code> — and the search row
              would lose its Xcode icon. Windows resolved into a
              subdirectory of a scanned project now fold into that project
              everywhere.
            </li>
          </ul>

          <div className="rel-foot">
            <a href="https://github.com/salihcaan/odak.fyi/releases/download/v0.1.4/Odak-0.1.4.dmg">
              Download v0.1.4 DMG
            </a>
            <a
              href="https://github.com/salihcaan/odak.fyi/releases/tag/v0.1.4"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>
        </Release>

        <Release id="v0-1-3">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.3</span>
            </div>
            <span className="rel-date">2026-05-07</span>
          </div>
          <h2 className="rel-title">Notch matches the Quick Switcher</h2>
          <p className="rel-lead">
            The Dynamic Island now shows the same set of open IDE windows
            that the Quick Switcher does, with one row per actual project.
          </p>

          <h3>Improvements</h3>
          <ul>
            <li>
              <strong>DataGrip and other JetBrains-virtual projects</strong>{" "}
              now appear in the notch. Previously only projects living in
              your configured scan folders showed up, so DataGrip sessions
              (and any project opened from outside your scan roots)
              silently went missing even when the Switcher could see them.
            </li>
            <li>
              <strong>Same-named projects at different paths render as separate rows.</strong>{" "}
              Two <code>Swee</code> projects in different folders no longer
              collapse into a single ambiguous row whose icon belonged to
              whichever scan-folder iteration order won.
            </li>
            <li>
              <strong>Each open window gets its own icon in the row's strip.</strong>{" "}
              Two Cursor windows of the same project show as two Cursor
              icons — each focusable independently — instead of being
              deduplicated into one.
            </li>
          </ul>

          <h3>Fixes</h3>
          <ul>
            <li>
              Hovering one row no longer highlights another. Variable row
              heights from a missing subtitle line, plus a couple of paths
              that produced colliding row IDs, were causing multiple rows
              to light up at once.
            </li>
          </ul>

          <div className="rel-foot">
            <a href="https://github.com/salihcaan/odak.fyi/releases/download/v0.1.3/Odak-0.1.3.dmg">
              Download v0.1.3 DMG
            </a>
            <a
              href="https://github.com/salihcaan/odak.fyi/releases/tag/v0.1.3"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>
        </Release>

        <Release id="v0-1-2">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.2</span>
            </div>
            <span className="rel-date">2026-05-07</span>
          </div>
          <h2 className="rel-title">Fixes a launch crash on second launch</h2>
          <p className="rel-lead">
            A bug-fix release for a crash that some users hit on Apple
            Silicon Macs after using the app once: the next launch could
            trap inside <code>applicationDidFinishLaunching</code> and the
            app would never reach its first window.
          </p>

          <h3>Fixes</h3>
          <ul>
            <li>
              Don't crash on launch when two configured scan folders
              overlap (a parent and one of its subfolders, or roots that
              resolve to the same target). The project scanner now drops
              duplicate paths before returning, which kept the Dynamic
              Island, search, and App Intents from tripping a duplicate-key
              trap when building their path-keyed lookups.
            </li>
          </ul>

          <p>No behavior or UI changes — same 0.1.1, just no crash.</p>

          <div className="rel-foot">
            <a href="https://github.com/salihcaan/odak.fyi/releases/download/v0.1.2/Odak-0.1.2.dmg">
              Download v0.1.2 DMG
            </a>
            <a
              href="https://github.com/salihcaan/odak.fyi/releases/tag/v0.1.2"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>
        </Release>

        <Release id="v0-1-1">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.1</span>
            </div>
            <span className="rel-date">2026-05-05</span>
          </div>
          <h2 className="rel-title">Quieter idle, snappier feel</h2>
          <p className="rel-lead">
            Mostly performance work. Idle CPU drops to roughly nothing on
            Apple Silicon — the previous build had a hover-detection timer
            running 10 times a second whether or not anything was
            happening, and a search cache rebuilding itself every time any
            IDE window changed title.
          </p>

          <h3>Performance</h3>
          <ul>
            <li>
              Dynamic Island hover monitor halves its polling rate (10 Hz
              → 5 Hz) and skips hit-tests entirely when the cursor isn't
              anywhere near the top of the screen. This is the biggest win
              — most ticks now exit on a single coordinate compare.
            </li>
            <li>
              Search caches no longer rebuild while the panel is hidden.
              They refresh automatically the moment you open it, so badges
              and filter chips are always current.
            </li>
            <li>
              Global hotkey event tap reads cached shortcut bindings
              instead of touching the observable settings store on every
              keystroke.
            </li>
          </ul>

          <h3>Fixes</h3>
          <ul>
            <li>
              Dynamic Island flares now meet the bezel with a clean
              horizontal tangent, and the pill blends into the notch and
              external-display top edge.
            </li>
            <li>
              Search result rows no longer drift when the same project
              appears under multiple paths.
            </li>
            <li>
              Settings detail pane no longer picks up the accent tint on
              its form background.
            </li>
            <li>
              Click-to-pin removed from the Dynamic Island; hover-out
              collapse is reliable again.
            </li>
          </ul>

          <div className="rel-foot">
            <a href="https://github.com/salihcaan/odak.fyi/releases/download/v0.1.1/Odak-0.1.1.dmg">
              Download v0.1.1 DMG
            </a>
            <a
              href="https://github.com/salihcaan/odak.fyi/releases/tag/v0.1.1"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>
        </Release>

        <Release id="v0-1-0">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.0</span>
            </div>
            <span className="rel-date">2026-04-29</span>
          </div>
          <h2 className="rel-title">First public preview</h2>
          <p className="rel-lead">
            Odak is a project finder and window switcher for macOS
            developers. This is an early preview — core features work, with
            a few rough edges we're polishing in the open.
          </p>

          <h3>What's here</h3>
          <ul>
            <li>
              <strong>Project finder</strong> — global hotkey, instant
              fuzzy search across your code folders.
            </li>
            <li>
              <strong>Window switcher</strong> — MRU ordering across apps
              and across same-app windows.
            </li>
            <li>
              <strong>Settings</strong> — customizable shortcuts, accent
              palette, and row density.
            </li>
            <li>
              <strong>14-day trial</strong> — every feature is unlocked.
              License activation goes live once Paddle is set up.
            </li>
          </ul>

          <h3>Known limits</h3>
          <ul>
            <li>
              No in-app purchase yet — the license server is still being
              stood up.
            </li>
            <li>
              Built for macOS 26+ only (the Liquid Glass UI relies on
              macOS 26 APIs).
            </li>
          </ul>

          <p>
            Feedback is genuinely welcome — reply to{" "}
            <a href="mailto:support@odak.fyi">support@odak.fyi</a> or file
            an issue on GitHub.
          </p>

          <div className="rel-foot">
            <a href="https://github.com/salihcaan/odak.fyi/releases/download/v0.1.0/Odak-0.1.0.dmg">
              Download v0.1.0 DMG
            </a>
            <a
              href="https://github.com/salihcaan/odak.fyi/releases/tag/v0.1.0"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>
        </Release>

        <div className="subscribe">
          <p style={{ margin: 0 }}>
            <strong>Want updates without checking?</strong> Odak's
            auto-updater (Sparkle) handles that for you — installed copies
            pick up new versions automatically. Or point your feed reader
            at the <a href="/appcast.xml">appcast</a>.
          </p>
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
