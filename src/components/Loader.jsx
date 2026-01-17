// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
import { useEffect, useState, useRef } from "react";
import "../styles/components/loader.css";

// Critical assets to preload
import theArchiveImg from "../assets/images/theArchive.webp";
import visualExcellenceImg from "../assets/images/visualExcellence.webp";

export default function Loader({ onLoadingComplete, isTransition = false }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [videoReady, setVideoReady] = useState(isTransition);
  const [assetsReady, setAssetsReady] = useState(false);

  const progressRef = useRef(0);
  const currentYear = new Date().getFullYear();

  const unlockScreenSovereign = () => {
    document.body.classList.remove("loader-active-lock");
    document.body.style.overflow = "visible";
    document.body.style.height = "auto";
    document.documentElement.style.overflow = "visible";
    document.documentElement.style.height = "auto";
    window.dispatchEvent(new Event("resize"));
  };

  useEffect(() => {
    document.body.classList.add("loader-active-lock");

    const images = [theArchiveImg, visualExcellenceImg];
    let loaded = 0;
    if (images.length === 0) {
      setAssetsReady(true);
    } else {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = img.onerror = () => {
          loaded++;
          if (loaded === images.length) setAssetsReady(true);
        };
      });
    }

    if (!videoReady) return;

    const interval = setInterval(
      () => {
        let increment = 0;
        if (isTransition) {
          increment = 12.0; // Snappy for navigation
        } else if (document.readyState !== "complete" || !assetsReady) {
          const remaining = 95 - progressRef.current;
          increment = Math.max(0.01, Math.random() * (remaining / 40));
        } else {
          increment = 4.0;
        }

        progressRef.current += increment;

        if (progressRef.current >= 100) {
          progressRef.current = 100;
          setProgress(100);
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              unlockScreenSovereign();
              if (onLoadingComplete) onLoadingComplete();
            }, 800);
          }, 300);
        } else {
          setProgress(Math.floor(progressRef.current));
        }
      },
      isTransition ? 16 : 30
    );

    return () => {
      clearInterval(interval);
      unlockScreenSovereign();
    };
  }, [videoReady, assetsReady, isTransition, onLoadingComplete]);

  return (
    <div
      className={`loader-agency-elite ${isExiting ? "exit-active" : ""} ${
        isTransition ? "mode-transition" : "mode-intro"
      }`}
    >
      {/* Video Background: Only for Grand Intro (Dark) */}
      {!isTransition && (
        <div className="loader-bg-wrapper">
          <video
            autoPlay
            muted
            loop
            playsInline
            onCanPlayThrough={() => setVideoReady(true)}
            className={`loader-video-asset ${
              videoReady ? "visible" : "hidden"
            }`}
          >
            <source src="/assets/loader-bg.mp4" type="video/mp4" />
          </video>
          <div className="loader-vignette" />
        </div>
      )}

      <div className="loader-content-wrap">
        <header className="loader-ui-top">
          <div className="ui-item">
            <span className="label">PROJECT</span>
            <span className="value">BDMA_ARCHIVE_{currentYear}</span>
          </div>
          <div className="status-wrap">
            <div className={`rec-dot ${progress < 100 ? "active" : ""}`} />
            <span className="value-status">
              {isTransition ? "ROUTING" : !videoReady ? "SYNCING" : "ACTIVE"}
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
              <span>{isTransition ? "INTERNAL_LINK" : "LOADING_ASSETS"}</span>
              <span>{progress}%</span>
            </div>
          </div>
        </main>

        <footer className="loader-ui-bottom">
          <div className="ui-item">
            <span className="label">LEAD EDITOR</span>
            <span className="value-bold">MATHEW.EXE</span>
          </div>
          <div className="ui-item text-right">
            <span className="label">VERSION</span>
            <span className="value">©_{currentYear}_STABLE</span>
          </div>
        </footer>
      </div>
    </div>
  );
}