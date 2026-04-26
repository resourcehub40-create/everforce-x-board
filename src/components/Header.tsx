import { logout } from "../lib/auth";
import { DEADLINES } from "../lib/constants";

function daysTo(date: string) {
  return Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);
}

export default function Header({
  email, view, setView, onAdd,
}: {
  email: string;
  view: "board" | "resources";
  setView: (v: "board" | "resources") => void;
  onAdd: () => void;
}) {
  return (
    <header className="border-b border-ef-border bg-ef-surface sticky top-0 z-20 shadow-soft">
      <div className="px-6 py-3 flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-ef-purple flex items-center justify-center font-bold text-white text-lg">X</div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-ef-purple font-semibold">EverForce X</div>
            <div className="text-sm font-semibold text-ef-text -mt-0.5">Task Force Board</div>
          </div>
        </div>
        <nav className="flex gap-1 ml-2">
          {(["board", "resources"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-md text-sm capitalize transition font-medium ${
                view === v
                  ? "bg-ef-purpleBg text-ef-purple"
                  : "text-ef-mute hover:text-ef-text hover:bg-ef-surface2"
              }`}>{v}</button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden lg:flex gap-2 text-xs">
            {DEADLINES.map((d) => {
              const n = daysTo(d.date);
              const tone = n < 14 ? "text-ef-danger" : n < 30 ? "text-ef-warn" : "text-ef-text";
              return (
                <div key={d.date} className="bg-ef-surface2 border border-ef-border rounded-md px-2 py-1">
                  <span className="text-ef-mute">{d.label}: </span>
                  <span className={`${tone} font-semibold`}>{n}d</span>
                </div>
              );
            })}
          </div>
          {view === "board" && (
            <button onClick={onAdd}
              className="bg-ef-purple hover:bg-ef-purpleSoft text-white text-sm font-medium rounded-md px-3 py-1.5 transition shadow-soft">
              + New card
            </button>
          )}
          <div className="text-xs text-ef-mute hidden md:block">{email}</div>
          <button onClick={() => { logout(); location.reload(); }}
            className="text-xs text-ef-mute hover:text-ef-text">Sign out</button>
        </div>
      </div>
    </header>
  );
}
