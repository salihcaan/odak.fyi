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
          Notes for recent releases of Odak. Updates ship through Sparkle —
          your copy will pick them up automatically.
        </p>
        <p className="meta">
          Subscribe via the <a href="/appcast.xml">appcast</a> · See every
          build on{" "}
          <a
            href="https://github.com/salihcaan/odak.fyi/releases"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </p>

        <Release id="v0-1-9">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.9</span>
              <span className="rel-pill">Latest</span>
            </div>
            <span className="rel-date">2026-05-30</span>
          </div>
          <h2 className="rel-title">Onboarding that sets you up right</h2>
          <p className="rel-lead">
            Odak can only find your projects once it knows where they live,
            so first-run onboarding now makes that one step count — and drops
            you straight into search the moment you're done.
          </p>

          <h3>New</h3>
          <ul>
            <li>
              <strong>Onboarding requires at least one project folder.</strong>{" "}
              The final step waits until you've picked a folder before letting
              you finish, with an inline hint so it's clear why. Your common
              dev folders (<code>code</code>, <code>Developer</code>,{" "}
              <code>Projects</code>, …) are still auto-detected and
              pre-selected, so most setups sail right through.
            </li>
            <li>
              <strong>Search opens automatically after onboarding.</strong>{" "}
              Finishing setup now lands you in the search panel every time,
              instead of occasionally leaving you on an empty desktop on a
              fresh install.
            </li>
          </ul>

          <h3>Polish</h3>
          <ul>
            <li>
              The Odak mark now sits in the top-right of the onboarding
              window, balancing the window chrome and matching your chosen
              accent.
            </li>
          </ul>

          <h3>Known limits</h3>
          <ul>
            <li>macOS 26+ only.</li>
          </ul>

          <div className="rel-foot">
            <a href="https://github.com/salihcaan/odak.fyi/releases/latest/download/Odak.dmg">
              Download Odak
            </a>
            <a
              href="https://github.com/salihcaan/odak.fyi/releases/tag/v0.1.9"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>
        </Release>

        <Release id="v0-1-8">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.8</span>
            </div>
            <span className="rel-date">2026-05-29</span>
          </div>
          <h2 className="rel-title">The Quick Switcher now sees every Space</h2>
          <p className="rel-lead">
            Until now the switcher only listed IDE windows on the Space you
            were currently looking at. Editors on another desktop or
            full-screen Space — especially Electron-based ones like Cursor and
            VS Code — quietly went missing. Now the switcher shows your open
            IDE windows across <strong>all</strong> Spaces, and focusing one
            jumps you straight to it.
          </p>

          <h3>New</h3>
          <ul>
            <li>
              <strong>
                IDE windows from every Space appear in the Quick Switcher.
              </strong>{" "}
              A Cursor or VS Code window parked on another desktop now shows up
              alongside your current-Space windows, with its real title, and
              selecting it raises the window and switches you to its Space. No
              Screen Recording permission required.
            </li>
          </ul>

          <h3>Under the hood</h3>
          <ul>
            <li>
              Off-Space windows are resolved once and cached for their
              lifetime, so the steady-state cost is a couple of accessibility
              reads per window rather than a scan on every refresh. Each read
              is bounded by a short timeout, so a hung editor can't stall the
              switcher.
            </li>
          </ul>

          <h3>Known limits</h3>
          <ul>
            <li>macOS 26+ only.</li>
          </ul>

          <div className="rel-foot">
            <a
              href="https://github.com/salihcaan/odak.fyi/releases/tag/v0.1.8"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>
        </Release>

        <Release id="v0-1-7">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.7</span>
            </div>
            <span className="rel-date">2026-05-25</span>
          </div>
          <h2 className="rel-title">Your Mac's name stays on your Mac</h2>
          <p className="rel-lead">
            A small privacy tightening to how Odak's license server handles
            your devices.
          </p>

          <h3>Privacy</h3>
          <ul>
            <li>
              <strong>
                Odak no longer stores your Mac's name on the license server.
              </strong>{" "}
              It used to send your Mac's name (the one in System Settings →
              Sharing — often "Your Name's MacBook") to track devices on your
              license. It now only sends a hardware identifier and your macOS
              version. Your Mac's name stays on this Mac.
            </li>
            <li>
              <strong>
                The "at your Mac limit" picker now labels other Macs by macOS
                version and last-seen.
              </strong>{" "}
              Instead of names, you'll see entries like "Another Mac · macOS
              26.3.0 · last seen 3 days ago", with the current Mac still
              clearly marked "This Mac".
            </li>
          </ul>

          <h3>Under the hood</h3>
          <ul>
            <li>
              License server schema updated to drop the device-name columns;
              existing names were removed during the migration. No action
              needed on your part.
            </li>
          </ul>

          <div className="rel-foot">
            <a
              href="https://github.com/salihcaan/odak.fyi/releases/tag/v0.1.7"
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
      </main>
      <Footer />
    </>
  );
}
