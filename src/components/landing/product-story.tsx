"use client";

import {
  ArrowDownRight,
  ArrowRight,
  Check,
  FileCode2,
  FolderTree,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

const CHAPTERS = [
  {
    label: "Scaffold",
    title: "A foundation.\nNot a blank folder.",
    description:
      "Choose your framework and stack. Start with FSD layers, TypeScript, and tooling already in place.",
    command: "npx create-fsd-architecture@latest@latest",
    file: "my-app / src",
    lines: [
      "app/         → initialize",
      "pages/       → compose routes",
      "widgets/     → assemble UI",
      "features/    → user actions",
      "entities/    → your domain",
      "shared/      → common ground",
    ],
    note: "Your framework. A deliberate structure.",
    href: "/docs/getting-started",
    link: "Create your first project",
    icon: FolderTree,
  },
  {
    label: "Generate",
    title: "Your next feature.\nIn the right place.",
    description:
      "Add features, entities, widgets, and pages to an existing project. The generator follows your saved framework and stack choices.",
    command: "npx create-fsd-architecture@latest -g feature auth",
    file: "src / features / auth",
    lines: [
      "api/         → requests",
      "model/       → state & logic",
      "ui/          → components",
      "index.ts     → public API",
      "",
      "Stack from fsd.config.json",
    ],
    note: "Less repeated setup. More product work.",
    href: "/docs/slice-generator",
    link: "Explore slice generation",
    icon: FileCode2,
  },
  {
    label: "Keep it consistent",
    title: "One configuration.\nRoom to evolve.",
    description:
      "Keep framework and stack decisions in fsd.config.json. Inspect your project and review an upgrade plan before applying changes.",
    command: "npx create-fsd-architecture@latest upgrade --dry-run",
    file: "fsd.config.json",
    lines: [
      "{",
      '  "framework": "react-vite",',
      '  "apiClient": "fetch",',
      '  "serverState": "react-query",',
      '  "clientState": "zustand"',
      "}",
    ],
    note: "A plan you can review before you upgrade.",
    href: "/docs/upgrade",
    link: "Understand safe upgrades",
    icon: Terminal,
  },
];

export function ProductStory() {
  const [active, setActive] = useState(0);
  const chapterRef = useRef(0);
  const onProgress = useCallback((progress: number) => {
    const chapter = Math.min(
      CHAPTERS.length - 1,
      Math.floor(progress * CHAPTERS.length),
    );
    if (chapter !== chapterRef.current) {
      chapterRef.current = chapter;
      setActive(chapter);
    }
  }, []);
  const ref = useScrollProgress("pass", onProgress);
  const [staticLayout, setStaticLayout] = useState(true);
  useEffect(() => {
    const media = window.matchMedia(
      "(max-width: 767px), (max-height: 700px), (prefers-reduced-motion: reduce)",
    );
    const update = () => setStaticLayout(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return (
    <section
      ref={ref}
      id="how-it-works"
      className={`product-story${staticLayout ? " is-static" : ""}`}
      aria-labelledby="story-heading"
    >
      <div className="story-sticky">
        <div className="story-heading">
          <p className="section-kicker">01 / FROM IDEA TO STRUCTURE</p>
          <h2 id="story-heading">
            Less setup.
            <br />
            <span>More forward.</span>
          </h2>
          <ArrowDownRight
            className="story-heading-arrow"
            size={56}
            strokeWidth={1}
          />
        </div>
        <div className="story-workspace">
          <nav className="story-index" aria-label="Workflow chapters">
            {CHAPTERS.map((chapter, i) => (
              <a
                key={chapter.label}
                href={`#workflow-${i}`}
                aria-current={active === i ? "step" : undefined}
                className={active === i ? "is-active" : ""}
              >
                <span>0{i + 1}</span>
                {chapter.label}
                <ArrowRight size={15} />
              </a>
            ))}
          </nav>
          <div className="story-panels">
            {CHAPTERS.map((chapter, i) => {
              const Icon = chapter.icon;
              return (
                <article
                  key={chapter.label}
                  className={`story-panel ${active === i ? "is-active" : ""}`}
                  inert={!staticLayout && active !== i}
                  style={{ "--chapter": i } as CSSProperties}
                >
                  <div className="story-copy">
                    <span className="chapter-number">0{i + 1} / 03</span>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.description}</p>
                    <Link href={chapter.href}>
                      {chapter.link}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                  <div className="story-terminal">
                    <div className="story-terminal-bar">
                      <Icon size={16} />
                      <span>{chapter.file}</span>
                      <span className="terminal-example">EXAMPLE</span>
                    </div>
                    <div className="story-terminal-body">
                      <p className="story-command">
                        <span>$</span> {chapter.command}
                      </p>
                      <pre>
                        <code>{chapter.lines.join("\n")}</code>
                      </pre>
                      <p className="terminal-note">
                        <Check size={14} />
                        {chapter.note}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="story-progress" aria-hidden="true">
          <span />
        </div>
      </div>
      <div className="story-markers" aria-hidden="true">
        {CHAPTERS.map((chapter, i) => (
          <div id={`workflow-${i}`} key={chapter.label} />
        ))}
      </div>
    </section>
  );
}
