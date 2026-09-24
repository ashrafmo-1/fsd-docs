import { CodeBlock } from "@/components/docs/code-block";
import { siteConfig } from "@/lib/site";

export function ReactFrameworkGuide({ next = false }: { next?: boolean }) {
  const framework = next ? "nextjs" : "react-vite";
  const name = next ? "Next.js" : "React + Vite";
  const project = next ? "my-next-app" : "my-react-app";
  const stack = [
    ["Framework", next ? "Next.js 16 + React 19" : "React 19 + Vite"],
    ["API client", "Axios by default; native Fetch optional"],
    ["Server state", "TanStack React Query"],
    ["Client state", "Zustand by default; Redux Toolkit or none optional"],
    ["Forms", "React Hook Form + Zod"],
    ["Styling", "Tailwind CSS 4 and shared UI"],
    [
      "Quality",
      `TypeScript, ${next ? "Biome" : "ESLint"}, Steiger, Husky, Commitlint`,
    ],
  ];

  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Stable framework
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        {name}, with the complete FSD structure
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-body">
        {next
          ? "Use the Next.js App Router with thin route wrappers, reusable FSD page slices, and client-side providers for the selected stack."
          : "Create a React single-page application with Vite, React Router, and every FSD layer ready from the start."}{" "}
        The CLI downloads a dedicated template repository and saves your choices
        in <code>fsd.config.json</code> for subsequent generation.
      </p>

      <section className="mt-10 space-y-4">
        <h2 id="create-a-project" className="text-2xl font-semibold text-ink">
          Create a project
        </h2>
        <CodeBlock
          code={`npx create-fsd-architecture@latest ${project} --framework ${framework}`}
        />
        <CodeBlock
          code={`npx create-fsd-architecture@latest ${project} --framework ${framework} --yes --no-start
cd ${project}
npm run dev`}
        />
        <p>
          The first command offers interactive stack choices. The second accepts
          the defaults below, installs dependencies with npm, and leaves
          starting the development server to you. Interactive creation also
          supports pnpm, Yarn, and Bun. React Query and forms can be disabled.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 id="default-stack" className="text-2xl font-semibold text-ink">
          Default stack
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {stack.map(([label, value]) => (
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
          id="architecture-and-routing"
          className="text-2xl font-semibold text-ink"
        >
          Architecture and routing
        </h2>
        <CodeBlock
          language="text"
          code={`src/
├── app/          # Bootstrap, providers, routing, and styles
├── pages/        # FSD page compositions
├── widgets/      # Large reusable UI blocks
├── features/     # User interactions and business actions
├── entities/     # Business entities
└── shared/       # API, assets, config, utilities, types, and UI`}
        />
        {next ? (
          <>
            <p>
              This template configures <code>pageExtensions</code> in
              <code> next.config.ts</code> to recognize <code>route.tsx</code>,
              <code> route.ts</code>, <code>route.jsx</code>, and
              <code> route.js</code>. Keep that configuration: FSD files in
              <code> src/pages</code> are compositions, not Pages Router
              endpoints.
            </p>
            <CodeBlock
              language="text"
              code={`src/pages/account/ui/account-page.tsx  # FSD page
src/pages/account/index.ts               # Public API
src/app/account/page.route.tsx            # App Router wrapper for /account`}
            />
            <p>
              Generated interactive modules include the client directive where
              needed. Keep server-only code and secrets outside client modules;
              generating an auth UI does not provide a backend or route
              protection.
            </p>
          </>
        ) : (
          <p>
            Page generation creates a slice in <code>src/pages</code> and
            registers its URL in <code>src/app/routing/index.tsx</code> using
            React Router. Preserve the <code>fsd-cli</code> marker comments used
            for route updates. Generating the account page below registers{" "}
            <code>/account</code>.
          </p>
        )}
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="generate-slices-and-routes"
          className="text-2xl font-semibold text-ink"
        >
          Generate slices and routes
        </h2>
        <p>
          Run these commands inside your generated project. The saved
          configuration controls the output without repeating stack prompts.
        </p>
        <CodeBlock
          code={`npx create-fsd-architecture@latest --generate feature checkout
npx create-fsd-architecture@latest --generate entity product
npx create-fsd-architecture@latest --generate widget navbar
npx create-fsd-architecture@latest --generate page account
npx create-fsd-architecture@latest --generate feature auth`}
        />
        <p>
          React components, API modules, state, and form integrations follow the
          selected capabilities. Connect generated API and auth flows to your
          own backend before using them with real users.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 id="api-configuration" className="text-2xl font-semibold text-ink">
          API configuration
        </h2>
        <p>
          Generated clients read{" "}
          <code>{next ? "NEXT_PUBLIC_API_URL" : "VITE_API_URL"}</code>, falling
          back to <code>/api</code>. Set the public backend base URL in your
          environment and restart the dev server. Public variables are not a
          place for secrets; the fallback does not create backend endpoints.
        </p>
        <CodeBlock
          language="text"
          code={`${next ? "NEXT_PUBLIC_API_URL" : "VITE_API_URL"}=https://api.example.com`}
        />
      </section>

      <section className="mt-10 space-y-4">
        <h2 id="quality-commands" className="text-2xl font-semibold text-ink">
          Quality commands
        </h2>
        <CodeBlock
          code={`npm run fsd:check
npm run lint
npm run typecheck
npm run build
npm run ci`}
        />
        <p>
          Use the equivalent commands for your selected package manager. New
          scaffolds receive template and CLI fixes; existing projects are not
          automatically migrated by running a newer CLI.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 id="template-source" className="text-2xl font-semibold text-ink">
          Template source
        </h2>
        <a
          href={
            next ? siteConfig.repositories.next : siteConfig.repositories.vite
          }
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-coral underline"
        >
          Open the {name} template on GitHub
        </a>
      </section>
    </article>
  );
}
