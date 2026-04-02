/**
 * Handles multi-file logo uploads with drag-drop, client-side type/size checks, previews, and optional position comments.
 * Dependencies: lucide-react icons and cn utility.
 */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FileImage, FileText, Upload, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface MultiFileUploadProps {
  label: string;
  value: File[];
  onChange: (files: File[]) => void;
  error?: string;
  hideLabel?: boolean;
  showPositionComment?: boolean;
  positionComment?: string;
  onPositionCommentChange?: (value: string) => void;
  positionCommentError?: string;
  acceptedTypes?: string;
  maxFiles?: number;
  helperText?: string;
}

const DEFAULT_ACCEPTED = ".jpg,.jpeg,.png,.cdr,.ai,.pdf,.svg";
const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;

function normalizeAcceptedTypes(acceptedTypes: string) {
  return acceptedTypes
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

function fileExtension(fileName: string) {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return "";
  }
  return fileName.slice(lastDotIndex).toLowerCase();
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImageFile(file: File) {
  const extension = fileExtension(file.name);
  return [".jpg", ".jpeg", ".png", ".svg"].includes(extension);
}

export default function MultiFileUpload({
  label,
  value,
  onChange,
  error,
  hideLabel = false,
  showPositionComment = false,
  positionComment,
  onPositionCommentChange,
  positionCommentError,
  acceptedTypes = DEFAULT_ACCEPTED,
  maxFiles,
  helperText,
}: MultiFileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [clientErrors, setClientErrors] = useState<string[]>([]);

  const acceptedList = useMemo(
    () => normalizeAcceptedTypes(acceptedTypes),
    [acceptedTypes],
  );

  const previewFiles = useMemo(
    () =>
      value.map((file) => ({
        file,
        previewUrl: isImageFile(file) ? URL.createObjectURL(file) : null,
      })),
    [value],
  );

  useEffect(
    () => () => {
      previewFiles.forEach((preview) => {
        if (preview.previewUrl) {
          URL.revokeObjectURL(preview.previewUrl);
        }
      });
    },
    [previewFiles],
  );

  const isMaxReached = typeof maxFiles === "number" && value.length >= maxFiles;

  const applyFiles = (incomingFiles: File[]) => {
    if (!incomingFiles.length) {
      return;
    }

    const rejected: string[] = [];
    const accepted: File[] = [];
    let totalCount = value.length;

    incomingFiles.forEach((file) => {
      const extension = fileExtension(file.name);
      const hasValidType = acceptedList.includes(extension);

      if (!hasValidType) {
        rejected.push(`File '${file.name}' is not a supported format`);
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        rejected.push(
          `File '${file.name}' exceeds 50MB limit. Please compress and re-upload.`,
        );
        return;
      }

      if (typeof maxFiles === "number" && totalCount >= maxFiles) {
        rejected.push(`Maximum ${maxFiles} files are allowed.`);
        return;
      }

      accepted.push(file);
      totalCount += 1;
    });

    if (accepted.length > 0) {
      onChange([...value, ...accepted]);
    }

    setClientErrors(rejected);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(event.target.files ?? []);
    applyFiles(incoming);
    event.target.value = "";
  };

  const removeFile = (index: number) => {
    onChange(value.filter((_, currentIndex) => currentIndex !== index));
  };

  const triggerBrowse = () => {
    if (!isMaxReached) {
      inputRef.current?.click();
    }
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (isMaxReached) {
      return;
    }

    const incoming = Array.from(event.dataTransfer.files ?? []);
    applyFiles(incoming);
  };

  return (
    <div className="space-y-3">
      {!hideLabel ? (
        <label className="text-base font-semibold text-label-text">
          {label}
        </label>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        multiple
        accept={acceptedTypes}
        className="hidden"
        onChange={onInputChange}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={triggerBrowse}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            triggerBrowse();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={cn(
          "rounded-xl border-2 border-dashed border-[#D1D5DB] bg-white px-4 py-8 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]/30",
          isDragging && "border-[#E63946] bg-[#FFF0F1]",
          isMaxReached && "cursor-not-allowed opacity-70",
        )}
        aria-label={`${label} upload area`}
      >
        <div className="mx-auto flex max-w-sm flex-col items-center gap-2">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF0F1] text-[#E63946]">
            <Upload className="h-5 w-5" />
          </span>
          <p className="text-sm font-medium text-label-text">
            Drag files here or click to browse
          </p>
          <p className="text-xs text-[#6B7280]">
            {helperText ?? "Upload logos in supported vector or image formats."}
          </p>
          {typeof maxFiles === "number" ? (
            <p className="text-xs font-medium text-[#6B7280]">
              {value.length}/{maxFiles} logos uploaded
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {acceptedList.map((extension) => (
          <span
            key={extension}
            className="rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-2 py-1 text-xs text-[#6B7280]"
          >
            {extension}
          </span>
        ))}
      </div>

      {previewFiles.length > 0 ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {previewFiles.map((preview, index) => (
            <div
              key={`${preview.file.name}-${index}`}
              className="flex min-h-16 items-center gap-3 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#F3F4F6]">
                {preview.previewUrl ? (
                  <img
                    src={preview.previewUrl}
                    alt={preview.file.name}
                    className="h-full w-full object-cover"
                  />
                ) : fileExtension(preview.file.name) === ".pdf" ? (
                  <FileText className="h-5 w-5 text-[#6B7280]" />
                ) : (
                  <FileImage className="h-5 w-5 text-[#6B7280]" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-label-text">
                  {preview.file.name}
                </p>
                <p className="text-xs text-[#6B7280]">
                  {formatFileSize(preview.file.size)}
                </p>
              </div>

              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-label-text"
                onClick={() => removeFile(index)}
                aria-label={`Remove ${preview.file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {showPositionComment ? (
        <div className="space-y-2">
          <label className="text-sm font-medium text-label-text">
            Logo Position Comment
          </label>
          <textarea
            value={positionComment ?? ""}
            onChange={(event) => onPositionCommentChange?.(event.target.value)}
            placeholder="Please describe logo position in comment"
            className="min-h-27 w-full rounded-xl border border-[#D1D5DB] bg-white px-3 py-2.5 text-sm text-label-text outline-none transition focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20"
          />
          {positionCommentError ? (
            <p className="text-[13px] text-[#DC2626]" aria-live="polite">
              {positionCommentError}
            </p>
          ) : null}
        </div>
      ) : null}

      {error ? (
        <p className="text-[13px] text-[#DC2626]" aria-live="polite">
          {error}
        </p>
      ) : null}

      {clientErrors.length > 0 ? (
        <div aria-live="polite" className="space-y-1">
          {clientErrors.map((clientError) => (
            <p key={clientError} className="text-[13px] text-[#DC2626]">
              {clientError}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
