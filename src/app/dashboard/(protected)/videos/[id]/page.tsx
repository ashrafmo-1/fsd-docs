import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VideoForm } from "@/components/dashboard/video-form";
import { getDashboardVideo } from "@/lib/dashboard-videos";
import { requireDashboardAdmin } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit video",
};

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireDashboardAdmin();
  const { id } = await params;
  const result = await getDashboardVideo(id);
  if ("error" in result) {
    return (
      <p
        role="alert"
        className="rounded-sm border border-hairline bg-surface-soft p-5 text-base text-body"
      >
        {result.error}
      </p>
    );
  }
  if (!result.video) notFound();
  return <VideoForm video={result.video} />;
}
