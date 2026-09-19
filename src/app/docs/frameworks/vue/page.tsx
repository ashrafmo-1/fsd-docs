import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vue + Vite",
  description:
    "Create a complete Vue 3 + Vite Feature-Sliced Design project and generate framework-native slices with FSD CLI.",
  alternates: { canonical: "/docs/frameworks/vue" },
};

const STACK = [
  ["Framework", "Vue 3 + Vite"],
  ["Server state", "TanStack Vue Query"],
  ["Client state", "Pinia"],
  ["Forms", "VeeValidate + Zod"],
  ["Styling", "Tailwind CSS 4"],
  ["Quality", "TypeScript, ESLint, Steiger, Husky, Commitlint"],
];

export default function VueFrameworkPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Stable in CLI 2.3.0
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Vue + Vite, with the full FSD workflow
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        The Vue edition is a first-class template, not a renamed React starter.
        It ships Vue-native providers, single-file components, composables,
        state, forms, and generators while keeping the same complete FSD layer
        contract as the other editions.
      </p>

      <section className="mt-10 space-y-4">
        <h2
          id="create-a-vue-project"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Create a Vue project
        </h2>
        <CodeBlock code="npx create-fsd-architecture@latest my-vue-app --framework vue-vite" />
        <CodeBlock code="npx create-fsd-architecture@latest my-vue-app --framework vue-vite --yes" />
        <p className="text-sm leading-relaxed text-body-muted">
          The first command keeps stack prompts interactive. The second accepts
          the Vue defaults: Axios, Vue Query, Pinia, and VeeValidate + Zod.
        </p>
      </section>

      <section className="mt-10">
        <h2
          id="default-stack"
          className="mb-4 text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Default stack
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {STACK.map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-hairline bg-surface-soft p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[1.2px] text-body-muted">
                {label}
              </p>
              <p className="mt-2 font-semibold text-ink">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="complete-architecture-from-day-one"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Complete architecture from day one
        </h2>
        <CodeBlock
          language="text"
          code={`src/
├── app/          # App shell, providers, routing, and styles
├── pages/        # Route-level compositions
├── widgets/      # Large reusable UI blocks
├── features/     # User interactions and business actions
├── entities/     # Business entities and representations
└── shared/       # API, assets, config, utilities, types, and UI`}
        />
        <p className="text-sm leading-relaxed text-body-muted">
          Empty architectural segments remain visible through documentation
          placeholders, so cloning the repository does not collapse the FSD
          structure.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="vue-native-generation"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Vue-native generation
        </h2>
        <CodeBlock
          code={`npx create-fsd-architecture --generate feature checkout
npx create-fsd-architecture --generate entity product
npx create-fsd-architecture --generate widget navbar
npx create-fsd-architecture --generate page catalog
npx create-fsd-architecture --generate feature auth`}
        />
        <p className="text-base leading-relaxed text-body">
          The CLI reads <code>fsd.config.json</code> and writes Vue SFCs,
          composables, typed API modules, Pinia stores, and VeeValidate schemas
          only when the selected capabilities require them. The auth command
          creates all five supported auth flows together.
        </p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-canvas p-5">
          <h2 id="quality-commands" className="text-lg font-semibold text-ink">
            Quality commands
          </h2>
          <div className="mt-4">
            <CodeBlock
              code={`npm run fsd:check
npm run lint
npm run typecheck
npm run build
npm run ci`}
            />
          </div>
        </div>
        <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
          <h2 id="template-source" className="text-lg font-semibold text-ink">
            Template source
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            Inspect the starter, report issues, or contribute directly in its
            dedicated repository.
          </p>
          <a
            href={siteConfig.repositories.vue}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-hairline underline-offset-4"
          >
            Open FSD-VUE on GitHub
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>
    </article>
  );
}
