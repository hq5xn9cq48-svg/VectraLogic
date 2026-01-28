import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VectraLogic | Industrial Invoice Parser",
  description:
    "Precision Structure for Complex Data Operations. Transform freight invoices into structured data with AI-powered accuracy.",
  keywords: [
    "invoice parser",
    "freight invoice",
    "AI extraction",
    "import export",
    "logistics",
    "data extraction",
    "VectraLogic",
  ],
  authors: [{ name: "VectraLogic" }],
  openGraph: {
    title: "VectraLogic | Industrial Invoice Parser",
    description:
      "Precision Structure for Complex Data Operations. AI-powered invoice parsing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#0B1120] text-white min-h-screen`}
      >
        <div className="relative z-content">{children}</div>
      </body>
    </html>
  );
}
