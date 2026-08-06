// src/pages/WorkDetail.jsx

// src/pages/WorkDetail.jsx
// src/pages/WorkDetail.jsx

// src/pages/WorkDetail.jsx

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiMail,
  FiPlay,
} from "react-icons/fi";
import {
  MdOutlineHighQuality,
  MdAccessTime,
  MdCalendarToday,
} from "react-icons/md";

import { getVideos } from "../firebase/uploadVideo.js";
import "../styles/pages/workdetail.css";

/* ================================================================
   VIDEO PLAYER
   Full player with native controls — distinct from the muted
   autoplay SmartVideo previews used on the Work index.
================================================================ */

function VideoPlayer({ work }) {
  const [isReady, setIsReady] = useState(false);

  if (!work?.url) {
    return <div className="wd-player__error">Source unavailable.</div>;
  }

  const isVimeo = work.url.includes("vimeo.com");
  const vimeoId = isVimeo ? work.url.split("/").pop() : null;

  return (
    <div className={`wd-player ${isReady ? "is-ready" : "is-loading"}`}>
      {!isReady && (
        <div className="wd-player__preloader">
          <span className="wd-player__preloader-ring" aria-hidden="true" />
          <span className="mono">Buffering master…</span>
        </div>
      )}

      {isVimeo ? (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
          onLoad={() => setIsReady(true)}
          title={work.title || "Project video"}
          frameBorder="0"
          allow="autoplay; fullscreen"
          className="wd-player__media"
        />
      ) : (
        <video
          src={work.url}
          poster={work.thumbnail}
          onLoadedData={() => setIsReady(true)}
          className="wd-player__media"
          controls
          playsInline
        />
      )}
    </div>
  );
}

/* ================================================================
   PAGE
================================================================ */

export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [allWorks, setAllWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const videos = await getVideos();
        if (!controller.signal.aborted) {
          setAllWorks(Array.isArray(videos) ? videos : []);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to fetch works:", error);
          setAllWorks([]);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  const { work, prevWork, nextWork, recommended } = useMemo(() => {
    const index = allWorks.findIndex((w) => w.id === id);

    if (index === -1) {
      return { work: null, prevWork: null, nextWork: null, recommended: [] };
    }

    return {
      work: allWorks[index],
      prevWork: allWorks[index - 1] || null,
      nextWork: allWorks[index + 1] || null,
      recommended: allWorks.filter((w) => w.id !== id).slice(0, 3),
    };
  }, [id, allWorks]);

  /* ============================================================
     LOADING STATE
  ============================================================ */

  if (loading) {
    return (
      <div className="wd-loader theme-dark" data-theme="dark">
        <span className="eyebrow">Big Day</span>
        <p className="wd-loader__text mono">Retrieving asset…</p>
      </div>
    );
  }

  /* ============================================================
     NOT FOUND
  ============================================================ */

  if (!work) {
    return (
      <div className="wd-notfound theme-dark" data-theme="dark">
        <div className="container wd-notfound__inner">
          <span className="eyebrow">Work</span>
          <h1 className="wd-notfound__title">Asset not found.</h1>
          <p className="wd-notfound__text">
            The requested project doesn&apos;t exist in the current archive.
          </p>

          <button type="button" onClick={() => navigate("/work")} className="btn btn-primary">
            <FiArrowLeft aria-hidden="true" />
            Return to Work
          </button>
        </div>
      </div>
    );
  }

  /* ============================================================
     DETAIL PAGE
  ============================================================ */

  return (
    <main className="wd">
      {/* ==========================================================
          ACTION BAR (dark)
      ========================================================== */}

      <nav className="wd-actionbar theme-dark" data-theme="dark" aria-label="Project navigation">
        <div className="container wd-actionbar__inner">
          <button type="button" onClick={() => navigate("/work")} className="wd-actionbar__link">
            <FiArrowLeft aria-hidden="true" />
            Index
          </button>

          <span className="wd-actionbar__tag mono">
            {work.category || "Selected Work"} — {work.year || new Date().getFullYear()}
          </span>

          <a
            href={`mailto:studio@bigday.com?subject=Booking: ${work.title || "Project"}`}
            className="wd-actionbar__link wd-actionbar__link--highlight"
          >
            <FiMail aria-hidden="true" />
            Booking
          </a>
        </div>
      </nav>

      {/* ==========================================================
          THEATER + INFO (dark)
      ========================================================== */}

      <section className="wd-theater theme-dark" data-theme="dark">
        <div className="container wd-theater__grid">
          <div className="wd-theater__main">
            <div className="wd-theater__frame media-frame">
              <VideoPlayer work={work} />
            </div>

            <div className="wd-theater__pills">
              <span className="wd-pill">
                <MdOutlineHighQuality aria-hidden="true" />
                4K Master
              </span>
              <span className="wd-pill">
                <MdAccessTime aria-hidden="true" />
                {work.duration || "00:00"}
              </span>
              <span className="wd-pill">
                <MdCalendarToday aria-hidden="true" />
                {work.year || new Date().getFullYear()}
              </span>
            </div>

            <div className="wd-info">
              <h1 className="wd-info__title">{work.title || "Untitled Project"}</h1>

              <p className={`wd-info__description ${!work.description ? "is-empty" : ""}`}>
                {work.description || "Visual narrative currently in development."}
              </p>

              <a
                href={`mailto:studio@bigday.com?subject=Booking: ${work.title || "Project"}`}
                className="btn btn-primary btn-lg wd-info__cta"
              >
                Start a Project
                <FiArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside className="wd-sidebar">
            <div className="wd-sidebar__card surface">
              <h4 className="wd-sidebar__label">Technical Specs</h4>

              <div className="wd-sidebar__row">
                <span>Category</span>
                <strong>{work.category || "—"}</strong>
              </div>

              <div className="wd-sidebar__row">
                <span>Delivery</span>
                <strong>Commercial Editorial</strong>
              </div>

              <div className="wd-sidebar__row">
                <span>Resolution</span>
                <strong>4K</strong>
              </div>
            </div>

            {recommended.length > 0 && (
              <div className="wd-sidebar__card wd-sidebar__card--suggestions surface">
                <h4 className="wd-sidebar__label">Discover More</h4>

                <div className="wd-suggestions">
                  {recommended.map((item) => (
                    <Link key={item.id} to={`/work/${item.id}`} className="wd-suggestion">
                      <div className="wd-suggestion__thumb">
                        {item.thumbnail ? (
                          <img src={item.thumbnail} alt="" loading="lazy" />
                        ) : (
                          <span className="wd-suggestion__thumb-fallback" aria-hidden="true">
                            <FiPlay />
                          </span>
                        )}
                      </div>

                      <div className="wd-suggestion__meta">
                        <h6>{item.title || "Untitled"}</h6>
                        <p>{item.category || "Selected Work"}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ==========================================================
          PAGINATION (light)
      ========================================================== */}

      <footer className="wd-pagination theme-light" data-theme="light">
        <div className="container wd-pagination__grid">
          {prevWork ? (
            <Link to={`/work/${prevWork.id}`} className="wd-pagination__link">
              <span className="wd-pagination__dir">
                <FiArrowLeft aria-hidden="true" />
                Previous
              </span>
              <span className="wd-pagination__name">{prevWork.title || "Untitled"}</span>
            </Link>
          ) : (
            <span className="wd-pagination__spacer" aria-hidden="true" />
          )}

          {nextWork ? (
            <Link to={`/work/${nextWork.id}`} className="wd-pagination__link wd-pagination__link--next">
              <span className="wd-pagination__dir">
                Next
                <FiArrowRight aria-hidden="true" />
              </span>
              <span className="wd-pagination__name">{nextWork.title || "Untitled"}</span>
            </Link>
          ) : (
            <span className="wd-pagination__spacer" aria-hidden="true" />
          )}
        </div>
      </footer>
    </main>
  );
}