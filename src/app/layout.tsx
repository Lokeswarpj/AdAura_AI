import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/layout/client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AdAura AI | Unified Ad Analytics & Optimization",
  description: "Production-ready AI-powered Meta & Google Ads Analytics Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-hidden relative">
        {/* Dynamic, Ultra-Premium TechSummit 2032 Background */}
        <div className="pointer-events-none fixed inset-0 z-[-1] select-none overflow-hidden bg-[oklch(0.06_0.01_290)]">
          {/* Highly optimized slow vertical scanning developer grid */}
          <div className="absolute inset-0 bg-grid-pan opacity-[0.55]" />
          
          {/* Textured Microscopic Matte Noise Layer */}
          <div className="absolute inset-0 bg-grain mix-blend-overlay" />
          
          {/* Floating Neon Mesh Aura Blobs - EXACTLY matching the TechSummit 2032 reference image */}
          {/* Left Side: Massive, Rich Violet/Indigo Aura Glow */}
          <div className="animate-blob-1 absolute top-[10%] -left-[20%] h-[850px] w-[850px] rounded-full bg-violet-600/32 blur-[130px] mix-blend-screen opacity-95" />
          
          {/* Right Bottom: Subtle, Warm Rose/Pink Aura Glow */}
          <div className="animate-blob-3 absolute -bottom-[15%] -right-[15%] h-[800px] w-[800px] rounded-full bg-rose-500/25 blur-[120px] mix-blend-screen opacity-90" />
          
          {/* Center ambient contrast balancer */}
          <div className="absolute top-[35%] left-[25%] h-[400px] w-[500px] rounded-full bg-purple-500/8 blur-[110px]" />
        </div>

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
