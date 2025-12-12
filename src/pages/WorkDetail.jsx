// src/pages/WorkDetail.jsx

// src/pages/WorkDetail.jsx
// src/pages/WorkDetail.jsx
// src/pages/WorkDetail.jsx
// src/pages/WorkDetail.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import works from "../data/works";
import "./../styles/pages/workdetail.css";
import "../styles/theme.css";

/**
 * NETFLIX-CINEMATIC Work Detail
 * Robust YouTube setup:
 *  - Uses YT iframe API to detect video end (for autoplay prompt)
 *  - Uses IntersectionObserver (debounced) to show a sticky mini-player
 *  - Recommended list supports "show more" when long
 */

/* helper: load YouTube iframe API once */
function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
      return;
    }
    const existing = document.getElementById("yt-iframe-api");
    if (existing) {
      // if script already injected, wait for ready handler
      const wait = () => {
        if (window.YT && window.YT.Player) resolve(window.YT);
        else setTimeout(wait, 50);
      };
      wait();
      return;
    }
    const script = document.createElement("script");
    script.id = "yt-iframe-api";
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);
    // youtube will call global onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      resolve(window.YT);
    };
  });
}

export default function WorkDetail() {
  const { id } = useParams();
  const workIndex = works.findIndex((w) => w.id === id);
  const work = works[workIndex];

  const prevWork = works[workIndex - 1] || null;
  const nextWork = works[workIndex + 1] || null;

  // UI state
  const [showNextPrompt, setShowNextPrompt] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [miniVisible, setMiniVisible] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  // recommended list state: show only first N, show more toggle
  const INITIAL_RECOMMENDED = 6;
  const [recommendedLimit, setRecommendedLimit] = useState(INITIAL_RECOMMENDED);
  const [showAllRecommended, setShowAllRecommended] = useState(false);

  // refs
  const videoWrapRef = useRef(null);
  const mainPlayerRef = useRef(null);
  const miniPlayerRef = useRef(null);
  const ytMain = useRef(null);
  const ytMini = useRef(null);
  const observerRef = useRef(null);
  const debounceRef = useRef(null);
  const countdownRef = useRef(null);

  // Scroll to top on id change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Recommended: toggle show more
  useEffect(() => {
    setRecommendedLimit(showAllRecommended ? Infinity : INITIAL_RECOMMENDED);
  }, [showAllRecommended]);

  // IntersectionObserver -> detects when main video leaves viewport and shows mini
  useEffect(() => {
    const el = videoWrapRef.current;
    if (!el) return;

    // debounce to avoid flicker
    const handle = (entries) => {
      const entry = entries[0];
      // if less than 0.2 in viewport show mini
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        // we want mini when the video bottom is above a threshold (i.e., not visible)
        setMiniVisible(!entry.isIntersecting);
      }, 80);
    };

    observerRef.current = new IntersectionObserver(handle, {
      threshold: 0.5,
    });

    observerRef.current.observe(el);

    return () => {
      if (observerRef.current && el) observerRef.current.unobserve(el);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [videoWrapRef, id]);

  // Autoplay countdown (starts when showNextPrompt true)
  useEffect(() => {
    if (!showNextPrompt) {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
      setCountdown(5);
      return;
    }

    countdownRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(countdownRef.current);
          countdownRef.current = null;
          if (nextWork) window.location.href = `/work/${nextWork.id}`;
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
    };
  }, [showNextPrompt, nextWork]);

  // YouTube player setup (single hook)
  useEffect(() => {
    if (!work) return;

    let mounted = true;

    const videoId = (work.video || "").split("v=")[1] || work.video || "";
    // if videoId contains &, strip extra params
    const cleanVideoId = videoId?.split?.("&")?.[0] || videoId;

    // initialize players
    loadYouTubeAPI().then((YT) => {
      if (!mounted) return;

      // destroy previous
      if (ytMain.current && ytMain.current.destroy) {
        try {
          ytMain.current.destroy();
        } catch (err) {
          console.log(err);
        }
        ytMain.current = null;
      }
      if (ytMini.current && ytMini.current.destroy) {
        try {
          ytMini.current.destroy();
        } catch (err) {
          console.log(err);
        }
        ytMini.current = null;
      }

      // main player
      try {
        ytMain.current = new YT.Player(mainPlayerRef.current, {
          videoId: cleanVideoId,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            controls: 1,
          },
          events: {
            onStateChange: (e) => {
              // 0 = ended
              if (e.data === YT.PlayerState.ENDED) {
                if (nextWork) {
                  setShowNextPrompt(true);
                }
              }
            },
          },
        });

        // mini player: keep muted and minimal controls
        ytMini.current = new YT.Player(miniPlayerRef.current, {
          videoId: cleanVideoId,
          playerVars: { autoplay: 0, controls: 0, modestbranding: 1 },
        });
      } catch (err) {
        // fallback: if YT fails, we still show an iframe as fallback
        console.error("YT player init error:", err);
      }
    });

    return () => {
      mounted = false;
      if (ytMain.current && ytMain.current.destroy) {
        try {
          ytMain.current.destroy();
        } catch (err) {
          console.log(err);
        }
      }
      if (ytMini.current && ytMini.current.destroy) {
        try {
          ytMini.current.destroy();
        } catch (err) {
          console.log(err);
        }
      }
    };
    // deliberately include nextWork.id so player re-creates if video changes
  }, [id, work?.video, nextWork?.id]);

  // smart UI helpers
  const toggleRecommended = useCallback(() => {
    setShowAllRecommended((s) => !s);
  }, []);

  // if work missing - render friendly fallback
  if (!work) {
    return (
      <section className="work-detail not-found">
        <h1>Project Not Found</h1>
        <Link to="/work" className="back-link">
          ← Back to work
        </Link>
      </section>
    );
  }

  // derived recommended list (excluding current)
  const recommended = works.filter((w) => w.id !== id);

  return (
    <div className="workdetail-wrapper cinematic">
      {/* sticky mini-player */}
      {miniVisible && (
        <div
          className="mini-player cinematic-mini"
          role="dialog"
          aria-label="Mini video player"
        >
          <div className="yt-frame mini" ref={miniPlayerRef} />
          <div className="mini-meta">
            <div className="mini-title">{work.title}</div>
            <div className="mini-controls">
              <button
                className="btn btn-primary small"
                onClick={() => (window.location.href = `/work/${id}`)}
              >
                Return to player
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="workdetail-layout cinematic-grid">
        <section className="work-detail main-column">
          <div className="video-wrap" ref={videoWrapRef}>
            <div className="work-detail-video-container elevated">
              <div ref={mainPlayerRef} className="yt-frame main" />
            </div>
            <div className="video-actions">
              <button className="btn-outline">Save</button>
              <button className="btn-outline">Share</button>
              <button className="btn-primary">Hire Me</button>
            </div>
          </div>

          <div className="work-meta cinematic-meta-block">
            <h1 className="work-title cinematic-title">{work.title}</h1>

            <div className="meta-row">
              <span className="work-category pill">{work.category}</span>
              <span className="work-date muted">
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(work.date))}
              </span>
            </div>

            <div
              className={`work-description cinematic-card ${
                descExpanded ? "expanded" : ""
              }`}
            >
              <h3>Summary</h3>
              <p
                className={`desc-text ${
                  descExpanded ? "expanded" : "collapsed"
                }`}
              >
                {work.description}
              </p>
              <button
                className="desc-toggle"
                onClick={() => setDescExpanded((s) => !s)}
              >
                {descExpanded ? "Show less" : "Show more"}
              </button>
            </div>

            <div className="work-tools cinematic-card">
              <h4>Tools</h4>
              <div className="tools-list">
                {work.tools.map((t, i) => (
                  <span key={i} className="tool-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="navigation-row">
              {prevWork ? (
                <Link className="nav-link prev" to={`/work/${prevWork.id}`}>
                  ← {prevWork.title}
                </Link>
              ) : (
                <div />
              )}

              {nextWork ? (
                <Link className="nav-link next" to={`/work/${nextWork.id}`}>
                  {nextWork.title} →
                </Link>
              ) : (
                <div />
              )}
            </div>

            <Link to="/work" className="back-link muted">
              ← Back to Project
            </Link>
          </div>
        </section>

        <aside className="recommended-sidebar side-column">
          <div className="recommended-header">
            <h3>Up Next</h3>
            <small className="muted">
              {recommended.length} recommendations
            </small>
          </div>

          <div className="recommended-list">
            {recommended.slice(0, recommendedLimit).map((item) => (
              <Link
                key={item.id}
                to={`/work/${item.id}`}
                className="recommended-card"
              >
                <div
                  className="thumb"
                  style={{ backgroundImage: `url(${item.thumbnail})` }}
                />
                <div className="rec-info">
                  <h4>{item.title}</h4>
                  <div className="rec-meta">
                    <span className="muted">{item.category}</span>
                    <span className="muted">
                      {" "}
                      • {new Date(item.date).getFullYear()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {recommended.length > INITIAL_RECOMMENDED && (
            <button className="show-more" onClick={toggleRecommended}>
              {showAllRecommended
                ? "Show less"
                : `Show all (${recommended.length})`}
            </button>
          )}
        </aside>
      </div>

      {/* autoplay prompt */}
      {showNextPrompt && nextWork && (
        <div
          className="next-video-prompt cinematic-modal"
          role="dialog"
          aria-modal="true"
        >
          <div className="prompt-box cinematic-card">
            <h3>Up Next</h3>
            <p className="muted">{nextWork.title}</p>

            <div className="prompt-actions">
              <button
                className="btn-primary"
                onClick={() => (window.location.href = `/work/${nextWork.id}`)}
              >
                Play now
              </button>
              <button
                className="btn-ghost"
                onClick={() => setShowNextPrompt(false)}
              >
                Cancel
              </button>
            </div>

            <div className="countdown muted">Playing in {countdown}…</div>
          </div>
        </div>
      )}
    </div>
  );
}
