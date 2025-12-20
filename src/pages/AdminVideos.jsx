// src/pages/AdminVideos.jsx
// src/pages/AdminVideos.jsx
// src/pages/AdminVideos.jsx
import React, { useEffect, useState, useMemo } from "react";
import { getVideos, deleteVideo } from "../firebase/uploadVideo.js";
import {
  RefreshCw,
  Trash2,
  ExternalLink,
  Film,
  AlertCircle,
  HardDrive,
  Layers,
  Search,
  Filter,
  X,
  Play,
} from "lucide-react";
import "../styles/pages/adminvideos.css";

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null); // Modal State

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    loadVideos();
    // Close modal on Escape key
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await getVideos();
      setVideos(result);
    } catch (err) {
      console.log(err);
      setErrorMessage(
        "Cloud synchronization failed. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredVideos = useMemo(() => {
    return videos.filter((vid) => {
      const matchesSearch = vid.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || vid.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [videos, searchQuery, activeCategory]);

  const categories = useMemo(() => {
    return ["All", ...new Set(videos.map((v) => v.category || "General"))];
  }, [videos]);

  const handleDelete = async (vid) => {
    if (!window.confirm(`Permanently destroy "${vid.title}"?`)) return;
    setDeleting(vid.id);
    try {
      await deleteVideo(vid.id, vid.platform, vid.resourceId);
      setVideos((prev) => prev.filter((v) => v.id !== vid.id));
      if (selectedVideo?.id === vid.id) setSelectedVideo(null);
    } catch (err) {
      console.log(err);
      alert("Asset protection protocol failed.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="studio-manager-root">
      {/* --- SUB-HEADER --- */}
      <div className="admin-sub-header">
        <div className="admin-nav-container">
          <div className="admin-brand-group">
            <div className="admin-icon-box">
              <Layers size={20} />
            </div>
            <div className="admin-brand-text">
              <h1>Studio Assets</h1>
              <p>
                {filteredVideos.length} / {videos.length} items rendered
              </p>
            </div>
          </div>

          <div className="admin-nav-controls">
            <div className="admin-search-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Filter library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className={`admin-sync-btn ${loading ? "spinning" : ""}`}
              onClick={loadVideos}
              disabled={loading}
            >
              <RefreshCw size={14} />
              <span>{loading ? "Syncing" : "Refresh"}</span>
            </button>
          </div>
        </div>
      </div>

      <main className="admin-workspace">
        {/* --- FILTERS --- */}
        {!loading && videos.length > 0 && (
          <div className="admin-filter-strip">
            <Filter size={14} />
            {categories.map((cat) => (
              <button
                key={cat}
                className={`admin-chip ${
                  activeCategory === cat ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {errorMessage && (
          <div className="admin-error-bar">
            <AlertCircle size={18} /> {errorMessage}
          </div>
        )}

        {/* --- GRID --- */}
        {loading ? (
          <div className="admin-loader-container">
            <div className="admin-loader-pulse"></div>
            <p>Scanning Cloud Database...</p>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="admin-empty-state">
            <HardDrive size={60} strokeWidth={1} />
            <h3>No matches found</h3>
            <p>Try refining your search or category filter.</p>
          </div>
        ) : (
          <div className="admin-asset-grid">
            {filteredVideos.map((vid) => (
              <article key={vid.id} className="admin-video-card">
                <div
                  className="admin-video-preview"
                  onClick={() => setSelectedVideo(vid)}
                >
                  <img src={vid.thumbnail} alt="" loading="lazy" />
                  <div className={`admin-badge-platform plat-${vid.platform}`}>
                    {vid.platform}
                  </div>
                  <div className="admin-hover-actions">
                    <div className="admin-play-trigger">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>

                <div className="admin-video-details">
                  <div className="admin-title-row">
                    <Film size={14} className="admin-type-icon" />
                    <h3 title={vid.title}>{vid.title}</h3>
                  </div>
                  <div className="admin-meta-row">
                    <span className="admin-meta-tag">
                      {vid.category || "General"}
                    </span>
                    <span className="admin-meta-dot">•</span>
                    <span className="admin-meta-size">{vid.size} MB</span>
                  </div>
                  <div className="admin-card-actions">
                    <button
                      className="admin-delete-action"
                      disabled={deleting === vid.id}
                      onClick={() => handleDelete(vid)}
                    >
                      {deleting === vid.id ? (
                        "Wiping..."
                      ) : (
                        <>
                          <Trash2 size={14} /> Delete
                        </>
                      )}
                    </button>
                    <a
                      href={vid.url}
                      target="_blank"
                      rel="noreferrer"
                      className="admin-external-link"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* --- VIDEO PLAYER MODAL --- */}
      {selectedVideo && (
        <div
          className="admin-modal-overlay"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="admin-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="admin-modal-close"
              onClick={() => setSelectedVideo(null)}
            >
              <X size={24} />
            </button>
            <div className="admin-video-container">
              <video controls autoPlay className="admin-main-player">
                <source src={selectedVideo.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="admin-modal-footer">
              <h3>{selectedVideo.title}</h3>
              <p>
                {selectedVideo.category} • {selectedVideo.platform}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}