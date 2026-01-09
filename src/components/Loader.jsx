// src/components/Loader.jsx
// src/components/Loader.jsx
import { useEffect, useState } from "react";
import "../styles/components/loader.css";

export default function Loader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    document.body.classList.add("loader-active-lock");

    let start = 0;
    const interval = setInterval(() => {
      // "Intelligent" loading: speeds up and slows down for a realistic feel
      const jump = Math.random() * 15;
      start += jump;

      if (start >= 100) {
        start = 100;
        clearInterval(interval);
        setTimeout(() => triggerExit(), 800);
      }
      setProgress(Math.floor(start));
    }, 120);

    const triggerExit = () => {
      setIsExiting(true);
      setTimeout(() => {
        document.body.classList.remove("loader-active-lock");
        if (onLoadingComplete) onLoadingComplete();
      }, 1400);
    };

    return () => {
      clearInterval(interval);
      document.body.classList.remove("loader-active-lock");
    };
  }, [onLoadingComplete]);

  return (
    <div className={`loader-agency-elite ${isExiting ? "exit-active" : ""}`}>
      {/* BACKGROUND MEDIA LAYER */}
      <div className="loader-bg-wrapper">
        <video autoPlay muted loop playsInline className="loader-video-asset">
          <source src="/assets/loader-bg.mp4" type="video/mp4" />
        </video>
        <div className="loader-anamorphic-vignette" />
        <div className="loader-film-grain" />
        <div
          className="loader-overlay"
          style={{ opacity: 1 - progress / 100 }}
        />
      </div>

      {/* CONTENT LAYER */}
      <div className="loader-content-wrap">
        {/* TOP META DATA */}
        <div className="loader-ui-top">
          <div className="ui-group">
            <span className="meta-label">SOURCE</span>
            <span className="meta-value">RAW_LOG_4K</span>
          </div>
          <div className="status-indicator">
            <span
              className={`status-dot ${progress < 100 ? "recording" : ""}`}
            ></span>
            <span className="status-text">
              {progress < 100 ? "BUFFERING_CLIENT_WORK" : "PLAYBACK_READY"}
            </span>
          </div>
        </div>

        {/* CENTERPIECE: THE COUNTER */}
        <div className="loader-center-frame">
          <div className="counter-container">
            <span className="counter-large">
              {progress.toString().padStart(2, "0")}
            </span>
            <span className="unit">%</span>
          </div>

          <div className="brand-reveal">
            <h1 className="main-logo">BIGDAY</h1>
            <div className="progress-bar-minimal">
              <div className="progress-fill" style={{ width: `${progress}%` }}>
                <div className="progress-glint" />
              </div>
            </div>
            <p className="tagline">Cinematic Visuals & Precision Editing</p>
          </div>
        </div>

        {/* BOTTOM TECHNICAL DATA */}
        <div className="loader-ui-bottom">
          <div className="tech-group">
            <div className="ui-group">
              <span className="meta-label">BITRATE</span>
              <span className="meta-value">48.2_MBPS</span>
            </div>
            <div className="ui-group desktop-only">
              <span className="meta-label">CODEC</span>
              <span className="meta-value">H.265_PRO</span>
            </div>
          </div>

          <div className="signature-group">
            <span className="meta-label">DEVELOPED_BY</span>
            <span className="dev-signature">MATHEW</span>
          </div>

          <div className="ui-group text-right">
            <span className="meta-label">EDITION</span>
            <span className="meta-value">{currentYear}</span>
          </div>
        </div>
      </div>
    </div>
  );
}