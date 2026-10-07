import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/dashboard/login-form";
import {
  claimsUserId,
  getDashboardAdminUserIds,
  isDashboardAdmin,
  UNAUTHORIZED_MESSAGE,
} from "@/lib/supabase/admin";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { getDashboardSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign in",
};

const NOTICES = {
  configuration:
    "Dashboard sign-in is not configured yet. Add the Supabase URL, anon key, and DASHBOARD_ADMIN_USER_IDS, then restart the app.",
  unavailable: "Sign-in is unavailable right now. Try again in a moment.",
  unauthorized: UNAUTHORIZED_MESSAGE,
} as const;

function noticeFromSearchParam(error: string | string[] | undefined) {
  const code = Array.isArray(error) ? error[0] : error;
  if (
    code === "configuration" ||
    code === "unavailable" ||
    code === "unauthorized"
  ) {
    return NOTICES[code];
  }
  return null;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  const adminUserIds = getDashboardAdminUserIds();
  const configured = Boolean(getSupabaseEnv()) && Boolean(adminUserIds);
  let rejected = false;
  if (configured) {
    const claims = await getDashboardSession();
    const userId = claimsUserId(claims);
    if (isDashboardAdmin(userId, adminUserIds)) redirect("/dashboard");
    rejected = Boolean(userId);
  }

  const params = await searchParams;
  const requestedNotice = noticeFromSearchParam(params.error);
  const notice = configured
    ? (requestedNotice === NOTICES.configuration ? null : requestedNotice) ||
      (rejected ? NOTICES.unauthorized : null)
    : NOTICES.configuration;

  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <div className="w-full max-w-md rounded-sm border border-hairline bg-canvas p-6 sm:p-8">
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
