import { logout } from "../lib/auth";
import { DEADLINES } from "../lib/constants";

function daysTo(date: string) {
  const d = Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);
  return d;
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
    <header className="border-b border-ef-border bg-ef-panel/60 backdrop-blur sticky top-0 z-20">
      <div className="px-6 py-3 flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-ef-purple flex items-center justify-center font-bold text-white">X</div>
          <div>
            <div className="text-xs uppercase tracking-widest text-ef-mute">EverForce X</div>
            <div className="text-sm font-semibold text-ef-text -mt-0.5">Task Force Board</div>
          </div>
        </div>
        <nav className="flex gap-1 ml-2">
          {(["board", "resources"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-md text-sm capitalize transition ${
                view === v ? "bg-ef-purple text-white" : "text-ef-mute hover:text-ef-text hover:bg-ef-panel2"
              }`}>{v}</button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex gap-3 text-xs">
            {DEADLINES.map((d) => {
              const n = daysTo(d.date);
              return (
                <div key={d.date} className="bg-ef-panel2 border border-ef-border rounded-md px-2 py-1">
                  <span className="text-ef-mute">{d.label}: </span>
                  <span className={n < 14 ? "text-red-400 font-semibold" : n < 30 ? "text-amber-400 font-semibold" : "text-ef-text font-semibold"}>{n}d</span>
                </div>
              );
            })}
          </div>
          {view === "board" && (
            <button onClick={onAdd}
              className="bg-ef-purple hover:bg-ef-purpleSoft text-white text-sm rounded-md px-3 py-1.5 transition">
              + New card
            </button>
          )}
          <div className="text-xs text-ef-mute">{email}</div>
          <button onClick={() => { logout(); location.reload(); }}
            className="text-xs text-ef-mute hover:text-ef-text">Sign out</button>
        </div>
      </div>
    </header>
  );
}
