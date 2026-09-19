import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Slice Generator",
  description:
    "Generate feature, entity, widget, and page slices from the project's saved FSD configuration.",
  alternates: { canonical: "/docs/slice-generator" },
};

const SUPPORTED_TYPES = ["feature", "entity", "widget", "page"];

const TYPE_EXAMPLES = [
  {
    type: "feature",
    title: "Feature example",
    description:
      "Use this for user actions and business interactions such as auth, checkout, filters, search, or forms.",
    command: "npx create-fsd-architecture --generate feature auth",
    output: `src/features/auth/
├── ui/
├── model/
└── index.ts`,
  },
  {
    type: "entity",
    title: "Entity example",
    description:
      "Use this for business objects such as product, user, order, brand, category, or cart item.",
    command: "npx create-fsd-architecture --generate entity product",
    output: `src/entities/product/
├── ui/
├── model/
└── index.ts`,
  },
  {
    type: "widget",
    title: "Widget example",
    description:
      "Use this for composed UI blocks such as navbar, sidebar, header, product grid, or checkout summary.",
    command: "npx create-fsd-architecture --generate widget navbar",
    output: `src/widgets/navbar/
├── ui/
└── index.ts`,
  },
  {
    type: "page",
    title: "Page example",
    description:
      "Use this for route-level page compositions such as checkout, profile, catalog, or dashboard.",
    command: "npx create-fsd-architecture --generate page checkout",
    output: `src/pages/checkout/
├── ui/
└── index.ts`,
  },
];

export default function SliceGeneratorPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-body-muted">
        In-project generation
      </p>
      <h1 className="text-4xl font-medium leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Generate FSD slices
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        Generate typed FSD slices directly inside an existing project. The CLI
        reads <code>fsd.config.json</code>, resolves the framework&apos;s source
        directory, and writes framework-aware files to the matching layer.
      </p>

      <section className="mt-10 space-y-4">
        <h2
          id="syntax"
          className="text-2xl font-medium tracking-[-0.5px] text-ink"
        >
          Syntax
        </h2>
        <CodeBlock code="npx create-fsd-architecture --generate <type> <name>" />
        <CodeBlock code="npx create-fsd-architecture -g <type> <name>" />
      </section>

      <section className="mt-10">
        <h2
          id="command-examples"
          className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink"
        >
          Command examples
        </h2>
        <CodeBlock
          code={`npx create-fsd-architecture --generate feature auth
npx create-fsd-architecture -g feature checkout-flow
npx create-fsd-architecture --generate feature product-filters
npx create-fsd-architecture --generate entity product
npx create-fsd-architecture -g entity order
npx create-fsd-architecture --generate widget navbar
npx create-fsd-architecture -g widget dashboard-sidebar
npx create-fsd-architecture --generate page checkout`}
        />
      </section>

      <section className="mt-10">
        <h2
          id="examples-by-slice-type"
          className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink"
        >
          Examples by slice type
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {TYPE_EXAMPLES.map((example) => (
            <div
              key={example.type}
              className="rounded-[16px] border border-hairline bg-surface-soft p-5"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold text-ink">
                  {example.title}
                </h3>
                <span className="rounded-[9999px] bg-canvas px-3 py-1 text-xs font-semibold text-body-muted">
                  {example.type}
                </span>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-body">
                {example.description}
              </p>
              <div className="space-y-3">
                <CodeBlock code={example.command} />
                <CodeBlock language="text" code={example.output} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2
          id="overwrite-examples"
          className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink"
        >
          Overwrite examples
        </h2>
        <p className="mb-4 text-base leading-relaxed text-body">
          The generator protects existing slices unless you explicitly pass
          `--force`.
        </p>
        <CodeBlock
          code={`npx create-fsd-architecture --generate feature auth --force
npx create-fsd-architecture -g widget navbar --force`}
        />
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-[16px] border border-hairline bg-surface-soft p-5">
          <h2
            id="supported-types"
            className="mb-3 text-xl font-medium text-ink"
          >
            Supported types
          </h2>
          <div className="flex flex-wrap gap-2">
            {SUPPORTED_TYPES.map((type) => (
              <span
                key={type}
                className="rounded-[9999px] bg-canvas px-3 py-1 text-sm font-medium text-ink"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[16px] border border-hairline bg-surface-soft p-5">
          <h2
            id="overwrite-behavior"
            className="mb-3 text-xl font-medium text-ink"
          >
            Overwrite behavior
          </h2>
          <p className="text-sm leading-relaxed text-body">
            Existing slices are protected by default. Pass `--force` when you
            intentionally want to overwrite a generated slice.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2
          id="generator-behavior"
          className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink"
        >
          Generator behavior
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "Writes to src/* layers for React, Next.js, Vue + Vite, and SvelteKit projects.",
            "Writes to app/* layers for Nuxt projects.",
            "Uses kebab-case for folders and files.",
            "Uses PascalCase for React components and Vue or Svelte component names.",
            "Uses camelCase for variables and hooks.",
            "Generates TypeScript boilerplate and a public index.ts API.",
            "Prints a success message with the created files list.",
            "Shows clear validation errors for invalid usage.",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[12px] border border-hairline bg-canvas p-4 text-sm leading-relaxed text-body"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2
          id="generated-paths"
          className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink"
        >
          Generated paths
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold text-ink">
              Project with src/
            </p>
            <CodeBlock
              language="text"
              code={`src/features/auth/
src/entities/product/
src/widgets/navbar/
src/pages/checkout/`}
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-ink">Nuxt project</p>
            <CodeBlock
              language="text"
              code={`app/features/auth/
app/entities/product/
app/widgets/navbar/
app/pages/checkout/
app/app/routes/checkout.vue`}
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-ink">
              SvelteKit project
            </p>
            <CodeBlock
              language="text"
              code={`src/features/auth/
src/entities/product/
src/widgets/navbar/
src/pages/checkout/
src/routes/checkout/+page.svelte`}
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-ink">
              Project without src/
            </p>
            <CodeBlock
              language="text"
              code={`features/auth/
entities/product/
widgets/navbar/
pages/checkout/`}
            />
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2
          id="feature-presets"
          className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink"
        >
          Feature presets
        </h2>
        <p className="mb-4 text-base leading-relaxed text-body">
          Generic features use the API, server-state, client-state, and forms
          choices already stored in <code>fsd.config.json</code>.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "React: React Query + Zustand or Redux Toolkit",
            "Vue: Vue Query + Pinia",
            "Nuxt: Vue Query SSR + Pinia modules",
            "SvelteKit: Svelte Query + Svelte stores",
            "Forms: React Hook Form, VeeValidate, or Superforms + Zod",
            "UI only",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[12px] bg-surface-soft p-4 text-sm font-medium text-ink"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2
          id="feature-preset-examples"
          className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink"
        >
          Feature preset examples
        </h2>
        <div className="space-y-4">
          <CodeBlock
            language="text"
            code={`apiClient: axios
serverState: react-query

Creates API helpers, React Query hooks, typed request files, UI entry points,
and a public index.ts export.`}
          />
          <CodeBlock
            language="text"
            code={`framework: vue-vite
serverState: vue-query
clientState: pinia
forms: vee-validate-zod

Creates Vue single-file components, composables, a Pinia store,
typed API helpers, validation schemas, and a public index.ts export.`}
          />
          <CodeBlock
            language="text"
            code={`framework: sveltekit
apiClient: fetch
serverState: svelte-query
clientState: svelte-store
forms: sveltekit-superforms-zod

Creates Svelte 5 components, Svelte Query accessors, a Svelte store,
Superforms + Zod validation, and a public index.ts export. Page slices also
receive a src/routes/<name>/+page.svelte route wrapper.`}
          />
          <CodeBlock
            language="text"
            code={`clientState: zustand

Creates a local store, typed actions/state, UI entry points,
and a public index.ts export.`}
          />
          <CodeBlock
            language="text"
            code={`clientState: redux

Creates a slice, actions/selectors, UI entry points,
and a public index.ts export.`}
          />
          <CodeBlock
            language="text"
            code={`apiClient: fetch
serverState: none
clientState: none
forms: none

Creates a typed framework-native component, styles-ready structure,
and a public index.ts export.`}
          />
        </div>
      </section>
    </article>
  );
}
