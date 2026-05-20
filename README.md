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
- **MEPA** = internal operations, planning, coordination, and eventually dashboard-based control
- **Individual products** = JobBuilda, ArunaDoc, MEMA, The Drive, and future projects

## Current operating intent

Use this repository to:
- maintain a clean portfolio map
- track current project state
- capture decisions and operating rules
- store AI context and prompts
- define next actions clearly
- evolve toward a lightweight internal dashboard app

## Suggested repository structure

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
  projects/
    jobbuilda.md
    arunadoc.md
    mema.md
    marshallepie-site.md
    mepa.md
  prompts/
    initial-prompt.md
    mepa-system-prompt.md
  decisions/
    2026-05-20-mepa-repo-structure.md
  tasks/
    now.md
    backlog.md
  templates/
    project-template.md
    decision-template.md
```

## Working rules

1. Keep **one source of truth** for project status in `docs/project-status.md`.
2. Keep **one file per project** under `projects/`.
3. Log meaningful architectural or strategic changes in `decisions/`.
4. Keep `tasks/now.md` very short and current.
5. Move anything non-current to `tasks/backlog.md`.
6. Store prompt/system context under `prompts/`.
7. Treat this repo as the documentation-first foundation for a future internal app.

## Near-term goal

Stabilize the documentation and operating model first. Then build a dashboard app on top of that structure rather than improvising both at once.
