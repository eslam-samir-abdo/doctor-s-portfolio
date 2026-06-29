import React, { createContext, useContext, useState, useEffect } from "react";

const ADMIN_PASSWORD = "reham2000";
const SESSION_KEY = "reham_admin_logged_in";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Stay logged in for the browser session (not after closing the tab)
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored === "true") setIsAdmin(true);
  }, []);

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setLoginError("");
      sessionStorage.setItem(SESSION_KEY, "true");
      return true;
    }
    setLoginError("Incorrect password. Try again.");
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, loginError, setLoginError }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
