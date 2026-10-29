import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "FSD Concepts",
  description:
    "Layers, slices, segments, public APIs, and the import rule of Feature-Sliced Design, and how the FSD CLI maps each one to files.",
  alternates: { canonical: "/docs/concepts" },
};

const LAYERS: [layer: string, purpose: string, example: string][] = [
  ["app", "Entry point, providers, routing, global styles.", "app/providers"],
  [
    "pages",
    "Full routed screens composed from lower layers.",
    "pages/checkout",
  ],
  [
    "widgets",
    "Large self-contained UI blocks reused across pages.",
    "widgets/navbar",
  ],
  [
    "features",
    "User interactions that bring business value.",
    "features/add-to-cart",
  ],
  ["entities", "Business entities the product works with.", "entities/product"],
  ["shared", "Reusable code with no business meaning.", "shared/ui/button"],
];

const SEGMENTS: [segment: string, contents: string][] = [
  ["ui", "Components, styles, and view-only formatting."],
  ["model", "Types, schemas, stores, and business logic."],
  ["api", "Requests and data mapping for this slice."],
  ["lib", "Helpers used inside the slice."],
  ["config", "Constants and feature flags."],
];

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-hairline">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-surface-soft text-ink">
          <tr>
            {head.map((cell) => (
              <th key={cell} className="px-4 py-3 font-semibold">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([first, ...rest]) => (
            <tr key={first} className="border-t border-hairline">
              <td className="px-4 py-3 font-mono text-xs font-semibold text-ink">
                {first}
              </td>
              {rest.map((cell) => (
                <td key={cell} className="px-4 py-3 text-body">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ConceptsPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Methodology
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        FSD concepts in five minutes
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        Feature-Sliced Design organizes frontend code by what it does for the
        product, not by file type. Three ideas carry the whole method: layers,
        slices, and segments. This page explains them and shows where the CLI
        puts each one. The{" "}
        <a
          href="https://feature-sliced.design"
          className="text-brand-coral underline"
        >
          official FSD documentation
        </a>{" "}
        remains the reference for the methodology itself.
      </p>

      <section className="mt-10 space-y-4">
        <h2
          id="layers"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Layers
        </h2>
        <p className="text-base leading-relaxed text-body">
          Layers are the top-level folders under your source root. They are
          ordered from the most specific (<code>app</code>) to the most generic
          (<code>shared</code>). Every generated project has all six.
        </p>
        <Table head={["Layer", "What belongs here", "Example"]} rows={LAYERS} />
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="the-import-rule"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          The import rule
        </h2>
        <p className="text-base leading-relaxed text-body">
          A module may import only from layers below its own. A page can use
          widgets, features, entities, and shared code; an entity can use only
          shared code. Slices on the same layer do not import each other, so{" "}
          <code>features/cart</code> never imports <code>features/auth</code>.
          When two features need to cooperate, compose them one layer up, in a
          widget or page.
        </p>
        <CodeBlock
          language="typescript"
          code={`// pages/checkout/ui/checkout-page.tsx
import { CartSummary } from "@/widgets/cart-summary";   // ✓ lower layer
import { ProductCard } from "@/entities/product";       // ✓ lower layer

// features/cart/model/cart.ts
import { useSession } from "@/features/auth";           // ✗ same layer
import { CheckoutPage } from "@/pages/checkout";        // ✗ higher layer`}
        />
        <p className="text-base leading-relaxed text-body">
          <code>app</code> and <code>shared</code> have no slices, so their
          segments may import each other freely within the layer.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="slices"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Slices
        </h2>
        <p className="text-base leading-relaxed text-body">
          Inside <code>pages</code>, <code>widgets</code>, <code>features</code>
          , and <code>entities</code>, code is split into slices named after a
          business concept: <code>product</code>, <code>cart</code>,{" "}
          <code>checkout</code>. A slice groups everything that changes
          together, so deleting a slice removes the concept cleanly.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="segments"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Segments
        </h2>
        <p className="text-base leading-relaxed text-body">
          Inside a slice, segments group code by technical purpose. Use only the
          segments a slice needs.
        </p>
        <Table head={["Segment", "Contents"]} rows={SEGMENTS} />
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="public-api"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Public API
        </h2>
        <p className="text-base leading-relaxed text-body">
          Each slice exposes an <code>index.ts</code>. Other layers import only
          from that file, never from a path inside the slice. This keeps
          internals free to change and makes the slice boundary explicit.
        </p>
        <CodeBlock
          language="typescript"
          code={`// ✓ through the public API
import { ProductCard } from "@/entities/product";

// ✗ reaching into the slice
import { ProductCard } from "@/entities/product/ui/product-card";`}
        />
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="what-the-cli-generates"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          What the CLI generates
        </h2>
        <p className="text-base leading-relaxed text-body">
          Generators create a slice with its segments and public API, then wire
          routes or stores when the layer needs it. For example:
        </p>
        <CodeBlock code="npx create-fsd-architecture@latest -g entity product" />
        <CodeBlock
          language="text"
          code={`src/entities/product/
├── index.ts                 # public API
├── model/product.types.ts   # Product type
└── ui/product-card.tsx      # ProductCard component`}
        />
        <p className="text-base leading-relaxed text-body">
          Exact file names follow each framework&apos;s conventions (Vue and
          Svelte components, Next.js and Nuxt routes). Preview any command with{" "}
          <code>--dry-run</code>, and see the{" "}
          <Link
            href="/docs/slice-generator"
            className="text-brand-coral underline"
          >
            slice generator
          </Link>{" "}
          for every layer.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-hairline bg-surface-soft p-5">
        <h2 id="checking-the-rules" className="text-lg font-semibold text-ink">
          Checking the rules
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-body">
          The CLI creates the structure; it does not police imports by itself.
          Install Steiger and run{" "}
          <code>npx create-fsd-architecture@latest check --architecture</code>{" "}
          to lint layer and public-API violations in CI.
        </p>
      </section>
    </article>
  );
}
