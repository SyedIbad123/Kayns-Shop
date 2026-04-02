/**
 * Provides the colors description textarea with minimum-length guidance and informational swatches.
 * Dependencies: none beyond React runtime.
 */

"use client";

interface ColorDescriptionFieldProps {
  value: string | null | undefined;
  onChange: (value: string) => void;
  error?: string;
  hideLabel?: boolean;
}

const COLOR_SWATCHES = [
  "#E63946",
  "#2563EB",
  "#059669",
  "#F59E0B",
  "#6B7280",
  "#111827",
];

const placeholderText =
  "Describe how many colors you want. You can write color codes";

export default function ColorDescriptionField({
  value,
  onChange,
  error,
  hideLabel = false,
}: ColorDescriptionFieldProps) {
  const currentValue = value ?? "";

  return (
    <div className="space-y-3">
      {!hideLabel ? (
        <label
          htmlFor="colors-description"
          className="text-base font-semibold text-label-text"
        >
          Colors
        </label>
      ) : null}

      <textarea
        id="colors-description"
        value={currentValue}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholderText}
        className="min-h-32 w-full rounded-xl border border-[#D1D5DB] bg-white px-3 py-2.5 text-sm text-label-text outline-none transition focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20"
      />

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-[#6B7280]">Minimum 5 characters required</p>
        <p className="text-xs font-medium text-[#6B7280]">
          {currentValue.length} chars
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {COLOR_SWATCHES.map((swatch) => (
          <span
            key={swatch}
            className="h-6 w-6 rounded-full border border-[#E5E7EB]"
            style={{ backgroundColor: swatch }}
            aria-hidden="true"
          />
        ))}
        <span className="text-xs text-[#6B7280]">
          Sample swatches for reference
        </span>
      </div>

      {error ? (
        <p className="text-[13px] text-[#DC2626]" aria-live="polite">
          {error}
        </p>
      ) : null}
    </div>
  );
}
