"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

const FSD_LAYERS = [
  {
    name: "app",
    description: "Initialization, providers, global styles, routing setup",
    color: "bg-brand-coral",
    textColor: "text-white",
    borderColor: "border-brand-coral/30",
    icon: "⚡",
    width: "100%",
  },
  {
    name: "pages",
    description:
      "Route-level compositions, supported in both starters through framework routing adapters",
    color: "bg-brand-pink",
    textColor: "text-white",
    borderColor: "border-brand-pink/30",
    icon: "📄",
    width: "92%",
  },
  {
    name: "widgets",
    description: "Large self-contained UI blocks like headers, sidebars",
    color: "bg-brand-ochre",
    textColor: "text-ink",
    borderColor: "border-brand-ochre/30",
    icon: "🧩",
    width: "84%",
  },
  {
    name: "features",
    description: "User interactions — forms, toggles, actions",
    color: "bg-brand-lavender",
    textColor: "text-ink",
    borderColor: "border-brand-lavender/30",
    icon: "🎯",
    width: "76%",
  },
  {
    name: "entities",
    description: "Business entities — User, Product, Order",
    color: "bg-brand-peach",
    textColor: "text-ink",
    borderColor: "border-brand-peach/30",
    icon: "📦",
    width: "68%",
  },
  {
    name: "shared",
    description: "Reusable utilities, UI kit, configs, constants",
    color: "bg-brand-mint",
    textColor: "text-ink",
    borderColor: "border-brand-mint/30",
    icon: "🔧",
    width: "60%",
  },
];

function LayerCard({
  layer,
  index,
  isVisible,
}: {
  layer: (typeof FSD_LAYERS)[number];
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className={cn(
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
        width: layer.width,
      }}
    >
      <div
        className={cn(
          "flex items-center gap-4 rounded-[16px] px-5 py-4",
          layer.color,
        )}
      >
        <span className="text-xl">{layer.icon}</span>
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-base font-semibold tracking-tight",
              layer.textColor,
            )}
          >
            {layer.name}
          </p>
          <p className={cn("text-sm opacity-80", layer.textColor)}>
            {layer.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function FolderTree({ isVisible }: { isVisible: boolean }) {
  const folders = [
    { name: "src/", indent: 0, delay: 0 },
    { name: "app/", indent: 1, delay: 50, color: "text-brand-coral" },
    { name: "providers/", indent: 2, delay: 100 },
    { name: "styles/", indent: 2, delay: 150 },
    { name: "pages/", indent: 1, delay: 200, color: "text-brand-pink" },
    { name: "home/", indent: 2, delay: 250 },
    { name: "about/", indent: 2, delay: 300 },
    { name: "widgets/", indent: 1, delay: 350, color: "text-brand-ochre" },
    { name: "header/", indent: 2, delay: 400 },
    { name: "sidebar/", indent: 2, delay: 450 },
    { name: "features/", indent: 1, delay: 500, color: "text-brand-lavender" },
    { name: "auth/", indent: 2, delay: 550 },
    { name: "create-post/", indent: 2, delay: 600 },
    { name: "entities/", indent: 1, delay: 650, color: "text-brand-peach" },
    { name: "user/", indent: 2, delay: 700 },
    { name: "product/", indent: 2, delay: 750 },
    { name: "shared/", indent: 1, delay: 800, color: "text-brand-mint" },
    { name: "ui/", indent: 2, delay: 850 },
    { name: "lib/", indent: 2, delay: 900 },
    { name: "config/", indent: 2, delay: 950 },
  ];

  return (
    <div className="rounded-[16px] border border-hairline bg-surface-dark p-6 font-mono text-sm">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-brand-coral/80" />
        <div className="h-3 w-3 rounded-full bg-brand-ochre/80" />
        <div className="h-3 w-3 rounded-full bg-brand-mint/80" />
        <span className="ml-2 text-xs text-white/40">project structure</span>
      </div>
      <div className="space-y-0.5">
        {folders.map((f) => (
          <div
            key={`${f.indent}-${f.name}`}
            className={cn(
              "transition-all duration-400",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4",
              f.color ?? "text-white/50",
            )}
            style={{
              paddingLeft: `${f.indent * 20}px`,
              transitionDelay: `${f.delay}ms`,
            }}
          >
            <span className="text-white/30">{f.indent > 0 ? "├── " : ""}</span>
            <span
              className={cn(f.indent === 1 && f.color ? "font-medium" : "")}
            >
              {f.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArchitectureVisualization() {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.15,
  });

  return (
    <section
      id="architecture"
      className="relative bg-surface-soft py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-body-muted">
            Architecture
          </p>
          <h2 className="text-3xl font-medium tracking-[-1.5px] text-ink sm:text-4xl md:text-[40px]">
            Built on Feature-Sliced Design
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-body">
            A layered architecture where each layer has a clear responsibility.
            Upper layers can only import from layers below — keeping your
            codebase predictable as it scales.
          </p>
        </div>

        <div ref={ref} className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-3">
            {FSD_LAYERS.map((layer, i) => (
              <LayerCard
                key={layer.name}
                layer={layer}
                index={i}
                isVisible={isVisible}
              />
            ))}
            <div
              className={cn(
                "mt-4 flex items-center gap-2 text-sm text-body-muted transition-all duration-500",
                isVisible ? "opacity-100" : "opacity-0",
              )}
              style={{ transitionDelay: "700ms" }}
            >
              <span className="text-brand-coral">▲</span>
              <span>
                Upper layers import from lower layers — never the reverse
              </span>
            </div>
          </div>

          <div>
            <FolderTree isVisible={isVisible} />
          </div>
        </div>
      </div>
    </section>
  );
}
