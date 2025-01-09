import { useState } from "react";

export default function Admin() {
  const [nazev, setNazev] = useState("");
  const [cas, setCas] = useState("");
  const [recept, setRecept] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/sendData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nazev, cas: parseInt(cas, 10), recept }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Recept byl úspěšně přidán.");
        setNazev("");
        setCas("");
        setRecept("");
        setError("");
      } else {
        setError(data.error || "Chyba při ukládání receptu.");
      }
    } catch {
      setError("Došlo k neočekávané chybě. Zkuste to znovu.");
    }
  };

  return (
    <div className="login-form">
      <h1>Přidat recept</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Název receptu"
          value={nazev}
          onChange={(e) => setNazev(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Čas (v minutách)"
          value={cas}
          onChange={(e) => setCas(e.target.value)}
          required
          min="1"
        />
        <textarea
          placeholder="Text receptu"
          value={recept}
          onChange={(e) => setRecept(e.target.value)}
          rows="5"
          required
        />
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Odeslat recept</button>
      </form>
    </div>
  );
}
