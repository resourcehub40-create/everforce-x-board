import type { ColumnKey } from "./supabase";

export const COLUMNS: { key: ColumnKey; label: string; accent: string }[] = [
  { key: "backlog", label: "Backlog", accent: "#9494B8" },
  { key: "next", label: "Next Up", accent: "#6F4FF2" },
  { key: "in_progress", label: "In Progress", accent: "#3B82F6" },
  { key: "in_review", label: "In Review", accent: "#F59E0B" },
  { key: "blocked", label: "Blocked", accent: "#EF4444" },
  { key: "done", label: "Done", accent: "#10B981" },
];

export const ASSIGNEES = [
  "Jordan Barney",
  "Dasha",
  "Ceno Pant",
  "François Rousseau",
  "Brent Barnhart",
  "Tony Cohn",
  "Frank",
];

export const LABELS = [
  { key: "critical-fix", color: "#EF4444" },
  { key: "404", color: "#DC2626" },
  { key: "page-red", color: "#F87171" },
  { key: "page-yellow", color: "#FBBF24" },
  { key: "action-item", color: "#6F4FF2" },
  { key: "architectural", color: "#8B5CF6" },
  { key: "copy", color: "#10B981" },
  { key: "design", color: "#EC4899" },
  { key: "dev", color: "#3B82F6" },
  { key: "cms", color: "#06B6D4" },
];

export const RESOURCE_LINKS = [
  // Design
  { label: "Marketing Figma project", url: "https://www.figma.com/files/team/945681023634078066/project/591458922", group: "Design", note: "Project hub" },
  { label: "FigJam — Brainstorm (inspos)", url: "https://www.figma.com/board/BUdY1c1zPtLa3F0pesHBon/Brainstorm?node-id=0-1", group: "Design", note: "Drop competitor screenshots, inspo, ideas" },
  { label: "Main dev file — everflow.io 2026", url: "https://www.figma.com/design/8eEGp1j1kxC1xZolrHodxG/everflow.io-2026", group: "Design", note: "Edit: Ceno, Frank, Dasha · Comment-only for everyone else" },
  { label: "Mobbin (design inspo)", url: "https://mobbin.com/", group: "Design", note: "Quarter sub via ceno@everflow.io" },

  // Audit
  { label: "Audit tool (live)", url: "https://ef-website-audit.web.app/", group: "Audit", note: "256 pages, 119 graded · Gemini + Selenium" },
  { label: "Audit GitHub", url: "https://github.com/resourcehub40-create/everflow-audit", group: "Audit" },
  { label: "Board GitHub (this app)", url: "https://github.com/resourcehub40-create/everforce-x-board", group: "Audit" },

  // Planning — Jordan's epic doc, tab-by-tab
  { label: "Jordan's Epic Doc (root)", url: "https://docs.google.com/document/d/18PJHo7QR0FiL5CG3k3SR11wi_hR7SwvVBooflkCYCC8/edit", group: "Planning" },
  { label: "  → Strategy tab", url: "https://docs.google.com/document/d/18PJHo7QR0FiL5CG3k3SR11wi_hR7SwvVBooflkCYCC8/edit?tab=t.ak1e3fhbygqi#heading=h.yl1nm4k3w9hj", group: "Planning" },
  { label: "  → Scope tab", url: "https://docs.google.com/document/d/18PJHo7QR0FiL5CG3k3SR11wi_hR7SwvVBooflkCYCC8/edit?tab=t.8ujoxxekj9pr#heading=h.servfx9qnqa", group: "Planning" },
  { label: "  → Design + Build tab", url: "https://docs.google.com/document/d/18PJHo7QR0FiL5CG3k3SR11wi_hR7SwvVBooflkCYCC8/edit?tab=t.akb1qq1g5qe#heading=h.4nlyzkiyhv9h", group: "Planning" },
  { label: "  → Copy tab", url: "https://docs.google.com/document/d/18PJHo7QR0FiL5CG3k3SR11wi_hR7SwvVBooflkCYCC8/edit?tab=t.qtfz0ld0zz09#heading=h.qcwp1r18sssd", group: "Planning" },
  { label: "  → Open Questions tab", url: "https://docs.google.com/document/d/18PJHo7QR0FiL5CG3k3SR11wi_hR7SwvVBooflkCYCC8/edit?tab=t.6mq9bm1t52h#heading=h.ap0u9f2mfgpp", group: "Planning" },
  { label: "Everflow 26 — Website Refresh sheet", url: "https://docs.google.com/spreadsheets/d/1ycazU8me4hpAJMzqE2CIVlEUeB7GqQGzYu2P1I92-bM/edit?gid=1189879556#gid=1189879556", group: "Planning", note: "Ceno's source-of-truth page tracker" },

  // Comms
  { label: "#everforcex Slack", url: "https://everflow-team.slack.com/archives/everforcex", group: "Comms" },
];

export const DEADLINES = [
  { label: "AI ref live (homepage + pricing)", date: "2026-05-15" },
  { label: "Full refresh ship", date: "2026-06-30" },
];
