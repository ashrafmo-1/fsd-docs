import type { Metadata } from "next";
import Link from "next/link";
import { AllFeatures } from "@/components/landing/all-features";
import { CtaBand } from "@/components/landing/cta-band";
import { Documentation } from "@/components/landing/documentation";
import { FeatureCards } from "@/components/landing/feature-cards";
import { Footer } from "@/components/landing/footer";
import { Navigation } from "@/components/landing/navigation";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Explore FSD CLI framework templates, slice generators, tooling, configuration, roadmap, and frequently asked questions.",
  alternates: { canonical: "/capabilities" },
  openGraph: {
    title: "Capabilities | FSD CLI",
    description:
      "Explore the complete FSD CLI toolkit, framework templates, generators, and FAQ.",
    url: "/capabilities",
  },
};
export default function CapabilitiesPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <header className="detail-intro">
          <Link href="/">← Back to overview</Link>
          <p className="section-kicker">THE TOOLKIT / CAPABILITIES</p>
          <h1>
            Your stack.
            <br />
            <span>A stronger foundation.</span>
          </h1>
          <p>
            Take a closer look at the templates, generators, and tools behind
            FSD CLI. All the details, in one place.
          </p>
          <div>
            <a href="#features" className="button-primary">
              Explore features
            </a>
            <a href="#docs" className="button-secondary">
              Templates & FAQ
            </a>
          </div>
        </header>
        <FeatureCards />
        <AllFeatures />
        <Documentation />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
