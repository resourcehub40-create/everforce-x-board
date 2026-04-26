const KEY = "efx_session_v1";
const PASSWORD = import.meta.env.VITE_BOARD_PASSWORD as string;
const EMAIL_RE = /^[^\s@]+@everflow\.io$/i;

export interface Session { email: string; }

export function login(email: string, password: string): Session | string {
  const e = email.trim().toLowerCase();
  if (!EMAIL_RE.test(e)) return "Use your @everflow.io email.";
  if (password !== PASSWORD) return "Wrong password. Ask Dasha.";
  const session: Session = { email: e };
  localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Session;
    return EMAIL_RE.test(s.email) ? s : null;
  } catch { return null; }
}

export function logout() { localStorage.removeItem(KEY); }
