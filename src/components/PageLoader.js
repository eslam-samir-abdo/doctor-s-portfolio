import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./PageLoader.css";

// Timing plan (all in ms) — kept in one place so the JS state changes
// and the CSS animation durations always stay in sync.
// Overlay fade-in: 180ms (CSS), Capsule spin: 320ms (CSS)
const STAMP_DELAY_MS = 300; // when the stamp starts appearing (slightly before capsule fully settles)
const STAMP_MS = 260;       // stamp reveal animation duration
const HOLD_MS = 100;        // how long the finished stamp stays on screen
const FADE_OUT_MS = 200;    // overlay fade-out duration

const FADE_OUT_START = STAMP_DELAY_MS + STAMP_MS + HOLD_MS;
const UNMOUNT_AT = FADE_OUT_START + FADE_OUT_MS;

// Quick capsule -> stamp animation, shown briefly on every route change.
// Skips on the very first render (the full IntroAnimation already covers that).
export default function PageLoader() {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [phase, setPhase] = useState("loading");
  const isFirstRender = useRef(true);
  const timers = useRef([]);
  const raf = useRef(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Clear anything left over from a previous, fast navigation
    timers.current.forEach(clearTimeout);
    if (raf.current) cancelAnimationFrame(raf.current);
    timers.current = [];

    setMounted(true);
    setFadeIn(false);
    setPhase("loading");

    // Fade in on the next frame so the opacity transition actually plays
    raf.current = requestAnimationFrame(() => setFadeIn(true));

    timers.current = [
      setTimeout(() => setPhase("stamp"), STAMP_DELAY_MS),
      setTimeout(() => setFadeIn(false), FADE_OUT_START),
      setTimeout(() => setMounted(false), UNMOUNT_AT),
    ];

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      timers.current.forEach(clearTimeout);
    };
  }, [location.pathname]);

  if (!mounted) return null;

  return (
    <div className={`pageloader-overlay ${fadeIn ? "pageloader-overlay--visible" : ""}`}>
      <div className="pageloader-content">
        <div className={`pageloader-capsule ${phase === "loading" ? "pageloader-capsule--spin" : ""}`}>
          <span className="pageloader-capsule-half pageloader-capsule-half--teal" />
          <span className="pageloader-capsule-half pageloader-capsule-half--gold" />
        </div>
        <div className={`pageloader-stamp ${phase !== "loading" ? "pageloader-stamp--visible" : ""}`} aria-hidden="true">
          <svg viewBox="0 0 120 120" width="64" height="64">
            <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
            <text x="60" y="64" textAnchor="middle" fontSize="13" fontFamily="JetBrains Mono, monospace" fill="currentColor" letterSpacing="1">
              R.S.
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
