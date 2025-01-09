"use client";

import { useEffect, useState } from "react";
import User from "./components/user";
import Admin from "./components/admin";
import LoginForm from "./components/loginForm";
import Moderator from "./components/moderator";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) {
    return <LoginForm onLogin={setUser} />;
  }

  return (
    <div className="container">
      {user.role === "admin" && <Admin />}
      {user.role === "moderator" && <Moderator />}
      {user.role === "user" && <User />}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
