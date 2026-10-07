import { z } from "zod";
import { DOCS_NAV_ITEMS } from "./docs-navigation.ts";
import { parseYouTubeVideoId } from "./youtube.ts";

const USER_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const DOCUMENTATION_PAGES = DOCS_NAV_ITEMS.map((item) => ({
  pageKey: item.href,
  label: item.label,
}));

export const videoFormSchema = z.object({
  pageKey: z
    .string()
    .refine(
      (value) => DOCUMENTATION_PAGES.some((page) => page.pageKey === value),
      "Choose a documentation page.",
    ),
  title: z.string().trim().min(1, "Enter a title.").max(200, "Enter a title."),
  youtubeUrl: z
    .string()
    .trim()
    .refine(
      (value) => Boolean(parseYouTubeVideoId(value)),
      "Enter a valid YouTube URL or video ID.",
    ),
  description: z.string().max(500, "The description is too long."),
  displayOrder: z.coerce
    .number()
    .int()
    .min(0, "Enter a display order from 0 to 1000.")
    .max(1000, "Enter a display order from 0 to 1000."),
  isPublished: z.boolean(),
});

export type VideoFormValues = z.infer<typeof videoFormSchema>;

export type VideoDraft = {
  id: string | null;
  pageKey: string;
  title: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  description: string | null;
  isPublished: boolean;
  displayOrder: number;
};

export function documentationPageLabel(pageKey: string) {
  return (
    DOCUMENTATION_PAGES.find((page) => page.pageKey === pageKey)?.label ??
    pageKey
  );
}

export function parseVideoDraft(input: {
  id?: unknown;
  pageKey: unknown;
  title: unknown;
  youtubeUrl: unknown;
  description: unknown;
  isPublished: unknown;
  displayOrder: unknown;
}): { ok: true; draft: VideoDraft } | { ok: false; error: string } {
  const id = typeof input.id === "string" ? input.id.trim() : "";
  if (id && !USER_ID.test(id))
    return { ok: false, error: "This video was not found." };

  const pageKey = typeof input.pageKey === "string" ? input.pageKey.trim() : "";
  if (!DOCUMENTATION_PAGES.some((page) => page.pageKey === pageKey)) {
    return { ok: false, error: "Choose a documentation page." };
  }

  const title = typeof input.title === "string" ? input.title.trim() : "";
  if (!title || title.length > 200)
    return { ok: false, error: "Enter a title." };

  const youtubeUrl =
    typeof input.youtubeUrl === "string" ? input.youtubeUrl.trim() : "";
  const youtubeVideoId = parseYouTubeVideoId(youtubeUrl);
  if (!youtubeVideoId) {
    return { ok: false, error: "Enter a valid YouTube URL or video ID." };
  }

  const descriptionValue =
    typeof input.description === "string" ? input.description.trim() : "";
  if (descriptionValue.length > 500) {
    return { ok: false, error: "The description is too long." };
  }

  const orderValue =
    typeof input.displayOrder === "string"
      ? input.displayOrder.trim()
      : input.displayOrder;
  const displayOrder =
    orderValue === "" || orderValue == null ? 0 : Number(orderValue);
  if (
    !Number.isInteger(displayOrder) ||
    displayOrder < 0 ||
    displayOrder > 1000
  ) {
    return { ok: false, error: "Enter a display order from 0 to 1000." };
  }

  const published = input.isPublished;
  const isPublished =
    published === true || published === "true" || published === "on";

  return {
    ok: true,
    draft: {
      id: id || null,
      pageKey,
      title,
      youtubeUrl,
      youtubeVideoId,
      description: descriptionValue || null,
      isPublished,
      displayOrder,
    },
  };
}
