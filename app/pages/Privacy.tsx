import { motion } from "motion/react";
import { Aurora } from "@/components/site/Aurora";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { usePageEnter } from "@/components/site/PageEnter";

export function Privacy() {
  const { item } = usePageEnter();
  return (
    <>
      <Aurora />
      <Nav />
      <motion.main variants={item(0.05)} initial="hidden" animate="show">
        <div className="eyebrow">Legal</div>
        <h1>Privacy Policy</h1>
        <p className="lede">
          Odak collects as little as it can get away with. This page lists
          exactly what's collected, what isn't, and where the few pieces I do
          see end up.
        </p>
        <p className="meta">Effective 2026-04-25 · Last updated 2026-05-10</p>

        <div className="toc" aria-label="Table of contents">
          <ol>
            <li><a href="#who">Who I am</a></li>
            <li><a href="#app">The macOS app</a></li>
            <li><a href="#purchases">Purchases &amp; Paddle</a></li>
            <li><a href="#support">Support email</a></li>
            <li><a href="#rights">Your rights</a></li>
            <li><a href="#retention">Retention</a></li>
            <li><a href="#changes">Changes</a></li>
            <li><a href="#contact">Contact</a></li>
          </ol>
        </div>

        <h2 id="who">1. Who I am</h2>
        <p><strong>One person, one mailbox.</strong></p>
        <p>
          I'm <strong>Salih Can</strong>. I built Odak and run it solo from
          Istanbul. "I" is me; "Odak" is the app and the business. Email:{" "}
          <a href="mailto:hello@odak.fyi">hello@odak.fyi</a>.
        </p>
        <p>
          Checkout runs through <strong>Paddle</strong>, my Merchant of Record
          (their privacy policy:{" "}
          <a
            href="https://www.paddle.com/legal/privacy"
            target="_blank"
            rel="noopener"
          >
            paddle.com/legal/privacy
          </a>
          ).
        </p>

        <h2 id="app">2. The macOS app</h2>
        <p><strong>Local by default. Telemetry only if you opt in.</strong></p>
        <div className="box">
          <p>
            <strong>Nothing about your work ever leaves your Mac.</strong> No
            project names or paths, no file contents, no search queries, no
            window titles. Not on the analytics path, not on the license
            path, not anywhere.
          </p>
          <p>
            <strong>
              Anonymous usage events and crash reports are off by default.
            </strong>{" "}
            Opt in once during onboarding (or any time in{" "}
            <strong>Settings → Privacy</strong>) and Odak will share the
            events listed below — and nothing else. Flipping the toggle off
            stops both immediately.
          </p>
        </div>
        <p>
          Four network paths exist: opted-in events, opted-in crash reports,
          the daily Sparkle update check, and trial / license calls. Each is
          detailed below.
        </p>

        <h3>Stays on your device</h3>
        <p>Lives in macOS application support directories. Syncs nowhere:</p>
        <ul>
          <li>Project list, paths, branch names, and which projects you've opened</li>
          <li>Search queries you type into the search panel</li>
          <li>
            Frecency rankings, search history, and per-project variables in{" "}
            <code>.odak</code> files
          </li>
          <li>
            Window titles read via the Accessibility permission (used only by
            the IDE switcher)
          </li>
          <li>All settings and preferences</li>
        </ul>

        <h3>Anonymous usage analytics — only if you opt in</h3>
        <p>
          Processor:{" "}
          <a href="https://posthog.com" target="_blank" rel="noopener">
            PostHog
          </a>
          , set to its strictest privacy mode:
        </p>
        <ul>
          <li>
            <strong>No person profiles</strong> (
            <code>personProfiles = .never</code>) — events carry no user
            record
          </li>
          <li>
            <strong>
              No <code>identify()</code>
            </strong>{" "}
            — your email is never sent to PostHog, not even after activating
            a license
          </li>
          <li>
            <strong>No automatic capture</strong> — no lifecycle, no screen
            views, no session replay; only explicit events
          </li>
          <li>
            <strong>No IP collection</strong>
          </li>
        </ul>
        <p>
          Events cover feature usage — which features you reach for, with
          non-identifying parameters like IDE name, filter kind, or a git host
          bucketed into a fixed set. The exact event set evolves with the
          app; the envelope below does not.
        </p>
        <p><strong>Never sent in any event:</strong></p>
        <ul>
          <li>Project names or paths, file contents, or search query text</li>
          <li>Window titles or any data from the Accessibility permission</li>
          <li>Custom action names you've created</li>
          <li>
            Self-hosted git hostnames (only the <em>self_hosted</em> bucket)
          </li>
          <li>Your email, name, or license code</li>
        </ul>
        <p>
          PostHog may log standard request metadata (user-agent) under{" "}
          <a
            href="https://posthog.com/privacy"
            target="_blank"
            rel="noopener"
          >
            its own privacy policy
          </a>
          . The PostHog project has IP collection disabled.
        </p>

        <h3>Anonymous crash reports — only if you opt in</h3>
        <p>
          Captured via PostHog's error-tracking module: uncaught exceptions,
          Mach exceptions, POSIX signals. Each report is a symbolicated stack
          trace plus app version and macOS version — nothing that ties the
          crash back to you (no user code, no project content, no paths
          outside the Odak bundle). Same{" "}
          <strong>Settings → Privacy</strong> toggle controls events and
          crashes together.
        </p>

        <h3>Update checks (Sparkle)</h3>
        <p>
          Odak uses the open-source{" "}
          <a
            href="https://sparkle-project.org"
            target="_blank"
            rel="noopener"
          >
            Sparkle
          </a>{" "}
          framework. Roughly once a day, it fetches{" "}
          <code>odak.fyi/appcast.xml</code> — logged in standard HTTP access
          logs (IP, user-agent, timestamp), kept up to 30 days, never used
          for profiling. Sparkle sends nothing about you, your projects, or
          your usage. Update binaries come from GitHub Releases (GitHub's own
          policy applies to the download).
        </p>

        <h3>Trial activation &amp; license check</h3>
        <p>
          <strong>License calls are necessary; they don't carry your work.</strong>{" "}
          Two moments talk to <code>license.odak.fyi</code>: starting the
          14-day trial, and activating / re-validating a paid license. They
          happen regardless of telemetry consent because they're how the
          license itself works (one trial per Mac, 3-Mac limit per license).
        </p>
        <p>
          The full set of fields that ever reaches the license server, across
          all four endpoints (<code>/trial-start</code>,{" "}
          <code>/activate</code>, <code>/deactivate</code>,{" "}
          <code>/revalidate</code>):
        </p>
        <ul>
          <li>
            <strong>Device ID</strong> — your Mac's{" "}
            <code>IOPlatformUUID</code>, a logic-board identifier that
            doesn't change when you reinstall macOS. Used to anchor a trial
            to a Mac and to count machines per license.
          </li>
          <li>
            <strong>Device name</strong> — what your Mac is called in System
            Settings → General → About (often something like "Mira's MacBook
            Pro"). Shown back to you in the "deactivate which Mac?" sheet so
            you can recognise your own machines. Rename your Mac if you don't
            want a personal name on it.
          </li>
          <li>
            <strong>macOS version</strong> — e.g. <code>macOS 26.1.0</code>.
          </li>
          <li>
            <strong>Your license code</strong> — only when you click Activate
            or Deactivate; never sent during trial start or routine
            revalidation.
          </li>
        </ul>
        <p>
          Things the license server receives by virtue of being an HTTP
          server: your <strong>IP address</strong> and a standard{" "}
          <code>User-Agent</code>. These are kept in normal access logs for
          up to 30 days for abuse prevention and never used for profiling.
        </p>
        <p>
          What the license server <strong>never</strong> receives, and never
          could: project names or paths, file contents, search queries,
          window titles, telemetry events, crash reports.
        </p>
        <p>
          After successful activation, the server returns a signed JWT
          containing your license email and the device ID; the JWT is stored
          locally and used to gate paid features offline. Routine
          revalidation sends only the JWT — no fresh deviceId or deviceName.
        </p>

        <h2 id="purchases">3. Purchases &amp; Paddle</h2>
        <p>
          <strong>Paddle handles checkout. I never see your card.</strong>
        </p>
        <p>
          Paddle is the controller of your payment data under{" "}
          <a
            href="https://www.paddle.com/legal/privacy"
            target="_blank"
            rel="noopener"
          >
            its own privacy policy
          </a>
          . They collect what payment and tax law require:
        </p>
        <ul>
          <li>Name and email</li>
          <li>Billing address and country (for tax)</li>
          <li>Payment method (PCI-compliant — I never touch your card)</li>
          <li>IP address (fraud prevention)</li>
        </ul>
        <p>
          After a successful purchase, Paddle shares a limited record with me
          — name, email, country, what you bought — so I can deliver your
          license key, answer support, and send essential transactional
          emails (license delivery, receipts, important update notices).
        </p>

        <h2 id="support">4. Support email</h2>
        <p><strong>Your email sits in my inbox until I reply.</strong></p>
        <p>
          Write to <a href="mailto:support@odak.fyi">support@odak.fyi</a> or{" "}
          <a href="mailto:hello@odak.fyi">hello@odak.fyi</a>. I don't add
          anyone to a marketing list — there isn't one.
        </p>

        <h2 id="rights">5. Your rights</h2>
        <p>
          <strong>You can ask me to see, fix, or delete what I hold.</strong>
        </p>
        <p>
          Depending on where you live (<strong>EU/UK GDPR</strong>,{" "}
          <strong>California CCPA/CPRA</strong>, Turkey's{" "}
          <strong>KVKK</strong>, or similar), you may have the right to:
        </p>
        <ul>
          <li>Access the personal data I hold about you</li>
          <li>Correct inaccurate data</li>
          <li>Delete your data ("right to be forgotten")</li>
          <li>Object to or restrict certain processing</li>
          <li>Receive your data in a portable format</li>
          <li>Withdraw consent where processing is based on consent</li>
          <li>Lodge a complaint with your local data-protection authority</li>
        </ul>
        <p>
          Email <a href="mailto:hello@odak.fyi">hello@odak.fyi</a> to exercise
          any of these for data I hold. For payment data, contact Paddle at{" "}
          <a href="https://paddle.net" target="_blank" rel="noopener">
            paddle.net
          </a>
          .
        </p>

        <h2 id="retention">6. Retention</h2>
        <p><strong>Kept only as long as needed.</strong></p>
        <ul>
          <li>Server access logs: up to 30 days.</li>
          <li>
            Purchase records (name, email, transaction ID, license): kept as
            long as tax and accounting law require (typically 5–10 years),
            then deleted.
          </li>
          <li>
            Support email: kept until it's no longer useful, generally up to
            24 months after the last reply.
          </li>
        </ul>

        <h2 id="changes">7. Changes</h2>
        <p><strong>I update this page when things change.</strong></p>
        <p>
          The "Last updated" date at the top reflects the latest revision.
          Material changes that affect paying customers go out by email.
        </p>

        <h2 id="contact">8. Contact</h2>
        <div className="box">
          <p>
            <strong>Hasan Salih Can</strong> (sole proprietor)
            <br />
            Istanbul, Turkey
            <br />
            Email: <a href="mailto:hello@odak.fyi">hello@odak.fyi</a>
            <br />
            Support: <a href="mailto:support@odak.fyi">support@odak.fyi</a>
          </p>
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
