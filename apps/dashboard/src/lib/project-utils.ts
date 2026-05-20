import { projects } from "@/lib/dashboard-data";

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}
