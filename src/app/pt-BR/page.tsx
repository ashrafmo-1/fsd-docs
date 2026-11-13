import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { Footer } from "@/components/landing/footer";
import { Navigation } from "@/components/landing/navigation";
import { languageAlternates } from "@/lib/i18n";
import { docsPageMetadata } from "@/lib/metadata";

export const dynamic = "force-static";

export const metadata: Metadata = docsPageMetadata({
  title: "Início rápido em português",
  description:
    "Guia de início rápido em português: crie um projeto com Feature-Sliced Design usando o FSD CLI — requisitos, criação de projetos, geração de slices e atualizações seguras.",
  path: "/pt-BR",
  locale: "pt_BR",
  alternates: {
    languages: languageAlternates("/docs/getting-started"),
  },
});

const H2 = "mt-12 text-2xl font-semibold text-ink";

/**
 * Portuguese quick start. The root <html> stays lang="en", so this subtree sets
 * lang itself; commands and code stay left-to-right inside CodeBlock.
 */
export default function PortugueseQuickStartPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="bg-canvas">
        <article
          lang="pt-BR"
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
            Início rápido
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink md:text-5xl">
            Coloque um projeto com arquitetura FSD no ar em minutos
          </h1>
          <p className="mt-5 text-lg">
            O FSD CLI é uma ferramenta de linha de comando que cria projetos de
            React, Next.js, Vue, Nuxt ou SvelteKit com uma estrutura completa de
            Feature-Sliced Design, e gera slices (features, entities, widgets,
            pages) à medida que o projeto cresce. O restante da documentação
            está disponível apenas em inglês por enquanto.
          </p>

          <h2 id="requirements" className={H2}>
            Requisitos
          </h2>
          <p className="mt-4">
            Você precisa do Node.js 22.12.0 ou posterior. Os projetos de Nuxt e
            SvelteKit precisam do Node.js 22.22.2 ou posterior. Verifique a
            versão instalada:
          </p>
          <CodeBlock code="node --version" />

          <h2 id="create-a-project" className={H2}>
            Criar um projeto
          </h2>
          <p className="mt-4">
            Execute o comando no diretório onde você quer criar o projeto e
            escolha o framework, o gerenciamento de estado e o template no
            assistente interativo:
          </p>
          <CodeBlock code="npx create-fsd-architecture@latest my-app" />
          <p className="mt-4">
            Ou aceite diretamente a configuração padrão informando o framework:
          </p>
          <CodeBlock code="npx create-fsd-architecture@latest my-app --framework react-vite --yes" />

          <h2 id="generate-slices" className={H2}>
            Gerar slices
          </h2>
          <p className="mt-4">
            Na raiz do projeto, o gerador lê o arquivo{" "}
            <code>fsd.config.json</code> e cria os arquivos para o seu
            framework. Use <code>--dry-run</code> para ver primeiro uma prévia
            dos arquivos:
          </p>
          <CodeBlock
            code={`npx create-fsd-architecture@latest -g entity product --dry-run
npx create-fsd-architecture@latest -g feature cart
npx create-fsd-architecture@latest -g widget navbar
npx create-fsd-architecture@latest -g page catalog`}
          />
          <p className="mt-4">
            Cada slice ganha um arquivo <code>index.ts</code>: sua API pública,
            a única forma pela qual outras camadas podem importar a partir do
            slice.
          </p>

          <h2 id="safe-upgrades" className={H2}>
            Atualizações seguras
          </h2>
          <p className="mt-4">
            Instalar uma versão mais recente da ferramenta não altera o seu
            projeto automaticamente. Revise primeiro o plano de atualização e
            confirme que não há conflitos antes de aplicá-lo:
          </p>
          <CodeBlock
            code={`npx create-fsd-architecture@latest upgrade --dry-run
npx create-fsd-architecture@latest upgrade --yes`}
          />

          <h2 id="next-steps" className={H2}>
            Próximos passos
          </h2>
          <ul className="mt-4 list-disc space-y-2 ps-6">
            <li>
              <Link
                href="/docs/configuration"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                Arquivo de configuração fsd.config.json
              </Link>{" "}
              (em inglês)
            </li>
            <li>
              <Link
                href="/docs/slice-generator"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                Guia do gerador de slices
              </Link>{" "}
              (em inglês)
            </li>
            <li>
              <Link
                href="/docs/upgrade"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                Saiba mais sobre as atualizações seguras
              </Link>{" "}
              (em inglês)
            </li>
          </ul>
        </article>
      </main>
      <Footer />
    </>
  );
}
