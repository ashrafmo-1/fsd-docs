import { CodeBlock } from "@/components/docs/code-block";

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
        Use the v2 generator to create typed FSD slices directly inside an
        existing project. The CLI detects whether your app uses a `src/`
        directory and writes files to the matching FSD layer.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-medium tracking-[-0.5px] text-ink">
          Syntax
        </h2>
        <CodeBlock code="npx create-fsd-architecture --generate <type> <name>" />
        <CodeBlock code="npx create-fsd-architecture -g <type> <name>" />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink">
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
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink">
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
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink">
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
          <h2 className="mb-3 text-xl font-medium text-ink">Supported types</h2>
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
          <h2 className="mb-3 text-xl font-medium text-ink">
            Overwrite behavior
          </h2>
          <p className="text-sm leading-relaxed text-body">
            Existing slices are protected by default. Pass `--force` when you
            intentionally want to overwrite a generated slice.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink">
          Generator behavior
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "Writes to src/features, src/entities, src/widgets, or src/pages when src/ exists.",
            "Writes to root-level features, entities, widgets, or pages when src/ does not exist.",
            "Uses kebab-case for folders and files.",
            "Uses PascalCase for React components.",
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
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink">
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
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink">
          Feature presets
        </h2>
        <p className="mb-4 text-base leading-relaxed text-body">
          When generating a generic feature, the CLI asks what the feature will
          use.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "API: Axios + React Query",
            "Local State: Zustand",
            "Global State: Redux Toolkit",
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
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink">
          Feature preset examples
        </h2>
        <div className="space-y-4">
          <CodeBlock
            language="text"
            code={`? What will this feature use?
> API: Axios + React Query

Creates API helpers, React Query hooks, typed request files, UI entry points,
and a public index.ts export.`}
          />
          <CodeBlock
            language="text"
            code={`? What will this feature use?
> Local State: Zustand

Creates a local store, typed actions/state, UI entry points,
and a public index.ts export.`}
          />
          <CodeBlock
            language="text"
            code={`? What will this feature use?
> Global State: Redux Toolkit

Creates a slice, actions/selectors, UI entry points,
and a public index.ts export.`}
          />
          <CodeBlock
            language="text"
            code={`? What will this feature use?
> UI only

Creates a typed React component, styles-ready structure,
and a public index.ts export.`}
          />
        </div>
      </section>
    </article>
  );
}
