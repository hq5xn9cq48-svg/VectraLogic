"use client";

import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Upload, FileImage, FileText, X, AlertCircle } from "lucide-react";
import Image from "next/image";

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export default function DropZone({ onFileSelect, disabled }: DropZoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === "file-too-large") {
          setError("File is too large. Maximum size is 10MB.");
        } else if (rejection.errors[0]?.code === "file-invalid-type") {
          setError("Invalid file type. Please upload PNG, JPG, or PDF files.");
        } else {
          setError("File could not be uploaded. Please try again.");
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);

        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          setPreview(null);
        }

        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setPreview(null);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
        "application/pdf": [".pdf"],
      },
      maxSize: 10 * 1024 * 1024,
      multiple: false,
      disabled,
    });

  return (
    <div className="w-full">
      {/* Error Display */}
      {error && (
        <div className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
          <AlertCircle size={18} />
          <span className="text-sm flex-1">{error}</span>
          <button
            onClick={() => setError(null)}
            className="p-1 hover:bg-red-500/20 rounded transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={`
          relative w-full min-h-[300px] rounded-xl transition-all duration-300 cursor-pointer
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${
            isDragActive && !isDragReject
              ? "dropzone-active border-[#06B6D4] bg-[#06B6D4]/10 scale-[1.02]"
              : isDragReject
              ? "border-2 border-dashed border-red-500 bg-red-500/10"
              : "dropzone"
          }
        `}
      >
        <input {...getInputProps()} />

        {/* File Selected State */}
        {selectedFile ? (
          <div className="absolute inset-0 p-6 flex flex-col items-center justify-center">
            {/* Preview */}
            {preview ? (
              <div className="relative w-full max-w-[180px] aspect-[3/4] rounded-xl overflow-hidden border-2 border-[#06B6D4]/30 glow-teal">
                <Image
                  src={preview}
                  alt="Invoice preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-24 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/30 flex items-center justify-center">
                <FileText size={32} className="text-[#06B6D4]" />
              </div>
            )}

            {/* File Info */}
            <div className="mt-4 text-center">
              <p className="text-sm font-medium text-white truncate max-w-[200px]">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                {selectedFile.type === "application/pdf" && " • PDF Document"}
              </p>
            </div>

            {/* Remove Button */}
            {!disabled && (
              <button
                onClick={clearFile}
                className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all text-sm"
              >
                <X size={14} />
                Remove File
              </button>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center">
            {/* Upload Icon */}
            <div
              className={`
                w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300
                ${
                  isDragActive
                    ? "bg-[#06B6D4]/20 scale-110 glow-teal"
                    : "bg-slate-800 border border-slate-700"
                }
              `}
            >
              <Upload
                size={28}
                className={`transition-colors ${
                  isDragActive ? "text-[#06B6D4]" : "text-slate-400"
                }`}
              />
            </div>

            {/* Text */}
            <h3 className="font-heading text-lg font-semibold text-white mb-2">
              {isDragActive ? "Drop your invoice here" : "Upload Invoice"}
            </h3>
            <p className="text-sm text-slate-500 mb-6 max-w-[280px]">
              Drag and drop your freight invoice, or click to browse your files
            </p>

            {/* Supported Formats */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <FormatBadge label="PNG" />
              <FormatBadge label="JPG" />
              <FormatBadge label="PDF" />
              <span className="text-xs text-slate-600">• Max 10MB</span>
            </div>
          </div>
        )}

        {/* Corner Accents */}
        <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-[#06B6D4]/30 rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-[#06B6D4]/30 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-[#06B6D4]/30 rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[#06B6D4]/30 rounded-br-lg" />
      </div>
    </div>
  );
}

function FormatBadge({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 border border-slate-700 text-slate-400">
      {label}
    </span>
  );
}
