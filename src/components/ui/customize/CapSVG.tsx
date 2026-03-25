"use client";

export interface CapColors {
  body: string;
  brim: string;
  button: string;
  sweatband: string;
  cord: boolean;
}

export const DEFAULT_CAP_COLORS: CapColors = {
  body: "#9CA3AF",
  brim: "#6B7280",
  button: "#374151",
  sweatband: "#D1D5DB",
  cord: false,
};

export default function CapSVG({ colors }: { colors: CapColors }) {
  return (
    <svg
      viewBox="0 0 320 280"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-label="Cap preview"
    >
      {/* Body / crown */}
      <path
        d="M 60 160 Q 60 60 160 50 Q 260 60 260 160 Z"
        fill={colors.body}
        stroke="#fff"
        strokeWidth="1.5"
      />
      {/* Brim */}
      <path
        d="M 40 168 Q 80 200 160 202 Q 240 200 280 168 L 260 160 Q 200 185 160 186 Q 120 185 60 160 Z"
        fill={colors.brim}
        stroke="#fff"
        strokeWidth="1.5"
      />
      {/* Top button */}
      <circle cx="160" cy="54" r="9" fill={colors.button} />
      {/* Sweatband line */}
      <path
        d="M 65 158 Q 160 178 255 158"
        fill="none"
        stroke={colors.sweatband}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Panel seams */}
      <path
        d="M160 52 Q140 110 95 155"
        fill="none"
        stroke="#ffffff55"
        strokeWidth="1.2"
      />
      <path
        d="M160 52 Q180 110 225 155"
        fill="none"
        stroke="#ffffff55"
        strokeWidth="1.2"
      />
      {/* Cord (optional) */}
      {colors.cord && (
        <line
          x1="160"
          y1="202"
          x2="160"
          y2="240"
          stroke="#374151"
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
