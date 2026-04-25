# Paddle Integration Plan

> Status: Phase 1 complete (legal pages live). Phases 2–5 pending.
> Last updated: 2026-04-25

## Context

Odak is sold for $15 one-time on `odak.fyi`. Today the "Buy" CTA in the pricing
section just downloads the DMG from GitHub Releases — there is no real
checkout, no license enforcement, no activation. We're switching to **Paddle**
as Merchant of Record so we can charge globally, handle VAT/sales tax, and
ship a proper purchase flow.

Why Paddle (vs Stripe / Gumroad / Lemon Squeezy):

- **Merchant of Record.** Paddle handles tax remittance worldwide. As a sole
  proprietor in Türkiye, this removes a meaningful compliance burden.
- **Native macOS / indie ecosystem fit.** Sparkle integrations and license
  delivery patterns are well-documented.
- **Overlay checkout.** The buyer never leaves `odak.fyi`.

## Paddle's domain-verification requirements

Paddle requires the seller's domain to expose:

- Live site on HTTPS — already in place.
- Clear product description — already on `index.html`.
- Pricing page — already on `index.html#pricing`.
- Features list — already on `index.html#features`.
- **Terms & Conditions** with seller's legal/brand name — added in Phase 1.
- **Refund Policy** — added in Phase 1.
- **Privacy Policy** — added in Phase 1.
- All three reachable from site navigation (footer is fine) — wired in Phase 1.

Source:
[paddle.com/help/start/account-verification/what-is-domain-verification](https://www.paddle.com/help/start/account-verification/what-is-domain-verification).

## Phase 1 — Legal pages ✅

**Status: complete.**

Added at the root of the site, sharing the design tokens of `index.html`:

- `privacy.html` — what we collect on the site, in the app, and via Paddle.
  Honest claims of zero analytics / zero telemetry. Covers Sparkle update
  pings, Google Fonts, Paddle's role.
- `terms.html` — sole proprietor (Hasan Salih Can) in Istanbul, Türkiye.
  Paddle named as MoR. License grant: 3 Macs, 24 months free updates,
  perpetual use of installed version after that. Governing law: Türkiye,
  Istanbul courts.
- `refund.html` — 14-day, no-questions-asked. Buyers can email us or use
  paddle.net directly. Statutory consumer rights preserved.

Footer of `index.html` updated to link all three.

**Defaults that may need tweaking later:**

- Refund window is 14 days. Some indie devs prefer 30.
- Both `support@odak.fyi` and `hello@odak.fyi` must actually deliver mail
  before Paddle's review.
- Privacy claims must stay honest if analytics are ever added.

## Phase 2 — Paddle account & domain verification

**Owner: manual (Hasan Salih Can).**

1. Sign up at paddle.com as **sole proprietor** with full legal name,
   country (Türkiye), and bank details.
2. Submit `odak.fyi` for domain verification once Phase 1 is deployed.
3. Create the Odak product in the Paddle dashboard at $15 one-time.
4. Configure receipt-email links: T&C → `/terms.html`, refund →
   `/refund.html`, support → `support@odak.fyi`.

ETA: review typically takes 1–3 business days.

## Phase 3 — Checkout integration

**Static-site friendly. Two viable approaches:**

| Option              | Pros                                    | Cons                                |
| ------------------- | --------------------------------------- | ----------------------------------- |
| Paddle.js overlay   | Buyer stays on `odak.fyi`; native feel  | ~5 KB of third-party JS on the page |
| Hosted checkout URL | Zero JS; just a link                    | Redirects buyer off-site            |

**Recommendation: Paddle.js overlay.**

Implementation:

- Drop `<script src="https://cdn.paddle.com/paddle/v2/paddle.js"></script>` on
  `index.html`.
- Replace the current `Buy` CTA `href` with an overlay-trigger via
  `Paddle.Checkout.open({ items: [{ priceId: '...' }] })`.
- Add a secondary `Free 14-day trial` CTA that keeps the GitHub-Releases DMG
  link.

## Phase 4 — Licensing in the macOS app

**The biggest hidden chunk.** Today the "buy" path is unenforced — anyone can
download the DMG. We need:

1. **License key system in `~/code/odak`.** Generate, validate, store in
   Keychain. Decision: online activation (worker call on launch) vs offline
   Ed25519-signed keys. Lean toward **offline-signed** to honor the
   "no telemetry" badge on the marketing page.
2. **Paddle webhook receiver.** A tiny Cloudflare Worker (the repo already
   has a `worker/` directory) that listens for `transaction.completed`, mints
   a signed license, and emails it to the buyer.
3. **Trial countdown UI.** App tracks 14-day trial; flips to "buy" state when
   the trial expires; offers an "Enter license" UI to activate.
4. **Receipts inbox automation.** Order confirmation email links to T&C,
   refund policy, support, and Paddle.

## Phase 5 — Site polish for launch

- Pricing CTA → dual buttons: `Buy $15` (Paddle overlay) + `Free 14-day trial`
  (DMG).
- Add small "Powered by Paddle · Tax calculated at checkout" copy near the
  buy button.
- Verify all three policy pages are reachable from `index.html` footer (done
  in Phase 1, just re-check after any redesign).

## Suggested order

1. Phase 1 (legal) — done.
2. Phase 4 (licensing) — biggest piece. Land before Paddle goes live so we
   aren't selling unenforceable downloads.
3. Phase 2 + 3 (Paddle account + checkout) — quick once licensing exists.
4. Phase 5 (site polish) — last.

## Open questions / risks

- **Domain hosting.** Confirm that whichever host serves `odak.fyi` (GitHub
  Pages? Vercel? Cloudflare Pages?) auto-serves new sibling files. All three
  major hosts do, but worth a 30-second test.
- **Tax / income reporting in Türkiye.** Paddle handles consumption taxes
  globally; we still owe local income tax on payouts. Out of scope for this
  doc — talk to an accountant.
- **Refund window vs trial overlap.** With a 14-day trial AND a 14-day
  refund, buyers effectively get up to 28 days of access. Acceptable
  trade-off for trust; revisit if abused.

## Reference links

- [Paddle domain verification](https://www.paddle.com/help/start/account-verification/what-is-domain-verification)
- [Paddle seller handbook](https://www.paddle.com/seller-guides/seller-handbook)
- [Paddle buyer terms (MoR role)](https://www.paddle.com/legal/checkout-buyer-terms)
- [Paddle privacy](https://www.paddle.com/legal/privacy)
- [Paddle buyer refunds FAQ](https://www.paddle.com/help/manage/your-customers/buyers-refunds)
