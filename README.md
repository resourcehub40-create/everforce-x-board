# EverForce X — Task Force Board

Internal kanban for the everflow.io website refresh task force (Apr–Jun 2026).

**Live:** https://everforce-x-board.web.app (will move to `board.everflow-resource-hub.com`)
**Repo:** `resourcehub40-create/everforce-x-board`
**Task force:** Jordan, Dasha, Ceno, François, Brent, Tony, Frank

## Auth

Single shared password + `*@everflow.io` email gate. Password lives in `VITE_BOARD_PASSWORD` (currently `everforce-x-2026`). Rotate by updating `.env.local`, rebuilding, and redeploying.

## Stack

- Vite + React + TypeScript + Tailwind
- `@dnd-kit` for drag-drop
- Supabase (Resource Hub instance `ywtsgnjvhykkjnrzmjtg`) — tables `wa_cards`, `wa_comments`
- Firebase Hosting on `neural-engine-493901-h8`, site `everforce-x-board`

## Local dev

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # produces dist/
```

`.env.local` (gitignored) holds Supabase keys + board password. See `.env.example`.

## Deploy

```bash
npm run build
firebase deploy --only hosting --project neural-engine-493901-h8
```

## Schema

`supabase/migrations/0001_init.sql` — applied via Supabase Mgmt API. Re-runnable (uses `if not exists`).

## v1 follow-ups

- File uploads to Supabase Storage bucket `everforce-x-files` (Resources tab)
- Activity log (who moved/edited what)
- Audit-tool integration — pull live grades from `ef-website-audit.web.app` per card
- Realtime sync via Supabase channels
- Custom domain wired to `board.everflow-resource-hub.com`
- Card seeding from KICKOFF_NOTES (12 critical fixes + Red/Yellow page tiers)
