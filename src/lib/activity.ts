import { supabase } from "./supabase";

export async function logActivity(
  cardId: string,
  actorEmail: string,
  action: string,
  payload: Record<string, unknown> = {},
): Promise<void> {
  if (!cardId) return;
  await supabase.from("wa_activity").insert({
    card_id: cardId,
    actor_email: actorEmail,
    action,
    payload,
  });
}

export function summarize(action: string, payload: Record<string, unknown>): string {
  switch (action) {
    case "created": return `created this card`;
    case "moved": {
      const f = payload.from as string | undefined;
      const t = payload.to as string | undefined;
      return `moved from ${f ?? "?"} → ${t ?? "?"}`;
    }
    case "edited": {
      const fields = (payload.fields as string[] | undefined) ?? [];
      return fields.length ? `edited ${fields.join(", ")}` : `edited the card`;
    }
    case "commented": return `added a comment`;
    case "deleted": return `deleted the card`;
    default: return action;
  }
}
