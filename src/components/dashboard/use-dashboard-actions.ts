"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "@/app/dashboard/actions";
import {
  type SaveVideoInput,
  saveVideo,
  setVideoPublished,
} from "@/app/dashboard/video-actions";

function runWithToast<T>(
  work: Promise<T>,
  messages: { loading: string; success: string },
) {
  const promise = work.then((result) => {
    if (
      result &&
      typeof result === "object" &&
      "ok" in result &&
      result.ok === false &&
      "error" in result
    ) {
      throw new Error(String(result.error));
    }
    return result;
  });

  toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: (error: Error) => error.message || "Something went wrong.",
  });

  return promise;
}

export function useSaveVideo() {
  const router = useRouter();

  return useMutation({
    mutationFn: (input: SaveVideoInput) =>
      runWithToast(saveVideo(input), {
        loading: "Saving video...",
        success: "Video saved.",
      }),
    onSuccess: () => {
      router.push("/dashboard/videos");
      router.refresh();
    },
  });
}

export function useSetVideoPublished() {
  const router = useRouter();

  return useMutation({
    mutationFn: (input: { id: string; pageKey: string; published: boolean }) =>
      runWithToast(setVideoPublished(input), {
        loading: input.published ? "Publishing..." : "Unpublishing...",
        success: input.published ? "Video published." : "Video unpublished.",
      }),
    onSuccess: () => {
      router.refresh();
    },
  });
}

export function useSignOut() {
  const router = useRouter();

  return useMutation({
    mutationFn: () =>
      runWithToast(signOut(), {
        loading: "Signing out...",
        success: "Signed out.",
      }),
    onSuccess: () => {
      router.push("/dashboard/login");
      router.refresh();
    },
  });
}
