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

const ALLOWED_PROJECT_TYPES: ProjectType[] = [
  "product",
  "internal-tool",
  "website",
  "service",
  "platform",
  "research",
  "ops-system",
  "archive",
];

const ALLOWED_PROJECT_STATUSES: ProjectStatus[] = [
  "Idea",
  "Planning",
  "In Build",
  "Blocked",
  "Beta",
  "Live",
  "Internal Only",
  "Archived",
];

const ALLOWED_DECISION_STATUSES: DecisionSummary["status"][] = ["Accepted", "Proposed", "Superseded"];

class MarkdownSchemaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MarkdownSchemaError";
  }
}

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
  const pattern = new RegExp(`^## ${escapedHeading}\\n([\\s\\S]*?)(?=^## |$)`, "m");
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

function assertSchema(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new MarkdownSchemaError(message);
  }
}

function isValidDateString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
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

function validateProjectFrontmatter(frontmatter: ProjectFrontmatter, filePath: string): void {
  const name = normalizeString(frontmatter.name);
  const slug = normalizeString(frontmatter.slug);
  const type = normalizeString(frontmatter.type);
  const status = normalizeString(frontmatter.status);
  const summary = normalizeString(frontmatter.summary);
  const lastUpdated = normalizeString(frontmatter.last_updated);

  assertSchema(name, `${filePath}: missing required frontmatter field 'name'.`);
  assertSchema(slug, `${filePath}: missing required frontmatter field 'slug'.`);
  assertSchema(/^[a-z0-9-]+$/.test(slug), `${filePath}: slug must be lowercase kebab-case.`);
  assertSchema(type, `${filePath}: missing required frontmatter field 'type'.`);
  assertSchema(
    ALLOWED_PROJECT_TYPES.includes(type as ProjectType),
    `${filePath}: invalid project type '${type}'. Allowed: ${ALLOWED_PROJECT_TYPES.join(", ")}.`,
  );
  assertSchema(status, `${filePath}: missing required frontmatter field 'status'.`);
  assertSchema(
    ALLOWED_PROJECT_STATUSES.includes(status as ProjectStatus),
    `${filePath}: invalid project status '${status}'. Allowed: ${ALLOWED_PROJECT_STATUSES.join(", ")}.`,
  );
  assertSchema(summary, `${filePath}: missing required frontmatter field 'summary'.`);
  assertSchema(
    Array.isArray(frontmatter.users) && frontmatter.users.length > 0,
    `${filePath}: 'users' must be a non-empty array.`,
  );
  assertSchema(
    frontmatter.stack && typeof frontmatter.stack === "object",
    `${filePath}: missing required 'stack' object.`,
  );
  assertSchema(
    frontmatter.deployment && typeof frontmatter.deployment === "object",
    `${filePath}: missing required 'deployment' object.`,
  );
  assertSchema(lastUpdated, `${filePath}: missing required frontmatter field 'last_updated'.`);
  assertSchema(
    isValidDateString(lastUpdated),
    `${filePath}: last_updated must use YYYY-MM-DD format.`,
  );
}

function validateProjectSections(content: string, filePath: string): void {
  const requiredSections = ["Purpose", "Blocker or Risk", "Next Critical Action"];

  for (const heading of requiredSections) {
    const section = cleanMarkdownSection(extractSection(content, heading));
    assertSchema(section, `${filePath}: missing required section '## ${heading}'.`);
  }
}

function mapProjectFileToRecord(fileContents: string, filePath: string): ProjectRecord {
  const { data, content } = matter(fileContents);
  const frontmatter = data as ProjectFrontmatter;

  validateProjectFrontmatter(frontmatter, filePath);
  validateProjectSections(content, filePath);

  return {
    name: normalizeString(frontmatter.name),
    slug: normalizeString(frontmatter.slug),
    type: normalizeString(frontmatter.type) as ProjectType,
    status: normalizeString(frontmatter.status) as ProjectStatus,
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
    lastUpdated: normalizeString(frontmatter.last_updated),
  };
}

function validateUniqueProjectSlugs(projects: ProjectRecord[]): void {
  const seen = new Set<string>();

  for (const project of projects) {
    assertSchema(!seen.has(project.slug), `projects/: duplicate slug '${project.slug}' detected.`);
    seen.add(project.slug);
  }
}

function validateNowFile(fileContents: string): string[] {
  const currentPrioritiesSection = extractSection(fileContents, "Current priorities");
  assertSchema(currentPrioritiesSection, `${TASKS_NOW_PATH}: missing required section '## Current priorities'.`);

  const items = extractListItems(currentPrioritiesSection);
  assertSchema(items.length > 0, `${TASKS_NOW_PATH}: '## Current priorities' must contain at least one bullet item.`);

  return items;
}

function validateDecisionFile(fileContents: string, filePath: string): DecisionSummary["status"] {
  const titleLine = fileContents.split("\n").find((line) => line.startsWith("# ")) ?? "";
  const date = cleanMarkdownSection(extractSection(fileContents, "Date"));
  const status = cleanMarkdownSection(extractSection(fileContents, "Status"));
  const summary = cleanMarkdownSection(extractSection(fileContents, "Decision"));

  assertSchema(titleLine, `${filePath}: missing top-level '# Decision: ...' heading.`);
  assertSchema(/^#\s*Decision:/i.test(titleLine), `${filePath}: title must start with '# Decision:'.`);
  assertSchema(date, `${filePath}: missing required section '## Date'.`);
  assertSchema(isValidDateString(date), `${filePath}: decision date must use YYYY-MM-DD format.`);
  assertSchema(status, `${filePath}: missing required section '## Status'.`);
  assertSchema(
    ALLOWED_DECISION_STATUSES.includes(status as DecisionSummary["status"]),
    `${filePath}: invalid decision status '${status}'. Allowed: ${ALLOWED_DECISION_STATUSES.join(", ")}.`,
  );
  assertSchema(summary, `${filePath}: missing required section '## Decision'.`);

  return status as DecisionSummary["status"];
}

export async function getProjects(): Promise<ProjectRecord[]> {
  const files = await fs.readdir(PROJECTS_DIR);
  const projectFiles = files.filter((file) => file.endsWith(".md")).sort();

  const projects = await Promise.all(
    projectFiles.map(async (file) => {
      const filePath = path.join(PROJECTS_DIR, file);
      const fileContents = await fs.readFile(filePath, "utf8");
      return mapProjectFileToRecord(fileContents, filePath);
    }),
  );

  validateUniqueProjectSlugs(projects);

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
  const items = validateNowFile(fileContents);

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
      const status = validateDecisionFile(fileContents, filePath);
      const summary = cleanMarkdownSection(extractSection(fileContents, "Decision"));
      const relatedProjects = inferRelatedProjects(fileContents, projects);

      return {
        title,
        date,
        status,
        summary,
        relatedProjects,
      };
    }),
  );

  return decisions;
}
