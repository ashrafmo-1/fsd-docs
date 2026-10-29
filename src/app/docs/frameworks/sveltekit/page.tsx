import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { PublishedDocumentationVideo } from "@/components/docs/published-documentation-video";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "SvelteKit",
  description:
    "Create a Svelte 5 and SvelteKit 2 Feature-Sliced Design project with native generators and file-based routes.",
  alternates: { canonical: "/docs/frameworks/sveltekit" },
};

const STACK = [
  ["Framework", "Svelte 5 + SvelteKit 2"],
  ["API client", "Native Fetch by default, Axios optional"],
  ["Server state", "TanStack Svelte Query v6"],
  ["Client state", "Svelte stores"],
  ["Forms", "SvelteKit Superforms + Zod 4"],
  ["Quality", "TypeScript, ESLint, Steiger, Husky, Commitlint"],
];

export default function SvelteKitFrameworkPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Stable in CLI 2.5.0
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        SvelteKit-native FSD with the complete structure
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        The SvelteKit edition combines Svelte 5 runes, SSR-ready routing, and a
        complete Feature-Sliced Design source tree. Its generators write native
        <code>.svelte</code> components and keep route files as thin wrappers
        around FSD page slices.
      </p>

      <PublishedDocumentationVideo pageKey="/docs/frameworks/sveltekit" />

      <section className="mt-10 space-y-4">
        <h2
          id="create-a-sveltekit-project"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Create a SvelteKit project
        </h2>
        <CodeBlock code="npx create-fsd-architecture@latest my-app --framework sveltekit --yes" />
        <CodeBlock code="npm create fsd-architecture@latest" />
        <p className="text-sm leading-relaxed text-body-muted">
          Interactive setup lets you keep the defaults—native Fetch, Svelte
          Query, Svelte stores, and Superforms + Zod—or disable optional tools.
        </p>
      </section>

      <section className="mt-10">
        <h2
          id="default-stack"
          className="mb-4 text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Default stack
        </h2>
        <div className="overflow-hidden rounded-2xl border border-hairline bg-canvas">
          {STACK.map(([label, value]) => (
            <div
              key={label}
              className="grid gap-1 border-t border-hairline px-5 py-4 first:border-t-0 sm:grid-cols-[160px_1fr]"
            >
              <span className="text-sm font-semibold text-ink">{label}</span>
              <span className="text-sm text-body">{value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="sveltekit-and-fsd-directory-contract"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          SvelteKit and FSD directory contract
        </h2>
        <CodeBlock
          language="text"
          code={`src/
├── app/          # FSD application providers and global setup
├── pages/        # FSD page slices, not SvelteKit route files
├── widgets/      # Composed interface blocks
├── features/     # User interactions
├── entities/     # Business models
├── shared/       # Reusable UI, API, config, and utilities
└── routes/       # SvelteKit file-based route wrappers`}
        />
        <p className="text-sm leading-relaxed text-body-muted">
          SvelteKit reserves <code>$app</code>, so the FSD app layer uses the
          <code>$fsd-app</code> alias. Other aliases include <code>$pages</code>
          , <code>$widgets</code>, <code>$features</code>,{" "}
          <code>$entities</code>, and <code>$shared</code>.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="native-generators-and-routes"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Native generators and routes
        </h2>
        <CodeBlock
          code={`npx create-fsd-architecture -g feature auth
npx create-fsd-architecture -g entity product
npx create-fsd-architecture -g widget navbar
npx create-fsd-architecture -g page account`}
        />
        <CodeBlock
          language="text"
          code={`src/pages/account/
├── ui/AccountPage.svelte
└── index.ts

src/routes/account/+page.svelte`}
        />
        <p className="text-sm leading-relaxed text-body-muted">
          The route wrapper imports the public page-slice API, so SvelteKit owns
          URL matching while FSD owns the page composition.
        </p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
          <h2 id="runtime-config" className="text-lg font-semibold text-ink">
            Runtime config
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            Set <code>PUBLIC_API_BASE</code> for generated API helpers. The
            default Fetch client works in both server and browser code.
          </p>
        </div>
        <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
          <h2 id="nodejs" className="text-lg font-semibold text-ink">
            Node.js
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            Generated projects require Node.js 22.22.2 or later. The starter
            pins Node 22.23.0 for repeatable local and CI checks.
          </p>
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="quality-workflow"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Quality workflow
        </h2>
        <CodeBlock
          code={`npm run lint
npm run typecheck
npm run fsd:check
npm run build
npm run ci`}
        />
        <a
          href={siteConfig.repositories.sveltekit}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-sm font-semibold text-ink underline underline-offset-4"
        >
          View the SvelteKit starter on GitHub
        </a>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="what-each-generator-writes"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          What each generator writes
        </h2>
        <p className="text-base leading-relaxed text-body">
          Output from <code>--dry-run</code> in a project with the SvelteKit
          defaults (Fetch, Svelte Query, Svelte stores, Superforms + Zod). Every
          slice gets an <code>index.ts</code> public API.
        </p>
        <CodeBlock
          language="text"
          code={`-g feature checkout
  src/features/checkout/model/checkout.types.ts
  src/features/checkout/model/checkout.store.ts     # Svelte store
  src/features/checkout/ui/CheckoutView.svelte
  src/features/checkout/api/checkout.api.ts
  src/features/checkout/api/checkout.query.ts       # Svelte Query
  src/features/checkout/lib/checkout.keys.ts        # query keys
  src/features/checkout/index.ts

-g entity product
  src/entities/product/model/product.types.ts
  src/entities/product/ui/ProductCard.svelte
  src/entities/product/index.ts

-g widget product-list
  src/widgets/product-list/ui/ProductList.svelte
  src/widgets/product-list/index.ts

-g page catalog
  src/pages/catalog/ui/CatalogPage.svelte
  src/pages/catalog/index.ts
  src/routes/catalog/+page.svelte                   # route file (created/updated)`}
        />
        <p className="text-base leading-relaxed text-body">
          SvelteKit routing is file-based, so a page slice also gets a thin{" "}
          <code>src/routes/&lt;name&gt;/+page.svelte</code> that renders the
          page through the <code>$pages</code> alias. Route logic such as{" "}
          <code>+page.ts</code> loaders stays yours to add next to it.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="capabilities-change-the-output"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Capabilities change the output
        </h2>
        <p className="text-base leading-relaxed text-body">
          Generators read <code>fsd.config.json</code>. With{" "}
          <code>serverState: "none"</code>, features skip the API module, the
          Svelte Query module, and the keys; with{" "}
          <code>clientState: "none"</code>, they skip the store; with{" "}
          <code>forms: "none"</code>, auth skips the Superforms + Zod schemas.
          Existing slices are never rewritten when you change the config.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="auth-in-sveltekit"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Auth in SvelteKit
        </h2>
        <p className="text-base leading-relaxed text-body">
          <code>-g feature auth</code> writes five flows (login, register,
          forgot password, reset password, verify code), each with an API
          module, a Zod schema, and a <code>LoginForm.svelte</code>-style
          component, plus a shared store, Svelte Query module, and keys.{" "}
          <code>--auth-provider supabase</code> adds the browser adapter (
          <code>api/supabase.ts</code>) and a <code>SUPABASE.md</code> setup
          note.
        </p>
      </section>
    </article>
  );
}
