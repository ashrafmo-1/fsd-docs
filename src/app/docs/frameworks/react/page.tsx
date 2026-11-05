import type { Metadata } from "next";
import { docsPageMetadata } from "@/lib/metadata";
import { ReactFrameworkGuide } from "@/components/docs/react-framework-guide";

export const metadata: Metadata = docsPageMetadata({
  title: "React + Vite",
  description:
    "Create a React + Vite FSD project with React Router, saved stack choices, and native slice generators.",
  path: "/docs/frameworks/react",
});

export default function ReactFrameworkPage() {
  return <ReactFrameworkGuide />;
}
