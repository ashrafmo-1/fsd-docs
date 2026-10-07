import { Plus } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function PageHeader({
  title,
  description,
  href,
  linkLabel,
  action,
}: {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-sm border border-hairline bg-canvas px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-[-0.6px] text-ink">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-body-muted">
            {description}
          </p>
        ) : null}
      </div>
      {action != null ? (
        action
      ) : href && linkLabel ? (
        <Button asChild className="shrink-0">
          <Link href={href}>
            <Plus className="size-4" />
            {linkLabel}
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
