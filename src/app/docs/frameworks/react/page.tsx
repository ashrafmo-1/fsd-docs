import type { Metadata } from "next";
import { ReactFrameworkGuide } from "@/components/docs/react-framework-guide";

export const metadata: Metadata = {
  title: "React + Vite",
  description:
    "Create a React + Vite FSD project with React Router, saved stack choices, and native slice generators.",
  alternates: { canonical: "/docs/frameworks/react" },
};

export default function ReactFrameworkPage() {
  return <ReactFrameworkGuide />;
}
