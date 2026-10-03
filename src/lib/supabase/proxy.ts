import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import {
  claimsUserId,
  decideDashboardRequest,
  getDashboardAdminUserIds,
} from "@/lib/supabase/admin";
import { getSupabaseEnv } from "@/lib/supabase/env";

const CACHE_HEADERS = ["cache-control", "expires", "pragma"];

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function redirectTo(
  request: NextRequest,
  source: NextResponse,
  pathname: string,
  error?: string,
) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  if (error) url.searchParams.set("error", error);

  const redirectResponse = NextResponse.redirect(url, 303);
  for (const cookie of source.headers.getSetCookie()) {
    redirectResponse.headers.append("set-cookie", cookie);
  }
  for (const name of CACHE_HEADERS) {
    const value = source.headers.get(name);
    if (value) redirectResponse.headers.set(name, value);
  }
  return redirectResponse;
}

export async function updateSession(request: NextRequest) {
  const pathname = normalizePath(request.nextUrl.pathname);
  const isLogin = pathname === "/dashboard/login";
  const env = getSupabaseEnv();

  if (!env) {
    if (isLogin) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard/login";
    url.searchParams.set("error", "configuration");
    return NextResponse.redirect(url, 303);
  }

  let supabaseResponse = NextResponse.next({ request });
  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        supabaseResponse = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          supabaseResponse.cookies.set(name, value, options);
        }
        for (const [key, value] of Object.entries(headers)) {
          supabaseResponse.headers.set(key, value);
        }
      },
    },
  });

  let userId: string | null = null;
  let failed = false;

  try {
    const { data, error } = await supabase.auth.getClaims();
    if (!error) userId = claimsUserId(data?.claims);
  } catch {
    failed = true;
  }

  const decision = decideDashboardRequest({
    pathname,
    supabaseConfigured: true,
    sessionFailed: failed,
    userId,
    adminUserIds: getDashboardAdminUserIds(),
  });
  if (decision.type === "redirect") {
    return redirectTo(
      request,
      supabaseResponse,
      decision.pathname,
      decision.error,
    );
  }

  return supabaseResponse;
}
