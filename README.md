# MEPA

Marshall Epie Portfolio Assistant (MEPA) is the internal operating system for Marshall Epie's portfolio of products, services, decisions, and priorities.

## Purpose

MEPA exists to reduce cognitive load and create continuity across:
- product strategy
- technical operations
- documentation
- project status tracking
- AI-assisted execution

It is **not** the public brand site and it is **not** a single product app. It is the internal command layer for the Marshall Epie portfolio.

## Relationship to the wider portfolio

- **Marshall Epie Technologies** = umbrella identity for products and services created by Marshall Epie
- **marshallepie.com** = public marketing and routing hub
- **MEPA** = internal operations, planning, coordination, and dashboard-based control
- **Individual products** = JobBuilda, ArunaDoc, MEMA, The Drive, and future projects

## Current operating intent

Use this repository to:
- maintain a clean portfolio map
- track current project state
- capture decisions and operating rules
- store AI context and prompts
- define next actions clearly
- evolve the internal dashboard app in a controlled way

## Repository structure

```text
MEPA/
  README.md
  docs/
    vision.md
    portfolio-map.md
    operating-rules.md
    project-status.md
    roadmap.md
    app-evolution.md
    dashboard-mvp.md
    project-registry-schema.md
    dashboard-build-plan.md
  projects/
    jobbuilda.md
    arunadoc.md
    mema.md
    marshallepie-site.md
    mepa.md
  prompts/
    mepa_context_markdown_files/
    mepa_operational_context_markdown_structure.md
  decisions/
    2026-05-20-mepa-repo-structure.md
  tasks/
    now.md
    backlog.md
  templates/
    project-template.md
    decision-template.md
  apps/
    dashboard/
```

## Dashboard app

The first application layer lives in:

- `apps/dashboard`

It is currently a read-only Next.js scaffold that presents:
- portfolio overview
- project registry view
- current priorities
- decision log

Run it locally:

```bash
cd apps/dashboard
npm install
npm run dev
```

## Working rules

1. Keep **one source of truth** for high-level status in `docs/project-status.md`.
2. Keep **one file per project** under `projects/`.
3. Log meaningful architectural or strategic changes in `decisions/`.
4. Keep `tasks/now.md` very short and current.
5. Move anything non-current to `tasks/backlog.md`.
6. Store prompt/system context under `prompts/`.
7. Keep the repo as the durable operating layer even as the dashboard app grows.

## Near-term goal

Normalize project records, keep the dashboard aligned with the operating docs, and gradually move from seed data toward structured live portfolio data.
