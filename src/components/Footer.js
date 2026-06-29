import React from "react";

export default function Footer({ about }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__text">
          © {new Date().getFullYear()} {about?.name || "Reham Samir"} — Pharm-D, Regulatory Affairs
        </p>
        <p className="footer__text footer__text--muted">{about?.location}</p>
      </div>
    </footer>
  );
}
