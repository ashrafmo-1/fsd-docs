import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { requireDashboardAdmin } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  await requireDashboardAdmin();

  return (
    <div className="space-y-5">
      <PageHeader
        title="Dashboard"
        description="This is the admin home. Video management lives on its own page."
      />
      <Link
        href="/dashboard/videos"
        className="block rounded-sm border border-hairline bg-canvas px-4 py-4 transition-colors hover:bg-surface-soft"
      >
        <p className="text-sm font-semibold text-ink">Videos</p>
        <p className="mt-1 text-sm leading-relaxed text-body-muted">
          Assign a YouTube video to a documentation page, then publish it.
        </p>
      </Link>
    </div>
  );
}
