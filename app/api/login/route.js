import { NextResponse } from "next/server"; // Pomáhá vytvářet odpovědi pro API

// Seznam uživatelů s jejich údaji
const users = [
  { id: 1, username: "admin", password: "admin123", role: "admin" }, // Admin uživatel
  { id: 2, username: "user", password: "user123", role: "user" }, // Běžný uživatel
];

// Hlavní funkce, která zpracovává POST požadavek (přihlašování)
export async function POST(req) {
  // Načtení dat z těla požadavku (odeslané uživatelské jméno a heslo)
  const { username, password } = await req.json();

  // Hledání uživatele v seznamu podle uživatelského jména a hesla
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  // Pokud uživatel není nalezen (špatné jméno nebo heslo)
  if (!user) {
    return NextResponse.json(
      { error: "Invalid username or password" }, // Odpověď s chybovou zprávou
      { status: 401 } // HTTP status: Unauthorized (neautorizovaný přístup)
    );
  }

  // Pokud uživatel existuje, vrátíme jeho údaje (bez hesla)
  return NextResponse.json({
    id: user.id, // ID uživatele
    username: user.username, // Uživatelské jméno
    role: user.role, // Role (admin nebo user)
  });
}
