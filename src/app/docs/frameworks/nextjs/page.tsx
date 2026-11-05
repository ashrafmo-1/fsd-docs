import type { Metadata } from "next";
import { ReactFrameworkGuide } from "@/components/docs/react-framework-guide";
import { docsPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = docsPageMetadata({
  title: "Next.js",
  description:
    "Create a Next.js App Router FSD project with route wrappers, saved stack choices, and React-native generators.",
  path: "/docs/frameworks/nextjs",
});

export default function NextFrameworkPage() {
  return <ReactFrameworkGuide next />;
}
