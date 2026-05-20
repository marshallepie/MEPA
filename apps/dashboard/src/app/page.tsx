import Link from "next/link";

import { DashboardShell } from "@/components/dashboard-shell";
import { StatusBadge } from "@/components/status-badge";
import { getDecisions, getPriorities, getProjects } from "@/lib/dashboard-data";

const statusOrder = ["Planning", "Beta", "Blocked", "Live", "Internal Only"] as const;

export default async function Home() {
  const [projects, priorities, decisions] = await Promise.all([
    getProjects(),
    getPriorities(),
    getDecisions(),
  ]);

  const statusCounts = statusOrder.map((status) => ({
    status,
    count: projects.filter((project) => project.status === status).length,
  }));

  const blockedProjects = projects.filter((project) => project.status === "Blocked");
  const activeProjects = projects.filter((project) =>
    ["Planning", "Beta", "Live", "Internal Only"].includes(project.status),
  );

  return (
    <DashboardShell>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {statusCounts.map((item) => (
          <div key={item.status} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <p className="text-sm text-slate-400">{item.status}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{item.count}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-cyan-300">Projects</p>
              <h2 className="mt-1 text-2xl font-semibold text-white">Operational snapshot</h2>
            </div>
            <Link href="/projects" className="text-sm text-slate-300 transition hover:text-white">
              View all projects →
            </Link>
          </div>

          <div className="mt-6 grid gap-4">
            {activeProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-cyan-400/40 hover:bg-slate-900"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                    <p className="mt-1 text-sm text-slate-300">{project.summary}</p>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
                <div className="mt-4 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
                  <div>
                    <p className="font-medium text-slate-100">Current risk</p>
                    <p className="mt-1">{project.blocker}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-100">Next action</p>
                    <p className="mt-1">{project.nextAction}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-cyan-300">Now</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Immediate priorities</h2>
              </div>
              <Link href="/now" className="text-sm text-slate-300 transition hover:text-white">
                Full list →
              </Link>
            </div>
            <ol className="mt-5 space-y-4">
              {priorities.slice(0, 4).map((priority, index) => (
                <li key={`${priority.title}-${index}`} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Priority {index + 1}</p>
                  <p className="mt-2 font-medium text-slate-100">{priority.title}</p>
                  {priority.detail ? <p className="mt-2 text-sm text-slate-300">{priority.detail}</p> : null}
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-cyan-300">Decisions</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Recent direction</h2>
              </div>
              <Link href="/decisions" className="text-sm text-slate-300 transition hover:text-white">
                Decision log →
              </Link>
            </div>
            <div className="mt-5 space-y-4">
              {decisions.map((decision) => (
                <article key={decision.title} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{decision.date}</p>
                  <h3 className="mt-2 font-medium text-slate-100">{decision.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{decision.summary}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-rose-400/20 bg-rose-500/5 p-6">
            <p className="text-sm font-medium text-rose-200">Blocked</p>
            <h2 className="mt-1 text-xl font-semibold text-white">Projects needing intervention</h2>
            <div className="mt-4 space-y-3">
              {blockedProjects.map((project) => (
                <div key={project.slug} className="rounded-2xl border border-rose-400/20 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-white">{project.name}</p>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{project.nextAction}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </DashboardShell>
  );
}
