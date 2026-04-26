import { useEffect, useState } from "react";
import { supabase, type Card, type Comment, type ColumnKey } from "../lib/supabase";
import { ASSIGNEES, COLUMNS, LABELS, SECTIONS } from "../lib/constants";

interface Props {
  card: Card | null;
  isNew: boolean;
  email: string;
  onClose: () => void;
  onSaved: () => void;
}

export default function CardModal({ card, isNew, email, onClose, onSaved }: Props) {
  const [title, setTitle] = useState(card?.title ?? "");
  const [description, setDescription] = useState(card?.description ?? "");
  const [columnKey, setColumnKey] = useState<ColumnKey>(card?.column_key ?? "backlog");
  const [labels, setLabels] = useState<string[]>(card?.labels ?? []);
  const [assignees, setAssignees] = useState<string[]>(card?.assignees ?? []);
  const [pageUrl, setPageUrl] = useState(card?.page_url ?? "");
  const [auditGrade, setAuditGrade] = useState(card?.audit_grade ?? "");
  const [section, setSection] = useState<string>(card?.section ?? "");
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!card || isNew) return;
    supabase.from("wa_comments").select("*").eq("card_id", card.id).order("created_at")
      .then(({ data }) => setComments((data as Comment[]) ?? []));
  }, [card, isNew]);

  async function save() {
    if (!title.trim()) return;
    setBusy(true);
    const payload = {
      title: title.trim(),
      description,
      column_key: columnKey,
      labels,
      assignees,
      page_url: pageUrl || null,
      audit_grade: auditGrade || null,
      section: section || null,
    };
    if (isNew) {
      await supabase.from("wa_cards").insert({ ...payload, created_by: email });
    } else if (card) {
      await supabase.from("wa_cards").update(payload).eq("id", card.id);
    }
    setBusy(false);
    onSaved();
    onClose();
  }

  async function del() {
    if (!card || isNew) return;
    if (!confirm("Delete this card?")) return;
    await supabase.from("wa_cards").delete().eq("id", card.id);
    onSaved();
    onClose();
  }

  async function addComment() {
    if (!card || !newComment.trim()) return;
    const { data } = await supabase.from("wa_comments")
      .insert({ card_id: card.id, author_email: email, body: newComment.trim() })
      .select().single();
    if (data) setComments((c) => [...c, data as Comment]);
    setNewComment("");
  }

  function toggle<T>(arr: T[], v: T): T[] {
    return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
  }

  const inputCls = "w-full bg-ef-surface border border-ef-border rounded-lg px-3 py-2 text-ef-text outline-none focus:border-ef-purple focus:ring-2 focus:ring-ef-purpleBg";

  return (
    <div className="fixed inset-0 z-50 bg-ef-text/30 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 md:p-10"
      onClick={onClose}>
      <div className="bg-ef-surface border border-ef-border rounded-2xl w-full max-w-3xl shadow-lift"
        onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-ef-border flex items-center gap-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Card title"
            className="flex-1 bg-transparent text-xl font-semibold text-ef-text outline-none placeholder:text-ef-mute" />
          <button onClick={onClose} className="text-ef-mute hover:text-ef-text text-xl">✕</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-xs text-ef-mute mb-1 font-medium">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5}
                className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-ef-mute mb-1 font-medium">Page URL</label>
                <input value={pageUrl} onChange={(e) => setPageUrl(e.target.value)} className={inputCls + " text-sm"} />
              </div>
              <div>
                <label className="block text-xs text-ef-mute mb-1 font-medium">Audit grade</label>
                <input value={auditGrade} onChange={(e) => setAuditGrade(e.target.value)} placeholder="A / B / C+ / D / F"
                  className={inputCls + " text-sm"} />
              </div>
            </div>

            {!isNew && card && (
              <div className="pt-4 border-t border-ef-border">
                <div className="text-xs text-ef-mute uppercase tracking-wide mb-2 font-semibold">Comments</div>
                <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
                  {comments.map((c) => (
                    <div key={c.id} className="bg-ef-surface2 border border-ef-borderSoft rounded-lg px-3 py-2">
                      <div className="text-xs text-ef-mute mb-1">
                        <span className="font-medium text-ef-text">{c.author_email}</span> · {new Date(c.created_at).toLocaleString()}
                      </div>
                      <div className="text-sm text-ef-text whitespace-pre-wrap">{c.body}</div>
                    </div>
                  ))}
                  {comments.length === 0 && <div className="text-xs text-ef-mute italic">No comments yet.</div>}
                </div>
                <div className="flex gap-2">
                  <input value={newComment} onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addComment()}
                    placeholder="Add a comment…"
                    className={inputCls + " text-sm"} />
                  <button onClick={addComment} className="bg-ef-purple hover:bg-ef-purpleSoft text-white text-sm font-medium rounded-lg px-4">Send</button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-ef-mute mb-1 font-medium">Column</label>
              <select value={columnKey} onChange={(e) => setColumnKey(e.target.value as ColumnKey)}
                className={inputCls + " text-sm"}>
                {COLUMNS.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-ef-mute mb-1 font-medium">
                Section <span className="text-ef-mute font-normal">(maps to spreadsheet tab)</span>
              </label>
              <select value={section} onChange={(e) => setSection(e.target.value)}
                className={inputCls + " text-sm"}>
                <option value="">— Pick one —</option>
                {Array.from(new Set(SECTIONS.map((s) => s.group))).map((g) => (
                  <optgroup key={g} label={g}>
                    {SECTIONS.filter((s) => s.group === g).map((s) => (
                      <option key={s.key} value={s.key}>{s.label}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <div className="text-xs text-ef-mute mb-1 font-medium">Labels</div>
              <div className="flex flex-wrap gap-1">
                {LABELS.map((l) => {
                  const on = labels.includes(l.key);
                  return (
                    <button key={l.key} type="button" onClick={() => setLabels(toggle(labels, l.key))}
                      className="text-[11px] px-2 py-1 rounded border transition font-medium"
                      style={{
                        borderColor: on ? l.color : "#E5E2EE",
                        background: on ? l.color + "1A" : "#fff",
                        color: on ? l.color : "#6B6379",
                      }}>{l.key}</button>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-xs text-ef-mute mb-1 font-medium">Assignees</div>
              <div className="flex flex-wrap gap-1">
                {ASSIGNEES.map((a) => {
                  const on = assignees.includes(a);
                  return (
                    <button key={a} type="button" onClick={() => setAssignees(toggle(assignees, a))}
                      className={`text-[11px] px-2 py-1 rounded border transition font-medium ${
                        on
                          ? "border-ef-purple bg-ef-purpleBg text-ef-purple"
                          : "border-ef-border bg-white text-ef-mute hover:text-ef-text"
                      }`}>{a}</button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-ef-border flex items-center justify-between bg-ef-surface2/40 rounded-b-2xl">
          <div>
            {!isNew && (
              <button onClick={del} className="text-sm text-ef-danger hover:underline">Delete card</button>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="text-sm text-ef-mute hover:text-ef-text px-3 py-1.5">Cancel</button>
            <button onClick={save} disabled={busy || !title.trim()}
              className="bg-ef-purple hover:bg-ef-purpleSoft disabled:opacity-50 text-white text-sm font-medium rounded-lg px-4 py-1.5 shadow-soft">
              {busy ? "Saving…" : isNew ? "Create" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
