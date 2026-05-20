import type { ProjectStatus } from "@/lib/types";

const statusClasses: Record<ProjectStatus, string> = {
  Idea: "bg-slate-800 text-slate-200 border-slate-700",
  Planning: "bg-blue-500/10 text-blue-200 border-blue-400/30",
  "In Build": "bg-violet-500/10 text-violet-200 border-violet-400/30",
  Blocked: "bg-rose-500/10 text-rose-200 border-rose-400/30",
  Beta: "bg-amber-500/10 text-amber-200 border-amber-400/30",
  Live: "bg-emerald-500/10 text-emerald-200 border-emerald-400/30",
  "Internal Only": "bg-slate-700/50 text-slate-100 border-slate-500/30",
  Archived: "bg-zinc-700/50 text-zinc-300 border-zinc-500/30",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${statusClasses[status]}`}>
      {status}
    </span>
  );
}
