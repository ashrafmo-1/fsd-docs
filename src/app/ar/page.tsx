import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { Footer } from "@/components/landing/footer";
import { Navigation } from "@/components/landing/navigation";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "البدء السريع بالعربية",
  description:
    "دليل عربي مختصر لإنشاء مشروع Feature-Sliced Design باستخدام FSD CLI: المتطلبات، إنشاء المشروع، توليد الشرائح، والترقية الآمنة.",
  alternates: {
    canonical: "/ar",
    languages: { en: "/docs/getting-started", ar: "/ar" },
  },
  openGraph: { locale: "ar_EG", url: "/ar" },
};

const H2 = "mt-12 text-2xl font-semibold text-ink";

/**
 * Arabic quick start. The root <html> stays lang="en", so this subtree sets
 * lang/dir itself; commands and code stay left-to-right inside CodeBlock.
 */
export default function ArabicQuickStartPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="bg-canvas">
        <article
          lang="ar"
          dir="rtl"
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
            دليل البدء السريع
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink md:text-5xl">
            ابدأ مشروعك بهيكلية FSD في دقائق
          </h1>
          <p className="mt-5 text-lg">
            ‏FSD CLI أداة سطر أوامر تنشئ مشروع React أو Next.js أو Vue أو Nuxt أو
            SvelteKit بهيكلية Feature-Sliced Design كاملة، ثم تولّد الشرائح
            (features وentities وwidgets وpages) داخل المشروع كلما كبر. باقي
            التوثيق متاح بالإنجليزية حاليًا.
          </p>

          <h2 id="requirements" className={H2}>
            المتطلبات
          </h2>
          <p className="mt-4">
            تحتاج Node.js بإصدار 22.12.0 أو أحدث. مشاريع Nuxt وSvelteKit تحتاج
            22.22.2 أو أحدث. تحقّق من الإصدار المثبّت:
          </p>
          <CodeBlock code="node --version" />

          <h2 id="create-a-project" className={H2}>
            إنشاء مشروع جديد
          </h2>
          <p className="mt-4">
            شغّل الأمر من المجلد الذي تريد إنشاء المشروع بداخله، واختر الإطار
            وأدوات الحالة والنماذج من المعالج التفاعلي:
          </p>
          <CodeBlock code="npx create-fsd-architecture@latest my-app" />
          <p className="mt-4">
            أو اقبل الإعدادات الافتراضية مباشرةً بتحديد الإطار:
          </p>
          <CodeBlock code="npx create-fsd-architecture@latest my-app --framework react-vite --yes" />

          <h2 id="generate-slices" className={H2}>
            توليد الشرائح
          </h2>
          <p className="mt-4">
            من جذر المشروع، يقرأ المولّد ملف <code>fsd.config.json</code> ويكتب
            ملفات مناسبة لإطارك. استخدم <code>--dry-run</code> لمعاينة الملفات
            قبل كتابتها:
          </p>
          <CodeBlock
            code={`npx create-fsd-architecture@latest -g entity product --dry-run
npx create-fsd-architecture@latest -g feature cart
npx create-fsd-architecture@latest -g widget navbar
npx create-fsd-architecture@latest -g page catalog`}
          />
          <p className="mt-4">
            كل شريحة تحصل على ملف <code>index.ts</code> يمثّل واجهتها العامة، ولا
            تستورد الطبقات الأخرى منها إلا عبره.
          </p>

          <h2 id="safe-upgrades" className={H2}>
            الترقية الآمنة
          </h2>
          <p className="mt-4">
            تثبيت إصدار أحدث من الأداة لا يغيّر مشروعك تلقائيًا. اعرض خطة الترقية
            أولًا، ثم طبّقها عندما تخلو من التعارضات:
          </p>
          <CodeBlock
            code={`npx create-fsd-architecture@latest upgrade --dry-run
npx create-fsd-architecture@latest upgrade --yes`}
          />

          <h2 id="next-steps" className={H2}>
            الخطوات التالية
          </h2>
          <ul className="mt-4 list-disc space-y-2 ps-6">
            <li>
              <Link
                href="/docs/configuration"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                ملف الإعداد fsd.config.json
              </Link>{" "}
              (بالإنجليزية)
            </li>
            <li>
              <Link
                href="/docs/slice-generator"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                دليل مولّد الشرائح
              </Link>{" "}
              (بالإنجليزية)
            </li>
            <li>
              <Link
                href="/docs/upgrade"
                hrefLang="en"
                className="text-brand-coral underline"
              >
                تفاصيل الترقية الآمنة
              </Link>{" "}
              (بالإنجليزية)
            </li>
          </ul>
        </article>
      </main>
      <Footer />
    </>
  );
}
