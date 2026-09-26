import { AllFeatures } from "@/components/landing/all-features";
import { ArchitectureVisualization } from "@/components/landing/architecture-visualization";
import { CtaBand } from "@/components/landing/cta-band";
import { Documentation } from "@/components/landing/documentation";
import { FeatureCards } from "@/components/landing/feature-cards";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Navigation } from "@/components/landing/navigation";
import { ScrollFeatures } from "@/components/landing/scroll-features";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ArchitectureVisualization />
        <ScrollFeatures />
        <FeatureCards />
        <AllFeatures />
        <Documentation />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
