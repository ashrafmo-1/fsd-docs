import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full min-w-0 border border-hairline bg-[#F5F5F5] text-sm text-ink outline-none transition-colors placeholder:text-body-muted focus:ring-1 focus:ring-brand-coral disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-red-300",
  {
    variants: {
      inputSize: {
        default: "h-11 rounded-xl px-4",
        dashboard: "h-10 rounded-sm bg-surface-soft px-3",
      },
    },
    defaultVariants: {
      inputSize: "dashboard",
    },
  },
);

function Input({
  className,
  inputSize,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input className={cn(inputVariants({ inputSize, className }))} {...props} />
  );
}

export { Input };
