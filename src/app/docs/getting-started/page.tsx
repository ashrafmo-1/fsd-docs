import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Getting Started",
  description:
    "Create a React, Next.js, Vue, Nuxt, or SvelteKit project with a complete Feature-Sliced Design structure.",
  alternates: { canonical: "/docs/getting-started" },
};

const WIZARD_STEPS = [
  "Choose a project name and starter: React + Vite, Next.js, Vue + Vite, Nuxt, or SvelteKit.",
  "Choose the framework-compatible API, server-state, client-state, and forms stack.",
  "Choose npm, pnpm, Yarn, or Bun as the package manager.",
  "Download the matching starter and write the complete FSD structure.",
  "Save the selected stack in fsd.config.json and initialize a fresh Git repository.",
  "Optionally install dependencies, verify Commitlint, and start the development server.",
];

export default function GettingStartedPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Project scaffolding
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Create a complete FSD project
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        The interactive wizard creates a framework starter, configures the
        selected frontend stack, and keeps every FSD layer available from day
        one.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.5px] text-ink">
          Requirements
        </h2>
        <p className="text-base leading-relaxed text-body">
          Use Node.js 20 or later for the CLI. Nuxt and SvelteKit projects
          require Node.js 22.22.2 or later. Run one of the commands below from
          the directory that should contain the new project.
        </p>
        <CodeBlock code="npm create fsd-architecture@latest" />
        <CodeBlock code="npx create-fsd-architecture@latest" />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-[-0.5px] text-ink">
          Pass the project name directly
        </h2>
        <p className="mb-4 text-base leading-relaxed text-body">
          Supplying a folder name skips only the name prompt. The wizard still
          asks for the framework and stack choices.
        </p>
        <CodeBlock code="npx create-fsd-architecture@latest my-app" />
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.5px] text-ink">
          Choose a framework from the command line
        </h2>
        <p className="text-base leading-relaxed text-body">
          Use <code>--framework</code> for repeatable setup. Add{" "}
          <code>--yes</code>
          to accept that framework&apos;s default stack, not React defaults.
        </p>
        <CodeBlock
          code={`npx create-fsd-architecture@latest my-react-app --framework react-vite --yes
npx create-fsd-architecture@latest my-next-app --framework nextjs --yes
npx create-fsd-architecture@latest my-vue-app --framework vue-vite --yes
npx create-fsd-architecture@latest my-nuxt-app --framework nuxt --yes
npx create-fsd-architecture@latest my-svelte-app --framework sveltekit --yes`}
        />
        <CodeBlock code="npx create-fsd-architecture@latest --list-templates" />
      </section>

      <section className="mt-10">
        <h2 className="mb-5 text-2xl font-semibold tracking-[-0.5px] text-ink">
          What the wizard does
        </h2>
        <ol className="space-y-3 text-base leading-relaxed text-body">
          {WIZARD_STEPS.map((item, index) => (
            <li key={item} className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-mint text-xs font-bold text-ink">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
          <h2 className="text-lg font-semibold text-ink">React + Vite</h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            A client-side React starter with Vite, TypeScript, Tailwind CSS,
            ESLint, Steiger, Git hooks, and the full FSD layer structure.
          </p>
        </div>
        <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
          <h2 className="text-lg font-semibold text-ink">Next.js</h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            An App Router starter with React Compiler, TypeScript, Tailwind CSS,
            Biome, Steiger, Git hooks, and FSD route compositions.
          </p>
        </div>
        <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
          <h2 className="text-lg font-semibold text-ink">Vue + Vite</h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            A Vue 3 starter with Vite, TypeScript, Tailwind CSS, Pinia, TanStack
            Vue Query, VeeValidate + Zod, ESLint, and Steiger.
          </p>
        </div>
        <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
          <h2 className="text-lg font-semibold text-ink">Nuxt</h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            A Nuxt 4 SSR starter with the official app directory, native Fetch,
            Pinia, Vue Query hydration, VeeValidate + Zod, and file-based route
            wrappers for FSD pages.
          </p>
        </div>
        <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
          <h2 className="text-lg font-semibold text-ink">SvelteKit</h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            A Svelte 5 and SvelteKit 2 SSR starter with native Fetch, TanStack
            Svelte Query, Svelte stores, Superforms + Zod, and generated route
            wrappers that compose FSD page slices.
          </p>
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.5px] text-ink">
          Continue manually
        </h2>
        <p className="text-base leading-relaxed text-body">
          If you skip installation or starting the server, the CLI prints the
          matching commands for the package manager you selected.
        </p>
        <CodeBlock
          code={`cd my-app
npm install
npm run dev`}
        />
      </section>
    </article>
  );
}
