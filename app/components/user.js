import { useEffect, useState } from "react";

export default function User() {
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
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Došlo k neočekávané chybě.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecepty();
  }, []);

  if (loading) {
    return <p>Načítám recepty...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="recepty-container">
      <h1 className="recepty-title">Hello User</h1>
      {recepty.length === 0 ? (
        <p>Žádné recepty nejsou k dispozici.</p>
      ) : (
        recepty.map((recept) => (
          <div key={recept.id} className="recept-card">
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
