import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { GitHubIcon } from "./github-icon";

export function CtaBand() {
  return (
    <section className="landing-cta" aria-labelledby="cta-heading">
      <div className="landing-cta-inner">
        <div>
          <p className="section-kicker">YOUR NEXT CHAPTER</p>
          <h2 id="cta-heading">
            Build something big.
            <br />
            <span>Start with structure.</span>
          </h2>
        </div>
        <div className="landing-cta-actions">
          <p>Your framework. Your stack. A foundation you can build on.</p>
          <div>
            <Link href="/docs/getting-started" className="hero-primary">
              Get started <ArrowRight size={17} />
            </Link>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-secondary"
            >
              <GitHubIcon className="h-4 w-4" />
              View on GitHub
            </a>
          </div>
          <code>
            <span>$</span> npm create fsd-architecture@latest
          </code>
        </div>
      </div>
    </section>
  );
}
