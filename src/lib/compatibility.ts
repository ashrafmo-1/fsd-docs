// Mirrors bin/core/runtime-requirements.mjs in FSD-CLI/cli as published in
// CLI 2.7.1. Update both together when a template or the CLI changes engines.
export const COMPATIBILITY_CLI_VERSION = "2.7.1";

export const CLI_NODE_RANGE = ">=22.12.0";

export type FrameworkCompatibility = {
  framework: string;
  configValue: string;
  nodeRange: string;
  evidence: string;
  packageManagers: string;
};

export const FRAMEWORK_COMPATIBILITY: FrameworkCompatibility[] = [
  {
    framework: "React + Vite",
    configValue: "react-vite",
    nodeRange: ">=22.12.0",
    evidence: "CLI floor; vite 8.3.0 requires ^20.19.0 || >=22.12.0",
    packageManagers: "npm, pnpm, Yarn, Bun",
  },
  {
    framework: "Next.js",
    configValue: "nextjs",
    nodeRange: ">=22.12.0",
    evidence: "CLI floor; next 16.4.3 requires >=20.9.0",
    packageManagers: "npm, pnpm, Yarn, Bun",
  },
  {
    framework: "Vue + Vite",
    configValue: "vue-vite",
    nodeRange: ">=22.12.0",
    evidence: "CLI floor; vite 8.3.0 requires ^20.19.0 || >=22.12.0",
    packageManagers: "npm, pnpm, Yarn, Bun",
  },
  {
    framework: "Nuxt",
    configValue: "nuxt",
    nodeRange: "^22.22.2 || ^24.11.0 || >=26.0.0",
    evidence:
      "FSD Nuxt template requires >=22.22.2; nuxt 4.5.2 requires ^22.19.0 || ^24.11.0 || >=26.0.0",
    packageManagers: "npm, pnpm, Yarn, Bun",
  },
  {
    framework: "SvelteKit",
    configValue: "sveltekit",
    nodeRange: "^22.22.2 || >=24.0.0",
    evidence:
      "FSD SvelteKit template requires >=22.22.2; @sveltejs/vite-plugin-svelte 6.2.1 requires ^20.19 || ^22.12 || >=24",
    packageManagers: "npm, pnpm, Yarn, Bun",
  },
];

export const PACKAGE_MANAGER_MINIMUMS = [
  ["npm", "10.9.0", "The npm bundled with Node.js 22.12.0"],
  ["pnpm", "10.26.0", "Lowest pnpm release in the CLI CI matrix"],
  ["Yarn", "4.18.0", "Yarn 4 release pinned by the CLI CI matrix"],
  ["Bun", "1.2.0", "Oldest Bun line in the CLI package manager matrix"],
] as const;
