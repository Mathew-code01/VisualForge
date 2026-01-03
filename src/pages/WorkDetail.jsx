// src/pages/WorkDetail.jsx

// src/pages/WorkDetail.jsx
// src/pages/WorkDetail.jsx
// src/pages/WorkDetail.jsx
import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getVideos } from "../firebase/uploadVideo.js";
import { FiArrowLeft, FiMail, FiArrowRight } from "react-icons/fi";
import {
  MdOutlineHighQuality,
  MdAccessTime,
  MdCalendarToday,
} from "react-icons/md";
import "./../styles/pages/workdetail.css";

const VideoPlayer = ({ work }) => {
  const [isReady, setIsReady] = useState(false);
  if (!work?.url)
    return <div className="player-error">Source unavailable.</div>;

  const isVimeo = work.url.includes("vimeo.com");
  const vimeoId = isVimeo ? work.url.split("/").pop() : null;

  return (
    <div className={`video-stage-minimal ${isReady ? "ready" : "loading"}`}>
      {/* Visual Loader for the Video Element itself */}
      {!isReady && (
        <div className="video-preloader">
          <span>Buffering Master...</span>
        </div>
      )}

      {isVimeo ? (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
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
          controls
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

  // 1. Auto-Scroll to Top on Navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videos = await getVideos();
        setAllWorks(videos);
      } catch (err) {
        console.error("Failed to fetch works:", err);
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

  // 2. High-End Page Loader
  if (loading) {
    return (
      <div className="minimal-page-loader">
        <div className="loader-content">
          <span className="loader-label">BigDay Studio</span>
          <span className="loader-text">Retrieving Asset...</span>
        </div>
      </div>
    );
  }

  if (!work) {
    return (
      <div className="work-detail-minimal error-state">
        <div className="bar-inner">
          <button onClick={() => navigate("/work")} className="nav-btn-minimal">
            <FiArrowLeft /> Return to Index
          </button>
        </div>
        <div className="error-message-elite">
          <h2>Asset Not Found</h2>
          <p>The requested sequence does not exist in the current archive.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="work-detail-minimal">
      <nav className="detail-action-bar">
        <div className="bar-inner">
          <button onClick={() => navigate("/work")} className="nav-btn-minimal">
            <FiArrowLeft /> Index
          </button>
          <div className="bar-center">
            <span className="bar-tag">{work.category} // 2026</span>
          </div>
          <a
            href={`mailto:studio@BigDay-Media.com?subject=Inquiry: ${work.title}`}
            className="nav-btn-minimal highlight"
          >
            <FiMail /> Inquiry
          </a>
        </div>
      </nav>

      <main className="detail-grid">
        <div className="detail-content-left">
          <section className="theater-minimal">
            <VideoPlayer work={work} />
            <div className="theater-meta">
              <div className="meta-pills">
                <span className="pill">
                  <MdOutlineHighQuality /> 4K Masters
                </span>
                <span className="pill">
                  <MdAccessTime /> {work.duration || "00:00"}
                </span>
                <span className="pill">
                  <MdCalendarToday /> {work.year || "2026"}
                </span>
              </div>
            </div>
          </section>

          <section className="project-info">
            <h1 className="project-title">{work.title}</h1>
            <p className="project-description">{work.description}</p>

            <div className="cta-minimal-group">
              <a href="mailto:studio@BigDay-Media.com" className="btn-solid">
                Start Project Inquiry <FiArrowRight />
              </a>
            </div>
          </section>
        </div>

        <aside className="detail-sidebar-minimal">
          <div className="info-card-minimal">
            <h4 className="sidebar-label">Technical Specs</h4>
            <div className="spec-row">
              <span>Category</span>
              <strong>{work.category}</strong>
            </div>
            <div className="spec-row">
              <span>Master Delivery</span>
              <strong>Commercial Editorial</strong>
            </div>
          </div>

          {recommended.length > 0 && (
            <div className="suggestion-minimal">
              <h4 className="sidebar-label">Discovery</h4>
              {recommended.map((item) => (
                <Link
                  key={item.id}
                  to={`/work/${item.id}`}
                  className="mini-card"
                >
                  <div className="mini-thumb">
                    <img src={item.thumbnail} alt="" />
                  </div>
                  <div className="mini-details">
                    <h6>{item.title}</h6>
                    <p>{item.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </aside>
      </main>

      {/* Zebra Layout Footer: Ensure this is a Dark Section if the above is White */}
      <footer className="pagination-minimal">
        {prevWork && (
          <Link to={`/work/${prevWork.id}`} className="pag-link">
            <span className="pag-dir">Previous Asset</span>
            <span className="pag-name">{prevWork.title}</span>
          </Link>
        )}
        {nextWork && (
          <Link to={`/work/${nextWork.id}`} className="pag-link next">
            <span className="pag-dir">Next Asset</span>
            <span className="pag-name">{nextWork.title}</span>
          </Link>
        )}
      </footer>
    </div>
  );
}