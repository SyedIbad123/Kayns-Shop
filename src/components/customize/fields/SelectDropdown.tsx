/**
 * Renders a styled dropdown field using shadcn Select primitives.
 * Dependencies: OptionItem type and local ui/select primitives.
 */

"use client";

import type { OptionItem } from "@/data/clothingFormConfig";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectDropdownProps {
  label: string;
  options: OptionItem[];
  value: string | null | undefined;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  hideLabel?: boolean;
}

export default function SelectDropdown({
  label,
  options,
  value,
  onChange,
  error,
  placeholder,
  hideLabel = false,
}: SelectDropdownProps) {
  return (
    <div className="space-y-3">
      {!hideLabel ? (
        <p className="text-base font-semibold text-[#111827]">{label}</p>
      ) : null}

      <Select value={value ?? undefined} onValueChange={onChange}>
        <SelectTrigger
          aria-label={label}
          className={error ? "border-[#143D59] focus:ring-[#143D59]/25" : ""}
        >
          <SelectValue placeholder={placeholder ?? "Select an option"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error ? (
        <p className="text-[13px] text-[#143D59]" aria-live="polite">
          {error}
        </p>
      ) : null}
    </div>
  );
}
