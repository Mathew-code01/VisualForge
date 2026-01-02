// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { FiArrowUpRight, FiPlay } from "react-icons/fi"; // More modern, thinner icons
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
      className="work-card-vibrant"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ "--delay": `${index * 0.1}s` }}
    >
      <div className="work-card-inner">
        <div className="work-thumb-wrapper">
          {/* Main Loader / Shimmer */}
          {!imageLoaded && (
            <div className="card-loader-vibrant">
              <div className="shimmer-bar"></div>
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
              className={`hover-video ${
                isHovering && videoReady ? "active" : ""
              }`}
              onLoadedData={() => setVideoReady(true)}
            />
          )}

          {/* Interactive Overlay */}
          <div className={`card-overlay-vibrant ${isHovering ? "active" : ""}`}>
            <div className="overlay-badge">
              {videoReady ? <FiPlay /> : <FaSpinner className="spin" />}
              <span>{videoReady ? "Preview" : "Loading"}</span>
            </div>
            {/* <div className="view-case-btn">
              <span>View Case Study</span>
              <FiArrowUpRight />
            </div> */}
          </div>
        </div>

        {/* Metadata: Clean & High-Contrast */}
        <div className="work-card-info">
          <div className="info-top">
            <span className="card-category">{work.category}</span>
            <span className="card-year">{work.year || "2025"}</span>
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