// EverForce X Slack notifier — relays board events to #everforcex.
// Deployed on RH Supabase. Token + channel live in Function Secrets.
//
// Body: { text: string }
// Returns: { ok: boolean, error?: string }

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "method" }), { status: 405, headers: { ...CORS, "content-type": "application/json" } });
  }

  const TOKEN = Deno.env.get("SLACK_DASH_BOT_TOKEN");
  const CHANNEL = Deno.env.get("EFX_SLACK_CHANNEL") ?? "C0AUQMTCHGU";
  if (!TOKEN) {
    return new Response(JSON.stringify({ ok: false, error: "missing_token" }), { status: 500, headers: { ...CORS, "content-type": "application/json" } });
  }

  let body: { text?: string };
  try { body = await req.json(); }
  catch { return new Response(JSON.stringify({ ok: false, error: "bad_json" }), { status: 400, headers: { ...CORS, "content-type": "application/json" } }); }

  const text = (body.text ?? "").toString().slice(0, 3500);
  if (!text.trim()) {
    return new Response(JSON.stringify({ ok: false, error: "empty" }), { status: 400, headers: { ...CORS, "content-type": "application/json" } });
  }

  const slackRes = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ channel: CHANNEL, text, unfurl_links: false, unfurl_media: false }),
  });
  const data = await slackRes.json();
  return new Response(JSON.stringify({ ok: !!data.ok, error: data.error, ts: data.ts }), {
    status: data.ok ? 200 : 502,
    headers: { ...CORS, "content-type": "application/json" },
  });
});
