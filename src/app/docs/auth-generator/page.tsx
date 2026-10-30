import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { PublishedDocumentationVideo } from "@/components/docs/published-documentation-video";
import { LATEST_CLI_RELEASE } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Auth Generator",
  description:
    "Generate auth UI, validation, and integration scaffolding from fsd.config.json; opt in to the Supabase adapter.",
  alternates: { canonical: "/docs/auth-generator" },
};

const AUTH_FLOW = [
  "Login",
  "Registration",
  "Forgot password",
  "Reset password",
  "Verification code",
];

export default function AuthGeneratorPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Special feature generator
      </p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Generate an auth feature scaffold
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        Naming a feature <code>auth</code> activates the dedicated generator. It
        creates auth UI and integration scaffolding and adapts the output to the
        stack saved in <code>fsd.config.json</code>.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-body">
        In CLI {LATEST_CLI_RELEASE.version}, generated API endpoints are
        examples. Connect an application backend and verify session handling and
        authorization before deployment. The opt-in Supabase adapter (
        <code>--auth-provider supabase</code>) ships since CLI 2.7.0; its
        staging end-to-end acceptance is still pending. See the{" "}
        <a
          href="/docs/release-readiness#supabase-auth"
          className="text-brand-coral underline"
        >
          Supabase integration guide
        </a>
        .
      </p>

      <PublishedDocumentationVideo pageKey="/docs/auth-generator" />

      <section
        aria-labelledby="feature-status"
        className="mt-8 rounded-2xl border border-hairline p-5"
      >
        <h2 id="feature-status" className="text-lg font-semibold text-ink">
          Feature status
        </h2>
        <dl className="mt-4 grid gap-4 text-sm leading-relaxed sm:grid-cols-2">
          <div>
            <dt className="flex items-center gap-2 font-semibold text-ink">
              Auth generator
              <span className="rounded-full bg-brand-mint/15 px-2 py-0.5 text-xs font-medium text-brand-teal">
                Stable
              </span>
            </dt>
            <dd className="mt-1 text-body">
              Forms, validation, state, and example API requests for all five
              frameworks. The endpoints are placeholders: connect your own
              backend and review session handling before production.
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 font-semibold text-ink">
              Supabase adapter
              <span className="rounded-full bg-brand-ochre/15 px-2 py-0.5 text-xs font-medium text-[#92600a]">
                Preview
              </span>
            </dt>
            <dd className="mt-1 text-body">
              Released in CLI 2.7.0 behind <code>--auth-provider supabase</code>
              . Generated output builds in all five frameworks; end-to-end
              checks against a live Supabase project (sign-up confirmation,
              recovery mail, password reset, refresh and logout, RLS) are still
              pending. Browser only: SSR cookies and server authorization need
              your own integration.
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="commands"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Commands
        </h2>
        <CodeBlock code="npx create-fsd-architecture --generate feature auth" />
        <CodeBlock code="npx create-fsd-architecture -g feature auth" />
        <CodeBlock code="npx create-fsd-architecture --generate feature auth --force" />
      </section>

      <section className="mt-10">
        <h2
          id="generated-flow"
          className="mb-4 text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Generated flow
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AUTH_FLOW.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-hairline bg-surface-soft p-4 text-sm font-semibold text-ink"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2
          id="stack-aware-output"
          className="mb-4 text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Stack-aware output
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            [
              "Axios or Fetch",
              "Creates API functions using the configured client.",
            ],
            [
              "TanStack Query",
              "Adds React Query hooks, Vue Query composables, or Svelte Query accessors for the selected framework.",
            ],
            [
              "Framework-native stores",
              "Creates Zustand, Redux Toolkit, Pinia, or Svelte store auth state and reusable helpers.",
            ],
            [
              "Redux Toolkit",
              "Creates a reducer, actions, selectors, and registers the reducer.",
            ],
            [
              "Typed form validation",
              "Uses React Hook Form, VeeValidate, or Superforms with Zod for every auth step.",
            ],
            [
              "Minimal stack",
              "Keeps the generated feature UI-focused when optional tools are disabled.",
            ],
          ].map(([title, description]) => (
            <div
              key={title}
              className="rounded-2xl border border-hairline bg-canvas p-5"
            >
              <h3 className="font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-hairline bg-surface-soft p-5">
        <h2 id="sveltekit-output" className="text-lg font-semibold text-ink">
          SvelteKit output
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-body">
          In <code>sveltekit</code> projects, the command generates native
          Svelte 5 components for all five auth steps, TanStack Svelte Query v6
          accessors, a Svelte auth store, and Superforms + Zod 4 validation.
          Forms use SvelteKit progressive enhancement while keeping their
          server-ready validation contract.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-hairline bg-surface-soft p-5">
        <h2 id="vue-output" className="text-lg font-semibold text-ink">
          Vue output
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-body">
          In <code>vue-vite</code> and <code>nuxt</code> projects, the same
          command generates Vue single-file components for login, registration,
          password recovery, reset, and verification, plus Vue Query
          composables, a Pinia store, and VeeValidate + Zod forms when enabled.
          Nuxt uses its configured modules and SSR-aware Vue Query plugin.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="generated-structure"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Generated structure
        </h2>
        <CodeBlock
          language="text"
          code={`src/features/auth/
├── api/
├── lib/
├── model/
├── ui/
└── index.ts`}
        />
        <p className="text-sm leading-relaxed text-body-muted">
          Exact files vary with the configured API, state, and forms choices.
          Existing auth files are protected unless you pass <code>--force</code>
          .
        </p>
        <p className="text-sm leading-relaxed text-body-muted">
          Nuxt writes the same feature under <code>app/features/auth</code>
          because its framework adapter owns the <code>app/</code> source root.
          SvelteKit writes it under <code>src/features/auth</code>.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="generated-files"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          Generated files
        </h2>
        <p className="text-base leading-relaxed text-body">
          Output from <code>--dry-run</code> with the React defaults (React
          Query, Zustand, React Hook Form + Zod):
        </p>
        <CodeBlock
          language="text"
          code={`src/features/auth/
├── api/
│   ├── login.api.ts  register.api.ts  forgot-password.api.ts
│   ├── reset-password.api.ts  verify-code.api.ts
│   └── auth.query.ts                 # React Query hooks
├── lib/
│   ├── auth.keys.ts                  # query keys
│   └── auth.helpers.ts
├── model/
│   ├── auth.types.ts  auth.store.ts  # Zustand store
│   ├── <flow>.types.ts               # one per flow
│   └── <flow>.schema.ts              # Zod schema per flow
├── ui/
│   ├── login-form.tsx  register-form.tsx  forgot-password-form.tsx
│   └── reset-password-form.tsx  verify-code-form.tsx
└── index.ts`}
        />
        <p className="text-base leading-relaxed text-body">
          The five flows are login, register, forgot password, reset password,
          and verify code. Vue and SvelteKit produce the same API, store, query,
          and schema modules with <code>LoginForm.vue</code> or{" "}
          <code>LoginForm.svelte</code> components, and share one{" "}
          <code>auth.types.ts</code> instead of a types file per flow.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="what-the-stack-changes"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          What your stack changes
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-body">
          <li>
            In React projects, <code>serverState: "none"</code> skips the API
            modules, <code>auth.query.ts</code>, and the query keys; wire the
            forms to your own requests.
          </li>
          <li>
            <code>clientState: "none"</code> skips <code>auth.store.ts</code>.
            Redux projects get <code>auth.slice.ts</code> and{" "}
            <code>auth.selectors.ts</code> instead of a Zustand store.
          </li>
          <li>
            <code>forms: "none"</code> drops the Zod schemas; the components
            keep plain form handling.
          </li>
          <li>
            <code>--auth-provider supabase</code> adds{" "}
            <code>api/supabase.adapter.js</code>, its type declarations,{" "}
            <code>api/supabase.ts</code> (exporting{" "}
            <code>configureSupabaseAuth</code>), and <code>SUPABASE.md</code>.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2
          id="after-generating"
          className="text-2xl font-semibold tracking-[-0.5px] text-ink"
        >
          After generating
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-base leading-relaxed text-body">
          <li>
            Point the API modules at your backend, or configure the Supabase
            client once at app start.
          </li>
          <li>
            Render the forms from a page, for example <code>-g page login</code>
            , importing them from <code>@/features/auth</code>.
          </li>
          <li>
            Verify session handling, token storage, and authorization on the
            server before shipping. The generated code is a starting point, not
            a security review.
          </li>
        </ol>
      </section>
    </article>
  );
}
