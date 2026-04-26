import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card } from "../lib/supabase";
import { LABELS, SECTIONS } from "../lib/constants";

export default function CardItem({ card, onOpen }: { card: Card; onOpen: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: card.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
      onClick={onOpen}
      className="bg-ef-surface border border-ef-border rounded-lg p-3 cursor-pointer hover:border-ef-purple hover:shadow-soft transition group">
      {card.section && (
        <div className="text-[10px] uppercase tracking-wide text-ef-purple font-semibold mb-1">
          {SECTIONS.find((s) => s.key === card.section)?.label ?? card.section}
        </div>
      )}
      <div className="text-sm text-ef-text font-medium mb-1.5 leading-snug">{card.title}</div>
      {card.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {card.labels.map((l) => {
            const meta = LABELS.find((x) => x.key === l);
            return (
              <span key={l} className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded font-semibold"
                style={{ background: (meta?.color ?? "#666") + "1A", color: meta?.color ?? "#6B6379" }}>
                {l}
              </span>
            );
          })}
        </div>
      )}
      <div className="flex items-center justify-between text-[11px] text-ef-mute">
        <div className="truncate">{card.assignees.join(", ") || "Unassigned"}</div>
        {card.audit_grade && (
          <span className="bg-ef-surface2 border border-ef-border rounded px-1.5 py-0.5 ml-2 text-ef-text font-semibold">{card.audit_grade}</span>
        )}
      </div>
    </div>
  );
}
