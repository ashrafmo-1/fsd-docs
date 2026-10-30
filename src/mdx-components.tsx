import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps, ReactElement } from "react";
import { CodeBlock } from "@/components/docs/code-block";

/** Fenced code blocks render through the same CodeBlock as TSX pages. */
function Pre({ children }: ComponentProps<"pre">) {
  const code = children as ReactElement<{
    className?: string;
    children?: string;
  }>;
  const language = code?.props?.className?.replace(/^language-/, "") || "bash";
  const text = String(code?.props?.children ?? "").replace(/\n$/, "");
  return <CodeBlock code={text} language={language} />;
}

function Anchor({ href = "", ...props }: ComponentProps<"a">) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}

function Table(props: ComponentProps<"table">) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-hairline">
      <table className="w-full min-w-[560px] text-left text-sm" {...props} />
    </div>
  );
}

const components: MDXComponents = { pre: Pre, a: Anchor, table: Table };

export function useMDXComponents(): MDXComponents {
  return components;
}
