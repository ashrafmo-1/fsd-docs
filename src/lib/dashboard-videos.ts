import { createClient } from "@/lib/supabase/server";
import { documentationPageLabel } from "@/lib/video-draft";
import { readVideo, VIDEO_COLUMNS } from "@/lib/video-store";

export type DashboardVideo = {
  id: string;
  pageKey: string;
  pageLabel: string;
  title: string;
  youtubeUrl: string;
  description: string;
  isPublished: boolean;
  displayOrder: number;
};

function fromRow(row: Record<string, unknown>): DashboardVideo | null {
  if (typeof row.id !== "string" || typeof row.page_key !== "string")
    return null;
  if (typeof row.title !== "string" || typeof row.youtube_url !== "string") {
    return null;
  }
  return {
    id: row.id,
    pageKey: row.page_key,
    pageLabel: documentationPageLabel(row.page_key),
    title: row.title,
    youtubeUrl: row.youtube_url,
    description: typeof row.description === "string" ? row.description : "",
    isPublished: row.is_published === true,
    displayOrder: typeof row.display_order === "number" ? row.display_order : 0,
  };
}

export async function listDashboardVideos(): Promise<
  { videos: DashboardVideo[] } | { error: string }
> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("videos")
      .select(VIDEO_COLUMNS)
      .order("display_order", { ascending: true })
      .order("title", { ascending: true });
    if (error) return { error: "Videos could not be loaded." };
    const videos = (data ?? [])
      .map((row) => fromRow(row as Record<string, unknown>))
      .filter((video): video is DashboardVideo => video !== null);
    return { videos };
  } catch {
    return { error: "Videos could not be loaded." };
  }
}

export async function getDashboardVideo(
  id: string,
): Promise<{ video: DashboardVideo | null } | { error: string }> {
  try {
    const result = await readVideo(await createClient(), id);
    if ("error" in result) return result;
    return { video: result.row ? fromRow(result.row) : null };
  } catch {
    return { error: "Videos could not be loaded." };
  }
}
