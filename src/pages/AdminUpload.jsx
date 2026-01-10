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
  FiUploadCloud,
} from "react-icons/fi";
import uploadVideo, { saveMetadataOnly } from "../firebase/uploadVideo.js";
import useStorageUsage from "../firebase/useStorageUsage";
import videoPlaceholder from "../assets/images/video-placeholder.webp";
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
      <div
        className={`preview-card ${vid.selected ? "is-selected" : ""} ${
          vid.status === "success" ? "is-complete" : ""
        }`}
      >
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
          <img
            src={vid.thumbnail || videoPlaceholder}
            alt="Preview"
            loading="lazy"
          />
          <div className="thumb-meta-overlay">
            <span className="duration-tag">{vid.duration}s</span>
            {vid.resolution && (
              <span className="res-tag">{vid.resolution}</span>
            )}
          </div>

          {!uploading && !multiSelectMode && (
            <button
              className="remove-card-btn"
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
              placeholder="video title"
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
              <option value="">category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c.toLowerCase()}
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
                <FiCheckCircle /> processed
              </span>
            ) : vid.status === "uploading" ||
              vid.status === "metadata_saving" ? (
              <div className="upload-progress-wrapper">
                <div className="progress-info">
                  <small>
                    {vid.status === "metadata_saving"
                      ? "finalizing..."
                      : "syncing..."}
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
                <small className="error-text">err: {vid.error}</small>
                <button
                  className="btn-retry"
                  onClick={() => saveMetadataOnly(vid)}
                >
                  retry
                </button>
              </div>
            ) : (
              <span className="status-badge pending">ready</span>
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
  const [dragActive, setDragActive] = useState(false);
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
  
  if (usageError) console.error("Storage Fetch Error:", usageError);

  // --- Derived State ---
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

  // --- Selection Helpers (Fixed ESLint Error) ---
  const clearSelection = useCallback(() => {
    setVideos((prev) => prev.map((v) => ({ ...v, selected: false })));
  }, []);

  const toggleSelectAll = useCallback(() => {
    const targetState = !isAllSelected;
    setVideos((prev) => prev.map((v) => ({ ...v, selected: targetState })));
  }, [isAllSelected]);

  // Clean up object URLs
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
        console.error("Process error:", err);
      }
    }
  };

  const handleUpload = async () => {
    const queue = isAnySelected ? selectedVideos : videos;
    if (!queue.length) return;
    setUploading(true);

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
        if (result.metadataSaved)
          updateItemStatus(vid.preview, { ...result, status: "success" });
      } catch (err) {
        updateItemStatus(vid.preview, {
          status: "file_fail",
          error: err.message,
        });
      }
    }
    setUploading(false);
    if (refetch) refetch();
  };

  const handleCopyPaste = (index, field, action) => {
    const video = videos[index];
    if (action === "copy") {
      setClipboard(video[field]);
      const key = field === "title" ? "copiedTitle" : "copiedCategory";
      updateItemStatus(video.preview, { [key]: true });
      setTimeout(() => updateItemStatus(video.preview, { [key]: false }), 1200);
    } else {
      setVideos((prev) =>
        prev.map((v, i) =>
          v.selected || i === index ? { ...v, [field]: clipboard } : v
        )
      );
    }
  };

  return (
    <section className="admin-upload">
      {/* Zebra Section 1: Dark Glassmorphism Storage */}
      <div className="storage-panel dark-zebra">
        <div className="panel-inner">
          <div className="panel-header">
            <span className="section-label">infrastructure / storage</span>
            <button className="icon-refresh" onClick={() => refetch?.()}>
              <FiRefreshCw className={usageLoading ? "spin" : ""} />
            </button>
          </div>
          <div className="storage-grid">
            <div className="storage-card glass">
              <div className="card-head">
                <h3>Vimeo</h3>
                <span className="badge">PRO</span>
              </div>
              <div className="usage-meter">
                <div className="meter-label">
                  <strong>{vimeo?.usedGB || 0}GB</strong>
                  <span>used</span>
                </div>
                <div className="progress-mini">
                  <div
                    className="fill"
                    style={{ width: `${vimeo?.percent || 0}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="storage-card glass">
              <div className="card-head">
                <h3>Publitio</h3>
                <span className="badge">CDN</span>
              </div>
              <div className="usage-meter">
                <div className="meter-label">
                  <strong>{publitio?.usedMB || 0}MB</strong>
                  <span>used</span>
                </div>
                <div className="progress-mini">
                  <div
                    className="fill"
                    style={{ width: `${publitio?.percent || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zebra Section 2: White Main View */}
      <div className="upload-main-container white-zebra">
        <div className="upload-tabs">
          <button
            className={activeTab === "upload" ? "active" : ""}
            onClick={() => setActiveTab("upload")}
          >
            Queue
          </button>
          <button
            className={activeTab === "uploaded" ? "active" : ""}
            onClick={() => setActiveTab("uploaded")}
          >
            Library
          </button>
        </div>

        {activeTab === "upload" ? (
          <div className="upload-view-content">
            <header className="view-header">
              <h2 className="elegant-title">
                Media Queue <span className="count">[{videos.length}]</span>
              </h2>
              <div className="header-btns">
                {hasSuccessful && (
                  <button
                    className="btn-text-only"
                    onClick={() =>
                      setVideos((v) => v.filter((x) => x.status !== "success"))
                    }
                  >
                    clear completed
                  </button>
                )}
                <button
                  className={`btn-outline ${multiSelectMode ? "active" : ""}`}
                  onClick={() => setMultiSelectMode(!multiSelectMode)}
                >
                  bulk actions
                </button>
                <button
                  className="btn-solid"
                  onClick={() => inputRef.current?.click()}
                >
                  <FiPlus /> add media
                </button>
              </div>
            </header>

            <div
              className={`drop-area ${dragActive ? "drag-active" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                handleFiles(e.dataTransfer.files);
              }}
              onClick={() => inputRef.current?.click()}
            >
              <input
                type="file"
                multiple
                accept="video/*"
                ref={inputRef}
                hidden
                onChange={(e) => handleFiles(e.target.files)}
              />
              <FiUploadCloud className="drop-icon" />
              <p className="drop-text">
                Drop cinematic files or click to browse
              </p>
            </div>

            {/* Bulk Toolbar - Minimalist Glassmorphism */}
            {isAnySelected && (
              <div className="bulk-bar-float">
                <div className="selection-info">
                  <span className="count-badge">{selectedVideos.length}</span>
                  <span className="label">selected</span>
                </div>

                <div className="bar-divider" />

                <div className="bar-actions">
                  <button className="action-link" onClick={toggleSelectAll}>
                    {isAllSelected ? "Deselect All" : "Select All"}
                  </button>

                  <select
                    className="bulk-category-select"
                    value=""
                    onChange={(e) => {
                      if (!e.target.value) return;
                      setVideos((p) =>
                        p.map((v) =>
                          v.selected ? { ...v, category: e.target.value } : v
                        )
                      );
                    }}
                  >
                    <option value="" disabled hidden>
                      category
                    </option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c.toLowerCase()}
                      </option>
                    ))}
                  </select>

                  <button
                    className="action-icon-btn"
                    onClick={() => {
                      const t = prompt("Batch Rename:");
                      if (t)
                        setVideos((p) =>
                          p.map((v) => (v.selected ? { ...v, title: t } : v))
                        );
                    }}
                  >
                    <FiEdit3 />
                  </button>

                  <button
                    className="btn-delete-bulk"
                    onClick={() =>
                      setVideos((v) => v.filter((x) => !x.selected))
                    }
                  >
                    <FiTrash2 />
                  </button>

                  <div className="bar-divider" />

                  <button className="close-bulk-btn" onClick={clearSelection}>
                    <FiX />
                  </button>
                </div>
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
              <div className="sticky-action-bar">
                <button
                  className="btn-main"
                  disabled={uploading}
                  onClick={handleUpload}
                >
                  {uploading
                    ? "Synchronizing with cloud..."
                    : `Begin processing ${
                        isAnySelected ? selectedVideos.length : videos.length
                      } files`}
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