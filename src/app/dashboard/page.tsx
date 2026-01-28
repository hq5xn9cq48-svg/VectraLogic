"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import DropZone from "@/components/DropZone";
import ResultsTable from "@/components/ResultsTable";
import LoadingState from "@/components/LoadingState";
import { exportToExcel } from "@/lib/excel";
import {
  Download,
  RefreshCw,
  FileSpreadsheet,
  Zap,
  Shield,
  Clock,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { ParsedInvoiceData, UploadState } from "@/types";

export default function DashboardPage() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [parsedData, setParsedData] = useState<ParsedInvoiceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingStage, setLoadingStage] = useState<
    "uploading" | "analyzing" | "processing" | "complete"
  >("uploading");

  const handleFileSelect = useCallback(async (file: File) => {
    setError(null);
    setParsedData(null);
    setUploadState("uploading");
    setLoadingStage("uploading");

    try {
      const formData = new FormData();
      formData.append("file", file);

      setTimeout(() => setLoadingStage("analyzing"), 500);

      const response = await fetch("/api/parse", {
        method: "POST",
        body: formData,
      });

      setLoadingStage("processing");

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to parse invoice");
      }

      setLoadingStage("complete");
      await new Promise((resolve) => setTimeout(resolve, 500));

      setParsedData(result.data);
      setUploadState("success");
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setUploadState("error");
    }
  }, []);

  const handleExport = useCallback(() => {
    if (parsedData) {
      exportToExcel(parsedData, "vectralogic_invoice");
    }
  }, [parsedData]);

  const handleReset = useCallback(() => {
    setUploadState("idle");
    setParsedData(null);
    setError(null);
    setLoadingStage("uploading");
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <Header />

      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="py-8">
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
              Invoice Parser
            </h1>
            <p className="text-slate-400">
              Upload your freight invoice to extract structured data using AI
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column - Upload */}
            <div className="space-y-6">
              {/* Upload Card */}
              <div className="glass-card rounded-xl p-5 md:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-heading text-lg font-semibold text-white">
                    Upload Invoice
                  </h2>
                  {uploadState !== "idle" && (
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all text-sm"
                    >
                      <RefreshCw size={14} />
                      <span className="hidden sm:inline">New Upload</span>
                    </button>
                  )}
                </div>

                <DropZone
                  onFileSelect={handleFileSelect}
                  disabled={
                    uploadState === "uploading" || uploadState === "analyzing"
                  }
                />
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-3 gap-3">
                <FeatureCard
                  icon={<Zap size={18} />}
                  title="Fast"
                  value="< 5s"
                />
                <FeatureCard
                  icon={<Shield size={18} />}
                  title="Secure"
                  value="E2E"
                />
                <FeatureCard
                  icon={<Clock size={18} />}
                  title="Real-time"
                  value="Instant"
                />
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              {/* Results Card */}
              <div className="glass-card rounded-xl p-5 md:p-6 min-h-[400px]">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-heading text-lg font-semibold text-white">
                    Extracted Data
                  </h2>
                  {parsedData && (
                    <button
                      onClick={handleExport}
                      className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
                    >
                      <Download size={14} />
                      Export Excel
                    </button>
                  )}
                </div>

                {/* State-based Content */}
                {uploadState === "idle" && <EmptyState />}

                {(uploadState === "uploading" ||
                  uploadState === "analyzing") && (
                  <LoadingState stage={loadingStage} />
                )}

                {uploadState === "success" && parsedData && (
                  <ResultsTable data={parsedData} />
                )}

                {uploadState === "error" && (
                  <ErrorState message={error} onRetry={handleReset} />
                )}
              </div>

              {/* Export Card */}
              {parsedData && (
                <div className="glass-card rounded-xl p-4 animate-fade-in-up">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center">
                        <FileSpreadsheet size={18} className="text-[#06B6D4]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Ready for Export
                        </p>
                        <p className="text-xs text-slate-500">
                          Download as Excel (.xlsx)
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleExport}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] hover:bg-[#06B6D4]/20 transition-all text-sm font-medium"
                    >
                      Download
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 glass-card rounded-xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatItem label="Invoices Processed" value="0" />
              <StatItem label="Fields Extracted" value="0" />
              <StatItem label="Accuracy Rate" value="99.2%" />
              <StatItem label="Avg. Time" value="3.2s" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-components
function FeatureCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="glass-card rounded-xl p-4 text-center">
      <div className="w-10 h-10 mx-auto rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4] mb-2">
        {icon}
      </div>
      <p className="text-xs text-slate-500 mb-1">{title}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-[320px] text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6">
        <FileSpreadsheet size={28} className="text-slate-500" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-white mb-2">
        No Data Yet
      </h3>
      <p className="text-sm text-slate-500 max-w-[260px]">
        Upload an invoice to extract vendor, date, amount, and currency
        information
      </p>
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string | null;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-[320px] text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6">
        <AlertTriangle size={28} className="text-red-400" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-white mb-2">
        Processing Failed
      </h3>
      <p className="text-sm text-slate-500 max-w-[280px] mb-6">
        {message || "An unexpected error occurred while processing your invoice"}
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition-all text-sm font-medium"
      >
        <RefreshCw size={14} />
        Try Again
      </button>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="font-heading text-2xl md:text-3xl font-bold text-[#06B6D4] mb-1">
        {value}
      </p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
