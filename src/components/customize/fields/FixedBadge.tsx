/**
 * Displays fixed, read-only field values for non-editable product constraints like long sleeve only.
 * Dependencies: lucide-react icon set.
 */

"use client";

import { Lock } from "lucide-react";

interface FixedBadgeProps {
  label: string;
  value: string;
  hideLabel?: boolean;
}

function toTitleCase(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export default function FixedBadge({
  label,
  value,
  hideLabel = false,
}: FixedBadgeProps) {
  return (
    <div className="space-y-3">
      {!hideLabel ? (
        <p className="text-base font-semibold text-(--label-text,#111827)">
          {label}
        </p>
      ) : null}
      <div
        aria-readonly="true"
        className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 text-sm text-(--muted-text,#6B7280)"
      >
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-(--muted-text,#6B7280)" />
          <span className="font-medium italic">{toTitleCase(value)}</span>
        </div>
        <p className="mt-1 text-xs italic text-(--muted-text,#6B7280)]">
          This option is fixed for this product type
        </p>
      </div>
    </div>
  );
}
