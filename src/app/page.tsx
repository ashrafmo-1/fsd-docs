import { Navigation } from "@/components/landing/navigation";
import { Hero } from "@/components/landing/hero";
import { ArchitectureVisualization } from "@/components/landing/architecture-visualization";
import { ScrollFeatures } from "@/components/landing/scroll-features";
import { FeatureCards } from "@/components/landing/feature-cards";
import { Documentation } from "@/components/landing/documentation";
import { CtaBand } from "@/components/landing/cta-band";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ArchitectureVisualization />
        <ScrollFeatures />
        <FeatureCards />
        <Documentation />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
