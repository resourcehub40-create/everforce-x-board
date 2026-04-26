import { RESOURCE_LINKS } from "../lib/constants";

export default function Resources() {
  const groups = Array.from(new Set(RESOURCE_LINKS.map((l) => l.group)));

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold text-ef-text mb-1">Resources</h2>
      <p className="text-sm text-ef-mute mb-6">
        One stop for the team. Links open in a new tab. File uploads coming this week.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {groups.map((g) => (
          <div key={g} className="bg-ef-panel border border-ef-border rounded-xl p-5">
            <div className="text-xs uppercase tracking-widest text-ef-mute mb-3">{g}</div>
            <div className="space-y-2">
              {RESOURCE_LINKS.filter((l) => l.group === g).map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noreferrer"
                  className="flex items-center justify-between bg-ef-panel2 border border-ef-border rounded-lg px-3 py-2 hover:border-ef-purple transition">
                  <span className="text-sm text-ef-text">{l.label}</span>
                  <span className="text-ef-mute text-xs">↗</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-ef-panel border border-ef-border rounded-xl p-5">
        <div className="text-xs uppercase tracking-widest text-ef-mute mb-2">Files (v1 — coming this week)</div>
        <p className="text-sm text-ef-mute">
          Upload + download for kickoff transcript, planning notes, mocks, briefs. Storage bucket{" "}
          <code className="text-ef-text">everforce-x-files</code> on the Resource Hub Supabase. Wire up next.
        </p>
      </div>
    </div>
  );
}
