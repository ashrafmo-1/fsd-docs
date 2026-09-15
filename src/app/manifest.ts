import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FSD CLI Documentation",
    short_name: "FSD CLI",
    description:
      "Documentation for create-fsd-architecture project scaffolding and slice generators.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#071426",
    icons: [{ src: "/icon.png", sizes: "1254x1254", type: "image/png" }],
  };
}
