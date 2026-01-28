"use client";

import { Building2, Calendar, DollarSign, Globe2, CheckCircle2 } from "lucide-react";
import { ParsedInvoiceData } from "@/types";

interface ResultsTableProps {
  data: ParsedInvoiceData;
}

export default function ResultsTable({ data }: ResultsTableProps) {
  const fields = [
    {
      label: "Vendor Name",
      value: data.vendor,
      icon: Building2,
      color: "text-[#06B6D4]",
    },
    {
      label: "Invoice Date",
      value: data.date,
      icon: Calendar,
      color: "text-[#06B6D4]",
    },
    {
      label: "Total Amount",
      value: data.amount ? formatAmount(data.amount) : null,
      icon: DollarSign,
      color: "text-[#06B6D4]",
    },
    {
      label: "Currency",
      value: data.currency,
      icon: Globe2,
      color: "text-[#06B6D4]",
    },
  ];

  const confidence = calculateConfidence(data);

  return (
    <div className="w-full glass-card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-500" />
            <h3 className="font-heading text-base font-semibold text-white">
              Extracted Data
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="px-2 py-1 rounded bg-[#06B6D4]/10 text-[#06B6D4] font-medium">
            {confidence}% Confidence
          </span>
        </div>
      </div>

      {/* Data Rows */}
      <div className="divide-y divide-slate-800/50">
        {fields.map((field, index) => (
          <div
            key={field.label}
            className="data-row flex items-center justify-between px-5 py-4 transition-all animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                <field.icon size={18} className={field.color} />
              </div>
              <span className="text-sm text-slate-400">{field.label}</span>
            </div>
            <div className="text-right">
              {field.value ? (
                <span className="font-mono text-sm text-white font-medium">
                  {field.value}
                </span>
              ) : (
                <span className="text-sm text-slate-600 italic">
                  Not detected
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Confidence Bar */}
      <div className="px-5 py-3 bg-slate-900/50 border-t border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-500">AI Confidence Level</span>
          <span className="text-xs font-medium text-[#06B6D4]">
            {confidence}%
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#06B6D4] to-[#0891b2] rounded-full transition-all duration-500"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function formatAmount(amount: string): string {
  const num = parseFloat(amount);
  if (isNaN(num)) return amount;
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function calculateConfidence(data: ParsedInvoiceData): number {
  const fields = [data.vendor, data.date, data.amount, data.currency];
  const filledFields = fields.filter((f) => f !== null && f !== "").length;
  return Math.round((filledFields / fields.length) * 100);
}
