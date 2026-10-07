"use client";

import { useSignOut } from "@/components/dashboard/use-dashboard-actions";

export function LogoutButton() {
  const signOut = useSignOut();

  return (
    <button
      type="button"
      disabled={signOut.isPending}
      onClick={() => signOut.mutate()}
      className="button-secondary rounded-sm disabled:cursor-not-allowed disabled:opacity-60"
    >
      {signOut.isPending ? "Signing out..." : "Log out"}
    </button>
  );
}
