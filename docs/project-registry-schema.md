# Project Registry Schema

## Purpose

This document defines the standard structure for all project records inside MEPA.

The goal is to make project information:
- consistent
- easy to update
- easy to scan
- easy to parse later for the dashboard app

Every project in `projects/` should follow this schema.

---

## Design Principles

1. **One project, one file**
2. **Use the same headings in the same order**
3. **Keep summaries short and operational**
4. **Capture only durable, relevant project information**
5. **Prefer explicit fields over freeform notes**
6. **Make the file readable by both humans and software**

---

## File Naming Convention

Each project file should use a stable lowercase slug:

- `jobbuilda.md`
- `arunadoc.md`
- `mema.md`
- `mepa.md`
- `marshallepie-site.md`

Use hyphens instead of spaces.

---

## Required Fields

Each project record should contain the following top-level fields.

### 1. Name
Human-readable project name.

Example:
- JobBuilda
- ArunaDoc
- marshallepie.com

---

### 2. Slug
Stable internal identifier used by the app and repo.

Example:
- `jobbuilda`
- `arunadoc`
- `mepa`

---

### 3. Type
Defines what kind of entity the record describes.

Allowed values:
- product
- internal-tool
- website
- service
- platform
- research
- ops-system
- archive

---

### 4. Status
Defines the current lifecycle state.

Allowed values:
- Idea
- Planning
- In Build
- Blocked
- Beta
- Live
- Internal Only
- Archived

Only use these unless a deliberate schema revision is made.

---

### 5. Summary
A short operational description of the project.

Recommended length:
- 1 to 3 sentences

Purpose:
- help scanning
- give immediate context on list views

---

### 6. Purpose
Why the project exists.

This should answer:
- what problem it solves
- what role it plays in the portfolio
- why it matters

---

### 7. Users
Who the project is for.

Examples:
- internal only
- job seekers
- employers
- Marshall Epie
- public visitors
- music audience
- electrical services clients

---

### 8. Stack
The main technologies involved.

Recommended subfields:
- frontend
- backend
- database
- billing
- hosting
- integrations

---

### 9. Deployment
How and where the project runs.

Recommended subfields:
- environment
- hosting
- domain
- repo
- live_url

---

### 10. Revenue Model
How the project creates value commercially or operationally.

Examples:
- subscription
- service lead generation
- internal operational leverage
- not yet defined
- one-time payment
- marketplace

---

### 11. Current State
A short list of the most relevant present-tense facts about the project.

Examples:
- in beta
- localhost only
- backend blocked
- public site live
- auth implemented
- deployment pending

---

### 12. Blocker or Risk
The main current constraint, dependency, or threat.

Examples:
- backend architecture unclear
- no deployment path
- undefined launch criteria
- incomplete billing flow

---

### 13. Next Critical Action
The single most important next step.

This should be specific and operational.

Bad:
- improve project

Good:
- define beta exit criteria and identify top 5 launch blockers

---

### 14. Links
Useful references.

Recommended subfields:
- repo_url
- live_url
- staging_url
- docs_url
- figma_url
- stripe_notes
- supabase_project

Only include what exists.

---

### 15. Last Updated
A date field showing when the project record was last meaningfully updated.

Format:
- `YYYY-MM-DD`

---

## Recommended File Format

Use this structure for every project file.

```md
---
name: Project Name
slug: project-slug
type: product
status: Planning
summary: Short operational summary of the project.
users:
  - internal
stack:
  frontend:
    - Next.js
    - TypeScript
  backend:
    - Supabase
  database:
    - PostgreSQL
  billing:
    - Stripe
  hosting:
    - Netlify
deployment:
  environment: production
  hosting: Netlify
  domain: example.com
revenue_model: subscription
links:
  repo_url: https://github.com/example/repo
  live_url: https://example.com
last_updated: 2026-05-20
---

# Project Name

## Purpose
Explain why the project exists.

## Current State
- Relevant fact
- Relevant fact

## Blocker or Risk
- Main blocker or risk

## Next Critical Action
- The one next action that matters most

## Notes
- Optional supporting notes
```

---

## Standard Heading Order

Below the frontmatter, keep this exact heading order:

1. `# Project Name`
2. `## Purpose`
3. `## Current State`
4. `## Blocker or Risk`
5. `## Next Critical Action`
6. `## Notes`

This keeps every file predictable.

---

## Field Rules

### Status rule
Use exactly one status value from the approved list.

### Summary rule
Keep it short enough to display in cards and lists.

### Next action rule
Only one primary next action should be listed.

### Notes rule
Use notes only for useful supporting detail.
Do not let notes become a dumping ground.

### Last updated rule
Update the date whenever:
- status changes
- blocker changes
- next action changes
- deployment changes
- structure or direction changes materially

---

## Example: Product

```md
---
name: JobBuilda
slug: jobbuilda
type: product
status: Beta
summary: Beta-stage product currently running and needing a clearer hardening path.
users:
  - job seekers
  - employers
stack:
  frontend:
    - Next.js
    - TypeScript
  backend:
    - Supabase
  database:
    - PostgreSQL
  billing:
    - Stripe
  hosting:
    - Netlify
deployment:
  environment: beta
  hosting: Netlify
  domain: null
revenue_model: subscription
links:
  repo_url: https://github.com/marshallepie/jobbuilda
  live_url: null
last_updated: 2026-05-20
---

# JobBuilda

## Purpose
JobBuilda is a portfolio product intended to serve users in the hiring and job-seeking space.

## Current State
- Up and running in beta
- Requires clearer beta review and hardening criteria

## Blocker or Risk
- Risk of remaining in indefinite beta without explicit release readiness criteria

## Next Critical Action
- Define beta exit criteria and identify the most important launch blockers

## Notes
- Add deployment link and confirmed stack details once verified
```

---

## Example: Internal System

```md
---
name: MEPA
slug: mepa
type: ops-system
status: Planning
summary: Internal portfolio operating system intended to evolve into a private dashboard app.
users:
  - Marshall Epie
stack:
  frontend: []
  backend: []
  database: []
  billing: []
  hosting: []
deployment:
  environment: internal
  hosting: GitHub
  domain: null
revenue_model: internal operational leverage
links:
  repo_url: https://github.com/marshallepie/MEPA
  live_url: null
last_updated: 2026-05-20
---

# MEPA

## Purpose
MEPA exists to provide continuity, structure, and operational visibility across the Marshall Epie portfolio.

## Current State
- Documentation-first operating repo created
- Prompt files and operating docs now exist
- Intended future state is a private dashboard app

## Blocker or Risk
- Without normalized structure, the system could drift into fragmented notes and prompt sprawl

## Next Critical Action
- Normalize project records and define the dashboard MVP architecture

## Notes
- Future stack is likely Next.js, TypeScript, Tailwind, and Supabase
```

---

## Migration Guidance for Existing Files

Existing project files may already contain useful content without frontmatter.

To migrate them:
1. add frontmatter first
2. preserve existing meaning
3. shorten repeated text
4. move durable facts into structured fields
5. keep narrative notes minimal

---

## App Readiness Goal

This schema is considered successful when:
- every project file is consistent
- the dashboard can parse project records reliably
- filtering by status and type is easy
- next actions can be surfaced automatically
- project cards can be generated without manual rewriting

---

## Recommended Next Step

After adopting this schema:
1. update all current files in `projects/`
2. normalize status values
3. fill in repo and deployment links
4. use this structure as the basis for the MEPA dashboard data model
