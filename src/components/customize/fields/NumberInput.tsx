/**
 * Renders integer quantity input with increment/decrement controls and bulk-pricing advisory.
 * Dependencies: cn utility.
 */

"use client";

import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

interface NumberInputProps {
  label: string;
  value: number | null | undefined;
  onChange: (value: number) => void;
  error?: string;
  min?: number;
  max?: number;
  hideLabel?: boolean;
}

export default function NumberInput({
  label,
  value,
  onChange,
  error,
  min = 1,
  max = 100000,
  hideLabel = false,
}: NumberInputProps) {
  const currentValue =
    typeof value === "number" && Number.isFinite(value) ? value : min;

  const setNextValue = (nextValue: number) => {
    const boundedValue = Math.min(max, Math.max(min, Math.trunc(nextValue)));
    onChange(boundedValue);
  };

  return (
    <div className="space-y-3">
      {!hideLabel ? (
        <label
          htmlFor="order-quantity"
          className="text-base font-semibold text-label-text"
        >
          {label}
        </label>
      ) : null}

      <div className="flex max-w-sm items-center gap-2">
        <button
          type="button"
          className="inline-flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-lg border border-[#D1D5DB] bg-white text-label-text transition hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]/30"
          onClick={() => setNextValue(currentValue - 1)}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>

        <input
          id="order-quantity"
          type="number"
          inputMode="numeric"
          value={currentValue}
          min={min}
          max={max}
          step={1}
          onChange={(event) => {
            const parsedValue = Number(event.target.value);
            if (Number.isNaN(parsedValue)) {
              setNextValue(min);
              return;
            }
            setNextValue(parsedValue);
          }}
          className={cn(
            "h-11 w-full rounded-lg border border-[#D1D5DB] bg-white px-3 text-sm text-label-text outline-none transition focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20",
            error && "border-[#DC2626]",
          )}
        />

        <button
          type="button"
          className="inline-flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-lg border border-[#D1D5DB] bg-white text-label-text transition hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]/30"
          onClick={() => setNextValue(currentValue + 1)}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <p className="text-xs text-[#6B7280]">Minimum 1 unit</p>

      {currentValue < 10 ? (
        <p className="text-xs text-[#D97706]" aria-live="polite">
          Note: Minimum bulk pricing applies from 10 units
        </p>
      ) : null}

      {error ? (
        <p className="text-[13px] text-[#DC2626]" aria-live="polite">
          {error}
        </p>
      ) : null}
    </div>
  );
}
