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
} from "react-icons/md";
import "./../styles/pages/workdetail.css";

// Optimized Video Component with Loading States
const VideoPlayer = ({ work, isMini }) => {
  const [isReady, setIsReady] = useState(false);
  if (!work?.url) return <div className="player-error">Source Unavailable</div>;

  const isVimeo = work.url.includes("vimeo.com");
  const vimeoId = isVimeo ? work.url.split("/").pop() : null;

  return (
    <div
      className={`video-stage-wrapper ${isMini ? "mini" : "full"} ${
        isReady ? "ready" : "loading"
      }`}
    >
      {!isReady && <div className="video-shimmer" />}
      {isVimeo ? (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479${
            isMini ? "&background=1&autoplay=1&muted=1" : ""
          }`}
          onLoad={() => setIsReady(true)}
          frameBorder="0"
          allow="autoplay; fullscreen"
          className="video-element"
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videos = await getVideos();
        setAllWorks(videos);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { work, prevWork, nextWork, recommended } = useMemo(() => {
    const idx = allWorks.findIndex((w) => w.id === id);
    return {
      work: allWorks[idx] || null,
      prevWork: allWorks[idx - 1] || null,
      nextWork: allWorks[idx + 1] || null,
      recommended: allWorks.filter((w) => w.id !== id).slice(0, 4),
    };
  }, [id, allWorks]);

  // Handle intersection for the mini-player
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setMiniVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [loading, id]);

  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading)
    return (
      <div className="cinematic-loader">
        <span>Loading Scene...</span>
      </div>
    );
  if (!work)
    return (
      <div className="error-screen">
        <h1>Project Disappeared</h1>
        <button onClick={() => navigate("/work")}>Back to Gallery</button>
      </div>
    );

  return (
    <div className="work-detail-root">
      {/* Visual Ambiance: Large blurred thumbnail in background */}
      <div
        className="ambient-glow"
        style={{ backgroundImage: `url(${work.thumbnail})` }}
      />

      {/* Persistent Navigation */}
      <nav className="detail-nav-bar">
        <button onClick={() => navigate(-1)} className="nav-btn-back">
          <MdArrowBack /> <span>Projects</span>
        </button>
        <div className="nav-project-title">{work.title}</div>
        <button
          className={`nav-btn-share ${copied ? "active" : ""}`}
          onClick={handleShare}
        >
          {copied ? "Link Saved" : <MdShare />}
        </button>
      </nav>

      <main className="detail-layout-grid">
        <div className="main-content-stream">
          {/* Section: Video Stage */}
          <section className="theater-section" ref={videoRef}>
            <VideoPlayer work={work} />
            <div className="theater-footer">
              <div className="tag-group">
                <span className="pill">
                  <MdOutlineCategory /> {work.category}
                </span>
                <span className="pill">
                  <MdOutlineCalendarToday /> {work.year || "2024"}
                </span>
              </div>
              <button className="favorite-btn">
                <MdFavoriteBorder />
              </button>
            </div>
          </section>

          {/* Section: Case Study & Details */}
          <section className="description-section">
            <h1 className="cinematic-title">{work.title}</h1>
            <div className="body-copy">
              <p>{work.description}</p>
            </div>

            <div className="action-button-block">
              <a href="mailto:contact@studio.com" className="btn-main-action">
                Start Collaboration
              </a>
              <button className="btn-secondary-action" onClick={handleShare}>
                Share Project
              </button>
            </div>
          </section>

          {/* Section: Project Paging */}
          <footer className="project-pager">
            {prevWork && (
              <Link to={`/work/${prevWork.id}`} className="pager-link prev">
                <label>Previous</label>
                <h3>{prevWork.title}</h3>
              </Link>
            )}
            {nextWork && (
              <Link to={`/work/${nextWork.id}`} className="pager-link next">
                <label>Next Up</label>
                <h3>{nextWork.title}</h3>
              </Link>
            )}
          </footer>
        </div>

        {/* Aside: Recommendations */}
        <aside className="sidebar-content">
          <div className="sticky-box">
            <h4 className="sidebar-label">More Projects</h4>
            <div className="recommendation-list">
              {recommended.map((item) => (
                <Link
                  key={item.id}
                  to={`/work/${item.id}`}
                  className="rec-card-modern"
                >
                  <div className="rec-img">
                    <img src={item.thumbnail} alt="" />
                  </div>
                  <div className="rec-txt">
                    <h5>{item.title}</h5>
                    <span>{item.category}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/work" className="archive-link">
              View Full Archive →
            </Link>
          </div>
        </aside>
      </main>

      {/* Corner Miniature Player */}
      <div className={`corner-dock ${miniVisible ? "is-visible" : ""}`}>
        <VideoPlayer work={work} isMini />
        <div className="dock-meta">
          <h6>{work.title}</h6>
          <button onClick={() => window.scrollTo(0, 0)}>
            <MdOpenInFull />
          </button>
        </div>
      </div>
    </div>
  );
}