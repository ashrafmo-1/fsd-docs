"use server";

import { redirect } from "next/navigation";
import type { SignInState } from "@/app/dashboard/sign-in-state";
import {
  claimsUserId,
  getDashboardAdminUserIds,
  isDashboardAdmin,
  UNAUTHORIZED_MESSAGE,
} from "@/lib/supabase/admin";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

const CREDENTIALS_ERROR = "The email or password is incorrect.";
const UNAVAILABLE_ERROR =
  "Sign-in is unavailable right now. Try again in a moment.";
const UNCONFIRMED_ERROR = "This account cannot sign in yet.";

function readCredentials(formData: FormData) {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  if (typeof emailValue !== "string" || typeof passwordValue !== "string") {
    return null;
  }

  const email = emailValue.trim();
  const password = passwordValue;
  if (!email || !password) return { missing: true as const };
  if (email.length > 320 || password.length > 1024) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return { email, password };
}

function signInMessage(error: {
  message: string;
  status?: number;
}): SignInState {
  const message = error.message.toLowerCase();
  if (message.includes("not confirmed")) {
    return { error: UNCONFIRMED_ERROR, invalidFields: false };
  }
  if (error.status && error.status >= 500) {
    return { error: UNAVAILABLE_ERROR, invalidFields: false };
  }
  if (
    message.includes("invalid") ||
    message.includes("credential") ||
    message.includes("password") ||
    error.status === 400
  ) {
    return { error: CREDENTIALS_ERROR, invalidFields: true };
  }
  return { error: UNAVAILABLE_ERROR, invalidFields: false };
}

export async function signIn(
  _state: SignInState,
  formData: FormData,
): Promise<SignInState> {
  if (!getSupabaseEnv() || !getDashboardAdminUserIds()) {
    return {
      error: "Dashboard sign-in is not configured yet.",
      invalidFields: false,
    };
  }

  const credentials = readCredentials(formData);
  if (!credentials) return { error: CREDENTIALS_ERROR, invalidFields: true };
  if ("missing" in credentials) {
    return { error: "Enter your email and password.", invalidFields: true };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) return signInMessage(error);

    const { data, error: claimsError } = await supabase.auth.getClaims();
    const userId = claimsError ? null : claimsUserId(data?.claims);
    if (!isDashboardAdmin(userId, getDashboardAdminUserIds())) {
      await supabase.auth.signOut();
      return {
        error: userId ? UNAUTHORIZED_MESSAGE : UNAVAILABLE_ERROR,
        invalidFields: false,
      };
    }
  } catch {
    return { error: UNAVAILABLE_ERROR, invalidFields: false };
  }

  redirect("/dashboard");
}

export async function signOut() {
  if (getSupabaseEnv()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/dashboard/login");
}
