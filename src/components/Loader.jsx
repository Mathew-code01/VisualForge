// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
import { useRef, useEffect, useState } from "react";
import "../styles/components/loader.css";

export default function Loader({ onLoadingComplete }) {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // 1. Progress Logic
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Small delay before closing to let the '100%' be seen
          setTimeout(() => {
            setIsExiting(true);
            // Tell the parent component to show the website after animation finishes
            setTimeout(() => {
              if (onLoadingComplete) onLoadingComplete();
            }, 800);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 45); // Adjust speed to match the man's walk

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className={`loader-agency-elite ${isExiting ? "exit-active" : ""}`}>
      {/* BACKGROUND ELEMENTS */}
      <div className="loader-vibrant-bg" />
      <div className="loader-blue-glow" />

      {/* CINEMATIC LOCAL VIDEO - SHARP VERSION */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/loader-poster.jpg"
        className="loader-video-bg"
        preload="auto"
      >
        <source src="/assets/loader-bg.mp4" type="video/mp4" />
      </video>

      <div className="loader-video-overlay" />

      <div className="loader-content-core">
        <div className="metadata-top">
          <span className="code-tag">BIGDAY_SESSION_{currentYear}</span>
          <div className="rec-container">
            <span className="status-blink">● CONNECTING</span>
            <span className="timer-live">LN_0.1.4</span>
          </div>
        </div>

        <div className="loader-center-text">
          <h1 className="loader-title-cinematic">
            BIGDAY<span className="cursor">_</span>
          </h1>
          <p className="loader-subtext">Visual Excellence Built for Impact</p>
        </div>

        <div className="progress-technical">
          <div className="percentage-display">
            <span className="label">ESTABLISHING SECURE LINK</span>
            <span className="number">{progress}%</span>
          </div>
          <div className="hairline-bar">
            <div className="fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="loader-footer-meta">
        <span>SIGNAL: 10-BIT</span>
        <span>RES: 4K_UHD</span>
        <span>EST_2026</span>
      </div>
    </div>
  );
}