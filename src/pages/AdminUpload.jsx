// src/pages/AdminUpload.jsx
// src/pages/AdminUpload.jsx
// src/pages/AdminUpload.jsx
// src/pages/AdminUpload.jsx

import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  Copy,
  Clipboard as ClipboardIcon,
  RefreshCw,
  Trash2,
  Plus,
  CheckCircle2,
  AlertCircle,
  X,
  Square,
  CheckSquare,
  UploadCloud,
  LogOut,
  Link as LinkIcon,
  DatabaseZap,
} from "lucide-react";

import uploadVideo, {
  getVideos,
  saveMetadataOnly,
  linkExistingPublitioVideo,
} from "../firebase/uploadVideo.js";
import { migrateVideos } from "../firebase/migrateVideos.js";
import useStorageUsage from "../firebase/useStorageUsage";
import videoPlaceholder from "../assets/images/video-placeholder.webp";
import { extractMetadata, generateThumbnail } from "../utils/processVideo";
import { auth } from "../firebase/config";

import {
  CATEGORIES,
  WEBSITE_SECTIONS,
  getSectionPositions,
  SectionHeader,
  Badge,
  EmptyState,
} from "../components/admin/AdminShared.jsx";
import AdminNavigation from "../components/admin/AdminNavigation.jsx";

import "../styles/pages/adminupload.css";

/* ============================================================
   QUEUE CARD
============================================================ */

const QueueCard = memo(
  ({ vid, index, updateItemStatus, handleCopyPaste, multiSelectMode, uploading }) => (
    <div className={`queue-card glass ${vid.selected ? "is-selected" : ""} ${vid.status === "success" ? "is-complete" : ""}`}>
      {multiSelectMode && (
        <button
          type="button"
          className="queue-card__select"
          onClick={() => updateItemStatus(vid.preview, { selected: !vid.selected })}
          aria-label={vid.selected ? "Deselect" : "Select"}
        >
          {vid.selected ? <CheckSquare size={16} /> : <Square size={16} />}
        </button>
      )}

      <div className="queue-card__thumb">
        <img src={vid.thumbnail || videoPlaceholder} alt="" loading="lazy" />
        <div className="queue-card__thumb-meta">
          <span className="mono">{vid.duration}s</span>
          {vid.resolution && <span className="mono">{vid.resolution}</span>}
        </div>

        {!uploading && !multiSelectMode && (
          <button
            type="button"
            className="queue-card__remove"
            onClick={(e) => {
              e.stopPropagation();
              updateItemStatus(vid.preview, { isRemoved: true });
            }}
            aria-label="Remove from queue"
          >
            <X size={13} />
          </button>
        )}
      </div>

      <div className="queue-card__body">
        <div className="queue-card__field">
          <input
            type="text"
            value={vid.title}
            placeholder="Video title"
            onChange={(e) => updateItemStatus(vid.preview, { title: e.target.value })}
          />
          <button
            type="button"
            className={`icon-btn ${vid.copiedTitle ? "is-success" : ""}`}
            onClick={() => handleCopyPaste(index, "title", vid.title ? "copy" : "paste")}
            aria-label="Copy or paste title"
          >
            {vid.copiedTitle ? <CheckCircle2 size={14} /> : vid.title ? <Copy size={14} /> : <ClipboardIcon size={14} />}
          </button>
        </div>

        <div className="queue-card__field">
          <select
            className={!vid.category && uploading ? "has-error" : ""}
            value={vid.category}
            onChange={(e) => updateItemStatus(vid.preview, { category: e.target.value })}
          >
            <option value="">Category required</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            type="button"
            className={`icon-btn ${vid.copiedCategory ? "is-success" : ""}`}
            onClick={() => handleCopyPaste(index, "category", vid.category ? "copy" : "paste")}
            aria-label="Copy or paste category"
          >
            {vid.copiedCategory ? <CheckCircle2 size={14} /> : vid.category ? <Copy size={14} /> : <ClipboardIcon size={14} />}
          </button>
        </div>

        <div className="queue-card__field">
  <select
    value={vid.websiteSection || ""}
    onChange={(e) => {
      const section = e.target.value;

      updateItemStatus(vid.preview, {
        websiteSection: section,
        displayPosition: "",
      });
    }}
  >
    <option value="">Page placement</option>

    {WEBSITE_SECTIONS.map((section) => (
      <option key={section.id} value={section.id}>
        {section.label}
      </option>
    ))}
  </select>
</div>

{vid.websiteSection && (
  <div className="queue-card__field">
    <select
      value={vid.displayPosition || ""}
      onChange={(e) =>
        updateItemStatus(vid.preview, {
          displayPosition: e.target.value,
        })
      }
    >
      <option value="">Choose position</option>

      {getSectionPositions(vid.websiteSection).map((position) => (
        <option key={position.id} value={position.id}>
          {position.label}
        </option>
      ))}
    </select>
  </div>
)}

        <div className="queue-card__field queue-card__field--textarea">
          <textarea
            value={vid.description || ""}
            placeholder="About this project (optional)"
            onChange={(e) => updateItemStatus(vid.preview, { description: e.target.value })}
          />
          <button
            type="button"
            className={`icon-btn ${vid.copiedDesc ? "is-success" : ""}`}
            onClick={() => handleCopyPaste(index, "description", vid.description ? "copy" : "paste")}
            aria-label="Copy or paste description"
          >
            {vid.copiedDesc ? <CheckCircle2 size={14} /> : vid.description ? <Copy size={14} /> : <ClipboardIcon size={14} />}
          </button>
        </div>

        {vid.warning && (
          <div className="queue-card__warning">
            <AlertCircle size={12} />
            <span>{vid.warning}</span>
          </div>
        )}

        <div className="queue-card__status">
          {vid.status === "success" ? (
            <Badge tone="success" icon={CheckCircle2}>Synced</Badge>
          ) : vid.status === "uploading" || vid.status === "metadata_saving" ? (
            <div className="queue-card__progress">
              <div className="progress-track"><div className="progress-fill" style={{ width: `${vid.progress}%` }} /></div>
              <span className="mono">{vid.status === "metadata_saving" ? "finalizing" : "syncing"} · {vid.progress}%</span>
            </div>
          ) : vid.error ? (
            <div className="queue-card__error">
              <span>{vid.error}</span>
              <button type="button" className="btn-text-only" onClick={() => saveMetadataOnly(vid)}>Retry</button>
            </div>
          ) : (
            <Badge tone="neutral">Ready</Badge>
          )}
        </div>
      </div>
    </div>
  )
);
QueueCard.displayName = "QueueCard";

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function AdminUpload() {
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [existingLibrary, setExistingLibrary] = useState([]);
  const [duplicateWarning, setDuplicateWarning] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [clipboard, setClipboard] = useState("");
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [recoveryId, setRecoveryId] = useState("");
  const [migrating, setMigrating] = useState(false);

  const inputRef = useRef(null);

  const { publitio, vimeo, loading: usageLoading, isAuditing, error: usageError, refetch } = useStorageUsage();
  if (usageError) console.error("Storage Fetch Error:", usageError);

  const selectedVideos = useMemo(() => videos.filter((v) => v.selected), [videos]);
  const isAnySelected = selectedVideos.length > 0;
  const isAllSelected = videos.length > 0 && selectedVideos.length === videos.length;
  const hasSuccessful = useMemo(() => videos.some((v) => v.status === "success"), [videos]);

  const toggleSelectAll = useCallback(() => {
    const target = !isAllSelected;
    setVideos((prev) => prev.map((v) => ({ ...v, selected: target })));
  }, [isAllSelected]);

  useEffect(() => {
    (async () => setExistingLibrary(await getVideos()))();
  }, []);

  const handleLogout = async () => {
    if (uploading) {
      if (!window.confirm("A synchronization is currently active. Logging out now will interrupt the process. Continue?")) return;
    }
    try {
      await signOut(auth);
      navigate("/admin-login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

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

  useEffect(() => {
    return () => videos.forEach((v) => v.preview && URL.revokeObjectURL(v.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateItemStatus = useCallback((preview, updates) => {
    setVideos((prev) => {
      if (updates.isRemoved) return prev.filter((v) => v.preview !== preview);
      return prev.map((v) => (v.preview === preview ? { ...v, ...updates } : v));
    });
  }, []);

  const handleFiles = async (fileList) => {
    const list = Array.from(fileList).filter((f) => ["video/mp4", "video/webm", "video/quicktime"].includes(f.type));

    let duplicatesFound = 0;
    let alreadyInQueue = 0;

    for (const file of list) {
      const fileName = file.name.replace(/\.[^/.]+$/, "");

      const inQueue = videos.some((v) => v.title.toLowerCase() === fileName.toLowerCase());
      if (inQueue) { alreadyInQueue++; continue; }

      const inLibrary = existingLibrary.find((vid) => vid.title.toLowerCase() === fileName.toLowerCase());
      if (inLibrary) duplicatesFound++;

      const preview = URL.createObjectURL(file);

      try {
        const [thumb, meta] = await Promise.all([
          generateThumbnail(file).catch(() => videoPlaceholder),
          extractMetadata(file).catch(() => ({ duration: 0, resolution: "N/A" })),
        ]);

        const durationMatch = existingLibrary.some((v) => v.duration === meta.duration && v.duration !== 0);
        if (durationMatch) duplicatesFound++;

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

  description: "",

  websiteSection: "",
  displayPosition: "",

  placement: [],

  displaySettings: {
    autoplay: true,
    muted: true,
    loop: true,
    priority: "normal",
  },

  pageVisibility: {
  home: false,
  services: false,
  work: false,
  about: false,
  insights: false,
  contact: false,
},

  featured: false,
  order: 0,
  status: "pending",
  progress: 0,
  selected: false,
  error: null,

  warning:
    inLibrary || durationMatch
      ? "Already exists in library"
      : null,
},
        ]);
      } catch (err) {
        console.error("Process error:", err);
      }
    }

    if (alreadyInQueue > 0) setDuplicateWarning(`${alreadyInQueue} file(s) are already in your upload queue.`);
    else if (duplicatesFound > 0) setDuplicateWarning(`${duplicatesFound} file(s) detected in library. Review warnings before sync.`);
  };

  const handleUpload = async () => {
    const queue = isAnySelected ? selectedVideos : videos;
    const incomplete = queue.filter((v) => !v.category);

    if (incomplete.length > 0) {
      setDuplicateWarning(`Action required: ${incomplete.length} video(s) missing categories.`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const duplicateInLibrary = queue.find((v) =>
      existingLibrary.some(
        (lib) =>
          lib.category.toLowerCase() === v.category.toLowerCase() &&
          (lib.title.toLowerCase() === v.title.toLowerCase() ||
            (lib.duration === v.duration && lib.resolution === v.resolution && v.duration > 0))
      )
    );

    if (duplicateInLibrary) {
      setDuplicateWarning(`Duplicate detected: an identical asset already exists in "${duplicateInLibrary.category}".`);
      updateItemStatus(duplicateInLibrary.preview, { error: "Duplicate Asset" });
      return;
    }

    if (!queue.length) return;
    setUploading(true);

    for (const vid of queue) {
      if (vid.status === "success") continue;
      updateItemStatus(vid.preview, { status: "uploading", error: null, progress: 0 });

      try {
        const result = await uploadVideo(
          vid.file, vid.title, vid.category, "ADMIN",
          (p) => {
            const s = p >= 101 ? "metadata_saving" : "uploading";
            updateItemStatus(vid.preview, { progress: Math.min(p, 100), status: s });
          },
        {
  duration: vid.duration,
  resolution: vid.resolution,
  thumbnail: vid.thumbnail,
  description: vid.description,

  section: vid.websiteSection || "",

  placement:
    vid.websiteSection && vid.displayPosition
      ? [
          {
            section: vid.websiteSection,
            position: vid.displayPosition,
          },
        ]
      : [],

  displaySettings: vid.displaySettings,

  pageVisibility: {
    home: false,
    services: false,
    work: false,
    about: false,
    insights: false,
    contact: false,

    ...vid.pageVisibility,

    ...(vid.websiteSection
      ? {
          [vid.websiteSection]: true,
        }
      : {}),
  },

  featured: vid.featured,
  order: vid.order,
  status: "active",
}
        );

        if (result.metadataSaved) {
  updateItemStatus(vid.preview, {
    ...result,
    status: "success",
  });

  setExistingLibrary(await getVideos());
} else if (result.fileUploaded) {
  updateItemStatus(vid.preview, {
    ...result,
    status: "file_fail",
    error: result.error || "Metadata save failed. Click Retry.",
  });
}
      } catch (err) {
        updateItemStatus(vid.preview, { status: "file_fail", error: err.message });
        refetch();
      }
    }

    setUploading(false);
    refetch?.();
  };

  const handleCopyPaste = (index, field, action) => {
    const video = videos[index];
    if (action === "copy") {
      setClipboard(video[field]);
      const flashKey = field === "title" ? "copiedTitle" : field === "category" ? "copiedCategory" : "copiedDesc";
      updateItemStatus(video.preview, { [flashKey]: true });
      setTimeout(() => updateItemStatus(video.preview, { [flashKey]: false }), 1200);
    } else {
      setVideos((prev) => prev.map((v, i) => (v.selected || i === index ? { ...v, [field]: clipboard } : v)));
    }
  };

  const handleRecoveryLink = async () => {
    if (!recoveryId.trim()) return;
    try {
      await linkExistingPublitioVideo(recoveryId.trim());
      setExistingLibrary(await getVideos());
      setRecoveryId("");
      setDuplicateWarning(null);
    } catch (err) {
      setDuplicateWarning(err.message || "Recovery failed.");
    }
  };

  const handleMigrate = async () => {
    setMigrating(true);
    try {
      await migrateVideos();
      setExistingLibrary(await getVideos());
    } catch (err) {
      console.error("Migration failed:", err);
    } finally {
      setMigrating(false);
    }
  };

  return (
    <>
     <AdminNavigation />
    <div className="admin-upload theme-dark" data-theme="dark">
      {/* ============================================================
          STORAGE PANEL
      ============================================================ */}

      <section className="admin-panel">
        <div className="admin-panel__inner">
          <SectionHeader
            eyebrow="Infrastructure"
            title="Storage &amp; Sync"
            actions={
              <>
                <button type="button" className="btn-outline" onClick={handleMigrate} disabled={migrating}>
                  <DatabaseZap size={13} className={migrating ? "spin" : ""} /> {migrating ? "Migrating…" : "Run Migration"}
                </button>
                <button type="button" className="icon-btn" onClick={() => refetch?.(true)} disabled={usageLoading || isAuditing} aria-label="System audit">
                  <RefreshCw size={14} className={isAuditing ? "spin" : ""} />
                </button>
                <button type="button" className={`btn-outline ${uploading ? "is-disabled" : ""}`} onClick={handleLogout} disabled={uploading}>
                  <LogOut size={13} /> {uploading ? "Syncing…" : "Exit Session"}
                </button>
              </>
            }
          />

          <div className="storage-grid">
            <div className="storage-meter glass">
              <div className="storage-meter__head"><h4>Vimeo</h4><span className="storage-meter__badge">PRO</span></div>
              <div className="storage-meter__value"><strong>{vimeo?.usedGB || 0}GB</strong><span>used</span></div>
              <div className="storage-meter__bar"><div className="storage-meter__fill" style={{ width: `${vimeo?.percent || 0}%` }} /></div>
            </div>
            <div className="storage-meter glass">
              <div className="storage-meter__head"><h4>Publitio</h4><span className="storage-meter__badge">CDN</span></div>
              <div className="storage-meter__value"><strong>{publitio?.usedMB || 0}MB</strong><span>used</span></div>
              <div className="storage-meter__bar"><div className="storage-meter__fill" style={{ width: `${publitio?.percent || 0}%` }} /></div>
            </div>
          </div>

          <div className="recovery-row">
            <input
              type="text"
              placeholder="Publitio resource ID to relink…"
              value={recoveryId}
              onChange={(e) => setRecoveryId(e.target.value)}
            />
            <button type="button" className="btn-outline" onClick={handleRecoveryLink}>
              <LinkIcon size={13} /> Relink Asset
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          UPLOAD WORKSPACE
      ============================================================ */}

      <section className="admin-panel admin-panel--light theme-light" data-theme="light">
        <div className="admin-panel__inner">
          <SectionHeader
            eyebrow="Pipeline"
            title={<>Media Queue <span className="count">[{videos.length}]</span></>}
            actions={
              <>
                {hasSuccessful && (
                  <button type="button" className="btn-text-only" onClick={() => setVideos((v) => v.filter((x) => x.status !== "success"))}>
                    Clear completed
                  </button>
                )}
                <button type="button" className={`btn-outline ${multiSelectMode ? "active" : ""}`} onClick={() => setMultiSelectMode((v) => !v)}>
                  Bulk actions
                </button>
                <button type="button" className="btn-solid" onClick={() => inputRef.current?.click()}>
                  <Plus size={14} /> Add media
                </button>
              </>
            }
          />

          {duplicateWarning && (
            <div className="alert-banner">
              <div><AlertCircle size={15} /><span>{duplicateWarning}</span></div>
              <button type="button" onClick={() => setDuplicateWarning(null)} aria-label="Dismiss"><X size={14} /></button>
            </div>
          )}

          <div
            className={`drop-area ${dragActive ? "drag-active" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => inputRef.current?.click()}
          >
            <input type="file" multiple accept="video/*" ref={inputRef} hidden onChange={(e) => handleFiles(e.target.files)} />
            <UploadCloud size={26} className="drop-icon" />
            <p>Drop cinematic files or click to browse</p>
          </div>

          {isAnySelected && (
            <div className="bulk-bar">
              <span className="mono">{selectedVideos.length} selected</span>
              <button type="button" className="btn-text-only" onClick={toggleSelectAll}>{isAllSelected ? "Deselect all" : "Select all"}</button>
              <select
                className="bulk-category-select"
                value=""
                onChange={(e) => {
                  if (!e.target.value) return;
                  setVideos((p) => p.map((v) => (v.selected ? { ...v, category: e.target.value } : v)));
                }}
              >
                <option value="" disabled hidden>Set category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <button
                type="button"
                className="icon-btn icon-btn--danger"
                onClick={() => setVideos((p) => p.filter((v) => !v.selected))}
                aria-label="Remove selected"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}

          <div className="queue-grid">
            {videos.length ? (
              videos.map((vid, index) => (
                <QueueCard
                  key={vid.preview}
                  vid={vid}
                  index={index}
                  updateItemStatus={updateItemStatus}
                  handleCopyPaste={handleCopyPaste}
                  multiSelectMode={multiSelectMode}
                  uploading={uploading}
                />
              ))
            ) : (
              <EmptyState title="Queue is empty" text="Drop files above to begin uploading." icon={UploadCloud} />
            )}
          </div>

          {videos.length > 0 && (
            <div className="upload-footer">
              <button type="button" className="btn-solid btn-solid--lg" onClick={handleUpload} disabled={uploading}>
                {uploading ? "Syncing to cloud…" : `Sync ${selectedVideos.length || videos.length} to Big Day`}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
    </>
  );
}