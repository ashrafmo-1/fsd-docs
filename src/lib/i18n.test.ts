import assert from "node:assert/strict";
import { test } from "node:test";
import {
  availableLocales,
  englishPathOf,
  languageAlternates,
  localeOfPath,
  pathForLocale,
  plannedLocales,
} from "./i18n.ts";

test("localeOfPath matches on a full path segment", () => {
  assert.equal(localeOfPath("/"), "en");
  assert.equal(localeOfPath("/docs/getting-started"), "en");
  assert.equal(localeOfPath("/architecture"), "en");
  assert.equal(localeOfPath("/ar"), "ar");
  assert.equal(localeOfPath("/ar/anything"), "ar");
});

test("available locales are English and Arabic; the rest are planned", () => {
  assert.deepEqual(
    availableLocales().map((locale) => locale.code),
    ["en", "ar"],
  );
  assert.deepEqual(
    plannedLocales().map((locale) => locale.code),
    ["ru", "zh-CN", "es", "pt-BR", "ja"],
  );
});

test("pathForLocale follows the translated page, else the locale home", () => {
  assert.equal(pathForLocale("/docs/getting-started", "ar"), "/ar");
  assert.equal(pathForLocale("/ar", "en"), "/docs/getting-started");
  assert.equal(pathForLocale("/docs", "ar"), "/ar");
  assert.equal(pathForLocale("/ar", "ar"), "/ar");
  assert.equal(
    pathForLocale("/docs/getting-started", "en"),
    "/docs/getting-started",
  );
});

test("englishPathOf resolves translated paths back to English", () => {
  assert.equal(englishPathOf("/ar"), "/docs/getting-started");
  assert.equal(englishPathOf("/docs/getting-started"), "/docs/getting-started");
  assert.equal(englishPathOf("/docs"), "/docs");
});

test("languageAlternates includes x-default, English, and translations", () => {
  assert.deepEqual(languageAlternates("/docs/getting-started"), {
    "x-default": "/docs/getting-started",
    en: "/docs/getting-started",
    ar: "/ar",
  });
  assert.deepEqual(languageAlternates("/docs"), {
    "x-default": "/docs",
    en: "/docs",
  });
});
