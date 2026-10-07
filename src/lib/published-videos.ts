import {
  type DocumentationVideo,
  type DocumentationVideoRecord,
  documentationVideoFromRecord,
  getDocumentationVideo,
} from "./documentation-videos.ts";
import { getSupabaseEnv } from "./supabase/env.ts";

const VIDEO_COLUMNS = [
  "id",
  "page_key",
  "title",
  "youtube_url",
  "youtube_video_id",
  "description",
  "is_published",
  "display_order",
  "created_at",
  "updated_at",
].join(",");

export function publishedVideoFromRow(
  row: unknown,
): DocumentationVideo | undefined {
  if (!row || typeof row !== "object") return undefined;

  const record = row as Record<string, unknown>;
  if (record.is_published !== true) return undefined;
  if (typeof record.page_key !== "string" || typeof record.title !== "string") {
    return undefined;
  }
  if (
    typeof record.youtube_url !== "string" ||
    typeof record.youtube_video_id !== "string"
  ) {
    return undefined;
  }

  const video: DocumentationVideoRecord = {
    id: typeof record.id === "string" ? record.id : "",
    pageKey: record.page_key,
    title: record.title,
    youtubeUrl: record.youtube_url,
    youtubeVideoId: record.youtube_video_id,
    description:
      typeof record.description === "string" ? record.description : null,
    isPublished: true,
    displayOrder:
      typeof record.display_order === "number" ? record.display_order : 0,
    createdAt: typeof record.created_at === "string" ? record.created_at : "",
    updatedAt: typeof record.updated_at === "string" ? record.updated_at : "",
  };

  return documentationVideoFromRecord(video);
}

async function readPublishedVideo(pageKey: string) {
  const env = getSupabaseEnv();
  if (!env) return undefined;

  const endpoint = new URL("/rest/v1/videos", env.url);
  endpoint.searchParams.set("select", VIDEO_COLUMNS);
  endpoint.searchParams.set("page_key", `eq.${pageKey}`);
  endpoint.searchParams.set("is_published", "eq.true");
  endpoint.searchParams.set("order", "display_order.asc,created_at.asc");
  endpoint.searchParams.set("limit", "1");

  try {
    const response = await fetch(endpoint, {
      headers: {
        apikey: env.anonKey,
        Authorization: `Bearer ${env.anonKey}`,
        Accept: "application/json",
      },
      cache: "force-cache",
      next: { tags: ["documentation-videos"] },
    });
    if (!response.ok) return undefined;

    const rows: unknown = await response.json();
    if (!Array.isArray(rows)) return undefined;
    return publishedVideoFromRow(rows[0]);
  } catch {
    return undefined;
  }
}

export async function getPublishedDocumentationVideo(
  pageKey: string,
): Promise<DocumentationVideo | undefined> {
  const published = await readPublishedVideo(pageKey);
  return published ?? getDocumentationVideo(pageKey);
}
