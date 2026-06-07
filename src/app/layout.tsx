import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./styles/globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "create-fsd-architecture — Scaffold Production-Ready FSD Projects",
  description:
    "CLI tool that scaffolds production-ready React projects using Feature-Sliced Design architecture. Start with a scalable, well-structured codebase in seconds.",
  keywords: [
    "Feature-Sliced Design",
    "FSD",
    "React",
    "Vite",
    "CLI",
    "scaffolding",
    "architecture",
    "frontend",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, geistMono.variable)}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
