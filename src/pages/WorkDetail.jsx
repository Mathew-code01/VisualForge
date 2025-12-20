// src/pages/WorkDetail.jsx

// src/pages/WorkDetail.jsx
// src/pages/WorkDetail.jsx
// src/pages/WorkDetail.jsx
// src/pages/WorkDetail.jsx
import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getVideos } from "../firebase/uploadVideo.js";
import {
  MdArrowBack,
  MdShare,
  MdOutlineCalendarToday,
  MdOutlineCategory,
  MdOpenInFull,
  MdFavoriteBorder,
  MdOutlineHighQuality,
  MdAccessTime
} from "react-icons/md";
import "./../styles/pages/workdetail.css";

/**
 * SUB-COMPONENT: VideoPlayer
 * Handles Vimeo iframes and HTML5 video with a unified loading state
 */
const VideoPlayer = ({ work, isMini }) => {
  const [isReady, setIsReady] = useState(false);

  if (!work?.url) return (
    <div className="player-error">
      <p>Source format not supported or unavailable.</p>
    </div>
  );

  const isVimeo = work.url.includes("vimeo.com");
  const vimeoId = isVimeo ? work.url.split("/").pop() : null;

  return (
    <div className={`video-stage-wrapper ${isMini ? "mini" : "full"} ${isReady ? "ready" : "loading"}`}>
      {!isReady && <div className="video-shimmer" />}
      
      {isVimeo ? (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479${
            isMini ? "&background=1&autoplay=1&muted=1" : ""
          }`}
          onLoad={() => setIsReady(true)}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          className="video-element"
          title={work.title}
        />
      ) : (
        <video
          src={work.url}
          poster={work.thumbnail}
          onLoadedData={() => setIsReady(true)}
          className="video-element"
          controls={!isMini}
          autoPlay={isMini}
          muted={isMini}
          loop={isMini}
          playsInline
        />
      )}
    </div>
  );
};

export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [allWorks, setAllWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [miniVisible, setMiniVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const videoRef = useRef(null);

  // 1. Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videos = await getVideos();
        setAllWorks(videos);
      } catch (err) {
        console.error("Failed to load project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Project Logic (Next/Prev/Recommended)
  const { work, prevWork, nextWork, recommended } = useMemo(() => {
    const idx = allWorks.findIndex((w) => w.id === id);
    if (idx === -1) return { work: null, recommended: [] };

    return {
      work: allWorks[idx],
      prevWork: allWorks[idx - 1] || null,
      nextWork: allWorks[idx + 1] || null,
      recommended: allWorks.filter((w) => w.id !== id).sort(() => 0.5 - Math.random()).slice(0, 4),
    };
  }, [id, allWorks]);

  // 3. Mini-Player Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only show mini player if we've scrolled past the main player
        setMiniVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = videoRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loading, id]);

  // 4. Scroll Reset
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) return (
    <div className="cinematic-loader-container">
      <div className="loader-ring"></div>
      <span className="loader-text">Loading Visual Assets...</span>
    </div>
  );

  if (!work) return (
    <div className="error-screen">
      <h2 className="error-title">Project Not Found</h2>
      <p className="error-desc">The project you're looking for has been archived or moved.</p>
      <button className="error-back-btn" onClick={() => navigate("/work")}>
        Return to Portfolio
      </button>
    </div>
  );

  return (
    <div className="work-detail-root">
      {/* Dynamic Background Ambiance */}
      <div
        className="ambient-bg-blur"
        style={{ backgroundImage: `url(${work.thumbnail})` }}
      />

      {/* Floating Header */}
      <nav className="detail-top-nav">
        <div className="nav-content-wrapper">
          <div className="nav-left">
            <button onClick={() => navigate("/work")} className="back-link-btn">
              <MdArrowBack /> <span>Back to Work</span>
            </button>
          </div>

          <div className="nav-center">
            <span className="nav-project-name">{work.title}</span>
          </div>

          <div className="nav-right">
            <button
              className={`share-action-btn ${copied ? "copied" : ""}`}
              onClick={handleShare}
            >
              {copied ? (
                "Link Copied"
              ) : (
                <>
                  <MdShare /> <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="detail-container">
        {/* LEFT COLUMN: The "Stage" */}
        <div className="detail-main-flow">
          <section className="video-theater" ref={videoRef}>
            <VideoPlayer work={work} isMini={false} />

            <div className="theater-metadata">
              <div className="meta-pills">
                <span className="meta-pill">
                  <MdOutlineCategory /> {work.category}
                </span>
                <span className="meta-pill">
                  <MdOutlineCalendarToday /> {work.year || "2024"}
                </span>
                <span className="meta-pill">
                  <MdOutlineHighQuality /> 4K Masters
                </span>
              </div>
              <button className="action-icon-btn highlight">
                <MdFavoriteBorder />
              </button>
            </div>
          </section>

          <section className="project-info-block">
            <header className="info-header">
              <h1 className="project-display-title">{work.title}</h1>
              <div className="project-summary-grid">
                <div className="summary-item">
                  <span className="label">Role</span>
                  <span className="value">Editor & Colorist</span>
                </div>
                <div className="summary-item">
                  <span className="label">Software</span>
                  <span className="value">DaVinci Resolve / AE</span>
                </div>
                <div className="summary-item">
                  <span className="label">Duration</span>
                  <span className="value">{work.duration || "02:45"}</span>
                </div>
              </div>
            </header>

            <article className="project-description">
              <h3 className="section-subtitle">Project Brief</h3>
              <p className="description-text">{work.description}</p>
            </article>

            <div className="cta-row">
              <a href="mailto:work@yourstudio.com" className="primary-cta">
                Inquire About Project
              </a>
              <button className="secondary-cta" onClick={handleShare}>
                Copy Project Link
              </button>
            </div>
          </section>

          {/* Pagination */}
          <footer className="detail-pagination">
            {prevWork && (
              <Link
                to={`/work/${prevWork.id}`}
                className="pagination-card prev"
              >
                <span className="dir">Previous Project</span>
                <span className="title">{prevWork.title}</span>
              </Link>
            )}
            <div className="pagination-divider" />
            {nextWork && (
              <Link
                to={`/work/${nextWork.id}`}
                className="pagination-card next"
              >
                <span className="dir">Next Project</span>
                <span className="title">{nextWork.title}</span>
              </Link>
            )}
          </footer>
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <aside className="detail-sidebar">
          <div className="sidebar-sticky-wrap">
            <h4 className="sidebar-title">Discover More</h4>
            <div className="suggested-grid">
              {recommended.map((item) => (
                <Link
                  key={item.id}
                  to={`/work/${item.id}`}
                  className="suggested-card"
                >
                  <div className="suggested-thumb">
                    <img src={item.thumbnail} alt={item.title} loading="lazy" />
                    <div className="thumb-overlay">
                      <MdOpenInFull />
                    </div>
                  </div>
                  <div className="suggested-info">
                    <h5>{item.title}</h5>
                    <span>{item.category}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/work" className="full-archive-btn">
              Browse All Projects
            </Link>
          </div>
        </aside>
      </main>

      {/* Docked Picture-in-Picture Player */}
      <div className={`docked-mini-player ${miniVisible ? "visible" : ""}`}>
        <div className="mini-player-content">
          <VideoPlayer work={work} isMini={true} />
          <div className="mini-meta">
            <div className="mini-text">
              <h6>{work.title}</h6>
              <p>Now Playing</p>
            </div>
            <button
              className="mini-expand"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <MdOpenInFull />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}