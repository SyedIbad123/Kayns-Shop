import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quote Sent | Kayns Shop",
  description: "Your quote request has been submitted successfully.",
};

export default function QuoteSuccessPage() {
  return (
    <main className="min-h-screen bg-[#F3F6FC] px-4 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-2xl rounded-3xl border border-[#E5E7EB] bg-white px-6 py-8 text-center shadow-sm sm:px-10 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#143D59]">
          Quote Request Sent
        </p>
        <h1 className="mt-2 text-3xl font-bold text-label-text">Thank you!</h1>
        <p className="mt-3 text-sm leading-6 text-[#4B5563] sm:text-base">
          We received your request and our team will contact you shortly with a
          detailed quote.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="site-btn inline-flex h-11 min-h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold"
          >
            Return to Home
          </Link>
          <Link
            href="/quote"
            className="site-btn inline-flex h-11 min-h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold"
          >
            Submit Another Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
