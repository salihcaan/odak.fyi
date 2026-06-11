import type { ReactNode } from "react";
import { Aurora } from "@/components/site/Aurora";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

function Release({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <article className="release rel" id={id}>
      {children}
    </article>
  );
}

export function Changelog() {
  return (
    <>
      <Aurora />
      <Nav currentPath="/changelog.html" />
      <main>
        <div className="eyebrow">Changelog</div>
        <h1>What's new</h1>
        <p className="lede">
          Notes for the five most recent releases of Odak. Updates ship through
          Sparkle — your copy will pick them up automatically.
        </p>
        <p className="meta">
          Subscribe via the <a href="/appcast.xml">appcast</a> · Full release
          history on{" "}
          <a
            href="https://github.com/salihcaan/odak.fyi/releases"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </p>

        <Release id="v0-1-14">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.14</span>
              <span className="rel-pill">Latest</span>
            </div>
            <span className="rel-date">2026-06-11</span>
          </div>
          <h2 className="rel-title">
            Move the search panel anywhere, smarter search, faster launch
          </h2>
          <p className="rel-lead">
            The search panel is no longer pinned in place: drag it wherever you
            like, with magnetic guides to snap it back. Plus noticeably smarter
            fuzzy search, a ~2x faster launch, and fixes for vanishing windows
            and license lockouts.
          </p>

          <h3>New</h3>
          <ul>
            <li>
              <strong>Drag the search panel anywhere.</strong> Grab the panel
              and place it where you want — dashed guides appear at the default
              spot and the panel snaps magnetically when you get close. Drop it
              back on the guides (or use Settings → Search → Reset Position) to
              return to the default, and a new Top/Center anchor picker chooses
              where that default lives.
            </li>
          </ul>

          <h3>Improved</h3>
          <ul>
            <li>
              <strong>Smarter search ranking.</strong> The fuzzy matcher now
              always finds the best-scoring alignment and understands camelCase
              humps, acronyms, and digit groups — "wsv" cleanly matches
              WindowSwitcherView. Shorter and word-boundary matches rank first,
              and projects and windows rank by the same rules.
            </li>
            <li>
              <strong>~2x faster launch.</strong> The panel appears as soon as
              its window is ready instead of waiting on a fixed delay, and Odak
              no longer blocks launch on an IDE that's busy compiling or
              indexing.
            </li>
            <li>
              <strong>Unified look across panels.</strong> Search, the window
              switcher, and the notch now share the same keycap-style shortcut
              hints, dividers, and empty states. Selected rows are readable on
              every accent palette — pale palettes like Bone and Periwinkle no
              longer show white-on-white text.
            </li>
          </ul>

          <h3>Fixed</h3>
          <ul>
            <li>
              <strong>
                Windows on other Spaces no longer vanish after login.
              </strong>{" "}
              IDE windows restored to other Spaces while their apps were still
              starting up could disappear from the switcher until Odak
              restarted. Odak now retries until apps are fully awake and
              rescans during the first 90 seconds after startup.
            </li>
            <li>
              <strong>Valid licenses no longer fall back to the paywall.</strong>{" "}
              A mismatch between the revalidation cadence and the offline-grace
              window could lock activated licenses out after 3 days.
              Revalidation now runs daily with a 7-day offline grace, and
              recovers automatically with a single online check — no
              re-entering your code.
            </li>
          </ul>

          <h3>Requirements</h3>
          <ul>
            <li>macOS 15 Sequoia or later · Apple Silicon.</li>
          </ul>

          <div className="rel-foot">
            <a href="https://github.com/salihcaan/odak.fyi/releases/latest/download/Odak.dmg">
              Download Odak
            </a>
            <a
              href="https://github.com/salihcaan/odak.fyi/releases/tag/v0.1.14"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>
        </Release>

        <Release id="v0-1-13">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.13</span>
            </div>
            <span className="rel-date">2026-06-10</span>
          </div>
          <h2 className="rel-title">
            No more freezes during window activity, rescan works instantly
          </h2>
          <p className="rel-lead">
            A responsiveness release: Odak no longer stalls when editor windows
            open or close, and a project rescan shows up in search right away.
          </p>

          <h3>Fixed</h3>
          <ul>
            <li>
              <strong>Odak no longer freezes while your IDE is busy.</strong>{" "}
              Refreshing the window list talked to each editor synchronously on
              the main thread — if Cursor, VS Code, or a JetBrains IDE was
              mid-build or indexing, opening or closing one of its windows
              could lock Odak up for seconds. The whole window scan now runs in
              the background with a tight per-app timeout, and the switcher
              opens instantly with the latest list folding in the moment the
              scan lands.
            </li>
            <li>
              <strong>Rescan now updates search immediately.</strong> Pressing
              Rescan in Settings (or the automatic background rescan picking up
              a freshly cloned repo) rebuilt the project index but search kept
              serving the old list until you relaunched Odak. New projects now
              appear in search the moment the scan finishes — no relaunch
              needed.
            </li>
          </ul>

          <div className="rel-foot">
            <a
              href="https://github.com/salihcaan/odak.fyi/releases/tag/v0.1.13"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>
        </Release>

        <Release id="v0-1-12">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.12</span>
            </div>
            <span className="rel-date">2026-06-07</span>
          </div>
          <h2 className="rel-title">
            Windows on other Spaces show up reliably
          </h2>
          <p className="rel-lead">
            The switcher now finds IDE windows that live on other desktops
            (Spaces) — including a second window of the same project — that
            could previously go missing.
          </p>

          <h3>Fixed</h3>
          <ul>
            <li>
              <strong>
                Windows on other Spaces now appear in the switcher.
              </strong>{" "}
              When a window lived on a different desktop than the one you were
              on, the switcher could miss it — most often a Cursor or VS Code
              window whose internal accessibility handle fell just past Odak's
              off-Space lookup limit. Off-Space windows are now resolved
              reliably, and the result is cached so refreshes stay fast.
            </li>
            <li>
              <strong>
                Two windows of the same project no longer collapse into one
                row.
              </strong>{" "}
              When the system couldn't hand Odak a stable window identifier
              (minimized windows, and some Electron windows), two windows of
              the same project in the same editor could fold into a single
              entry. They're now kept distinct.
            </li>
          </ul>

          <div className="rel-foot">
            <a
              href="https://github.com/salihcaan/odak.fyi/releases/tag/v0.1.12"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>
        </Release>

        <Release id="v0-1-11">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.11</span>
            </div>
            <span className="rel-date">2026-06-07</span>
          </div>
          <h2 className="rel-title">
            Hold Right ⌘ to find any window — now on macOS 15
          </h2>
          <p className="rel-lead">
            A second, faster way to reach a window lands alongside ⌥Tab: hold
            the right Command key and just type. And Odak now runs on macOS 15
            Sequoia, not only Tahoe.
          </p>

          <h3>New</h3>
          <ul>
            <li>
              <strong>Hold Right ⌘, type, release — land in the window.</strong>{" "}
              Hold the right Command key and type a few letters to fuzzy-match
              your open IDE windows, then release to switch. Numbered rows still
              work, so ⌘1–9 jumps straight to a result. The classic ⌥Tab
              switcher is unchanged.
            </li>
            <li>
              <strong>Runs on macOS 15 Sequoia.</strong> Odak previously needed
              macOS 26 for its Liquid Glass panel. It now falls back to a native
              material on Sequoia, so the full app works on macOS 15 and later —
              and still lights up with Liquid Glass on macOS 26.
            </li>
            <li>
              <strong>Open a project straight in your editor from search.</strong>{" "}
              Hover a search result and click the IDE icon to open it in your
              editor, without switching to an existing window first.
            </li>
          </ul>

          <h3>Polish</h3>
          <ul>
            <li>
              The type-to-search field renders the query as a single text run,
              so letters no longer jitter or shift as you type — and the typed
              text is crisper and higher-contrast in light mode.
            </li>
            <li>
              Row hover is driven from a single source of truth, fixing cases
              where the switcher and the result list could disagree about which
              row was highlighted, and the selection indicator is correctly
              centered.
            </li>
          </ul>

          <div className="rel-foot">
            <a
              href="https://github.com/salihcaan/odak.fyi/releases/tag/v0.1.11"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>
        </Release>

        <Release id="v0-1-10">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.10</span>
            </div>
            <span className="rel-date">2026-06-06</span>
          </div>
          <h2 className="rel-title">Smoother switching, a sharper notch</h2>
          <p className="rel-lead">
            A polish pass on the two surfaces you touch most: the window
            switcher's close motion and the notch's selection look.
          </p>

          <h3>Polish</h3>
          <ul>
            <li>
              <strong>
                Closing a window in the switcher now moves as one motion.
              </strong>{" "}
              Whether you use ⌥W or the per-row × button, the row collapse and
              the panel resize happen in the same beat — no more "the content
              vanished, then the window slid up to catch it." The closing row
              also fades out cleanly instead of briefly ghosting over the row
              taking its place.
            </li>
            <li>
              <strong>The notch highlights with your accent color.</strong>{" "}
              Hovering a project in the notch paints the row in your chosen
              accent palette — the same selection color the quick switcher uses
              — instead of a flat gray.
            </li>
            <li>
              <strong>The notch's bottom row sits flush in the corner.</strong>{" "}
              The selection highlight nests concentrically into the notch card's
              rounded bottom, matching how the switcher's bottom row hugs its
              panel, instead of leaving a curved shoulder around a squarer row.
            </li>
          </ul>

          <div className="rel-foot">
            <a
              href="https://github.com/salihcaan/odak.fyi/releases/tag/v0.1.10"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>
        </Release>

        <div className="subscribe">
          <p style={{ margin: 0 }}>
            <strong>Looking for older releases?</strong> Every version, with
            full notes and downloads, lives on{" "}
            <a
              href="https://github.com/salihcaan/odak.fyi/releases"
              target="_blank"
              rel="noopener"
            >
              GitHub Releases
            </a>
            . And Odak's auto-updater (Sparkle) keeps installed copies current
            automatically — or point your feed reader at the{" "}
            <a href="/appcast.xml">appcast</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
