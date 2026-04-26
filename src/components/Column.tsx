import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import type { Card, ColumnKey } from "../lib/supabase";
import CardItem from "./CardItem";

export default function Column({
  columnKey, label, accent, cards, onOpenCard,
}: {
  columnKey: ColumnKey;
  label: string;
  accent: string;
  cards: Card[];
  onOpenCard: (c: Card) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `col:${columnKey}` });
  return (
    <div className="flex-shrink-0 w-72">
      <div className="flex items-center gap-2 px-1 mb-2">
        <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
        <span className="text-sm font-semibold text-ef-text">{label}</span>
        <span className="text-xs text-ef-mute">{cards.length}</span>
      </div>
      <div ref={setNodeRef}
        className={`bg-ef-panel/60 border rounded-xl p-2 min-h-[60vh] space-y-2 transition ${
          isOver ? "border-ef-purple" : "border-ef-border"
        }`}>
        <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          {cards.map((c) => (
            <CardItem key={c.id} card={c} onOpen={() => onOpenCard(c)} />
          ))}
        </SortableContext>
        {cards.length === 0 && (
          <div className="text-xs text-ef-mute italic px-2 py-6 text-center">Drop cards here</div>
        )}
      </div>
    </div>
  );
}
