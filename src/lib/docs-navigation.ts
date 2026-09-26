export type DocsNavItem = {
  label: string;
  href: string;
  description: string;
};

export type DocsNavGroup = {
  label: string;
  items: DocsNavItem[];
};

export const DOCS_NAVIGATION: DocsNavGroup[] = [
  {
    label: "Start",
    items: [
      {
        label: "Overview",
        href: "/docs",
        description: "Understand the CLI and its main workflows.",
      },
      {
        label: "Getting started",
        href: "/docs/getting-started",
        description: "Create a complete FSD project.",
      },
    ],
  },
  {
    label: "CLI",
    items: [
      {
        label: "Project configuration",
        href: "/docs/configuration",
        description: "Reference for fsd.config.json.",
      },
      {
        label: "Slice generator",
        href: "/docs/slice-generator",
        description: "Generate features, entities, widgets, and pages.",
      },
      {
        label: "Auth generator",
        href: "/docs/auth-generator",
        description: "Generate a complete authentication flow.",
      },
      {
        label: "Safe upgrades",
        href: "/docs/upgrade",
        description:
          "Plan and apply protected migrations to existing projects.",
      },
      {
        label: "AI Agent Skill (Beta)",
        href: "/docs/ai-agent-skill",
        description: "Try the beta skill with verified FSD CLI commands.",
      },
    ],
  },
  {
    label: "Frameworks",
    items: [
      {
        label: "React + Vite",
        href: "/docs/frameworks/react",
        description: "React setup, React Router, and native slice generators.",
      },
      {
        label: "Next.js",
        href: "/docs/frameworks/nextjs",
        description: "App Router setup, FSD page slices, and route wrappers.",
      },
      {
        label: "Vue + Vite",
        href: "/docs/frameworks/vue",
        description: "Vue-native FSD setup and generators.",
      },
      {
        label: "Nuxt",
        href: "/docs/frameworks/nuxt",
        description: "Nuxt SSR setup and file-based routes.",
      },
      {
        label: "SvelteKit",
        href: "/docs/frameworks/sveltekit",
        description: "SvelteKit setup, providers, and generators.",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        label: "Releases",
        href: "/docs/releases",
        description: "Version history, changes, and compatibility notes.",
      },
    ],
  },
];

export const DOCS_NAV_ITEMS = DOCS_NAVIGATION.flatMap((group) => group.items);

export function getDocsNavigation(pathname: string) {
  const index = DOCS_NAV_ITEMS.findIndex((item) => item.href === pathname);

  return {
    current: index >= 0 ? DOCS_NAV_ITEMS[index] : undefined,
    previous: index > 0 ? DOCS_NAV_ITEMS[index - 1] : undefined,
    next:
      index >= 0 && index < DOCS_NAV_ITEMS.length - 1
        ? DOCS_NAV_ITEMS[index + 1]
        : undefined,
  };
}

export function getDocsSourcePath(pathname: string) {
  if (pathname === "/docs") return "src/app/docs/page.tsx";
  if (pathname === "/docs/releases") return "src/app/docs/releases/page.tsx";
  if (pathname.startsWith("/docs/releases/")) {
    return "src/lib/releases.ts";
  }

  return `src/app${pathname}/page.tsx`;
}
