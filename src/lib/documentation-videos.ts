import { parseYouTubeVideoId } from "./youtube.ts";

export type DocumentationVideo = {
  title: string;
  youtubeUrl: string;
  description?: string;
};

export type DocumentationVideoConfig = Record<
  string,
  DocumentationVideo | undefined
>;

/**
 * Application contract for a stored documentation video.
 * A later stage can map database columns into this shape.
 * Public pages show at most one published video per pageKey.
 */
export type DocumentationVideoRecord = {
  id: string;
  pageKey: string;
  title: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  description: string | null;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

export const GETTING_STARTED_VIDEO_PAGE_KEY = "/docs/getting-started";

/**
 * Assign a video by documentation pathname.
 * Leave a page undefined until its real YouTube URL, title, and description
 * are ready. Do not insert a placeholder URL. Invalid entries render nothing.
 */
export const documentationVideos: DocumentationVideoConfig = {
  [GETTING_STARTED_VIDEO_PAGE_KEY]: undefined,
};

export function documentationVideoFromRecord(
  record: DocumentationVideoRecord,
): DocumentationVideo | undefined {
  if (!record.isPublished) return undefined;

  const title = record.title.trim();
  const videoId =
    parseYouTubeVideoId(record.youtubeUrl) ??
    parseYouTubeVideoId(record.youtubeVideoId);
  if (!title || !videoId) return undefined;

  const description = record.description?.trim();
  return {
    title,
    youtubeUrl: videoId,
    ...(description ? { description } : {}),
  };
}

export function getDocumentationVideo(
  pageKey: string,
): DocumentationVideo | undefined {
  const video = documentationVideos[pageKey];
  if (!video) return undefined;

  const title = video.title.trim();
  const videoId = parseYouTubeVideoId(video.youtubeUrl);
  if (!title || !videoId) return undefined;

  const description = video.description?.trim();
  return {
    title,
    youtubeUrl: videoId,
    ...(description ? { description } : {}),
  };
}
