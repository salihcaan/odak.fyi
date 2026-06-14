import { useEffect, type ReactNode } from "react";
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
  // The releases render client-side, so the browser's native jump to
  // /changelog#v0-1-14 fires against an empty <div id="root"> and
  // lands at the top. Re-run the anchor scroll once the content exists.
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (!hash) return;
    document.getElementById(hash)?.scrollIntoView();
  }, []);

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

        <Release id="v0-1-17">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.17</span>
              <span className="rel-pill">Latest</span>
            </div>
            <span className="rel-date">2026-06-14</span>
          </div>
          <h2 className="rel-title">
            Git worktrees, idle windows, and sharper search
          </h2>
          <p className="rel-lead">
            Worktrees become a first-class Odak surface: spin one up, jump
            between them, and tear them down without leaving the launcher. The
            switcher learns which windows have gone stale, and search shows you
            why a result matched.
          </p>

          <h3>New</h3>
          <ul>
            <li>
              <strong>Git worktrees (⌘Y).</strong> Select a git project and
              press <kbd>⌘Y</kbd> to create, switch, or remove worktrees right
              from Odak. New worktrees copy your <code>.env</code> and can run
              a <code>postCreate</code> hook; a ⑂ branch badge follows each one
              across search, the switcher, and the notch. Configure with{" "}
              <code>worktreeRoot</code> / <code>copyOnCreate</code> /{" "}
              <code>postCreate</code>, and remap the shortcut in Settings →
              Shortcuts.
            </li>
            <li>
              <strong>Idle-time badges.</strong> Windows untouched for over an
              hour wear a coarse idle badge (<code>3h</code>, <code>2d</code>,{" "}
              <code>1w</code>) in the switcher so stale windows are easy to spot
              and close. History persists across relaunches; toggle it in
              Settings → Quick Switcher.
            </li>
            <li>
              <strong>Preferred terminal.</strong> A new{" "}
              <code>type: terminal</code> action opens your terminal of choice —
              Terminal, iTerm2, Warp, kitty, Ghostty, WezTerm, or Alacritty —
              honoring new-window vs new-tab where supported. Pick yours in
              Settings → General → Terminal.
            </li>
            <li>
              <strong>Tracked apps as actions.</strong> Apps enabled in
              Settings → Applications now surface as an “Apps” section in the
              actions panel, deduped against your existing actions.
            </li>
            <li>
              <strong>Fuzzy-match highlighting.</strong> Search results
              emphasize the exact characters that earned the match, and the
              switcher highlights whichever field won the rank.
            </li>
          </ul>

          <h3>Fixed</h3>
          <ul>
            <li>
              Navigate chords (default ⌥J/⌥K) now move the selection in the
              script/branch list overlay instead of typing stray characters
              into the filter.
            </li>
            <li>
              Settings sidebar search gets a softer focus ring, opens with
              nothing focused, and the sidebar is narrowed to match System
              Settings.
            </li>
            <li>
              Empty-state glyphs in the notch, search panel, and switcher no
              longer take the accent color.
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
              href="https://github.com/salihcaan/odak.fyi/releases/tag/v0.1.17"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>
        </Release>

        <Release id="v0-1-16">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.16</span>
            </div>
            <span className="rel-date">2026-06-12</span>
          </div>
          <h2 className="rel-title">
            Groups, brand icons, and a real import review
          </h2>
          <p className="rel-lead">
            The actions panel grows up: imports get a proper review panel,
            packs land in their own named sections, and rows finally wear the
            right logos.
          </p>

          <h3>New</h3>
          <ul>
            <li>
              <strong>Import review panel.</strong> <code>odak://import</code>{" "}
              now opens a native review panel inside Odak — every action
              listed with its icon and shortcut, script actions flagged —
              instead of a bare confirmation dialog. Nothing is written until
              you approve.
            </li>
            <li>
              <strong>Action groups.</strong> Actions from a pack (or a{" "}
              <code>group:</code> value in your config.yaml) render under
              their own section header in the panel, between Open and Copy, in
              config order.
            </li>
            <li>
              <strong>Brand icons.</strong> Actions can declare an{" "}
              <code>icon:</code> — Git, GitHub, GitLab, Docker, and Node logos
              ship built in (the same set the{" "}
              <a href="/actions">marketplace</a> shows), with any SF Symbol
              name as a fallback. Rows resolve the real app icon first, as
              before.
            </li>
            <li>
              <strong>Action editor.</strong> Settings → Actions gains an
              add/edit sheet, so one-off tweaks no longer require opening
              config.yaml.
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
              href="https://github.com/salihcaan/odak.fyi/releases/tag/v0.1.16"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>
        </Release>

        <Release id="v0-1-15">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.15</span>
            </div>
            <span className="rel-date">2026-06-12</span>
          </div>
          <h2 className="rel-title">The Actions Marketplace</h2>
          <p className="rel-lead">
            Actions are Odak's superpower, and now you don't have to write
            them yourself: curated packs live at{" "}
            <a href="/actions">odak.fyi/actions</a> and import with one click.
          </p>

          <h3>New</h3>
          <ul>
            <li>
              <strong>Actions Marketplace.</strong> Six curated packs — Git,
              GitHub, GitLab, Docker, Node/npm, and Xcode/Swift — at{" "}
              <a href="/actions">odak.fyi/actions</a>. Every pack shows each
              action and shortcut up front; <strong>Add to Odak</strong>{" "}
              imports it after the usual confirmation dialog, and the actions
              append to your <code>config.yaml</code> ready to edit.
            </li>
            <li>
              <strong>Browse Marketplace from Settings.</strong> Settings →
              Actions now links straight to the marketplace, next to Edit
              config.yaml and Reload.
            </li>
            <li>
              <strong>YAML imports.</strong> <code>odak://import?url=…</code>{" "}
              now accepts YAML as well as JSON — a single action, a list, or
              an <code>actions:</code> list. Share a snippet of your
              config.yaml via a Gist and it imports verbatim.
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
              href="https://github.com/salihcaan/odak.fyi/releases/tag/v0.1.15"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>
        </Release>

        <Release id="v0-1-14">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.14</span>
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
