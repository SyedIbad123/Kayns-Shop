import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const CAP_IMAGE_DIMENSIONS = {
  "/baggy_cap.png": { width: 404, height: 342 },
  "/beanies.png": { width: 291, height: 299 },
  "/bucket_hat.png": { width: 419, height: 255 },
  "/flat_peak_cap.png": { width: 369, height: 375 },
  "/sun_hat.png": { width: 478, height: 319 },
  "/trucker_hat.png": { width: 356, height: 313 },
  "/visor.png": { width: 453, height: 251 },
} as const;

type CapImagePath = keyof typeof CAP_IMAGE_DIMENSIONS;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function normalizeImagePath(src?: string | null) {
  if (!src) {
    return null;
  }

  const [withoutQuery] = src.split("?");
  return withoutQuery.trim().toLowerCase();
}

export function getCapImageDimensions(src?: string | null) {
  const normalized = normalizeImagePath(src);

  if (!normalized) {
    return null;
  }

  if (!Object.prototype.hasOwnProperty.call(CAP_IMAGE_DIMENSIONS, normalized)) {
    return null;
  }

  return CAP_IMAGE_DIMENSIONS[normalized as CapImagePath];
}
