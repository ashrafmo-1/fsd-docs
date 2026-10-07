import type * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-sm border border-hairline bg-surface-soft px-3 py-2 text-sm leading-relaxed text-ink outline-none focus:ring-1 focus:ring-brand-coral aria-invalid:border-red-300",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
