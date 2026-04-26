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
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-ef-panel border border-ef-border rounded-2xl p-8 shadow-xl">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-widest text-ef-mute">EverForce X</div>
          <h1 className="text-2xl font-semibold text-ef-text mt-1">Task Force Board</h1>
        </div>
        <label className="block text-xs text-ef-mute mb-1">Everflow email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@everflow.io" required
          className="w-full bg-ef-panel2 border border-ef-border rounded-lg px-3 py-2 text-ef-text mb-4 outline-none focus:border-ef-purple" />
        <label className="block text-xs text-ef-mute mb-1">Shared password</label>
        <input value={pw} onChange={(e) => setPw(e.target.value)} type="password" required
          className="w-full bg-ef-panel2 border border-ef-border rounded-lg px-3 py-2 text-ef-text mb-4 outline-none focus:border-ef-purple" />
        {err && <div className="text-sm text-red-400 mb-3">{err}</div>}
        <button className="w-full bg-ef-purple hover:bg-ef-purpleSoft text-white font-medium rounded-lg py-2 transition">
          Enter board
        </button>
      </form>
    </div>
  );
}
