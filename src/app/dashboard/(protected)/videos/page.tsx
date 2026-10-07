import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/page-header";
import { VideoTable } from "@/components/dashboard/video-table";
import { listDashboardVideos } from "@/lib/dashboard-videos";
import { requireDashboardAdmin } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Videos",
};

export default async function VideosPage() {
  await requireDashboardAdmin();
  const videos = await listDashboardVideos();

  return (
    <div className="space-y-5">
      <PageHeader
        title="Videos"
        description="Assign a YouTube video to a documentation page, then publish it."
        href="/dashboard/videos/new"
        linkLabel="Add video"
      />

      {"error" in videos ? (
        <p
          role="alert"
          className="rounded-sm border border-hairline bg-surface-soft p-5 text-base text-body"
        >
          {videos.error}
        </p>
      ) : (
        <VideoTable videos={videos.videos} />
      )}
    </div>
  );
}
