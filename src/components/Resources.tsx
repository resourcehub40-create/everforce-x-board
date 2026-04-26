import { RESOURCE_LINKS } from "../lib/constants";
import BrandIcon from "./BrandIcon";
import Files from "./Files";

const GROUP_ORDER: Array<"Design" | "Audit" | "Planning" | "Comms"> = ["Design", "Planning", "Audit", "Comms"];
const GROUP_BLURB: Record<string, string> = {
  Design: "Figma project, FigJam for inspos, the live dev file, and our design references.",
  Planning: "Jordan's epic doc (jump straight to a tab) and Ceno's page tracker.",
  Audit: "The grading tool that drives this whole refresh, plus the GitHub repos.",
  Comms: "Where the team talks.",
};

export default function Resources({ email }: { email: string }) {
  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-[0.2em] text-ef-purple font-semibold">Resources</div>
        <h2 className="text-2xl font-semibold text-ef-text mt-0.5">Everything the team needs, in one spot</h2>
        <p className="text-sm text-ef-mute mt-1">Click a card to open. File uploads at the bottom — drop transcripts, mocks, briefs, anything.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {GROUP_ORDER.map((g) => (
          <div key={g} className="bg-ef-surface border border-ef-border rounded-xl p-5 shadow-soft">
            <div className="text-[11px] uppercase tracking-[0.18em] text-ef-purple font-semibold mb-1">{g}</div>
            <p className="text-xs text-ef-mute mb-4">{GROUP_BLURB[g]}</p>
            <div className="space-y-2">
              {RESOURCE_LINKS.filter((l) => l.group === g).map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noreferrer"
                  className={`flex items-center gap-3 bg-ef-surface border border-ef-border rounded-lg px-3 py-2.5 hover:border-ef-purple hover:shadow-soft transition group ${
                    l.indent ? "ml-6" : ""
                  }`}>
                  <BrandIcon brand={l.brand} className="w-6 h-6 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-ef-text font-medium truncate">{l.label}</div>
                    {l.note && <div className="text-[11px] text-ef-mute truncate">{l.note}</div>}
                  </div>
                  <span className="text-ef-mute group-hover:text-ef-purple text-sm flex-shrink-0">↗</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Files email={email} />
    </div>
  );
}
