import { useEffect, useMemo, useState } from "react";
import {
  DndContext, PointerSensor, useSensor, useSensors,
  type DragEndEvent, closestCorners,
} from "@dnd-kit/core";
import { supabase, type Card, type ColumnKey } from "../lib/supabase";
import { COLUMNS, LABELS, ASSIGNEES, SECTIONS } from "../lib/constants";
import { logActivity } from "../lib/activity";
import Column from "./Column";
import CardModal from "./CardModal";

export default function Board({ email, addTrigger }: { email: string; addTrigger: number }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<Card | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [filterLabel, setFilterLabel] = useState<string | null>(null);
  const [filterAssignee, setFilterAssignee] = useState<string | null>(null);
  const [filterSection, setFilterSection] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  async function load() {
    const { data, error } = await supabase.from("wa_cards").select("*").order("position");
    if (error) console.error(error);
    setCards((data as Card[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { void load(); }, []);

  // Realtime — subscribe to wa_cards changes; refetch on any event so order/state stays consistent.
  useEffect(() => {
    const channel = supabase
      .channel("wa_cards_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "wa_cards" }, () => {
        void load();
      })
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, []);

  useEffect(() => {
    if (addTrigger > 0) {
      setOpen({
        id: "", title: "", description: "", column_key: "backlog",
        labels: [], assignees: [], page_url: null, audit_grade: null,
        section: null, due_date: null,
        position: 0, created_by: email, created_at: "", updated_at: "",
      });
      setIsNew(true);
    }
  }, [addTrigger, email]);

  const filtered = useMemo(() => cards.filter((c) =>
    (!filterLabel || c.labels.includes(filterLabel)) &&
    (!filterAssignee || c.assignees.includes(filterAssignee)) &&
    (!filterSection || c.section === filterSection)
  ), [cards, filterLabel, filterAssignee, filterSection]);

  const byCol = useMemo(() => {
    const m: Record<ColumnKey, Card[]> = {
      backlog: [], next: [], in_progress: [], in_review: [], blocked: [], done: [],
    };
    for (const c of filtered) m[c.column_key]?.push(c);
    return m;
  }, [filtered]);

  async function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over) return;
    const aId = active.id as string;
    const card = cards.find((c) => c.id === aId);
    if (!card) return;
    const overId = over.id as string;
    const targetCol: ColumnKey = overId.startsWith("col:")
      ? (overId.slice(4) as ColumnKey)
      : (cards.find((c) => c.id === overId)?.column_key ?? card.column_key);

    const inTarget = cards.filter((c) => c.column_key === targetCol && c.id !== aId);
    let insertIdx = inTarget.length;
    if (!overId.startsWith("col:")) {
      const idx = inTarget.findIndex((c) => c.id === overId);
      if (idx >= 0) insertIdx = idx;
    }
    const moving = { ...card, column_key: targetCol };
    inTarget.splice(insertIdx, 0, moving);
    const colIdx = COLUMNS.findIndex((x) => x.key === targetCol);
    const repositioned = inTarget.map((c, i) => ({ ...c, position: i + 1 + colIdx * 10000 }));
    setCards((cs) => cs.map((c) => repositioned.find((r) => r.id === c.id) ?? c));

    await supabase.from("wa_cards").update({
      column_key: targetCol,
      position: repositioned.find((r) => r.id === aId)?.position ?? card.position,
    }).eq("id", aId);

    if (card.column_key !== targetCol) {
      await logActivity(card.id, email, "moved", {
        from: COLUMNS.find((c) => c.key === card.column_key)?.label,
        to: COLUMNS.find((c) => c.key === targetCol)?.label,
      });
    }
  }

  const selectCls = "bg-ef-surface border border-ef-border rounded-md text-xs px-2 py-1 text-ef-text outline-none focus:border-ef-purple";

  return (
    <div className="flex flex-col h-[calc(100vh-65px)]">
      <div className="px-6 py-3 flex items-center gap-3 flex-wrap border-b border-ef-border bg-ef-surface">
        <span className="text-[11px] text-ef-mute uppercase tracking-wide font-semibold">Filter</span>
        <select value={filterLabel ?? ""} onChange={(e) => setFilterLabel(e.target.value || null)} className={selectCls}>
          <option value="">All labels</option>
          {LABELS.map((l) => <option key={l.key} value={l.key}>{l.key}</option>)}
        </select>
        <select value={filterAssignee ?? ""} onChange={(e) => setFilterAssignee(e.target.value || null)} className={selectCls}>
          <option value="">All people</option>
          {ASSIGNEES.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={filterSection ?? ""} onChange={(e) => setFilterSection(e.target.value || null)} className={selectCls}>
          <option value="">All sections</option>
          {Array.from(new Set(SECTIONS.map((s) => s.group))).map((g) => (
            <optgroup key={g} label={g}>
              {SECTIONS.filter((s) => s.group === g).map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <span className="text-xs text-ef-mute ml-auto">{filtered.length} of {cards.length} cards</span>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-ef-mute">Loading…</div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDragEnd}>
          <div className="flex-1 overflow-x-auto bg-ef-bg">
            <div className="flex gap-4 px-6 py-4 min-h-full">
              {COLUMNS.map((c) => (
                <Column key={c.key} columnKey={c.key} label={c.label} accent={c.accent}
                  cards={byCol[c.key]}
                  onOpenCard={(card) => { setOpen(card); setIsNew(false); }} />
              ))}
            </div>
          </div>
        </DndContext>
      )}

      {open && (
        <CardModal card={open} isNew={isNew} email={email}
          onClose={() => setOpen(null)}
          onSaved={() => load()} />
      )}
    </div>
  );
}
