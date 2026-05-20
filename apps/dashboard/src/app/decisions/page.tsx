import Link from "next/link";

import { DashboardShell } from "@/components/dashboard-shell";
import { getDecisions } from "@/lib/dashboard-data";

export default async function DecisionsPage() {
  const decisions = await getDecisions();

  return (
    <DashboardShell>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-medium text-cyan-300">Decisions</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Recorded direction and rationale</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          Decisions preserve continuity so strategy and architecture do not need to be rediscovered each session.
        </p>

        <div className="mt-8 space-y-4">
          {decisions.map((decision) => (
            <article key={decision.title} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{decision.date}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{decision.title}</h3>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200">{decision.status}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{decision.summary}</p>
              {decision.relatedProjects.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {decision.relatedProjects.map((slug) => (
                    <Link
                      key={slug}
                      href={`/projects/${slug}`}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
                    >
                      {slug}
                    </Link>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
