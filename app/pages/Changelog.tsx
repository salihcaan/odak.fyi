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
          Notes for the current release of Odak. Updates ship through
          Sparkle — your copy will pick them up automatically.
        </p>
        <p className="meta">
          Subscribe via the <a href="/appcast.xml">appcast</a> · See the
          latest build on{" "}
          <a
            href="https://github.com/salihcaan/odak.fyi/releases/latest"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </p>

        <Release id="v0-1-7">
          <div className="rel-head">
            <div className="rel-tag">
              <span className="rel-version">v0.1.7</span>
              <span className="rel-pill">Latest</span>
            </div>
            <span className="rel-date">2026-05-25</span>
          </div>
          <h2 className="rel-title">First release</h2>
          <p className="rel-lead">
            Odak is out. Try it free for 14 days.
          </p>

          <div className="rel-foot">
            <a href="https://github.com/salihcaan/odak.fyi/releases/latest/download/Odak.dmg">
              Download Odak
            </a>
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
