"use client";

import { useEffect, useRef } from "react";

/** Writes progress without re-rendering React on every scroll frame. */
export function useScrollProgress(
  mode: "exit" | "pass" = "pass",
  onProgress?: (progress: number) => void,
) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;
    const update = () => {
      frame = 0;
      if (media.matches) {
        element.style.setProperty("--progress", "0");
        return;
      }
      const rect = element.getBoundingClientRect();
      const distance =
        mode === "exit" ? rect.height : rect.height - window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / Math.max(1, distance)),
      );
      element.style.setProperty("--progress", String(progress));
      onProgress?.(progress);
    };
    const schedule = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    });
    observer.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", update);
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", update);
    };
  }, [mode, onProgress]);
  return ref;
}
