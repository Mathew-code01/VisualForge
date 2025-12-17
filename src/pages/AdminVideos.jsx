// src/pages/AdminVideos.jsx
import React, { useEffect, useState } from "react";
import { getVideos, deleteVideo } from "../firebase/uploadVideo.js";
import "../styles/pages/adminvideos.css";

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await getVideos();
      setVideos(result);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
      setErrorMessage(
        err.message.includes("Firestore")
          ? "Firestore issue: Check database connection and permissions."
          : "Network/CORS issue: Unable to reach video database."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (vid) => {
    const confirmDelete = window.confirm(
      `Delete video "${vid.title}" from ${vid.platform.toUpperCase()}?`
    );
    if (!confirmDelete) return;

    setDeleting(vid.id);

    try {
      await deleteVideo(vid.id, vid.platform, vid.resourceId);
      setVideos((prev) => prev.filter((v) => v.id !== vid.id));
      alert("Video deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert(
        `Failed to delete video "${vid.title}". ${
          err.message ? "Error: " + err.message : ""
        }`
      );
    } finally {
      setDeleting(null);
    }
  };

  if (loading)
    return <div className="adminvideos-loading">Loading videos...</div>;

  return (
    <div className="adminvideos-container">
      <h1 className="adminvideos-title">Uploaded Videos</h1>

      {/* NEW MANUAL RELOAD BUTTON */}
      <button onClick={loadVideos} disabled={loading} className="btn-refresh">
        {loading ? "Refreshing..." : "Refresh Video List"}
      </button>

      {errorMessage && (
        <div className="adminvideos-error">⚠ {errorMessage}</div>
      )}

      {videos.length === 0 ? (
        <p className="adminvideos-empty">No videos found.</p>
      ) : (
        <div className="adminvideos-grid">
          {videos.map((vid) => (
            <div key={vid.id} className="adminvideos-card">
              <img
                src={vid.thumbnail}
                alt={vid.title}
                className="adminvideos-thumb"
              />
              <div className="adminvideos-info">
                <h3>{vid.title}</h3>
                <p className="adminvideos-platform">
                  Platform: <b>{vid.platform}</b>
                </p>
                <p className="adminvideos-size">
                  Size: <b>{vid.size} MB</b>
                </p>
                <a
                  href={vid.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="adminvideos-link"
                >
                  View Video
                </a>
              </div>

              <button
                className="adminvideos-delete"
                disabled={deleting === vid.id}
                onClick={() => handleDelete(vid)}
              >
                {deleting === vid.id ? "Deleting..." : "Delete"}
              </button>

              {vid.error && (
                <div className="adminvideos-error">
                  ⚠ Upload Error: {vid.error}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
