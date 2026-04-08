"use client";

import Image from "next/image";
import { useState } from "react";

const SHIRT_STYLES = ["#D1D5DB", "#9CA3AF", "#6B7280", "#374151"];
const COLLAR_STYLES = ["#D1D5DB", "#9CA3AF", "#6B7280", "#374151"];
const OPTION_PREVIEW_IMAGE =
  "https://img.freepik.com/free-photo/beautiful-lake-mountains_395237-44.jpg?semt=ais_rp_50_assets&w=740&q=80";

interface Props {
  title: string;
  description: string;
}

export default function SingleProductOption({ title, description }: Props) {
  const [capName, setCapName] = useState("");
  const [color, setColor] = useState("");
  const [detail, setDetail] = useState("");
  const [extraDetail, setExtraDetail] = useState("");
  const [hasCord, setHasCord] = useState(false);
  const [shirtStyle, setShirtStyle] = useState<string | null>(null);
  const [collarStyle, setCollarStyle] = useState<string | null>(null);

  return (
    <section className="min-h-screen" aria-label="Single product option">
      {/* White header */}
      <div className="bg-white px-6 py-10 text-center">
        <h1 className="text-2xl font-extrabold uppercase tracking-widest text-gray-900 sm:text-3xl md:text-4xl">
          {title.replace("Design ", "").toUpperCase()}&ensp;OPTION&ensp;1
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-gray-700">
          {description}
        </p>
      </div>

      {/* Red background form */}
      <div className="relative bg-[#143D59] px-4 pb-16 pt-4">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:items-start">
          {/* Left preview image */}
          <div className="mx-auto w-full max-w-md lg:max-w-xl">
            <div className="relative aspect-4/4 overflow-hidden p-4">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src={OPTION_PREVIEW_IMAGE}
                  alt={`${title} preview`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <p className="mt-4 text-center text-sm font-semibold text-white/90">
              Picture for illustrative purposes only at this stage.
            </p>
          </div>

          {/* Right form */}
          <div className="mx-auto flex w-full max-w-xl flex-col gap-3 lg:justify-self-end">
            {/* English Cricket cap */}
            <div className="overflow-hidden rounded-xl bg-white">
              <input
                type="text"
                placeholder="English Cricket cap"
                value={capName}
                onChange={(e) => setCapName(e.target.value)}
                className="w-full px-5 py-3.5 text-sm text-gray-700 outline-none placeholder-gray-400"
                aria-label="Cap name"
              />
            </div>

            {/* Select Color */}
            <div className="overflow-hidden rounded-xl bg-white">
              <input
                type="text"
                placeholder="Select Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-5 py-3.5 text-sm text-gray-700 outline-none placeholder-gray-400"
                aria-label="Select color"
              />
            </div>

            {/* kayns field */}
            <div className="overflow-hidden rounded-xl bg-white">
              <input
                type="text"
                placeholder="kayns"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                className="w-full px-5 py-3.5 text-sm text-gray-700 outline-none placeholder-gray-400"
                aria-label="Detail"
              />
            </div>

            {/* kayns + checkbox */}
            <div className="rounded-xl bg-white px-5 py-3.5">
              <input
                type="text"
                placeholder="kayns"
                value={extraDetail}
                onChange={(e) => setExtraDetail(e.target.value)}
                className="w-full text-sm text-gray-700 outline-none placeholder-gray-400"
                aria-label="Extra detail"
              />
              <div className="mt-2">
                <input
                  type="checkbox"
                  checked={hasCord}
                  onChange={(e) => setHasCord(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-[#143D59]"
                  aria-label="Option checkbox"
                />
              </div>
            </div>

            {/* Shirt style */}
            <div className="rounded-xl bg-white px-5 py-4">
              <p className="mb-3 text-sm font-medium text-gray-700">
                Shirt style
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SHIRT_STYLES.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setShirtStyle(color)}
                    style={{ backgroundColor: color }}
                    className={`h-12 rounded-xl border-2 transition hover:opacity-80 ${
                      shirtStyle === color
                        ? "border-[#143D59]"
                        : "border-transparent"
                    }`}
                    aria-label={`Shirt style ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Collar style */}
            <div className="rounded-xl bg-white px-5 py-4">
              <p className="mb-3 text-sm font-medium text-gray-700">
                colar style
              </p>
              <div className="grid grid-cols-2 gap-2">
                {COLLAR_STYLES.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setCollarStyle(color)}
                    style={{ backgroundColor: color }}
                    className={`h-12 rounded-xl border-2 transition hover:opacity-80 ${
                      collarStyle === color
                        ? "border-[#143D59]"
                        : "border-transparent"
                    }`}
                    aria-label={`Collar style ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
