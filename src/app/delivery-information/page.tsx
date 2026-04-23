import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Delivery Information | Kayns International",
  description:
    "Delivery timelines, shipping costs, processing windows, and tracking details for Kayns International orders.",
};

export default function DeliveryInformationPage() {
  return (
    <main className="min-h-screen bg-[#F3F6FC] py-12 sm:py-16">
      <Container>
        <article className="mx-auto max-w-4xl rounded-3xl border border-[#E5E7EB] bg-white px-6 py-8 text-[#143D59] shadow-sm sm:px-10 sm:py-10">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Delivery Information
          </h1>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Shipping Costs</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Shipping costs for your Kayns International order are calculated
              based on destination, package dimensions, and weight. Shipping
              charges are based on whichever is greater: actual weight or
              volumetric (box) weight. Larger or heavier items may incur higher
              shipping costs.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              At checkout, you may have the option to choose either the fastest
              or most economical shipping method available.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Multiple Shipments</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              As orders may be fulfilled from multiple warehouses, your order
              may be shipped in separate parcels using different courier
              services. There will be no additional shipping charges for split
              shipments.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Delivery Timeframes</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We use a range of courier services. Please allow:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#4B5563] sm:text-base">
              <li>Custom orders: 3 to 4 weeks.</li>
              <li>Stock products: 3 to 6 business days.</li>
            </ul>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We also offer rush orders, which may reduce delivery times after
              consultation with the customer and subject to production capacity.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Deliveries are generally made Monday to Friday.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              We are unable to deliver to:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#4B5563] sm:text-base">
              <li>Some military addresses in the United Kingdom.</li>
              <li>
                PO Boxes and secure parcel lockers (where courier restrictions
                apply).
              </li>
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Order Processing</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#4B5563] sm:text-base">
              <li>
                Orders placed before 2:30pm (London time) will be processed the
                same business day and dispatched the following business day.
              </li>
              <li>
                Orders placed after 2:30pm (London time) will be processed the
                next business day.
              </li>
              <li>
                Orders placed on weekends or public holidays will be processed
                and shipped on the next business day.
              </li>
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Possible Delivery Delays</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Orders may be delayed due to:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#4B5563] sm:text-base">
              <li>Incorrect shipping address provided.</li>
              <li>Failed payment due to incorrect billing information.</li>
              <li>Additional verification required for fraud prevention.</li>
              <li>
                High-demand items requiring replenishment or additional
                production time.
              </li>
              <li>
                Unforeseen circumstances beyond our control, including severe
                weather events or courier disruptions.
              </li>
            </ul>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              If your order does not arrive within the estimated timeframe,
              please contact Kayns International Customer Service.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Order Tracking</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Once your order has been shipped, a tracking number will be
              emailed to you.
            </p>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              If you do not receive your tracking details, please contact Kayns
              International Customer Service.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">International Shipping</h2>
            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
              Kayns International offers both domestic and international
              shipping. Delivery timeframes for overseas orders may vary
              depending on destination, customs processing, and courier service.
            </p>
          </section>
        </article>
      </Container>
    </main>
  );
}
