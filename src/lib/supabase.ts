import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

export const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

export type ColumnKey =
  | "backlog"
  | "next"
  | "in_progress"
  | "in_review"
  | "blocked"
  | "done";

export interface Card {
  id: string;
  title: string;
  description: string;
  column_key: ColumnKey;
  labels: string[];
  assignees: string[];
  page_url: string | null;
  audit_grade: string | null;
  position: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  card_id: string;
  author_email: string;
  body: string;
  created_at: string;
}
