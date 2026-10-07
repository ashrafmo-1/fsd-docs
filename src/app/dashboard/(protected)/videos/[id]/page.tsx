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
  const video = await getDashboardVideo(id);
  if (!video) notFound();
  return <VideoForm video={video} />;
}
