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

  // Force Video Playback & Handle Autoplay Blocks
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log(
          "Autoplay prevented. Video will load on interaction or buffer.",
          error
        );
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              if (onLoadingComplete) onLoadingComplete();
            }, 1000);
          }, 600);
          return 100;
        }
        const increment = Math.floor(Math.random() * 2) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className={`loader-agency-elite ${isExiting ? "exit-active" : ""}`}>
      {/* VIDEO BACKGROUND WITH POSTER FALLBACK */}
      <div className="loader-video-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/loader-poster.jpg" // Ensure this path is correct in your public folder
          className="loader-video-asset"
          preload="auto"
        >
          <source src="/assets/loader-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Lighter overlay so video is more visible */}
        <div className="loader-video-vignette" />
      </div>

      {/* REVEAL PANELS (Only active on exit) */}
      <div className="loader-panel panel-left"></div>
      <div className="loader-panel panel-right"></div>

      <div className="loader-content-wrap">
        <div className="loader-top-bar">
          <span className="meta-tag">BIGDAY_STUDIO_{currentYear}</span>
          <span className="status-tag blink">● BROADCASTING</span>
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
            <span>RES: 4K</span>
            <span>FPS: 24</span>
            <span>CODEC: RAW</span>
          </div>
          <div className="dev-signature">DEV_BY_MATHERE</div>
        </div>
      </div>
    </div>
  );
}