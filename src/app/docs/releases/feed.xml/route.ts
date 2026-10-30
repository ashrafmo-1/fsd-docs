import { getReleaseFeed } from "@/lib/release-feed";

export const dynamic = "force-static";

export function GET() {
  return new Response(getReleaseFeed(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
