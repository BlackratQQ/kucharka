import { NextResponse } from "next/server";

export async function POST(req) {
  // Definice uživatelů přímo v API handleru
  const users = [
    { id: 1, username: "admin", password: "admin123", role: "admin" },
    { id: 2, username: "user", password: "user123", role: "user" },
    {
      id: 3,
      username: "moderator",
      password: "moderator123",
      role: "moderator",
    },
  ];

  // Načtení dat z těla požadavku
  const { username, password } = await req.json();

  // Vyhledání uživatele podle uživatelského jména a hesla
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  // Pokud uživatel neexistuje
  if (!user) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  // Pokud uživatel existuje
  return NextResponse.json({
    id: user.id,
    username: user.username,
    role: user.role,
  });
}
