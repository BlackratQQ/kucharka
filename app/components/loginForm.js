import { useState } from "react"; // Importuje hook useState pro správu lokálního stavu

// Komponenta LoginForm slouží k přihlašování uživatele
export default function LoginForm({ onLogin }) {
  // Lokální stavy pro uživatelské jméno, heslo a chybovou zprávu
  const [username, setUsername] = useState(""); // Uchovává hodnotu z pole pro uživatelské jméno
  const [password, setPassword] = useState(""); // Uchovává hodnotu z pole pro heslo
  const [error, setError] = useState(""); // Uchovává chybovou zprávu

  // Funkce pro zpracování přihlášení
  const handleLogin = async (e) => {
    e.preventDefault(); // Zabrání obnovení stránky při odeslání formuláře

    try {
      // Odeslání přihlašovacích údajů na API endpoint
      const res = await fetch("/api/login", {
        method: "POST", // Typ požadavku (POST)
        headers: { "Content-Type": "application/json" }, // Nastavení hlaviček
        body: JSON.stringify({ username, password }), // Převod dat na JSON
      });

      const data = await res.json(); // Zpracování odpovědi z API

      if (res.ok) {
        // Pokud API vrátí úspěch
        localStorage.setItem("user", JSON.stringify(data)); // Uloží uživatelská data do localStorage
        onLogin(data); // Volá callback funkci, která nastaví uživatele
        setError(""); // Vyčistí chybovou zprávu
      } else {
        // Pokud API vrátí chybu
        setError(data.error || "Invalid credentials"); // Nastaví chybovou zprávu
      }
    } catch (error) {
      // Ošetření neočekávaných chyb
      console.error("Error during login:", error); // Zaloguje chybu do konzole
      setError("Something went wrong. Please try again."); // Nastaví obecnou chybovou zprávu
    }
  };

  return (
    <div className="login-form">
      {/* Nadpis formuláře */}
      <h1>Login</h1>
      {/* Přihlašovací formulář */}
      <form onSubmit={handleLogin}>
        {/* Pole pro uživatelské jméno */}
        <input
          type="text"
          placeholder="Uživatel"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Aktualizuje stav username
          required // Pole je povinné
        />
        {/* Pole pro heslo */}
        <input
          type="password"
          placeholder="Heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Aktualizuje stav password
          required // Pole je povinné
        />
        {/* Zobrazení chybové zprávy, pokud existuje */}
        {error && <p className="error-message">{error}</p>}
        {/* Tlačítko pro odeslání formuláře */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
