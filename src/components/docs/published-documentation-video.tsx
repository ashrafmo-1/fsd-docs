import { DocumentationVideo } from "@/components/docs/documentation-video";
import { getPublishedDocumentationVideo } from "@/lib/published-videos";

export async function PublishedDocumentationVideo({
  pageKey,
}: {
  pageKey: string;
}) {
  return (
    <DocumentationVideo video={await getPublishedDocumentationVideo(pageKey)} />
  );
}
