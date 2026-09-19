export type ReleaseSection = {
  title: "Added" | "Changed" | "Fixed" | "Compatibility";
  items: string[];
};

export type CliRelease = {
  version: string;
  date: string;
  dateLabel: string;
  summary: string;
  status: "latest" | "stable" | "maintenance" | "legacy";
  frameworks: string[];
  sections: ReleaseSection[];
};

export const CLI_RELEASES: CliRelease[] = [
  {
    version: "2.5.0",
    date: "2026-09-19",
    dateLabel: "September 19, 2026",
    summary:
      "Stable SvelteKit scaffolding with native Svelte 5 generators, providers, state, forms, and file-based routes.",
    status: "latest",
    frameworks: ["SvelteKit", "Svelte 5"],
    sections: [
      {
        title: "Added",
        items: [
          "Stable Svelte 5 and SvelteKit 2 template support through --framework sveltekit.",
          "Fetch and Axios clients backed by PUBLIC_API_BASE.",
          "Request-scoped TanStack Svelte Query v6 provider generation.",
          "Svelte store, SvelteKit Superforms, and Zod 4 capability contracts.",
          "Svelte-native feature, entity, widget, page, and complete auth generators.",
          "SvelteKit file-based page route wrappers in src/routes.",
          "SvelteKit coverage in schema validation, project inspection, and framework CI.",
        ],
      },
      {
        title: "Changed",
        items: [
          "SvelteKit moved from planned to stable in the Template Registry.",
          "Native Fetch became the default SvelteKit API client while Axios remains optional.",
          "Framework CI now validates all five stable templates.",
        ],
      },
      {
        title: "Compatibility",
        items: [
          "React + Vite, Next.js, Vue + Vite, and Nuxt behavior is unchanged.",
          "Configuration schema version remains 1; SvelteKit support is additive.",
          "Generated SvelteKit projects require Node.js 22.22.2 or later.",
        ],
      },
    ],
  },
  {
    version: "2.4.0",
    date: "2026-09-19",
    dateLabel: "September 19, 2026",
    summary:
      "Stable Nuxt 4 support with SSR-aware Vue Query, native runtime configuration, modules, and generated routes.",
    status: "stable",
    frameworks: ["Nuxt 4", "Vue 3"],
    sections: [
      {
        title: "Added",
        items: [
          "Stable Nuxt 4 template support through --framework nuxt.",
          "An app-rooted Nuxt Feature-Sliced Design adapter.",
          "Nuxt-native $fetch and Axios clients backed by public runtime config.",
          "Pinia and VeeValidate module configuration with deterministic updates.",
          "TanStack Vue Query SSR hydration through a generated Nuxt plugin.",
          "File-based route wrappers in app/app/routes.",
        ],
      },
      {
        title: "Changed",
        items: [
          "Framework adapters now control their own source directories.",
          "Nuxt defaults to native Fetch while retaining Axios as an opt-in choice.",
        ],
      },
      {
        title: "Compatibility",
        items: [
          "React + Vite, Next.js, and Vue + Vite behavior is unchanged.",
          "Configuration schema version remains 1.",
          "Generated Nuxt projects require Node.js 22.22.2 or later.",
        ],
      },
    ],
  },
  {
    version: "2.3.2",
    date: "2026-09-17",
    dateLabel: "September 17, 2026",
    summary:
      "A maintenance release that stabilized Next.js formatting and Yarn 4 project creation in CI.",
    status: "maintenance",
    frameworks: ["Next.js", "Yarn"],
    sections: [
      {
        title: "Fixed",
        items: [
          "Generated fsd-stack.ts files now match Biome formatting in new Next.js projects.",
          "Yarn 4 projects establish their own lockfile boundary and use the node-modules linker.",
          "New Yarn lockfiles can be populated when the CLI runs inside immutable CI environments.",
        ],
      },
      {
        title: "Changed",
        items: [
          "npm publishing became maintainer-only and manual.",
          "GitHub tags validate releases and create GitHub Releases without publishing to npm.",
          "CI now pins Yarn 4 instead of Yarn Classic.",
        ],
      },
    ],
  },
  {
    version: "2.3.1",
    date: "2026-09-17",
    dateLabel: "September 17, 2026",
    summary:
      "Project safety, inspection commands, native route registration, and cross-package-manager coverage.",
    status: "stable",
    frameworks: ["All frameworks"],
    sections: [
      {
        title: "Added",
        items: [
          "--dry-run plans that make no filesystem changes.",
          "Transactional --force replacement with rollback.",
          "check, doctor, and config project-inspection commands.",
          "Framework-native page route registration for React Router, Vue Router, and Next.js.",
          "Package-manager contract tests for npm, pnpm, Yarn, and Bun.",
          "Tag-gated Trusted Publishing and automatic GitHub Release creation.",
        ],
      },
      {
        title: "Changed",
        items: [
          "React + Vite now includes React Router and Vue + Vite includes Vue Router.",
          "Incomplete downloads, configuration, and Commitlint failures now roll back safely.",
        ],
      },
      {
        title: "Compatibility",
        items: [
          "Node.js 20 remains the minimum CLI runtime.",
          "Existing creation and generation syntax remains supported.",
          "Configuration schema version remains 1.",
        ],
      },
    ],
  },
  {
    version: "2.3.0",
    date: "2026-09-16",
    dateLabel: "September 16, 2026",
    summary:
      "Stable Vue 3 + Vite support with Vue-native generators, providers, state, forms, and auth.",
    status: "stable",
    frameworks: ["Vue 3", "Vite"],
    sections: [
      {
        title: "Added",
        items: [
          "Stable Vue 3 + Vite support through --framework vue-vite.",
          "Pinia, TanStack Vue Query, VeeValidate, and Zod configuration.",
          "Vue-native feature, entity, widget, page, and complete auth generators.",
          "Vue configuration and generator regression tests.",
        ],
      },
      {
        title: "Changed",
        items: [
          "Framework adapters now own dependency selection and versions.",
          "Managed dependencies no longer leak React packages into Vue projects.",
          "Provider generation now emits Vue plugins or React providers based on the adapter.",
        ],
      },
      {
        title: "Compatibility",
        items: [
          "React + Vite and Next.js behavior is unchanged.",
          "Configuration schema version remains 1.",
        ],
      },
    ],
  },
  {
    version: "2.2.0",
    date: "2026-09-16",
    dateLabel: "September 16, 2026",
    summary:
      "The architectural release that introduced the registry, capability matrix, adapters, and project lifecycle.",
    status: "stable",
    frameworks: ["React", "Next.js"],
    sections: [
      {
        title: "Added",
        items: [
          "Central Template Registry and Framework Capability Matrix.",
          "React + Vite and Next.js framework adapters.",
          "A dedicated cloning, configuration, Git, Husky, Commitlint, and installation lifecycle.",
          "--help, --version, --list-templates, --framework, --yes, --no-install, and --no-start.",
          "CLI, registry, capability, path-safety, and lifecycle tests.",
        ],
      },
      {
        title: "Changed",
        items: [
          "The CLI entrypoint now focuses on command parsing and routing.",
          "Reusable generator primitives moved into dedicated modules.",
          "API clients, client directives, and validation became adapter-driven.",
        ],
      },
      {
        title: "Compatibility",
        items: [
          "Interactive creation and existing generator syntax remain supported.",
          "fsd.config.json remains on schema version 1.",
        ],
      },
    ],
  },
  {
    version: "2.1.1",
    date: "2026-09-15",
    dateLabel: "September 15, 2026",
    summary:
      "Archived npm release. Detailed release notes were not recorded in the maintained changelog.",
    status: "maintenance",
    frameworks: ["React", "Next.js"],
    sections: [],
  },
  {
    version: "2.1.0",
    date: "2026-09-15",
    dateLabel: "September 15, 2026",
    summary:
      "Introduced fsd.config.json, its JSON schema, and stack-aware project configuration tests.",
    status: "stable",
    frameworks: ["React", "Next.js"],
    sections: [
      {
        title: "Added",
        items: [
          "A persistent fsd.config.json project contract.",
          "A published JSON schema for editor validation and autocomplete.",
          "Stack-aware project configuration and regression tests.",
        ],
      },
      {
        title: "Changed",
        items: [
          "Generator responsibilities were separated into reusable modules.",
        ],
      },
    ],
  },
  {
    version: "2.0.2",
    date: "2026-09-14",
    dateLabel: "September 14, 2026",
    summary:
      "Aligned the CLI with FSD-CLI branding and hardened remote template downloads.",
    status: "maintenance",
    frameworks: ["React", "Next.js"],
    sections: [
      {
        title: "Fixed",
        items: [
          "Updated project and repository branding to FSD-CLI.",
          "Improved the safety and reliability of template downloads.",
        ],
      },
    ],
  },
  {
    version: "2.0.1",
    date: "2026-07-02",
    dateLabel: "July 2, 2026",
    summary:
      "Archived npm release. Detailed release notes were not recorded in the maintained changelog.",
    status: "maintenance",
    frameworks: ["React", "Next.js"],
    sections: [],
  },
  {
    version: "2.0.0",
    date: "2026-06-09",
    dateLabel: "June 9, 2026",
    summary:
      "Expanded the project scaffolder into an in-project FSD generator for product growth after creation.",
    status: "legacy",
    frameworks: ["React", "Next.js"],
    sections: [
      {
        title: "Added",
        items: [
          "In-project feature, entity, widget, and page generation.",
          "The 2.x command surface for growing existing FSD projects.",
        ],
      },
    ],
  },
];

export const LEGACY_NPM_VERSIONS = [
  { version: "1.0.6", date: "June 7, 2026" },
  { version: "1.0.5", date: "May 30, 2026" },
  { version: "1.0.4", date: "May 30, 2026" },
  { version: "1.0.3", date: "May 30, 2026" },
  { version: "1.0.2", date: "May 30, 2026" },
  { version: "1.0.1", date: "May 30, 2026" },
] as const;

export function getRelease(version: string) {
  return CLI_RELEASES.find((release) => release.version === version);
}

// Publication records verified against npm. Historical changes are deliberately
// left empty where no maintained release notes exist.
for (const release of LEGACY_NPM_VERSIONS) {
  CLI_RELEASES.push({
    version: release.version,
    date: release.version === "1.0.6" ? "2026-06-07" : "2026-05-30",
    dateLabel: release.date,
    summary:
      "Archived npm release from the original project scaffolder. Detailed release notes were not recorded in the maintained changelog.",
    status: "legacy",
    frameworks: ["React", "Next.js"],
    sections: [],
  });
}

export function getReleaseNavigation(version: string) {
  const index = CLI_RELEASES.findIndex(
    (release) => release.version === version,
  );

  return {
    newer: index > 0 ? CLI_RELEASES[index - 1] : undefined,
    older:
      index >= 0 && index < CLI_RELEASES.length - 1
        ? CLI_RELEASES[index + 1]
        : undefined,
  };
}
