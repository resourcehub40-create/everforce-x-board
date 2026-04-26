import { useState } from "react";
import { login } from "../lib/auth";

export default function Login({ onAuth }: { onAuth: () => void }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = login(email, pw);
    if (typeof r === "string") setErr(r);
    else { setErr(null); onAuth(); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-ef-bg">
      <form onSubmit={submit} className="w-full max-w-sm bg-ef-surface border border-ef-border rounded-2xl p-8 shadow-soft">
        <div className="mb-6">
          <div className="text-[11px] uppercase tracking-[0.2em] text-ef-purple font-semibold">EverForce X</div>
          <h1 className="text-2xl font-semibold text-ef-text mt-1">Task Force Board</h1>
          <p className="text-sm text-ef-mute mt-1">everflow.io website refresh — Apr–Jun 2026</p>
        </div>
        <label className="block text-xs text-ef-mute mb-1 font-medium">Everflow email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@everflow.io" required
          className="w-full bg-ef-surface border border-ef-border rounded-lg px-3 py-2 text-ef-text mb-4 outline-none focus:border-ef-purple focus:ring-2 focus:ring-ef-purpleBg" />
        <label className="block text-xs text-ef-mute mb-1 font-medium">Shared password</label>
        <input value={pw} onChange={(e) => setPw(e.target.value)} type="password" required
          className="w-full bg-ef-surface border border-ef-border rounded-lg px-3 py-2 text-ef-text mb-4 outline-none focus:border-ef-purple focus:ring-2 focus:ring-ef-purpleBg" />
        {err && <div className="text-sm text-ef-danger mb-3">{err}</div>}
        <button className="w-full bg-ef-purple hover:bg-ef-purpleSoft text-white font-medium rounded-lg py-2 transition shadow-soft">
          Enter board
        </button>
      </form>
    </div>
  );
}
