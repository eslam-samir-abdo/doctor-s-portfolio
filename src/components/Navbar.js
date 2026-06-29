import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import "./Navbar.css";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/experience", label: "Experience" },
  { to: "/certificates", label: "Certificates" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAdmin, logout } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLockClick = () => {
    if (isAdmin) {
      logout();
    } else {
      navigate("/admin");
    }
    setOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <span className="navbar__brand-mark">R</span>
          <span className="navbar__brand-text">Reham Samir</span>
        </NavLink>

        <nav className={`navbar__links ${open ? "navbar__links--open" : ""}`}>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
              onClick={() => setOpen(false)}
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}

          <button
            className={`navbar__lock ${isAdmin ? "navbar__lock--active" : ""}`}
            onClick={handleLockClick}
            aria-label={isAdmin ? "Log out of admin mode" : "Admin login"}
            title={isAdmin ? "Log out of admin mode" : "Admin login"}
          >
            {isAdmin ? "🔓" : "🔒"}
          </button>
        </nav>

        <button
          className={`navbar__burger ${open ? "navbar__burger--open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
