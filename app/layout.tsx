import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sparkles.ai",
  description: "AI Powered Support Bot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-[100vh] font-poppins">{children}</body>
    </html>
  );
}
