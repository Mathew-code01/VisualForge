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
  const [isReady, setIsReady] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // 1. STRICT SCROLL LOCK: Add class and force scroll to top
    document.body.classList.add("loader-active-lock");
    window.scrollTo(0, 0);

    // 2. ENTRANCE FADE: Softly reveal the loader
    const entranceTimer = setTimeout(() => setIsReady(true), 100);

    // 3. VIDEO PLAYBACK
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    // 4. PROGRESS LOGIC
    let interval;
    const updateProgress = () => {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (document.readyState === "complete") {
            if (prev >= 100) {
              clearInterval(interval);
              triggerExitSequence();
              return 100;
            }
            return prev + 5;
          }
          if (prev >= 90) return 90;
          return prev + 1;
        });
      }, 35);
    };

    const triggerExitSequence = () => {
      setTimeout(() => {
        setIsExiting(true);
        // Clean up after the panel animation (1.1s)
        setTimeout(() => {
          // 5. UNLOCK SCROLL: Only after animations complete
          document.body.classList.remove("loader-active-lock");
          if (onLoadingComplete) onLoadingComplete();
        }, 1100);
      }, 500);
    };

    updateProgress();

    return () => {
      clearInterval(interval);
      clearTimeout(entranceTimer);
      document.body.classList.remove("loader-active-lock");
    };
  }, [onLoadingComplete]);

  return (
    <div
      className={`loader-agency-elite ${isReady ? "is-ready" : ""} ${
        isExiting ? "exit-active" : ""
      }`}
    >
      {/* BACKGROUND VIDEO LAYER */}
      <div className="loader-video-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/loader-poster.jpg"
          className="loader-video-asset"
        >
          <source src="/assets/loader-bg.mp4" type="video/mp4" />
        </video>
        <div className="loader-video-vignette" />
      </div>

      {/* ZEBRA REVEAL PANELS (Slides IN on finish) */}
      <div className="loader-panel panel-left"></div>
      <div className="loader-panel panel-right"></div>

      {/* CONTENT UI LAYER */}
      <div className="loader-content-wrap">
        <div className="loader-top-bar">
          <span className="meta-tag">BIGDAY_SESSION_{currentYear}</span>
          <span className={`status-tag ${progress < 100 ? "blink" : ""}`}>
            ● {progress < 100 ? "BUFFERING" : "READY"}
          </span>
        </div>

        <div className="loader-center-frame">
          <div className="counter-large">
            {progress.toString().padStart(3, "0")}
            <span className="unit">%</span>
          </div>
          <div className="text-reveal">
            <h1 className="main-logo">BIGDAY</h1>
            <p className="tagline">Visual Excellence Built for Impact</p>
          </div>
        </div>

        <div className="loader-bottom-bar">
          <div className="tech-details">
            <span>RES: 4K_UHD</span>
            <span className="divider">/</span>
            <span>BITRATE: 12.4 Mbps</span>
          </div>
          <div className="dev-signature">DEV_BY_MATHEW</div>
        </div>
      </div>
    </div>
  );
}