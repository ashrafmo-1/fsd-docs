import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/env";

export function createClient() {
  const env = getSupabaseEnv();
  if (!env) {
    throw new Error("Supabase dashboard auth is not configured.");
  }

  return createBrowserClient(env.url, env.anonKey);
}
