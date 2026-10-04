import Image from "next/image";
import Link from "next/link";
import { signOut } from "@/app/dashboard/actions";
import { LogoutButton } from "@/components/dashboard/logout-button";

export function DashboardShell({
  email,
  children,
}: {
  email: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-body">
      <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 w-full max-w-[1280px] flex-col justify-center gap-3 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="FSD CLI home"
          >
            <Image src="/fsd-logo.png" alt="" width={40} height={40} />
            <span className="flex flex-col leading-none">
              <span className="text-base font-semibold tracking-tight text-ink">
                FSD CLI
              </span>
              <span className="mt-1 text-[10px] font-medium text-body-muted">
                Admin
              </span>
            </span>
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {email ? (
              <p className="text-sm text-body-muted">
                <span className="sr-only">Signed in as </span>
                {email}
              </p>
            ) : null}
            <Link
              href="/docs"
              className="text-sm font-medium text-body-muted hover:text-ink"
            >
              Documentation
            </Link>
            <form action={signOut}>
              <LogoutButton />
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:py-24">
        {children}
      </main>
    </div>
  );
}
