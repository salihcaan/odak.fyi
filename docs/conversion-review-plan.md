# Conversion review — handoff plan

Picks up where we stopped on the previous machine. The full review (with rationale) is in chat history; this doc is the actionable residue.

Confirmed constraints:
- macOS 26 Tahoe minimum stays — required for Liquid Glass UI.
- The `.odak` factual question is still **open** (see §4).

---

## Pass 1 — copy-only (DONE, committed)

Landed in `index.html`:

- Hero pill: dropped `preview` framing → tag is now `v0.1` + "Built for macOS 26 Tahoe".
- Hero H1: `Any project.` → `Any repo.`
- Hero subhead: name-drops Cursor / VS Code / IntelliJ / Xcode + tightens to "type three letters".
- Primary CTA: `Download for Mac` → `Try free for 14 days`.
- Hero fine print: leads with `14-day trial · no card`, then OS / arch / no-telemetry.
- MacBook section eyebrow: `In situ` → `On your desktop`.
- F1 headline: `Five letters or less` → `In three letters` (resolves the body-copy contradiction).
- F1 bullets: added **Frecency, not alphabetical** + **Dirty-state badges** (was 1 bullet, now 3).
- F2 bullets: added **Most recent, first** + **Event-driven, not polled** (was 1 bullet, now 3).
- F3 headline word swap: `checked into the repo` → `shipped with the repo`.
- Positioning H2: `Not a launcher. Not a window switcher.` → `Why not just use Raycast?`
- Pricing H2: `One price. Yours.` → `$15. Once. Yours.`

### Concurrent-edit regression to inspect

While I was editing, the working tree also had your concurrent edits. My edits read a short version of two passages and re-wrote them as short, when origin/main had a longer version you had not yet committed. Specifically, my commit may have reverted:

- **F1 lead** — your better version was: *"Every trip through Finder is a broken thought. Every dock-bounce is a thread lost. Hit ⌥ Space, type three letters, land in the right repo — your focus stays on the problem, not on hunting for the folder."*
- **F2 bullet 1** — your better version was: *"Cursor, VS Code, Xcode, IntelliJ, GoLand, RubyMine, Zed, Sublime, terminals, and Chrome tabs tied to a localhost preview — all in one place."*

On the new machine, run:
```bash
git -C ~/code/odak.fyi log --oneline -5 -- index.html
git -C ~/code/odak.fyi show <prev-commit-sha>:index.html | grep -A2 "broken thought"
```
…and decide whether to reinstate either version. They're both good — your longer F1 lead in particular is a stronger emotional opener than what's in the file now.

### Pricing aside — almost done, didn't ship

Final piece of Pass 1 was promoting the "fifteen seconds" line. Currently in `index.html` (search for `fifteen seconds`):

```html
<h3>Bought once. <span class="accent">Loved forever.</span></h3>
<p>Developers pay for tools that earn their place on the keyboard. We don't think that relationship should renew every month.</p>
<p>If Odak saves you the fifteen seconds it takes to hunt down a project twenty times a day, it pays for itself in a week.</p>
```

Recommended replacement:

```html
<h3>Pays for itself <span class="accent">in a week.</span></h3>
<p class="lead">Save fifteen seconds hunting for the right window, twenty times a day. Do the math.</p>
<p>Developers pay for tools that earn their place on the keyboard. We don't think that relationship should renew every month.</p>
```

Why: H2 above already says `$15. Once. Yours.`, so `Bought once. Loved forever.` is redundant. Promoting the fifteen-seconds line gives the aside its own emotional hook (ROI), and demotes the philosophical paragraph to supporting copy.

Note: the styling for `.lead` on a `<p>` inside `.price-aside` may need a quick CSS check — currently `.lead` is scoped to `.f-copy`. Either reuse those styles or inline a slightly larger, accented font-size.

---

## Pass 2 — structural additions (NOT STARTED)

Adds new DOM. Order them by impact:

### 2a. FAQ section (highest impact — answers buying objections)

Insert as a new `<section class="block" id="faq">` between `#pricing` and the footer. Six Q&A in two columns. Suggested questions + answers:

| Q | A |
|---|---|
| **Will this run on my Mac?** | macOS 26 Tahoe or later, on Apple Silicon and Intel. The Liquid Glass UI relies on macOS 26 APIs that don't backport. |
| **I already use Raycast / Spotlight — why this?** | Raycast knows apps and commands, not repos. Spotlight indexes everything, which means it indexes nothing well. Odak only knows projects — it sees which editors have them open and what each repo wants you to do next. |
| **Which editors does it support?** | Cursor, VS Code, IntelliJ IDEA, GoLand out of the box. Xcode and any other editor via a one-line bundle ID in Settings. Terminals and Chrome localhost tabs are tracked too. |
| **What's in the `.odak` file?** | *(see §4 — depends on the answer to the factual question)* |
| **What happens after the 14-day trial?** | The trial unlocks every feature. After 14 days, you choose: $15 once, or stop using it. No card, no cancellation flow. |
| **Refunds?** | 30 days, no questions. Email support@odak.fyi. *(link to /refund.html)* |

Add a nav link `<a href="#faq">FAQ</a>` to the nav-links div.

### 2b. Trust badges on the hero CTA area

Under the hero CTAs (above or below `.hero-fine`), add a small horizontal strip:

```html
<div class="hero-trust">
  <span class="trust-seal">Apple-notarized</span>
  <span class="trust-seal">Sandboxed</span>
  <span class="trust-seal">No telemetry</span>
</div>
```

Reuse the `.seal` styles from the pricing section (`.seals .seal`) or hoist them into a shared rule. Removes the "is this DMG safe?" friction at the moment the user is hovering the download button.

### 2c. Social-proof slot under hero (placeholder until you have a quote)

If no real quote yet, ship a metric-style slot that's truthful and specific: e.g. "Built and used by developers across 4 stacks daily — Swift, TypeScript, Go, Python." Under hero or under the MacBook section. Even a placeholder count beats nothing — but **don't fabricate user counts**. If nothing is honest yet, skip 2c until launch.

### 2d. Refund link in pricing card

In the pricing card's fine print line:

```html
<p class="price-fine">One-time payment · instant activation · Sparkle auto-updates · <a href="/refund.html">30-day refund</a></p>
```

Tiny text, huge psychological lift.

---

## Pass 3 — needs decisions

### `.odak` file factual concern (BLOCKING for F3 polish)

Landing currently claims (Feature 3, around the `.odak` TOML mockup):

> Drop a `.odak` file and they collapse into one keypress.

Backed up by a TOML mockup with `[actions.deploy]`, `[actions.pr]`, `[actions.logs]` blocks.

Reality per `~/code/odak/README.md`:

- Per-project `.odak` is **JSON**, not TOML.
- Per-project `.odak` only holds `ide` + `variables` — **no actions**.
- Actions live globally in `~/.odak/config.yaml`.

Two ways forward:

- **Option A — ship reality.** Rewrite F3 to honestly split the two ideas: per-project IDE pinning + variables in `.odak`, and custom actions globally in `~/.odak/config.yaml`. Mockup shows the JSON `.odak` next to a global actions panel. Less punchy headline but no refund risk.
- **Option B — ship the promise.** The landing's framing (per-project actions checked into the repo) is the better product story and a real competitive moat — teammates clone, get the bindings instantly. Build the feature, then leave the page as-is.

Decision required from you on the new machine before I touch F3.

### macOS 26 minimum (RESOLVED)

Stays. Confirmed it's required for Liquid Glass UI. No copy change needed beyond what's already shipped.

---

## How to resume on the new machine

```bash
cd ~/code/odak.fyi
git pull origin main
# 1) Decide whether to reinstate the regressed F1 lead / F2 bullet 1 (above)
# 2) Apply the pricing-aside rewrite (above) — that finishes Pass 1
# 3) Pass 2 — start with FAQ (2a), it's the biggest conversion lift
# 4) Tell Claude on the new machine: "continue conversion-review-plan.md"
#    and answer the .odak Option A/B question
```
