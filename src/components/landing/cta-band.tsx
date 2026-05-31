import { ArrowRight } from "lucide-react";
import { GitHubIcon } from "./github-icon";

export function CtaBand() {
  return (
    <section className="bg-surface-soft py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="rounded-[24px] bg-brand-teal px-8 py-16 text-center md:px-16 md:py-20">
          <h2 className="text-3xl font-medium tracking-[-1.5px] text-white sm:text-4xl md:text-[40px]">
            Start building with
            <br />
            scalable architecture today
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/70">
            One command. Production-ready FSD structure. All the tooling
            configured. Stop debating folder structures and start shipping
            features.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#docs"
              className="inline-flex h-11 items-center gap-2 rounded-[12px] bg-white px-6 text-sm font-semibold text-ink transition-colors hover:bg-white/90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-[12px] border border-white/20 bg-transparent px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <GitHubIcon className="h-4 w-4" />
              View on GitHub
            </a>
          </div>

          <div className="mx-auto mt-10 max-w-md rounded-[12px] border border-white/10 bg-white/5 px-5 py-3 font-mono text-sm text-white/80">
            <span className="text-brand-mint">$</span> npm create
            fsd-architecture@latest
          </div>
        </div>
      </div>
    </section>
  );
}
