// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx

import { useEffect, useMemo, useRef, useState } from "react";

import logoMark from "../assets/BIG DAY LOGO-03.png";

import "../styles/components/loader.css";

const STATUS_MESSAGES = [
  "Initializing",
  "Loading Assets",
  "Preparing Experience",
  "Almost Ready",
];

export default function Loader({ onLoadingComplete, minDuration = 2200 }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const progressRef = useRef(0);
  const startRef = useRef(null);

  const currentMessage = useMemo(() => {
    const index = Math.min(
      STATUS_MESSAGES.length - 1,
      Math.floor((progress / 100) * STATUS_MESSAGES.length)
    );
    return STATUS_MESSAGES[index];
  }, [progress]);

  /* Lock scroll while the loader is mounted */
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  /* Drive progress against a real clock, not arbitrary increments,
     so the loader always resolves at roughly minDuration regardless
     of frame rate. */
  useEffect(() => {
    let frame;

    const tick = (timestamp) => {
      if (startRef.current === null) startRef.current = timestamp;

      const elapsed = timestamp - startRef.current;
      const ratio = Math.min(elapsed / minDuration, 1);

      /* Ease-out so the final stretch feels deliberate, not abrupt */
      const eased = 1 - Math.pow(1 - ratio, 3);
      const next = Math.round(eased * 100);

      progressRef.current = next;
      setProgress(next);

      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      setIsExiting(true);

      setTimeout(() => {
        document.body.style.overflow = "";
        onLoadingComplete?.();
      }, 650);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [minDuration, onLoadingComplete]);

  return (
    <div
      className={`bd-loader theme-dark ${isExiting ? "is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${progress}% complete`}
    >
      <div className="bd-loader__glow" aria-hidden="true" />

      <div className="bd-loader__content">
        <div className="bd-loader__mark">
          <img src={logoMark} alt="Big Day" className="bd-loader__logo" />
        </div>

        <div className="bd-loader__status">
          <span className="mono">{currentMessage}</span>
          <span className="mono bd-loader__percent">{progress}%</span>
        </div>

        <div className="bd-loader__bar">
          <div
            className="bd-loader__bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}