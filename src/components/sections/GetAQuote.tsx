"use client";

import Image from "next/image";

export default function GetAQuote() {
  return (
    <section
      className="bg-dark-blue px-6 py-10 text-white"
      aria-label="Get a Quote"
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-6 sm:flex-row sm:items-center">
        {/* Text */}
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold uppercase tracking-widest sm:text-3xl">
            Customize
          </h2>
          <p className="mt-2 text-md leading-relaxed text-gray-300">
            Share your product concept and brand details, and KAYNS will return
            a tailored quote with customization options, pricing, and delivery
            timelines.
          </p>
        </div>

        {/* Image */}
        <div className="relative h-44 w-full max-w-xs shrink-0 overflow-hidden rounded-lg sm:h-52 sm:w-80">
          <Image
            src="https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg"
            alt="Get a quote"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
