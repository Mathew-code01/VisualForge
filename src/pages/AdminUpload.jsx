// src/pages/AdminUpload.jsx
// src/pages/AdminUpload.jsx
// src/pages/AdminUpload.jsx
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from "react";
import {
  FiCopy,
  FiClipboard,
  FiRefreshCw,
  FiTrash2,
  FiPlus,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
  FiSquare,
  FiCheckSquare,
  FiEdit3,
} from "react-icons/fi";
import uploadVideo, { saveMetadataOnly } from "../firebase/uploadVideo.js";
import useStorageUsage from "../firebase/useStorageUsage";
import videoPlaceholder from "../assets/images/video-placeholder.png";
import AdminVideos from "./AdminVideos";
import { extractMetadata, generateThumbnail } from "../utils/processVideo";
import "../styles/pages/adminupload.css";

const CATEGORIES = [
  "Wedding",
  "Corporate",
  "Commercial",
  "Cinematic",
  "Travel",
  "Event",
  "Music Video",
  "Documentary",
  "Motivational",
  "Sports",
  "Lifestyle",
  "Education",
];

/* =====================================================================
    SUB-COMPONENT: VideoItem
===================================================================== */
const VideoItem = memo(
  ({
    vid,
    index,
    updateItemStatus,
    handleCopyPaste,
    multiSelectMode,
    uploading,
  }) => {
    return (
      <div className={`preview-card ${vid.selected ? "is-selected" : ""}`}>
        {multiSelectMode && (
          <div
            className="selection-overlay"
            onClick={() =>
              updateItemStatus(vid.preview, { selected: !vid.selected })
            }
          >
            <div className="custom-checkbox">
              {vid.selected ? <FiCheckSquare /> : <FiSquare />}
            </div>
          </div>
        )}

        <div className="card-thumb">
          <img src={vid.thumbnail || videoPlaceholder} alt="Preview" />
          <span className="duration-tag">{vid.duration}s</span>
          {vid.resolution && <span className="res-tag">{vid.resolution}</span>}

          {!uploading && !multiSelectMode && (
            <button
              className="remove-card-btn"
              title="Remove from queue"
              onClick={(e) => {
                e.stopPropagation();
                updateItemStatus(vid.preview, { isRemoved: true });
              }}
            >
              <FiX />
            </button>
          )}
        </div>

        <div className="card-body">
          <div className="field-row">
            <input
              type="text"
              value={vid.title}
              placeholder="Video Title"
              onChange={(e) =>
                updateItemStatus(vid.preview, { title: e.target.value })
              }
            />
            <button
              className={`copy-btn ${vid.copiedTitle ? "success-flash" : ""}`}
              onClick={() =>
                handleCopyPaste(index, "title", vid.title ? "copy" : "paste")
              }
            >
              {vid.copiedTitle ? (
                <FiCheckCircle />
              ) : vid.title ? (
                <FiCopy />
              ) : (
                <FiClipboard />
              )}
            </button>
          </div>

          <div className="field-row">
            <select
              value={vid.category}
              onChange={(e) =>
                updateItemStatus(vid.preview, { category: e.target.value })
              }
            >
              <option value="">Category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              className={`copy-btn ${
                vid.copiedCategory ? "success-flash" : ""
              }`}
              onClick={() =>
                handleCopyPaste(
                  index,
                  "category",
                  vid.category ? "copy" : "paste"
                )
              }
            >
              {vid.copiedCategory ? (
                <FiCheckCircle />
              ) : vid.category ? (
                <FiCopy />
              ) : (
                <FiClipboard />
              )}
            </button>
          </div>

          <div className="status-container">
            {vid.status === "success" ? (
              <span className="status-badge success">
                <FiCheckCircle /> Ready
              </span>
            ) : vid.status === "uploading" ||
              vid.status === "metadata_saving" ? (
              <div className="upload-progress-wrapper">
                <div className="progress-info">
                  <small>
                    {vid.status === "metadata_saving"
                      ? "Finalizing..."
                      : "Uploading..."}
                  </small>
                  <small>{vid.progress}%</small>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${vid.progress}%` }}
                  />
                </div>
              </div>
            ) : vid.error ? (
              <div className="error-retry-flex">
                <small className="error-text">{vid.error}</small>
                <button
                  className="btn-retry"
                  onClick={() => saveMetadataOnly(vid)}
                >
                  Retry
                </button>
              </div>
            ) : (
              <span className="status-badge pending">Pending</span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

/* =====================================================================
    MAIN COMPONENT: AdminUpload
===================================================================== */
export default function AdminUpload() {
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [clipboard, setClipboard] = useState("");
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  const inputRef = useRef(null);
  const {
    publitio,
    vimeo,
    loading: usageLoading,
    error: usageError,
    refetch,
  } = useStorageUsage();

  const selectedVideos = useMemo(
    () => videos.filter((v) => v.selected),
    [videos]
  );
  const isAnySelected = selectedVideos.length > 0;
  const isAllSelected =
    videos.length > 0 && selectedVideos.length === videos.length;
  const hasSuccessful = useMemo(
    () => videos.some((v) => v.status === "success"),
    [videos]
  );

  useEffect(() => {
    return () =>
      videos.forEach((v) => v.preview && URL.revokeObjectURL(v.preview));
  }, [videos]);

  const updateItemStatus = useCallback((preview, updates) => {
    setVideos((prev) => {
      if (updates.isRemoved) return prev.filter((v) => v.preview !== preview);
      return prev.map((v) =>
        v.preview === preview ? { ...v, ...updates } : v
      );
    });
  }, []);

  const handleFiles = async (fileList) => {
    const list = Array.from(fileList).filter((f) =>
      ["video/mp4", "video/webm", "video/quicktime"].includes(f.type)
    );
    for (const file of list) {
      const preview = URL.createObjectURL(file);
      try {
        const [thumb, meta] = await Promise.all([
          generateThumbnail(file).catch(() => videoPlaceholder),
          extractMetadata(file).catch(() => ({
            duration: 0,
            resolution: "N/A",
          })),
        ]);
        setVideos((prev) => [
          ...prev,
          {
            file,
            preview,
            title: file.name.replace(/\.[^/.]+$/, ""),
            category: "",
            duration: meta.duration || 0,
            resolution: meta.resolution || "N/A",
            thumbnail: thumb,
            progress: 0,
            selected: false,
            status: "pending",
            error: null,
          },
        ]);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const toggleSelectAll = () => {
    const newState = !isAllSelected;
    setVideos((prev) => prev.map((v) => ({ ...v, selected: newState })));
  };

  const handleUpload = async () => {
    const queue = isAnySelected ? selectedVideos : videos;
    if (!queue.length) return setErrorMessage("No videos to upload.");
    setUploading(true);
    setErrorMessage("");
    let successCount = 0;
    let failCount = 0;

    for (const vid of queue) {
      if (vid.status === "success") continue;
      updateItemStatus(vid.preview, {
        status: "uploading",
        error: null,
        progress: 0,
      });
      try {
        const result = await uploadVideo(
          vid.file,
          vid.title,
          vid.category,
          "ADMIN",
          (p) => {
            const s = p >= 101 ? "metadata_saving" : "uploading";
            updateItemStatus(vid.preview, {
              progress: Math.min(p, 100),
              status: s,
            });
          },
          {
            duration: vid.duration,
            resolution: vid.resolution,
            thumbnail: vid.thumbnail,
          }
        );
        if (result.metadataSaved) {
          successCount++;
          updateItemStatus(vid.preview, { ...result, status: "success" });
        } else {
          failCount++;
          updateItemStatus(vid.preview, {
            status: "metadata_fail",
            error: "DB Save Failed",
          });
        }
      } catch (err) {
        failCount++;
        updateItemStatus(vid.preview, {
          status: "file_fail",
          error: err.message,
        });
      }
    }
    setUploading(false);
    setMessage(`Complete: ${successCount} success, ${failCount} failed.`);
    if (refetch) refetch();
  };

  const handleCopyPaste = (index, field, action) => {
    const video = videos[index];
    if (action === "copy") {
      setClipboard(video[field]);
      const copyKey = field === "title" ? "copiedTitle" : "copiedCategory";
      updateItemStatus(video.preview, { [copyKey]: true });
      setTimeout(
        () => updateItemStatus(video.preview, { [copyKey]: false }),
        1200
      );
    } else {
      setVideos((prev) =>
        prev.map((v, i) =>
          v.selected || i === index ? { ...v, [field]: clipboard } : v
        )
      );
    }
  };

  const clearSuccessful = () => {
    setVideos((prev) => prev.filter((v) => v.status !== "success"));
    setMessage("");
  };

  const bulkRename = () => {
    const newTitle = prompt("Enter new title for all selected videos:");
    if (newTitle !== null) {
      setVideos((prev) =>
        prev.map((v) => (v.selected ? { ...v, title: newTitle } : v))
      );
    }
  };

  const renderStorageBox = (title, data, type, badge) => (
    <div className={`storage-box ${badge.toLowerCase()}`}>
      <div className="storage-box-header">
        <h3>{title}</h3>
        <span className="badge">{badge}</span>
      </div>
      <div className="storage-usage">
        <div className="usage-text">
          <strong>
            {data?.[`used${type}`] || 0} {type}
          </strong>{" "}
          used
        </div>
        <div className="progress-mini">
          <div
            className="progress-mini-fill"
            style={{ width: `${data?.percent || 0}%` }}
          />
        </div>
        <small>{data?.percent || 0}% Capacity</small>
      </div>
    </div>
  );

  // Add this near your other handlers (like handleFiles)
  const handleDragOver = (e) => {
    e.preventDefault(); // Required to allow a drop
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files); // Pass the dropped files to your existing logic
    }
  };

  return (
    <section className="admin-upload">
      <div className="upload-container">
        <div className="storage-panel">
          <div className="panel-header">
            <h4>Cloud Storage</h4>
            <button
              className="icon-btn"
              onClick={() => refetch?.()}
              title="Refresh"
            >
              <FiRefreshCw className={usageLoading ? "spin" : ""} />
            </button>
          </div>
          {usageError ? (
            <p className="error-text">Storage Error: {usageError.message}</p>
          ) : (
            <div className="storage-grid">
              {renderStorageBox("Vimeo", vimeo, "GB", "VIMEO")}
              {renderStorageBox("Publitio", publitio, "MB", "PUBLITIO")}
            </div>
          )}
        </div>

        <div className="upload-tabs">
          <button
            className={`tab ${activeTab === "upload" ? "active" : ""}`}
            onClick={() => setActiveTab("upload")}
          >
            Upload Queue
          </button>
          <button
            className={`tab ${activeTab === "uploaded" ? "active" : ""}`}
            onClick={() => setActiveTab("uploaded")}
          >
            Manage Library
          </button>
        </div>

        {activeTab === "upload" ? (
          <div className="upload-main-view">
            <div className="upload-header">
              <h2>New Uploads ({videos.length})</h2>
              <div className="upload-controls">
                {hasSuccessful && (
                  <button
                    className="btn btn-ghost text-success"
                    onClick={clearSuccessful}
                  >
                    <FiCheckCircle /> Clear Done
                  </button>
                )}
                {videos.length > 0 && (
                  <button
                    className="btn btn-ghost text-danger"
                    onClick={() => setVideos([])}
                    disabled={uploading}
                  >
                    <FiTrash2 /> Clear All
                  </button>
                )}
                <button
                  className={`btn ${
                    multiSelectMode ? "btn-primary" : "btn-ghost"
                  }`}
                  onClick={() => setMultiSelectMode(!multiSelectMode)}
                >
                  {multiSelectMode ? "Exit Select" : "Bulk Select"}
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => inputRef.current?.click()}
                >
                  <FiPlus /> Add Files
                </button>
              </div>
            </div>

            <div className="drag-drop-area-wrapper">
              <div
                className="drag-drop-area"
                onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver} // Added
                onDrop={handleDrop} // Added
              >
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  ref={inputRef}
                  hidden
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <p>
                  Drag videos here or <span>browse files</span>
                </p>
              </div>
              {videos.length > 0 && (
                <div className="select-all-bar" onClick={toggleSelectAll}>
                  {isAllSelected ? <FiCheckSquare /> : <FiSquare />}
                  <span>Select All Videos</span>
                </div>
              )}
            </div>

            {(errorMessage || message) && (
              <div
                className={`alert ${
                  errorMessage ? "alert-error" : "alert-success"
                }`}
              >
                {errorMessage ? <FiAlertCircle /> : <FiCheckCircle />}{" "}
                {errorMessage || message}
              </div>
            )}

            {(multiSelectMode || isAnySelected) && (
              <div className="bulk-actions-bar">
                <div className="action-buttons">
                  <button
                    className="text-danger"
                    onClick={() =>
                      setVideos((v) => v.filter((x) => !x.selected))
                    }
                  >
                    <FiTrash2 /> Remove Selected
                  </button>
                  <button className="text-primary" onClick={bulkRename}>
                    <FiEdit3 /> Rename Selected
                  </button>
                </div>
                <select
                  onChange={(e) =>
                    setVideos((p) =>
                      p.map((v) =>
                        v.selected ? { ...v, category: e.target.value } : v
                      )
                    )
                  }
                >
                  <option value="">Apply Category to Selected</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="preview-grid">
              {videos.map((vid, i) => (
                <VideoItem
                  key={vid.preview}
                  vid={vid}
                  index={i}
                  updateItemStatus={updateItemStatus}
                  handleCopyPaste={handleCopyPaste}
                  multiSelectMode={multiSelectMode}
                  uploading={uploading}
                />
              ))}
            </div>

            {videos.length > 0 && (
              <div className="upload-footer">
                <button
                  className="upload-btn-main"
                  disabled={uploading}
                  onClick={handleUpload}
                >
                  {uploading
                    ? "Processing Queue..."
                    : `Begin Upload (${
                        isAnySelected ? selectedVideos.length : videos.length
                      })`}
                </button>
              </div>
            )}
          </div>
        ) : (
          <AdminVideos />
        )}
      </div>
    </section>
  );
}