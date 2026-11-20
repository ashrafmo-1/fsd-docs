import type { Metadata } from "next";

import { CtaBand } from "@/components/landing/cta-band";
import { Explore } from "@/components/landing/explore";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Navigation } from "@/components/landing/navigation";
import { OurTeam } from "@/components/landing/our-team";
import { ProductStory } from "@/components/landing/product-story";
import { ProjectStats } from "@/components/landing/project-stats";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "FSD CLI Docs | Feature-Sliced Design Architecture Generator",
  description:
    "Official documentation and guides for create-fsd-architecture. Scaffold React, Next.js, Vue, Nuxt, and SvelteKit projects with complete Feature-Sliced Design structures.",
  metadataBase: new URL("https://fsdcli.me"),
  openGraph: {
    title: "FSD CLI Docs | Feature-Sliced Design Architecture Generator",
    description:
      "Official documentation and guides for create-fsd-architecture. Scaffold React, Next.js, Vue, Nuxt, and SvelteKit projects with complete Feature-Sliced Design structures.",
    url: "https://fsdcli.me",
    siteName: "FSD CLI Docs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FSD CLI Docs | Feature-Sliced Design Architecture Generator",
    description:
      "Official documentation and guides for create-fsd-architecture.",
  },
};

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <ProjectStats />
        <ProductStory />
        <Explore />
        <OurTeam />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
