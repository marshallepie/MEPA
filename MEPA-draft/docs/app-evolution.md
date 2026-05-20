# MEPA App Evolution

## Direction

MEPA should eventually become a private app with a dashboard rather than remain only a documentation repository.

## Recommended path

### Step 1: Keep docs as the operating source
Use markdown now to discover the real objects and workflows that matter.

### Step 2: Normalize the data model
Before building UI, define the core entities:
- Project
- Status
- Blocker
- Decision
- Task
- Link
- Environment/Service

### Step 3: Build a lightweight admin dashboard
Recommended stack based on your broader ecosystem:
- Next.js
- TypeScript
- Tailwind CSS
- Supabase

### Step 4: Add AI interaction carefully
Potential interface areas:
- summarize project state
- draft next actions
- compare priorities
- identify blockers
- route to linked repos/docs

## MVP dashboard views

### Portfolio overview
- active projects
- status by category
- current blockers
- immediate priorities

### Project detail view
- summary
- stack
- deployment
- risks
- timeline of decisions
- open tasks

### Decision log
- searchable list of architectural and strategic decisions

### Task view
- now / next / later

## Key design principle

Do not build a fancy UI before the data model and operating rules are stable. The app should emerge from repeated use of the repo structure.
