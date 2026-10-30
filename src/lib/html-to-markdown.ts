/** The part of the DOM Node API the converter reads; easy to fake in tests. */
export type MarkdownNode = {
  nodeType: number;
  nodeName: string;
  textContent: string | null;
  childNodes: ArrayLike<MarkdownNode>;
  getAttribute?: (name: string) => string | null;
};

const TEXT = 3;
const ELEMENT = 1;
const SKIP = new Set(["SCRIPT", "STYLE", "BUTTON", "SVG", "NAV", "IFRAME"]);

function children(node: MarkdownNode, context: Context) {
  return Array.from(node.childNodes, (child) => convert(child, context)).join(
    "",
  );
}

type Context = { listDepth: number; ordered: boolean[] };

function convert(node: MarkdownNode, context: Context): string {
  if (node.nodeType === TEXT)
    return (node.textContent ?? "").replace(/\s+/g, " ");
  if (node.nodeType !== ELEMENT) return "";
  const tag = node.nodeName.toUpperCase();
  if (SKIP.has(tag)) return "";
  if (node.getAttribute?.("aria-hidden") === "true") return "";
  if (node.getAttribute?.("data-markdown") === "skip") return "";
  if (/\bsr-only\b/.test(node.getAttribute?.("class") ?? "")) return "";

  const inner = () => children(node, context).trim();
  switch (tag) {
    case "H1":
    case "H2":
    case "H3":
    case "H4":
      return `\n\n${"#".repeat(Number(tag[1]))} ${inner()}\n\n`;
    case "P":
      return `\n\n${inner()}\n\n`;
    case "BR":
      return "  \n";
    case "STRONG":
    case "B":
      return `**${inner()}**`;
    case "EM":
    case "I":
      return `_${inner()}_`;
    case "CODE":
      return `\`${(node.textContent ?? "").trim()}\``;
    case "PRE": {
      const language = node.getAttribute?.("data-language") ?? "";
      return `\n\n\`\`\`${language}\n${(node.textContent ?? "").replace(/\n$/, "")}\n\`\`\`\n\n`;
    }
    case "A": {
      const href = node.getAttribute?.("href") ?? "";
      const text = inner();
      return href && !href.startsWith("#") ? `[${text}](${href})` : text;
    }
    case "UL":
    case "OL": {
      const nested: Context = {
        listDepth: context.listDepth + 1,
        ordered: [...context.ordered, tag === "OL"],
      };
      let index = 0;
      const items = Array.from(node.childNodes)
        .filter((child) => child.nodeName.toUpperCase() === "LI")
        .map((child) => {
          index += 1;
          const marker = tag === "OL" ? `${index}.` : "-";
          const indent = "  ".repeat(context.listDepth);
          return `${indent}${marker} ${children(child, nested).trim()}`;
        });
      return `\n\n${items.join("\n")}\n\n`;
    }
    case "TABLE": {
      const rows = collect(node, "TR").map((row) =>
        collect(row, "TH", "TD").map((cell) =>
          children(cell, context).trim().replace(/\|/g, "\\|"),
        ),
      );
      if (!rows.length) return "";
      const [head, ...body] = rows;
      const line = (cells: string[]) => `| ${cells.join(" | ")} |`;
      return `\n\n${[line(head), line(head.map(() => "---")), ...body.map(line)].join("\n")}\n\n`;
    }
    default:
      return children(node, context);
  }
}

function collect(node: MarkdownNode, ...tags: string[]): MarkdownNode[] {
  return Array.from(node.childNodes).flatMap((child) =>
    tags.includes(child.nodeName.toUpperCase())
      ? [child]
      : child.nodeType === ELEMENT
        ? collect(child, ...tags)
        : [],
  );
}

/** Convert rendered docs content to Markdown for pasting into an editor or an LLM. */
export function htmlToMarkdown(root: MarkdownNode) {
  return children(root, { listDepth: 0, ordered: [] })
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
