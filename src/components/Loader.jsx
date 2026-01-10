// src/components/Loader.jsx
// src/components/Loader.jsx
import { useEffect, useState, useRef } from "react";
import "../styles/components/loader.css";

export default function Loader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const progressRef = useRef(0);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    document.body.classList.add("loader-active-lock");

    let isPageLoaded = false;
    const handleLoad = () => {
      isPageLoaded = true;
    };
    if (document.readyState === "complete") {
      isPageLoaded = true;
    } else {
      window.addEventListener("load", handleLoad);
    }

    const interval = setInterval(() => {
      let increment = 0;
      if (!isPageLoaded) {
        const remaining = 95 - progressRef.current;
        increment = Math.max(0.02, Math.random() * (remaining / 40));
      } else {
        increment = 3.5;
      }

      progressRef.current += increment;

      if (progressRef.current >= 100) {
        progressRef.current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => triggerExit(), 800);
      } else {
        setProgress(Math.floor(progressRef.current));
      }
    }, 40);

    const triggerExit = () => {
      setIsExiting(true);
      setTimeout(() => {
        document.body.classList.remove("loader-active-lock");
        if (onLoadingComplete) onLoadingComplete();
      }, 1000);
    };

    return () => {
      window.removeEventListener("load", handleLoad);
      clearInterval(interval);
      document.body.classList.remove("loader-active-lock");
    };
  }, [onLoadingComplete]);

  return (
    <div className={`loader-agency-elite ${isExiting ? "exit-active" : ""}`}>
      <div className="loader-bg-wrapper">
        <video autoPlay muted loop playsInline className="loader-video-asset">
          <source src="/assets/loader-bg.mp4" type="video/mp4" />
        </video>
        <div className="loader-vignette" />
      </div>

      <div className="loader-content-wrap">
        {/* TOP BAR: Technical Data */}
        <header className="loader-ui-top">
          <div className="ui-item">
            <span className="label">PROJECT</span>
            <span className="value">BDMA_ARCHIVE_{currentYear}</span>
          </div>
          <div className="status-wrap">
            <div className={`rec-dot ${progress < 100 ? "active" : ""}`} />
            <span className="value-status">
              {progress < 100 ? "INITIALIZING" : "READY"}
            </span>
          </div>
        </header>

        {/* CENTER: Studio Identity */}
        <main className="loader-hero">
          <div className="brand-reveal">
            <h1 className="main-logo">BIGDAY MEDIA AGENCY</h1>
            <p className="tagline">Visual Excellence Built for Impact</p>
          </div>

          <div className="progress-system">
            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="progress-data">
              <span className="data-label">COMPILE_STAGES</span>
              <span className="data-percent">{progress}%</span>
            </div>
          </div>
        </main>

        {/* BOTTOM BAR: Signatures */}
        <footer className="loader-ui-bottom">
          <div className="ui-item">
            <span className="label">LEAD EDITOR</span>
            <span className="value-bold">MATHEW.EXE</span>
          </div>

          <div className="ui-item text-right">
            <span className="label">SYSTEM VERSION</span>
            <span className="value">©_{currentYear}_STABLE</span>
          </div>
        </footer>
      </div>
    </div>
  );
}