import { promises as fs } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type { DecisionSummary, PriorityItem, ProjectRecord, ProjectStatus, ProjectType } from "@/lib/types";

interface ProjectFrontmatter {
  name?: string;
  slug?: string;
  type?: ProjectType;
  status?: ProjectStatus;
  summary?: string;
  users?: string[];
  stack?: Partial<ProjectRecord["stack"]>;
  deployment?: Partial<ProjectRecord["deployment"]>;
  revenue_model?: string;
  links?: {
    repo_url?: string | null;
    live_url?: string | null;
  };
  last_updated?: string;
}

const PROJECTS_DIR = path.resolve(process.cwd(), "..", "..", "projects");

function normalizeStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function normalizeString(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return "";
}

function extractSection(content: string, heading: string): string {
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `^## ${escapedHeading}\\n([\\s\\S]*?)(?=^## |\\Z)`,
    "m",
  );
  const match = content.match(pattern);

  if (!match) {
    return "";
  }

  return match[1].trim();
}

function cleanMarkdownSection(value: string): string {
  return value
    .split("\n")
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean)
    .join(" ");
}

function mapProjectFileToRecord(fileContents: string): ProjectRecord {
  const { data, content } = matter(fileContents);
  const frontmatter = data as ProjectFrontmatter;

  return {
    name: frontmatter.name ?? "Unnamed Project",
    slug: frontmatter.slug ?? "unknown-project",
    type: frontmatter.type ?? "product",
    status: frontmatter.status ?? "Planning",
    summary: normalizeString(frontmatter.summary),
    purpose: cleanMarkdownSection(extractSection(content, "Purpose")),
    users: normalizeStringArray(frontmatter.users),
    stack: {
      frontend: normalizeStringArray(frontmatter.stack?.frontend),
      backend: normalizeStringArray(frontmatter.stack?.backend),
      database: normalizeStringArray(frontmatter.stack?.database),
      billing: normalizeStringArray(frontmatter.stack?.billing),
      hosting: normalizeStringArray(frontmatter.stack?.hosting),
      integrations: normalizeStringArray(frontmatter.stack?.integrations),
    },
    deployment: {
      environment: normalizeString(frontmatter.deployment?.environment) || "unknown",
      hosting: normalizeString(frontmatter.deployment?.hosting) || "unknown",
      domain: normalizeString(frontmatter.deployment?.domain) || null,
    },
    revenueModel: normalizeString(frontmatter.revenue_model),
    blocker: cleanMarkdownSection(extractSection(content, "Blocker or Risk")),
    nextAction: cleanMarkdownSection(extractSection(content, "Next Critical Action")),
    notes: cleanMarkdownSection(extractSection(content, "Notes")),
    links: {
      repoUrl: normalizeString(frontmatter.links?.repo_url) || null,
      liveUrl: normalizeString(frontmatter.links?.live_url) || null,
    },
    lastUpdated: normalizeString(frontmatter.last_updated) || "unknown",
  };
}

export async function getProjects(): Promise<ProjectRecord[]> {
  const files = await fs.readdir(PROJECTS_DIR);
  const projectFiles = files.filter((file) => file.endsWith(".md")).sort();

  const projects = await Promise.all(
    projectFiles.map(async (file) => {
      const filePath = path.join(PROJECTS_DIR, file);
      const fileContents = await fs.readFile(filePath, "utf8");
      return mapProjectFileToRecord(fileContents);
    }),
  );

  return projects.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getProjectBySlug(slug: string): Promise<ProjectRecord | null> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getProjectSlugs(): Promise<string[]> {
  const projects = await getProjects();
  return projects.map((project) => project.slug);
}

export const priorities: PriorityItem[] = [
  {
    title: "Stabilize MEPA as the portfolio operating system",
    detail: "Keep the docs, schema, and dashboard scaffold aligned so the repo becomes a dependable command layer.",
    relatedProject: "mepa",
  },
  {
    title: "Define JobBuilda beta exit criteria",
    detail: "Clarify feedback inputs, launch blockers, and release readiness so beta does not drift.",
    relatedProject: "jobbuilda",
  },
  {
    title: "Reset ArunaDoc architecture before more backend work",
    detail: "Treat ArunaDoc as a restructure effort instead of an incremental feature build.",
    relatedProject: "arunadoc",
  },
  {
    title: "Decide MEMA's hosting direction",
    detail: "Choose between local-only use, hosted internal deployment, or a broader product path.",
    relatedProject: "mema",
  },
];

export const decisions: DecisionSummary[] = [
  {
    title: "Establish MEPA as a documentation-first operating repo",
    date: "2026-05-20",
    status: "Accepted",
    summary:
      "MEPA begins as a structured documentation system before evolving into an internal dashboard application.",
    relatedProjects: ["mepa"],
  },
  {
    title: "Treat ArunaDoc as a restructure project",
    date: "2026-05-20",
    status: "Accepted",
    summary:
      "ArunaDoc backend work should pause until responsibilities, domain model, and project structure are redesigned.",
    relatedProjects: ["arunadoc"],
  },
];
