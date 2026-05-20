# MEPA Dashboard MVP

## Purpose

The MEPA dashboard MVP is the first application layer on top of the MEPA operating repository.

Its purpose is to give Marshall Epie one private operational interface for:
- viewing portfolio status
- tracking active priorities
- identifying blockers
- reviewing project details
- maintaining continuity across products, services, and internal systems

This dashboard is not intended to be a full platform at first.

It is intended to be a focused internal control panel.

---

## MVP Goal

Build the smallest useful dashboard that gives immediate operational visibility across the portfolio.

The MVP should answer these questions quickly:

- What projects exist?
- What status is each project in?
- What matters now?
- What is blocked?
- What is the next critical action for each project?
- What decisions have been made recently?

---

## Primary User

### Primary user
- Marshall Epie

### User profile
- founder / operator
- works across multiple projects at once
- needs direct, structured, low-friction visibility
- benefits from continuity, prioritization, and reduced cognitive load

### Usage style
The dashboard should support:
- fast scanning
- low-friction updates
- direct navigation to project detail
- clear distinction between now, next, and blocked work

---

## MVP Principles

1. **Clarity over complexity**
   - the dashboard should be readable in seconds

2. **Operational value first**
   - no decorative features without practical use

3. **Manual input is acceptable at MVP stage**
   - automation can come later

4. **Documentation remains the source of truth initially**
   - the app should reflect the repo structure and operating model

5. **Private internal tool first**
   - no public-facing product requirements at MVP stage

---

## Core MVP Features

### 1. Portfolio overview
A dashboard homepage showing all tracked projects in a concise format.

Each project card should display:
- project name
- status
- type
- short summary
- current blocker or risk
- next critical action

This view should make it obvious:
- what is active
- what is blocked
- what is internal only
- what is live

---

### 2. Project detail view
A dedicated page for each project.

Each project detail page should show:
- purpose
- status
- type
- users
- stack
- deployment
- billing / revenue model
- current state
- blocker or risk
- next critical action
- repo link
- live/deploy link if available
- related notes or decisions

---

### 3. Current priorities view
A lightweight view based on `tasks/now.md`.

This should show:
- current priorities
- immediate operational focus
- anything requiring attention now

This view should be short and intentionally constrained.

---

### 4. Backlog view
A lightweight view based on `tasks/backlog.md`.

This should show:
- deferred work
- future improvements
- non-current ideas
- structured next-later items

---

### 5. Decisions log
A view for important operating and architectural decisions.

Each decision entry should show:
- title
- date
- status
- context
- decision
- consequences

This view should help preserve continuity and reduce repeated re-analysis.

---

## Out of Scope for MVP

The following should **not** be part of V1 unless there is a strong practical reason:

- team collaboration workflows
- public sharing
- complex permissions
- heavy analytics
- chat-first UI as the main interface
- advanced automation
- deployment health monitoring
- billing management
- cross-project dependency graphs
- fully autonomous agent workflows

These can come later if real usage justifies them.

---

## Suggested Information Architecture

### Main navigation
- Overview
- Projects
- Now
- Backlog
- Decisions

### Optional later navigation
- Links
- Services
- Automations
- AI Actions
- Weekly Review

---

## Suggested MVP Screens

### Screen 1: Overview
Purpose:
- immediate operational snapshot

Contains:
- total tracked projects
- projects by status
- blocked projects
- current priorities
- recent decisions

---

### Screen 2: Projects list
Purpose:
- browse all projects in one place

Contains:
- searchable/filterable project list
- filters by status
- filters by type
- click-through to project detail

---

### Screen 3: Project detail
Purpose:
- single project operating record

Contains:
- structured project profile
- operating notes
- risks
- next action
- useful links

---

### Screen 4: Current priorities
Purpose:
- focus view for what matters now

Contains:
- short ordered list of active priorities
- direct links to related projects

---

### Screen 5: Decision log
Purpose:
- continuity and historical reasoning

Contains:
- decision list
- sortable by date
- searchable by title/topic
- links to related project records

---

## MVP Data Model

The MVP should use a small set of core entities.

### Project
Fields:
- id
- name
- slug
- status
- type
- summary
- purpose
- users
- stack
- deployment
- revenue_model
- blocker
- next_action
- repo_url
- live_url
- notes
- updated_at

### Task Group
Fields:
- id
- title
- category
- items
- updated_at

Examples:
- now
- backlog

### Decision
Fields:
- id
- title
- date
- status
- context
- decision
- consequences_positive
- consequences_tradeoffs
- related_projects

---

## Source of Truth Strategy

### Initial phase
The repo remains the source of truth:
- `projects/*.md`
- `tasks/now.md`
- `tasks/backlog.md`
- `decisions/*.md`

### App role in MVP
The app should:
- read and present structured information
- reduce friction in navigating and reviewing it
- eventually evolve into a controlled editing layer

### Important rule
Do not let important operating knowledge exist only inside the UI.

The documentation layer must remain durable and portable.

---

## Suggested Tech Stack

Based on the broader Marshall Epie stack, the MVP should likely use:

- Next.js
- TypeScript
- Tailwind CSS
- Supabase

### Recommended use of Supabase
Use Supabase when one or more of these become necessary:
- auth for private access
- structured records
- editable project data
- audit history
- app-native task updates

If the first version is purely read-only, the dashboard can start without a full DB-first implementation.

---

## MVP Build Strategy

### Stage 1
Read-only dashboard from the existing MEPA structure.

Goal:
- prove the information architecture
- prove the screens are useful
- identify missing fields

### Stage 2
Normalize project and decision data.

Goal:
- make parsing reliable
- support structured filtering and sorting

### Stage 3
Add controlled editing.

Goal:
- update project records from the dashboard
- keep documentation and UI aligned

### Stage 4
Add AI-assisted operating actions.

Examples:
- summarize project health
- suggest next actions
- detect stale records
- generate weekly portfolio review

---

## MVP Success Criteria

The dashboard MVP is successful if Marshall can:

- open one screen and understand portfolio status quickly
- identify current priorities without digging through notes
- see which projects are blocked and why
- open a project and understand its operating state immediately
- review key decisions without relying on memory alone

---

## Risks

### 1. Overbuilding too early
Risk:
- dashboard becomes ambitious before the operating model is stable

Mitigation:
- keep V1 narrow and read-only if needed

### 2. Inconsistent data structure
Risk:
- project files vary too much to support reliable app views

Mitigation:
- adopt a strict project schema

### 3. UI becomes source of truth
Risk:
- operational knowledge drifts away from durable documentation

Mitigation:
- keep docs/repo as canonical until the app is mature

---

## Recommended Next Step After This Document

After this document is added, create:

- `docs/project-registry-schema.md`
- frontmatter or structured schema for `projects/*.md`
- a first wireframe or build plan for the Overview and Project Detail screens
