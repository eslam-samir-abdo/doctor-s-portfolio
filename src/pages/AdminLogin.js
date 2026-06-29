import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import "./AdminLogin.css";

export default function AdminLogin() {
  const { login, isAdmin, loginError } = useAdmin();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (isAdmin) {
    navigate("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(password);
    if (ok) navigate("/");
  };

  return (
    <div className="admin-login section">
      <div className="container admin-login__container">
        <div className="admin-login__card reveal is-visible">
          <div className="admin-login__seal">🔒</div>
          <span className="eyebrow">Admin access</span>
          <h1 className="section-title" style={{ fontSize: "1.8rem", marginBottom: 8 }}>
            Sign in to edit
          </h1>
          <p className="admin-login__hint">
            Enter the admin password to update content across the site.
          </p>

          <form onSubmit={handleSubmit} className="admin-login__form">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {loginError && <p className="admin-login__error">{loginError}</p>}
            <button type="submit" className="btn btn-primary">
              Unlock admin mode
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
