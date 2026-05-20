# MEPA Dashboard

This app is the first application layer for MEPA.

It is a private Next.js dashboard intended to sit on top of the MEPA operating repository and provide a direct interface for:
- portfolio overview
- project detail views
- current priorities
- recorded decisions

## Current state

This version is a read-only scaffold backed by typed seed data derived from the MEPA documentation structure.

## Run locally

```bash
cd apps/dashboard
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
cd apps/dashboard
npm run lint
npm run build
```

## Near-term direction

- replace seed data with parsed project records or a structured data source
- connect priorities and decisions to repo-backed content
- add controlled editing once the schema is stable
