"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import CAP_REGISTRY from "@/components/ui/customize/CapRegistry";

interface MenuItem {
  label: string;
}

const MENU_ITEMS: MenuItem[] = CAP_REGISTRY.map((cap) => ({
  label: cap.label,
}));

interface Props {
  selected: string;
  onSelect: (label: string) => void;
}

export default function ProductDropdown({ selected, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(label: string) {
    onSelect(label);
    setOpen(false);
  }

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm transition-all hover:border-gray-400 hover:shadow-md"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <span className="truncate">{selected || "Select a Product"}</span>
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
          style={{ maxHeight: "360px", overflowY: "auto" }}
          role="listbox"
        >
          {MENU_ITEMS.map((item) => (
            <div key={item.label} className="relative">
              <button
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                  selected === item.label
                    ? "bg-gray-50 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => handleSelect(item.label)}
                role="option"
                aria-selected={selected === item.label}
              >
                <span className="font-medium">{item.label}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
