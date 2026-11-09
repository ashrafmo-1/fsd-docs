import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { Footer } from "@/components/landing/footer";
import { Navigation } from "@/components/landing/navigation";
import { languageAlternates } from "@/lib/i18n";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "简体中文快速入门",
  description:
    "简体中文快速入门指南：使用 FSD CLI 创建 Feature-Sliced Design 项目——环境要求、创建项目、生成切片与安全升级。",
  alternates: {
    canonical: "/zh-CN",
    languages: languageAlternates("/docs/getting-started"),
  },
  openGraph: { locale: "zh_CN", url: "/zh-CN" },
};

const H2 = "mt-12 text-2xl font-semibold text-ink";

/**
 * Chinese quick start. The root <html> stays lang="en", so this subtree sets
 * lang itself; commands and code stay left-to-right inside CodeBlock.
 */
export default function ChineseQuickStartPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="bg-canvas">
        <article
          lang="zh-CN"
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
            快速入门
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink md:text-5xl">
            几分钟内启动 FSD 架构项目
          </h1>
          <p className="mt-5 text-lg">
            FSD CLI 是一个命令行工具，可创建具有完整 Feature-Sliced Design
            结构的 React、Next.js、Vue、Nuxt 或 SvelteKit 项目，并随着项目增
            长生成切片（features、entities、widgets、pages）。其余文档目前仅
            提供英文版。
          </p>

          <h2 id="requirements" className={H2}>
            要求
          </h2>
          <p className="mt-4">
            需要 Node.js 22.12.0 或更高版本。Nuxt 和 SvelteKit 项目需要 22.22.2
            或更高版本。请检查已安装的版本：
          </p>
          <CodeBlock code="node --version" />

          <h2 id="create-a-project" className={H2}>
            创建项目
          </h2>
          <p className="mt-4">
            在希望创建项目的目录中运行该命令，然后在交互式向导中选择框架、
            状态管理工具和模板：
          </p>
          <CodeBlock code="npx create-fsd-architecture@latest my-app" />
          <p className="mt-4">或直接接受默认设置，同时指定框架：</p>
          <CodeBlock code="npx create-fsd-architecture@latest my-app --framework react-vite --yes" />

          <h2 id="generate-slices" className={H2}>
            生成切片
          </h2>
          <p className="mt-4">
            在项目根目录下，生成器会读取文件 <code>fsd.config.json</code>{" "}
            并为你的框架创建文件。使用 <code>--dry-run</code> 可以先预览文件：
          </p>
          <CodeBlock
            code={`npx create-fsd-architecture@latest -g entity product --dry-run
npx create-fsd-architecture@latest -g feature cart
npx create-fsd-architecture@latest -g widget navbar
npx create-fsd-architecture@latest -g page catalog`}
          />
          <p className="mt-4">
            每个切片都会获得一个 <code>index.ts</code> 文件——它的公共
            API，其他层只能通过它从切片导入。
          </p>

          <h2 id="safe-upgrades" className={H2}>
            安全升级
          </h2>
          <p className="mt-4">
            安装更新版本的工具不会自动更改你的项目。请先查看升级计划，确认其
            中没有冲突后再应用：
          </p>
          <CodeBlock
            code={`npx create-fsd-architecture@latest upgrade --dry-run
npx create-fsd-architecture@latest upgrade --yes`}
          />

          <h2 id="next-steps" className={H2}>
            下一步
          </h2>
          <ul className="mt-4 list-disc space-y-2 ps-6">
            <li>
              <Link
                href="/docs/configuration"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                fsd.config.json 配置文件
              </Link>{" "}
              （英文版）
            </li>
            <li>
              <Link
                href="/docs/slice-generator"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                切片生成器指南
              </Link>{" "}
              （英文版）
            </li>
            <li>
              <Link
                href="/docs/upgrade"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                有关安全升级的更多信息
              </Link>{" "}
              （英文版）
            </li>
          </ul>
        </article>
      </main>
      <Footer />
    </>
  );
}
