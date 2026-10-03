const USER_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const UNAUTHORIZED_MESSAGE = "This account cannot open the dashboard.";

export function getDashboardAdminUserIds(
  raw = process.env.DASHBOARD_ADMIN_USER_IDS,
): string[] | null {
  if (!raw?.trim()) return null;
  const ids = new Set<string>();
  for (const part of raw.split(",")) {
    const id = part.trim().toLowerCase();
    if (USER_ID.test(id)) ids.add(id);
  }
  return ids.size > 0 ? [...ids] : null;
}

export function claimsUserId(claims: unknown): string | null {
  if (!claims || typeof claims !== "object" || !("sub" in claims)) return null;
  if (typeof claims.sub !== "string") return null;
  const id = claims.sub.trim();
  return id || null;
}

export function isDashboardAdmin(
  userId: string | null | undefined,
  adminUserIds: readonly string[] | null,
): boolean {
  if (!userId || !adminUserIds?.length) return false;
  const id = userId.trim().toLowerCase();
  return USER_ID.test(id) && adminUserIds.includes(id);
}

export type DashboardDecision =
  | { type: "next" }
  | {
      type: "redirect";
      pathname: "/dashboard" | "/dashboard/login";
      error?: "configuration" | "unavailable" | "unauthorized";
    };

export function decideDashboardRequest(input: {
  pathname: string;
  supabaseConfigured: boolean;
  sessionFailed: boolean;
  userId: string | null;
  adminUserIds: readonly string[] | null;
}): DashboardDecision {
  const pathname =
    input.pathname.length > 1 && input.pathname.endsWith("/")
      ? input.pathname.slice(0, -1)
      : input.pathname;
  const isLogin = pathname === "/dashboard/login";
  const next = (): DashboardDecision => ({ type: "next" });
  const login = (
    error?: "configuration" | "unavailable" | "unauthorized",
  ): DashboardDecision => ({
    type: "redirect",
    pathname: "/dashboard/login",
    ...(error ? { error } : {}),
  });

  if (!input.supabaseConfigured || !input.adminUserIds?.length) {
    return isLogin ? next() : login("configuration");
  }
  if (input.sessionFailed) return isLogin ? next() : login("unavailable");
  if (isDashboardAdmin(input.userId, input.adminUserIds)) {
    return isLogin ? { type: "redirect", pathname: "/dashboard" } : next();
  }
  if (!input.userId) return isLogin ? next() : login();
  return isLogin ? next() : login("unauthorized");
}
