import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import { SupportProvider } from "@/components/landing/support-controls";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { defaultOgImage, HOME_SHARE_TITLE } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import {
  jsonLdScript,
  softwareJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import { cn } from "@/lib/utils";

const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin-wght-normal.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: HOME_SHARE_TITLE,
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
    "Vue",
    "Nuxt",
    "Svelte",
    "SvelteKit",
    "Superforms",
    "Pinia",
    "TanStack Query",
    "TypeScript",
    "code generator",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/docs/releases/feed.xml", title: "FSD CLI releases" },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: HOME_SHARE_TITLE,
    description: siteConfig.description,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_SHARE_TITLE,
    description: siteConfig.description,
    images: [defaultOgImage],
  },
};

// Favicon and Apple touch icon come from the app/icon.png and
// app/apple-icon.png file conventions, which emit hashed URLs.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#071426" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn(inter.variable, geistMono.variable)}
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Static theme bootstrap with no interpolated user content; must run before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Static JSON-LD from site constants, escaped by jsonLdScript.
          dangerouslySetInnerHTML={{
            __html: jsonLdScript([websiteJsonLd(), softwareJsonLd()]),
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only rounded-md bg-ink px-4 py-2 text-sm font-semibold text-on-primary focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <SupportProvider>{children}</SupportProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
