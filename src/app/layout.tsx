import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VectraLogic | Invoice Parser",
  description: "AI-powered invoice data extraction",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
