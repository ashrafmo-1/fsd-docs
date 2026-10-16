import { CtaBand } from "@/components/landing/cta-band";
import { Explore } from "@/components/landing/explore";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Navigation } from "@/components/landing/navigation";
import { ProductStory } from "@/components/landing/product-story";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProductStory />
        <Explore />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
