import { useEffect, useMemo, useState } from "react";
import {
  DndContext, PointerSensor, useSensor, useSensors,
  type DragEndEvent, closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { supabase, type Card, type ColumnKey } from "../lib/supabase";
import { COLUMNS, LABELS, ASSIGNEES } from "../lib/constants";
import Column from "./Column";
import CardModal from "./CardModal";

export default function Board({ email, addTrigger }: { email: string; addTrigger: number }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<Card | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [filterLabel, setFilterLabel] = useState<string | null>(null);
  const [filterAssignee, setFilterAssignee] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("wa_cards").select("*").order("position");
    if (error) console.error(error);
    setCards((data as Card[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (addTrigger > 0) {
      setOpen({
        id: "", title: "", description: "", column_key: "backlog",
        labels: [], assignees: [], page_url: null, audit_grade: null,
        position: 0, created_by: email, created_at: "", updated_at: "",
      });
      setIsNew(true);
    }
  }, [addTrigger, email]);

  const filtered = useMemo(() => cards.filter((c) =>
    (!filterLabel || c.labels.includes(filterLabel)) &&
    (!filterAssignee || c.assignees.includes(filterAssignee))
  ), [cards, filterLabel, filterAssignee]);

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

    let newCards = [...cards];
    const inTarget = newCards.filter((c) => c.column_key === targetCol && c.id !== aId);
    let insertIdx = inTarget.length;
    if (!overId.startsWith("col:")) {
      const idx = inTarget.findIndex((c) => c.id === overId);
      if (idx >= 0) insertIdx = idx;
    }
    const moving = { ...card, column_key: targetCol };
    inTarget.splice(insertIdx, 0, moving);
    newCards = [
      ...newCards.filter((c) => c.column_key !== targetCol && c.id !== aId),
      ...inTarget,
    ];
    const repositioned = inTarget.map((c, i) => ({
      ...c,
      position: i + 1 + (COLUMNS.findIndex((x) => x.key === targetCol) * 10000),
    }));
    setCards(newCards.map((c) => repositioned.find((r) => r.id === c.id) ?? c));

    // persist moved card
    await supabase.from("wa_cards").update({
      column_key: targetCol,
      position: (repositioned.find((r) => r.id === aId)?.position) ?? card.position,
    }).eq("id", aId);
    void arrayMove;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-65px)]">
      <div className="px-6 py-3 flex items-center gap-3 flex-wrap border-b border-ef-border">
        <span className="text-xs text-ef-mute uppercase tracking-wide">Filter</span>
        <select value={filterLabel ?? ""} onChange={(e) => setFilterLabel(e.target.value || null)}
          className="bg-ef-panel2 border border-ef-border rounded-md text-xs px-2 py-1 text-ef-text">
          <option value="">All labels</option>
          {LABELS.map((l) => <option key={l.key} value={l.key}>{l.key}</option>)}
        </select>
        <select value={filterAssignee ?? ""} onChange={(e) => setFilterAssignee(e.target.value || null)}
          className="bg-ef-panel2 border border-ef-border rounded-md text-xs px-2 py-1 text-ef-text">
          <option value="">All people</option>
          {ASSIGNEES.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <span className="text-xs text-ef-mute ml-auto">{filtered.length} of {cards.length} cards</span>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-ef-mute">Loading…</div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDragEnd}>
          <div className="flex-1 overflow-x-auto">
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
