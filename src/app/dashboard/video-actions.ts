"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { videoRecord, videoWriteMessage } from "@/lib/dashboard-videos";
import { createClient } from "@/lib/supabase/server";
import { requireDashboardAdmin } from "@/lib/supabase/session";
import { parseVideoDraft } from "@/lib/video-draft";

export type VideoActionResult = { ok: true } | { ok: false; error: string };

export type SaveVideoInput = {
  id?: string | null;
  pageKey: string;
  title: string;
  youtubeUrl: string;
  description: string;
  isPublished: boolean;
  displayOrder: number;
};

function refreshVideoPages(pageKey: string) {
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/videos");
  revalidatePath(pageKey);
  revalidateTag("documentation-videos", "max");
}

export async function saveVideo(
  input: SaveVideoInput,
): Promise<VideoActionResult> {
  await requireDashboardAdmin();
  const parsed = parseVideoDraft({
    id: input.id,
    pageKey: input.pageKey,
    title: input.title,
    youtubeUrl: input.youtubeUrl,
    description: input.description,
    isPublished: input.isPublished,
    displayOrder: input.displayOrder,
  });
  if (!parsed.ok) return { ok: false, error: parsed.error };

  try {
    const supabase = await createClient();
    const record = videoRecord(parsed.draft);
    const { error } = parsed.draft.id
      ? await supabase.from("videos").update(record).eq("id", parsed.draft.id)
      : await supabase.from("videos").insert(record);
    if (error) return { ok: false, error: videoWriteMessage(error) };
  } catch {
    return { ok: false, error: "The video could not be saved." };
  }

  refreshVideoPages(parsed.draft.pageKey);
  return { ok: true };
}

export async function setVideoPublished(input: {
  id: string;
  pageKey: string;
  published: boolean;
}): Promise<VideoActionResult> {
  await requireDashboardAdmin();

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("videos")
      .update({
        is_published: input.published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", input.id);
    if (error) return { ok: false, error: videoWriteMessage(error) };
  } catch {
    return { ok: false, error: "The video could not be saved." };
  }

  refreshVideoPages(input.pageKey);
  return { ok: true };
}
