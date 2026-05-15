import { Aurora } from "@/components/site/Aurora";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export function Terms() {
  return (
    <>
      <Aurora />
      <Nav />
      <main>
        <div className="eyebrow">Legal</div>
        <h1>Terms of Service</h1>
        <p className="lede">
          These terms govern your use of the Odak website and macOS
          application, and the licence you receive when you buy Odak.
        </p>
        <p className="meta">Effective 2026-04-25 · Last updated 2026-05-10</p>

        <div className="toc" aria-label="Table of contents">
          <ol>
            <li><a href="#parties">Parties</a></li>
            <li><a href="#trial">The free trial</a></li>
            <li><a href="#purchase">Purchase &amp; payment</a></li>
            <li><a href="#licence">Licence grant</a></li>
            <li><a href="#updates">Updates &amp; support</a></li>
            <li><a href="#refunds">Refunds</a></li>
            <li><a href="#restrictions">Restrictions</a></li>
            <li><a href="#warranty">Warranty &amp; liability</a></li>
            <li><a href="#termination">Termination</a></li>
            <li><a href="#law">Governing law</a></li>
            <li><a href="#changes">Changes</a></li>
            <li><a href="#contact">Contact</a></li>
          </ol>
        </div>

        <h2 id="parties">1. Parties</h2>
        <p>
          Odak is operated by <strong>Hasan Salih Can</strong>, a sole
          proprietor based in Istanbul, Turkey ("we", "us", "Odak"). By
          installing, opening, or buying Odak, or by using the website at{" "}
          <code>odak.fyi</code>, you ("you", the "User") agree to these Terms.
        </p>
        <p>
          Paid purchases are processed by our authorised reseller and Merchant
          of Record, <strong>Paddle.com Market Limited</strong> ("Paddle").
          Paddle's{" "}
          <a
            href="https://www.paddle.com/legal/checkout-buyer-terms"
            target="_blank"
            rel="noopener"
          >
            Checkout Buyer Terms
          </a>{" "}
          apply to the transaction itself.
        </p>

        <h2 id="trial">2. The free trial</h2>
        <p>
          Odak offers a 14-day free trial. During the trial you may use the
          full feature set without payment. After the trial expires you must
          purchase a licence to continue using the application; the website and
          any free, non-binary resources remain available regardless.
        </p>

        <h2 id="purchase">3. Purchase &amp; payment</h2>
        <p>
          Odak is sold for a <strong>one-time fee of US$19</strong> (price as
          listed at checkout; local taxes are added by Paddle where
          applicable). Checkout is operated by Paddle, who collects payment,
          charges and remits any applicable tax (VAT, GST, sales tax), and
          issues your receipt. We never see or store your card details.
        </p>
        <p>
          By completing a purchase you confirm that you have read and accepted
          these Terms, the <a href="/refund.html">Refund Policy</a>, and
          Paddle's buyer terms shown at checkout.
        </p>

        <h2 id="licence">4. Licence grant</h2>
        <p>
          Subject to your payment and ongoing compliance with these Terms, we
          grant you a non-exclusive, non-transferable, worldwide, perpetual
          licence to use Odak for personal or business purposes, with the
          following parameters:
        </p>
        <ul>
          <li>
            <strong>Up to 3 Macs</strong> per licence (typical usage: desktop,
            laptop, work machine).
          </li>
          <li>
            <strong>Free updates</strong> for the duration of your licence —
            bug fixes, security patches, and new features as we ship them.
            Your installed version remains fully functional and licensed
            indefinitely. Future major releases may be offered as separate
            products.
          </li>
          <li>
            The licence is for the natural person or single legal entity that
            completed the purchase. It may not be transferred, resold,
            sublicensed, or shared.
          </li>
        </ul>

        <h2 id="updates">5. Updates &amp; support</h2>
        <p>
          We may release bug fixes, security patches, and new features at our
          discretion. Best-effort email support is available at{" "}
          <a href="mailto:support@odak.fyi">support@odak.fyi</a>; we aim to
          reply within 5 business days. Support does not include custom
          development, integration with third-party tools we don't already
          support, or system administration unrelated to the app.
        </p>

        <h2 id="refunds">6. Refunds</h2>
        <p>
          We offer a 14-day, no-questions-asked refund. The full policy and
          instructions are at <a href="/refund.html">odak.fyi/refund</a>.
        </p>

        <h2 id="restrictions">7. Restrictions</h2>
        <p>You agree not to:</p>
        <ul>
          <li>
            Distribute, sell, lease, or sublicense Odak or its licence keys.
          </li>
          <li>
            Reverse-engineer, decompile, or disassemble the app, except to the
            extent that applicable law expressly permits this despite this
            restriction.
          </li>
          <li>Remove or obscure any proprietary notices.</li>
          <li>
            Use Odak in violation of any law, or to facilitate any illegal
            activity.
          </li>
          <li>
            Use Odak in ways that infringe the rights of others, including
            privacy, publicity, or intellectual-property rights.
          </li>
        </ul>

        <h2 id="warranty">8. Warranty disclaimer &amp; limitation of liability</h2>
        <p>
          Odak is provided <strong>"as is"</strong> and{" "}
          <strong>"as available"</strong>, without warranties of any kind,
          express or implied, including warranties of merchantability, fitness
          for a particular purpose, and non-infringement, to the maximum
          extent permitted by applicable law.
        </p>
        <p>
          To the maximum extent permitted by applicable law, our aggregate
          liability arising out of or relating to these Terms or the app —
          whether in contract, tort, or otherwise — is limited to the amount
          you actually paid for Odak in the 12 months preceding the event
          giving rise to the claim. We are not liable for indirect,
          incidental, special, consequential, or punitive damages, or for
          lost profits, lost data, or business interruption.
        </p>
        <p>
          Nothing in these Terms excludes or limits liability that cannot
          lawfully be excluded or limited, including liability for fraud,
          gross negligence, wilful misconduct, or death or personal injury
          caused by negligence.
        </p>

        <h2 id="termination">9. Termination</h2>
        <p>
          You may stop using Odak at any time by uninstalling it. We may
          terminate the licence if you materially breach these Terms — for
          example by violating section 7 — and the breach is not cured within
          a reasonable period after notice. On termination for breach, the
          licence ends and you must uninstall the app; sections 8, 10, and 12
          survive.
        </p>

        <h2 id="law">10. Governing law &amp; jurisdiction</h2>
        <p>
          These Terms are governed by the laws of{" "}
          <strong>the Republic of Türkiye</strong>, without regard to
          conflict-of-laws principles. The courts of{" "}
          <strong>Istanbul, Türkiye</strong> have exclusive jurisdiction over
          any dispute arising out of or relating to these Terms, except that
          nothing prevents us from seeking injunctive relief in any competent
          court to protect our intellectual property.
        </p>
        <p>
          If you are a consumer based in the European Union, the United
          Kingdom, or another jurisdiction whose mandatory consumer-protection
          laws grant you additional rights, those rights are not affected.
        </p>

        <h2 id="changes">11. Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time. The "Last updated" date
          at the top of this page reflects the most recent version. Material
          changes that affect existing licences will be communicated by email
          at least 30 days before they take effect. Your continued use after
          the effective date constitutes acceptance.
        </p>

        <h2 id="contact">12. Contact</h2>
        <div className="box">
          <p>
            <strong>Hasan Salih Can</strong> (sole proprietor)
            <br />
            Istanbul, Türkiye
            <br />
            Email: <a href="mailto:hello@odak.fyi">hello@odak.fyi</a>
            <br />
            Support: <a href="mailto:support@odak.fyi">support@odak.fyi</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
