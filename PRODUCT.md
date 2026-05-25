# Product

## Register

brand

## Users

Senior and mid-career macOS developers on Apple Silicon who run multiple editors (VS Code, Cursor, Xcode, IntelliJ family, Zed, Neovim) and switch projects dozens of times per day. They land on odak.fyi from HN, Twitter/X, developer Slack, or a referral. Context: evaluating productivity tooling, often comparing against Raycast, Alfred, or a homegrown shell script. They scan, they don't read, and they want to see the keystroke flow working in under five seconds.

Job to be done: decide within one scroll whether Odak removes a real papercut from their day, and convert (download trial or buy) without being talked down to.

## Product Purpose

odak.fyi is the marketing surface for Odak, a keyboard-driven project launcher for macOS 26 Tahoe. The site has to do three things: prove the two-keystroke claim visually, communicate craft (because the audience judges tools by their websites), and convert serious developers to the 14-day trial or paid license. Success is measured in trial starts and paid conversions on /buy, not vanity traffic.

## Brand Personality

Sharp, cinematic, premium. Voice is terse and expert: drop hype adjectives, lead with the specific (⌥ Space, macOS 26 Tahoe, Apple Silicon). Tone is confident enough to stop selling and just show the tool. Emotional goal: the visitor feels they've found a tool made by someone who shares their taste.

References (in the right lane): Raycast, Linear, Cron, Things, Vercel for craft and category fit. Stripe, Arc, and the Things press kit for editorial typography and content-forward layouts over card grids.

## Anti-references

- Generic SaaS hero-metric template (big number + small label + supporting stats). Banned.
- Identical card grids of icon + heading + paragraph for features. Banned.
- Neon-on-black, terminal-green-on-black, glitch effects, "cyber" developer-tool cosplay. The amber-on-warm-dark palette is the antidote; keep it that way.
- Purple-to-cyan gradients, gradient text, glassmorphism-as-default.
- Marketing-voice copy: "supercharge your workflow", "unlock productivity", "10x your day". Cut on sight.

## Design Principles

1. **Practice what you preach.** Odak is a fast keyboard tool. The site must feel fast, keyboard-navigable, and free of bloat. No heavy hero videos that block paint, no scroll-jacked sections that hijack arrow keys, no animation that runs while the tab is backgrounded. Lighthouse performance is a brand metric, not a chore.

2. **Show, don't tell.** Every concrete claim earns a visual proof point. "Two keystrokes" → an animated keystroke demo. "Works across every editor" → the IDE marquee with real logos. "Switch to the open window" → real switching footage in the MacBook carousel. If a claim cannot be shown, cut the claim before you cut the demo.

3. **Expert confidence, not marketing voice.** Write for the senior macOS developer evaluating their next tool. Specific beats vague: "macOS 26 Tahoe · Apple Silicon" beats "modern Macs", and "⌥ Space, type, ↵" beats "lightning-fast access". No exclamation marks, no "amazing", no em dashes (use commas, colons, semicolons, or periods).

These three principles compose, they don't trade off. A bolder visual choice that fails the performance principle is wrong even if it shows more. Marketing voice that compresses a long demo into a slogan is wrong even if it ships faster.

## Accessibility & Inclusion

- **WCAG 2.2 AA** on body text and interactive elements (4.5:1 contrast minimum on body, 3:1 on large display type).
- **`prefers-reduced-motion`** is honored everywhere; the `Index.tsx` `enter()` helper already does this, and the pattern is mandatory for any new motion work.
- **Visible focus rings** on every interactive element. No `outline: none` without a styled replacement.
- **Keyboard navigation** end-to-end (the site is selling a keyboard tool, so failing keyboard nav here is brand suicide).
- macOS 26 + Apple Silicon is the *product* requirement, not a site requirement. The marketing site must remain readable on any modern browser including iPhone Safari, where most "found on Twitter" traffic lands.
