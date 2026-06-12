import { useState } from "react";
import { Aurora } from "@/components/site/Aurora";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { captureEvent } from "@/lib/analytics";
import {
  PACKS,
  packDeepLink,
  packUrl,
  type Pack,
  type PackAction,
} from "@/lib/packs";

const MOD_GLYPHS: Record<string, string> = {
  cmd: "⌘",
  shift: "⇧",
  alt: "⌥",
  opt: "⌥",
  ctrl: "⌃",
  enter: "↩",
  return: "↩",
};

function Keycaps({ shortcut }: { shortcut: string }) {
  return (
    <span className="pack-keys" aria-label={`Shortcut ${shortcut}`}>
      {shortcut.split("+").map((part, i) => (
        <kbd key={i}>{MOD_GLYPHS[part] ?? part.toUpperCase()}</kbd>
      ))}
    </span>
  );
}

function ActionRow({ action }: { action: PackAction }) {
  const isChainTarget = action.shortcut === "";
  return (
    <li className={isChainTarget ? "pack-action chained" : "pack-action"}>
      <span className="pack-action-name">
        {isChainTarget && (
          <span className="chain-arrow" aria-hidden="true">
            ↳
          </span>
        )}
        {action.name}
      </span>
      {isChainTarget ? (
        <span className="pack-chain-tag">on select</span>
      ) : (
        <Keycaps shortcut={action.shortcut} />
      )}
    </li>
  );
}

function PackCard({ pack }: { pack: Pack }) {
  const [showJson, setShowJson] = useState(false);
  const bound = pack.actions.filter((a) => a.shortcut !== "").length;
  return (
    <article className="pack" id={pack.slug}>
      <header className="pack-head">
        <span className="pack-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
            <path d={pack.icon.path} />
          </svg>
        </span>
        <h2 className="pack-title">{pack.title}</h2>
        <span className="pack-count">
          {bound} action{bound === 1 ? "" : "s"}
        </span>
      </header>
      <p className="pack-tagline">{pack.tagline}</p>
      <ul className="pack-actions">
        {pack.actions.map((a) => (
          <ActionRow key={a.name} action={a} />
        ))}
      </ul>
      {(pack.appearsIn || pack.requires) && (
        <p className="pack-note">
          {[pack.appearsIn, pack.requires].filter(Boolean).join(" · ")}
        </p>
      )}
      <div className="pack-cta">
        <a
          className="pack-add"
          href={packDeepLink(pack.slug)}
          onClick={() => captureEvent("pack_import_clicked", { pack: pack.slug })}
        >
          Add to Odak
        </a>
        <button
          type="button"
          className="pack-view"
          aria-expanded={showJson}
          onClick={() => setShowJson((v) => !v)}
        >
          {showJson ? "Hide JSON" : "View JSON"}
        </button>
        <a className="pack-raw" href={`/packs/${pack.slug}.json`} target="_blank" rel="noopener">
          Raw
        </a>
      </div>
      {showJson && (
        <pre className="pack-json">
          <code>{JSON.stringify({ actions: pack.actions }, null, 2)}</code>
        </pre>
      )}
    </article>
  );
}

export function ActionsMarket() {
  return (
    <>
      <Aurora />
      <Nav currentPath="/actions" />
      <main>
        <div className="market-head">
          <div className="eyebrow">Marketplace</div>
          <h1>Actions for Odak</h1>
          <p className="lede">
            Curated packs of shortcuts that fire on whatever project you have
            selected — open the PR, restart the container, switch the branch.
            One click to import, yours to edit.
          </p>
          <p className="meta">
            Imports land in <code>~/.odak/config.yaml</code> · Read the{" "}
            <a href="/docs/actions.html">Actions docs</a> · Powered by{" "}
            <code>odak://import</code>
          </p>
        </div>

        <ol className="market-how" aria-label="How importing works">
          <li>
            <span className="how-step">01</span>
            <strong>Click “Add to Odak”.</strong> The pack opens in Odak via
            its URL scheme — <a href="/">download Odak</a> first if you
            haven’t.
          </li>
          <li>
            <span className="how-step">02</span>
            <strong>Review, then confirm.</strong> Odak lists every action in
            the pack — script actions are flagged — and writes nothing until
            you approve.
          </li>
          <li>
            <span className="how-step">03</span>
            <strong>Make it yours.</strong> Actions append to your{" "}
            <code>config.yaml</code>. Rebind shortcuts or tweak scripts in any
            editor; Odak reloads on save.
          </li>
        </ol>

        <div className="pack-grid">
          {PACKS.map((p) => (
            <PackCard key={p.slug} pack={p} />
          ))}
        </div>

        <div className="subscribe">
          <p style={{ margin: 0 }}>
            <strong>Built a pack worth sharing?</strong> Any URL that serves
            action JSON or YAML imports the same way (YAML needs the latest
            Odak) — host yours on a Gist and share{" "}
            <code>odak://import?url=…</code>. Want it listed here? Send it to{" "}
            <a href="mailto:hello@odak.fyi">hello@odak.fyi</a>. The{" "}
            <a href="/docs/actions.html">docs</a> cover the full schema —
            variables, conditions, list overlays, and chaining. For example,
            see the <a href={packUrl("git")}>Git pack</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
