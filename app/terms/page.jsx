const TERMS_TEXT = `
Terms and Conditions

These Terms and Conditions ("Terms") govern your use of the GoUniNest website, mobile application, and associated services ("Platform"). By accessing or using our Platform, you agree to comply with these Terms and all applicable laws and regulations.

Acceptance of the Terms and Conditions

By accessing or using our Platform, you confirm that you accept these Terms and that you agree to comply with them. If you do not agree with these Terms, you must not use our Platform. These Terms may change from time to time, and your continued use constitutes acceptance of any updates.

Definitions

- "GoUniNest" refers to our company and any of its subsidiaries, affiliates, agents, or assigns.
- "User" means any individual who accesses or uses the Platform.
- "Services" refers to the student accommodation services offered via our Platform.

Services

We offer access to verified student accommodation listings globally. Our core markets include the UK, Australia, and the USA, but we also serve students in 25+ countries. Services may include property browsing, bookings, support, payment handling, and more.

Intellectual Property Rights

All intellectual property on the Platform is owned by GoUniNest or our licensors. You agree not to copy, modify, distribute, or create derivative works without our prior written consent.

Use of the Website, Mobile Application, and Our Services

You agree not to:

- Restrict or inhibit any other person from using our Platform.
- Disable, damage, or interfere with our systems.
- Use any bots, spiders, or automated scripts without authorization.
- Use manual or automated methods to copy content without permission.
- Introduce malware or harmful software.
- Gain unauthorized access to systems or data.
- Conduct denial-of-service attacks or similar disruptions.

We reserve the right to investigate and take legal action against violations.

Indemnification

You agree to indemnify, defend, and hold harmless GoUniNest and its affiliates from any claims, liabilities, or expenses (including legal fees) that arise from:

- Your use of the Platform
- Your violation of these Terms
- Any user-generated content you provide
- Fraud or misconduct

Data Privacy

Please refer to our Privacy Policy for full details on how your personal data is collected, used, and safeguarded. All users agree to the terms of our Privacy Policy when using our Platform.

Third-Party Materials

Our Platform may include links to third-party sites or content. We do not control or endorse these resources and are not liable for your interactions with them. Use them at your own risk and subject to their respective terms.

Disclaimer of Warranties

The Platform and Services are provided "as is." GoUniNest disclaims all warranties, express or implied, including but not limited to merchantability, fitness for a particular purpose, non-infringement, and data accuracy. We do not warrant that services will be error free or uninterrupted.

Limitation on Liability

To the fullest extent permitted by law, GoUniNest shall not be liable for any direct, indirect, incidental, or consequential damages arising out of your access or use of the Platform, even if we have been advised of the possibility of such damages.

Termination

We may suspend or terminate your access to the Platform at any time, for any reason, including violations of these Terms, law enforcement requests, technical issues, or your own request for deletion.

Miscellaneous

These Terms may be updated or amended at any time without notice. In the event of a conflict between these Terms and any other document, these Terms shall prevail unless stated otherwise.

Waiver and Severability

Failure to enforce any provision of these Terms does not waive our right to do so later. If any part is deemed unenforceable, the remaining sections remain in effect.

Entire Agreement

These Terms, along with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and GoUniNest regarding your use of the Platform.

Contact Information

Email: info@gouninest.co.uk
Phone: +44 20 7123 4567
Address: 85 Great Portland Street, First Floor, London, W1W 7LT
`;



const TermsPage = () => {
  const downloadTerms = () => {
    const blob = new Blob([TERMS_TEXT], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'GoUniNest-Terms-and-Conditions.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <section className="py-20 flex flex-col justify-center items-center gap-4">
      <div className="max-w-4xl mx-auto relative">
        
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Terms and Conditions</h1>
        <div className="prose max-w-none text-gray-700">
          <h2>Acceptance of the Terms and Conditions</h2>
          <p>
            By accessing or using our Platform, you confirm that you accept these Terms and that you agree to comply with them. If you do not agree with these Terms, you must not use our Platform. These Terms may change from time to time, and your continued use constitutes acceptance of any updates.
          </p>
          <h2>Definitions</h2>
          <ul>
            <li><b>GoUniNest</b> refers to our company and any of its subsidiaries, affiliates, agents, or assigns.</li>
            <li><b>User</b> means any individual who accesses or uses the Platform.</li>
            <li><b>Services</b> refers to the student accommodation services offered via our Platform.</li>
          </ul>
          <h2>Services</h2>
          <p>
            We offer access to verified student accommodation listings globally. Our core markets include the UK, Australia, and the USA, but we also serve students in 25+ countries. Services may include property browsing, bookings, support, payment handling, and more.
          </p>
          <h2>Intellectual Property Rights</h2>
          <p>
            All intellectual property on the Platform is owned by GoUniNest or our licensors. You agree not to copy, modify, distribute, or create derivative works without our prior written consent.
          </p>
          <h2>Use of the Website, Mobile Application, and Our Services</h2>
          <ul>
            <li>Restrict or inhibit any other person from using our Platform.</li>
            <li>Disable, damage, or interfere with our systems.</li>
            <li>Use any bots, spiders, or automated scripts without authorization.</li>
            <li>Use manual or automated methods to copy content without permission.</li>
            <li>Introduce malware or harmful software.</li>
            <li>Gain unauthorized access to systems or data.</li>
            <li>Conduct denial-of-service attacks or similar disruptions.</li>
          </ul>
          <p>We reserve the right to investigate and take legal action against violations.</p>
          <h2>Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless GoUniNest and its affiliates from any claims, liabilities, or expenses (including legal fees) that arise from:
          </p>
          <ul>
            <li>Your use of the Platform</li>
            <li>Your violation of these Terms</li>
            <li>Any user-generated content you provide</li>
            <li>Fraud or misconduct</li>
          </ul>
          <h2>Data Privacy</h2>
          <p>
            Please refer to our <a href="/privacy-policy" className="text-electric-600 underline">Privacy Policy</a> for full details on how your personal data is collected, used, and safeguarded. All users agree to the terms of our Privacy Policy when using our Platform.
          </p>
          <h2>Third-Party Materials</h2>
          <p>
            Our Platform may include links to third-party sites or content. We do not control or endorse these resources and are not liable for your interactions with them. Use them at your own risk and subject to their respective terms.
          </p>
          <h2>Disclaimer of Warranties</h2>
          <p>
            The Platform and Services are provided "as is." GoUniNest disclaims all warranties, express or implied, including but not limited to merchantability, fitness for a particular purpose, non-infringement, and data accuracy. We do not warrant that services will be error free or uninterrupted.
          </p>
          <h2>Limitation on Liability</h2>
          <p>
            To the fullest extent permitted by law, GoUniNest shall not be liable for any direct, indirect, incidental, or consequential damages arising out of your access or use of the Platform, even if we have been advised of the possibility of such damages.
          </p>
          <h2>Termination</h2>
          <p>
            We may suspend or terminate your access to the Platform at any time, for any reason, including violations of these Terms, law enforcement requests, technical issues, or your own request for deletion.
          </p>
          <h2>Miscellaneous</h2>
          <p>
            These Terms may be updated or amended at any time without notice. In the event of a conflict between these Terms and any other document, these Terms shall prevail unless stated otherwise.
          </p>
          <h2>Waiver and Severability</h2>
          <p>
            Failure to enforce any provision of these Terms does not waive our right to do so later. If any part is deemed unenforceable, the remaining sections remain in effect.
          </p>
          <h2>Entire Agreement</h2>
          <p>
            These Terms, along with our <a href="/privacy-policy" className="text-electric-600 underline">Privacy Policy</a> and <a href="/cookie-policy" className="text-electric-600 underline">Cookie Policy</a>, constitute the entire agreement between you and GoUniNest regarding your use of the Platform.
          </p>
          <h2>Contact Information</h2>
          <ul>
            <li><b>Email:</b> info@gouninest.co.uk</li>
            <li><b>Phone:</b> +44 20 7123 4567</li>
            <li><b>Address:</b> 85 Great Portland Street, First Floor, London, W1W 7LT</li>
          </ul>
        </div>
      </div>
      <button
          onClick={downloadTerms}
          className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:from-electric-600 hover:to-amber-600 transition"
        >
          Download Terms &amp; Conditions
        </button>
    </section>
)}

export default TermsPage;