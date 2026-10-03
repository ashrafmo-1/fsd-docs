"use client";

import { useFormStatus } from "react-dom";

export function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="button-secondary disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Signing out..." : "Log out"}
    </button>
  );
}
