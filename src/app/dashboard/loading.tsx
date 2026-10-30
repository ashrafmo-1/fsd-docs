export default function DashboardLoading() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="outline-none grid min-h-screen place-items-center px-6"
    >
      <p className="text-sm font-medium text-body-muted" role="status">
        Loading…
      </p>
    </main>
  );
}
