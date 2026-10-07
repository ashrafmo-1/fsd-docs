"use server";

import { revalidatePath, updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireDashboardAdmin } from "@/lib/supabase/session";
import { DOCUMENTATION_PAGES, parseVideoDraft } from "@/lib/video-draft";
import { writeVideo } from "@/lib/video-store";

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

function refreshVideoPages() {
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/videos");
  for (const page of DOCUMENTATION_PAGES) revalidatePath(page.pageKey);
  updateTag("documentation-videos");
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
    const result = await writeVideo(supabase, { draft: parsed.draft });
    if (!result.ok) return result;
  } catch {
    return { ok: false, error: "The video could not be saved." };
  }

  refreshVideoPages();
  return { ok: true };
}

export async function setVideoPublished(input: {
  id: string;
  pageKey: string;
  published: boolean;
}): Promise<VideoActionResult> {
  await requireDashboardAdmin();
  if (
    typeof input.id !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      input.id,
    ) ||
    typeof input.published !== "boolean"
  ) {
    return { ok: false, error: "This video was not found." };
  }

  try {
    const supabase = await createClient();
    const result = await writeVideo(supabase, {
      id: input.id,
      published: input.published,
    });
    if (!result.ok) return result;
  } catch {
    return { ok: false, error: "The video could not be saved." };
  }

  refreshVideoPages();
  return { ok: true };
}
