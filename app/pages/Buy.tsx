import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Mark } from "@/components/site/Logo";
import { NavBuy } from "@/components/site/Nav";
import { useTheme } from "@/hooks/useTheme";
import { usePageEnter } from "@/components/site/PageEnter";

// Two URL surfaces:
//   /buy        → live Paddle. Until LIVE_TOKEN is wired in, /buy renders a
//                  pre-launch holding state and never falls back to sandbox —
//                  real customers must not be able to mistake a test flow
//                  for a real purchase.
//   /buy-stage  → sandbox Paddle, always. Linked from Debug builds for QA.
const LIVE_TOKEN = "REPLACE_WHEN_LIVE";
const LIVE_PRICE_ID = "REPLACE_WHEN_LIVE";
const SANDBOX_TOKEN = "test_e6166f8eb97687335a0722a87a8";
const SANDBOX_PRICE_ID = "pri_01kr8bb5d61wm2435rs402m79j";
const PADDLE_SDK = "https://cdn.paddle.com/paddle/v2/paddle.js";

type PaddleEvent = { name?: string };
type Paddle = {
  Initialize: (opts: {
    token: string;
    eventCallback?: (e: PaddleEvent) => void;
  }) => void;
  Environment: { set: (env: "sandbox" | "production") => void };
  Checkout: {
    open: (opts: {
      items: Array<{ priceId: string; quantity: number }>;
      customer?: { email?: string };
      settings?: {
        displayMode?: "overlay" | "inline";
        theme?: "dark" | "light";
        successUrl?: string;
      };
    }) => void;
  };
};
declare global {
  interface Window {
    Paddle?: Paddle;
  }
}

function loadPaddle(): Promise<Paddle> {
  if (window.Paddle) return Promise.resolve(window.Paddle);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${PADDLE_SDK}"]`,
    );
    const script = existing ?? document.createElement("script");
    if (!existing) {
      script.src = PADDLE_SDK;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () => {
      if (window.Paddle) resolve(window.Paddle);
      else reject(new Error("Paddle loaded but window.Paddle missing"));
    });
    script.addEventListener("error", () =>
      reject(new Error("Failed to load Paddle SDK")),
    );
  });
}

export function Buy() {
  const { theme } = useTheme();
  const { item } = usePageEnter();
  const [view, setView] = useState<"form" | "success" | "prelaunch">("form");
  const [email, setEmail] = useState("");
  const [isStage, setIsStage] = useState(false);
  const paddleRef = useRef<Paddle | null>(null);

  useEffect(() => {
    const stage = window.location.pathname === "/buy-stage";
    setIsStage(stage);
    const liveReady = LIVE_TOKEN !== "REPLACE_WHEN_LIVE";

    // Pre-launch on public /buy: no Paddle init at all. Defense against
    // silent sandbox checkouts confusing real customers between site
    // deploy and live token wire-in.
    if (!stage && !liveReady) {
      setView("prelaunch");
      return;
    }

    // Pre-fill email from ?email= and show success on ?success=1 (Paddle
    // redirect path for 3DS challenges that navigate the parent window).
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) setEmail(emailParam);
    if (params.get("success") === "1") {
      setView("success");
      history.replaceState(null, "", window.location.pathname);
    }

    const useLive = !stage && liveReady;
    const token = useLive ? LIVE_TOKEN : SANDBOX_TOKEN;

    let cancelled = false;
    loadPaddle()
      .then((Paddle) => {
        if (cancelled) return;
        if (stage) Paddle.Environment.set("sandbox");
        Paddle.Initialize({
          token,
          eventCallback: (event) => {
            if (event?.name === "checkout.completed") setView("success");
          },
        });
        paddleRef.current = Paddle;
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
    const Paddle = paddleRef.current;
    if (!Paddle) return;
    const value = email.trim();
    if (!value) return;
    const useLive = !isStage && LIVE_TOKEN !== "REPLACE_WHEN_LIVE";
    const priceId = useLive ? LIVE_PRICE_ID : SANDBOX_PRICE_ID;
    Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customer: { email: value },
      settings: {
        displayMode: "overlay",
        theme: theme === "dark" ? "dark" : "light",
        successUrl: window.location.origin + "/buy?success=1",
      },
    });
  };

  return (
    <>
      <NavBuy />
      <motion.main
        className="wrap"
        variants={item(0.05)}
        initial="hidden"
        animate="show"
      >
        <span className="logo">
          <Mark size={56} loading="eager" fetchPriority="high" />
        </span>
        <h1>Buy Odak</h1>
        <p className="lede">One-time. No subscription, no upgrade fees.</p>

        {isStage && (
          <div className="env-banner" style={{ display: "block" }}>
            <strong>Sandbox checkout</strong> — no real charge. Use any test
            card; the activation code only works in stage builds of Odak.
          </div>
        )}

        {view === "form" && (
          <>
            <div className="price">
              <span className="price-num">$19</span>
              <span className="price-suf">
                one&#8209;time · activates on up to 3&nbsp;Macs
              </span>
            </div>

            <ul className="benefits">
              <li>
                Search every project on your Mac, open it in your IDE in
                under a second
              </li>
              <li>
                One keyboard shortcut to jump between every open IDE window
              </li>
              <li>
                Custom actions &mdash; run scripts, open URLs, or trigger
                commands per project
              </li>
              <li>Free lifetime updates</li>
            </ul>

            <form id="checkout-form" onSubmit={onSubmit}>
              <input
                id="email-input"
                className="email-field"
                type="email"
                placeholder="your@email.com"
                required
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button id="checkout-btn" className="btn" type="submit">
                Buy Odak — $19
              </button>
            </form>
          </>
        )}

        {view === "success" && (
          <div
            id="success-state"
            className="success"
            style={{ display: "block" }}
            role="status"
            aria-live="polite"
          >
            <div className="success-icon">✓</div>
            <h2>You're set!</h2>
            <p>
              We've sent your activation code to your email. Open Odak, go to
              Settings &rarr; License, and paste the code.
            </p>
          </div>
        )}

        {view === "prelaunch" && (
          <div
            id="prelaunch-state"
            className="success"
            style={{ display: "block" }}
            role="status"
            aria-live="polite"
          >
            <div className="success-icon">⏳</div>
            <h2>Purchases open soon.</h2>
            <p>
              While payment setup wraps up, the{" "}
              <strong>14-day trial</strong> is fully unlocked — every
              feature, no credit card.
            </p>
            <a
              className="btn"
              style={{
                textDecoration: "none",
                textAlign: "center",
                display: "block",
                marginTop: 14,
              }}
              href="https://github.com/salihcaan/odak.fyi/releases/latest/download/Odak.dmg"
            >
              Download free trial
            </a>
          </div>
        )}

        <p className="fine">
          Secure checkout by Paddle · <a href="/refund">Refund policy</a> ·{" "}
          <a href="/terms">Terms</a> · <a href="/privacy">Privacy</a>
        </p>
      </motion.main>
    </>
  );
}
