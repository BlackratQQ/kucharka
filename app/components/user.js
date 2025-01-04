import { useEffect, useState } from "react"; // Importuje hooky pro správu stavu a efektů

// Komponenta User zobrazuje seznam receptů
export default function User() {
  // Lokální stavy
  const [recepty, setRecepty] = useState([]); // Uchovává načtené recepty
  const [loading, setLoading] = useState(true); // Indikuje, zda probíhá načítání dat
  const [error, setError] = useState(""); // Uchovává chybovou zprávu

  // useEffect slouží k načtení dat při prvním vykreslení komponenty
  useEffect(() => {
    const fetchRecepty = async () => {
      try {
        // Volání API endpointu pro získání seznamu receptů
        const res = await fetch("/api/getData");
        const data = await res.json(); // Zpracování odpovědi ve formátu JSON

        if (res.ok) {
          // Pokud API vrátí úspěšnou odpověď
          setRecepty(data); // Uložení receptů do stavu
          setError(""); // Vyčištění chybové zprávy
        } else {
          // Pokud API vrátí chybu
          setError(data.error || "Nepodařilo se načíst recepty."); // Zobrazení chybové zprávy
        }
      } catch (error) {
        // Ošetření neočekávaných chyb
        console.error("Error fetching recipes:", error); // Logování chyby
        setError("Došlo k neočekávané chybě."); // Nastavení obecné chybové zprávy
      } finally {
        // Nastavení indikátoru načítání na false (ať už úspěch nebo chyba)
        setLoading(false);
      }
    };

    fetchRecepty(); // Zavolání funkce pro načtení dat
  }, []); // Prázdné pole závislostí zajišťuje, že se efekt spustí pouze jednou

  // Zobrazení indikátoru načítání
  if (loading) {
    return <p>Načítám recepty...</p>;
  }

  // Zobrazení chybové zprávy, pokud existuje
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  // Zobrazení receptů nebo zprávy, že žádné recepty nejsou k dispozici
  return (
    <div className="recepty-container">
      {/* Nadpis */}
      <h1 className="recepty-title">Hello User</h1>
      {recepty.length === 0 ? (
        // Pokud není žádný recept, zobrazí se zpráva
        <p>Žádné recepty nejsou k dispozici.</p>
      ) : (
        // Pokud existují recepty, zobrazí se jako kartičky
        recepty.map((recept) => (
          <div key={recept.id} className="recept-card">
            <h2>{recept.nazev}</h2> {/* Název receptu */}
            <p>
              <strong>Čas:</strong> {recept.cas} minut
            </p>{" "}
            {/* Čas přípravy */}
            <p>{recept.recept}</p> {/* Popis receptu */}
          </div>
        ))
      )}
    </div>
  );
}
