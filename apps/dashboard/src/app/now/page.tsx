import Link from "next/link";

import { DashboardShell } from "@/components/dashboard-shell";
import { getPriorities } from "@/lib/dashboard-data";

export default async function NowPage() {
  const priorities = await getPriorities();

  return (
    <DashboardShell>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-medium text-cyan-300">Now</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Immediate operational priorities</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          This view mirrors the short, focused operating layer that should stay small and current inside MEPA.
        </p>

        <ol className="mt-8 grid gap-4">
          {priorities.map((priority, index) => (
            <li key={`${priority.title}-${index}`} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Priority {index + 1}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{priority.title}</h3>
                </div>
                {priority.relatedProject ? (
                  <Link
                    href={`/projects/${priority.relatedProject}`}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
                  >
                    Open project
                  </Link>
                ) : null}
              </div>
              {priority.detail ? <p className="mt-3 text-sm leading-6 text-slate-300">{priority.detail}</p> : null}
            </li>
          ))}
        </ol>
      </section>
    </DashboardShell>
  );
}
