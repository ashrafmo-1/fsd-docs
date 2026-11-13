import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { Footer } from "@/components/landing/footer";
import { Navigation } from "@/components/landing/navigation";
import { languageAlternates } from "@/lib/i18n";
import { docsPageMetadata } from "@/lib/metadata";

export const dynamic = "force-static";

export const metadata: Metadata = docsPageMetadata({
  title: "Inicio rápido en español",
  description:
    "Guía de inicio rápido en español: crea un proyecto con Feature-Sliced Design usando FSD CLI — requisitos, creación de proyectos, generación de slices y actualizaciones seguras.",
  path: "/es",
  locale: "es_ES",
  alternates: {
    languages: languageAlternates("/docs/getting-started"),
  },
});

const H2 = "mt-12 text-2xl font-semibold text-ink";

/**
 * Spanish quick start. The root <html> stays lang="en", so this subtree sets
 * lang itself; commands and code stay left-to-right inside CodeBlock.
 */
export default function SpanishQuickStartPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="bg-canvas">
        <article
          lang="es"
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
            Inicio rápido
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink md:text-5xl">
            Pon en marcha un proyecto con arquitectura FSD en minutos
          </h1>
          <p className="mt-5 text-lg">
            FSD CLI es una herramienta de línea de comandos que crea proyectos
            de React, Next.js, Vue, Nuxt o SvelteKit con una estructura completa
            de Feature-Sliced Design, y genera slices (features, entities,
            widgets, pages) a medida que el proyecto crece. El resto de la
            documentación está disponible solo en inglés por ahora.
          </p>

          <h2 id="requirements" className={H2}>
            Requisitos
          </h2>
          <p className="mt-4">
            Necesitas Node.js 22.12.0 o una versión posterior. Los proyectos de
            Nuxt y SvelteKit necesitan Node.js 22.22.2 o una versión posterior.
            Comprueba la versión instalada:
          </p>
          <CodeBlock code="node --version" />

          <h2 id="create-a-project" className={H2}>
            Crear un proyecto
          </h2>
          <p className="mt-4">
            Ejecuta el comando en el directorio donde quieras crear el proyecto
            y elige el framework, la gestión de estado y la plantilla en el
            asistente interactivo:
          </p>
          <CodeBlock code="npx create-fsd-architecture@latest my-app" />
          <p className="mt-4">
            O acepta directamente la configuración predeterminada indicando el
            framework:
          </p>
          <CodeBlock code="npx create-fsd-architecture@latest my-app --framework react-vite --yes" />

          <h2 id="generate-slices" className={H2}>
            Generar slices
          </h2>
          <p className="mt-4">
            En la raíz del proyecto, el generador lee el archivo{" "}
            <code>fsd.config.json</code> y crea los archivos para tu framework.
            Usa <code>--dry-run</code> para ver primero una vista previa de los
            archivos:
          </p>
          <CodeBlock
            code={`npx create-fsd-architecture@latest -g entity product --dry-run
npx create-fsd-architecture@latest -g feature cart
npx create-fsd-architecture@latest -g widget navbar
npx create-fsd-architecture@latest -g page catalog`}
          />
          <p className="mt-4">
            Cada slice obtiene un archivo <code>index.ts</code>: su API pública,
            la única vía por la que otras capas pueden importar desde el slice.
          </p>

          <h2 id="safe-upgrades" className={H2}>
            Actualizaciones seguras
          </h2>
          <p className="mt-4">
            Instalar una versión más reciente de la herramienta no cambia tu
            proyecto automáticamente. Revisa primero el plan de actualización y
            confirma que no hay conflictos antes de aplicarlo:
          </p>
          <CodeBlock
            code={`npx create-fsd-architecture@latest upgrade --dry-run
npx create-fsd-architecture@latest upgrade --yes`}
          />

          <h2 id="next-steps" className={H2}>
            Siguientes pasos
          </h2>
          <ul className="mt-4 list-disc space-y-2 ps-6">
            <li>
              <Link
                href="/docs/configuration"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                Archivo de configuración fsd.config.json
              </Link>{" "}
              (en inglés)
            </li>
            <li>
              <Link
                href="/docs/slice-generator"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                Guía del generador de slices
              </Link>{" "}
              (en inglés)
            </li>
            <li>
              <Link
                href="/docs/upgrade"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                Más información sobre las actualizaciones seguras
              </Link>{" "}
              (en inglés)
            </li>
          </ul>
        </article>
      </main>
      <Footer />
    </>
  );
}
