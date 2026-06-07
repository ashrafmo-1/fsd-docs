"use client";

import { type RefObject, useEffect, useRef, useState } from "react";

export function useIntersectionObserver<T extends HTMLElement>(
  options: IntersectionObserverInit = {},
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { root = null, rootMargin, threshold = 0.1 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold]);

  return [ref, isVisible];
}

export function useScrollSpy(
  ids: string[],
  options: { rootMargin?: string } = {},
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: options.rootMargin ?? "-40% 0px -40% 0px",
        threshold: 0.1,
      },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [ids, options.rootMargin]);

  return activeId;
}
