import type { SupabaseClient } from "@supabase/supabase-js";
import type { VideoDraft } from "./video-draft.ts";

export const VIDEO_COLUMNS =
  "id, page_key, title, youtube_url, description, is_published, display_order";

export function videoWriteMessage(error: { message?: string; code?: string }) {
  const message = error.message?.toLowerCase() ?? "";
  if (message.includes("row-level security") || error.code === "42501")
    return "This account cannot manage videos.";
  if (
    message.includes("youtube_video_id") ||
    message.includes("check constraint")
  )
    return "Enter a valid YouTube URL or video ID.";
  return "The video could not be saved.";
}

export async function writeVideo(
  client: SupabaseClient,
  input: { draft: VideoDraft } | { id: string; published: boolean },
): Promise<{ ok: true; pageKey: string } | { ok: false; error: string }> {
  try {
    const record: Record<string, unknown> =
      "draft" in input
        ? {
            page_key: input.draft.pageKey,
            title: input.draft.title,
            youtube_url: input.draft.youtubeUrl,
            youtube_video_id: input.draft.youtubeVideoId,
            description: input.draft.description,
            is_published: input.draft.isPublished,
            display_order: input.draft.displayOrder,
            updated_at: new Date().toISOString(),
          }
        : {
            is_published: input.published,
            updated_at: new Date().toISOString(),
          };
    const id = "draft" in input ? input.draft.id : input.id;
    const query = id
      ? client.from("videos").update(record).eq("id", id)
      : client.from("videos").insert(record);
    const { data, error } = await query.select("id, page_key").maybeSingle();
    if (error) return { ok: false, error: videoWriteMessage(error) };
    if (!data) return { ok: false, error: "This video was not found." };
    return { ok: true, pageKey: data.page_key };
  } catch {
    return { ok: false, error: "The video could not be saved." };
  }
}

export async function readVideo(
  client: SupabaseClient,
  id: string,
): Promise<{ row: Record<string, unknown> | null } | { error: string }> {
  try {
    const { data, error } = await client
      .from("videos")
      .select(VIDEO_COLUMNS)
      .eq("id", id)
      .maybeSingle();
    if (error) return { error: "Videos could not be loaded." };
    return { row: data };
  } catch {
    return { error: "Videos could not be loaded." };
  }
}
