import type { Metadata } from "next";
import { ReactFrameworkGuide } from "@/components/docs/react-framework-guide";

export const metadata: Metadata = {
  title: "Next.js",
  description:
    "Create a Next.js App Router FSD project with route wrappers, saved stack choices, and React-native generators.",
  alternates: { canonical: "/docs/frameworks/nextjs" },
};

export default function NextFrameworkPage() {
  return <ReactFrameworkGuide next />;
}
