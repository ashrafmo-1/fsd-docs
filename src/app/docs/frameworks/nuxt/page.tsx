import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nuxt",
  description:
    "Create a production-ready Nuxt 4 Feature-Sliced Design project with SSR-aware providers and framework-native generators.",
  alternates: { canonical: "/docs/frameworks/nuxt" },
};

const STACK = [
  ["Framework", "Nuxt 4 + Vue 3"],
  ["API client", "Nuxt $fetch by default, Axios optional"],
  ["Server state", "TanStack Vue Query with SSR hydration"],
  ["Client state", "Pinia through @pinia/nuxt"],
  ["Forms", "VeeValidate + Zod through @vee-validate/nuxt"],
  ["Quality", "TypeScript, Nuxt ESLint, Steiger, Husky, Commitlint"],
];

export default function NuxtFrameworkPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Stable in CLI 2.4.0
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Nuxt-native SSR with the complete FSD structure
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        The Nuxt edition keeps Nuxt&apos;s official <code>app/</code> source
        directory while preserving every Feature-Sliced Design layer. Routing,
        runtime configuration, modules, and server-state hydration use Nuxt
        conventions instead of copying the Vue + Vite setup.
      </p>

      <section className="mt-10 space-y-4">
        <h2
          id="create-a-nuxt-project"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Create a Nuxt project
        </h2>
        <CodeBlock code="npx create-fsd-architecture@latest my-nuxt-app --framework nuxt" />
        <CodeBlock code="npx create-fsd-architecture@latest my-nuxt-app --framework nuxt --yes" />
        <p className="text-sm leading-relaxed text-body-muted">
          The interactive command lets you choose Axios or native Fetch and
          enable or disable Vue Query, Pinia, and forms. <code>--yes</code> uses
          the Nuxt defaults: native <code>$fetch</code>, Vue Query, Pinia, and
          VeeValidate + Zod.
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
          id="nuxt-and-fsd-directory-contract"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Nuxt and FSD directory contract
        </h2>
        <CodeBlock
          language="text"
          code={`app/
├── app/          # Nuxt bootstrap, route wrappers, and global styles
├── pages/        # FSD page slices, not Nuxt route files
├── widgets/      # Large reusable UI blocks
├── features/     # User interactions and business actions
├── entities/     # Business entities and representations
├── shared/       # API, assets, config, utilities, types, and UI
└── plugins/      # Nuxt runtime integrations such as Vue Query`}
        />
        <p className="text-base leading-relaxed text-body">
          File-based route wrappers live in <code>app/app/routes</code>. They
          import page slices from <code>app/pages</code>, preventing Nuxt from
          treating internal FSD files as accidental routes.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="generate-slices-and-routes"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Generate slices and routes
        </h2>
        <CodeBlock
          code={`npx create-fsd-architecture --generate feature checkout
npx create-fsd-architecture --generate entity product
npx create-fsd-architecture --generate widget navbar
npx create-fsd-architecture --generate page account
npx create-fsd-architecture --generate feature auth`}
        />
        <CodeBlock
          language="text"
          code={`app/pages/account/
├── ui/AccountPage.vue
└── index.ts

app/app/routes/account.vue  # exposes /account`}
        />
        <p className="text-base leading-relaxed text-body">
          Feature, entity, widget, and auth output uses Vue single-file
          components and the selected Nuxt modules. Page generation also writes
          the thin file-based route wrapper automatically.
        </p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-canvas p-5">
          <h2
            id="runtime-api-config"
            className="text-lg font-semibold text-ink"
          >
            Runtime API config
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            Generated Fetch and Axios clients read the public API base URL from
            Nuxt runtime config, so SSR and browser requests use the same
            project-level contract.
          </p>
          <div className="mt-4">
            <CodeBlock code="NUXT_PUBLIC_API_BASE=https://api.example.com" />
          </div>
        </div>
        <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
          <h2 id="node-requirement" className="text-lg font-semibold text-ink">
            Node requirement
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            Generated Nuxt projects require Node.js 22.22.2 or later. The
            template pins Node 22.23.0 for local and CI consistency.
          </p>
        </div>
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
            Inspect the starter, report issues, or contribute in its dedicated
            repository.
          </p>
          <a
            href={siteConfig.repositories.nuxt}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-hairline underline-offset-4"
          >
            Open FSD-NUXT on GitHub
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>
    </article>
  );
}
