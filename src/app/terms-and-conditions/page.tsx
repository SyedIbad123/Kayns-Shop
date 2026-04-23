import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms and Conditions | Kayns International",
  description:
    "Terms and conditions governing use of the Kayns International website, products, and services.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#F3F6FC] py-12 sm:py-16">
      <Container>
        <article className="mx-auto max-w-4xl rounded-3xl border border-[#E5E7EB] bg-white px-6 py-8 text-[#143D59] shadow-sm sm:px-10 sm:py-10">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#4B5563] sm:text-base">
            Kayns International is referred to as &quot;we,&quot;
            &quot;us,&quot; and &quot;our&quot; in these Terms and Conditions.
            All content on this website, including your ability to purchase our
            product(s), is offered to you subject to the following terms and
            conditions.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#4B5563] sm:text-base">
            We may revise these Terms and Conditions at any time, and your
            continued use of the website after such revisions means that you
            accept the Terms and Conditions as revised. We recommend reviewing
            these terms each time you use our website.
          </p>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Users</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Becoming a registered user may be required to access certain
              features of this website. You agree to provide current and
              accurate registration information at all times.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We may provide you with a unique ID and password when you
              register. If you violate these Terms and Conditions, we reserve
              the right to suspend or cancel your account.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">
              Access to Our Online Services
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#4B5563] sm:text-base">
              <li>
                Clients must be at least eighteen (18) years old to purchase
                from our website or have parental permission to do so.
              </li>
              <li>
                All listed prices are in British Pounds (GBP) and include
                applicable VAT, unless stated otherwise.
              </li>
              <li>
                We reserve the right to change pricing at any time, however we
                will honor the price shown at the time your order is placed.
              </li>
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Product Specifications</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              While we make every effort to provide accurate product
              descriptions, we do not warrant that descriptions, images, or
              other content are error-free, complete, or current.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Images are for illustrative purposes only. Colours may vary
              slightly due to screen settings, materials, or manufacturing
              variations.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Purchasing of Products</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#4B5563] sm:text-base">
              <li>
                By placing an order, you confirm you are at least 18 years old
                or have parental permission.
              </li>
              <li>
                Availability of products is subject to stock and production
                capacity.
              </li>
              <li>
                Shipping costs are not included in product prices unless stated
                otherwise.
              </li>
              <li>
                Order acceptance occurs when we issue an order confirmation.
              </li>
              <li>
                Once full payment is received, we will process and dispatch your
                order in accordance with our Delivery Information page.
              </li>
              <li>Risk of loss or damage passes to you upon delivery.</li>
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Custom-Made Products</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Due to the personalised nature of custom-made products, orders
              approved by the customer and placed into production cannot be
              cancelled, returned, or refunded unless the item is faulty,
              damaged, or supplied incorrectly.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Custom orders generally require 3 to 4 weeks for delivery. Stock
              products generally require 3 to 6 business days. Rush orders may
              be available after consultation.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">
              Order Cancellation Due to Errors
            </h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We reserve the right to refuse or cancel any order placed for
              products listed with incorrect pricing, descriptions, or images
              due to typographical errors or similar mistakes.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              If payment has already been processed, a full refund will be
              issued.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Refunds and Exchanges</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#4B5563] sm:text-base">
              <li>
                Items returned within 14 days of receipt, unused, in original
                packaging, and with proof of purchase may be eligible for
                exchange in accordance with our Returns Policy.
              </li>
              <li>
                Custom-made products are non-returnable unless faulty, damaged,
                or supplied incorrectly.
              </li>
              <li>
                If a defective or incorrect item is supplied, we will provide a
                replacement, exchange, or refund in accordance with applicable
                law.
              </li>
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Access to This Site</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We grant you a limited licence to access and make personal use of
              this website.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              You may not reproduce, copy, republish, distribute, frame, mirror,
              or exploit any content from this website without our prior written
              consent.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Use of this website is also subject to the Copyright, Designs and
              Patents Act 1988 (UK).
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Hyperlinks</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              This website may include links to third-party websites. We are not
              responsible for their content, policies, or practices.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              You may not link to our website or use our intellectual property
              without our written approval.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">
              Intellectual Property Rights
            </h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              All content on this website, including graphics, logos, text,
              layouts, and images, is owned by or licensed to Kayns
              International.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Any comments, feedback, ideas, or suggestions submitted to us may
              be used by us without compensation.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Disclaimers</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We make no warranties, express or implied, regarding the accuracy,
              reliability, or suitability of information on this website.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We take reasonable steps to keep our website secure, but do not
              guarantee it will be free from viruses or interruptions.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Consumer Rights</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Nothing in these Terms and Conditions excludes your rights under
              the Consumer Rights Act 2015 (UK) or other applicable consumer
              protection laws.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Where goods are faulty or services are not provided with
              reasonable care and skill, you may be entitled to repair,
              replacement, or refund as provided by law.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Limitation of Liability</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              To the fullest extent permitted by law, we shall not be liable for
              indirect, incidental, or consequential losses arising from use of
              our website, products, or services.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Nothing in these terms limits liability where it cannot be
              excluded under law.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Indemnity</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              You agree to indemnify and hold us harmless from claims, damages,
              costs, and expenses arising from your breach of these Terms and
              Conditions or misuse of this website.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Force Majeure</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We shall not be liable for delays or failure to perform caused by
              events beyond our reasonable control, including natural disasters,
              strikes, supply disruptions, or courier delays.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Jurisdiction</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              These Terms and Conditions are governed by the laws of the United
              Kingdom.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Any disputes arising from these Terms and Conditions shall be
              subject to the exclusive jurisdiction of the courts of England and
              Wales.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              If any provision of these Terms and Conditions is found invalid or
              unenforceable, the remaining provisions shall continue in full
              force and effect.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Privacy</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We are committed to protecting your information in accordance with
              applicable privacy laws and our Privacy Policy.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">International Orders</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Kayns International supplies goods domestically and
              internationally. International orders may be subject to customs
              duties, taxes, and import regulations of the destination country,
              which remain the responsibility of the customer.
            </p>
          </section>
        </article>
      </Container>
    </main>
  );
}
