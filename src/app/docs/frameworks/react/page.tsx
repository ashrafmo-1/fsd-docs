import type { Metadata } from "next";
import { ReactFrameworkGuide } from "@/components/docs/react-framework-guide";
import { docsPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = docsPageMetadata({
  title: "React + Vite",
  description:
    "Create a React + Vite FSD project with React Router, saved stack choices, and native slice generators.",
  path: "/docs/frameworks/react",
});

export default function ReactFrameworkPage() {
  return <ReactFrameworkGuide />;
}
