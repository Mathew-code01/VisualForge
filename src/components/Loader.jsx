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
        // PHASE 1: Page still loading - Dynamic crawl
        // It gets slower as it approaches 90 to "wait" for the assets
        const remaining = 90 - progressRef.current;
        increment = Math.max(0.05, Math.random() * (remaining / 20));
      } else {
        // PHASE 2: Page is LOADED - Acceleration
        // Rapidly climb the remaining distance to 100
        increment = 2.5;
      }

      progressRef.current += increment;

      // Ensure we hit the final sequence: 98 -> 99 -> 100
      if (progressRef.current >= 100) {
        progressRef.current = 100;
        setProgress(100);
        clearInterval(interval);

        // Final aesthetic pause so the user actually sees "100"
        setTimeout(() => triggerExit(), 700);
      } else {
        setProgress(Math.floor(progressRef.current));
      }
    }, 30); // High frequency for smooth counting

    const triggerExit = () => {
      setIsExiting(true);
      setTimeout(() => {
        document.body.classList.remove("loader-active-lock");
        if (onLoadingComplete) onLoadingComplete();
      }, 1100);
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
        <div
          className="loader-overlay"
          style={{ opacity: Math.max(0, 1 - (progress * 1.4) / 100) }}
        />
      </div>

      <div className="loader-content-wrap">
        <header className="loader-ui-top">
          <div className="ui-item">
            <span className="label">SIGNAL</span>
            <span className="value">4K_RAW_LOG</span>
          </div>
          <div className="status-wrap">
            <div className={`rec-dot ${progress < 100 ? "active" : ""}`} />
            <span className="value">
              {progress < 100 ? "CACHING" : "SYNCED"}
            </span>
          </div>
        </header>

        <main className="loader-hero">
          <div className="counter-container">
            <span className="digit-hero">
              {progress.toString().padStart(2, "0")}
            </span>
            <span className="percent-symbol">%</span>
          </div>

          <div className="brand-reveal">
            <h1 className="main-logo">BIGDAY</h1>
            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${progress}%` }}>
                <div className="shimmer" />
              </div>
            </div>
            <p className="tagline">Visual Excellence Built for Impact</p>
          </div>
        </main>

        <footer className="loader-ui-bottom">
          <div className="ui-item">
            <span className="label">BITRATE</span>
            <span className="value">48.2_MBPS</span>
          </div>

          <div className="signature-box">
            <span className="label">DEV_BY</span>
            <span className="dev-signature">MATHEW</span>
          </div>

          <div className="ui-item text-right">
            <span className="label">EDITION</span>
            <span className="value">©_{currentYear}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}