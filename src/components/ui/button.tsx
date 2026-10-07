import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm border border-transparent text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-ink text-on-primary hover:bg-ink/90",
        gotht: "border-hairline bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]",
        "brand-soft":
          "bg-brand-coral/10 text-brand-coral hover:bg-brand-coral/15",
      },
      size: {
        default: "h-11 px-6",
        md: "h-8 px-3",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
