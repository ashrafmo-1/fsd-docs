import assert from "node:assert/strict";
import { test } from "node:test";
import { htmlToMarkdown, type MarkdownNode } from "./html-to-markdown.ts";

function el(
  name: string,
  attributes: Record<string, string>,
  ...childNodes: (MarkdownNode | string)[]
): MarkdownNode {
  const nodes = childNodes.map((child) =>
    typeof child === "string" ? text(child) : child,
  );
  return {
    nodeType: 1,
    nodeName: name,
    textContent: nodes.map((child) => child.textContent).join(""),
    childNodes: nodes,
    getAttribute: (key) => attributes[key] ?? null,
  };
}
const text = (value: string): MarkdownNode => ({
  nodeType: 3,
  nodeName: "#text",
  textContent: value,
  childNodes: [],
});

test("converts headings, paragraphs, inline code, and links", () => {
  const markdown = htmlToMarkdown(
    el(
      "div",
      {},
      el("h1", {}, "Upgrade"),
      el(
        "p",
        {},
        "Run ",
        el("code", {}, "upgrade"),
        " or read ",
        el("a", { href: "/docs" }, "the docs"),
        ".",
      ),
    ),
  );
  assert.equal(
    markdown,
    "# Upgrade\n\nRun `upgrade` or read [the docs](/docs).",
  );
});

test("keeps code blocks verbatim and drops buttons and hidden text", () => {
  const markdown = htmlToMarkdown(
    el(
      "div",
      {},
      el(
        "pre",
        { "data-language": "bash" },
        el("code", {}, "npx fsd\n  --help\n"),
      ),
      el("button", {}, "Copy code"),
      el("span", { class: "sr-only" }, "Code copied"),
      el("span", { "aria-hidden": "true" }, "#"),
    ),
  );
  assert.equal(markdown, "```bash\nnpx fsd\n  --help\n```");
});

test("converts lists and tables", () => {
  const markdown = htmlToMarkdown(
    el(
      "div",
      {},
      el("ol", {}, el("li", {}, "First"), el("li", {}, "Second")),
      el(
        "table",
        {},
        el(
          "thead",
          {},
          el("tr", {}, el("th", {}, "Code"), el("th", {}, "Meaning")),
        ),
        el("tbody", {}, el("tr", {}, el("td", {}, "0"), el("td", {}, "a | b"))),
      ),
    ),
  );
  assert.equal(
    markdown,
    "1. First\n2. Second\n\n| Code | Meaning |\n| --- | --- |\n| 0 | a \\| b |",
  );
});
