const YOUTUBE_VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "youtube-nocookie.com",
  "youtu.be",
]);

const EMBED_PATHS = new Set(["embed", "shorts", "live", "v"]);

function exactVideoId(value: string | null | undefined): string | null {
  if (!value || !YOUTUBE_VIDEO_ID.test(value)) return null;
  return value;
}

function parseYouTubeUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    if (
      /^(www\.)?(youtube\.com|m\.youtube\.com|music\.youtube\.com|youtube-nocookie\.com|youtu\.be)\//i.test(
        value,
      )
    ) {
      try {
        return new URL(`https://${value}`);
      } catch {
        return null;
      }
    }
    return null;
  }
}

export function parseYouTubeVideoId(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 2048) return null;
  if (YOUTUBE_VIDEO_ID.test(trimmed)) return trimmed;

  const url = parseYouTubeUrl(trimmed);
  if (!url || url.username || url.password) return null;
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (!YOUTUBE_HOSTS.has(host)) return null;

  if (host === "youtu.be") {
    const segment = url.pathname.split("/").filter(Boolean)[0];
    return exactVideoId(segment);
  }

  const segments = url.pathname.split("/").filter(Boolean);
  if (segments[0] === "watch") {
    return exactVideoId(url.searchParams.get("v"));
  }

  if (segments.length >= 2 && EMBED_PATHS.has(segments[0] ?? "")) {
    return exactVideoId(segments[1]);
  }

  return null;
}

export function youtubeEmbedUrl(videoId: string): string | null {
  if (!YOUTUBE_VIDEO_ID.test(videoId)) return null;
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}
