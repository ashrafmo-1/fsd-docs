"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSaveVideo } from "@/components/dashboard/use-dashboard-actions";
import { DocumentationVideo } from "@/components/docs/documentation-video";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { DashboardVideo } from "@/lib/dashboard-videos";
import {
  DOCUMENTATION_PAGES,
  type VideoFormValues,
  videoFormSchema,
} from "@/lib/video-draft";
import { parseYouTubeVideoId } from "@/lib/youtube";

function valuesFromVideo(video?: DashboardVideo | null): VideoFormValues {
  return {
    pageKey: video?.pageKey ?? "/docs/getting-started",
    title: video?.title ?? "",
    youtubeUrl: video?.youtubeUrl ?? "",
    description: video?.description ?? "",
    displayOrder: video?.displayOrder ?? 0,
    isPublished: video?.isPublished ?? false,
  };
}

export function VideoForm({ video }: { video?: DashboardVideo | null }) {
  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: valuesFromVideo(video),
  });
  const save = useSaveVideo();
  const title = form.watch("title");
  const youtubeUrl = form.watch("youtubeUrl");
  const description = form.watch("description");
  const canPreview = Boolean(title.trim() && parseYouTubeVideoId(youtubeUrl));
  const pageLabel = video ? "Edit video" : "Add video";

  const onSubmit = (values: VideoFormValues) => {
    save.mutate(
      {
        id: video?.id,
        pageKey: values.pageKey,
        title: values.title,
        youtubeUrl: values.youtubeUrl,
        description: values.description,
        displayOrder: Number(values.displayOrder),
        isPublished: values.isPublished,
      },
      {
        onError: (error) => {
          form.setError("root", { message: error.message });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex flex-col gap-4 rounded-sm border border-hairline bg-canvas px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-2 text-sm">
            <Link
              href="/dashboard/videos"
              className="inline-flex items-center gap-2 font-semibold text-body-muted hover:text-ink"
            >
              <span className="inline-flex size-8 items-center justify-center rounded-sm bg-surface-soft">
                <ArrowLeft className="size-4" />
              </span>
              Videos
            </Link>
            <span className="text-body-muted" aria-hidden>
              /
            </span>
            <span className="truncate font-semibold text-brand-coral">
              {pageLabel}
            </span>
          </div>
          <Button type="submit" disabled={save.isPending}>
            {save.isPending ? "Saving..." : "Save video"}
          </Button>
        </div>

        {form.formState.errors.root ? (
          <p
            role="alert"
            className="rounded-sm border border-hairline bg-surface-soft px-4 py-3 text-sm text-body-strong"
          >
            {form.formState.errors.root.message}
          </p>
        ) : null}

        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <section className="space-y-5 rounded-sm border border-hairline bg-canvas p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-semibold tracking-[-0.3px] text-ink">
                Video details
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-body-muted">
                Choose the documentation page, then add the YouTube video.
              </p>
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} inputSize="dashboard" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="youtubeUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube URL or video ID</FormLabel>
                  <FormControl>
                    <Input {...field} inputSize="dashboard" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="pageKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Documentation page</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger size="dashboard">
                          <SelectValue placeholder="Choose a page" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DOCUMENTATION_PAGES.map((page) => (
                          <SelectItem key={page.pageKey} value={page.pageKey}>
                            {page.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="displayOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display order</FormLabel>
                    <FormControl>
                      <Input
                        inputSize="dashboard"
                        type="number"
                        min={0}
                        max={1000}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value}
                        onChange={(event) => field.onChange(event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3 rounded-sm border border-hairline bg-surface-soft px-4 py-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                      />
                    </FormControl>
                    <div>
                      <FormLabel>Published</FormLabel>
                      <p className="text-xs text-body-muted">
                        Published videos appear on the selected page.
                      </p>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <aside className="rounded-sm border border-hairline bg-canvas p-5 sm:p-6 xl:sticky xl:top-6">
            <h2 className="text-lg font-semibold tracking-[-0.3px] text-ink">
              Preview
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-body-muted">
              This is the player readers will see on the documentation page.
            </p>
            {canPreview ? (
              <DocumentationVideo
                className="mt-5"
                headingId="dashboard-video-preview"
                video={{
                  title,
                  youtubeUrl,
                  ...(description.trim()
                    ? { description: description.trim() }
                    : {}),
                }}
              />
            ) : (
              <div className="mt-6 flex aspect-video items-center justify-center rounded-sm border border-dashed border-hairline bg-surface-soft px-6 text-center">
                <p className="max-w-xs text-sm leading-relaxed text-body">
                  Enter a title and a valid YouTube URL to preview the video.
                </p>
              </div>
            )}
          </aside>
        </div>
      </form>
    </Form>
  );
}
