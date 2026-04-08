import type { Metadata } from "next";
import QuoteForm from "@/components/quote/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote | Kayns Shop",
  description:
    "Share your contact details and submit your saved product configuration for a custom quote.",
};

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-[#F3F6FC] py-6 sm:py-8">
      <QuoteForm />
    </main>
  );
}
