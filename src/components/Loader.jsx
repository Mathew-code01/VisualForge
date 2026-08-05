// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx

import { useEffect, useRef, useState } from "react";
import logoMark from "../assets/BIG DAY LOGO-03.png";
import "../styles/components/loader.css";

const MIN_DISPLAY_MS = 1200;
const EXIT_DURATION_MS = 600;

export default function Loader({ onFinish }) {
  const [phase, setPhase] = useState("entering");
  const startRef = useRef(null);


  // ✅ LOCK SCROLL WHILE LOADER EXISTS
  useEffect(() => {
    document.body.classList.add("loading");

    return () => {
      document.body.classList.remove("loading");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);


  useEffect(() => {
    startRef.current = performance.now();

    const revealTimer = setTimeout(() => {
      setPhase("holding");
    }, 100);

    const exitTimer = setTimeout(() => {
      setPhase("exiting");
    }, MIN_DISPLAY_MS);

    const finishTimer = setTimeout(() => {
      setPhase("done");
      onFinish?.();
    }, MIN_DISPLAY_MS + EXIT_DURATION_MS);


    return () => {
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };

  }, [onFinish]);


  if (phase === "done") return null;


  return (
    <div
      className={`loader-container loader-container--${phase}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Big Day"
    >
      <div className="loader-atmosphere" aria-hidden="true">
        <div className="loader-glow loader-glow--one" />
        <div className="loader-glow loader-glow--two" />
        <div className="loader-grain" />
      </div>

      <div className="loader-stage">
        <div className="loader-logo-wrap">
          <img src={logoMark} alt="Big Day" className="loader-logo" draggable="false" />
          <span className="loader-sweep" aria-hidden="true" />
        </div>

        <div className="loader-rule" aria-hidden="true">
          <span className="loader-rule-fill" />
        </div>
      </div>
    </div>
  );
}