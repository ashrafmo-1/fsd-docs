import { redirect } from "next/navigation";
import { cache } from "react";
import {
  claimsUserId,
  getDashboardAdminUserIds,
  isDashboardAdmin,
} from "@/lib/supabase/admin";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const getDashboardSession = cache(async () => {
  if (!getSupabaseEnv()) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims || !claimsUserId(data.claims)) return null;
    return data.claims;
  } catch {
    return null;
  }
});

export async function requireDashboardAdmin() {
  const adminUserIds = getDashboardAdminUserIds();
  if (!getSupabaseEnv() || !adminUserIds) {
    redirect("/dashboard/login?error=configuration");
  }

  const claims = await getDashboardSession();
  const userId = claimsUserId(claims);
  if (!userId) redirect("/dashboard/login");
  if (!isDashboardAdmin(userId, adminUserIds)) {
    redirect("/dashboard/login?error=unauthorized");
  }
  return claims;
}

export function emailFromClaims(claims: unknown): string | null {
  if (!claims || typeof claims !== "object" || !("email" in claims)) {
    return null;
  }

  const email = claims.email;
  if (typeof email !== "string") return null;

  const trimmed = email.trim();
  if (!trimmed || trimmed.length > 320 || !trimmed.includes("@")) return null;
  return trimmed;
}
