import type { Metadata } from "next";
import { DocsBreadcrumbs } from "@/components/docs/docs-breadcrumbs";
import { DocsPageFooter } from "@/components/docs/docs-page-footer";
import { DocsPageMeta } from "@/components/docs/docs-page-meta";
import { DocsSearch } from "@/components/docs/docs-search";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsVersionSwitcher } from "@/components/docs/docs-version-switcher";
import { OnThisPage } from "@/components/docs/on-this-page";
import { Footer } from "@/components/landing/footer";
import { Navigation } from "@/components/landing/navigation";
import { DOCS_NAV_ITEMS } from "@/lib/docs-navigation";
import { lastCommitDate, pageSourceFile } from "@/lib/page-dates";
import { CLI_RELEASES } from "@/lib/releases";
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

const latestVersion = (
  CLI_RELEASES.find((release) => release.status === "latest") ?? CLI_RELEASES[0]
).version;

// Built once at build time; the layout is force-static.
function pageUpdatedDates() {
  return Object.fromEntries(
    DOCS_NAV_ITEMS.flatMap((item) => {
      const file = pageSourceFile(item.href);
      const date = file && lastCommitDate(file);
      return date ? [[item.href, date.toISOString()]] : [];
    }),
  );
}

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <main className="overflow-x-clip bg-canvas">
        <div className="mx-auto grid max-w-[1536px] gap-8 px-6 py-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:[grid-template-areas:'sidebar_content'_'sidebar_toc'] xl:grid-cols-[210px_minmax(0,1fr)_210px] xl:[grid-template-areas:'sidebar_content_toc'] lg:py-16">
          <div
            id="main-content"
            tabIndex={-1}
            className="order-2 min-w-0 outline-none lg:order-none lg:[grid-area:content]"
          >
            <DocsSearch index={buildSearchIndex()} />
            <DocsBreadcrumbs />
            <DocsPageMeta
              version={latestVersion}
              updated={pageUpdatedDates()}
            />
            <div id="docs-content">{children}</div>
            <DocsPageFooter />
          </div>
          <DocsSidebar header={<DocsVersionSwitcher />} />
          <OnThisPage />
        </div>
      </main>
      <Footer />
    </>
  );
}
