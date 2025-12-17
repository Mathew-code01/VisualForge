// src/pages/AdminUpload.jsx
// src/pages/AdminUpload.jsx
// src/pages/AdminUpload.jsx
// src/pages/AdminUpload.jsx
// Clean rewrite — Final Completed Version (Option A)

import React, { useState, useRef, useEffect } from "react";
import { FiCopy, FiClipboard } from "react-icons/fi";
import uploadVideo, { saveMetadataOnly } from "../firebase/uploadVideo.js";
import useStorageUsage from "../firebase/useStorageUsage";
import videoPlaceholder from "../assets/images/video-placeholder.png";
import AdminVideos from "./AdminVideos";
import { extractMetadata, generateThumbnail } from "../utils/processVideo";

import "../styles/pages/adminupload.css";

export default function AdminUpload() {
  /* =====================================================================
      STATE
  ===================================================================== */
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [clipboard, setClipboard] = useState("");
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [activeTab, setActiveTab] = useState("upload"); // "upload" or "uploaded"

  const inputRef = useRef(null);

  // Fetch Vimeo + Publitio usage
  const {
    publitio,
    vimeo,
    loading: usageLoading,
    error: usageError,
  } = useStorageUsage();

  /* =====================================================================
      FILE HANDLING
  ===================================================================== */
  const handleFiles = async (fileList) => {
    const list = Array.from(fileList).filter((f) =>
      ["video/mp4", "video/webm"].includes(f.type)
    );

    for (const file of list) {
      const preview = URL.createObjectURL(file);

      const [thumb, meta] = await Promise.all([
        generateThumbnail(file),
        extractMetadata(file),
      ]);

      setVideos((prev) => [
        ...prev,
        {
          file,
          preview,
          title: file.name.replace(/\.[^/.]+$/, ""),
          category: "",
          duration: meta.duration,
          resolution: meta.resolution,
          thumbnail: thumb,
          progress: 0,
          selected: false,
          copiedTitle: false,
          copiedCategory: false,
          error: null,
          // 💡 NEW STATUS FIELD
          status: "pending", // 'pending', 'uploading', 'metadata_saving', 'metadata_fail', 'success'
          // 💡 NEW FIELDS FOR RETRY
          uploadedUrl: null, // Will hold the external URL for retry
          resourceId: null,
          platform: null,
        },
      ]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  /* =====================================================================
      SELECTION ACTIONS
  ===================================================================== */
  const anySelected = () => videos.some((v) => v.selected);

  const toggleSelect = (i) =>
    setVideos((prev) =>
      prev.map((v, idx) => (idx === i ? { ...v, selected: !v.selected } : v))
    );

  const toggleMultiSelectMode = () => {
    setMultiSelectMode((prev) => {
      const next = !prev;
      if (!next) {
        setVideos((v) => v.map((x) => ({ ...x, selected: false })));
      }
      return next;
    });
  };

  const selectAll = () =>
    setVideos((prev) => prev.map((v) => ({ ...v, selected: true })));

  const deselectAll = () =>
    setVideos((prev) => prev.map((v) => ({ ...v, selected: false })));

  const removeSelected = () =>
    setVideos((prev) => prev.filter((v) => !v.selected));

  const removeVideo = (i) =>
    setVideos((prev) => prev.filter((_, idx) => idx !== i));

  const setCategoryForSelected = (value) =>
    setVideos((prev) =>
      prev.map((v) => (v.selected ? { ...v, category: value } : v))
    );

  /* =====================================================================
      COPY / PASTE
  ===================================================================== */
  const handleCopy = (index, field) => {
    const text = videos[index][field];
    if (!text) return;

    setClipboard(text);

    setVideos((prev) =>
      prev.map((v, i) =>
        i === index
          ? {
              ...v,
              [field === "title" ? "copiedTitle" : "copiedCategory"]: true,
            }
          : v
      )
    );

    setTimeout(() => {
      setVideos((prev) =>
        prev.map((v, i) =>
          i === index
            ? {
                ...v,
                [field === "title" ? "copiedTitle" : "copiedCategory"]: false,
              }
            : v
        )
      );
    }, 800);
  };

  const handlePaste = (index, field) => {
    if (!clipboard) return;

    setVideos((prev) =>
      prev.map((v, i) =>
        v.selected || i === index ? { ...v, [field]: clipboard } : v
      )
    );
  };

  /* =====================================================================
      UPLOAD PROCESS
  ===================================================================== */
  const getVideoMetadata = (file) => {
    return new Promise((resolve) => {
      const videoEl = document.createElement("video");
      videoEl.src = URL.createObjectURL(file);
      videoEl.muted = true;
      videoEl.playsInline = true;

      const cleanup = () => {
        videoEl.pause();
        videoEl.removeAttribute("src");
        videoEl.load();
        videoEl.remove();
      };

      videoEl.onloadedmetadata = () => {
        const duration = +videoEl.duration.toFixed(2);
        const resolution = `${videoEl.videoWidth}x${videoEl.videoHeight}`;
        cleanup();
        resolve({ duration, resolution });
      };

      videoEl.onerror = () => {
        cleanup();
        resolve({ duration: 0, resolution: "" });
      };

      videoEl.load();
    });
  };

  // 💡 NEW: Prevent closing/navigation during upload
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (uploading) {
        event.preventDefault();
        // Most browsers require the return value for a custom message
        event.returnValue =
          "Upload is in progress. Are you sure you want to leave?";
        return "Upload is in progress. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [uploading]); // Dependency on the 'uploading' state

  const handleUpload = async () => {
    // ❌ Block upload if any video is missing category
    const missingCat = videos.some(
      (v) => (v.selected || !anySelected()) && !v.category
    );

    if (missingCat) {
      setErrorMessage(
        "Some files have no category. Please assign categories before uploading."
      );
      setUploading(false);
      return;
    }

    if (!videos.length) return alert("Select videos first!");

    if (publitio?.percent >= 95 || vimeo?.percent >= 95) {
      alert("Storage almost full — upload blocked.");
      return;
    }

    setUploading(true);
    setMessage("");
    setErrorMessage("");

    let successCount = 0;
    let fileFailCount = 0;
    // 💡 NEW: Separate metadata failure count
    let metadataFailCount = 0;

    const queue = anySelected() ? videos.filter((v) => v.selected) : videos;

    for (const vid of queue) {
      // 💡 NEW: Set status to uploading
      setVideos((prev) =>
        prev.map((v) =>
          v.preview === vid.preview
            ? { ...v, status: "uploading", error: null }
            : v
        )
      );

      try {
        // If metadata missing
        if (!vid.duration || !vid.resolution) {
          const meta = await getVideoMetadata(vid.file);
          vid.duration = meta.duration;
          vid.resolution = meta.resolution;
        }

        // 🔥 UPLOAD CALL
        const result = await uploadVideo(
          vid.file,
          vid.title,
          vid.category,
          "ADMIN",
          (progress) => {
            
            // Update progress and status based on the progress value
            setVideos((prev) =>
              prev.map((v) => {
                if (v.preview === vid.preview) {
                  let newStatus = "uploading";
                  // 💡 NEW: Special value 101 means file uploaded, now saving metadata
                  if (progress === 101) {
                    newStatus = "metadata_saving";
                    progress = 100; // Keep progress bar full visually
                  } else if (progress === 100) {
                    // File upload 100% complete, but metadata save hasn't started yet
                    newStatus = "uploading"; // Keep it on uploading until 101 is hit
                  }
                  

                  return {
                    
                    ...v,
                    progress: progress > 100 ? 100 : progress,
                    status: newStatus,
                  };
                }
                return v;
              })
            );
            
          },
          { duration: vid.duration, resolution: vid.resolution } 
        );
        

        // SUCCESS or METADATA FAIL:
        if (result.metadataSaved) {
          successCount++;
          setVideos((prev) =>
            prev.map((v) =>
              v.preview === vid.preview
                ? {
                    ...v,
                    uploadedUrl: result.url,
                    resourceId: result.resourceId,
                    platform: result.platform,
                    status: "success",
                    error: null,
                  }
                : v
            )
          );
        } else if (result.fileUploaded && !result.metadataSaved) {
          // Video uploaded to Publitio/Vimeo but Firestore failed.
          metadataFailCount++;
          setVideos((prev) =>
            prev.map((v) =>
              v.preview === vid.preview
                ? {
                    ...v,
                    uploadedUrl: result.url,
                    resourceId: result.resourceId,
                    platform: result.platform,
                    status: "metadata_fail",
                    progress: 100, // Show full bar
                    error: result.error, // Store the specific error message
                  }
                : v
            )
          );
        }
      } catch (err) {
        // FILE UPLOAD FAIL:
        fileFailCount++;
        let readableError = "Unknown error";

        // Detect error types
        if (!navigator.onLine) {
          readableError = "No internet connection";
        } else if (err?.message?.includes("CORS")) {
          readableError = "CORS blocked — backend is not reachable";
        } else if (err?.message?.includes("Failed to fetch")) {
          readableError = "Network timeout / backend offline";
        } else if (err?.message?.includes("storage")) {
          readableError = "Storage full — delete old files";
        } else if (err?.message) {
          readableError = err.message;
        }

        const msg = `UPLOAD FAILED: "${vid.title}" → ${readableError}`;
        console.error(msg);

        setVideos((prev) =>
          prev.map((v) =>
            v.preview === vid.preview
              ? { ...v, error: readableError, status: "file_fail" }
              : v
          )
        );
      }
    }

    setUploading(false);

    // FINAL MESSAGE (Updated)
    setMessage(
      `Upload Complete! Successful: ${successCount} | Metadata Failed: ${metadataFailCount} | File Failed: ${fileFailCount}`
    );

    if (fileFailCount > 0 || metadataFailCount > 0) {
      setErrorMessage(
        `${
          fileFailCount + metadataFailCount
        } total failures. Check file list for errors.`
      );
    }

    // 💡 NEW: Check for unfinished metadata saves to notify admin
    if (metadataFailCount > 0) {
      alert(
        "Warning: There are incomplete uploads (metadata save failed). Please check the list and retry."
      );
    }
  };

  // 💡 NEW: Metadata Retry function (only runs the second half of the upload)
  const retryMetadataSave = async (vid) => {
    // Set status back to saving metadata and clear error
    // Set status back to saving metadata and clear error
    setVideos((prev) =>
      prev.map((v) =>
        v.preview === vid.preview
          ? { ...v, error: null, status: "metadata_saving", progress: 100 }
          : v
      )
    );

    try {
      // 🔥 ACTUAL CALL: Pass the necessary data for the Firestore save
      await saveMetadataOnly({
        title: vid.title,
        category: vid.category,
        uploaderId: "ADMIN", // Or actual admin ID
        size: vid.file.size,
        duration: vid.duration,
        resolution: vid.resolution,
        thumbnail: vid.thumbnail,
        platform: vid.platform, // Crucial for identifying the storage (e.g., 'vimeo', 'publitio')
        uploadedUrl: vid.uploadedUrl, // Crucial for the link to the file
        resourceId: vid.resourceId, // Crucial for identifying the file on the platform
      });

      // Success:
      setVideos((prev) =>
        prev.map((v) =>
          v.preview === vid.preview
            ? { ...v, status: "success", error: null }
            : v
        )
      );
    } catch (err) {
      // Fail:
      const msg = `[METADATA RETRY ERROR] "${vid.title}" | ${err?.message}`;
      console.error(msg);
      setVideos((prev) =>
        prev.map((v) =>
          v.preview === vid.preview
            ? { ...v, error: msg, status: "metadata_fail" }
            : v
        )
      );
    }
  };

  const handleTitleChange = (i, value) =>
    setVideos((prev) =>
      prev.map((v, idx) => (idx === i ? { ...v, title: value } : v))
    );

  const handleCategoryChange = (i, value) =>
    setVideos((prev) =>
      prev.map((v, idx) => (idx === i ? { ...v, category: value } : v))
    );

  /* =====================================================================
      RETRY
  ===================================================================== */
  const retryUpload = async (vid) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.preview === vid.preview ? { ...v, error: null, progress: 0 } : v
      )
    );

    try {
      if (!vid.duration || !vid.resolution) {
        const meta = await getVideoMetadata(vid.file);
        vid.duration = meta.duration;
        vid.resolution = meta.resolution;
      }

      await uploadVideo(
        vid.file,
        vid.title,
        vid.category,
        "ADMIN",
        (progress) => {
          setVideos((prev) =>
            prev.map((v) =>
              v.preview === vid.preview ? { ...v, progress } : v
            )
          );
        },
        { duration: vid.duration, resolution: vid.resolution } 
        );

      setVideos((prev) =>
        prev.map((v) =>
          v.preview === vid.preview
            ? { ...v, uploadedUrl: "done", error: null }
            : v
        )
      );
    } catch (err) {
      const msg = `[UPLOAD ERROR] "${vid.title}" | ${err?.message}`;
      console.error(msg);

      setVideos((prev) =>
        prev.map((v) => (v.preview === vid.preview ? { ...v, error: msg } : v))
      );
    }
  };

  /* =====================================================================
      CLEANUP
  ===================================================================== */
  useEffect(() => {
    return () => videos.forEach((v) => URL.revokeObjectURL(v.preview));
  }, [videos]);

  /* =====================================================================
      UI
  ===================================================================== */
  return (
    <section
      className="admin-upload"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="upload-container">
        {/* ================= STORAGE SUMMARY ================= */}
        <div className="storage-panel">
          {usageLoading ? (
            <p>Loading storage usage...</p>
          ) : usageError ? (
            <p>Error fetching storage</p>
          ) : (
            <>
              <div className="storage-box vimeo">
                <h3>Vimeo Storage</h3>
                <p>Used: {vimeo.usedGB ?? 0} GB</p>
                <p>
                  Remaining: {(vimeo.totalGB ?? 0) - (vimeo.usedGB ?? 0)} GB
                </p>
                <p>{vimeo.percent ?? 0}% used</p>
                <span className="badge vimeo-badge">VIMEO</span>
              </div>

              <div className="storage-box publitio">
                <h3>Publitio Storage</h3>
                <p>Used: {publitio.usedMB ?? 0} MB</p>
                <p>
                  Remaining:
                  {(publitio.limitMB ?? 0) - (publitio.usedMB ?? 0)} MB
                </p>
                <p>{publitio.percent ?? 0}% used</p>
                <span className="badge publitio-badge">PUBLITIO</span>
              </div>
            </>
          )}
        </div>

        {/* ================= TABS ================= */}
        <div className="upload-tabs">
          <button
            className={activeTab === "upload" ? "tab active" : "tab"}
            onClick={() => setActiveTab("upload")}
          >
            Upload
          </button>

          <button
            className={activeTab === "uploaded" ? "tab active" : "tab"}
            onClick={() => setActiveTab("uploaded")}
          >
            Uploaded
          </button>
        </div>

        {/* ================= TAB CONTENT ================= */}
        {activeTab === "upload" ? (
          <>
            {/* HEADER */}
            <div className="upload-header">
              <h2>Upload Videos</h2>

              {videos.length > 0 && (
                <div className="upload-controls">
                  <button
                    className={`btn ${
                      multiSelectMode ? "btn-primary" : "btn-ghost"
                    }`}
                    onClick={toggleMultiSelectMode}
                  >
                    {multiSelectMode ? "Exit Select" : "Select"}
                  </button>

                  <button
                    className="btn btn-outline"
                    onClick={() => inputRef.current?.click()}
                  >
                    Add Files
                  </button>
                </div>
              )}
            </div>

            {/* DRAG & DROP */}
            <div
              className="drag-drop-area"
              onClick={() => inputRef.current?.click()}
            >
              Drag & Drop videos here or click to select
              <input
                type="file"
                multiple
                accept="video/mp4,video/webm"
                ref={inputRef}
                onChange={(e) => handleFiles(e.target.files)}
                style={{ display: "none" }}
              />
            </div>

            {errorMessage && <p className="upload-error">{errorMessage}</p>}
            {message && <p className="upload-message">{message}</p>}

            {/* BULK ACTIONS */}
            {(multiSelectMode || anySelected()) && (
              <div className="bulk-actions">
                <button onClick={selectAll}>Select All</button>
                <button onClick={deselectAll}>Deselect</button>
                <button onClick={removeSelected}>Remove Selected</button>

                <select
                  onChange={(e) => {
                    setCategoryForSelected(e.target.value);
                  }}
                >
                  <option value="">Set Category for Selected</option>
                  <option value="cinematic">Cinematic</option>
                  <option value="motivational">Motivational</option>
                  <option value="travel">Travel</option>
                  <option value="commercial">Commercial</option>
                  <option value="music">Music</option>
                  <option value="documentary">Documentary</option>
                  <option value="sports">Sports</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="education">Education</option>
                </select>
              </div>
            )}

            {/* PREVIEW GRID */}
            <div className="preview-section">
              {videos.map((vid, i) => (
                <div
                  key={i}
                  className={`preview-card ${vid.selected ? "selected" : ""}`}
                >
                  {/* SELECT CHECKBOX */}
                  {(multiSelectMode || anySelected()) && (
                    <input
                      type="checkbox"
                      className="select-checkbox"
                      checked={!!vid.selected}
                      onChange={() => toggleSelect(i)}
                    />
                  )}

                  {/* THUMBNAIL */}
                  {vid.thumbnail ? (
                    <img src={vid.thumbnail} alt="thumbnail" />
                  ) : (
                    <img src={videoPlaceholder} alt="placeholder" />
                  )}

                  {/* DETAILS */}
                  <div className="preview-details">
                    {/* TITLE */}
                    <div className="input-copy-group">
                      <input
                        type="text"
                        value={vid.title}
                        placeholder="Title"
                        onChange={(e) => handleTitleChange(i, e.target.value)}
                      />
                      {vid.title ? (
                        <FiCopy onClick={() => handleCopy(i, "title")} />
                      ) : (
                        <FiClipboard onClick={() => handlePaste(i, "title")} />
                      )}
                      {vid.copiedTitle && (
                        <span className="copied-indicator">Copied!</span>
                      )}
                    </div>

                    {/* CATEGORY */}
                    <div className="input-copy-group">
                      <select
                        value={vid.category}
                        onChange={(e) =>
                          handleCategoryChange(i, e.target.value)
                        }
                      >
                        <option value="">Select Category</option>
                        <option value="cinematic">Cinematic</option>
                        <option value="motivational">Motivational</option>
                        <option value="travel">Travel</option>
                        <option value="commercial">Commercial</option>
                        <option value="music">Music</option>
                        <option value="documentary">Documentary</option>
                        <option value="sports">Sports</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="education">Education</option>
                      </select>

                      {vid.category ? (
                        <FiCopy onClick={() => handleCopy(i, "category")} />
                      ) : (
                        <FiClipboard
                          onClick={() => handlePaste(i, "category")}
                        />
                      )}

                      {vid.copiedCategory && (
                        <span className="copied-indicator">Copied!</span>
                      )}
                    </div>

                    {/* METADATA */}
                    <p className="meta">
                      Duration: {vid.duration || 0}s | Res:{" "}
                      {vid.resolution || "N/A"}
                    </p>

                    {/* PROGRESS / STATUS */}
                    {vid.status === "success" ? (
                      <p className="success">Upload Complete ✔</p>
                    ) : vid.status === "metadata_fail" ? (
                      <>
                        <p className="error">
                          Metadata Failed (Video on server)
                        </p>
                        <button
                          className="retry-btn"
                          // 💡 NEW: Use the specific metadata retry function
                          onClick={() => retryMetadataSave(vid)}
                        >
                          Retry Metadata Save
                        </button>
                      </>
                    ) : vid.status === "file_fail" ? (
                      <>
                        <p className="error">
                          File Upload Failed — {vid.error}
                        </p>
                        <button
                          className="retry-btn"
                          onClick={() => retryUpload(vid)}
                        >
                          Retry Upload
                        </button>
                      </>
                    ) : (
                      // This handles 'pending', 'uploading', and 'metadata_saving'
                      <div className="progress-bar-container">
                        {/* 💡 NEW: Show stage text */}
                        <p className="upload-stage">
                          {vid.status === "metadata_saving"
                            ? "Stage 2/2: Saving Metadata to Firebase..."
                            : `Stage 1/2: Uploading File to ${
                                vid.platform || "Server"
                              }...`}
                        </p>
                        <div className="progress-bar">
                          <div
                            className={`progress-fill ${
                              vid.status === "metadata_saving"
                                ? "metadata-mode"
                                : ""
                            }`}
                            style={{ width: `${vid.progress}%` }}
                          ></div>
                        </div>
                        <p className="progress-percent">
                          {vid.status === "metadata_saving"
                            ? "100% (Metadata)"
                            : `${Math.floor(vid.progress)}% (File)`}
                        </p>
                      </div>
                    )}

                    {/* REMOVE */}
                    {!uploading && (
                      <button
                        className="remove-btn"
                        onClick={() => removeVideo(i)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* UPLOAD BUTTON */}
            {videos.length > 0 && (
              <button
                className="upload-btn-final"
                disabled={uploading}
                onClick={handleUpload}
              >
                {uploading ? "Uploading..." : "Upload All"}
              </button>
            )}
          </>
        ) : (
          /* ================= UPLOADED TAB ================= */
          <AdminVideos />
        )}
      </div>
    </section>
  );
}

