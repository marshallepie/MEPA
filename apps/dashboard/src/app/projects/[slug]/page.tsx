import Link from "next/link";
import { notFound } from "next/navigation";

import { DashboardShell } from "@/components/dashboard-shell";
import { StatusBadge } from "@/components/status-badge";
import { getProjectBySlug, getProjectSlugs } from "@/lib/project-utils";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <DashboardShell>
      <div className="mb-6">
        <Link href="/projects" className="text-sm text-slate-300 transition hover:text-white">
          ← Back to projects
        </Link>
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">{project.type}</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">{project.name}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{project.summary}</p>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <h3 className="text-lg font-semibold text-white">Purpose</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{project.purpose}</p>
            </section>

            <section className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <h3 className="text-lg font-semibold text-white">Current risk</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{project.blocker}</p>
            </section>

            <section className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <h3 className="text-lg font-semibold text-white">Next critical action</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{project.nextAction}</p>
            </section>

            {project.notes ? (
              <section className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <h3 className="text-lg font-semibold text-white">Notes</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{project.notes}</p>
              </section>
            ) : null}
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <h3 className="text-lg font-semibold text-white">Operational details</h3>
              <dl className="mt-4 grid gap-4 text-sm text-slate-300">
                <div>
                  <dt className="font-medium text-slate-100">Users</dt>
                  <dd className="mt-1">{project.users.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-100">Deployment</dt>
                  <dd className="mt-1">
                    {project.deployment.environment} · {project.deployment.hosting}
                    {project.deployment.domain ? ` · ${project.deployment.domain}` : ""}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-100">Revenue model</dt>
                  <dd className="mt-1">{project.revenueModel}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-100">Last updated</dt>
                  <dd className="mt-1">{project.lastUpdated}</dd>
                </div>
              </dl>
            </section>

            <section className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <h3 className="text-lg font-semibold text-white">Stack</h3>
              <div className="mt-4 space-y-4 text-sm text-slate-300">
                {Object.entries(project.stack).map(([key, values]) => (
                  <div key={key}>
                    <p className="font-medium capitalize text-slate-100">{key}</p>
                    <p className="mt-1">{values.length > 0 ? values.join(", ") : "None listed"}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <h3 className="text-lg font-semibold text-white">Links</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
                {project.links.repoUrl ? (
                  <a className="transition hover:text-white" href={project.links.repoUrl} target="_blank" rel="noreferrer">
                    Repository →
                  </a>
                ) : (
                  <p>No repository link recorded.</p>
                )}
                {project.links.liveUrl ? (
                  <a className="transition hover:text-white" href={project.links.liveUrl} target="_blank" rel="noreferrer">
                    Live site →
                  </a>
                ) : (
                  <p>No live URL recorded.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
