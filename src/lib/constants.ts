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
  { label: "Figma — EF26", url: "https://www.figma.com/design/S8ubpldeIUE84RcjYUo5ZO/EF26", group: "Design" },
  { label: "Audit tool (live)", url: "https://ef-website-audit.web.app/", group: "Audit" },
  { label: "Audit GitHub", url: "https://github.com/resourcehub40-create/everflow-audit", group: "Audit" },
  { label: "Board GitHub", url: "https://github.com/resourcehub40-create/everforce-x-board", group: "Audit" },
  { label: "Ceno's planning sheet", url: "https://docs.google.com/spreadsheets/d/1ycazU8me4hpAJMzqE2CIVlEUeB7GqQGzYu2P1I92-bM/edit", group: "Planning" },
  { label: "Planning notes (Google Doc)", url: "https://docs.google.com/document/d/18PJHo7QR0FiL5CG3k3SR11wi_hR7SwvVBooflkCYCC8/edit", group: "Planning" },
  { label: "#everforcex Slack", url: "https://everflow-team.slack.com/archives/everforcex", group: "Comms" },
  { label: "Mobbin (design inspo)", url: "https://mobbin.com/", group: "Design" },
];

export const DEADLINES = [
  { label: "AI ref live (homepage + pricing)", date: "2026-05-15" },
  { label: "Full refresh ship", date: "2026-06-30" },
];
