/**
 * Renders YES/NO toggle controls and conditionally reveals dependent option cards when YES is selected.
 * Dependencies: ImageRadioGroup and OptionItem contract from clothingFormConfig.
 */

"use client";

import { useEffect } from "react";

import type { OptionItem } from "@/data/clothingFormConfig";
import { cn } from "@/lib/utils";

import ImageRadioGroup from "./ImageRadioGroup";

interface YesNoConditionalProps {
  label: string;
  value: "yes" | "no" | null | undefined;
  onChange: (value: "yes" | "no") => void;
  conditionalOptions: OptionItem[];
  conditionalValue: string | null | undefined;
  onConditionalChange: (value: string | null) => void;
  error?: string;
  conditionalError?: string;
  hideLabel?: boolean;
}

export default function YesNoConditional({
  label,
  value,
  onChange,
  conditionalOptions,
  conditionalValue,
  onConditionalChange,
  error,
  conditionalError,
  hideLabel = false,
}: YesNoConditionalProps) {
  const selectedValue = value ?? "no";

  useEffect(() => {
    if (selectedValue === "no" && conditionalValue) {
      onConditionalChange(null);
    }
  }, [conditionalValue, onConditionalChange, selectedValue]);

  const chooseValue = (nextValue: "yes" | "no") => {
    onChange(nextValue);
    if (nextValue === "no") {
      onConditionalChange(null);
    }
  };

  return (
    <div className="space-y-3">
      {!hideLabel ? (
        <p className="text-base font-semibold text-[#111827]">{label}</p>
      ) : null}

      <div
        role="radiogroup"
        aria-label={label}
        className="flex items-center gap-2"
      >
        {(["yes", "no"] as const).map((option) => {
          const isActive = selectedValue === option;

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => chooseValue(option)}
              className={cn(
                "h-10 min-h-11 w-20 min-w-20 rounded-full border text-sm font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D59]/30",
                isActive
                  ? "border-[#143D59] bg-[#143D59] text-white"
                  : "border-[#D1D5DB] bg-white text-[#6B7280]",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      {error ? (
        <p className="text-[13px] text-[#143D59]" aria-live="polite">
          {error}
        </p>
      ) : null}

      <div
        className={cn(
          "overflow-hidden border-l-2 border-[#143D59]/20 pl-4 transition-[max-height,opacity] duration-300 ease-in-out",
          selectedValue === "yes"
            ? "max-h-350 opacity-100"
            : "max-h-0 opacity-0",
        )}
        aria-hidden={selectedValue !== "yes"}
      >
        <div className="pt-1">
          <ImageRadioGroup
            label={`${label} Type`}
            hideLabel
            options={conditionalOptions}
            value={conditionalValue}
            onChange={(next) => onConditionalChange(next)}
            error={selectedValue === "yes" ? conditionalError : undefined}
            columns={conditionalOptions.length <= 2 ? 2 : 3}
          />
        </div>
      </div>
    </div>
  );
}
