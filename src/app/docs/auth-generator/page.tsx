import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Auth Generator",
  description:
    "Generate a complete auth feature from the stack stored in fsd.config.json.",
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
        Generate a complete auth flow
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        Naming a feature <code>auth</code> activates the dedicated generator. It
        creates the full authentication flow and adapts the implementation to
        the stack saved in <code>fsd.config.json</code>.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.5px] text-ink">
          Commands
        </h2>
        <CodeBlock code="npx create-fsd-architecture --generate feature auth" />
        <CodeBlock code="npx create-fsd-architecture -g feature auth" />
        <CodeBlock code="npx create-fsd-architecture --generate feature auth --force" />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-[-0.5px] text-ink">
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
        <h2 className="mb-4 text-2xl font-semibold tracking-[-0.5px] text-ink">
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
              "Adds React Query hooks or Vue Query composables for the selected framework.",
            ],
            [
              "Zustand or Pinia",
              "Creates framework-native auth state and reusable helpers.",
            ],
            [
              "Redux Toolkit",
              "Creates a reducer, actions, selectors, and registers the reducer.",
            ],
            [
              "Typed form validation",
              "Uses React Hook Form or VeeValidate with Zod for every auth step.",
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
        <h2 className="text-lg font-semibold text-ink">Vue output</h2>
        <p className="mt-2 text-sm leading-relaxed text-body">
          In a <code>vue-vite</code> project, the same command generates Vue
          single-file components for login, registration, password recovery,
          reset, and verification, plus Vue Query composables, a Pinia store,
          and VeeValidate + Zod forms when enabled.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.5px] text-ink">
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
      </section>
    </article>
  );
}
