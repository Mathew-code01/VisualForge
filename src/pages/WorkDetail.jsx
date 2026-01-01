// src/pages/WorkDetail.jsx

// src/pages/WorkDetail.jsx
// src/pages/WorkDetail.jsx
// src/pages/WorkDetail.jsx
// src/pages/WorkDetail.jsx
import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getVideos } from "../firebase/uploadVideo.js";
import {
  FiArrowLeft,
  FiShare2,
  FiExternalLink,
  FiHeart,
  FiPlay,
  FiMaximize2,
} from "react-icons/fi";
import {
  MdOutlineHighQuality,
  MdAccessTime,
  MdCalendarToday,
} from "react-icons/md";
import "./../styles/pages/workdetail.css";

const VideoPlayer = ({ work, isMini }) => {
  const [isReady, setIsReady] = useState(false);
  if (!work?.url)
    return <div className="player-error">Source unavailable.</div>;

  const isVimeo = work.url.includes("vimeo.com");
  const vimeoId = isVimeo ? work.url.split("/").pop() : null;

  return (
    <div
      className={`video-stage-vibrant ${isMini ? "mini" : "full"} ${
        isReady ? "ready" : "loading"
      }`}
    >
      {!isReady && <div className="video-shimmer-vibrant" />}
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
    if (idx === -1) return { work: null, recommended: [] };
    return {
      work: allWorks[idx],
      prevWork: allWorks[idx - 1] || null,
      nextWork: allWorks[idx + 1] || null,
      recommended: allWorks.filter((w) => w.id !== id).slice(0, 3),
    };
  }, [id, allWorks]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => setMiniVisible(!e.isIntersecting),
      { threshold: 0.1 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [loading, id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading)
    return (
      <div className="vibrant-loader">
        <span>Loading...</span>
      </div>
    );

  return (
    <div className="work-detail-vibrant">
      {/* Floating Action Bar */}
      <nav className="detail-action-bar">
        <div className="bar-inner">
          <button onClick={() => navigate("/work")} className="nav-btn">
            <FiArrowLeft /> Back to Archive
          </button>
          <div className="bar-center">
            <span className="bar-tag">{work.category}</span>
            <span className="bar-title">{work.title}</span>
          </div>
          <button
            className={`nav-btn ${copied ? "active" : ""}`}
            onClick={handleShare}
          >
            {copied ? (
              "Link Copied"
            ) : (
              <>
                <FiShare2 /> Share
              </>
            )}
          </button>
        </div>
      </nav>

      <main className="detail-grid">
        <div className="detail-content-left">
          {/* Main Stage */}
          <section className="theater-vibrant" ref={videoRef}>
            <VideoPlayer work={work} isMini={false} />
            <div className="theater-controls">
              <div className="control-pills">
                <span className="pill">
                  <MdOutlineHighQuality /> 4K Master
                </span>
                <span className="pill">
                  <MdAccessTime /> {work.duration || "00:00"}
                </span>
                <span className="pill">
                  <MdCalendarToday /> {work.year || "2025"}
                </span>
              </div>
              <button className="fav-btn">
                <FiHeart />
              </button>
            </div>
          </section>

          {/* Description Block */}
          <section className="project-description-vibrant">
            <h1 className="display-title-vibrant">{work.title}</h1>
            <p className="large-lead-text">{work.description}</p>

            <div className="cta-group">
              <a href="mailto:hello@bigday.com" className="btn-vibrant-primary">
                Start a similar project
              </a>
              <button className="btn-vibrant-outline" onClick={handleShare}>
                Copy URL
              </button>
            </div>
          </section>

          {/* Pagination */}
          <footer className="footer-pagination">
            {prevWork && (
              <Link to={`/work/${prevWork.id}`} className="pag-card">
                <span className="pag-label">Prev</span>
                <span className="pag-title">{prevWork.title}</span>
              </Link>
            )}
            {nextWork && (
              <Link to={`/work/${nextWork.id}`} className="pag-card next">
                <span className="pag-label">Next</span>
                <span className="pag-title">{nextWork.title}</span>
              </Link>
            )}
          </footer>
        </div>

        {/* Floating Sidebar */}
        <aside className="detail-sidebar-vibrant">
          <div className="sidebar-sticky">
            <div className="info-card">
              <h4 className="info-title">Project Data</h4>
              <div className="info-row">
                <span>Role</span>
                <strong>Editor / VFX</strong>
              </div>
              <div className="info-row">
                <span>Software</span>
                <strong>Premiere / AE</strong>
              </div>
              <div className="info-row">
                <span>Client</span>
                <strong>Internal</strong>
              </div>
            </div>

            <div className="suggestion-block">
              <h4 className="info-title">Recommended</h4>
              {recommended.map((item) => (
                <Link
                  key={item.id}
                  to={`/work/${item.id}`}
                  className="side-item"
                >
                  <div className="side-img">
                    <img src={item.thumbnail} alt="" />
                  </div>
                  <div className="side-text">
                    <h6>{item.title}</h6>
                    <p>{item.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* Mini Player */}
      <div className={`mini-player-vibrant ${miniVisible ? "visible" : ""}`}>
        <VideoPlayer work={work} isMini={true} />
        <div className="mini-info">
          <div>
            <h6>{work.title}</h6>
            <p>Floating Preview</p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <FiMaximize2 />
          </button>
        </div>
      </div>
    </div>
  );
}