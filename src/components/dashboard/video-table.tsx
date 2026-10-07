"use client";

import { Pencil } from "lucide-react";
import Link from "next/link";
import { TableBuilder } from "@/components/dashboard/table-builder";
import { useSetVideoPublished } from "@/components/dashboard/use-dashboard-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { DashboardVideo } from "@/lib/dashboard-videos";

const COLUMNS = [
  { headName: "Title", className: "w-[28%] text-left" },
  { headName: "Page", className: "w-[24%]" },
  { headName: "Order", className: "w-[12%]" },
  { headName: "Status", className: "w-[16%]" },
  { headName: "Actions", className: "w-[20%]" },
];

export function VideoTable({ videos }: { videos: DashboardVideo[] }) {
  const publish = useSetVideoPublished();

  return (
    <TableBuilder
      tableHeadNames={COLUMNS}
      tableData={videos}
      emptyState={
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-sm font-semibold text-ink">No videos yet</p>
          <p className="mt-1 text-sm text-body-muted">
            Add a video and publish it to show it on a documentation page.
          </p>
        </div>
      }
      renderRow={(video) => (
        <TableRow key={video.id} className="hover:bg-surface-soft/60">
          <TableCell className="text-left font-medium text-ink">
            <span className="block truncate">{video.title}</span>
          </TableCell>
          <TableCell>
            <span className="block truncate">{video.pageLabel}</span>
          </TableCell>
          <TableCell>{video.displayOrder}</TableCell>
          <TableCell>
            <Badge
              variant={video.isPublished ? "success" : "neutral"}
              tone="subtle"
              shape="rounded"
              className="mx-auto"
            >
              {video.isPublished ? "Published" : "Draft"}
            </Badge>
          </TableCell>
          <TableCell>
            <div className="flex items-center justify-center gap-2">
              <Button asChild variant="gotht" size="icon">
                <Link
                  href={`/dashboard/videos/${video.id}`}
                  aria-label={`Edit ${video.title}`}
                >
                  <Pencil className="size-3.5" />
                </Link>
              </Button>
              <Button
                type="button"
                variant="brand-soft"
                size="md"
                disabled={
                  publish.isPending && publish.variables?.id === video.id
                }
                onClick={() =>
                  publish.mutate({
                    id: video.id,
                    pageKey: video.pageKey,
                    published: !video.isPublished,
                  })
                }
              >
                {video.isPublished ? "Unpublish" : "Publish"}
              </Button>
            </div>
          </TableCell>
        </TableRow>
      )}
    />
  );
}
