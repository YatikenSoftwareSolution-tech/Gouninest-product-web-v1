"use client";
import { useCallback } from "react";

const COOKIE_TEXT = `
Cookie Policy

1. About This Policy
This Cookie Policy explains how Gouninest ("we", "us") uses cookies and similar technologies on our platform, and your rights around them depending on your location.

2. What Are Cookies and Similar Technologies
Cookies are small files stored on your device to recognize you, remember preferences, analyze usage, and serve personalized content. These include necessary, functional, analytics, and marketing cookies.

3. Categories of Cookies We Use
- Strictly Necessary: required for login, session safety, and platform functionality—no consent needed in all regions.
- Functional: remember preferences (language, display), require consent in EU/UK/Canada.
- Analytics: track usage patterns (e.g. Google Analytics)—consent required in EU/UK/Canada; opt-out permitted in US, Australia, New Zealand.
- Marketing/Advertising: third-party tracking, retargeting, behavioral profiling—consent required in EU/UK/Canada; opt-out in US, Australia, New Zealand. California residents must receive a "Do Not Sell My Info" option.

4. Regional Consent Approach
- European Union / United Kingdom (GDPR / UK-GDPR + PECR):
  We block all non-essential cookies until you actively accept them.
  Consent must be freely given, informed, specific to categories, and withdrawable at any time.
  You can reject individual categories.
  No cookie-walls: you can still use the platform even if you refuse cookies (unless they are strictly necessary).

- Canada (PIPEDA / Provincial Law):
  Consent for behavior-tracking cookies is opt-in: we do not set non-essential cookies until consent.
  For routine functional cookies, implied consent (e.g. continuing use after being informed) may apply.

- United States (CCPA/CPRA etc.):
  Federal law doesn't require opt-in, but state laws (especially California, Virginia, Connecticut, Colorado) require notice and opt-out options for sale or targeted profiling cookies.
  We notify US users and provide a "Do Not Sell or Share My Personal Info" link in accordance with such laws.

- Australia & New Zealand:
  Neither country mandates opt-in consent.
  Laws require transparency if personal information is being collected, but not prior consent for typical cookies.
  We inform users via this policy and banner, and provide ability to disable tracking cookies.

5. How We Obtain Consent
On first visit, a cookie banner displays:
- Clear accept, reject, and "manage preferences" options
- Information on cookie categories and purposes
- Consent is only recorded after active user action (no pre-ticked boxes).
- Users can withdraw or change consent at any time by accessing the cookie settings link.

6. Managing Cookies
You may manage or withdraw your consent at any time by clicking the "Cookie Settings" link in the footer or banner and toggling categories.
You can also disable cookies via your browser settings—but note blocking strictly necessary cookies may impair platform functionality.

7. Details of Specific Cookies
(Include a table listing each cookie name/purpose, provider, duration, essential status—adjust per your actual implementation.)

8. Children and Cookies
If our platform is used by persons under 16, we do not infer consent or use behavioral tracking cookies without parental permission. For under-13 users (COPPA), we take additional protective steps or obtain guardian consent.

9. Third-Party Cookies
We may set cookies from trusted third parties (analytics, payment gateways, ad partners). You can review these partners and their cookie practices in the detailed cookie table.

10. Legal Rights by Region
- EU/UK: rights to access, rectify, erase, restrict processing. You can withdraw consent anytime.
- California & other US states: right to opt out of sale/sharing, request deletion, or limit profiling.
- Canada: right to know what personal data is processed and to withdraw consent for sensitive uses.

11. Updates to This Policy
We may update this policy over time. We will post the changes with a revision date, and notify returning users when changes are significant.

12. Contact Us
If you have questions or wish to exercise your rights, email us at info@gouninest.com.
`;

const CookiePolicyPage = () => {
  const downloadPolicy = useCallback(() => {
    const blob = new Blob([COOKIE_TEXT], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "GoUniNest-Cookie-Policy.txt");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return (
    <section className="py-20 flex flex-col justify-center items-center gap-4">
      <div className="max-w-4xl mx-auto relative">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">
          Cookie Policy
        </h1>
        <div className="prose max-w-none text-gray-700">
          <h2>About This Policy</h2>
          <p>
            This Cookie Policy explains how Gouninest (&quot;we&quot;,
            &quot;us&quot;) uses cookies and similar technologies on our
            platform, and your rights around them depending on your location.
          </p>

          <h2>What Are Cookies and Similar Technologies</h2>
          <p>
            Cookies are small files stored on your device to recognize you,
            remember preferences, analyze usage, and serve personalized content.
            These include necessary, functional, analytics, and marketing
            cookies.
          </p>

          <h2>Categories of Cookies We Use</h2>
          <ul className="list-disc">
            <li>
              <b>Strictly Necessary:</b> required for login, session safety, and
              platform functionality&mdash;no consent needed in all regions.
            </li>
            <li>
              <b>Functional:</b> remember preferences (language, display),
              require consent in EU/UK/Canada.
            </li>
            <li>
              <b>Analytics:</b> track usage patterns (e.g. Google
              Analytics)&mdash;consent required in EU/UK/Canada; opt-out
              permitted in US, Australia, New Zealand.
            </li>
            <li>
              <b>Marketing/Advertising:</b> third-party tracking, retargeting,
              behavioral profiling&mdash;consent required in EU/UK/Canada;
              opt-out in US, Australia, New Zealand. California residents must
              receive a &quot;Do Not Sell My Info&quot; option.
            </li>
          </ul>

          <h2>Regional Consent Approach</h2>
          <h3 className="font-semibold mt-4">
            European Union / United Kingdom (GDPR / UK-GDPR + PECR)
          </h3>
          <ul className="list-disc">
            <li>
              We block all non-essential cookies until you actively accept them.
            </li>
            <li>
              Consent must be freely given, informed, specific to categories,
              and withdrawable at any time.
            </li>
            <li>You can reject individual categories.</li>
            <li>
              No cookie-walls: you can still use the platform even if you refuse
              cookies (unless they are strictly necessary).
            </li>
          </ul>

          <h3 className="font-semibold mt-4">
            Canada (PIPEDA / Provincial Law)
          </h3>
          <ul className="list-disc">
            <li>
              Consent for behavior-tracking cookies is opt-in: we do not set
              non-essential cookies until consent.
            </li>
            <li>
              For routine functional cookies, implied consent (e.g. continuing
              use after being informed) may apply.
            </li>
          </ul>

          <h3 className="font-semibold mt-4">United States (CCPA/CPRA etc.)</h3>
          <ul className="list-disc">
            <li>
              Federal law doesn&apos;t require opt-in, but state laws
              (especially California, Virginia, Connecticut, Colorado) require
              notice and opt-out options for sale or targeted profiling cookies.
            </li>
            <li>
              We notify US users and provide a &quot;Do Not Sell or Share My
              Personal Info&quot; link in accordance with such laws.
            </li>
          </ul>

          <h3 className="font-semibold mt-4">Australia &amp; New Zealand</h3>
          <ul className="list-disc">
            <li>Neither country mandates opt-in consent.</li>
            <li>
              Laws require transparency if personal information is being
              collected, but not prior consent for typical cookies.
            </li>
            <li>
              We inform users via this policy and banner, and provide ability to
              disable tracking cookies.
            </li>
          </ul>

          <h2>How We Obtain Consent</h2>
          <p>On first visit, a cookie banner displays:</p>
          <ul className="list-disc">
            <li>
              Clear accept, reject, and &quot;manage preferences&quot; options
            </li>
            <li>Information on cookie categories and purposes</li>
            <li>
              Consent is only recorded after active user action (no pre-ticked
              boxes).
            </li>
            <li>
              Users can withdraw or change consent at any time by accessing the
              cookie settings link.
            </li>
          </ul>

          <h2>Managing Cookies</h2>
          <p>
            You may manage or withdraw your consent at any time by clicking the
            &quot;Cookie Settings&quot; link in the footer or banner and
            toggling categories. You can also disable cookies via your browser
            settings&mdash;but note blocking strictly necessary cookies may
            impair platform functionality.
          </p>

          <h2>Details of Specific Cookies</h2>
          <p>
            (Include a table listing each cookie name/purpose, provider,
            duration, essential status&mdash;adjust per your actual
            implementation.)
          </p>

          <h2>Children and Cookies</h2>
          <p>
            If our platform is used by persons under 16, we do not infer consent
            or use behavioral tracking cookies without parental permission. For
            under-13 users (COPPA), we take additional protective steps or
            obtain guardian consent.
          </p>

          <h2>Third-Party Cookies</h2>
          <p>
            We may set cookies from trusted third parties (analytics, payment
            gateways, ad partners). You can review these partners and their
            cookie practices in the detailed cookie table.
          </p>

          <h2>Legal Rights by Region</h2>
          <ul className="list-disc">
            <li>
              <b>EU/UK:</b> rights to access, rectify, erase, restrict
              processing. You can withdraw consent anytime.
            </li>
            <li>
              <b>California &amp; other US states:</b> right to opt out of
              sale/sharing, request deletion, or limit profiling.
            </li>
            <li>
              <b>Canada:</b> right to know what personal data is processed and
              to withdraw consent for sensitive uses.
            </li>
          </ul>

          <h2>Updates to This Policy</h2>
          <p>
            We may update this policy over time. We will post the changes with a
            revision date, and notify returning users when changes are
            significant.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions or wish to exercise your rights, email us at{" "}
            <a
              href="mailto:info@gouninest.com"
              className="text-blue-600 underline"
            >
              info@gouninest.com
            </a>
            .
          </p>
        </div>
      </div>
      <button
        onClick={downloadPolicy}
        className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:from-electric-600 hover:to-amber-600 transition"
      >
        Download Cookie Policy
      </button>
    </section>
  );
};

export default CookiePolicyPage;
