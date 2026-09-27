"use client";

import { useActionState } from "react";
import { signIn } from "@/app/dashboard/actions";
import type { SignInState } from "@/app/dashboard/sign-in-state";

const initialState: SignInState = { error: null };

const fieldClassName =
  "mt-2 w-full min-h-11 rounded-xl border border-hairline bg-surface-soft px-4 text-base text-ink outline-none disabled:cursor-not-allowed disabled:opacity-60";

export function LoginForm({
  configured,
  notice,
}: {
  configured: boolean;
  notice: string | null;
}) {
  const [state, action, pending] = useActionState(signIn, initialState);
  const message = state.error ?? notice;
  const disabled = !configured || pending;

  return (
    <form action={action} className="mt-8 space-y-4" noValidate>
      {message ? (
        <p
          role="alert"
          className="rounded-xl border border-hairline bg-surface-soft px-4 py-3 text-sm leading-relaxed text-body-strong"
        >
          {message}
        </p>
      ) : null}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          required
          maxLength={320}
          disabled={disabled}
          aria-invalid={message ? true : undefined}
          className={fieldClassName}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-ink"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={1024}
          disabled={disabled}
          aria-invalid={message ? true : undefined}
          className={fieldClassName}
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        aria-busy={pending}
        className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
