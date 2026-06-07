import Image from "next/image";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Templates", href: "#docs" },
    { label: "Architecture", href: "#architecture" },
    { label: "Roadmap", href: "#docs" },
  ],
  Resources: [
    { label: "Documentation", href: "#docs" },
    { label: "FAQ", href: "#docs" },
    { label: "Feature-Sliced Design", href: "https://feature-sliced.design/" },
    { label: "GitHub", href: "https://github.com/FSD-architectures" },
  ],
  Community: [
    { label: "GitHub Issues(cli)", href: "https://github.com/FSD-architectures/cli/issues" },
    { label: "GitHub Issues(FSD React + Vite)", href: "https://github.com/FSD-architectures/FSD/issues" },
    { label: "GitHub Issues(NextJs)", href: "https://github.com/FSD-architectures/FSD-NEXTJS/issues" },
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
            <a href="/" className="flex items-center gap-2.5">
              <Image src={"/fsd logo.png"} alt="" width={40} height={40} />
              <span className="text-base font-semibold tracking-tight text-ink">
                create-fsd-architecture
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-body-muted">
              Scaffold production-ready React projects with Feature-Sliced
              Design architecture. Built for teams who care about structure.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <p className="mb-4 text-sm font-semibold text-ink">{title}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-body-muted transition-colors hover:text-ink"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-8 md:flex-row">
          <p className="text-sm text-body-muted-soft">
            MIT License. Built with care for the developer community.
          </p>
          <p className="text-sm text-body-muted-soft">
            Powered by Ashraf.Qopiah
          </p>
        </div>
      </div>
    </footer>
  );
}
