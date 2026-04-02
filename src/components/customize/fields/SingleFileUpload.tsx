/**
 * Provides design reference file uploads using the same upload ergonomics as logos.
 * Dependencies: MultiFileUpload component.
 */

"use client";

import MultiFileUpload from "./MultiFileUpload";

interface SingleFileUploadProps {
  label: string;
  value: File[];
  onChange: (files: File[]) => void;
  error?: string;
  helperText?: string;
  hideLabel?: boolean;
}

export default function SingleFileUpload({
  label,
  value,
  onChange,
  error,
  helperText,
  hideLabel = false,
}: SingleFileUploadProps) {
  return (
    <MultiFileUpload
      label={label || "Please upload your design or any reference you have"}
      value={value}
      onChange={onChange}
      error={error}
      hideLabel={hideLabel}
      acceptedTypes=".jpg,.jpeg,.png,.cdr,.ai,.pdf,.svg"
      helperText={helperText ?? "Upload one or multiple design references."}
    />
  );
}
