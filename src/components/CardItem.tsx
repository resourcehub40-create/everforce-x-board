import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card } from "../lib/supabase";
import { LABELS, SECTIONS } from "../lib/constants";

function dueTone(d: string | null): { label: string; cls: string } | null {
  if (!d) return null;
  const days = Math.ceil((new Date(d + "T23:59:59").getTime() - Date.now()) / 86400000);
  const cls =
    days < 0 ? "bg-ef-danger/10 text-ef-danger border-ef-danger/40"
    : days <= 3 ? "bg-ef-danger/10 text-ef-danger border-ef-danger/40"
    : days <= 7 ? "bg-ef-warn/10 text-ef-warn border-ef-warn/40"
    : "bg-ef-purpleBg text-ef-purple border-ef-purpleLine";
  const label = days < 0 ? `${-days}d overdue` : days === 0 ? "today" : `${days}d`;
  return { label, cls };
}

export default function CardItem({ card, onOpen }: { card: Card; onOpen: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: card.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };
  const due = dueTone(card.due_date);
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
      <div className="flex items-center justify-between text-[11px] text-ef-mute gap-2">
        <div className="truncate flex-1">{card.assignees.join(", ") || "Unassigned"}</div>
        {due && (
          <span className={`border rounded px-1.5 py-0.5 font-semibold ${due.cls}`}>{due.label}</span>
        )}
        {card.audit_grade && (
          <span className="bg-ef-surface2 border border-ef-border rounded px-1.5 py-0.5 text-ef-text font-semibold">{card.audit_grade}</span>
        )}
      </div>
    </div>
  );
}
