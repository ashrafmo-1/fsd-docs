import { CodeBlock } from "@/components/docs/code-block";

export default function GettingStartedPage() {
  return (
    <article className="max-w-3xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-body-muted">
        Project scaffolding
      </p>
      <h1 className="text-4xl font-medium leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Create a new FSD project
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-body">
        The original workflow remains the default. When no generator flag is
        provided, the CLI starts the interactive project creation wizard.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-medium tracking-[-0.5px] text-ink">
          Commands
        </h2>
        <CodeBlock code="npm create fsd-architecture@latest" />
        <CodeBlock code="npx create-fsd-architecture@latest" />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.5px] text-ink">
          Default behavior
        </h2>
        <ol className="space-y-3 text-base leading-relaxed text-body">
          {[
            "Ask for the project name.",
            "Ask which starter template to use.",
            "Generate the FSD project structure.",
            "Create the framework, tooling, and TypeScript configuration.",
            "Print the next commands to install dependencies and run the app.",
          ].map((item, index) => (
            <li key={item} className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-surface-card text-xs font-semibold text-ink">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
