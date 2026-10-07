import { createClient } from "@/lib/supabase/server";
import { documentationPageLabel, type VideoDraft } from "@/lib/video-draft";

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

const COLUMNS =
  "id, page_key, title, youtube_url, description, is_published, display_order";

export function videoWriteMessage(error: { message?: string; code?: string }) {
  const message = error.message?.toLowerCase() ?? "";
  if (message.includes("row-level security") || error.code === "42501") {
    return "This account cannot manage videos.";
  }
  if (
    message.includes("youtube_video_id") ||
    message.includes("check constraint")
  ) {
    return "Enter a valid YouTube URL or video ID.";
  }
  return "The video could not be saved.";
}

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
      .select(COLUMNS)
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
): Promise<DashboardVideo | null> {
  const result = await listDashboardVideos();
  if ("error" in result) return null;
  return result.videos.find((video) => video.id === id) ?? null;
}

export function videoRecord(draft: VideoDraft) {
  return {
    page_key: draft.pageKey,
    title: draft.title,
    youtube_url: draft.youtubeUrl,
    youtube_video_id: draft.youtubeVideoId,
    description: draft.description,
    is_published: draft.isPublished,
    display_order: draft.displayOrder,
    updated_at: new Date().toISOString(),
  };
}
