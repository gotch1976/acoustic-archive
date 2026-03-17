import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200">
      <nav className="border-b border-neutral-800 px-6 py-4">
        <Link
          to="/"
          className="text-xs tracking-[0.3em] uppercase text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          Acoustic Archive
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
