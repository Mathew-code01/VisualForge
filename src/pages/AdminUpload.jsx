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
  FiLogOut,
} from "react-icons/fi";
// Add 'linkExistingPublitioVideo' to your existing imports from uploadVideo.js
import uploadVideo, {
  getVideos ,saveMetadataOnly,
  linkExistingPublitioVideo,
} from "../firebase/uploadVideo.js";
import useStorageUsage from "../firebase/useStorageUsage";
import videoPlaceholder from "../assets/images/video-placeholder.webp";
import AdminVideos from "./AdminVideos";
import { extractMetadata, generateThumbnail } from "../utils/processVideo";
import "../styles/pages/adminupload.css";
import { auth } from "../firebase/config"; // Ensure your auth is imported
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // To redirect after logout

const CATEGORIES = [
  "Video Editing",
  "Corporate",
  "Commercial",
  // "Cinematic",
  // "Travel",
  // "Event",
  // "Music Video",
  // "Documentary",
  "Motivational",
  "Sports",
  // "Lifestyle",
  // "Education",
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
              className={!vid.category && uploading ? "error-border" : ""} // Highlight if empty during upload attempt
              value={vid.category}
              onChange={(e) =>
                updateItemStatus(vid.preview, { category: e.target.value })
              }
            >
              <option value="">category required</option>
              {/* changed text to 'required' for professional clarity */}
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

          {/* NEW: Description / About Field */}
          <div className="field-row">
            <textarea
              className={`description-input-minimal ${
                !vid.description && uploading ? "error-border" : ""
              }`} // Added dynamic error border
              value={vid.description || ""}
              placeholder="about this project (required)"
              onChange={(e) =>
                updateItemStatus(vid.preview, { description: e.target.value })
              }
            />
            <button
              className={`copy-btn ${vid.copiedDesc ? "success-flash" : ""}`}
              onClick={() =>
                handleCopyPaste(
                  index,
                  "description",
                  vid.description ? "copy" : "paste"
                )
              }
            >
              {vid.copiedDesc ? (
                <FiCheckCircle />
              ) : vid.description ? (
                <FiCopy />
              ) : (
                <FiClipboard />
              )}
            </button>
          </div>

          {vid.warning && (
            <div className="duplicate-warning-box">
              <FiAlertCircle size={12} />
              <span>{vid.warning}. Upload anyway?</span>
            </div>
          )}

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
  const [existingLibrary, setExistingLibrary] = useState([]); // <--- Add this
  const [duplicateWarning, setDuplicateWarning] = useState(null); // <--- Add this for the UI message
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [clipboard, setClipboard] = useState("");
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [recoveryId, setRecoveryId] = useState("");

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

  // Fetch the library on mount so we have data to compare against
  useEffect(() => {
    const fetchLibrary = async () => {
      const data = await getVideos();
      setExistingLibrary(data);
    };
    fetchLibrary();
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    if (uploading) {
      const confirmLogout = window.confirm(
        "A synchronization is currently active. Logging out now will interrupt the process. Continue?"
      );
      if (!confirmLogout) return;
    }

    try {
      await signOut(auth);
      navigate("/admin-login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Inside AdminUpload component, near other useEffects
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (uploading) {
        e.preventDefault();
        e.returnValue = "Upload in progress. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [uploading]);

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

    let duplicatesFound = 0;
    let alreadyInQueue = 0;

    for (const file of list) {
      const fileName = file.name.replace(/\.[^/.]+$/, "");

      // 1. Check if already in the current UI Queue (prevent adding twice)
      const inQueue = videos.some(
        (v) => v.title.toLowerCase() === fileName.toLowerCase()
      );
      if (inQueue) {
        alreadyInQueue++;
        continue; // Skip this file
      }

      // 2. Check if already exists in Database Library
      const inLibrary = existingLibrary.find(
        (vid) => vid.title.toLowerCase() === fileName.toLowerCase()
      );

      if (inLibrary) {
        duplicatesFound++;
        // We don't 'continue' here so the admin can still see it
        // with a warning, OR you can 'continue' to block it entirely.
      }

      const preview = URL.createObjectURL(file);

      try {
        const [thumb, meta] = await Promise.all([
          generateThumbnail(file).catch(() => videoPlaceholder),
          extractMetadata(file).catch(() => ({
            duration: 0,
            resolution: "N/A",
          })),
        ]);

        // If duration is exactly the same, it's a hard duplicate
        const durationMatch = existingLibrary.some(
          (v) => v.duration === meta.duration && v.duration !== 0
        );
        if (durationMatch) {
          duplicatesFound++;
        }

        setVideos((prev) => [
          ...prev,
          {
            file,
            preview,
            title: fileName,
            category: "",
            duration: meta.duration || 0,
            resolution: meta.resolution || "N/A",
            thumbnail: thumb,
            progress: 0,
            selected: false,
            status: "pending",
            error: null,
            warning:
              inLibrary || durationMatch ? "Already exists in library" : null,
          },
        ]);
      } catch (err) {
        console.error("Process error:", err);
      }
    }

    // Professional Feedback
    if (alreadyInQueue > 0) {
      setDuplicateWarning(
        `${alreadyInQueue} file(s) are already in your upload queue.`
      );
    } else if (duplicatesFound > 0) {
      setDuplicateWarning(
        `${duplicatesFound} file(s) detected in library. Review warnings before sync.`
      );
    }
  };

  const handleUpload = async () => {
    const queue = isAnySelected ? selectedVideos : videos;

    // 1. PROFESSIONAL VALIDATION GUARD
    const incompleteItems = queue.filter(
      (v) => !v.category || !v.description || v.description.trim().length < 5
    );

    if (incompleteItems.length > 0) {
      setDuplicateWarning(
        `Action Required: ${incompleteItems.length} video(s) are missing categories or project descriptions.`
      );
      // PROFESSIONAL SCROLL: Smoothly scroll to top so they see the banner
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // 2. ADVANCED DUPLICATE GUARD (Keep your existing logic here...)
    const duplicateInLibrary = queue.find((v) =>
      existingLibrary.some(
        (lib) =>
          lib.category.toLowerCase() === v.category.toLowerCase() &&
          (lib.title.toLowerCase() === v.title.toLowerCase() ||
            (lib.duration === v.duration &&
              lib.resolution === v.resolution &&
              v.duration > 0))
      )
    );

    if (duplicateInLibrary) {
      setDuplicateWarning(
        `Duplicate Detected: An identical asset already exists in the ${duplicateInLibrary.category} category.`
      );
      updateItemStatus(duplicateInLibrary.preview, {
        error: "Duplicate Asset",
      });
      return;
    }

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
            description: vid.description,
          }
        );

        if (result.metadataSaved) {
          updateItemStatus(vid.preview, { ...result, status: "success" });

          // Update local library so the guard catches immediate re-uploads
          const updatedData = await getVideos();
          setExistingLibrary(updatedData);
        }
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
      // Determine which flash key to use
      const flashKey =
        field === "title"
          ? "copiedTitle"
          : field === "category"
          ? "copiedCategory"
          : "copiedDesc";

      updateItemStatus(video.preview, { [flashKey]: true });
      setTimeout(
        () => updateItemStatus(video.preview, { [flashKey]: false }),
        1200
      );
    } else {
      // PASTE: Apply to either the single item or all selected items
      setVideos((prev) =>
        prev.map((v, i) =>
          v.selected || i === index ? { ...v, [field]: clipboard } : v
        )
      );
    }
  };

  const hasValidationErrors = useMemo(() => {
    return videos.some(
      (v) => !v.category || !v.description || v.description.trim().length < 5
    );
  }, [videos]);

  return (
    <section className="admin-upload">
      {/* Zebra Section 1: Dark Glassmorphism Storage */}
      <div className="storage-panel dark-zebra">
        <div className="panel-inner">
          <div className="panel-header">
            <span className="section-label">infrastructure / storage</span>

            {/* NEW: Action Group to keep buttons together */}
            <div className="header-action-group">
              <button
                className="icon-refresh"
                onClick={() => refetch?.()}
                title="Refresh Storage"
              >
                <FiRefreshCw className={usageLoading ? "spin" : ""} />
              </button>

              <div className="action-divider"></div>

              <button
                className={`logout-link-minimal ${
                  uploading ? "is-disabled" : ""
                }`}
                onClick={handleLogout}
                disabled={uploading} // Optional: strictly prevents click
                style={{
                  opacity: uploading ? 0.4 : 1,
                  cursor: uploading ? "not-allowed" : "pointer",
                }}
              >
                <FiLogOut size={12} />
                <span>{uploading ? "Syncing..." : "Exit Session"}</span>
              </button>
            </div>
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
          {/* NEW TAB */}
          <button
            className={activeTab === "recovery" ? "active" : ""}
            onClick={() => setActiveTab("recovery")}
          >
            Recovery
          </button>
        </div>
        {/* TAB 1: QUEUE (UPLOAD) */}
        {activeTab === "upload" && (
          <div className="upload-view-content animate-fade-in">
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

            {/* PROFESSIONAL DUPLICATE ALERT BANNER */}
            {duplicateWarning && (
              <div className="duplicate-alert-banner">
                <div className="alert-content">
                  <FiAlertCircle className="alert-icon" />
                  <span className="alert-text">{duplicateWarning}</span>
                </div>
                <button
                  className="alert-close"
                  onClick={() => setDuplicateWarning(null)}
                >
                  <FiX />
                </button>
              </div>
            )}

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

            {/* Bulk Toolbar */}
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
                  className={`btn-main ${
                    hasValidationErrors ? "btn-disabled-style" : ""
                  }`}
                  disabled={uploading || hasValidationErrors} // Physically disable if uploading OR errors exist
                  onClick={handleUpload}
                  style={{
                    opacity: uploading || hasValidationErrors ? 0.5 : 1,
                    cursor:
                      uploading || hasValidationErrors
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {uploading
                    ? "Synchronizing with cloud..."
                    : hasValidationErrors
                    ? "Complete all fields to proceed" // Helpful text change
                    : `Begin processing ${
                        isAnySelected ? selectedVideos.length : videos.length
                      } files`}
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LIBRARY (ADMIN VIDEOS) */}
        {activeTab === "uploaded" && <AdminVideos />}

        {/* TAB 3: RECOVERY (MANUAL LINKING) */}
        {activeTab === "recovery" && (
          <div className="recovery-view-content animate-fade-in">
            <header className="view-header">
              <h2 className="elegant-title">Manual Synchronization</h2>
              <p className="section-subtitle">
                Enter the Publitio ID to automatically pull metadata and link to
                your library.
              </p>
            </header>

            <div className="recovery-card glass dark-zebra p-8 border border-white/10 rounded-lg">
              <div className="input-group mb-6">
                <label className="text-xs uppercase tracking-widest opacity-50 mb-2 block">
                  Publitio Short ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. W4G3p24y"
                  value={recoveryId}
                  onChange={(e) => setRecoveryId(e.target.value)}
                  className="admin-input-minimal w-full bg-transparent border-b border-white/20 py-3 text-xl outline-none focus:border-white transition-all"
                />
              </div>

              <button
                className="btn-solid-large w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all"
                onClick={async () => {
                  if (!recoveryId) return alert("Please enter a Publitio ID");
                  try {
                    await linkExistingPublitioVideo(recoveryId);
                    alert("Asset Linked Successfully");
                    setRecoveryId("");
                    // Optional: Trigger a refresh of your video list here
                  } catch (err) {
                    alert("Sync Error: " + err.message);
                  }
                }}
              >
                Establish Connection
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}