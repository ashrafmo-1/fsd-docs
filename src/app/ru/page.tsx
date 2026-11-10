import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { Footer } from "@/components/landing/footer";
import { Navigation } from "@/components/landing/navigation";
import { languageAlternates } from "@/lib/i18n";
import { localizedOpenGraph } from "@/lib/metadata";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Быстрый старт на русском",
  description:
    "Краткое руководство на русском языке по созданию проекта Feature-Sliced Design с помощью FSD CLI: требования, создание проекта, генерация срезов и безопасное обновление.",
  alternates: {
    canonical: "/ru",
    languages: languageAlternates("/docs/getting-started"),
  },
  openGraph: localizedOpenGraph("ru_RU", "/ru"),
};

const H2 = "mt-12 text-2xl font-semibold text-ink";

/**
 * Russian quick start. The root <html> stays lang="en", so this subtree sets
 * lang itself; commands and code stay left-to-right inside CodeBlock.
 */
export default function RussianQuickStartPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="bg-canvas">
        <article
          lang="ru"
          className="mx-auto max-w-3xl px-6 py-12 text-start leading-loose text-body lg:py-16 [&_pre]:text-left [&_pre]:[direction:ltr]"
        >
          <p className="text-sm text-body-muted">
            <Link
              href="/docs/getting-started"
              hrefLang="en"
              lang="en"
              dir="ltr"
              className="text-brand-coral underline"
            >
              Read in English
            </Link>
          </p>
          <p className="mt-6 text-xs font-semibold tracking-wide text-brand-coral">
            Краткое руководство
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink md:text-5xl">
            Начните проект с архитектурой FSD за несколько минут
          </h1>
          <p className="mt-5 text-lg">
            FSD CLI — это инструмент командной строки, который создаёт проект
            React, Next.js, Vue, Nuxt или SvelteKit с полной структурой
            Feature-Sliced Design, а затем генерирует срезы (features, entities,
            widgets, pages) по мере роста проекта. Остальная документация пока
            доступна только на английском.
          </p>

          <h2 id="requirements" className={H2}>
            Требования
          </h2>
          <p className="mt-4">
            Требуется Node.js 22.12.0 или новее. Проекты Nuxt и SvelteKit
            требуют 22.22.2 или новее. Проверьте установленную версию:
          </p>
          <CodeBlock code="node --version" />

          <h2 id="create-a-project" className={H2}>
            Создание проекта
          </h2>
          <p className="mt-4">
            Выполните команду из папки, в которой хотите создать проект, и
            выберите фреймворк, инструменты состояния и шаблоны в интерактивном
            мастере:
          </p>
          <CodeBlock code="npx create-fsd-architecture@latest my-app" />
          <p className="mt-4">
            Или примите настройки по умолчанию сразу, указав фреймворк:
          </p>
          <CodeBlock code="npx create-fsd-architecture@latest my-app --framework react-vite --yes" />

          <h2 id="generate-slices" className={H2}>
            Генерация срезов
          </h2>
          <p className="mt-4">
            Из корня проекта генератор читает файл <code>fsd.config.json</code>{" "}
            и создаёт файлы под ваш фреймворк. Используйте{" "}
            <code>--dry-run</code>, чтобы предварительно просмотреть файлы:
          </p>
          <CodeBlock
            code={`npx create-fsd-architecture@latest -g entity product --dry-run
npx create-fsd-architecture@latest -g feature cart
npx create-fsd-architecture@latest -g widget navbar
npx create-fsd-architecture@latest -g page catalog`}
          />
          <p className="mt-4">
            Каждый срез получает файл <code>index.ts</code> — его публичный API,
            и другие слои импортируют из среза только через него.
          </p>

          <h2 id="safe-upgrades" className={H2}>
            Безопасное обновление
          </h2>
          <p className="mt-4">
            Установка более новой версии инструмента не меняет ваш проект
            автоматически. Сначала просмотрите план обновления, а затем
            примените его, когда в нём нет конфликтов:
          </p>
          <CodeBlock
            code={`npx create-fsd-architecture@latest upgrade --dry-run
npx create-fsd-architecture@latest upgrade --yes`}
          />

          <h2 id="next-steps" className={H2}>
            Следующие шаги
          </h2>
          <ul className="mt-4 list-disc space-y-2 ps-6">
            <li>
              <Link
                href="/docs/configuration"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                Файл конфигурации fsd.config.json
              </Link>{" "}
              (на английском)
            </li>
            <li>
              <Link
                href="/docs/slice-generator"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                Руководство по генератору срезов
              </Link>{" "}
              (на английском)
            </li>
            <li>
              <Link
                href="/docs/upgrade"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                Подробнее о безопасном обновлении
              </Link>{" "}
              (на английском)
            </li>
          </ul>
        </article>
      </main>
      <Footer />
    </>
  );
}
