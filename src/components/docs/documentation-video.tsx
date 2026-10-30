import type { DocumentationVideo as DocumentationVideoData } from "@/lib/documentation-videos";
import { cn } from "@/lib/utils";
import { parseYouTubeVideoId, youtubeEmbedUrl } from "@/lib/youtube";

const IFRAME_ALLOW = [
  "accelerometer",
  "autoplay",
  "clipboard-write",
  "encrypted-media",
  "gyroscope",
  "picture-in-picture",
  "web-share",
  "fullscreen",
].join("; ");

export function DocumentationVideo({
  video,
  headingId = "documentation-video",
  className,
}: {
  video?: DocumentationVideoData | null;
  headingId?: string;
  className?: string;
}) {
  const title = video?.title.trim() ?? "";
  const videoId = video ? parseYouTubeVideoId(video.youtubeUrl) : null;
  const embedUrl = videoId ? youtubeEmbedUrl(videoId) : null;
  const description = video?.description?.trim();
  const transcript = video?.transcript?.trim();

  if (!title || !embedUrl) return null;

  return (
    <section
      aria-labelledby={headingId}
      className={cn("mt-10 w-full min-w-0", className)}
    >
      <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-soft">
        <div className="p-5 sm:p-6">
          <h2
            id={headingId}
            className="text-2xl font-semibold tracking-[-0.5px] text-ink"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-body">
              {description}
            </p>
          ) : null}
        </div>
        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-surface-dark">
            <iframe
              className="absolute inset-0 h-full w-full border-0"
              src={embedUrl}
              title={title}
              loading="lazy"
              allow={IFRAME_ALLOW}
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          {transcript ? (
            <details className="mt-4 rounded-xl border border-hairline p-4">
              <summary className="cursor-pointer py-1 text-sm font-semibold text-ink">
                Transcript
              </summary>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-body">
                {transcript.split(/\n\s*\n/).map((paragraph, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: Paragraphs have no id and never reorder.
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </details>
          ) : null}
        </div>
      </div>
    </section>
  );
}
