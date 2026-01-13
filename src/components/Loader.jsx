// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
import { useEffect, useState, useRef } from "react";
import "../styles/components/loader.css";

export default function Loader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [videoReady, setVideoReady] = useState(false); // New: Track video readiness
  const progressRef = useRef(0);
  const videoRef = useRef(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    document.body.classList.add("loader-active-lock");

    // Only start the progress logic once the background video is ready
    if (!videoReady) return;

    let isPageLoaded = false;
    const handleLoad = () => { isPageLoaded = true; };

    if (document.readyState === "complete") {
      isPageLoaded = true;
    } else {
      window.addEventListener("load", handleLoad);
    }

    const interval = setInterval(() => {
      let increment = 0;
      if (!isPageLoaded) {
        // Slow crawl while waiting for heavy assets
        const remaining = 95 - progressRef.current;
        increment = Math.max(0.01, Math.random() * (remaining / 60));
      } else {
        // Faster finish once window.load triggers
        increment = 2.5;
      }

      progressRef.current += increment;

      if (progressRef.current >= 100) {
        progressRef.current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => triggerExit(), 1000); // Elegant delay at 100%
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
  }, [onLoadingComplete, videoReady]);

  return (
    <div className={`loader-agency-elite ${isExiting ? "exit-active" : ""}`}>
      <div className="loader-bg-wrapper">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          onCanPlayThrough={() => setVideoReady(true)} // Crucial: Detect video load
          className={`loader-video-asset ${videoReady ? "visible" : "hidden"}`}
        >
          <source src="/assets/loader-bg.mp4" type="video/mp4" />
        </video>
        <div className="loader-vignette" />
      </div>

      <div className="loader-content-wrap">
        <header className="loader-ui-top">
          <div className="ui-item">
            <span className="label">PROJECT</span>
            <span className="value">BDMA_ARCHIVE_{currentYear}</span>
          </div>
          <div className="status-wrap">
            <div className={`rec-dot ${progress < 100 ? "active" : ""}`} />
            <span className="value-status">
              {!videoReady ? "SYNCING VIDEO" : progress < 100 ? "INITIALIZING" : "READY"}
            </span>
          </div>
        </header>

        <main className="loader-hero">
          <div className="brand-reveal">
            <h1 className="main-logo">BIGDAY MEDIA</h1>
            <p className="tagline">Visual Excellence Built for Impact</p>
          </div>

          <div className="progress-system">
            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="progress-data">
              <span className="data-label">COMPILE_ASSETS</span>
              <span className="data-percent">{progress}%</span>
            </div>
          </div>
        </main>

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