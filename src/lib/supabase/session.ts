import { redirect } from "next/navigation";
import { cache } from "react";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const getDashboardSession = cache(async () => {
  if (!getSupabaseEnv()) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims?.sub) return null;
    return data.claims;
  } catch {
    return null;
  }
});

export async function requireDashboardAdmin() {
  if (!getSupabaseEnv()) {
    redirect("/dashboard/login?error=configuration");
  }

  const claims = await getDashboardSession();
  if (!claims) redirect("/dashboard/login");
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
