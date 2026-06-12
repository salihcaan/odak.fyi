import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { usePageEnter } from "@/components/site/PageEnter";

// Two URL surfaces:
//   /buy        live Polar. If VITE_POLAR_LIVE_URL is empty, /buy
//                 renders a pre-launch holding state and never falls
//                 back to sandbox. Real customers must not be able to
//                 mistake a test flow for a real purchase.
//   /buy-stage  sandbox Polar, always. Linked from Debug builds for
//                 QA. If VITE_POLAR_SANDBOX_URL is empty, /buy-stage
//                 also shows the prelaunch state.
//
// Both URLs come from the Polar dashboard (Products  Checkout Links).
// The link's success_url is configured server-side to point at
// /buy?success=1 so Polar redirects there after a completed checkout.
const LIVE_CHECKOUT_URL: string =
  import.meta.env.VITE_POLAR_LIVE_URL ?? "";
const SANDBOX_CHECKOUT_URL: string =
  import.meta.env.VITE_POLAR_SANDBOX_URL ?? "";
const POLAR_EMBED_SDK =
  "https://cdn.jsdelivr.net/npm/@polar-sh/checkout@latest/dist/embed.global.js";

type PolarEmbedCheckoutInstance = { close: () => void };
type PolarEmbedCheckout = {
  create: (
    url: string,
    opts?: { theme?: "light" | "dark" },
  ) => Promise<PolarEmbedCheckoutInstance>;
};
declare global {
  interface Window {
    Polar?: { EmbedCheckout: PolarEmbedCheckout };
  }
}

function loadPolar(): Promise<PolarEmbedCheckout> {
  if (window.Polar?.EmbedCheckout)
    return Promise.resolve(window.Polar.EmbedCheckout);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${POLAR_EMBED_SDK}"]`,
    );
    const script = existing ?? document.createElement("script");
    if (!existing) {
      script.src = POLAR_EMBED_SDK;
      script.defer = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () => {
      if (window.Polar?.EmbedCheckout) resolve(window.Polar.EmbedCheckout);
      else reject(new Error("Polar loaded but window.Polar.EmbedCheckout missing"));
    });
    script.addEventListener("error", () =>
      reject(new Error("Failed to load Polar checkout SDK")),
    );
  });
}

// Single checkmark used in the benefits list. Same SVG shape as the
// home pricing card so the eye reads the two surfaces as one product.
function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8l3 3 7-7" />
    </svg>
  );
}

// Compact spinner glyph for the Continue button while the Polar SDK
// is still loading. Sized to sit inline with the button label.
function Spinner() {
  return (
    <svg
      className="buy-spinner"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity=".25" />
      <path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Buy() {
  const { item } = usePageEnter();
  const [view, setView] = useState<"form" | "success" | "prelaunch">("form");
  const [email, setEmail] = useState("");
  const [isStage, setIsStage] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const polarRef = useRef<PolarEmbedCheckout | null>(null);

  useEffect(() => {
    const stage = window.location.pathname === "/buy-stage";
    setIsStage(stage);
    const liveReady = !!LIVE_CHECKOUT_URL;
    const stageReady = !!SANDBOX_CHECKOUT_URL;

    // Pre-launch on public /buy: no Polar init at all. Defense against
    // silent sandbox checkouts confusing real customers between site
    // deploy and live URL wire-in.
    if (!stage && !liveReady) {
      setView("prelaunch");
      return;
    }
    if (stage && !stageReady) {
      setView("prelaunch");
      return;
    }

    // Pre-fill email from ?email= and show success on ?success=1 (Polar
    // redirects to the link's configured success_url after completion).
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) setEmail(emailParam);
    if (params.get("success") === "1") {
      setView("success");
      history.replaceState(null, "", window.location.pathname);
    }

    let cancelled = false;
    loadPolar()
      .then((Polar) => {
        if (cancelled) return;
        polarRef.current = Polar;
        setSdkReady(true);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
        setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // No pointer-tracked tilt here on purpose. The price card is the
  // checkout surface — a cursor-following 3D rotation made the Continue
  // button a moving target as the pointer approached it. The card now
  // sits solid; all the "premium" energy comes from the static accent
  // ring, top edge, and glass sheen in buy.css instead.

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const Polar = polarRef.current;
    if (!Polar) return;
    const value = email.trim();
    if (!value) return;
    const useLive = !isStage && !!LIVE_CHECKOUT_URL;
    const baseUrl = useLive ? LIVE_CHECKOUT_URL : SANDBOX_CHECKOUT_URL;
    const url = new URL(baseUrl);
    url.searchParams.set("customer_email", value);
    Polar.create(url.toString(), { theme: "dark" });
  };

  const showLoadErrorCard = view === "form" && loadError;
  const buttonDisabled = !sdkReady;

  return (
    <>
      <div className="buy-ambient" aria-hidden="true">
        <div className="buy-ambient-grid" />
        <div className="buy-ambient-glow" />
      </div>
      <Nav currentPath="/buy" />
      <motion.main
        className="buy-main"
        variants={item(0.05)}
        initial="hidden"
        animate="show"
      >
        <header className="section-head">
          <div className="eyebrow">Checkout</div>
          <h1 className="section-h">
            $19. Once. <span className="accent">Yours.</span>
          </h1>
          <p className="section-sub">
            No seats, no subscription, no upgrade fees. Pay once, keep it
            forever.
          </p>
        </header>

        {isStage && (
          <div className="env-banner" role="note">
            <span className="env-banner-tag">Sandbox</span>
            <span>
              Test checkout, no real charge. Use any test card; activation
              codes only work in stage builds of Odak.
            </span>
          </div>
        )}

        <div className="checkout-grid">
          {view === "form" && !showLoadErrorCard && (
            <article className="price-card">
              <div className="head-row">
                <span className="tier">One-time</span>
                <span className="trial-badge">14 days free</span>
              </div>

              <div className="amount">
                <span className="curr">$</span>19
                <span className="per">once</span>
              </div>

              <ul className="benefits">
                <li>
                  <Check />
                  <span>
                    <b>Every feature, unlocked.</b> No pro tier, no add-ons.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    Activates on <b>up to 3 Macs</b>: desktop, laptop, work
                    machine.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    Updates and security patches, <b>free forever</b>.
                  </span>
                </li>
              </ul>

              <form className="checkout-form" onSubmit={onSubmit}>
                <label className="field">
                  <span className="field-label">Email</span>
                  <input
                    id="email-input"
                    type="email"
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <button
                  id="checkout-btn"
                  className="buy"
                  type="submit"
                  disabled={buttonDisabled}
                  aria-busy={buttonDisabled}
                >
                  {buttonDisabled ? (
                    <>
                      <Spinner />
                      Loading checkout
                    </>
                  ) : (
                    <>
                      Continue to checkout
                      <span className="arrow" aria-hidden="true">
                        <svg viewBox="0 0 12 12">
                          <path d="M3 6h6m-3-3l3 3-3 3" />
                        </svg>
                      </span>
                    </>
                  )}
                </button>
              </form>

              <p className="price-fine">
                Instant activation · Sparkle auto-updates ·{" "}
                <a href="/refund">14-day refund</a>
              </p>
            </article>
          )}

          {view === "form" && showLoadErrorCard && (
            <article
              id="load-error-state"
              className="price-card state error-state"
              role="alert"
              aria-live="assertive"
            >
              <div className="state-icon error">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M12 8v5M12 16.5v.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
              <h2>Checkout couldn't load.</h2>
              <p className="state-lead">
                Refresh the page, or buy directly by emailing us. We'll send
                a payment link by reply.
              </p>
              <a
                className="buy"
                href="mailto:support@odak.fyi?subject=Buy%20Odak"
              >
                Email support@odak.fyi
                <span className="arrow" aria-hidden="true">
                  <svg viewBox="0 0 12 12">
                    <path d="M3 6h6m-3-3l3 3-3 3" />
                  </svg>
                </span>
              </a>
              <p className="price-fine">
                Reply usually within 4 hours during weekdays.
              </p>
            </article>
          )}

          {view === "success" && (
            <article
              id="success-state"
              className="price-card state success-state"
              role="status"
              aria-live="polite"
            >
              <div className="state-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7" />
                </svg>
              </div>
              <h2>You're set.</h2>
              <p className="state-lead">
                Your license is one click away. Here's how to grab it.
              </p>

              <ol className="success-steps">
                <li>
                  <span className="step-num">1</span>
                  <div className="step-body">
                    Open the email from{" "}
                    <strong>Odak (via Polar)</strong>.
                  </div>
                </li>
                <li>
                  <span className="step-num">2</span>
                  <div className="step-body">
                    Click the{" "}
                    <span className="email-cta-mock">Access purchase</span>{" "}
                    button.
                  </div>
                </li>
                <li>
                  <span className="step-num">3</span>
                  <div className="step-body">
                    Copy your license, then paste it into Odak →{" "}
                    <strong>Settings → License</strong>.
                  </div>
                </li>
              </ol>

              <p className="price-fine">
                Email lands in about a minute. Don't see it? Check spam, then{" "}
                <a href="mailto:support@odak.fyi">email support</a>.
              </p>
            </article>
          )}

          {view === "prelaunch" && (
            <article
              id="prelaunch-state"
              className="price-card state prelaunch-state"
              role="status"
              aria-live="polite"
            >
              <span className="prelaunch-tag">14 days free</span>
              <h2>Try it free, today.</h2>
              <p>
                Every feature is unlocked during the trial. No credit card.
                Purchases open in a few weeks; we'll email when they do.
              </p>
              <a
                className="buy"
                href="https://github.com/salihcaan/odak.fyi/releases/latest/download/Odak.dmg"
              >
                Download free trial
                <span className="arrow" aria-hidden="true">
                  <svg viewBox="0 0 12 12">
                    <path d="M3 6h6m-3-3l3 3-3 3" />
                  </svg>
                </span>
              </a>
              <p className="prelaunch-fine">
                macOS 15+ · Apple Silicon · 8&nbsp;MB
              </p>
            </article>
          )}

          {view === "form" && (
            <aside className="price-aside">
              <h3>
                What happens <span className="accent">next.</span>
              </h3>
              <ol className="next-steps">
                <li>
                  <span className="step-num">1</span>
                  <div>
                    <b>Pay with Polar.</b>
                    <span>Apple Pay or any card. Takes about 30 seconds.</span>
                  </div>
                </li>
                <li>
                  <span className="step-num">2</span>
                  <div>
                    <b>Email lands in your inbox.</b>
                    <span>
                      From <i>Odak (via Polar)</i>, with an{" "}
                      <i>Access&nbsp;purchase</i> button that opens your
                      license.
                    </span>
                  </div>
                </li>
                <li>
                  <span className="step-num">3</span>
                  <div>
                    <b>Paste into Odak.</b>
                    <span>Settings → License. Unlocks up to 3 Macs.</span>
                  </div>
                </li>
              </ol>
              <div className="seals">
                <span className="seal">Hardened runtime</span>
                <span className="seal">Apple Silicon</span>
                <span className="seal">Anonymous telemetry</span>
              </div>
              <p className="fine">
                Secure checkout by <strong>Polar</strong> ·{" "}
                <a href="/refund">Refund policy</a> · <a href="/terms">Terms</a> ·{" "}
                <a href="/privacy">Privacy</a>
              </p>
            </aside>
          )}

          {view === "success" && (
            <aside className="price-aside">
              <h3>
                Need <span className="accent">help?</span>
              </h3>
              <p className="aside-lead">
                Email lands in about a minute. If it doesn't arrive, or
                anything else looks off, write to us.
              </p>
              <a
                className="aside-mail"
                href="mailto:support@odak.fyi"
              >
                support@odak.fyi
              </a>
              <p className="aside-sub">
                Replies usually within 4 hours during weekdays.
              </p>
              <div className="seals">
                <span className="seal">Hardened runtime</span>
                <span className="seal">Apple Silicon</span>
                <span className="seal">Anonymous telemetry</span>
              </div>
              <p className="fine">
                <a href="/refund">Refund policy</a> ·{" "}
                <a href="/terms">Terms</a> ·{" "}
                <a href="/privacy">Privacy</a>
              </p>
            </aside>
          )}

          {view === "prelaunch" && (
            <aside className="price-aside">
              <h3>
                What you'll <span className="accent">get.</span>
              </h3>
              <ol className="next-steps">
                <li>
                  <span className="step-num">1</span>
                  <div>
                    <b>One-time price, $19.</b>
                    <span>No subscription, no renewal, no upgrade fees.</span>
                  </div>
                </li>
                <li>
                  <span className="step-num">2</span>
                  <div>
                    <b>Up to 3 Macs per license.</b>
                    <span>Desktop, laptop, work machine. Same license.</span>
                  </div>
                </li>
                <li>
                  <span className="step-num">3</span>
                  <div>
                    <b>Updates, free forever.</b>
                    <span>
                      Security patches and new features keep arriving for as
                      long as you use it.
                    </span>
                  </div>
                </li>
              </ol>
              <div className="seals">
                <span className="seal">Hardened runtime</span>
                <span className="seal">Apple Silicon</span>
                <span className="seal">Anonymous telemetry</span>
              </div>
              <p className="fine">
                Try the full app today. <a href="https://github.com/salihcaan/odak.fyi/releases/latest/download/Odak.dmg">Download the trial →</a>
              </p>
            </aside>
          )}
        </div>

        <section className="faq-buy" id="faq-buy" aria-labelledby="faq-buy-head">
          <header className="faq-buy-head">
            <span className="eyebrow">Buyer questions</span>
            <h2 id="faq-buy-head" className="faq-buy-h">
              Before you <span className="accent">click buy.</span>
            </h2>
          </header>
          <div className="faq-buy-grid">
            <details className="faq-buy-item">
              <summary>
                <span className="faq-ic" aria-hidden="true">
                  <svg viewBox="0 0 12 12"><path d="M6 2v8M2 6h8" /></svg>
                </span>
                <span className="faq-q">What does the 3-Mac license cover?</span>
              </summary>
              <p>
                Up to 3 Macs you personally use: desktop, laptop, work machine.
                Each activation ties to a hardware fingerprint; revoke from{" "}
                <strong>Settings → License</strong> if you sell or replace a
                Mac. No concurrent-use restriction.
              </p>
            </details>

            <details className="faq-buy-item" open={view === "success"}>
              <summary>
                <span className="faq-ic" aria-hidden="true">
                  <svg viewBox="0 0 12 12"><path d="M6 2v8M2 6h8" /></svg>
                </span>
                <span className="faq-q">How does the 14-day refund work?</span>
              </summary>
              <p>
                Email <a href="mailto:support@odak.fyi">support@odak.fyi</a>{" "}
                within 14 days. No form, no questions. Refund posts via Polar
                in 5 to 10 business days. After 14 days, refunds are case by
                case.
              </p>
            </details>

            <details className="faq-buy-item">
              <summary>
                <span className="faq-ic" aria-hidden="true">
                  <svg viewBox="0 0 12 12"><path d="M6 2v8M2 6h8" /></svg>
                </span>
                <span className="faq-q">
                  What happens after the 14-day trial?
                </span>
              </summary>
              <p>
                The app keeps working in a read-only mode: project switching
                still functions, but new actions need a paid license. Your{" "}
                <code>.odak</code> files and global config stay untouched, so
                paying later picks up where you left off.
              </p>
            </details>

            <details className="faq-buy-item">
              <summary>
                <span className="faq-ic" aria-hidden="true">
                  <svg viewBox="0 0 12 12"><path d="M6 2v8M2 6h8" /></svg>
                </span>
                <span className="faq-q">
                  Apple Pay, cards, EU VAT?
                </span>
              </summary>
              <p>
                Apple Pay, Google Pay, and major cards (Visa, Mastercard,
                Amex). Polar handles VAT and GST for EU and UK buyers
                automatically; the receipt itemizes the tax. Seller of record
                on your statement is <strong>Polar Software, Inc.</strong>, not Odak.
              </p>
            </details>

            <details className="faq-buy-item">
              <summary>
                <span className="faq-ic" aria-hidden="true">
                  <svg viewBox="0 0 12 12"><path d="M6 2v8M2 6h8" /></svg>
                </span>
                <span className="faq-q">
                  Where does my payment info go?
                </span>
              </summary>
              <p>
                Card details never touch Odak's servers. Polar processes the
                payment end to end (PCI-DSS Level 1). Odak receives your
                email, country code, and the license token Polar issues.
                Nothing else.
              </p>
            </details>

          </div>
        </section>
      </motion.main>
      <Footer />
    </>
  );
}
