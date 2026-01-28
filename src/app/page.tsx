import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ArrowRight,
  Cpu,
  Zap,
  Shield,
  BarChart3,
  Globe2,
  FileText,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      <Navbar variant="landing" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 overflow-hidden">
          <GridAnimation />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 mb-6">
                <Cpu size={16} className="text-[#06B6D4]" />
                <span className="text-sm font-medium text-[#06B6D4]">
                  Powered by Google Gemini AI
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                Precision Structure for{" "}
                <span className="text-[#06B6D4] text-glow">
                  Complex Data Operations
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Transform your data architecture with unparalleled accuracy and
                efficiency. AI-powered invoice parsing built for import/export
                operations.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/dashboard"
                  className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base px-8 py-4 rounded-xl font-semibold"
                >
                  Deploy Logic
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="#how-it-works"
                  className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base px-8 py-4 rounded-xl"
                >
                  See How It Works
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 pt-8 border-t border-slate-800/50">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#06B6D4]" />
                    <span>99.2% Accuracy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#06B6D4]" />
                    <span>&lt;5s Processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#06B6D4]" />
                    <span>150+ Currencies</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Dashboard Preview */}
            <div className="relative">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Built for Industrial Scale
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Enterprise-grade invoice processing with the precision your
              operations demand
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Cpu size={24} />}
              title="AI-Powered Extraction"
              description="Google Gemini Vision analyzes invoices with human-level accuracy, understanding complex layouts."
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title="Sub-5 Second Processing"
              description="Optimized pipeline delivers extracted data instantly, keeping your workflow moving."
            />
            <FeatureCard
              icon={<BarChart3 size={24} />}
              title="Structured Output"
              description="Clean, structured JSON and Excel exports ready for your ERP or accounting systems."
            />
            <FeatureCard
              icon={<Shield size={24} />}
              title="Bank-Level Security"
              description="End-to-end encryption with SOC 2 compliance ready and zero data retention."
            />
            <FeatureCard
              icon={<Globe2 size={24} />}
              title="Multi-Currency Support"
              description="Automatic detection of 150+ currencies from international freight invoices."
            />
            <FeatureCard
              icon={<FileText size={24} />}
              title="Any Format Accepted"
              description="Process PNG, JPG, and PDF invoices from any vendor or logistics provider."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Three Steps to Structured Data
            </h2>
            <p className="text-slate-400 text-lg">
              From upload to export in under 10 seconds
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              title="Upload Invoice"
              description="Drag and drop your freight invoice image or PDF into the secure upload zone."
            />
            <StepCard
              number="02"
              title="AI Analysis"
              description="Gemini Vision scans and extracts vendor, date, amount, and currency data."
            />
            <StepCard
              number="03"
              title="Export Data"
              description="Download structured data as Excel or integrate via API with your systems."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#06B6D4]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#06B6D4]/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Invoice Processing?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Join leading import/export companies using VectraLogic to
                automate their freight invoice data extraction.
              </p>
              <Link
                href="/dashboard"
                className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4 rounded-xl font-semibold"
              >
                Start Free Trial
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © 2024 VectraLogic. Industrial-grade invoice parsing.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Grid Animation Component
function GridAnimation() {
  return (
    <div className="absolute inset-0">
      {/* Perspective grid lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(6, 182, 212, 0.3)"
              strokeWidth="0.5"
            />
          </pattern>
          <linearGradient id="fade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="fadeMask">
            <rect width="100%" height="100%" fill="url(#fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          mask="url(#fadeMask)"
        />
      </svg>

      {/* Animated dots */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse-glow" />
      <div
        className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-[#06B6D4]/70 animate-pulse-glow"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-[#06B6D4]/50 animate-pulse-glow"
        style={{ animationDelay: "1s" }}
      />

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <line
          x1="25%"
          y1="25%"
          x2="66%"
          y2="33%"
          stroke="#06B6D4"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
        <line
          x1="66%"
          y1="33%"
          x2="33%"
          y2="66%"
          stroke="#06B6D4"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  );
}

// Dashboard Preview Component
function DashboardPreview() {
  return (
    <div className="relative">
      {/* Glow behind the card */}
      <div className="absolute -inset-4 bg-[#06B6D4]/10 rounded-3xl blur-2xl" />

      <div className="relative glass-card rounded-2xl overflow-hidden border border-slate-700/50">
        {/* Window Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-slate-500">VectraLogic Parser</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Performance Metrics Card */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-400">
                Performance Metrics
              </span>
              <div className="flex gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
                  Completed
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#06B6D4]/40" />
                  Processing
                </span>
              </div>
            </div>
            {/* Chart visualization */}
            <div className="h-24 flex items-end gap-1">
              {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 65, 80].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#06B6D4]/20 to-[#06B6D4]/60 rounded-t"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Data Table Preview */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-slate-400">
              Operation Flow
            </span>
            <div className="space-y-1">
              {[
                { label: "Vendor", value: "Maersk Line" },
                { label: "Amount", value: "$12,450.00" },
                { label: "Currency", value: "USD" },
                { label: "Date", value: "2024-01-15" },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 px-3 rounded bg-slate-800/30 text-xs"
                >
                  <span className="text-slate-500">{row.label}</span>
                  <span className="text-[#06B6D4] font-mono">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="glass-card rounded-xl p-6 group hover:border-[#06B6D4]/30 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4] mb-4 group-hover:bg-[#06B6D4]/20 group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <h3 className="font-heading text-lg font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}

// Step Card Component
function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative text-center group">
      {/* Step number */}
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#06B6D4] text-[#0B1120] font-heading font-bold text-xl mb-6 group-hover:scale-110 transition-transform duration-300 glow-teal">
        {number}
      </div>
      <h3 className="font-heading text-xl font-semibold text-white mb-3">
        {title}
      </h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
