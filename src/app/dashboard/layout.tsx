import type { Metadata } from "next";
import { DashboardProviders } from "@/components/dashboard/dashboard-providers";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardProviders>{children}</DashboardProviders>;
}
