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

const REPO_ROOT = path.resolve(process.cwd(), "..", "..");
const PROJECTS_DIR = path.join(REPO_ROOT, "projects");
const TASKS_NOW_PATH = path.join(REPO_ROOT, "tasks", "now.md");
const DECISIONS_DIR = path.join(REPO_ROOT, "decisions");

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
  const pattern = new RegExp(`^## ${escapedHeading}\\n([\\s\\S]*?)(?=^## |\\Z)`, "m");
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

function extractListItems(section: string): string[] {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+/.test(line))
    .map((line) => line.replace(/^[-*]\s+/, "").trim())
    .filter(Boolean);
}

function inferRelatedProject(text: string, projects: ProjectRecord[]): string | undefined {
  const normalized = text.toLowerCase();

  const match = projects.find((project) => {
    const candidates = [project.slug, project.name.toLowerCase()];
    return candidates.some((candidate) => normalized.includes(candidate.toLowerCase()));
  });

  return match?.slug;
}

function inferRelatedProjects(text: string, projects: ProjectRecord[]): string[] {
  const normalized = text.toLowerCase();

  return projects
    .filter((project) => {
      const candidates = [project.slug, project.name.toLowerCase()];
      return candidates.some((candidate) => normalized.includes(candidate.toLowerCase()));
    })
    .map((project) => project.slug);
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

export async function getPriorities(): Promise<PriorityItem[]> {
  const projects = await getProjects();
  const fileContents = await fs.readFile(TASKS_NOW_PATH, "utf8");
  const currentPrioritiesSection = extractSection(fileContents, "Current priorities");
  const items = extractListItems(currentPrioritiesSection);

  return items.map((item) => ({
    title: item,
    detail: "",
    relatedProject: inferRelatedProject(item, projects),
  }));
}

export async function getDecisions(): Promise<DecisionSummary[]> {
  const projects = await getProjects();
  const files = await fs.readdir(DECISIONS_DIR);
  const decisionFiles = files.filter((file) => file.endsWith(".md")).sort().reverse();

  const decisions = await Promise.all(
    decisionFiles.map(async (file) => {
      const filePath = path.join(DECISIONS_DIR, file);
      const fileContents = await fs.readFile(filePath, "utf8");
      const titleLine = fileContents.split("\n").find((line) => line.startsWith("# ")) ?? "# Untitled decision";
      const title = titleLine.replace(/^#\s*Decision:\s*/i, "").replace(/^#\s*/, "").trim();
      const date = cleanMarkdownSection(extractSection(fileContents, "Date"));
      const status = cleanMarkdownSection(extractSection(fileContents, "Status"));
      const summary = cleanMarkdownSection(extractSection(fileContents, "Decision"));
      const relatedProjects = inferRelatedProjects(fileContents, projects);

      return {
        title,
        date: date || "unknown",
        status: (status || "Proposed") as DecisionSummary["status"],
        summary,
        relatedProjects,
      };
    }),
  );

  return decisions;
}
