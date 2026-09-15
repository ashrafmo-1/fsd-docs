import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Capabilities", href: "/#capabilities" },
    { label: "Templates", href: "/docs/getting-started" },
    { label: "Configuration", href: "/docs/configuration" },
    { label: "Architecture", href: "/#architecture" },
    { label: "Slice generator", href: "/docs/slice-generator" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Auth generator", href: "/docs/auth-generator" },
    { label: "Feature-Sliced Design", href: siteConfig.fsdOfficial },
    { label: "GitHub", href: siteConfig.github },
    { label: "npm package", href: siteConfig.npm },
  ],
  Community: [
    {
      label: "CLI issues",
      href: `${siteConfig.repositories.cli}/issues`,
    },
    {
      label: "React + Vite issues",
      href: `${siteConfig.repositories.vite}/issues`,
    },
    {
      label: "Next.js issues",
      href: `${siteConfig.repositories.next}/issues`,
    },
    // { label: "Discussions", href: "https://github.com" },
    // { label: "Contributing", href: "https://github.com" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface-soft">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="FSD CLI home"
            >
              <Image src="/fsd-logo.png" alt="FSD CLI" width={40} height={40} />
              <span className="flex flex-col leading-none">
                <span className="text-base font-semibold tracking-tight text-ink">
                  FSD CLI
                </span>
                <span className="mt-1 text-[10px] font-medium text-body-muted">
                  create-fsd-architecture
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-body-muted">
              Scaffold React + Vite and Next.js projects with Feature-Sliced
              Design architecture. Built for teams who care about structure.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <p className="mb-4 text-sm font-semibold text-ink">{title}</p>
              <ul className="space-y-2.5">
                {links.map((link) => {
                  const external = link.href.startsWith("http");

                  return (
                    <li key={link.label}>
                      {external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-body-muted transition-colors hover:text-ink"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-body-muted transition-colors hover:text-ink"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-8 md:flex-row">
          <p className="text-sm text-body-muted-soft">
            MIT License. Built with care for the developer community.
          </p>
          <p className="text-sm text-body-muted-soft">
            Created and maintained by Ashraf Mohamed
          </p>
        </div>
      </div>
    </footer>
  );
}
