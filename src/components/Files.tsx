import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import { STORAGE_BUCKET } from "../lib/constants";

interface FileItem {
  name: string;        // storage key (with timestamp prefix)
  displayName: string; // human name for UI + download
  size: number;
  uploadedAt: string;
  url: string;
}

function cleanName(storageName: string): string {
  // Strip leading "1234567890_" timestamp prefix and convert _ back to spaces.
  const stripped = storageName.replace(/^\d{8,}_/, "");
  return stripped.replace(/_/g, " ");
}

function fmtSize(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(1)} MB`;
}

export default function Files({ email }: { email: string }) {
  const [items, setItems] = useState<FileItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function load() {
    const { data, error } = await supabase.storage.from(STORAGE_BUCKET).list("", {
      sortBy: { column: "created_at", order: "desc" },
      limit: 200,
    });
    if (error) { setError(error.message); return; }
    const list: FileItem[] = (data ?? [])
      .filter((f) => f.name && !f.name.startsWith("."))
      .map((f) => ({
        name: f.name,
        displayName: cleanName(f.name),
        size: (f.metadata as { size?: number } | null)?.size ?? 0,
        uploadedAt: f.created_at ?? "",
        url: supabase.storage.from(STORAGE_BUCKET).getPublicUrl(f.name).data.publicUrl,
      }));
    setItems(list);
  }

  useEffect(() => { load(); }, []);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    setBusy(true);
    setError(null);
    for (const f of Array.from(files)) {
      const path = `${Date.now()}_${f.name.replace(/[^a-zA-Z0-9._-]+/g, "_")}`;
      const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, f, {
        contentType: f.type || "application/octet-stream",
        upsert: false,
      });
      if (error) { setError(error.message); break; }
    }
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
    void email;
    await load();
  }

  async function del(name: string) {
    if (!confirm(`Delete "${name}"?`)) return;
    const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([name]);
    if (error) { setError(error.message); return; }
    await load();
  }

  return (
    <div className="bg-ef-surface border border-ef-border rounded-xl p-5 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-ef-purple font-semibold">Files</div>
          <h3 className="text-base font-semibold text-ef-text mt-0.5">Shared files</h3>
          <p className="text-xs text-ef-mute mt-0.5">Mocks, transcripts, briefs, screenshots — anything the team needs.</p>
        </div>
        <label className="bg-ef-purple hover:bg-ef-purpleSoft text-white text-sm font-medium rounded-md px-3 py-1.5 transition shadow-soft cursor-pointer">
          {busy ? "Uploading…" : "+ Upload"}
          <input ref={inputRef} type="file" multiple onChange={onUpload} className="hidden" disabled={busy} />
        </label>
      </div>
      {error && <div className="text-xs text-ef-danger mb-2">{error}</div>}
      {items.length === 0 ? (
        <div className="text-sm text-ef-mute italic py-6 text-center border border-dashed border-ef-border rounded-lg">
          No files yet. Drop the kickoff transcript, planning notes, or anything else the team should be able to grab.
        </div>
      ) : (
        <div className="divide-y divide-ef-borderSoft">
          {items.map((f) => (
            <div key={f.name} className="flex items-center gap-3 py-2">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-ef-text truncate">{f.displayName}</div>
                <div className="text-[11px] text-ef-mute">
                  {fmtSize(f.size)} · {f.uploadedAt ? new Date(f.uploadedAt).toLocaleString() : ""}
                </div>
              </div>
              <a href={f.url} target="_blank" rel="noreferrer" download={f.displayName}
                className="text-xs text-ef-purple hover:underline font-medium">Download</a>
              <button onClick={() => del(f.name)} className="text-xs text-ef-mute hover:text-ef-danger">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
