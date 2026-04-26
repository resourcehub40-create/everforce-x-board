# EverForce X Board — Backlog

Future enhancements, ranked by leverage. Top-tier ones are intentionally parked; the team needs ~2 weeks to populate the board first before the AI/import features pay off.

## Tier 1 — game-changers (do once the board has real data)

### Bulk-import cards from spreadsheet
One click → reads every row across all 16 tabs of `Everflow_26_Website_Refresh.xlsx` (Components / Forms / Main / Platform / Features / etc.) and creates a card per row with the right Section pre-set, page URL filled, label inferred (e.g. `cms` for Marketplace tab rows). ~600 ready-to-prioritize cards. Turns 4 hours of manual entry into 5 seconds.
- Hook: Resources tab → "Sync from spreadsheet" button
- Avoid duplicate imports: dedupe by `page_url` or `(section, title)`
- Re-runnable so spreadsheet updates flow into the board

### AI Draft button inside each card
A `✨ Draft` button in the card modal that hits Claude (or Gemini) with `AI_CONTEXT.md` + the card's section/title/page URL/audit grade → returns a first-pass copy rewrite, design brief, or fix proposal. Streams response directly into the description field so it's editable. The single biggest force multiplier given the volume of pages.
- Use Anthropic API or Gemini API (whichever has cheaper input caching)
- Gate behind env var so the team isn't billed accidentally
- Different prompts per `label` (copy vs design vs dev vs cms)

### Page screenshot on every card
The audit tool already has 137 full-page JPEGs in Supabase Storage `website-audit` bucket. When a card has a `page_url`, auto-show the thumbnail in the card list and full-size in the modal. Visual context = 10x faster review than reading URLs.
- Join on `page_url` → screenshot URL
- Stale check: re-run audit weekly, refresh thumbnails

## Tier 2 — workflow polish

### Live audit grade pull
Type/paste a URL → grade auto-fills from the audit tool's data, including the FOMO/AI/case-study sub-scores. Re-runs of the audit show grade *deltas* on cards (e.g. "C+ → B last week").

### "My week" view
A button next to Board/Resources that filters to just your assigned cards, grouped by column — a personal home page. Cuts the visual noise on a 600-card board.

## Tier 3 — integrations

### Slack daily digest
Cron-triggered Edge Function that summarizes the day's changes (new cards, moved cards, blocked cards, comments, files uploaded) and posts to #everforcex at 9am ET. Setup steps live in `supabase/functions/slack-daily-digest/README.md`.

### Slack slash command `/efx new`
Slash command that creates a card. Setup steps live in `supabase/functions/slack-slash/README.md`.

### Card → Jira one-click
Pre-populates a DANT board ticket from card fields. Needs Jira API token + project mapping.

### Section-progress dashboard
Stats view: per Section, how many cards are Done / In Progress / Blocked, audit grade trend over time. Re-run the audit weekly, show delta.

### Activity log → email digests
Currently activity log is in-app only. Add a weekly email digest of the cards each person owns + their activity stats.

---

## Already shipped

- ✅ 6-column kanban with drag-drop (Apr 26)
- ✅ Card CRUD with section / labels / assignees / page URL / audit grade
- ✅ Comments per card
- ✅ Resources tab w/ branded link cards
- ✅ Files tab w/ Supabase Storage upload + clean-name downloads
- ✅ Light theme matching Resource Hub
- ✅ AI_CONTEXT.md for team to feed Claude/Gemini
- ✅ Realtime sync (Apr 26)
- ✅ Per-card target date + countdown pills (Apr 26)
- ✅ Activity log per card (Apr 26)
- ✅ Slack notifications for new cards + @-mentions (Apr 26)
