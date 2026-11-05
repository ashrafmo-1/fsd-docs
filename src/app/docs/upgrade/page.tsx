import type { Metadata } from "next";
import { docsPageMetadata } from "@/lib/metadata";
import { MdxContent } from "@/components/docs/mdx-content";
import Content from "@/content/docs/upgrade.mdx";

export const metadata: Metadata = docsPageMetadata({
  title: "Safe project upgrades",
  description:
    "Inspect and safely apply versioned FSD CLI tooling migrations without re-scaffolding business code.",
  path: "/docs/upgrade",
});

export default function UpgradePage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Available in CLI 2.6.0
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Safely upgrade an existing FSD CLI project
      </h1>
      <MdxContent>
        <Content />
      </MdxContent>
    </article>
  );
}
