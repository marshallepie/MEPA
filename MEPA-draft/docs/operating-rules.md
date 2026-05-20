# Operating Rules

## 1. Source-of-truth rules

- `docs/project-status.md` is the high-level status board.
- `projects/*.md` files hold the detailed operating notes for each project.
- `tasks/now.md` contains only current execution priorities.
- `tasks/backlog.md` contains non-current work.

## 2. Project status rules

Use only the following statuses unless there is a strong reason to expand:
- Idea
- Planning
- In Build
- Blocked
- Beta
- Live
- Internal Only
- Archived

## 3. Update cadence

Update these files whenever a meaningful change happens:
- status changes
- architecture changes
- deployment changes
- major blockers
- priority shifts
- decisions that affect more than one work session

## 4. Per-project documentation minimum

Each project file should include:
- one-sentence purpose
- current status
- current stack
- deployment location
- commercial model if relevant
- current blocker or risk
- next critical action

## 5. Decision logging

Add a new file in `decisions/` when:
- the project direction changes
- architecture changes materially
- a project is paused, merged, or re-scoped
- a new operating standard is adopted

## 6. AI operating guidance

- Keep prompts in `prompts/`
- Keep durable context in docs, not only inside prompts
- Prefer explicit written structure over memory-dependent workflows
- Convert repeated working patterns into documented templates or app features later

## 7. Build discipline for the future app

When the app/dashboard starts:
- the repo remains the operating source
- the app should read from or sync with structured project records
- do not bury critical operating knowledge inside UI-only state
