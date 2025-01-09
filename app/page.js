"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import LoginForm from "./components/loginForm";
import Admin from "./components/admin";
import Moderator from "./components/moderator";
import User from "./components/user";

export default function Home() {
  const [user, setUser] = useState(null);
  const [recepty, setRecepty] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchRecepty = async () => {
      try {
        const res = await fetch("/api/getData");
        const data = await res.json();

        if (res.ok) {
          setRecepty(data.slice(0, 4)); // Zobrazíme pouze poslední 4 recepty
          setError("");
        } else {
          setError(data.error || "Nepodařilo se načíst recepty.");
        }
      } catch (error) {
        setError("Došlo k neočekávané chybě.");
      }
    };

    fetchRecepty();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <Head>
        <title>Vaření pro každého | Recepty online</title>
        <meta
          name="description"
          content="Vaření pro každého – objevte jednoduché recepty, chutná jídla a inspiraci do kuchyně. Staňte se mistrem vaření s našimi recepty!"
        />
        <meta
          name="keywords"
          content="recepty, vaření, kuchyně, jídlo, česká kuchyně"
        />
        <meta name="author" content="Recepty Tým" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <header className="header">
        <h1>Recepty Online</h1>
        <p>Inspirace a nápady do kuchyně</p>
      </header>
      <main className="main">
        <section className="recepty-section">
          <h2 className="recepty-title">Naše poslední recepty</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="recepty-container">
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
        </section>
        {!user ? (
          <section className="login-section">
            <h2 className="login-title">
              Chceš více receptů? Přihlas se k našemu portálu!
            </h2>
            <LoginForm onLogin={setUser} />
          </section>
        ) : (
          <>
            {user.role === "admin" && <Admin />}
            {user.role === "moderator" && <Moderator />}
            {user.role === "user" && <User />}
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </main>
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Recepty Online. Všechna práva vyhrazena.
        </p>
        <p>
          Sledujte nás na <a href="https://facebook.com">Facebooku</a>,{" "}
          <a href="https://instagram.com">Instagramu</a> a dalších sítích.
        </p>
      </footer>
    </>
  );
}
