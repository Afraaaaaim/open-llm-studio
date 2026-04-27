"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticated, logout } from "@/shared/lib/auth";
import LoginPage from "./LoginPage";

type AuthCtx = { signOut: () => void };
const AuthContext = createContext<AuthCtx>({ signOut: () => {} });
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, []);

  function signOut() {
    logout();
    setAuthed(false);
  }

  if (authed === null) return null;

  if (!authed) return <LoginPage onAuth={() => setAuthed(true)} />;

  return (
    <AuthContext.Provider value={{ signOut }}>
      {children}
    </AuthContext.Provider>
  );
}