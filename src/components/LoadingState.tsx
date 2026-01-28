"use client";

import { Cpu, FileSearch, Database, CheckCircle2 } from "lucide-react";

interface LoadingStateProps {
  stage: "uploading" | "analyzing" | "processing" | "complete";
}

const stages = [
  {
    key: "uploading",
    label: "Uploading File",
    description: "Preparing invoice data...",
    icon: Database,
  },
  {
    key: "analyzing",
    label: "AI Analysis",
    description: "Gemini Vision is scanning...",
    icon: Cpu,
  },
  {
    key: "processing",
    label: "Data Extraction",
    description: "Parsing invoice fields...",
    icon: FileSearch,
  },
  {
    key: "complete",
    label: "Complete",
    description: "Data ready for export",
    icon: CheckCircle2,
  },
];

export default function LoadingState({ stage }: LoadingStateProps) {
  const currentIndex = stages.findIndex((s) => s.key === stage);

  return (
    <div className="w-full">
      {/* Scanner Animation */}
      <div className="relative w-full h-48 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden mb-6">
        {/* Scan Line */}
        <div className="scan-line" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-[#06B6D4]/10 border border-[#06B6D4]/30 flex items-center justify-center animate-pulse-glow">
            <Cpu size={32} className="text-[#06B6D4]" />
          </div>
        </div>

        {/* Corner Brackets */}
        <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[#06B6D4]/50 rounded-tl" />
        <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-[#06B6D4]/50 rounded-tr" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-[#06B6D4]/50 rounded-bl" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#06B6D4]/50 rounded-br" />
      </div>

      {/* Progress Steps */}
      <div className="space-y-3">
        {stages.map((s, index) => {
          const Icon = s.icon;
          const isActive = index === currentIndex;
          const isComplete = index < currentIndex;
          const isPending = index > currentIndex;

          return (
            <div
              key={s.key}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-[#06B6D4]/10 border border-[#06B6D4]/30"
                  : isComplete
                  ? "bg-slate-800/50 border border-slate-700"
                  : "bg-slate-900/50 border border-transparent opacity-50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-[#06B6D4]/20 text-[#06B6D4]"
                    : isComplete
                    ? "bg-green-500/20 text-green-500"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {isComplete ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <Icon size={18} className={isActive ? "animate-pulse" : ""} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    isPending ? "text-slate-500" : "text-white"
                  }`}
                >
                  {s.label}
                </p>
                <p
                  className={`text-xs truncate ${
                    isPending ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  {s.description}
                </p>
              </div>
              {isActive && (
                <div className="flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Skeleton loader for results
export function ResultsSkeleton() {
  return (
    <div className="w-full glass-card rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800">
        <div className="h-5 w-32 skeleton rounded" />
      </div>
      <div className="divide-y divide-slate-800/50">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between px-5 py-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg skeleton" />
              <div className="h-4 w-20 skeleton rounded" />
            </div>
            <div className="h-4 w-28 skeleton rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
