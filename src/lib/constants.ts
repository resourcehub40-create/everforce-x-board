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
];

// Work-type + issue tags. Mapped to the kickoff call:
// "two-sides-of-a-page" → ai-messaging + fomo-fix · structural changes → architectural
// case-study integration → case-study · automation work (CMS, distro) → automation
export const LABELS = [
  { key: "critical-fix", color: "#DC2626" },
  { key: "404", color: "#B91C1C" },
  { key: "copy", color: "#10996B" },
  { key: "design", color: "#EC4899" },
  { key: "dev", color: "#2563EB" },
  { key: "cms", color: "#0891B2" },
  { key: "content", color: "#D97706" },
  { key: "architectural", color: "#7C3AED" },
  { key: "automation", color: "#0F766E" },
  { key: "ai-messaging", color: "#4F46E5" },
  { key: "fomo-fix", color: "#EA580C" },
  { key: "case-study", color: "#E11D48" },
  { key: "action-item", color: "#6F2DBD" },
];

// Mirrors the tabs in Everflow_26_Website_Refresh.xlsx so cards map 1:1 back to the sheet.
// Plus cross-cutting buckets for work that spans multiple sections.
export const SECTIONS = [
  { key: "components", label: "Components", group: "Design system" },
  { key: "design-system", label: "Design tokens", group: "Design system" },
  { key: "forms", label: "Forms", group: "Design system" },
  { key: "thumbnails", label: "Thumbnails", group: "Design system" },
  { key: "main", label: "Main pages", group: "Pages" },
  { key: "platform", label: "Platform", group: "Pages" },
  { key: "features", label: "Features", group: "Pages" },
  { key: "solutions", label: "Solutions", group: "Pages" },
  { key: "action-plan", label: "Action Plan", group: "Pages" },
  { key: "partner", label: "Partner pages", group: "Pages" },
  { key: "resources", label: "Resources / Academy", group: "Pages" },
  { key: "cms", label: "CMS templates", group: "Pages" },
  { key: "marketplace", label: "Marketplace (CMS)", group: "Pages" },
  { key: "tech-partners", label: "Tech Partners (CMS)", group: "Pages" },
  { key: "legal", label: "Legal", group: "Pages" },
  { key: "other", label: "Other pages", group: "Pages" },
  { key: "architectural", label: "Architectural / IA", group: "Cross-cutting" },
  { key: "automation", label: "Automation / CMS pipeline", group: "Cross-cutting" },
  { key: "ai-push", label: "May 15 AI push", group: "Cross-cutting" },
  { key: "audit", label: "Audit / measurement", group: "Cross-cutting" },
];

export type ResourceLink = {
  label: string;
  url: string;
  group: "Design" | "Audit" | "Planning" | "Comms";
  brand: "figma" | "figjam" | "gdocs" | "gsheets" | "github" | "slack" | "mobbin" | "audit" | "link";
  note?: string;
  indent?: boolean;
};

export const RESOURCE_LINKS: ResourceLink[] = [
  // Design
  { label: "Marketing Figma project", url: "https://www.figma.com/files/team/945681023634078066/project/591458922", group: "Design", brand: "figma", note: "Project hub — all marketing files live here" },
  { label: "FigJam — Brainstorm (inspos)", url: "https://www.figma.com/board/BUdY1c1zPtLa3F0pesHBon/Brainstorm?node-id=0-1", group: "Design", brand: "figjam", note: "Drop competitor screenshots, inspo, ideas — everyone can edit" },
  { label: "Main dev file — everflow.io 2026", url: "https://www.figma.com/design/8eEGp1j1kxC1xZolrHodxG/everflow.io-2026", group: "Design", brand: "figma", note: "Edit: Ceno, François, Dasha. Comment-only for everyone else." },
  { label: "Mobbin (design inspo)", url: "https://mobbin.com/", group: "Design", brand: "mobbin", note: "Quarter sub via ceno@everflow.io" },

  // Audit
  { label: "Audit tool — live grades", url: "https://ef-website-audit.web.app/", group: "Audit", brand: "audit", note: "256 pages · 119 graded · Gemini + Selenium · re-runnable" },
  { label: "Audit GitHub repo", url: "https://github.com/resourcehub40-create/everflow-audit", group: "Audit", brand: "github" },
  { label: "Board GitHub repo (this app)", url: "https://github.com/resourcehub40-create/everforce-x-board", group: "Audit", brand: "github" },

  // Planning — Jordan's epic doc, tab-by-tab
  { label: "Jordan's Epic Doc", url: "https://docs.google.com/document/d/18PJHo7QR0FiL5CG3k3SR11wi_hR7SwvVBooflkCYCC8/edit", group: "Planning", brand: "gdocs", note: "Source of truth — all 5 tabs below" },
  { label: "Strategy tab", url: "https://docs.google.com/document/d/18PJHo7QR0FiL5CG3k3SR11wi_hR7SwvVBooflkCYCC8/edit?tab=t.ak1e3fhbygqi#heading=h.yl1nm4k3w9hj", group: "Planning", brand: "gdocs", indent: true },
  { label: "Scope tab", url: "https://docs.google.com/document/d/18PJHo7QR0FiL5CG3k3SR11wi_hR7SwvVBooflkCYCC8/edit?tab=t.8ujoxxekj9pr#heading=h.servfx9qnqa", group: "Planning", brand: "gdocs", indent: true },
  { label: "Design + Build tab", url: "https://docs.google.com/document/d/18PJHo7QR0FiL5CG3k3SR11wi_hR7SwvVBooflkCYCC8/edit?tab=t.akb1qq1g5qe#heading=h.4nlyzkiyhv9h", group: "Planning", brand: "gdocs", indent: true },
  { label: "Copy tab", url: "https://docs.google.com/document/d/18PJHo7QR0FiL5CG3k3SR11wi_hR7SwvVBooflkCYCC8/edit?tab=t.qtfz0ld0zz09#heading=h.qcwp1r18sssd", group: "Planning", brand: "gdocs", indent: true },
  { label: "Open Questions tab", url: "https://docs.google.com/document/d/18PJHo7QR0FiL5CG3k3SR11wi_hR7SwvVBooflkCYCC8/edit?tab=t.6mq9bm1t52h#heading=h.ap0u9f2mfgpp", group: "Planning", brand: "gdocs", indent: true },
  { label: "Everflow 26 — Website Refresh sheet", url: "https://docs.google.com/spreadsheets/d/1ycazU8me4hpAJMzqE2CIVlEUeB7GqQGzYu2P1I92-bM/edit?gid=1189879556#gid=1189879556", group: "Planning", brand: "gsheets", note: "Ceno's source-of-truth page tracker" },

  // Comms
  { label: "#everforcex Slack channel", url: "https://everflow-team.slack.com/archives/everforcex", group: "Comms", brand: "slack" },
];

export const STORAGE_BUCKET = "everforce-x-files";

export const DEADLINES = [
  { label: "AI ref live (homepage + pricing)", date: "2026-05-15" },
  { label: "Full refresh ship", date: "2026-06-30" },
];
