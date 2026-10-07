import type { Metadata } from "next";
import { VideoForm } from "@/components/dashboard/video-form";
import { requireDashboardAdmin } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Add video",
};

export default async function NewVideoPage() {
  await requireDashboardAdmin();
  return <VideoForm />;
}
