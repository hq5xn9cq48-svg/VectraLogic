"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  Download,
  ArrowLeft,
  FileText,
  Building2,
  Calendar,
  DollarSign,
  Globe2,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  RotateCcw,
} from "lucide-react";
import { exportToExcel } from "@/lib/excel";

interface ParsedData {
  vendor: string | null;
  date: string | null;
  amount: string | null;
  currency: string | null;
}

type Status = "idle" | "uploading" | "analyzing" | "success" | "error";

export default function DashboardPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<ParsedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    setError(null);
    setData(null);

    // Preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    setStatus("uploading");

    try {
      const formData = new FormData();
      formData.append("file", file);

      setStatus("analyzing");

      const response = await fetch("/api/parse", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to parse invoice");
      }

      setData(result.data);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setStatus("error");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    disabled: status === "uploading" || status === "analyzing",
  });

  const handleExport = () => {
    if (data) {
      exportToExcel(data, "invoice_data");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setData(null);
    setError(null);
    setFileName("");
    setPreview(null);
  };

  const formatAmount = (amount: string): string => {
    const num = parseFloat(amount);
    if (isNaN(num)) return amount;
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] bg-pattern">
      {/* Header */}
      <header className="border-b border-[#1e2a3a] bg-[#0a0f1a]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="https://i.postimg.cc/63KzWQny/IMG-8579.png"
              alt="VectraLogic"
              width={130}
              height={32}
              className="h-7 w-auto"
              priority
            />
          </Link>
          <Link
            href="/"
            className="text-[#8892a6] hover:text-white flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-5 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Invoice Parser</h1>
          <p className="text-[#8892a6]">Upload your invoice to extract data automatically</p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Card */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold">Upload Invoice</h2>
              {status !== "idle" && (
                <button
                  onClick={handleReset}
                  className="text-[#8892a6] hover:text-white text-sm flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw size={14} />
                  Reset
                </button>
              )}
            </div>

            <div
              {...getRootProps()}
              className={`upload-zone min-h-[260px] flex flex-col items-center justify-center p-6 text-center ${
                isDragActive ? "active" : ""
              } ${status === "uploading" || status === "analyzing" ? "opacity-60 pointer-events-none" : ""}`}
            >
              <input {...getInputProps()} />

              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-36 rounded-lg mb-4 border border-[#1e2a3a]"
                  />
                  {status === "idle" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReset();
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-[#1e2a3a] rounded-full flex items-center justify-center hover:bg-[#2a3a4a] transition-colors"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              ) : status === "analyzing" ? (
                <div className="relative w-20 h-20 mb-4">
                  <div className="absolute inset-0 border-2 border-[#00c6ab]/30 rounded-xl overflow-hidden">
                    <div className="scan-line" />
                  </div>
                  <Loader2 size={28} className="absolute inset-0 m-auto text-[#00c6ab] spinner" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-[#00c6ab]/10 flex items-center justify-center mb-4">
                  <Upload size={26} className="text-[#00c6ab]" />
                </div>
              )}

              <p className="font-medium mb-1.5">
                {status === "analyzing"
                  ? "Analyzing invoice..."
                  : status === "uploading"
                  ? "Uploading..."
                  : isDragActive
                  ? "Drop here"
                  : "Drop your invoice here"}
              </p>
              <p className="text-sm text-[#5a6478]">
                {fileName || "PNG, JPG, or PDF (max 10MB)"}
              </p>
            </div>
          </div>

          {/* Results Card */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold">Extracted Data</h2>
              {data && (
                <button
                  onClick={handleExport}
                  className="btn-primary text-sm py-2.5 px-4"
                >
                  <Download size={14} />
                  Export
                </button>
              )}
            </div>

            {/* Idle State */}
            {status === "idle" && (
              <div className="h-[260px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#1e2a3a] flex items-center justify-center mb-4">
                  <FileText size={26} className="text-[#5a6478]" />
                </div>
                <p className="text-[#5a6478]">Upload an invoice to see results</p>
              </div>
            )}

            {/* Loading State */}
            {(status === "uploading" || status === "analyzing") && (
              <div className="h-[260px] flex flex-col items-center justify-center">
                <Loader2 size={36} className="text-[#00c6ab] spinner mb-4" />
                <p className="text-[#8892a6]">
                  {status === "uploading" ? "Uploading..." : "AI is analyzing..."}
                </p>
              </div>
            )}

            {/* Error State */}
            {status === "error" && (
              <div className="h-[260px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
                  <AlertCircle size={26} className="text-red-400" />
                </div>
                <p className="text-red-400 font-medium mb-2">Analysis Failed</p>
                <p className="text-sm text-[#5a6478] max-w-xs">{error}</p>
                <button
                  onClick={handleReset}
                  className="btn-secondary text-sm py-2 px-4 mt-4"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Success State */}
            {status === "success" && data && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-400 mb-4">
                  <CheckCircle size={16} />
                  <span className="text-sm font-medium">Data extracted successfully</span>
                </div>

                {[
                  { icon: Building2, label: "Vendor", value: data.vendor },
                  { icon: Calendar, label: "Date", value: data.date },
                  { icon: DollarSign, label: "Amount", value: data.amount ? formatAmount(data.amount) : null },
                  { icon: Globe2, label: "Currency", value: data.currency },
                ].map((item) => (
                  <div key={item.label} className="data-item">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#00c6ab]/10 flex items-center justify-center">
                        <item.icon size={16} className="text-[#00c6ab]" />
                      </div>
                      <span className="text-[#8892a6] text-sm">{item.label}</span>
                    </div>
                    <span className="font-mono text-sm font-medium">
                      {item.value || <span className="text-[#5a6478] italic">Not found</span>}
                    </span>
                  </div>
                ))}

                {/* Mobile Export */}
                <button
                  onClick={handleExport}
                  className="w-full btn-primary mt-4 lg:hidden"
                >
                  <Download size={16} />
                  Download Excel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { value: "5s", label: "Avg. Time" },
            { value: "99%", label: "Accuracy" },
            { value: "150+", label: "Currencies" },
          ].map((stat) => (
            <div key={stat.label} className="card p-4 text-center">
              <p className="text-xl sm:text-2xl font-bold text-[#00c6ab]">{stat.value}</p>
              <p className="text-xs text-[#5a6478] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
