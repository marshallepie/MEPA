---
name: MEPA
slug: mepa
type: ops-system
status: Planning
summary: Internal portfolio operating system intended to evolve from a documentation-first repo into a private dashboard app.
users:
  - Marshall Epie
stack:
  frontend:
    - Next.js (planned)
    - TypeScript (planned)
    - Tailwind CSS (planned)
  backend:
    - Supabase (planned)
  database:
    - PostgreSQL via Supabase (planned)
  billing: []
  hosting:
    - GitHub (repo)
    - future app hosting to be confirmed
  integrations:
    - GitHub
    - project docs
    - future AI orchestration

deployment:
  environment: internal
  hosting: GitHub repository
  domain: null
revenue_model: internal operational leverage
links:
  repo_url: https://github.com/marshallepie/MEPA
  live_url: null
  staging_url: null
  docs_url: null
  figma_url: null
  stripe_notes: null
  supabase_project: planned
last_updated: 2026-05-20
---

# MEPA

## Purpose
MEPA exists to provide continuity, structure, and operational visibility across the Marshall Epie portfolio.

## Current State
- Documentation-first repo has been created
- Prompt/context files and operating docs now exist
- Dashboard MVP and project registry schema have been defined
- Next step is to scaffold the first application layer on top of the operating docs

## Blocker or Risk
- Without normalized records and an app structure, MEPA could drift back into fragmented notes and prompt sprawl

## Next Critical Action
- Build the first dashboard scaffold and align project records to the documented schema

## Notes
- MEPA should remain the internal operating layer rather than becoming a public-facing product
