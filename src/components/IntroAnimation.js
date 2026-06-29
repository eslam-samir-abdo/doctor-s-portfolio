import React, { useEffect, useState } from "react";
import "./IntroAnimation.css";

const SEEN_KEY = "reham_intro_seen";

export default function IntroAnimation({ onFinish }) {
  const [skip] = useState(() => sessionStorage.getItem(SEEN_KEY) === "true");
  const [phase, setPhase] = useState("loading"); // loading -> stamp -> done

  useEffect(() => {
    if (skip) {
      onFinish();
      return;
    }
    sessionStorage.setItem(SEEN_KEY, "true");

    const t1 = setTimeout(() => setPhase("stamp"), 1100);
    const t2 = setTimeout(() => setPhase("done"), 1900);
    const t3 = setTimeout(() => onFinish(), 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (skip) return null;

  return (
    <div className={`intro-overlay intro-${phase}`}>
      <div className="intro-content">
        <div className="intro-capsule">
          <span className="intro-capsule-half intro-capsule-half--teal" />
          <span className="intro-capsule-half intro-capsule-half--gold" />
        </div>
        <div className="intro-stamp" aria-hidden="true">
          <svg viewBox="0 0 120 120" width="92" height="92">
            <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
            <text x="60" y="56" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace" fill="currentColor" letterSpacing="1">
              VERIFIED
            </text>
            <text x="60" y="72" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="currentColor" letterSpacing="1">
              PHARM-D
            </text>
          </svg>
        </div>
        <p className="intro-label">Reham Samir</p>
      </div>
    </div>
  );
}
