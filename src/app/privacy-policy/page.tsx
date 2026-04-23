import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | Kayns International",
  description:
    "How Kayns International collects, uses, stores, and protects personal data under UK GDPR.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F3F6FC] py-12 sm:py-16">
      <Container>
        <article className="mx-auto max-w-4xl rounded-3xl border border-[#E5E7EB] bg-white px-6 py-8 text-[#143D59] shadow-sm sm:px-10 sm:py-10">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#4B5563] sm:text-base">
            This Privacy Policy explains how Kayns International
            (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects, uses,
            stores, and protects your personal data when you use our website or
            services.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#4B5563] sm:text-base">
            We are committed to protecting your privacy in accordance with the
            UK General Data Protection Regulation (UK GDPR) and the Data
            Protection Act 2018.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#4B5563] sm:text-base">
            By using our website, you agree to the practices described in this
            Privacy Policy.
          </p>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We may collect and process the following personal data:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#4B5563] sm:text-base">
              <li>Full name.</li>
              <li>Email address.</li>
              <li>Phone number.</li>
              <li>Billing and shipping address.</li>
              <li>Order and payment information.</li>
              <li>IP address and device/browser information.</li>
              <li>Website usage data (via cookies and analytics tools).</li>
            </ul>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We only collect data necessary to process orders, provide customer
              service, and operate our business.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">
              2. How We Use Your Information
            </h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We use your personal data for the following purposes:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#4B5563] sm:text-base">
              <li>Processing and fulfilling orders.</li>
              <li>Managing payments and refunds.</li>
              <li>Providing customer support.</li>
              <li>Sending order updates and delivery notifications.</li>
              <li>Improving our website, services, and user experience.</li>
              <li>Fraud prevention and security checks.</li>
              <li>Legal and regulatory compliance.</li>
            </ul>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We will not use your personal data for purposes that are
              incompatible with these.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">
              3. Legal Basis for Processing
            </h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We process your personal data under the following lawful bases:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#4B5563] sm:text-base">
              <li>Contractual necessity: to process and deliver your order.</li>
              <li>
                Legal obligation: to comply with applicable laws and tax
                requirements.
              </li>
              <li>
                Legitimate interests: to improve services and prevent fraud.
              </li>
              <li>
                Consent: where you have explicitly agreed (for example,
                marketing emails).
              </li>
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">
              4. Sharing Your Information
            </h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We do not sell or rent your personal data.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We may share your information only with trusted third parties
              where necessary, including:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#4B5563] sm:text-base">
              <li>Payment processors.</li>
              <li>Courier and logistics companies.</li>
              <li>IT and hosting service providers.</li>
              <li>Fraud prevention services.</li>
              <li>Legal or regulatory authorities (if required by law).</li>
            </ul>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              All third parties are required to handle your data securely and in
              compliance with applicable data protection laws.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">
              5. Data Storage and Security
            </h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We take appropriate technical and organisational measures to
              protect your personal data against loss, misuse, unauthorised
              access, alteration, or disclosure.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Your data is stored securely on protected systems and is
              accessible only to authorised personnel.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We retain personal data only for as long as necessary to fulfil
              the purposes outlined in this policy, including legal, tax, and
              accounting obligations.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              When no longer required, data is securely deleted or anonymised.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">
              6. Cookies and Tracking Technologies
            </h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#4B5563] sm:text-base">
              <li>Enable website functionality.</li>
              <li>Improve user experience.</li>
              <li>Analyse website traffic and performance.</li>
              <li>Remember user preferences.</li>
            </ul>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              You can disable cookies in your browser settings, but some
              features of the website may not function properly.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We are not responsible for the privacy practices of third-party
              websites accessed through external links.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">7. Your Rights (UK GDPR)</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Under UK data protection law, you may have the right to:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#4B5563] sm:text-base">
              <li>Access your personal data.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data.</li>
              <li>Object to or restrict processing.</li>
              <li>Request data portability.</li>
              <li>Withdraw consent at any time (where applicable).</li>
            </ul>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              To exercise any of these rights, please contact us using the
              details below.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">
              8. International Data Transfers
            </h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              As Kayns International may offer international shipping, your data
              may be processed outside the United Kingdom.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Where this occurs, we ensure appropriate safeguards are in place
              to protect your data in accordance with UK GDPR requirements.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">9. Data Retention</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We retain personal data only for as long as necessary:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#4B5563] sm:text-base">
              <li>To fulfil orders.</li>
              <li>To meet legal and tax obligations.</li>
              <li>To resolve disputes.</li>
              <li>To enforce agreements.</li>
            </ul>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              After this period, data is securely deleted or anonymised.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">10. Third-Party Links</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Our website may contain links to external websites. We are not
              responsible for the privacy practices, content, or policies of
              third-party sites.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">
              11. Changes to This Policy
            </h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We may update this Privacy Policy from time to time.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Any changes will be posted on this page. Continued use of the
              website after updates means you accept the revised policy.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">12. Contact Us</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              If you have any questions about this Privacy Policy or how your
              data is handled, you may contact:
            </p>
            <p className="text-sm font-medium leading-7 text-[#143D59] sm:text-base">
              Kayns International
            </p>
          </section>
        </article>
      </Container>
    </main>
  );
}
