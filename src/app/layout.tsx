import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./styles/globals.css";
import { siteConfig } from "@/lib/site";
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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "FSD CLI — Build Scalable Frontends from Day One",
    template: "%s | FSD CLI",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "FSD CLI" }],
  creator: "FSD CLI",
  publisher: "FSD CLI",
  keywords: [
    "Feature-Sliced Design",
    "FSD",
    "React",
    "Vite",
    "CLI",
    "scaffolding",
    "architecture",
    "frontend",
    "Next.js",
    "TypeScript",
    "code generator",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "FSD CLI — Build Scalable Frontends from Day One",
    description: siteConfig.description,
    images: [
      { url: "/icon.png", width: 1254, height: 1254, alt: "FSD CLI logo" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FSD CLI — Build Scalable Frontends from Day One",
    description: siteConfig.description,
    images: ["/icon.png"],
  },
  icons: { icon: "/icon.png", apple: "/icon.png" },
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
