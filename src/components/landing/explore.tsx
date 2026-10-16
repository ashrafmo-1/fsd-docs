import { ArrowUpRight, Boxes, Layers3 } from "lucide-react";
import Link from "next/link";

export function Explore() {
  return (
    <section className="explore-section" aria-labelledby="explore-heading">
      <div className="explore-heading">
        <p className="section-kicker">02 / GO A LAYER DEEPER</p>
        <h2 id="explore-heading">
          The overview ends here.
          <br />
          <span>The possibilities don’t.</span>
        </h2>
        <p>Get the full picture, at your own pace.</p>
      </div>
      <div className="explore-grid">
        <Link href="/architecture" className="explore-card">
          <div className="explore-card-top">
            <Layers3 size={26} strokeWidth={1.5} />
            <span>01 / THE SYSTEM</span>
            <ArrowUpRight size={24} />
          </div>
          <h3>
            Everything in
            <br />
            its right layer.
          </h3>
          <p>
            Explore the six FSD layers, import boundaries, and the complete
            project creation workflow.
          </p>
          <span className="explore-card-link">
            Explore architecture <ArrowUpRight size={16} />
          </span>
          <div className="mini-layers" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </Link>
        <Link href="/capabilities" className="explore-card">
          <div className="explore-card-top">
            <Boxes size={26} strokeWidth={1.5} />
            <span>02 / THE TOOLKIT</span>
            <ArrowUpRight size={24} />
          </div>
          <h3>
            Five frameworks.
            <br />
            Your way to build.
          </h3>
          <p>
            Discover templates, generators, tooling, configuration, and answers
            to common questions.
          </p>
          <span className="explore-card-link">
            Discover capabilities <ArrowUpRight size={16} />
          </span>
          <div className="mini-frameworks" aria-hidden="true">
            R / N / V / N / S
          </div>
        </Link>
      </div>
    </section>
  );
}
