import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: "#0B1120",
          50: "#1a2540",
          100: "#151e33",
          200: "#101927",
          300: "#0B1120",
          400: "#080c17",
          500: "#05080f",
        },
        teal: {
          DEFAULT: "#06B6D4",
          50: "#cffafe",
          100: "#a5f3fc",
          200: "#67e8f9",
          300: "#22d3ee",
          400: "#06B6D4",
          500: "#0891b2",
          600: "#0e7490",
          700: "#155e75",
          800: "#164e63",
          900: "#083344",
        },
        glass: {
          DEFAULT: "rgba(11, 17, 32, 0.7)",
          light: "rgba(255, 255, 255, 0.05)",
          border: "rgba(6, 182, 212, 0.2)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)",
        "isometric-grid":
          "linear-gradient(30deg, rgba(6, 182, 212, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(6, 182, 212, 0.05) 87.5%, rgba(6, 182, 212, 0.05)), linear-gradient(150deg, rgba(6, 182, 212, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(6, 182, 212, 0.05) 87.5%, rgba(6, 182, 212, 0.05)), linear-gradient(30deg, rgba(6, 182, 212, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(6, 182, 212, 0.05) 87.5%, rgba(6, 182, 212, 0.05)), linear-gradient(150deg, rgba(6, 182, 212, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(6, 182, 212, 0.05) 87.5%, rgba(6, 182, 212, 0.05)), linear-gradient(60deg, rgba(6, 182, 212, 0.08) 25%, transparent 25.5%, transparent 75%, rgba(6, 182, 212, 0.08) 75%, rgba(6, 182, 212, 0.08)), linear-gradient(60deg, rgba(6, 182, 212, 0.08) 25%, transparent 25.5%, transparent 75%, rgba(6, 182, 212, 0.08) 75%, rgba(6, 182, 212, 0.08))",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundSize: {
        grid: "50px 50px",
        isometric: "80px 140px",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(6, 182, 212, 0.3)",
        "glow-sm": "0 0 10px rgba(6, 182, 212, 0.2)",
        "inner-glow": "inset 0 0 20px rgba(6, 182, 212, 0.1)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        scan: "scan 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        scan: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(100%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
