"use client";

import { ArrowDown, ArrowRight, Check, Copy, Layers3 } from "lucide-react";
import Link from "next/link";
import { type CSSProperties, useState } from "react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { CLI_RELEASES } from "@/lib/releases";

const LAYERS = [
  { name: "app", detail: "The entry point", color: "#2563eb" },
  { name: "pages", detail: "Compose the experience", color: "#818cf8" },
  { name: "widgets", detail: "Build the bigger picture", color: "#a78bfa" },
  { name: "features", detail: "Make things happen", color: "#38bdf8" },
  { name: "entities", detail: "Model your domain", color: "#22d3ee" },
  { name: "shared", detail: "A common foundation", color: "#2dd4bf" },
];
const COMMAND = "npx create-fsd-architecture@latest";

export function Hero() {
  const ref = useScrollProgress("exit");
  const [copyStatus, setCopyStatus] = useState("");
  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopyStatus("Command copied");
    } catch {
      setCopyStatus("Select the command to copy it manually.");
    }
  }
  return (
    <section ref={ref} className="fsd-hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-topline">
          <span>
            <span className="status-dot" /> STRUCTURE IS A SUPERPOWER.
          </span>
          <Link href={`/docs/releases/${CLI_RELEASES[0].version}`}>
            Latest release: v{CLI_RELEASES[0].version} <ArrowRight size={13} />
          </Link>
        </div>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hero-eyebrow">THE CLI FOR FEATURE-SLICED DESIGN</p>
            <h1 id="hero-title">
              Big ideas.
              <br />
              <span>Clear layers.</span>
              <br />
              Built to grow.
            </h1>
            <p className="hero-description">
              Turn your next frontend into a codebase that makes sense. Scaffold
              your foundation. Generate your slices. Build what comes next.
            </p>
            <div className="hero-actions">
              <Link href="/docs/getting-started" className="hero-primary">
                Build your foundation <ArrowRight size={17} />
              </Link>
              <Link href="/architecture" className="hero-secondary">
                Explore the architecture <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div
            className="architecture-scene"
            role="img"
            aria-label="Six connected FSD layers: app, pages, widgets, features, entities, and shared. Upper layers import from lower layers."
          >
            <div className="scene-orbit" />
            <div className="scene-coordinate coordinate-top">
              ARCHITECTURE / EXPLODED VIEW
            </div>
            <div className="layer-stack" aria-hidden="true">
              {LAYERS.map((layer, index) => (
                <div
                  key={layer.name}
                  className="scene-layer"
                  style={
                    {
                      "--layer": index,
                      "--layer-color": layer.color,
                    } as CSSProperties
                  }
                >
                  <div className="layer-face">
                    <span className="layer-number">0{index + 1}</span>
                    <Layers3 size={20} />
                    <strong>{layer.name}</strong>
                    <span className="layer-detail">{layer.detail}</span>
                    <span className="layer-node" />
                  </div>
                </div>
              ))}
            </div>
            <div className="scene-coordinate coordinate-bottom">
              <span className="status-dot" /> SIX LAYERS. ONE DIRECTION.
            </div>
            <div className="scene-caption">
              <span>src/</span>
              <span>Designed for change ↗</span>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <div className="hero-command">
            <span className="command-prefix">$</span>
            <code>{COMMAND}</code>
            <button
              type="button"
              onClick={copyCommand}
              aria-label="Copy project creation command"
            >
              {copyStatus === "Command copied" ? (
                <Check size={17} />
              ) : (
                <Copy size={17} />
              )}
            </button>
            <span className="sr-only" role="status">
              {copyStatus}
            </span>
          </div>
          <ul className="framework-list" aria-label="Supported frameworks">
            <li>React</li>
            <li>Next.js</li>
            <li>Vue</li>
            <li>Nuxt</li>
            <li>SvelteKit</li>
          </ul>
        </div>
        <a href="#how-it-works" className="hero-scroll">
          SCROLL TO CONNECT THE DOTS <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
