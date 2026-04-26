import { useEffect, useState } from "react";
import { getSession } from "./lib/auth";
import Login from "./components/Login";
import Header from "./components/Header";
import Board from "./components/Board";
import Resources from "./components/Resources";

export default function App() {
  const [email, setEmail] = useState<string | null>(getSession()?.email ?? null);
  const [view, setView] = useState<"board" | "resources">("board");
  const [addTrigger, setAddTrigger] = useState(0);

  useEffect(() => {
    function onStorage() { setEmail(getSession()?.email ?? null); }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!email) return <Login onAuth={() => setEmail(getSession()?.email ?? null)} />;

  return (
    <div className="min-h-screen">
      <Header email={email} view={view} setView={setView} onAdd={() => setAddTrigger((n) => n + 1)} />
      {view === "board" ? <Board email={email} addTrigger={addTrigger} /> : <Resources />}
    </div>
  );
}
