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
  assert.equal(localeOfPath("/ru"), "ru");
  assert.equal(localeOfPath("/ru/anything"), "ru");
  assert.equal(localeOfPath("/zh-CN"), "zh-CN");
  assert.equal(localeOfPath("/zh-CN/anything"), "zh-CN");
});

test("available locales are English, Arabic, Russian, and Chinese; the rest are planned", () => {
  assert.deepEqual(
    availableLocales().map((locale) => locale.code),
    ["en", "ar", "ru", "zh-CN"],
  );
  assert.deepEqual(
    plannedLocales().map((locale) => locale.code),
    ["es", "pt-BR", "ja"],
  );
});

test("pathForLocale follows the translated page, else the locale home", () => {
  assert.equal(pathForLocale("/docs/getting-started", "ar"), "/ar");
  assert.equal(pathForLocale("/docs/getting-started", "ru"), "/ru");
  assert.equal(pathForLocale("/docs/getting-started", "zh-CN"), "/zh-CN");
  assert.equal(pathForLocale("/ar", "en"), "/docs/getting-started");
  assert.equal(pathForLocale("/ru", "en"), "/docs/getting-started");
  assert.equal(pathForLocale("/zh-CN", "en"), "/docs/getting-started");
  assert.equal(pathForLocale("/docs", "ar"), "/ar");
  assert.equal(pathForLocale("/ar", "ar"), "/ar");
  assert.equal(
    pathForLocale("/docs/getting-started", "en"),
    "/docs/getting-started",
  );
});

test("englishPathOf resolves translated paths back to English", () => {
  assert.equal(englishPathOf("/ar"), "/docs/getting-started");
  assert.equal(englishPathOf("/ru"), "/docs/getting-started");
  assert.equal(englishPathOf("/zh-CN"), "/docs/getting-started");
  assert.equal(englishPathOf("/docs/getting-started"), "/docs/getting-started");
  assert.equal(englishPathOf("/docs"), "/docs");
});

test("languageAlternates includes x-default, English, and translations", () => {
  assert.deepEqual(languageAlternates("/docs/getting-started"), {
    "x-default": "/docs/getting-started",
    en: "/docs/getting-started",
    ar: "/ar",
    ru: "/ru",
    "zh-CN": "/zh-CN",
  });
  assert.deepEqual(languageAlternates("/docs"), {
    "x-default": "/docs",
    en: "/docs",
  });
});
