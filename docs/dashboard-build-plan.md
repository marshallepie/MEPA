# MEPA Dashboard Build Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build the first functional scaffold of the private MEPA dashboard so the repo has a usable app foundation alongside the operating documentation.

**Architecture:** The dashboard will live in `apps/dashboard/` as a Next.js App Router application. In V1 it will be documentation-backed and read-only, with typed mock data derived from the existing MEPA project records and tasks. The UI should prioritize operational clarity over polish.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, React, npm

---

### Task 1: Create the dashboard application shell

**Objective:** Generate a clean Next.js app in `apps/dashboard/` and confirm it runs.

**Files:**
- Create: `apps/dashboard/*`
- Modify: `apps/dashboard/package.json`

**Step 1: Scaffold the app**

Run:
```bash
npx create-next-app@latest apps/dashboard --ts --tailwind --eslint --app --src-dir --use-npm --yes
```

**Step 2: Verify project files exist**

Run:
```bash
find apps/dashboard -maxdepth 2 -type f | sort | head -50
```
Expected: app files, config files, and package manifest are present.

**Step 3: Install dependencies if needed**

Run:
```bash
cd apps/dashboard && npm install
```
Expected: install completes without errors.

**Step 4: Commit**

```bash
git add apps/dashboard
git commit -m "feat: scaffold initial dashboard app"
```

---

### Task 2: Add a minimal MEPA visual system

**Objective:** Replace the default starter content with a clean internal-dashboard shell.

**Files:**
- Modify: `apps/dashboard/src/app/page.tsx`
- Modify: `apps/dashboard/src/app/layout.tsx`
- Modify: `apps/dashboard/src/app/globals.css`

**Step 1: Replace starter home page**
Create a homepage with:
- header
- portfolio summary cards
- active priorities
- project quick view
- decisions section placeholder

**Step 2: Set app metadata**
Update title and description to reflect MEPA.

**Step 3: Simplify global styles**
Keep the styling operational, dark, and minimal.

**Step 4: Verify**
Run:
```bash
cd apps/dashboard && npm run lint
```
Expected: PASS

**Step 5: Commit**

```bash
git add apps/dashboard/src/app
git commit -m "feat: add MEPA dashboard shell"
```

---

### Task 3: Add typed dashboard data

**Objective:** Introduce a small typed data layer so the UI is driven by structured records rather than hardcoded page markup.

**Files:**
- Create: `apps/dashboard/src/lib/dashboard-data.ts`
- Create: `apps/dashboard/src/lib/types.ts`
- Modify: `apps/dashboard/src/app/page.tsx`

**Step 1: Define types**
Add types for:
- Project
- PriorityItem
- DecisionSummary

**Step 2: Add starter data**
Seed data for:
- JobBuilda
- ArunaDoc
- MEMA
- MEPA
- marshallepie.com

**Step 3: Render from data**
Make the homepage map over typed arrays rather than duplicating UI blocks manually.

**Step 4: Verify**
Run:
```bash
cd apps/dashboard && npm run lint
```
Expected: PASS

**Step 5: Commit**

```bash
git add apps/dashboard/src
git commit -m "feat: add typed dashboard seed data"
```

---

### Task 4: Add project list and detail routes

**Objective:** Create the first navigable information architecture for projects.

**Files:**
- Create: `apps/dashboard/src/app/projects/page.tsx`
- Create: `apps/dashboard/src/app/projects/[slug]/page.tsx`
- Create: `apps/dashboard/src/lib/project-utils.ts`
- Modify: `apps/dashboard/src/app/page.tsx`

**Step 1: Create projects list page**
Display all projects with status, summary, risk, and next action.

**Step 2: Create dynamic project detail route**
Render one project detail page by slug.

**Step 3: Add shared lookup utility**
Use a single helper to resolve projects by slug.

**Step 4: Link overview cards to routes**
Homepage cards should click through to detail pages.

**Step 5: Verify**
Run:
```bash
cd apps/dashboard && npm run lint
```
Expected: PASS

**Step 6: Commit**

```bash
git add apps/dashboard/src
git commit -m "feat: add project routes"
```

---

### Task 5: Add read-only priorities and decisions views

**Objective:** Make the MVP navigation reflect the operating model documented in MEPA.

**Files:**
- Create: `apps/dashboard/src/app/now/page.tsx`
- Create: `apps/dashboard/src/app/decisions/page.tsx`
- Modify: `apps/dashboard/src/lib/dashboard-data.ts`
- Modify: `apps/dashboard/src/app/page.tsx`

**Step 1: Add priorities page**
Show current priorities clearly in ranked order.

**Step 2: Add decisions page**
Show recent decisions in a simple readable layout.

**Step 3: Reuse seed data**
Keep the data source centralized.

**Step 4: Verify**
Run:
```bash
cd apps/dashboard && npm run lint
```
Expected: PASS

**Step 5: Commit**

```bash
git add apps/dashboard/src
git commit -m "feat: add priorities and decisions views"
```

---

### Task 6: Verify the scaffold end to end

**Objective:** Ensure the dashboard can run locally and is understandable to a future implementer.

**Files:**
- Modify: `apps/dashboard/README.md`
- Modify: `README.md`

**Step 1: Add dashboard run instructions**
Document how to install and run the app locally.

**Step 2: Link the dashboard from the root repo README**
Explain that the app is the first application layer over the MEPA docs.

**Step 3: Run final checks**
Run:
```bash
cd apps/dashboard && npm run lint
```

Then:
```bash
cd apps/dashboard && npm run build
```
Expected: both commands pass.

**Step 4: Commit**

```bash
git add README.md apps/dashboard/README.md
git commit -m "docs: add dashboard app usage notes"
```

---

## Verification Checklist

- [ ] `apps/dashboard/` exists and installs cleanly
- [ ] homepage reflects MEPA rather than default Next.js starter content
- [ ] project list and detail routes work
- [ ] priorities and decisions pages exist
- [ ] lint passes
- [ ] production build passes
- [ ] root README references the dashboard app

## Immediate Next Step After This Plan

Execute Tasks 1 and 2 first to establish the application shell, then iterate toward dynamic data loading from the MEPA project records.
