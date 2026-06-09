import { CodeBlock } from "@/components/docs/code-block";

export default function AuthGeneratorPage() {
  return (
    <article className="max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-body-muted">
        Special feature generator
      </p>
      <h1 className="text-4xl font-medium leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Auth feature generation
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        The `auth` feature has a dedicated flow. The CLI asks which modules you
        need, then adapts the generated files to the selected data or state
        preset.
      </p>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink">
          Commands
        </h2>
        <div className="space-y-4">
          <CodeBlock code="npx create-fsd-architecture --generate feature auth" />
          <CodeBlock code="npx create-fsd-architecture -g feature auth" />
          <CodeBlock code="npx create-fsd-architecture --generate feature auth --force" />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink">
          Auth as a feature example
        </h2>
        <p className="mb-4 text-base leading-relaxed text-body">
          Auth is generated through the normal `feature` type, then the CLI
          switches to the dedicated auth flow because the slice name is `auth`.
        </p>
        <div className="grid gap-4 lg:grid-cols-2">
          <CodeBlock
            code={`npx create-fsd-architecture --generate feature auth
npx create-fsd-architecture -g feature auth`}
          />
          <CodeBlock
            language="text"
            code={`feature + auth
→ asks for auth modules
→ asks for data/state preset
→ generates src/features/auth/`}
          />
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {["Login", "Register", "Forgot Password Flow"].map((module) => (
          <div
            key={module}
            className="rounded-[16px] border border-hairline bg-surface-soft p-5"
          >
            <h2 className="text-lg font-semibold text-ink">{module}</h2>
            <p className="mt-2 text-sm leading-relaxed text-body">
              Optional module selected during generation.
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink">
          Selection examples
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <CodeBlock
            language="text"
            code={`? Which auth modules do you need?
> Login
> Register

Creates login and register UI, typed payloads,
and exports the generated public API.`}
          />
          <CodeBlock
            language="text"
            code={`? Which auth modules do you need?
> Login
> Forgot Password Flow

Creates login, forgot password, reset password,
and verify email / verify code placeholders.`}
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink">
          Forgot password flow
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            "Forgot password",
            "Reset password",
            "Verify email / verify code placeholder",
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
          Supported presets
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {["Axios + React Query", "Zustand", "Redux Toolkit", "UI only"].map(
            (item) => (
              <div
                key={item}
                className="rounded-[12px] bg-surface-soft p-4 text-sm font-medium text-ink"
              >
                {item}
              </div>
            ),
          )}
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-medium tracking-[-0.5px] text-ink">
          Dependency assumptions
        </h2>
        <p className="text-base leading-relaxed text-body">
          The CLI does not install dependencies. Generated code assumes the
          selected libraries already exist in the target project.
        </p>
        <CodeBlock
          language="ts"
          code={`import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/shared/api";`}
        />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink">
          Generated structure examples
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <CodeBlock
            language="text"
            code={`src/features/auth/
├── api/
├── model/
├── ui/
└── index.ts`}
          />
          <CodeBlock
            language="text"
            code={`src/features/auth/
├── ui/login-form.tsx
├── ui/register-form.tsx
├── ui/forgot-password-form.tsx
├── ui/reset-password-form.tsx
├── ui/verify-code-form.tsx
└── index.ts`}
          />
        </div>
      </section>
    </article>
  );
}
