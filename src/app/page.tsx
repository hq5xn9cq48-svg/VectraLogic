"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Target, Menu, X } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0f1a] bg-pattern">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/95 backdrop-blur-sm border-b border-[#1e2a3a]">
        <div className="max-w-5xl mx-auto px-5">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="https://i.postimg.cc/63KzWQny/IMG-8579.png"
                alt="VectraLogic"
                width={140}
                height={36}
                className="h-8 w-auto"
                priority
              />
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="btn-primary"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0a0f1a] border-t border-[#1e2a3a] px-5 py-4">
            <Link
              href="/dashboard"
              className="btn-primary w-full justify-center"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="badge mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00c6ab] animate-pulse" />
                AI-Powered Analysis
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold mb-5 leading-[1.1] tracking-tight">
                Extract Invoice Data{" "}
                <span className="text-gradient">Instantly</span>
              </h1>

              <p className="text-lg text-[#8892a6] mb-8 max-w-md mx-auto lg:mx-0">
                Upload any freight invoice and let AI extract vendor, amount, date, and currency in seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/dashboard" className="btn-primary text-base">
                  Start Parsing
                  <ArrowRight size={18} />
                </Link>
                <a href="#features" className="btn-secondary text-base">
                  Learn More
                </a>
              </div>
            </div>

            {/* Preview Card */}
            <div className="relative">
              <div className="card card-glow p-6">
                {/* Window Dots */}
                <div className="flex gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>

                {/* Sample Data */}
                <div className="space-y-3">
                  <p className="text-xs text-[#5a6478] uppercase tracking-wider mb-4">Extracted Data</p>
                  {[
                    { label: "Vendor", value: "Maersk Line" },
                    { label: "Amount", value: "$12,450.00" },
                    { label: "Date", value: "2024-01-15" },
                    { label: "Currency", value: "USD" },
                  ].map((item) => (
                    <div key={item.label} className="data-item">
                      <span className="text-[#8892a6] text-sm">{item.label}</span>
                      <span className="text-[#00c6ab] font-mono text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Why VectraLogic?</h2>
            <p className="text-[#8892a6]">Simple, fast, and accurate invoice processing</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Results in under 5 seconds" },
              { icon: Target, title: "99% Accurate", desc: "Powered by Gemini Vision AI" },
              { icon: Shield, title: "Secure", desc: "Your data stays private" },
            ].map((f) => (
              <div key={f.title} className="card p-6 text-center hover:border-[#00c6ab]/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#00c6ab]/10 flex items-center justify-center mx-auto mb-4">
                  <f.icon size={22} className="text-[#00c6ab]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-[#8892a6]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-5 bg-[#0f1629]/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">How It Works</h2>
            <p className="text-[#8892a6]">Three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Upload", desc: "Drop your invoice (PNG, JPG, PDF)" },
              { num: "02", title: "Analyze", desc: "AI extracts key information" },
              { num: "03", title: "Export", desc: "Download as Excel spreadsheet" },
            ].map((step, i) => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00c6ab] to-[#00d4bb] text-[#0a0f1a] font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-[#8892a6]">{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2">
                    <ArrowRight size={20} className="text-[#2a3a4a]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card card-glow p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-[#8892a6] mb-8">
              Try VectraLogic free. No sign-up required.
            </p>
            <Link href="/dashboard" className="btn-primary text-base">
              Launch Parser
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e2a3a] py-6 px-5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image
            src="https://i.postimg.cc/63KzWQny/IMG-8579.png"
            alt="VectraLogic"
            width={100}
            height={25}
            className="h-5 w-auto opacity-50"
          />
          <p className="text-sm text-[#5a6478]">
            © {new Date().getFullYear()} VectraLogic
          </p>
        </div>
      </footer>
    </div>
  );
}
