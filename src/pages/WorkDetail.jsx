// src/pages/WorkDetail.jsx

// src/pages/WorkDetail.jsx
// src/pages/WorkDetail.jsx
// src/pages/WorkDetail.jsx
// src/pages/WorkDetail.jsx
import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getVideos } from "../firebase/uploadVideo.js";
import { FiArrowLeft, FiMail, FiHeart, FiMaximize } from "react-icons/fi";
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

  if (loading)
    return (
      <div className="minimal-page-loader">
        <span>Loading Selection</span>
      </div>
    );

  return (
    <div className="work-detail-minimal">
      {/* Refined Action Bar */}
      <nav className="detail-action-bar">
        <div className="bar-inner">
          <button onClick={() => navigate("/work")} className="nav-btn-minimal">
            <FiArrowLeft /> Archive
          </button>
          <div className="bar-center">
            <span className="bar-tag">{work.category}</span>
          </div>
          <a
            href={`mailto:studio@BigDay-Media.com?subject=Project Inquiry: ${work.title}`}
            className="nav-btn-minimal highlight"
          >
            <FiMail /> Inquire
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
                  <MdOutlineHighQuality /> 4K Master
                </span>
                <span className="pill">
                  <MdAccessTime /> {work.duration || "00:00"}
                </span>
                <span className="pill">
                  <MdCalendarToday /> {work.year || "2025"}
                </span>
              </div>
            </div>
          </section>

          <section className="project-info">
            <h1 className="project-title">{work.title}</h1>
            <p className="project-description">{work.description}</p>

            <div className="cta-minimal-group">
              <a href="mailto:studio@BigDay-Media.com" className="btn-solid">
                Start Project
              </a>
            </div>
          </section>
        </div>

        <aside className="detail-sidebar-minimal">
          <div className="info-card-minimal">
            <h4 className="sidebar-label">Project Specs</h4>
            <div className="spec-row">
              <span>Focus</span>
              <strong>{work.category}</strong>
            </div>
            <div className="spec-row">
              <span>Output</span>
              <strong>Commercial Master</strong>
            </div>
          </div>

          <div className="suggestion-minimal">
            <h4 className="sidebar-label">Related Works</h4>
            {recommended.map((item) => (
              <Link key={item.id} to={`/work/${item.id}`} className="mini-card">
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
        </aside>
      </main>

      <footer className="pagination-minimal">
        {prevWork && (
          <Link to={`/work/${prevWork.id}`} className="pag-link">
            <span className="pag-dir">Previous</span>
            <span className="pag-name">{prevWork.title}</span>
          </Link>
        )}
        {nextWork && (
          <Link to={`/work/${nextWork.id}`} className="pag-link next">
            <span className="pag-dir">Next Project</span>
            <span className="pag-name">{nextWork.title}</span>
          </Link>
        )}
      </footer>
    </div>
  );
}