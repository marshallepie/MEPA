export type ProjectStatus =
  | "Idea"
  | "Planning"
  | "In Build"
  | "Blocked"
  | "Beta"
  | "Live"
  | "Internal Only"
  | "Archived";

export type ProjectType =
  | "product"
  | "internal-tool"
  | "website"
  | "service"
  | "platform"
  | "research"
  | "ops-system"
  | "archive";

export interface ProjectRecord {
  name: string;
  slug: string;
  type: ProjectType;
  status: ProjectStatus;
  summary: string;
  purpose: string;
  users: string[];
  stack: {
    frontend: string[];
    backend: string[];
    database: string[];
    billing: string[];
    hosting: string[];
    integrations: string[];
  };
  deployment: {
    environment: string;
    hosting: string;
    domain: string | null;
  };
  revenueModel: string;
  blocker: string;
  nextAction: string;
  notes: string;
  links: {
    repoUrl: string | null;
    liveUrl: string | null;
  };
  lastUpdated: string;
}

export interface PriorityItem {
  title: string;
  detail: string;
  relatedProject?: string;
}

export interface DecisionSummary {
  title: string;
  date: string;
  status: "Accepted" | "Proposed" | "Superseded";
  summary: string;
  relatedProjects: string[];
}
