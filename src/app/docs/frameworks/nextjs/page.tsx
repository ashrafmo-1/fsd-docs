import type { Metadata } from "next";
import { docsPageMetadata } from "@/lib/metadata";
import { ReactFrameworkGuide } from "@/components/docs/react-framework-guide";

export const metadata: Metadata = docsPageMetadata({
  title: "Next.js",
  description:
    "Create a Next.js App Router FSD project with route wrappers, saved stack choices, and React-native generators.",
  path: "/docs/frameworks/nextjs",
});

export default function NextFrameworkPage() {
  return <ReactFrameworkGuide next />;
}
