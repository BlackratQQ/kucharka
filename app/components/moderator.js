import { useEffect, useState } from "react";

export default function Moderator() {
  const [recepty, setRecepty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecepty = async () => {
      try {
        const res = await fetch("/api/getData");
        const data = await res.json();

        if (res.ok) {
          setRecepty(data);
          setError("");
        } else {
          setError(data.error || "Nepodařilo se načíst recepty.");
        }
      } catch {
        setError("Došlo k neočekávané chybě.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecepty();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Opravdu chcete tento recept smazat?")) return;

    try {
      const res = await fetch("/api/removeData", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (res.ok) {
        setRecepty((prev) => prev.filter((recept) => recept.id !== id));
      } else {
        setError(data.error || "Nepodařilo se smazat recept.");
      }
    } catch {
      setError("Došlo k neočekávané chybě při mazání.");
    }
  };

  if (loading) {
    return <p>Načítám recepty...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="recepty-container">
      <h1 className="recepty-title">Hello Moderator</h1>
      {recepty.length === 0 ? (
        <p>Žádné recepty nejsou k dispozici.</p>
      ) : (
        recepty.map((recept) => (
          <div
            key={recept.id}
            className="recept-card"
            style={{
              position: "relative",
              padding: "20px",
              border: "1px solid #ccc",
              margin: "10px 0",
            }}
          >
            <button
              onClick={() => handleDelete(recept.id)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                color: "red",
              }}
            >
              ✖
            </button>
            <h2>{recept.nazev}</h2>
            <p>
              <strong>Čas:</strong> {recept.cas} minut
            </p>
            <p>{recept.recept}</p>
          </div>
        ))
      )}
    </div>
  );
}
