import type { StoredUploadedFileSummary } from "@/lib/storage";

export interface PendingQuoteFilesPayload {
  source: "standard";
  createdAt: string;
  files: Array<{
    file: File;
    summary: StoredUploadedFileSummary;
  }>;
}

let pendingQuoteFiles: PendingQuoteFilesPayload | null = null;

export function setPendingQuoteFiles(payload: PendingQuoteFilesPayload | null) {
  pendingQuoteFiles = payload;
}

export function getPendingQuoteFiles() {
  return pendingQuoteFiles;
}

export function clearPendingQuoteFiles() {
  pendingQuoteFiles = null;
}

export function consumePendingQuoteFiles() {
  const current = pendingQuoteFiles;
  pendingQuoteFiles = null;
  return current;
}
