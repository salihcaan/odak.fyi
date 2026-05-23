import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { usePageEnter } from "@/components/site/PageEnter";

// Two URL surfaces:
//   /buy        → live Polar. Until LIVE_CHECKOUT_URL is wired in, /buy renders
//                  a pre-launch holding state and never falls back to sandbox —
//                  real customers must not be able to mistake a test flow
//                  for a real purchase.
//   /buy-stage  → sandbox Polar, always. Linked from Debug builds for QA.
//
// Both URLs come from the Polar dashboard (Products → Checkout Links).
// The link's success_url is configured server-side to point at
// /buy?success=1 — Polar redirects there after a completed checkout.
const LIVE_CHECKOUT_URL: string = "REPLACE_WHEN_LIVE";
const SANDBOX_CHECKOUT_URL: string =
  "https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_qu3kQfXBxavRwSo0OKWe77sqFj5qVLusWEBr11pVh63/redirect";
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

// Single checkmark used in the benefits list — same SVG shape as the
// home pricing card so the eye reads the two surfaces as one product.
function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8l3 3 7-7" />
    </svg>
  );
}

export function Buy() {
  const { item } = usePageEnter();
  const [view, setView] = useState<"form" | "success" | "prelaunch">("form");
  const [email, setEmail] = useState("");
  const [isStage, setIsStage] = useState(false);
  const polarRef = useRef<PolarEmbedCheckout | null>(null);

  useEffect(() => {
    const stage = window.location.pathname === "/buy-stage";
    setIsStage(stage);
    const liveReady = LIVE_CHECKOUT_URL !== "REPLACE_WHEN_LIVE";
    const stageReady = SANDBOX_CHECKOUT_URL !== "REPLACE_WHEN_LIVE";

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
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const Polar = polarRef.current;
    if (!Polar) return;
    const value = email.trim();
    if (!value) return;
    const useLive = !isStage && LIVE_CHECKOUT_URL !== "REPLACE_WHEN_LIVE";
    const baseUrl = useLive ? LIVE_CHECKOUT_URL : SANDBOX_CHECKOUT_URL;
    const url = new URL(baseUrl);
    url.searchParams.set("customer_email", value);
    Polar.create(url.toString(), { theme: "dark" });
  };

  return (
    <>
      <div className="buy-ambient" aria-hidden="true">
        <div className="buy-ambient-grid" />
        <div className="buy-ambient-glow" />
      </div>
      <Nav />
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
              Test checkout — no real charge. Use any test card; activation
              codes only work in stage builds of Odak.
            </span>
          </div>
        )}

        <div className="checkout-grid">
          {view === "form" && (
            <article className="price-card">
              <div className="head-row">
                <span className="tier">One-time</span>
                <span className="trial-badge">14 days free</span>
              </div>

              <div className="amount">
                <span className="curr">$</span>19
                <span className="per">once</span>
              </div>
              <div className="amount-sub">3 Macs · lifetime license</div>

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
                    Use on <b>3 Macs</b> — desktop, laptop, work machine.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>Lifetime license.</b> Bug fixes, security patches,
                    and new features — free.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>14-day free trial. No credit card.</span>
                </li>
              </ul>

              <form className="checkout-form" onSubmit={onSubmit}>
                <label className="field">
                  <span className="field-label">Email for activation code</span>
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
                <button id="checkout-btn" className="buy" type="submit">
                  Buy Odak — $19
                  <span className="arrow" aria-hidden="true">
                    <svg viewBox="0 0 12 12">
                      <path d="M3 6h6m-3-3l3 3-3 3" />
                    </svg>
                  </span>
                </button>
              </form>

              <p className="price-fine">
                One-time payment · instant activation · Sparkle auto-updates ·{" "}
                <a href="/refund">14-day refund</a>
              </p>
            </article>
          )}

          {view === "success" && (
            <article
              id="success-state"
              className="price-card state"
              role="status"
              aria-live="polite"
            >
              <div className="state-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7" />
                </svg>
              </div>
              <h2>You're set.</h2>
              <p>
                We've sent your activation code to your email. Open Odak, go to
                <strong> Settings → License</strong>, and paste the code.
              </p>
              <p className="price-fine">
                Didn't get it? Check spam, then{" "}
                <a href="mailto:support@odak.fyi">email support</a>.
              </p>
            </article>
          )}

          {view === "prelaunch" && (
            <article
              id="prelaunch-state"
              className="price-card state"
              role="status"
              aria-live="polite"
            >
              <div className="state-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <h2>Purchases open soon.</h2>
              <p>
                While payment setup wraps up, the <strong>14-day trial</strong>{" "}
                is fully unlocked — every feature, no credit card.
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
            </article>
          )}

          <aside className="price-aside">
            <h3>
              One-time <span className="accent">purchase.</span>
            </h3>
            <p className="lead">
              Saves a few seconds per window-switch, dozens of times a day.
            </p>
            <p>
              No subscription, no renewal. The license is yours to keep — every
              update, free, forever.
            </p>
            <div className="seals">
              <span className="seal">Hardened runtime</span>
              <span className="seal">Apple Silicon</span>
              <span className="seal">Telemetry off by default</span>
            </div>
            <p className="fine">
              Secure checkout by <strong>Polar</strong> ·{" "}
              <a href="/refund">Refund policy</a> · <a href="/terms">Terms</a> ·{" "}
              <a href="/privacy">Privacy</a>
            </p>
          </aside>
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
