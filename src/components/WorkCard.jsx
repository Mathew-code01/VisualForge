// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { MdFullscreen, MdArrowForward } from "react-icons/md"; // Cleaner icons
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
      className="work-card-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ "--delay": `${index * 0.1}s` }}
    >
      <div className="work-card-inner">
        <div className="work-thumb-wrapper">
          
          {/* Main Loader */}
          {!imageLoaded && (
            <div className="card-loader-overlay">
              <div className="shimmer-effect"></div>
              <FaSpinner className="spinner-icon" />
            </div>
          )}

          <img
            src={work.thumbnail}
            alt={work.title}
            className={`main-thumb ${imageLoaded ? "visible" : "hidden"}`}
            onLoad={() => setImageLoaded(true)}
          />

          {enableHoverPreview && videoSrc && !isVimeo && (
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              loop
              playsInline
              preload="metadata"
              crossOrigin="anonymous" 
              onLoadedData={() => setVideoReady(true)}
              className={`hover-video ${isHovering && videoReady ? "active" : ""}`}
            />
          )}

          {/* New Overlay UI: Top-right indicator and bottom title fade */}
          <div className={`card-ui-layer ${isHovering ? "active" : ""}`}>
            <div className="top-actions">
              <div className="expand-indicator">
                {isHovering && !videoReady && !isVimeo ? (
                  <FaSpinner className="spinner-icon mini" />
                ) : (
                  <MdFullscreen className="expand-icon" />
                )}
              </div>
            </div>
            
            <div className="bottom-info">
               <span className="click-hint">View Case Study</span>
            </div>
          </div>
        </div>

        <div className="work-card-meta">
          <div className="meta-left">
            <h3 className="work-card-title">{work.title}</h3>
            <div className="tag-row">
                <span className="work-card-tag">{work.category}</span>
                <span className="dot">•</span>
                <span className="project-year">{work.year || "2025"}</span>
            </div>
          </div>
          <div className="meta-right">
             <MdArrowForward className="meta-arrow" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkCard;