import type { Metadata } from "next";
import { DocsBreadcrumbs } from "@/components/docs/docs-breadcrumbs";
import { DocsPageFooter } from "@/components/docs/docs-page-footer";
import { DocsSearch } from "@/components/docs/docs-search";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsVersionSwitcher } from "@/components/docs/docs-version-switcher";
import { OnThisPage } from "@/components/docs/on-this-page";
import { Footer } from "@/components/landing/footer";
import { Navigation } from "@/components/landing/navigation";
import { buildSearchIndex } from "@/lib/search-index";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: {
    default: "Documentation",
    template: "%s | FSD CLI",
  },
  description:
    "Documentation for create-fsd-architecture project scaffolding and in-project FSD slice generation.",
  // No canonical here: it would be inherited by any page that forgets its
  // own and point that page at /docs. Each page sets alternates.canonical.
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
        <div className="mx-auto grid max-w-[1536px] gap-8 px-6 py-10 lg:grid-cols-[210px_minmax(0,1fr)] xl:grid-cols-[210px_minmax(0,1fr)_210px] lg:py-16">
          <DocsSidebar header={<DocsVersionSwitcher />} />
          <div
            id="main-content"
            tabIndex={-1}
            className="order-3 min-w-0 outline-none xl:order-2 lg:col-start-2 xl:row-start-1"
          >
            <DocsSearch index={buildSearchIndex()} />
            <DocsBreadcrumbs />
            <div id="docs-content">{children}</div>
            <DocsPageFooter />
          </div>
          <OnThisPage />
        </div>
      </main>
      <Footer />
    </>
  );
}
