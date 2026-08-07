// src/pages/AdminVideos.jsx
// src/pages/AdminVideos.jsx
// src/pages/AdminVideos.jsx
// src/pages/AdminVideos.jsx

import { useEffect, useMemo, useRef, useState } from "react";
import {
  RefreshCw,
  Trash2,
  ExternalLink,
  Film,
  Search,
  Filter,
  Play,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Save,
  X,
} from "lucide-react";

import { getVideos, updateVideoDescription } from "../firebase/uploadVideo.js";
import { deleteVideo } from "../firebase/deleteVideo.js";

import {
  SectionHeader,
  Badge,
  LoadingState,
  EmptyState,
  Modal,
  formatDuration,
} from "../components/admin/AdminShared.jsx";

import "../styles/pages/adminvideos.css";

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const filterRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editDesc, setEditDesc] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const checkScroll = () => {
    if (filterRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = filterRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    loadVideos();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  useEffect(() => {
    checkScroll();
  }, [videos, activeCategory]);

  const loadVideos = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      setVideos(await getVideos());
    } catch (err) {
      console.error(err);
      setErrorMessage("Cloud synchronization failed.");
    } finally {
      setLoading(false);
    }
  };

  const scrollFilters = (direction) => {
    if (filterRef.current) {
      filterRef.current.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" });
      setTimeout(checkScroll, 350);
    }
  };

  const filteredVideos = useMemo(() => {
    return videos.filter((vid) => {
      const matchesSearch = vid.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || vid.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [videos, searchQuery, activeCategory]);

  const categories = useMemo(() => ["All", ...new Set(videos.map((v) => v.category || "General"))], [videos]);

  const handleDelete = async (vid) => {
    if (!window.confirm(`Permanently delete "${vid.title}"?`)) return;
    setDeleting(vid.id);
    try {
      await deleteVideo(vid.id, vid.platform, vid.resourceId);
      setVideos((prev) => prev.filter((v) => v.id !== vid.id));
      if (selectedVideo?.id === vid.id) setSelectedVideo(null);
    } catch (err) {
      console.error(err);
      alert("Delete failed. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  const openVideo = (vid) => {
    setSelectedVideo(vid);
    setIsEditing(false);
    setEditDesc(vid.description || "");
  };

  const handleSaveDescription = async () => {
    setIsSaving(true);
    try {
      await updateVideoDescription(selectedVideo.id, editDesc);
      setVideos((prev) => prev.map((v) => (v.id === selectedVideo.id ? { ...v, description: editDesc } : v)));
      setSelectedVideo((prev) => ({ ...prev, description: editDesc }));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to sync description to cloud.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-videos theme-dark" data-theme="dark">
      <section className="admin-panel">
        <div className="admin-panel__inner">
          <SectionHeader
            eyebrow="Library"
            title={<>Studio Assets <span className="count">[{filteredVideos.length}/{videos.length}]</span></>}
            actions={
              <button type="button" className={`btn-outline ${loading ? "is-disabled" : ""}`} onClick={loadVideos} disabled={loading}>
                <RefreshCw size={14} className={loading ? "spin" : ""} /> {loading ? "Syncing" : "Refresh"}
              </button>
            }
          />

          <div className="library-search">
            <Search size={15} />
            <input
              type="text"
              placeholder="Search the library…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {errorMessage && (
            <div className="alert-banner">
              <div><span>{errorMessage}</span></div>
              <button type="button" onClick={() => setErrorMessage(null)} aria-label="Dismiss"><X size={14} /></button>
            </div>
          )}

          {!loading && videos.length > 0 && (
            <div className="filter-row">
              <button
                type="button"
                className="filter-nav-btn"
                onClick={() => scrollFilters("left")}
                style={{ opacity: canScrollLeft ? 1 : 0, pointerEvents: canScrollLeft ? "all" : "none" }}
                aria-label="Scroll filters left"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="filter-strip" ref={filterRef} onScroll={checkScroll}>
                <Filter size={13} className="filter-strip__icon" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`filter-chip ${activeCategory === cat ? "is-active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="filter-nav-btn"
                onClick={() => scrollFilters("right")}
                style={{ opacity: canScrollRight ? 1 : 0, pointerEvents: canScrollRight ? "all" : "none" }}
                aria-label="Scroll filters right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {loading ? (
            <LoadingState label="Loading library…" />
          ) : filteredVideos.length ? (
            <div className="library-grid">
              {filteredVideos.map((vid) => (
                <article className="library-card glass" key={vid.id}>
                  <button type="button" className="library-card__thumb" onClick={() => openVideo(vid)} aria-label={`Preview ${vid.title}`}>
                    <img src={vid.thumbnail} alt="" loading="lazy" />
                    <span className="library-card__play"><Play size={16} fill="currentColor" /></span>
                    <span className="mono library-card__duration">{formatDuration(vid.duration)}</span>
                  </button>

                  <div className="library-card__body">
                    <h4>{vid.title}</h4>

                    <div className="library-card__meta">
                      <Badge tone="neutral">{vid.category || "General"}</Badge>
                      {vid.resolution && <span className="mono">{vid.resolution}</span>}
                    </div>

                    <p className="library-card__desc">{vid.description || "No description yet."}</p>

                    <div className="library-card__actions">
                      <button type="button" className="icon-btn" onClick={() => openVideo(vid)} aria-label="Edit">
                        <Edit3 size={13} />
                      </button>

                      <a href={vid.url} target="_blank" rel="noreferrer" className="icon-btn" aria-label="Open source">
                        <ExternalLink size={13} />
                      </a>

                      <button
                        type="button"
                        className="icon-btn icon-btn--danger"
                        onClick={() => handleDelete(vid)}
                        disabled={deleting === vid.id}
                        aria-label="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="No assets found" text="Try adjusting your search or category filter." icon={Film} />
          )}
        </div>
      </section>

      {/* ============================================================
          VIDEO PLAYER + EDIT MODAL
      ============================================================ */}

      <Modal open={Boolean(selectedVideo)} onClose={() => setSelectedVideo(null)} title={selectedVideo?.title}>
        {selectedVideo && (
          <div className="video-modal">
            <div className="video-modal__player">
              <video src={selectedVideo.url} poster={selectedVideo.thumbnail} controls playsInline />
            </div>

            <div className="video-modal__meta">
              <Badge tone="neutral">{selectedVideo.category || "General"}</Badge>
              <span className="mono">{formatDuration(selectedVideo.duration)}</span>
              {selectedVideo.resolution && <span className="mono">{selectedVideo.resolution}</span>}
            </div>

            <div className="video-modal__desc">
              <div className="video-modal__desc-head">
                <h4>Description</h4>
                {!isEditing && (
                  <button type="button" className="btn-text-only" onClick={() => setIsEditing(true)}>
                    <Edit3 size={13} /> Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <>
                  <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} rows={4} />
                  <div className="video-modal__desc-actions">
                    <button type="button" className="btn-text-only" onClick={() => { setIsEditing(false); setEditDesc(selectedVideo.description || ""); }}>
                      Cancel
                    </button>
                    <button type="button" className="btn-solid btn-solid--sm" onClick={handleSaveDescription} disabled={isSaving}>
                      <Save size={13} /> {isSaving ? "Saving…" : "Save"}
                    </button>
                  </div>
                </>
              ) : (
                <p>{selectedVideo.description || "No description yet."}</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}