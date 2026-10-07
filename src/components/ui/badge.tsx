import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex h-6 w-fit items-center justify-center gap-1 whitespace-nowrap px-2.5 text-xs font-medium",
  {
    variants: {
      variant: {
        primary: "",
        success: "",
        warning: "",
        info: "",
        neutral: "",
      },
      tone: {
        solid: "text-on-primary",
        subtle: "",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-sm",
      },
    },
    compoundVariants: [
      { variant: "primary", tone: "solid", class: "bg-ink" },
      { variant: "primary", tone: "subtle", class: "bg-ink/10 text-ink" },
      { variant: "success", tone: "solid", class: "bg-brand-teal" },
      {
        variant: "success",
        tone: "subtle",
        class: "bg-brand-mint/15 text-brand-teal",
      },
      { variant: "warning", tone: "solid", class: "bg-brand-ochre text-ink" },
      {
        variant: "warning",
        tone: "subtle",
        class: "bg-brand-ochre/15 text-[#92600a]",
      },
      { variant: "info", tone: "solid", class: "bg-brand-coral" },
      {
        variant: "info",
        tone: "subtle",
        class: "bg-brand-coral/10 text-brand-coral",
      },
      { variant: "neutral", tone: "solid", class: "bg-body-muted" },
      {
        variant: "neutral",
        tone: "subtle",
        class: "bg-surface-card text-body",
      },
    ],
    defaultVariants: {
      variant: "neutral",
      tone: "subtle",
      shape: "pill",
    },
  },
);

function Badge({
  className,
  variant,
  tone,
  shape,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      className={cn(badgeVariants({ variant, tone, shape }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
