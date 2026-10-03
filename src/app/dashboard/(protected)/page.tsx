import type { Metadata } from "next";
import { requireDashboardAdmin } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  await requireDashboardAdmin();

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[1.5px] text-brand-coral">
        Admin
      </p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-[-1.5px] text-ink md:text-5xl">
        Dashboard
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">
        Signed-in administrators will manage documentation videos here.
      </p>
      <section className="mt-10 max-w-3xl rounded-2xl border border-hairline bg-surface-soft p-5 sm:p-6">
        <h2 className="text-2xl font-semibold tracking-[-0.5px] text-ink">
          Video management is not available yet
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-body">
          Creating, editing, publishing, and assigning videos will be added in a
          later stage. This dashboard does not list or store video records yet.
        </p>
      </section>
    </>
  );
}
