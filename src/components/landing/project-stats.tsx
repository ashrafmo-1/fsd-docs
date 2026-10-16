"use client";

import { ArrowUpRight, Download, Layers3, Package, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  fetchLifetimeDownloads,
  GITHUB_STATS_URL,
  isCount,
  PROJECT_STATS_SNAPSHOT,
} from "@/lib/project-stats";
import { CLI_RELEASES } from "@/lib/releases";

const numberFormat = new Intl.NumberFormat("en-US");
const formatDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

function AnimatedCount({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    if (hasAnimated.current) {
      element.textContent = numberFormat.format(value);
      return;
    }
    const finish = () => {
      cancelAnimationFrame(frame);
      element.textContent = numberFormat.format(value);
    };
    const play = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      if (media.matches) {
        finish();
        return;
      }
      const start = performance.now();
      element.textContent = "0";
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 1600);
        element.textContent = numberFormat.format(
          Math.round(value * (1 - (1 - progress) ** 3)),
        );
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(element);
    const onMotionChange = () => {
      if (media.matches) {
        hasAnimated.current = true;
        finish();
      }
    };
    media.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      media.removeEventListener("change", onMotionChange);
    };
  }, [value]);
  return (
    <>
      <span ref={ref} aria-hidden="true">
        {numberFormat.format(value)}
      </span>
      <span className="sr-only">{numberFormat.format(value)}</span>
    </>
  );
}

export function ProjectStats() {
  const [stats, setStats] = useState<{
    downloads: number;
    downloadsEnd: string;
    stars: number;
    starsCheckedAt: string;
  }>(PROJECT_STATS_SNAPSHOT);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10_000);
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86_400_000)
      .toISOString()
      .slice(0, 10);
    // Each source can refresh independently; failed requests retain dated evidence.
    fetchLifetimeDownloads(yesterday, controller.signal)
      .then((downloads) => {
        if (!controller.signal.aborted)
          setStats((current) => ({
            ...current,
            downloads,
            downloadsEnd: yesterday,
          }));
      })
      .catch(() => {});
    fetch(GITHUB_STATS_URL, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("GitHub statistics unavailable");
        const data = await response.json();
        if (!isCount(data.stargazers_count) || data.full_name !== "FSD-CLI/cli")
          throw new Error("Invalid GitHub statistics");
        if (!controller.signal.aborted)
          setStats((current) => ({
            ...current,
            stars: data.stargazers_count,
            starsCheckedAt: today,
          }));
      })
      .catch(() => {});
    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, []);
  const metrics = [
    {
      label: "npm downloads",
      value: stats.downloads,
      detail: `All time · through ${formatDate(stats.downloadsEnd)}`,
      href: "https://www.npmjs.com/package/create-fsd-architecture",
      icon: Download,
    },
    {
      label: "GitHub stars",
      value: stats.stars,
      detail: `CLI repository · ${formatDate(stats.starsCheckedAt)}`,
      href: "https://github.com/FSD-CLI/cli/stargazers",
      icon: Star,
    },
    {
      label: "Frameworks",
      value: CLI_RELEASES[0].frameworks.length,
      detail: "Five ways to build. One architecture.",
      href: "/capabilities",
      icon: Layers3,
    },
    {
      label: "npm releases",
      value: CLI_RELEASES.length,
      detail: `Latest: v${CLI_RELEASES[0].version}`,
      href: "/docs/releases",
      icon: Package,
    },
  ];
  return (
    <section className="project-stats" aria-labelledby="stats-heading">
      <div className="stats-inner">
        <div className="stats-intro">
          <p className="section-kicker">OPEN SOURCE / IN NUMBERS</p>
          <h2 id="stats-heading">
            Small command. <span>Growing momentum.</span>
          </h2>
        </div>
        <div className="stats-grid">
          {metrics.map(({ label, value, detail, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="stat-item"
              {...(href.startsWith("https:")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <div className="stat-label">
                <Icon size={15} aria-hidden="true" />
                <span>{label}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </div>
              <div className="stat-number">
                <AnimatedCount value={value} />
              </div>
              <p>{detail}</p>
            </Link>
          ))}
        </div>
        <p className="stats-source">
          Downloads for create-fsd-architecture since May 30, 2026. Public npm
          and GitHub counts; dates show the latest successful data check.
        </p>
      </div>
    </section>
  );
}
