// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { useState, useRef, useEffect } from "react"; // Added useEffect
import "../styles/components/workcard.css";

const WorkCard = ({ work, index, enableHoverPreview }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isClamped, setIsClamped] = useState(false); // New State
  const videoRef = useRef(null);
  const descriptionRef = useRef(null); // New Ref

  const videoSrc = work.url;
  const isVimeo = videoSrc?.includes("vimeo.com");

  // Logic to check if text overflows the 2-line limit
  useEffect(() => {
    if (descriptionRef.current) {
      const { scrollHeight, clientHeight } = descriptionRef.current;
      setIsClamped(scrollHeight > clientHeight);
    }
  }, [work.description]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (enableHoverPreview && videoSrc && videoReady && !isVimeo) {
      videoRef.current.play().catch((e) => console.warn("Playback blocked", e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setProgress(0);
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
      style={{ "--card-index": index }}
    >
      <div className="work-card-inner">
        <div className="work-thumb-wrapper">
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
              onTimeUpdate={handleTimeUpdate}
            />
          )}

          <div className={`card-overlay-vibrant ${isHovering ? "active" : ""}`}>
            <div className="overlay-badge-technical">
              <div className="rec-dot"></div>
              <span>
                {videoReady ? "PREVIEWING_SOURCE / 4K_RAW" : "BUFFERING_SOURCE"}
              </span>
            </div>
            <div className="overlay-playback-bar">
              <div
                className="playback-fill"
                style={{ transform: `translateX(${progress - 100}%)` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="work-card-info">
          <div className="info-meta-row">
            <span className="card-category">{work.category}</span>
            <span className="card-year">{work.year || "2026"}</span>
          </div>

          <div className="info-title-row">
            <h3 className="card-title-text">{work.title}</h3>
            <div className="arrow-wrap">
              <FiArrowUpRight />
            </div>
          </div>

          <div className="info-description-row">
            <p
              ref={descriptionRef}
              className={`card-description ${
                !work.description ? "is-empty" : ""
              }`}
            >
              {work.description || "Visual narrative currently in development."}
            </p>
            {/* Show 'Read More' only if text is truncated AND description exists */}
            {isClamped && work.description && (
              <span className="read-more-trigger">View Detail</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkCard;