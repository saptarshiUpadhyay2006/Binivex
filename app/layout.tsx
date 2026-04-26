import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner";
import { RootProvider } from "@/providers/RootProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Binivex",
  description: "Where your money makes more money.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#09090b] text-slate-200 relative selection:bg-yellow-500/30`}
      >
        {/* Advanced Background System */}
        <div className="fixed inset-0 pointer-events-none z-0">
            {/* Soft Atmospheric Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,#1e293b33,transparent_60%)]" />
            
            {/* Subtle Fintech Grid */}
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 L40 40 L40 0' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")` }} 
            />
        </div>

        <div className="relative z-10">
            <RootProvider>
              {children}
            </RootProvider>
        </div>
        <Toaster/>
      </body>
    </html>
  );
}
