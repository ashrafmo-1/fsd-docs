import type { Metadata } from "next";
import { DocsBreadcrumbs } from "@/components/docs/docs-breadcrumbs";
import { DocsPageFooter } from "@/components/docs/docs-page-footer";
import { DocsPageMeta } from "@/components/docs/docs-page-meta";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { OnThisPage } from "@/components/docs/on-this-page";
import { Footer } from "@/components/landing/footer";
import { Navigation } from "@/components/landing/navigation";
import { DOCS_NAV_ITEMS } from "@/lib/docs-navigation";
import { lastCommitDate, pageSourceFile } from "@/lib/page-dates";
import { CLI_RELEASES } from "@/lib/releases";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: {
    default: "Documentation",
    template: "%s | FSD CLI",
  },
  description:
    "Documentation for create-fsd-architecture project scaffolding and in-project FSD slice generation.",
  alternates: { canonical: "/docs" },
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
      <main className="bg-canvas">
        <div className="mx-auto grid max-w-[1536px] gap-8 px-6 py-10 lg:grid-cols-[210px_minmax(0,1fr)] xl:grid-cols-[210px_minmax(0,1fr)_210px] lg:py-16">
          <DocsSidebar />
          <div className="order-3 min-w-0 xl:order-2 lg:col-start-2 xl:row-start-1">
            <DocsBreadcrumbs />
            <DocsPageMeta
              version={latestVersion}
              updated={pageUpdatedDates()}
            />
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
