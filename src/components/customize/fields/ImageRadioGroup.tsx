/**
 * Renders accessible image-radio option cards used across dynamic clothing form sections.
 * Dependencies: OptionItem type from clothingFormConfig and cn utility.
 */

"use client";

import { useId, useMemo, useRef } from "react";
import { Check } from "lucide-react";

import type { OptionItem } from "@/data/clothingFormConfig";
import { cn } from "@/lib/utils";

interface ImageRadioGroupProps {
  label: string;
  options: OptionItem[];
  value: string | null | undefined;
  onChange: (value: string) => void;
  error?: string;
  columns?: number;
  hideLabel?: boolean;
}

const fallbackIcon =
  '<svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16 20L26 10H38L48 20V31H42V24L37 21V52H27V21L22 24V31H16V20Z" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export default function ImageRadioGroup({
  label,
  options,
  value,
  onChange,
  error,
  columns,
  hideLabel = false,
}: ImageRadioGroupProps) {
  const groupId = useId();
  const groupRef = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedIndex = useMemo(
    () => options.findIndex((option) => option.value === value),
    [options, value],
  );

  const gridClass = useMemo(() => {
    if (columns === 2) {
      return "grid-cols-2";
    }

    if (columns === 3) {
      return "grid-cols-2 sm:grid-cols-3";
    }

    if (columns === 4) {
      return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
    }

    return options.length <= 2
      ? "grid-cols-2"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
  }, [columns, options.length]);

  const moveSelection = (nextIndex: number) => {
    if (!options[nextIndex]) {
      return;
    }
    onChange(options[nextIndex].value);
    groupRef.current[nextIndex]?.focus();
  };

  const onCardKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (["ArrowRight", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      const nextIndex = (index + 1) % options.length;
      moveSelection(nextIndex);
      return;
    }

    if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      const nextIndex = (index - 1 + options.length) % options.length;
      moveSelection(nextIndex);
    }
  };

  return (
    <div className="space-y-3">
      {!hideLabel ? (
        <h3
          id={groupId}
          className="text-base font-semibold"
          style={{ color: "#111827" }}
        >
          {label}
        </h3>
      ) : null}

      <div
        role="radiogroup"
        aria-labelledby={hideLabel ? undefined : groupId}
        aria-label={hideLabel ? label : undefined}
        className={cn("grid gap-3", gridClass)}
      >
        {options.map((option, index) => {
          const isSelected = option.value === value;

          return (
            <button
              key={option.value}
              ref={(element) => {
                groupRef.current[index] = element;
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={option.label}
              tabIndex={
                selectedIndex === -1
                  ? index === 0
                    ? 0
                    : -1
                  : isSelected
                    ? 0
                    : -1
              }
              onClick={() => onChange(option.value)}
              onKeyDown={(event) => onCardKeyDown(event, index)}
              className={cn(
                "relative flex min-h-24 min-w-11 items-center gap-3 rounded-xl border bg-white p-4 text-left transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#143D59]/35 focus-visible:outline-none",
                "border-[#E5E7EB]",
                isSelected &&
                  "scale-[1.02] border-2 border-[#143D59] bg-[#F3F6FC]",
                error && "border-[#143D59]",
              )}
            >
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white"
                dangerouslySetInnerHTML={{
                  __html: option.icon ?? fallbackIcon,
                }}
              />

              <span className="min-w-0">
                <span
                  className="block text-sm font-medium"
                  style={{ color: "#111827" }}
                >
                  {option.label}
                </span>
                {typeof option.priceModifier === "number" ? (
                  <span className="mt-0.5 block text-xs text-[#6B7280]">
                    + £{option.priceModifier.toFixed(2)}
                  </span>
                ) : null}
              </span>

              {isSelected ? (
                <span className="absolute right-2 top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#143D59] text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {error ? (
        <p className="text-[13px] text-[#143D59]" aria-live="polite">
          {error}
        </p>
      ) : null}
    </div>
  );
}
