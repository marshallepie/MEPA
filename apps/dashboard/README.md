# MEPA Dashboard

This app is the first application layer for MEPA.

It is a private Next.js dashboard intended to sit on top of the MEPA operating repository and provide a direct interface for:
- portfolio overview
- project detail views
- current priorities
- recorded decisions

## Current state

This version is a read-only dashboard backed by real repo markdown records:
- `projects/*.md`
- `tasks/now.md`
- `decisions/*.md`

## Local runtime standard

The dashboard is pinned to:
- Node `20.19.2`
- npm `9.x`

If you use `nvm`:

```bash
cd apps/dashboard
nvm use
```

## Run locally

For normal repo sync and local development, use `npm ci` instead of `npm install`.

```bash
cd apps/dashboard
nvm use  # if available
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Sync after pulling from origin

Use this when the repo changes and you want your local dependencies to match the committed lockfile exactly:

```bash
git pull
cd apps/dashboard
nvm use  # if available
npm ci
npm run dev
```

## Recover from local dependency drift

If local dependencies or generated files get out of sync:

```bash
cd apps/dashboard
rm -rf node_modules .next
git restore package.json package-lock.json
nvm use  # if available
npm ci
```

## Quality checks

```bash
cd apps/dashboard
nvm use  # if available
npm ci
npm run lint
npm run build
```
