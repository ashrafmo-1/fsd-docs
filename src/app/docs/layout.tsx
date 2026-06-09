import type { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { Footer } from "@/components/landing/footer";
import { Navigation } from "@/components/landing/navigation";

export const metadata: Metadata = {
  title: "Documentation — create-fsd-architecture",
  description:
    "Documentation for create-fsd-architecture project scaffolding and in-project FSD slice generation.",
};

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <main className="bg-canvas">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-10 lg:grid-cols-[260px_1fr] lg:py-16">
          <DocsSidebar />
          <div className="min-w-0">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
