import { useState } from "react"; // Importuje hook useState pro správu stavu

export default function Admin() {
  // Lokální stavy pro formulář a zprávy
  const [nazev, setNazev] = useState(""); // Název receptu
  const [cas, setCas] = useState(""); // Čas přípravy receptu
  const [recept, setRecept] = useState(""); // Text samotného receptu
  const [message, setMessage] = useState(""); // Zpráva o úspěchu
  const [error, setError] = useState(""); // Zpráva o chybě

  // Funkce pro odeslání formuláře
  const handleSubmit = async (e) => {
    e.preventDefault(); // Zabrání obnovení stránky při odeslání formuláře

    try {
      // Odeslání dat na API endpoint
      const res = await fetch("/api/sendData", {
        method: "POST", // Typ požadavku (POST)
        headers: { "Content-Type": "application/json" }, // Typ odesílaných dat (JSON)
        body: JSON.stringify({ nazev, cas: parseInt(cas, 10), recept }), // Data formuláře převedená na JSON
      });

      const data = await res.json(); // Čte odpověď z API

      if (res.ok) {
        // Pokud API vrátí úspěch
        setMessage("Recept byl úspěšně přidán."); // Nastaví úspěšnou zprávu
        setNazev(""); // Vyčistí pole pro název
        setCas(""); // Vyčistí pole pro čas
        setRecept(""); // Vyčistí pole pro recept
        setError(""); // Vymaže případnou chybovou zprávu
      } else {
        // Pokud API vrátí chybu
        setError(data.error || "Chyba při ukládání receptu."); // Zobrazí chybu
      }
    } catch (error) {
      // Ošetření neočekávaných chyb
      console.error("Error during recipe submission:", error); // Zaloguje chybu
      setError("Došlo k neočekávané chybě. Zkuste to znovu."); // Nastaví obecnou chybovou zprávu
    }
  };

  return (
    <div className="login-form">
      <h1>Přidat recept</h1>
      <form onSubmit={handleSubmit}>
        {/* Pole pro zadání názvu receptu */}
        <input
          type="text"
          placeholder="Název receptu"
          value={nazev}
          onChange={(e) => setNazev(e.target.value)} // Aktualizuje stav "nazev"
          required // Pole je povinné
        />
        {/* Pole pro zadání času přípravy receptu */}
        <input
          type="number"
          placeholder="Čas (v minutách)"
          value={cas}
          onChange={(e) => setCas(e.target.value)} // Aktualizuje stav "cas"
          required // Pole je povinné
          min="1" // Minimální hodnota je 1
        />
        {/* Textarea pro zadání samotného receptu */}
        <textarea
          placeholder="Text receptu"
          value={recept}
          onChange={(e) => setRecept(e.target.value)} // Aktualizuje stav "recept"
          rows="5" // Počet viditelných řádků
          required // Pole je povinné
        />
        {/* Zobrazení úspěšné zprávy */}
        {message && <p style={{ color: "green" }}>{message}</p>}
        {/* Zobrazení chybové zprávy */}
        {error && <p className="error-message">{error}</p>}
        {/* Tlačítko pro odeslání formuláře */}
        <button type="submit">Odeslat recept</button>
      </form>
    </div>
  );
}
