import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureVisualization } from "@/components/landing/architecture-visualization";
import { CtaBand } from "@/components/landing/cta-band";
import { Footer } from "@/components/landing/footer";
import { Navigation } from "@/components/landing/navigation";
import { ScrollFeatures } from "@/components/landing/scroll-features";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-static";
export const metadata: Metadata = pageMetadata({
  title: "Architecture",
  description:
    "Explore the six Feature-Sliced Design layers, import boundaries, and the complete FSD CLI project creation workflow.",
  path: "/architecture",
  shareTitle: "Architecture | FSD CLI",
  shareDescription:
    "Six layers. Clear boundaries. Explore the FSD CLI architecture and workflow.",
});
export default function ArchitecturePage() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <header className="detail-intro">
          <Link href="/">← Back to overview</Link>
          <p className="section-kicker">THE SYSTEM / ARCHITECTURE</p>
          <h1>
            Good structure.
            <br />
            <span>From the ground up.</span>
          </h1>
          <p>
            Understand the layers behind your codebase, then follow the complete
            journey from your first command to your first feature.
          </p>
          <div>
            <a href="#architecture" className="button-primary">
              Explore the layers
            </a>
            <a href="#how-it-works" className="button-secondary">
              See the workflow
            </a>
          </div>
        </header>
        <ArchitectureVisualization />
        <ScrollFeatures />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
