import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { Footer } from "@/components/landing/footer";
import { Navigation } from "@/components/landing/navigation";
import { languageAlternates } from "@/lib/i18n";
import { localizedOpenGraph } from "@/lib/metadata";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "日本語クイックスタート",
  description:
    "日本語クイックスタートガイド：FSD CLIでFeature-Sliced Designのプロジェクトを作成する — 要件、プロジェクト作成、スライス生成、安全なアップグレード。",
  alternates: {
    canonical: "/ja",
    languages: languageAlternates("/docs/getting-started"),
  },
  openGraph: localizedOpenGraph("ja_JP", "/ja"),
};

const H2 = "mt-12 text-2xl font-semibold text-ink";

/**
 * Japanese quick start. The root <html> stays lang="en", so this subtree sets
 * lang itself; commands and code stay left-to-right inside CodeBlock.
 */
export default function JapaneseQuickStartPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="bg-canvas">
        <article
          lang="ja"
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
            クイックスタート
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink md:text-5xl">
            数分でFSDアーキテクチャのプロジェクトを立ち上げる
          </h1>
          <p className="mt-5 text-lg">
            FSD
            CLIは、React、Next.js、Vue、Nuxt、SvelteKitのプロジェクトを完全なFeature-Sliced
            Design構造で作成し、プロジェクトの成長に合わせてスライス（features、entities、widgets、pages）を生成するコマンドラインツールです。ドキュメントの残りの部分は今のところ英語のみです。
          </p>

          <h2 id="requirements" className={H2}>
            要件
          </h2>
          <p className="mt-4">
            CLIにはNode.js 22.12.0
            以降が必要です。NuxtとSvelteKitのプロジェクトにはNode.js
            22.22.2以降が必要です。インストールされているバージョンを確認してください:
          </p>
          <CodeBlock code="node --version" />

          <h2 id="create-a-project" className={H2}>
            プロジェクトを作成する
          </h2>
          <p className="mt-4">
            プロジェクトを作成したいディレクトリでコマンドを実行し、インタラクティブなウィザードでフレームワーク、状態管理、テンプレートを選択します:
          </p>
          <CodeBlock code="npx create-fsd-architecture@latest my-app" />
          <p className="mt-4">
            または、フレームワークを指定してデフォルト設定をそのまま受け入れます:
          </p>
          <CodeBlock code="npx create-fsd-architecture@latest my-app --framework react-vite --yes" />

          <h2 id="generate-slices" className={H2}>
            スライスを生成する
          </h2>
          <p className="mt-4">
            プロジェクトのルートで、ジェネレーターは<code>fsd.config.json</code>
            ファイルを読み取り、フレームワーク用のファイルを生成します。
            <code>--dry-run</code>
            を使うと、まず生成されるファイルのプレビューを確認できます:
          </p>
          <CodeBlock
            code={`npx create-fsd-architecture@latest -g entity product --dry-run
npx create-fsd-architecture@latest -g feature cart
npx create-fsd-architecture@latest -g widget navbar
npx create-fsd-architecture@latest -g page catalog`}
          />
          <p className="mt-4">
            各スライスには<code>index.ts</code>
            ファイルが生成されます。これはパブリックAPIであり、他のレイヤーがそのスライスからインポートできる唯一の方法です。
          </p>

          <h2 id="safe-upgrades" className={H2}>
            安全なアップグレード
          </h2>
          <p className="mt-4">
            新しいバージョンのツールをインストールしても、プロジェクトが自動的に変更されることはありません。まずアップグレード計画を確認し、競合がないことを確認してから適用してください:
          </p>
          <CodeBlock
            code={`npx create-fsd-architecture@latest upgrade --dry-run
npx create-fsd-architecture@latest upgrade --yes`}
          />

          <h2 id="next-steps" className={H2}>
            次のステップ
          </h2>
          <ul className="mt-4 list-disc space-y-2 ps-6">
            <li>
              <Link
                href="/docs/configuration"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                設定ファイル fsd.config.json
              </Link>{" "}
              （英語）
            </li>
            <li>
              <Link
                href="/docs/slice-generator"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                スライスジェネレーターガイド
              </Link>{" "}
              （英語）
            </li>
            <li>
              <Link
                href="/docs/upgrade"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                安全なアップグレードについて詳しく見る
              </Link>{" "}
              （英語）
            </li>
          </ul>
        </article>
      </main>
      <Footer />
    </>
  );
}
