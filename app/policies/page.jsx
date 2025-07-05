"use client"
import Head from 'next/head';
import Link from 'next/link';
import { useCallback } from 'react';

const PrivacyPolicyPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    "name": "GoUniNest Privacy Policy | Secure & Transparent Student Housing Worldwide",
    "url": "https://www.gouninest.co.uk/privacy-policy",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@gouninest.co.uk",
      "telephone": "+44 20 7123 4567",
      "contactType": "customer support"
    }
  };

  const downloadTerms = useCallback(() => {
      const blob = new Blob([TERMS_TEXT], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'GoUniNest-Terms-and-Conditions.txt');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, []);

  return (
    <>
      <Head>
        <title>GoUniNest Privacy Policy | Secure & Transparent Student Housing Worldwide</title>
        <meta
          name="description"
          content="Review the GoUniNest Privacy Policy to understand how we collect, use, and protect your personal information. Serving students globally, with a focus on the UK, Australia, and the USA."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main className="flex flex-col justify-center items-center bg-white min-h-screen py-20 px-4 sm:px-6 lg:px-8" aria-label="Privacy Policy">
        <div className="container mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-900">
            Privacy Policy
          </h1>

          <article className="prose prose-blue max-w-none text-gray-700">
            <p>
              At GoUniNest, your privacy is important to us. This policy outlines how we collect, use, disclose, and protect your personal information when you use our website, apps, and services. By accessing GoUniNest, you agree to the practices described in this policy.
            </p>
            <p>
              We serve students across 25+ countries, with strong roots in major student hubs like the UK, Australia, and the USA, ensuring trusted, student-first housing experiences worldwide.
            </p>

            <h2>Information We Collect</h2>
            <ul>
              <li><strong>Personal Identification Information</strong> (e.g., name, email, phone number)</li>
              <li><strong>Demographic Data</strong> (e.g., age, gender, country of residence)</li>
              <li><strong>User Account Details</strong> (e.g., login credentials, preferences)</li>
              <li><strong>Usage Data</strong> (e.g., browser type, IP address, access times)</li>
              <li><strong>Feedback &amp; Survey Data</strong> (e.g., reviews, support interactions)</li>
              <li><strong>Payment Information</strong> (e.g., for booking confirmations)</li>
            </ul>

            <h2>How We Collect Information</h2>
            <ul>
              <li>Account registrations and profile submissions</li>
              <li>Booking forms and service usage</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Communication with customer support</li>
              <li>Surveys, reviews, and feedback forms</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>Deliver and manage accommodation services</li>
              <li>Improve user experience and customer support</li>
              <li>Personalize content, offers, and property recommendations</li>
              <li>Send service updates and promotional emails (with consent)</li>
              <li>Ensure security, fraud prevention, and legal compliance</li>
            </ul>

            <h2>Sharing Your Information</h2>
            <p>We do <strong>not sell</strong> your personal information. We may share your data:</p>
            <ul>
              <li>With trusted third-party service providers (e.g., payment processors, hosting)</li>
              <li>With property partners and managers, only as necessary</li>
              <li>To comply with legal obligations and governmental requests</li>
              <li>During corporate transactions (e.g., merger, acquisition)</li>
            </ul>

            <h2>Cookies &amp; Tracking Technologies</h2>
            <p>We use cookies to:</p>
            <ul>
              <li>Analyze traffic and usage trends</li>
              <li>Remember your preferences</li>
              <li>Improve site performance</li>
              <li>Serve tailored content</li>
            </ul>
            <p>You can manage cookie preferences via your browser settings.</p>

            <h2>Your GDPR Rights (For EU/EEA Users)</h2>
            <ul>
              <li><strong>Right to access and correct your data</strong></li>
              <li><strong>Right to delete or restrict data processing</strong></li>
              <li><strong>Right to object to processing or direct marketing</strong></li>
              <li><strong>Right to data portability</strong></li>
              <li><strong>Right to lodge a complaint with your local data authority</strong></li>
            </ul>

            <h2>Your Rights in the United States</h2>
            <ul>
              <li><strong>Right to know</strong> what personal data we collect</li>
              <li><strong>Right to access, correct, or delete</strong> your data</li>
              <li><strong>Right to opt-out</strong> of data sale or targeted advertising</li>
              <li><strong>Right to non-discrimination</strong> for exercising these rights</li>
            </ul>
            <p>
              To exercise your rights, email us at:{' '}
              <a href="mailto:info@gouninest.co.uk" className="text-blue-600 underline">
                info@gouninest.co.uk
              </a>
            </p>

            <h2>International Transfers</h2>
            <p>
              We may process your information outside your home country. Our data practices comply with relevant global privacy laws, and we ensure that appropriate safeguards are in place.
            </p>

            <h2>Children’s Privacy</h2>
            <p>
              GoUniNest is not intended for users under 16 years of age. We do not knowingly collect data from children without verified parental consent. If we learn we’ve unintentionally gathered such data, we will promptly delete it.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement physical, electronic, and procedural safeguards to protect your data from unauthorized access, alteration, or disclosure. However, no system is 100% secure.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain your personal information only as long as necessary for legal and contractual obligations, service delivery, and dispute resolution or enforcement of rights.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. The latest version will always be accessible on this page. Continued use of our platform means you accept the latest terms.
            </p>

            <h2>Contact Us</h2>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:info@gouninest.co.uk" className="text-blue-600 underline">
                info@gouninest.co.uk
              </a><br />
              <strong>Phone:</strong> +44 20 7123 4567<br />
              <strong>Address:</strong> 85 Great Portland Street, First Floor, London, W1W 7LT
            </p>

            <h2>Additional Resources</h2>
            <ul>
              <li>
                <Link href="/contact" className="text-blue-600 underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-600 underline">
                About Us
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-blue-600 underline">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-blue-600 underline">
                  Browse Properties
                </Link>
              </li>
            </ul>
          </article>
        </div>
        <button
          onClick={downloadTerms}
          className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:from-electric-600 hover:to-amber-600 transition"
        >
          Download Terms &amp; Conditions
        </button>
      </main>
    </>
  );
};

export default PrivacyPolicyPage;
