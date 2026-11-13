import assert from "node:assert/strict";
import { test } from "node:test";
import type { LocaleCode } from "./i18n.ts";
import { getLlmsIndex, getLlmsIndexForLocale } from "./llms.ts";

/** The exact targets of every Markdown link (`[label](url)`) in an index. */
function linkTargets(markdown: string): Set<string> {
  return new Set(
    [...markdown.matchAll(/\]\(([^)\s]+)\)/g)].map(([, url]) => url),
  );
}

const LOCALE_CASES: {
  code: Exclude<LocaleCode, "en">;
  quickStartPath: string;
  quickStartTitle: string;
  englishOnlyNote: string;
}[] = [
  {
    code: "ar",
    quickStartPath: "/ar",
    quickStartTitle: "البدء السريع بالعربية",
    englishOnlyNote: "باقي التوثيق متوفر باللغة الإنجليزية فقط.",
  },
  {
    code: "ru",
    quickStartPath: "/ru",
    quickStartTitle: "Быстрый старт на русском",
    englishOnlyNote:
      "Остальная документация пока доступна только на английском.",
  },
  {
    code: "zh-CN",
    quickStartPath: "/zh-CN",
    quickStartTitle: "简体中文快速入门",
    englishOnlyNote: "其余文档目前仅提供英文版。",
  },
  {
    code: "es",
    quickStartPath: "/es",
    quickStartTitle: "Inicio rápido en español",
    englishOnlyNote:
      "El resto de la documentación está disponible solo en inglés.",
  },
  {
    code: "pt-BR",
    quickStartPath: "/pt-BR",
    quickStartTitle: "Início rápido em português",
    englishOnlyNote:
      "O restante da documentação está disponível apenas em inglês.",
  },
  {
    code: "ja",
    quickStartPath: "/ja",
    quickStartTitle: "日本語クイックスタート",
    englishOnlyNote: "その他のドキュメントは英語のみで提供されています。",
  },
];

test("English llms.txt links every translated llms.txt", () => {
  const links = linkTargets(getLlmsIndex());
  for (const { code } of LOCALE_CASES) {
    assert.ok(
      links.has(`https://fsdcli.me/${code}/llms.txt`),
      `English index must link /${code}/llms.txt`,
    );
  }
});

for (const {
  code,
  quickStartPath,
  quickStartTitle,
  englishOnlyNote,
} of LOCALE_CASES) {
  test(`/${code}/llms.txt links its quick start and the English docs`, () => {
    const index = getLlmsIndexForLocale(code);
    const links = linkTargets(index);
    assert.ok(links.has(`https://fsdcli.me${quickStartPath}`));
    assert.ok(index.includes(quickStartTitle));
    assert.ok(links.has("https://fsdcli.me/docs/getting-started"));
    assert.ok(links.has("https://fsdcli.me/llms-full.txt"));
    assert.ok(links.has("https://fsdcli.me/llms.txt"));
    assert.ok(index.includes(englishOnlyNote));
  });
}

test("English has no per-locale index; unknown locales throw", () => {
  assert.throws(() => getLlmsIndexForLocale("en"), /getLlmsIndex/);
  assert.throws(
    () => getLlmsIndexForLocale("xx" as LocaleCode),
    /Unknown locale/,
  );
});
