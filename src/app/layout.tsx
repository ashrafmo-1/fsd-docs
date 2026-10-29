import type { Metadata } from "next";
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
