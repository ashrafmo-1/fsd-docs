import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import { SupportProvider } from "@/components/landing/support-controls";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { siteConfig } from "@/lib/site";
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "FSD CLI — Build Scalable Frontends from Day One",
    description: siteConfig.description,
    images: [
      {
        url: "/og/fsd-cli-og-1200x630-v1.png",
        width: 1200,
        height: 630,
        alt: "FSD CLI logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FSD CLI — Build Scalable Frontends from Day One",
    description: siteConfig.description,
    images: ["/og/fsd-cli-og-1200x630-v1.png"],
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
      </head>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <SupportProvider>{children}</SupportProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
