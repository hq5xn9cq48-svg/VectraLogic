"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";

interface NavbarProps {
  variant?: "landing" | "dashboard";
}

export default function Navbar({ variant = "landing" }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-navbar transition-all duration-300 ${
          isScrolled
            ? "glass border-b border-slate-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - Only the image, no text */}
            <Link href="/" className="flex-shrink-0 relative group">
              <Image
                src="https://i.postimg.cc/63KzWQny/IMG-8579.png"
                alt="VectraLogic"
                width={160}
                height={40}
                className="h-8 md:h-10 w-auto object-contain transition-opacity group-hover:opacity-80"
                priority
              />
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 -z-10 bg-[#06B6D4]/0 group-hover:bg-[#06B6D4]/10 blur-xl transition-all duration-300 rounded-full" />
            </Link>

            {/* Desktop Navigation */}
            {variant === "landing" && (
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#06B6D4] group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
            )}

            {/* CTA Button - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              {variant === "landing" ? (
                <Link
                  href="/dashboard"
                  className="btn-primary inline-flex items-center gap-2 text-sm font-semibold"
                >
                  Launch Parser
                  <ChevronRight size={16} />
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20">
                    <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
                    <span className="text-xs font-medium text-[#06B6D4]">
                      AI Ready
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#0B1120]/90 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-16 left-0 right-0 glass border-b border-slate-800 transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {variant === "landing" &&
              navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-4 text-lg text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              ))}

            <div className="pt-4 border-t border-slate-800">
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary w-full inline-flex items-center justify-center gap-2 text-base"
              >
                Launch Parser
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
