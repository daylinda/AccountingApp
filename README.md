# Accounting Firm App

A web-based dashboard for accounting firms to manage clients, tasks, reports, and communications.

**Live demo:** https://daylinda.github.io/AccountingApp/

## Features

- **Dashboard** — overview of active clients, pending tasks, reports due, and recent activity
- **Client Portfolio** — searchable client list with status, revenue, and contact info
- **Checklist** — track tasks and deadlines
- **Reports** — generate and view financial reports
- **Chat** — built-in assistant for quick help

## Tech Stack

- React 18 + TypeScript
- Vite
- React Router v7
- Tailwind CSS v4
- shadcn/ui + Radix UI
- MUI (Material UI)

## Getting Started

```bash
cd "Build Accounting Firm App"
pnpm install
pnpm dev
```

Open http://localhost:5173

## Build

```bash
pnpm build
```

Output goes to `dist/`.

## Deployment

Deployed automatically to GitHub Pages via GitHub Actions on every push to `main`. See `.github/workflows/deploy.yml`.
