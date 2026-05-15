import { motion } from "motion/react";
import { Aurora } from "@/components/site/Aurora";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { usePageEnter } from "@/components/site/PageEnter";

export function Refund() {
  const { item } = usePageEnter();
  return (
    <>
      <Aurora />
      <Nav />
      <motion.main variants={item(0.05)} initial="hidden" animate="show">
        <div className="eyebrow">Legal</div>
        <h1>Refund Policy</h1>
        <p className="lede">
          If Odak isn't right for you, get your money back. No forms, no
          friction.
        </p>
        <p className="meta">Effective 2026-04-25 · Last updated 2026-04-25</p>

        <div className="callout">
          <p>
            <strong>14 days, no questions asked.</strong> If you're not happy
            with Odak for any reason, email us within 14 days of purchase and
            we'll refund you in full.
          </p>
        </div>

        <h2 id="window">Refund window</h2>
        <p>
          You can request a refund <strong>within 14 calendar days</strong> of
          your purchase date. The 14-day clock starts on the date of the
          original transaction shown on your receipt. Requests outside this
          window are reviewed case by case but are not guaranteed.
        </p>
        <p>
          Odak also offers a <strong>14-day free trial</strong> with no credit
          card required. We strongly recommend trying the app before buying —
          but if you skip the trial and decide Odak isn't for you, the refund
          window still applies.
        </p>

        <h2 id="how">How to request a refund</h2>
        <p>You have two ways to request a refund:</p>
        <ol>
          <li>
            <strong>Email us</strong> at{" "}
            <a href="mailto:support@odak.fyi?subject=Refund%20request">
              support@odak.fyi
            </a>{" "}
            with the subject line "Refund request" and the email address you
            used at checkout, or your Paddle order ID. We'll reply and process
            the refund — no questions, no hoops.
          </li>
          <li>
            <strong>Contact Paddle directly</strong> via{" "}
            <a href="https://paddle.net" target="_blank" rel="noopener">
              paddle.net
            </a>{" "}
            using the same email address you used at checkout. Paddle is our
            Merchant of Record and can issue the refund on our behalf.
          </li>
        </ol>

        <h2 id="processing">Processing time</h2>
        <p>
          Once the refund is approved, Paddle issues it to your original
          payment method. Funds typically appear within{" "}
          <strong>3–10 business days</strong>, depending on your bank or card
          issuer. Currency-conversion fees charged by your bank are not within
          our control.
        </p>

        <h2 id="aftermath">What happens to your licence</h2>
        <p>
          When a refund is issued, your Odak licence is revoked. The app falls
          back to trial mode (or expires if your trial has already ended).
          Please uninstall any installations that exceeded the trial period.
        </p>

        <h2 id="exceptions">Limited exceptions</h2>
        <p>We may decline a refund where there is clear evidence of:</p>
        <ul>
          <li>
            Abuse of the refund policy (for example, repeated refunds across
            multiple purchases of the same product).
          </li>
          <li>Chargeback fraud or other unlawful activity.</li>
          <li>
            Violation of the <a href="/terms.html">Terms of Service</a> — for
            example, redistribution of the licence key.
          </li>
        </ul>
        <p>Beyond these narrow exceptions, the 14-day policy applies.</p>

        <h2 id="rights">Your statutory rights</h2>
        <p>
          If you are a consumer based in the European Union, the United
          Kingdom, or another jurisdiction whose mandatory consumer-protection
          laws grant you additional rights — for example a statutory right of
          withdrawal — those rights are not affected by this policy. This
          policy is intended to be additional to, not in place of, any rights
          you have by law.
        </p>

        <h2 id="contact">Questions</h2>
        <div className="box">
          <p>
            <strong>Hasan Salih Can</strong> (sole proprietor)
            <br />
            Istanbul, Türkiye
            <br />
            Email: <a href="mailto:support@odak.fyi">support@odak.fyi</a>
            <br />
            General: <a href="mailto:hello@odak.fyi">hello@odak.fyi</a>
          </p>
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
