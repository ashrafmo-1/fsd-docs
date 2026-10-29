import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Testing",
  description:
    "The checks generated FSD projects run out of the box, and how to add unit, component, and end-to-end tests that follow FSD slice boundaries.",
  alternates: { canonical: "/docs/testing" },
};

const RUNNERS: [framework: string, packages: string][] = [
  [
    "React + Vite",
    "vitest jsdom @testing-library/react @testing-library/jest-dom",
  ],
  ["Vue + Vite", "vitest jsdom @vue/test-utils"],
  ["SvelteKit", "vitest jsdom @testing-library/svelte"],
  ["Next.js", "vitest jsdom @vitejs/plugin-react @testing-library/react"],
  ["Nuxt", "vitest @nuxt/test-utils @vue/test-utils happy-dom"],
];

export default function TestingPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Quality
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Testing
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        Generated projects come with static checks but no test runner, so you
        choose the tools that fit your team. This page covers what runs today,
        how to add tests, and where tests belong in an FSD project.
      </p>

      <section className="mt-10 space-y-4">
        <h2
          id="built-in-checks"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          What runs out of the box
        </h2>
        <p className="text-base leading-relaxed text-body">
          <code>npm run ci</code> runs the FSD architecture check (Steiger),
          lint, type checks where the template defines them, and a production
          build. It catches broken imports, layer violations, and type errors
          before any test is written.
        </p>
        <CodeBlock
          code={`npm run ci          # fsd:check, lint, typecheck, build
npm run fsd:check   # architecture rules only`}
        />
        <p className="text-base leading-relaxed text-body">
          Before generating, preview the exact files and route edits with{" "}
          <code>--dry-run</code>. Generators also roll back automatically when a
          step fails, so a half-written slice never reaches your tests.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="add-vitest"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Add unit and component tests with Vitest
        </h2>
        <p className="text-base leading-relaxed text-body">
          Vitest reuses the project&apos;s Vite config, including the{" "}
          <code>@/</code> alias, so FSD imports work in tests unchanged. Install
          the packages for your framework:
        </p>
        <div className="overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-surface-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Framework</th>
                <th className="px-4 py-3 font-semibold">npm install -D</th>
              </tr>
            </thead>
            <tbody>
              {RUNNERS.map(([framework, packages]) => (
                <tr key={framework} className="border-t border-hairline">
                  <td className="px-4 py-3 font-semibold text-ink">
                    {framework}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-body">
                    {packages}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-base leading-relaxed text-body">
          For the Vite-based templates, extend the existing config:
        </p>
        <CodeBlock
          language="typescript"
          code={`// vitest.config.ts
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({ test: { environment: "jsdom" } }),
);`}
        />
        <p className="text-base leading-relaxed text-body">
          Next.js has no Vite config, so declare the React plugin and the{" "}
          <code>@</code> alias in <code>vitest.config.ts</code>. Nuxt uses{" "}
          <code>defineVitestConfig</code> from{" "}
          <code>@nuxt/test-utils/config</code>. Then add the script and include
          it in the gate:
        </p>
        <CodeBlock
          language="json"
          code={`"scripts": {
  "test": "vitest run",
  "ci": "npm run fsd:check && npm run lint && npm run test && npm run build"
}`}
        />
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="where-tests-live"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Where tests live
        </h2>
        <p className="text-base leading-relaxed text-body">
          Keep a test next to the code it covers, inside the same slice and
          segment. Deleting a slice then deletes its tests too, and the import
          rule applies to tests like any other file.
        </p>
        <CodeBlock
          language="text"
          code={`src/entities/product/
├── index.ts
├── model/product.types.ts
├── model/price.ts
├── model/price.test.ts          # unit test for slice logic
├── ui/product-card.tsx
└── ui/product-card.test.tsx     # component test`}
        />
        <p className="text-base leading-relaxed text-body">
          Tests from other layers import through the public API, the same way
          production code does:
        </p>
        <CodeBlock
          language="tsx"
          code={`// src/entities/product/ui/product-card.test.tsx
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { ProductCard } from "@/entities/product";

test("shows the product name", () => {
  render(<ProductCard product={{ id: "1", name: "Desk lamp" }} />);
  expect(screen.getByRole("heading", { name: "Desk lamp" })).toBeDefined();
});`}
        />
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="end-to-end"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          End-to-end tests
        </h2>
        <p className="text-base leading-relaxed text-body">
          Page-level flows cross every layer, so test them in a real browser.
          Playwright works with every template:
        </p>
        <CodeBlock
          code={`npm init playwright@latest
npx playwright test`}
        />
        <p className="text-base leading-relaxed text-body">
          Keep end-to-end specs outside <code>src</code>, for example in{" "}
          <code>e2e/</code>, so Steiger and the FSD layers stay about
          application code.
        </p>
      </section>
    </article>
  );
}
