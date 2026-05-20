import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/projects", label: "Projects" },
  { href: "/now", label: "Now" },
  { href: "/decisions", label: "Decisions" },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-8">
        <header className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Marshall Epie Portfolio Assistant
            </p>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white">MEPA Dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Private operational visibility across the Marshall Epie portfolio. Documentation-backed, direct, and built for continuity.
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
