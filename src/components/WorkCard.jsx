// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { FiArrowUpRight, FiPlay } from "react-icons/fi";
import { useState, useRef } from "react";
import "../styles/components/workcard.css";

const WorkCard = ({ work, index, enableHoverPreview }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef(null);

  const videoSrc = work.url;
  const isVimeo = videoSrc?.includes("vimeo.com");

  const handleMouseEnter = () => {
    setIsHovering(true);
    // Only play if video is ready and not a Vimeo link (handled differently)
    if (enableHoverPreview && videoSrc && videoReady && !isVimeo) {
      videoRef.current.play().catch((e) => console.warn("Playback blocked", e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current && !isVimeo) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      to={`/work/${work.id}`}
      className="work-card-vibrant"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // FIXED: Used 'index' here to create a staggered entrance effect
      style={{ "--card-index": index }}
    >
      <div className="work-card-inner">
        <div className="work-thumb-wrapper">
          {/* 1. INITIAL IMAGE SHIMMER */}
          {!imageLoaded && (
            <div className="card-loader-technical">
              <div className="shimmer-line"></div>
              <span className="load-text">INIT_V_FILE</span>
            </div>
          )}

          <img
            src={work.thumbnail}
            alt={work.title}
            className={`main-thumb ${imageLoaded ? "visible" : "hidden"}`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* 2. VIDEO PREVIEW (Technical Loading State) */}
          {enableHoverPreview && videoSrc && !isVimeo && (
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              loop
              playsInline
              preload="metadata"
              className={`hover-video ${
                isHovering && videoReady ? "active" : ""
              }`}
              onLoadedData={() => setVideoReady(true)}
            />
          )}

          {/* 3. INTERACTIVE OVERLAY */}
          <div className={`card-overlay-vibrant ${isHovering ? "active" : ""}`}>
            <div className="overlay-badge-technical">
              {videoReady ? (
                <>
                  <FiPlay />
                  <span>MONITOR_SOURCE</span>
                </>
              ) : (
                <>
                  <div className="mini-buffer-bar">
                    <div className="buffer-fill"></div>
                  </div>
                  <span>BUFFERING_MASTER</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* METADATA: High-end layout */}
        <div className="work-card-info">
          <div className="info-top">
            <span className="card-category">{work.category}</span>
            <span className="card-year">{work.year || "2026"}</span>
          </div>
          <div className="info-bottom">
            <h3 className="card-title-text">{work.title}</h3>
            <div className="arrow-circle">
              <FiArrowUpRight />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkCard;