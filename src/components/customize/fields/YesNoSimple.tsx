/**
 * Renders an accessible YES/NO pill toggle for simple boolean choices without child options.
 * Dependencies: utility class merge helper.
 */

"use client";

import { cn } from "@/lib/utils";

interface YesNoSimpleProps {
  label: string;
  value: "yes" | "no" | null | undefined;
  onChange: (value: "yes" | "no") => void;
  error?: string;
  hideLabel?: boolean;
}

export default function YesNoSimple({
  label,
  value,
  onChange,
  error,
  hideLabel = false,
}: YesNoSimpleProps) {
  const selected = value ?? "no";

  return (
    <div className="space-y-3">
      {!hideLabel ? (
        <p className="text-base font-semibold text-(--label-text,#111827)">
          {label}
        </p>
      ) : null}

      <div
        role="radiogroup"
        aria-label={label}
        className="flex items-center gap-2"
      >
        {(["yes", "no"] as const).map((option) => {
          const isActive = selected === option;

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(option)}
              className={cn(
                "h-10 min-h-11 w-20 min-w-20 rounded-full border text-sm font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]/30",
                isActive
                  ? "border-[#E63946] bg-[#E63946] text-white"
                  : "border-[#D1D5DB] bg-white text-(--muted-text,#6B7280)",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      {error ? (
        <p className="text-[13px] text-[#DC2626]" aria-live="polite">
          {error}
        </p>
      ) : null}
    </div>
  );
}
