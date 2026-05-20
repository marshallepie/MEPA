import type { DecisionSummary, PriorityItem, ProjectRecord } from "@/lib/types";

export const projects: ProjectRecord[] = [
  {
    name: "MEPA",
    slug: "mepa",
    type: "ops-system",
    status: "Planning",
    summary:
      "Internal portfolio operating system evolving from a documentation-first repo into a private dashboard app.",
    purpose:
      "Provide continuity, structure, and operational visibility across the Marshall Epie portfolio.",
    users: ["Marshall Epie"],
    stack: {
      frontend: ["Next.js (planned)", "TypeScript (planned)", "Tailwind CSS (planned)"],
      backend: ["Supabase (planned)"],
      database: ["PostgreSQL via Supabase (planned)"],
      billing: [],
      hosting: ["GitHub repository", "future app hosting to be confirmed"],
      integrations: ["GitHub", "project docs", "future AI orchestration"],
    },
    deployment: {
      environment: "internal",
      hosting: "GitHub repository",
      domain: null,
    },
    revenueModel: "internal operational leverage",
    blocker:
      "Without normalized records and an app structure, MEPA could drift back into fragmented notes and prompt sprawl.",
    nextAction:
      "Build the first dashboard scaffold and align project records to the documented schema.",
    links: {
      repoUrl: "https://github.com/marshallepie/MEPA",
      liveUrl: null,
    },
    lastUpdated: "2026-05-20",
  },
  {
    name: "JobBuilda",
    slug: "jobbuilda",
    type: "product",
    status: "Beta",
    summary:
      "Beta-stage product currently running and needing a clearer hardening path.",
    purpose:
      "Serve users in the hiring and job-seeking space as an active portfolio product.",
    users: ["job seekers", "employers"],
    stack: {
      frontend: ["To be confirmed"],
      backend: ["To be confirmed"],
      database: ["Supabase"],
      billing: ["Stripe"],
      hosting: ["Netlify"],
      integrations: [],
    },
    deployment: {
      environment: "beta",
      hosting: "Netlify",
      domain: null,
    },
    revenueModel: "subscription or SaaS-style model to be confirmed",
    blocker:
      "Risk of remaining in indefinite beta without explicit hardening criteria and release gates.",
    nextAction:
      "Define beta exit criteria, feedback inputs, and the top launch-blocking defects.",
    links: {
      repoUrl: "https://github.com/marshallepie/jobbuilda",
      liveUrl: null,
    },
    lastUpdated: "2026-05-20",
  },
  {
    name: "ArunaDoc",
    slug: "arunadoc",
    type: "product",
    status: "Blocked",
    summary:
      "Product initiative blocked by backend and structural issues that require a full redesign pass.",
    purpose:
      "Create a product with a stable backend and clear architecture before further feature delivery.",
    users: ["To be confirmed"],
    stack: {
      frontend: ["To be confirmed"],
      backend: ["To be confirmed"],
      database: ["To be confirmed"],
      billing: [],
      hosting: [],
      integrations: [],
    },
    deployment: {
      environment: "blocked",
      hosting: "To be confirmed",
      domain: null,
    },
    revenueModel: "To be confirmed",
    blocker:
      "Continuing implementation on an unstable backend structure will compound technical debt and slow future delivery.",
    nextAction:
      "Produce a formal restructure plan covering backend responsibilities, domain model, storage boundaries, project layout, and deployment assumptions.",
    links: {
      repoUrl: "https://github.com/marshallepie/ArunaDoc",
      liveUrl: null,
    },
    lastUpdated: "2026-05-20",
  },
  {
    name: "MEMA",
    slug: "mema",
    type: "internal-tool",
    status: "Internal Only",
    summary:
      "Internal system that currently runs only on localhost and has not yet been positioned for hosted use.",
    purpose:
      "Support internal workflows as a local-only system until a hosting decision is made.",
    users: ["Marshall Epie", "internal only"],
    stack: {
      frontend: ["To be confirmed"],
      backend: ["To be confirmed"],
      database: ["To be confirmed"],
      billing: [],
      hosting: ["localhost"],
      integrations: [],
    },
    deployment: {
      environment: "local-only",
      hosting: "localhost",
      domain: null,
    },
    revenueModel: "internal operational leverage",
    blocker:
      "Lack of deployment strategy may limit adoption, testing, and integration opportunities.",
    nextAction:
      "Decide whether MEMA remains local-only, becomes a hosted internal tool, or moves toward a broader deployment path.",
    links: {
      repoUrl: "https://github.com/marshallepie/MEMA",
      liveUrl: null,
    },
    lastUpdated: "2026-05-20",
  },
  {
    name: "marshallepie.com",
    slug: "marshallepie-site",
    type: "website",
    status: "Live",
    summary:
      "Public marketing and routing hub for Marshall Epie's products, music, and electrical services.",
    purpose:
      "Act as the public-facing entry point into the wider Marshall Epie portfolio.",
    users: ["public visitors", "product leads", "service leads"],
    stack: {
      frontend: ["To be confirmed"],
      backend: ["To be confirmed"],
      database: ["Supabase"],
      billing: ["Stripe"],
      hosting: ["Netlify"],
      integrations: [],
    },
    deployment: {
      environment: "production",
      hosting: "Netlify",
      domain: "marshallepie.com",
    },
    revenueModel: "lead generation, portfolio routing, and brand presence",
    blocker:
      "Public messaging can drift away from current product priorities or active service offerings if it is not kept aligned.",
    nextAction:
      "Keep site navigation and messaging aligned with active products, services, and portfolio priorities.",
    links: {
      repoUrl: "https://github.com/marshallepie/marshallepie.com",
      liveUrl: "https://marshallepie.com",
    },
    lastUpdated: "2026-05-20",
  },
];

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
