// EverForce X Slack notifier — posts via the efx-slack Edge Function on RH Supabase.
// Bot: Dash · Channel: #everforcex (C0AUQMTCHGU). Token lives in Function Secrets.

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/efx-slack`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

// Map first names → Slack member IDs. Fill these in from the workspace
// (Profile → ⋯ → Copy member ID) so @mentions actually ping. Until then,
// we render mentions as bold text and Slack auto-links if display names match.
export const SLACK_USERS: Record<string, string> = {
  // Jordan: "U…",
  // Dasha: "U…",
  // Ceno: "U…",
  // François: "U…",
  // Brent: "U…",
  // Tony: "U…",
};

export function mentionTag(name: string): string {
  const id = SLACK_USERS[name];
  return id ? `<@${id}>` : `@${name}`;
}

export function extractMentions(body: string, candidates: string[]): string[] {
  const lower = body.toLowerCase();
  return candidates.filter((n) => lower.includes("@" + n.toLowerCase()));
}

export async function postSlack(text: string): Promise<void> {
  if (!FN_URL || !ANON) return;
  try {
    await fetch(FN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: ANON, Authorization: `Bearer ${ANON}` },
      body: JSON.stringify({ text }),
    });
  } catch (e) {
    console.warn("Slack post failed", e);
  }
}

export function boardUrl(): string {
  return typeof window !== "undefined" ? window.location.origin : "https://everforce-x-board.web.app";
}
