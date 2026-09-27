import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/dashboard/login-form";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { getDashboardSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign in",
};

const NOTICES = {
  configuration:
    "Dashboard sign-in is not configured yet. Add the Supabase URL and anon key, then restart the app.",
  unavailable: "Sign-in is unavailable right now. Try again in a moment.",
} as const;

function noticeFromSearchParam(error: string | string[] | undefined) {
  const code = Array.isArray(error) ? error[0] : error;
  if (code === "configuration" || code === "unavailable") {
    return NOTICES[code];
  }
  return null;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  const configured = Boolean(getSupabaseEnv());
  if (configured) {
    const claims = await getDashboardSession();
    if (claims) redirect("/dashboard");
  }

  const params = await searchParams;
  const requestedNotice = noticeFromSearchParam(params.error);
  const notice = configured
    ? requestedNotice === NOTICES.configuration
      ? null
      : requestedNotice
    : NOTICES.configuration;

  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-hairline bg-canvas p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
          Admin
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink">
          Sign in
        </h1>
        <p className="mt-4 text-base leading-relaxed text-body">
          Use the admin account created in Supabase. This page does not offer
          registration.
        </p>
        <LoginForm configured={configured} notice={notice} />
        <p className="mt-6">
          <Link
            href="/docs"
            className="text-sm font-semibold text-brand-coral hover:underline"
          >
            Back to documentation
          </Link>
        </p>
      </div>
    </main>
  );
}
