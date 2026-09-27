import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { emailFromClaims, requireDashboardAdmin } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";

export default async function ProtectedDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const claims = await requireDashboardAdmin();

  return (
    <DashboardShell email={emailFromClaims(claims)}>{children}</DashboardShell>
  );
}
