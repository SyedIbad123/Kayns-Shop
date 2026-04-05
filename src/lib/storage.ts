import type { ClothingProductType } from "@/data/clothingFormConfig";
import type { CapType } from "@/types/cap.types";

export type QuoteFileCategory = "logo" | "design-reference";

export interface StoredUploadedFileSummary {
  fileName: string;
  mimeType: string;
  sizeInBytes: number;
  category: QuoteFileCategory;
  description?: string;
}

export const STORAGE_KEYS = {
  productConfig: "product_config",
  svgConfig: "svg_config",
  quoteConfig: "quote_config",
  quoteFormData: "quote_form_data",
} as const;

export interface StoredStandardConfig {
  source: "standard";
  productId: string;
  productType: ClothingProductType;
  values: Record<string, unknown>;
  logo?: StoredLogoUpload | null;
  uploadedFiles?: StoredUploadedFileSummary[];
  updatedAt: string;
  sourcePath?: string;
}

export interface StoredSvgPanel {
  key: string;
  label: string;
  color: string;
}

export interface StoredLogoUpload {
  fileName: string;
  mimeType: string;
  sizeInBytes: number;
  dataUrl: string;
  description?: string;
}

export type ExtraMotifType = "text" | "logo";

export interface StoredExtraMotif {
  id: string;
  type: ExtraMotifType;
  panelKey: string;
  panelLabel: string;
  color: string;
  text: string;
  logo: StoredLogoUpload | null;
}

export interface StoredSvgConfig {
  source: "svg";
  capId: string;
  capLabel: string;
  capType: CapType;
  colors: Record<string, string>;
  panels: StoredSvgPanel[];
  logo?: StoredLogoUpload | null;
  extraMotifs?: StoredExtraMotif[];
  svgMarkup?: string | null;
  svgViews?: string[];
  uploadedFiles?: StoredUploadedFileSummary[];
  updatedAt: string;
  sourcePath?: string;
}

export type StoredQuoteConfig = StoredStandardConfig | StoredSvgConfig;

export interface StoredQuoteFormData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  clubReference?: string;
  fullAddress: string;
  comments?: string;
}

function canUseStorage() {
  return typeof window !== "undefined";
}

function readJson<T>(key: string): T | null {
  if (!canUseStorage()) {
    return null;
  }

  const raw = localStorage.getItem(key);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  if (!canUseStorage()) {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}

function parseTime(value: string | undefined) {
  if (!value) {
    return 0;
  }

  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function saveProductConfig(config: StoredStandardConfig) {
  writeJson(STORAGE_KEYS.productConfig, config);
}

export function getProductConfig() {
  return readJson<StoredStandardConfig>(STORAGE_KEYS.productConfig);
}

export function clearProductConfig() {
  if (!canUseStorage()) {
    return;
  }

  localStorage.removeItem(STORAGE_KEYS.productConfig);
}

export function saveSvgConfig(config: StoredSvgConfig) {
  writeJson(STORAGE_KEYS.svgConfig, config);
}

export function getSvgConfig() {
  return readJson<StoredSvgConfig>(STORAGE_KEYS.svgConfig);
}

export function saveQuoteConfig(config: StoredQuoteConfig) {
  writeJson(STORAGE_KEYS.quoteConfig, config);
}

export function getQuoteConfig() {
  return readJson<StoredQuoteConfig>(STORAGE_KEYS.quoteConfig);
}

export function getMostRecentConfig(): StoredQuoteConfig | null {
  const directQuoteConfig = getQuoteConfig();
  if (directQuoteConfig) {
    return directQuoteConfig;
  }

  const productConfig = getProductConfig();
  const svgConfig = getSvgConfig();

  if (!productConfig && !svgConfig) {
    return null;
  }

  if (productConfig && !svgConfig) {
    return productConfig;
  }

  if (!productConfig && svgConfig) {
    return svgConfig;
  }

  return parseTime(productConfig?.updatedAt) >= parseTime(svgConfig?.updatedAt)
    ? (productConfig as StoredStandardConfig)
    : (svgConfig as StoredSvgConfig);
}

export function saveQuoteFormData(data: StoredQuoteFormData) {
  writeJson(STORAGE_KEYS.quoteFormData, data);
}

export function getQuoteFormData() {
  return readJson<StoredQuoteFormData>(STORAGE_KEYS.quoteFormData);
}

export function clearQuoteStorage() {
  if (!canUseStorage()) {
    return;
  }

  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
