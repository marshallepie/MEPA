import Link from "next/link";

import { DashboardShell } from "@/components/dashboard-shell";
import { StatusBadge } from "@/components/status-badge";
import { getProjects } from "@/lib/project-utils";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <DashboardShell>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-6">
          <p className="text-sm font-medium text-cyan-300">Projects</p>
          <h2 className="text-3xl font-semibold text-white">Project registry view</h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-300">
            Read-only portfolio records derived from the MEPA operating model. Each record shows status, risk, next action, and deployment direction.
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-cyan-400/40 hover:bg-slate-900"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-slate-500">{project.type}</p>
                </div>
                <StatusBadge status={project.status} />
              </div>

              <p className="mt-4 text-sm text-slate-300">{project.summary}</p>

              <div className="mt-5 grid gap-4 text-sm text-slate-300 md:grid-cols-3">
                <div>
                  <p className="font-medium text-slate-100">Users</p>
                  <p className="mt-1">{project.users.join(", ")}</p>
                </div>
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
      </section>
    </DashboardShell>
  );
}
