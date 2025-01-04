"use client"; // Tato direktiva označuje, že komponenta je klientská (používá se v Next.js 13+ s App Routerem)

import { useEffect, useState } from "react"; // Importuje hooky pro správu stavu a efektů
import User from "./components/user"; // Importuje komponentu pro uživatele
import Admin from "./components/admin"; // Importuje komponentu pro administrátora
import LoginForm from "./components/loginForm"; // Importuje komponentu pro přihlášení

// Hlavní komponenta aplikace
export default function Home() {
  const [user, setUser] = useState(null); // Stav pro uchování informací o přihlášeném uživateli

  // Při načtení stránky se zkontroluje, zda jsou informace o uživateli uložené v localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Načte uživatele z localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Pokud uživatel existuje, nastaví ho do stavu
    }
  }, []); // Prázdné pole závislostí zajišťuje, že efekt se spustí pouze jednou při načtení stránky

  // Funkce pro odhlášení uživatele
  const handleLogout = () => {
    localStorage.removeItem("user"); // Odstraní informace o uživateli z localStorage
    setUser(null); // Vymaže uživatele ze stavu
  };

  // Pokud uživatel není přihlášen, zobrazí se formulář pro přihlášení
  if (!user) {
    return <LoginForm onLogin={setUser} />; // Předává funkci `setUser` jako prop pro přihlášení
  }

  // Pokud je uživatel přihlášen, zobrazí obsah podle role (admin nebo user)
  return (
    <div className="container">
      {user.role === "admin" ? <Admin /> : <User />}{" "}
      {/* Zobrazí admin nebo user obsah */}
      {/* Tlačítko pro odhlášení */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
