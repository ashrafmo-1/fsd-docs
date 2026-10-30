import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { PublishedDocumentationVideo } from "@/components/docs/published-documentation-video";

export const metadata: Metadata = {
  title: "Recipes",
  description:
    "End-to-end FSD CLI recipes: a product catalog, a site shell with layout presets, Supabase sign-in, adding FSD structure to an existing app, and guarding architecture in CI.",
  alternates: { canonical: "/docs/recipes" },
};

function Recipe({
  id,
  title,
  goal,
  children,
}: {
  id: string;
  title: string;
  goal: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 space-y-4">
      <h2 id={id} className="text-2xl font-semibold tracking-[-0.5px] text-ink">
        {title}
      </h2>
      <p className="text-base leading-relaxed text-body">
        <strong className="text-ink">Goal:</strong> {goal}
      </p>
      {children}
    </section>
  );
}

function Step({ children }: { children: React.ReactNode }) {
  return <p className="text-base leading-relaxed text-body">{children}</p>;
}

export default function RecipesPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Recipes
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Build real features, step by step
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        Each recipe starts from a generated project and uses only released CLI
        commands. Generated files are scaffolding: the comments marked{" "}
        <code>{"// your code"}</code> show where your product logic goes.
        Examples use React + Vite; the commands are the same for every
        framework.
      </p>

      <PublishedDocumentationVideo pageKey="/docs/recipes" />

      <Recipe
        id="product-catalog"
        title="1. A product catalog"
        goal="list products, open one, and add it to a cart, with each concept in its own slice."
      >
        <CodeBlock
          code={`npx create-fsd-architecture@latest shop --framework react-vite --yes
cd shop
npx create-fsd-architecture@latest -g entity product --dry-run
npx create-fsd-architecture@latest -g entity product
npx create-fsd-architecture@latest -g feature add-to-cart
npx create-fsd-architecture@latest -g widget product-list
npx create-fsd-architecture@latest -g page catalog`}
        />
        <Step>
          The entity owns the <code>Product</code> type and{" "}
          <code>ProductCard</code>. The feature owns the user action. The widget
          composes both, and the page places the widget on a route that the CLI
          registers for you.
        </Step>
        <CodeBlock
          language="tsx"
          code={`// widgets/product-list/ui/product-list.tsx  (your code)
import { ProductCard, type Product } from "@/entities/product";
import { AddToCart } from "@/features/add-to-cart";

export function ProductList({ products }: { products: Product[] }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
          <AddToCart productId={product.id} />
        </li>
      ))}
    </ul>
  );
}`}
        />
        <Step>
          The <code>AddToCart</code> and <code>ProductList</code> components are
          yours to write inside the generated slices. Export them from each
          slice&apos;s <code>index.ts</code> so other layers import only the
          public API. Need several entities at once? Batch them:{" "}
          <code>-g entity product category review</code>.
        </Step>
      </Recipe>

      <Recipe
        id="site-shell"
        title="2. A site shell with layout presets"
        goal="ship accessible navigation, footer, and content pages in minutes."
      >
        <CodeBlock
          code={`npx create-fsd-architecture@latest -g widget navbar sidebar footer bottom-bar
npx create-fsd-architecture@latest -g page home about consult`}
        />
        <Step>
          These names are presets: the widgets render labelled landmarks such as{" "}
          <code>&lt;nav aria-label&gt;</code>, and the pages come with content
          sections and, for <code>consult</code>, a contact form with required
          fields. Any other name produces an empty slice instead. Edit the
          generated copy, then wire the widgets into your <code>app</code>{" "}
          layout.
        </Step>
      </Recipe>

      <Recipe
        id="supabase-sign-in"
        title="3. Sign in with Supabase"
        goal="replace the example auth requests with real Supabase calls."
      >
        <CodeBlock
          code={`npx create-fsd-architecture@latest -g feature auth --auth-provider supabase --dry-run
npx create-fsd-architecture@latest -g feature auth --auth-provider supabase
npm install @supabase/supabase-js`}
        />
        <CodeBlock
          language="typescript"
          code={`// app/providers/supabase.ts  (your code)
import { createClient } from "@supabase/supabase-js";
import { configureSupabaseAuth } from "@/features/auth";

const client = createClient(publicUrl, publishableKey);
configureSupabaseAuth(client);`}
        />
        <Step>
          Use only the public publishable or anon key in the browser. The
          adapter is in preview: test sign-up, password recovery, and RLS in a
          staging project before production. Details are on{" "}
          <Link
            href="/docs/release-readiness#supabase-auth"
            className="text-brand-coral underline"
          >
            Feature status
          </Link>
          .
        </Step>
      </Recipe>

      <Recipe
        id="existing-app"
        title="4. Add FSD structure to an existing app"
        goal="introduce layers and segments without touching existing files."
      >
        <CodeBlock
          code={`npx create-fsd-architecture@latest -g shared --segments ui,lib,api --root src --dry-run
npx create-fsd-architecture@latest -g shared --segments ui,lib,api --root src
npx create-fsd-architecture@latest -g feature checkout --segments ui,model,api --root src`}
        />
        <Step>
          Structure-only mode creates missing folders and empty public APIs and
          never overwrites a file. Move code into the new slices one at a time,
          and keep the app building after each move. For a guided migration, use
          the{" "}
          <Link
            href="/docs/ai-agent-skill"
            className="text-brand-coral underline"
          >
            AI Agent Skill
          </Link>
          .
        </Step>
      </Recipe>

      <Recipe
        id="architecture-in-ci"
        title="5. Guard the architecture in CI"
        goal="fail a pull request that breaks layer or public-API rules."
      >
        <CodeBlock
          code={`npm install -D steiger @feature-sliced/steiger-plugin`}
        />
        <CodeBlock
          language="yaml"
          code={`# .github/workflows/architecture.yml
name: Architecture
on: [pull_request]
jobs:
  fsd:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npx create-fsd-architecture@latest check --architecture
      - run: npx create-fsd-architecture@latest upgrade --check`}
        />
        <Step>
          <code>check --architecture</code> exits non-zero on violations.{" "}
          <code>upgrade --check</code> exits <code>2</code> when a CLI upgrade
          is available, so drop that step or allow exit code 2 if you only want
          a warning.
        </Step>
      </Recipe>
    </article>
  );
}
