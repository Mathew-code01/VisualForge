// src/pages/AdminUpload.jsx
// src/pages/AdminUpload.jsx
// src/pages/AdminUpload.jsx
// src/pages/AdminUpload.jsx

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  FiActivity,
  FiAlertCircle,
  FiArchive,
  FiCheckCircle,
  FiChevronRight,
  FiEdit3,
  FiEye,
  FiFilter,
  FiGrid,
  FiHardDrive,
  FiLayers,
  FiLink,
  FiList,
  FiLogOut,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiStar,
  FiTrash2,
  FiUploadCloud,
  FiX,
  FiClock,
  FiFilm,
} from "react-icons/fi";

import uploadVideo, {
  getVideos,
  saveMetadataOnly,
  linkExistingPublitioVideo,
} from "../firebase/uploadVideo.js";
import useStorageUsage from "../firebase/useStorageUsage";
import videoPlaceholder from "../assets/images/video-placeholder.webp";
import { extractMetadata, generateThumbnail } from "../utils/processVideo";
import { auth } from "../firebase/config";

import "../styles/pages/adminupload.css";

/* ============================================================
   CONTENT ARCHITECTURE — classification schema
============================================================ */

const CONTENT_TYPES = [
  "Hero Video",
  "Commercial",
  "Portfolio",
  "Brand Film",
  "Campaign",
  "Showreel",
  "Motion Graphics",
  "Animation",
  "Case Study",
  "Behind The Scenes",
  "Testimonial",
  "Explainer",
  "Image",
  "Logo",
  "Thumbnail",
  "Document",
  "Audio",
];

const WEBSITE_SECTIONS = [
  "Homepage Hero",
  "Work Hero",
  "About Hero",
  "Strategy Hero",
  "Brand Hero",
  "Communication Hero",
  "Digital Hero",
  "Contact Hero",
  "Insights Hero",
  "Global Background",
  "Footer",
  "None",
];

const CATEGORIES = [
  "Video Editing",
  "Corporate",
  "Commercial",
  "Motivational",
  "Sports",
  "Social Media Content",
  "Promotional Video",
];

const ORIENTATIONS = ["Landscape", "Portrait", "Square"];
const PRIORITIES = ["Standard", "High", "Critical"];
const PUBLISH_STATES = ["draft", "published", "hidden", "archived"];

const DEFAULT_PLAYBACK = {
  autoplay: true,
  loop: true,
  muted: true,
  controls: false,
  lazyLoad: true,
  priorityLoad: false,
};

const DEFAULT_METADATA = {
  contentType: "",
  websiteSection: "None",
  category: "",
  tags: "",
  client: "",
  industry: "",
  description: "",
  altText: "",
  caption: "",
  publishState: "draft",
  featured: false,
  priority: "Standard",
  orientation: "Landscape",
  playback: DEFAULT_PLAYBACK,
};

const REQUIRED_FIELDS = ["title", "contentType", "category", "description", "altText"];

const NAV_SECTIONS = [
  { id: "overview", label: "Overview", icon: FiActivity },
  { id: "upload", label: "Upload Queue", icon: FiUploadCloud },
  { id: "library", label: "Media Library", icon: FiLayers },
  { id: "recovery", label: "Recovery Center", icon: FiRefreshCw },
];

/* ============================================================
   HELPERS
============================================================ */

function completenessOf(item) {
  const filled = REQUIRED_FIELDS.filter((field) => Boolean(item[field])).length;
  return Math.round((filled / REQUIRED_FIELDS.length) * 100);
}

function deriveOrientation(resolution) {
  if (!resolution || resolution === "N/A") return "Landscape";
  const [w, h] = resolution.split("x").map(Number);
  if (!w || !h) return "Landscape";
  if (w === h) return "Square";
  return w > h ? "Landscape" : "Portrait";
}

function formatDuration(seconds) {
  const s = Math.round(Number(seconds) || 0);
  const mins = Math.floor(s / 60);
  const secs = String(s % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function timeAgo(input) {
  if (!input) return "—";
  const date = input?.seconds ? new Date(input.seconds * 1000) : new Date(input);
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

/* ============================================================
   SIDEBAR
============================================================ */

function Sidebar({ activeSection, onNavigate, queueCount, libraryCount, onLogout, syncing }) {
  return (
    <aside className="studio-sidebar glass">
      <div className="studio-sidebar__brand">
        <span className="studio-sidebar__mark">BD</span>
        <div>
          <strong>Big Day</strong>
          <span className="mono">Content Studio</span>
        </div>
      </div>

      <nav className="studio-sidebar__nav" aria-label="Studio navigation">
        {NAV_SECTIONS.map((section) => {
          const Icon = section.icon;
          const count =
            section.id === "upload" ? queueCount : section.id === "library" ? libraryCount : null;

          return (
            <button
              type="button"
              key={section.id}
              className={`studio-sidebar__link ${activeSection === section.id ? "is-active" : ""}`}
              onClick={() => onNavigate(section.id)}
            >
              <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
              <span>{section.label}</span>
              {count !== null && count > 0 && <span className="studio-sidebar__count mono">{count}</span>}
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        className={`studio-sidebar__logout ${syncing ? "is-disabled" : ""}`}
        onClick={onLogout}
        disabled={syncing}
      >
        <FiLogOut size={15} strokeWidth={1.8} aria-hidden="true" />
        {syncing ? "Syncing…" : "Exit Session"}
      </button>
    </aside>
  );
}

/* ============================================================
   KPI CARD
============================================================ */

function KpiCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="kpi-card glass">
      <span className="kpi-card__icon">
        <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
      </span>
      <div className="kpi-card__body">
        <span className="kpi-card__value">{value}</span>
        <span className="kpi-card__label">{label}</span>
        {sub && <span className="kpi-card__sub mono">{sub}</span>}
      </div>
    </div>
  );
}

/* ============================================================
   OVERVIEW DASHBOARD
============================================================ */

function OverviewDashboard({ library, queue, storage, onNavigate }) {
  const published = library.filter((v) => v.publishState === "published").length;
  const draft = library.length - published;
  const recent = useMemo(
    () => [...library].sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).slice(0, 6),
    [library]
  );

  return (
    <div className="studio-view animate-fade-in">
      <header className="studio-view__header">
        <div>
          <span className="section-label">overview / dashboard</span>
          <h2 className="elegant-title">Studio Overview</h2>
        </div>
      </header>

      <div className="kpi-grid">
        <KpiCard icon={FiLayers} label="Total Assets" value={library.length} />
        <KpiCard icon={FiCheckCircle} label="Published" value={published} />
        <KpiCard icon={FiEdit3} label="Drafts" value={draft} />
        <KpiCard icon={FiUploadCloud} label="In Queue" value={queue.length} />
        <KpiCard
          icon={FiHardDrive}
          label="Vimeo Storage"
          value={`${storage.vimeo?.usedGB || 0}GB`}
          sub={`${storage.vimeo?.percent || 0}% used`}
        />
        <KpiCard
          icon={FiHardDrive}
          label="Publitio Storage"
          value={`${storage.publitio?.usedMB || 0}MB`}
          sub={`${storage.publitio?.percent || 0}% used`}
        />
      </div>

      <div className="overview-grid">
        <div className="overview-panel glass">
          <div className="overview-panel__head">
            <h3>Recent Activity</h3>
            <button type="button" className="btn-text-only" onClick={() => onNavigate("library")}>
              View library <FiChevronRight size={13} />
            </button>
          </div>

          <div className="activity-list">
            {recent.length ? (
              recent.map((item) => (
                <div className="activity-row" key={item.id}>
                  <img src={item.thumbnail || videoPlaceholder} alt="" loading="lazy" />
                  <div className="activity-row__body">
                    <strong>{item.title}</strong>
                    <span className="mono">
                      {item.contentType || "Uncategorized"} · {timeAgo(item.createdAt)}
                    </span>
                  </div>
                  <span className={`status-pill status-pill--${item.publishState || "draft"}`}>
                    {item.publishState || "draft"}
                  </span>
                </div>
              ))
            ) : (
              <p className="empty-note">No assets yet. Start by uploading in the Upload Queue.</p>
            )}
          </div>
        </div>

        <div className="overview-panel glass">
          <div className="overview-panel__head">
            <h3>Quick Actions</h3>
          </div>

          <div className="quick-actions">
            <button type="button" className="quick-action" onClick={() => onNavigate("upload")}>
              <FiPlus size={16} strokeWidth={1.8} aria-hidden="true" />
              <span>Upload New Media</span>
            </button>
            <button type="button" className="quick-action" onClick={() => onNavigate("library")}>
              <FiGrid size={16} strokeWidth={1.8} aria-hidden="true" />
              <span>Browse Media Library</span>
            </button>
            <button type="button" className="quick-action" onClick={() => onNavigate("recovery")}>
              <FiRefreshCw size={16} strokeWidth={1.8} aria-hidden="true" />
              <span>Open Recovery Center</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   INSPECTOR PANEL — full metadata editor drawer
============================================================ */

function InspectorPanel({ item, onChange, onClose, onSave, saving }) {
  if (!item) return null;

  const update = (patch) => onChange(item.preview || item.id, patch);
  const updatePlayback = (key, value) =>
    update({ playback: { ...item.playback, [key]: value } });

  const completeness = completenessOf(item);

  return (
    <aside className="inspector glass" aria-label="Media inspector">
      <div className="inspector__head">
        <div>
          <span className="section-label">media inspector</span>
          <h3>{item.title || "Untitled asset"}</h3>
        </div>
        <button type="button" className="inspector__close" onClick={onClose} aria-label="Close inspector">
          <FiX size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="inspector__thumb">
        <img src={item.thumbnail || videoPlaceholder} alt="" />
        <div className="inspector__completeness">
          <span>Metadata completeness</span>
          <div className="completeness-bar">
            <div className="completeness-bar__fill" style={{ width: `${completeness}%` }} />
          </div>
          <span className="mono">{completeness}%</span>
        </div>
      </div>

      <div className="inspector__scroll">
        <section className="inspector__group">
          <h4>Identity</h4>
          <label>
            Title
            <input type="text" value={item.title || ""} onChange={(e) => update({ title: e.target.value })} />
          </label>
          <label>
            Client
            <input type="text" value={item.client || ""} onChange={(e) => update({ client: e.target.value })} placeholder="Client name" />
          </label>
          <label>
            Industry
            <input type="text" value={item.industry || ""} onChange={(e) => update({ industry: e.target.value })} placeholder="e.g. Fintech, Fashion" />
          </label>
          <label>
            Tags
            <input type="text" value={item.tags || ""} onChange={(e) => update({ tags: e.target.value })} placeholder="Comma separated" />
          </label>
        </section>

        <section className="inspector__group">
          <h4>Classification</h4>
          <label>
            Content Type
            <select value={item.contentType || ""} onChange={(e) => update({ contentType: e.target.value })}>
              <option value="">Select content type</option>
              {CONTENT_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            Website Section
            <select value={item.websiteSection || "None"} onChange={(e) => update({ websiteSection: e.target.value })}>
              {WEBSITE_SECTIONS.map((section) => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </label>
          <label>
            Category
            <select value={item.category || ""} onChange={(e) => update({ category: e.target.value })}>
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
        </section>

        <section className="inspector__group">
          <h4>Description &amp; SEO</h4>
          <label>
            Project Description
            <textarea value={item.description || ""} onChange={(e) => update({ description: e.target.value })} rows={3} />
          </label>
          <label>
            Alt Text
            <input type="text" value={item.altText || ""} onChange={(e) => update({ altText: e.target.value })} placeholder="Accessible description" />
          </label>
          <label>
            Caption
            <input type="text" value={item.caption || ""} onChange={(e) => update({ caption: e.target.value })} />
          </label>
        </section>

        <section className="inspector__group">
          <h4>Publishing</h4>
          <label>
            Status
            <select value={item.publishState || "draft"} onChange={(e) => update({ publishState: e.target.value })}>
              {PUBLISH_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </label>
          <label>
            Priority
            <select value={item.priority || "Standard"} onChange={(e) => update({ priority: e.target.value })}>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>
          <label className="inspector__toggle-row">
            <span>Featured</span>
            <input type="checkbox" checked={Boolean(item.featured)} onChange={(e) => update({ featured: e.target.checked })} />
          </label>
        </section>

        <section className="inspector__group">
          <h4>Playback Options</h4>
          {Object.entries(item.playback || DEFAULT_PLAYBACK).map(([key, value]) => (
            <label className="inspector__toggle-row" key={key}>
              <span>{key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}</span>
              <input type="checkbox" checked={Boolean(value)} onChange={(e) => updatePlayback(key, e.target.checked)} />
            </label>
          ))}
        </section>

        <section className="inspector__group">
          <h4>Technical</h4>
          <div className="inspector__tech-grid">
            <div><span>Duration</span><strong>{formatDuration(item.duration)}</strong></div>
            <div><span>Resolution</span><strong>{item.resolution || "N/A"}</strong></div>
            <div><span>Orientation</span><strong>{item.orientation || deriveOrientation(item.resolution)}</strong></div>
            <div><span>Aspect Ratio</span><strong>{item.aspectRatio || "16:9"}</strong></div>
          </div>
        </section>
      </div>

      <div className="inspector__footer">
        <button type="button" className="btn-outline" onClick={onClose}>Close</button>
        <button type="button" className="btn-solid" onClick={() => onSave(item)} disabled={saving}>
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </aside>
  );
}

/* ============================================================
   QUEUE ROW
============================================================ */

const QueueRow = memo(({ item, isSelected, multiSelectMode, onToggleSelect, onOpen, onRemove }) => {
  const completeness = completenessOf(item);

  return (
    <div
      className={`queue-row ${isSelected ? "is-selected" : ""} ${item.status === "success" ? "is-complete" : ""}`}
      onClick={() => (multiSelectMode ? onToggleSelect(item.preview) : onOpen(item))}
    >
      {multiSelectMode && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(item.preview)}
          onClick={(e) => e.stopPropagation()}
          className="queue-row__checkbox"
        />
      )}

      <div className="queue-row__thumb">
        <img src={item.thumbnail || videoPlaceholder} alt="" loading="lazy" />
        <span className="queue-row__duration mono">{formatDuration(item.duration)}</span>
      </div>

      <div className="queue-row__meta">
        <strong>{item.title || "Untitled"}</strong>
        <span className="mono">
          {item.contentType || "No content type"} · {item.websiteSection || "None"} · {item.resolution || "N/A"}
        </span>
      </div>

      <div className="queue-row__completeness" title={`${completeness}% complete`}>
        <div className="completeness-bar completeness-bar--sm">
          <div className="completeness-bar__fill" style={{ width: `${completeness}%` }} />
        </div>
      </div>

      <div className="queue-row__status">
        {item.status === "success" ? (
          <span className="status-badge success"><FiCheckCircle size={12} /> synced</span>
        ) : item.status === "uploading" || item.status === "metadata_saving" ? (
          <div className="queue-row__progress">
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${item.progress || 0}%` }} />
            </div>
            <span className="mono">{item.progress || 0}%</span>
          </div>
        ) : item.error ? (
          <span className="status-badge error"><FiAlertCircle size={12} /> {item.error}</span>
        ) : (
          <span className="status-badge pending">ready</span>
        )}
      </div>

      <div className="queue-row__actions" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="icon-btn" onClick={() => onOpen(item)} aria-label="Edit metadata">
          <FiEdit3 size={14} aria-hidden="true" />
        </button>
        <button type="button" className="icon-btn icon-btn--danger" onClick={() => onRemove(item.preview)} aria-label="Remove">
          <FiTrash2 size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});

QueueRow.displayName = "QueueRow";

/* ============================================================
   UPLOAD QUEUE VIEW
============================================================ */

function UploadQueueView({
  queue,
  library,
  onFiles,
  dragActive,
  setDragActive,
  inputRef,
  multiSelectMode,
  setMultiSelectMode,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onUpdateItem,
  onRemoveItem,
  onSync,
  syncing,
  inspectorItem,
  setInspectorItem,
  onSaveInspector,
  duplicateWarning,
  setDuplicateWarning,
}) {
  const hasCompleted = queue.some((v) => v.status === "success");

  return (
    <div className="studio-view animate-fade-in">
      <header className="studio-view__header">
        <div>
          <span className="section-label">upload / pipeline</span>
          <h2 className="elegant-title">
            Upload Queue <span className="count">[{queue.length}]</span>
          </h2>
        </div>

        <div className="studio-view__actions">
          {hasCompleted && (
            <button
              type="button"
              className="btn-text-only"
              onClick={() => queue.filter((v) => v.status !== "success").forEach(() => {})}
            >
              {/* clear-completed handled by parent via onRemoveItem loop below */}
            </button>
          )}
          <button type="button" className={`btn-outline ${multiSelectMode ? "active" : ""}`} onClick={() => setMultiSelectMode((v) => !v)}>
            bulk actions
          </button>
          <button type="button" className="btn-solid" onClick={() => inputRef.current?.click()}>
            <FiPlus size={14} aria-hidden="true" /> add media
          </button>
        </div>
      </header>

      {duplicateWarning && (
        <div className="alert-banner">
          <div className="alert-banner__content">
            <FiAlertCircle size={15} aria-hidden="true" />
            <span>{duplicateWarning}</span>
          </div>
          <button type="button" onClick={() => setDuplicateWarning(null)} aria-label="Dismiss">
            <FiX size={14} aria-hidden="true" />
          </button>
        </div>
      )}

      <div
        className={`drop-area ${dragActive ? "drag-active" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setDragActive(false); onFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
      >
        <input type="file" multiple accept="video/*" ref={inputRef} hidden onChange={(e) => onFiles(e.target.files)} />
        <FiUploadCloud className="drop-icon" size={28} aria-hidden="true" />
        <p className="drop-text">Drop cinematic files or click to browse</p>
      </div>

      {multiSelectMode && selectedIds.length > 0 && (
        <div className="bulk-bar">
          <span className="mono">{selectedIds.length} selected</span>
          <button type="button" className="btn-text-only" onClick={onSelectAll}>select all</button>
          <button type="button" className="btn-solid btn-solid--sm" onClick={onSync} disabled={syncing}>
            {syncing ? "Syncing…" : "Sync Selected"}
          </button>
        </div>
      )}

      <div className="queue-list">
        {queue.length ? (
          queue.map((item) => (
            <QueueRow
              key={item.preview}
              item={item}
              isSelected={selectedIds.includes(item.preview)}
              multiSelectMode={multiSelectMode}
              onToggleSelect={onToggleSelect}
              onOpen={setInspectorItem}
              onRemove={onRemoveItem}
            />
          ))
        ) : (
          <p className="empty-note">Nothing queued yet. Drop files above to begin.</p>
        )}
      </div>

      {queue.length > 0 && (
        <div className="studio-view__footer">
          <button type="button" className="btn-solid btn-solid--lg" onClick={onSync} disabled={syncing}>
            {syncing ? "Syncing to cloud…" : `Sync ${selectedIds.length || queue.length} to Big Day`}
          </button>
        </div>
      )}

      {inspectorItem && (
        <InspectorPanel
          item={inspectorItem}
          onChange={onUpdateItem}
          onClose={() => setInspectorItem(null)}
          onSave={onSaveInspector}
          saving={false}
        />
      )}
    </div>
  );
}

/* ============================================================
   MEDIA LIBRARY VIEW
============================================================ */

function MediaLibraryView({ library, refreshing, onRefresh, onEdit }) {
  const [viewMode, setViewMode] = useState("grid");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterSection, setFilterSection] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [selected, setSelected] = useState([]);

  const filtered = useMemo(() => {
    let items = [...library];

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((v) => (v.title || "").toLowerCase().includes(q) || (v.client || "").toLowerCase().includes(q));
    }

    if (filterType !== "All") items = items.filter((v) => v.contentType === filterType);
    if (filterSection !== "All") items = items.filter((v) => v.websiteSection === filterSection);

    items.sort((a, b) => {
      if (sortBy === "newest") return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
      if (sortBy === "oldest") return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
      if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
      if (sortBy === "duration") return (b.duration || 0) - (a.duration || 0);
      return 0;
    });

    return items;
  }, [library, search, filterType, filterSection, sortBy]);

  const toggleSelect = (id) => setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const groupedByDate = useMemo(() => {
    const groups = {};
    filtered.forEach((item) => {
      const date = item.createdAt?.seconds ? new Date(item.createdAt.seconds * 1000) : new Date();
      const key = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
      groups[key] = groups[key] || [];
      groups[key].push(item);
    });
    return groups;
  }, [filtered]);

  return (
    <div className="studio-view animate-fade-in">
      <header className="studio-view__header">
        <div>
          <span className="section-label">library / assets</span>
          <h2 className="elegant-title">
            Media Library <span className="count">[{filtered.length}]</span>
          </h2>
        </div>

        <div className="studio-view__actions">
          <button type="button" className="icon-btn" onClick={onRefresh} disabled={refreshing} aria-label="Refresh library">
            <FiRefreshCw size={15} className={refreshing ? "spin" : ""} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="library-toolbar glass">
        <div className="library-toolbar__search">
          <FiSearch size={15} aria-hidden="true" />
          <input type="text" placeholder="Search assets or clients…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="library-toolbar__filters">
          <FiFilter size={13} aria-hidden="true" />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="All">All Content Types</option>
            {CONTENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={filterSection} onChange={(e) => setFilterSection(e.target.value)}>
            <option value="All">All Sections</option>
            {WEBSITE_SECTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title">Title A–Z</option>
            <option value="duration">Longest duration</option>
          </select>
        </div>

        <div className="library-toolbar__views">
          {[
            { id: "grid", icon: FiGrid },
            { id: "table", icon: FiList },
            { id: "list", icon: FiLayers },
            { id: "timeline", icon: FiClock },
          ].map(({ id, icon: Icon }) => (
            <button
              type="button"
              key={id}
              className={viewMode === id ? "is-active" : ""}
              onClick={() => setViewMode(id)}
              aria-label={`${id} view`}
            >
              <Icon size={14} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      {selected.length > 0 && (
        <div className="bulk-bar">
          <span className="mono">{selected.length} selected</span>
          <button type="button" className="btn-text-only" onClick={() => setSelected([])}>clear</button>
        </div>
      )}

      {viewMode === "grid" && (
        <div className="library-grid">
          {filtered.map((item) => (
            <div className="library-card glass" key={item.id}>
              <div className="library-card__thumb" onClick={() => onEdit(item)}>
                <img src={item.thumbnail || videoPlaceholder} alt={item.altText || ""} loading="lazy" />
                {item.featured && <span className="featured-badge"><FiStar size={11} /></span>}
                <span className={`status-pill status-pill--${item.publishState || "draft"}`}>{item.publishState || "draft"}</span>
              </div>
              <div className="library-card__body">
                <strong>{item.title}</strong>
                <span className="mono">{item.contentType || "—"} · {formatDuration(item.duration)}</span>
              </div>
              <div className="library-card__actions">
                <button type="button" className="icon-btn" onClick={() => onEdit(item)} aria-label="Quick edit">
                  <FiEdit3 size={13} aria-hidden="true" />
                </button>
                <button type="button" className="icon-btn" aria-label="Preview">
                  <FiEye size={13} aria-hidden="true" />
                </button>
                <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} />
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === "table" && (
        <div className="library-table-wrap glass">
          <table className="library-table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Content Type</th>
                <th>Section</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} onClick={() => onEdit(item)}>
                  <td><img src={item.thumbnail || videoPlaceholder} alt="" className="library-table__thumb" /></td>
                  <td>{item.title}</td>
                  <td className="mono">{item.contentType || "—"}</td>
                  <td className="mono">{item.websiteSection || "None"}</td>
                  <td className="mono">{formatDuration(item.duration)}</td>
                  <td><span className={`status-pill status-pill--${item.publishState || "draft"}`}>{item.publishState || "draft"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === "list" && (
        <div className="library-list">
          {filtered.map((item) => (
            <div className="library-list-row glass" key={item.id} onClick={() => onEdit(item)}>
              <img src={item.thumbnail || videoPlaceholder} alt="" />
              <div className="library-list-row__body">
                <strong>{item.title}</strong>
                <span className="mono">{item.client || "No client"} · {item.industry || "—"}</span>
              </div>
              <span className="mono">{item.category}</span>
              <span className={`status-pill status-pill--${item.publishState || "draft"}`}>{item.publishState || "draft"}</span>
            </div>
          ))}
        </div>
      )}

      {viewMode === "timeline" && (
        <div className="library-timeline">
          {Object.entries(groupedByDate).map(([month, items]) => (
            <div className="library-timeline__group" key={month}>
              <h4 className="mono">{month}</h4>
              <div className="library-timeline__items">
                {items.map((item) => (
                  <div className="library-timeline__item glass" key={item.id} onClick={() => onEdit(item)}>
                    <img src={item.thumbnail || videoPlaceholder} alt="" />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {!filtered.length && <p className="empty-note">No assets match the current filters.</p>}
    </div>
  );
}

/* ============================================================
   RECOVERY CENTER
============================================================ */

function RecoveryCenter({ library, onRelink, onSync, syncing, recoveryId, setRecoveryId }) {
  const broken = library.filter((v) => !v.thumbnail || !v.resolution || v.resolution === "N/A");

  return (
    <div className="studio-view animate-fade-in">
      <header className="studio-view__header">
        <div>
          <span className="section-label">recovery / repair</span>
          <h2 className="elegant-title">Recovery Center</h2>
        </div>
      </header>

      <div className="recovery-grid">
        <div className="recovery-panel glass">
          <h3>Publitio Relink</h3>
          <p>Reconnect an asset that failed to sync its cloud reference.</p>
          <div className="recovery-panel__form">
            <input
              type="text"
              placeholder="Publitio resource ID"
              value={recoveryId}
              onChange={(e) => setRecoveryId(e.target.value)}
            />
            <button type="button" className="btn-solid" onClick={() => onRelink(recoveryId)}>
              <FiLink size={14} aria-hidden="true" /> Relink Asset
            </button>
          </div>
        </div>

        <div className="recovery-panel glass">
          <h3>Metadata Synchronization</h3>
          <p>Re-pull the latest library state from Firebase to resolve stale records.</p>
          <button type="button" className="btn-outline" onClick={onSync} disabled={syncing}>
            <FiRefreshCw size={14} className={syncing ? "spin" : ""} aria-hidden="true" />
            {syncing ? "Synchronizing…" : "Synchronize Now"}
          </button>
        </div>

        <div className="recovery-panel glass recovery-panel--wide">
          <h3>Broken Asset Repair <span className="count">[{broken.length}]</span></h3>
          <p>Assets missing a thumbnail or resolution reading — flagged for manual review.</p>

          <div className="recovery-list">
            {broken.length ? (
              broken.map((item) => (
                <div className="recovery-list__row" key={item.id}>
                  <img src={item.thumbnail || videoPlaceholder} alt="" />
                  <div className="recovery-list__body">
                    <strong>{item.title}</strong>
                    <span className="mono">
                      {!item.thumbnail && "Missing thumbnail"}
                      {!item.thumbnail && (!item.resolution || item.resolution === "N/A") && " · "}
                      {(!item.resolution || item.resolution === "N/A") && "Missing resolution"}
                    </span>
                  </div>
                  <span className="status-badge error"><FiArchive size={12} aria-hidden="true" /> needs repair</span>
                </div>
              ))
            ) : (
              <p className="empty-note">No broken assets detected. Library is healthy.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function AdminUpload() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("overview");
  const [queue, setQueue] = useState([]);
  const [library, setLibrary] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [inspectorItem, setInspectorItem] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [refreshingLibrary, setRefreshingLibrary] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(null);
  const [recoveryId, setRecoveryId] = useState("");

  const inputRef = useRef(null);

  const {
    publitio,
    vimeo,
    loading: usageLoading,
    isAuditing,
    error: usageError,
    refetch,
  } = useStorageUsage();

  if (usageError) console.error("Storage Fetch Error:", usageError);

  /* ============================================================
     LOAD LIBRARY
  ============================================================ */

  const loadLibrary = useCallback(async () => {
    setRefreshingLibrary(true);
    try {
      const data = await getVideos();
      setLibrary(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load library:", err);
    } finally {
      setRefreshingLibrary(false);
    }
  }, []);

  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  /* ============================================================
     LOGOUT / UNLOAD GUARD
  ============================================================ */

  const handleLogout = async () => {
    if (syncing) {
      const confirmLogout = window.confirm(
        "A synchronization is currently active. Logging out now will interrupt the process. Continue?"
      );
      if (!confirmLogout) return;
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
      if (syncing) {
        e.preventDefault();
        e.returnValue = "Upload in progress. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [syncing]);

  useEffect(() => {
    return () => queue.forEach((v) => v.preview && URL.revokeObjectURL(v.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ============================================================
     QUEUE HELPERS
  ============================================================ */

  const updateQueueItem = useCallback((preview, updates) => {
    setQueue((prev) => prev.map((v) => (v.preview === preview ? { ...v, ...updates } : v)));
    setInspectorItem((prev) => (prev && prev.preview === preview ? { ...prev, ...updates } : prev));
  }, []);

  const removeQueueItem = useCallback((preview) => {
    setQueue((prev) => prev.filter((v) => v.preview !== preview));
    setSelectedIds((prev) => prev.filter((id) => id !== preview));
    setInspectorItem((prev) => (prev && prev.preview === preview ? null : prev));
  }, []);

  const toggleSelect = useCallback((preview) => {
    setSelectedIds((prev) => (prev.includes(preview) ? prev.filter((id) => id !== preview) : [...prev, preview]));
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds((prev) => (prev.length === queue.length ? [] : queue.map((v) => v.preview)));
  }, [queue]);

  /* ============================================================
     FILE INTAKE — mirrors previous duplicate-detection logic
  ============================================================ */

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList).filter((f) =>
      ["video/mp4", "video/webm", "video/quicktime"].includes(f.type)
    );

    let duplicatesFound = 0;
    let alreadyInQueue = 0;

    for (const file of files) {
      const fileName = file.name.replace(/\.[^/.]+$/, "");

      const inQueue = queue.some((v) => v.title.toLowerCase() === fileName.toLowerCase());
      if (inQueue) {
        alreadyInQueue++;
        continue;
      }

      const inLibrary = library.find((v) => (v.title || "").toLowerCase() === fileName.toLowerCase());
      if (inLibrary) duplicatesFound++;

      const preview = URL.createObjectURL(file);

      try {
        const [thumb, meta] = await Promise.all([
          generateThumbnail(file).catch(() => videoPlaceholder),
          extractMetadata(file).catch(() => ({ duration: 0, resolution: "N/A" })),
        ]);

        const durationMatch = library.some((v) => v.duration === meta.duration && v.duration !== 0);
        if (durationMatch) duplicatesFound++;

        setQueue((prev) => [
          ...prev,
          {
            ...DEFAULT_METADATA,
            file,
            preview,
            title: fileName,
            duration: meta.duration || 0,
            resolution: meta.resolution || "N/A",
            orientation: deriveOrientation(meta.resolution),
            thumbnail: thumb,
            progress: 0,
            status: "pending",
            error: null,
            warning: inLibrary || durationMatch ? "Already exists in library" : null,
          },
        ]);
      } catch (err) {
        console.error("Process error:", err);
      }
    }

    if (alreadyInQueue > 0) {
      setDuplicateWarning(`${alreadyInQueue} file(s) are already in your upload queue.`);
    } else if (duplicatesFound > 0) {
      setDuplicateWarning(`${duplicatesFound} file(s) detected in library. Review warnings before sync.`);
    }
  };

  /* ============================================================
     SYNC / UPLOAD — preserves original upload contract
  ============================================================ */

  const handleSync = async () => {
    const targets = selectedIds.length ? queue.filter((v) => selectedIds.includes(v.preview)) : queue;

    const incomplete = targets.filter((v) => !v.category || !v.contentType);
    if (incomplete.length > 0) {
      setDuplicateWarning(`Action required: ${incomplete.length} asset(s) missing category or content type.`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const duplicateInLibrary = targets.find((v) =>
      library.some(
        (lib) =>
          (lib.category || "").toLowerCase() === v.category.toLowerCase() &&
          ((lib.title || "").toLowerCase() === v.title.toLowerCase() ||
            (lib.duration === v.duration && lib.resolution === v.resolution && v.duration > 0))
      )
    );

    if (duplicateInLibrary) {
      setDuplicateWarning(`Duplicate detected: an identical asset already exists in "${duplicateInLibrary.category}".`);
      updateQueueItem(duplicateInLibrary.preview, { error: "Duplicate asset" });
      return;
    }

    if (!targets.length) return;
    setSyncing(true);

    for (const item of targets) {
      if (item.status === "success") continue;

      updateQueueItem(item.preview, { status: "uploading", error: null, progress: 0 });

      try {
        const result = await uploadVideo(
          item.file,
          item.title,
          item.category,
          "ADMIN",
          (p) => {
            const s = p >= 101 ? "metadata_saving" : "uploading";
            updateQueueItem(item.preview, { progress: Math.min(p, 100), status: s });
          },
          {
            duration: item.duration,
            resolution: item.resolution,
            thumbnail: item.thumbnail,
            description: item.description,
            contentType: item.contentType,
            websiteSection: item.websiteSection,
            tags: item.tags,
            client: item.client,
            industry: item.industry,
            altText: item.altText,
            caption: item.caption,
            publishState: item.publishState,
            featured: item.featured,
            priority: item.priority,
            orientation: item.orientation,
            playback: item.playback,
          }
        );

        if (result?.metadataSaved) {
          updateQueueItem(item.preview, { ...result, status: "success" });
          const updated = await getVideos();
          setLibrary(Array.isArray(updated) ? updated : []);
        }
      } catch (err) {
        updateQueueItem(item.preview, { status: "file_fail", error: err.message });
        refetch();
      }
    }

    setSyncing(false);
    refetch?.();
  };

  /* ============================================================
     LIBRARY QUICK EDIT — patches an already-saved asset
  ============================================================ */

  const handleEditLibraryItem = (item) => {
    setInspectorItem({ ...DEFAULT_METADATA, ...item });
    setActiveSection("upload");
  };

  const handleSaveInspector = async (item) => {
    try {
      if (item.status === "success" || item.id) {
        await saveMetadataOnly(item);
        await loadLibrary();
      }
      setInspectorItem(null);
    } catch (err) {
      console.error("Failed to save metadata:", err);
    }
  };

  /* ============================================================
     RECOVERY
  ============================================================ */

  const handleRelink = async (id) => {
    if (!id.trim()) return;
    try {
      await linkExistingPublitioVideo(id.trim());
      await loadLibrary();
      setRecoveryId("");
    } catch (err) {
      console.error("Relink failed:", err);
    }
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="admin-studio theme-dark" data-theme="dark">
      <Sidebar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        queueCount={queue.length}
        libraryCount={library.length}
        onLogout={handleLogout}
        syncing={syncing}
      />

      <main className="admin-studio__main">
        {activeSection === "overview" && (
          <OverviewDashboard
            library={library}
            queue={queue}
            storage={{ publitio, vimeo }}
            onNavigate={setActiveSection}
          />
        )}

        {activeSection === "upload" && (
          <UploadQueueView
            queue={queue}
            library={library}
            onFiles={handleFiles}
            dragActive={dragActive}
            setDragActive={setDragActive}
            inputRef={inputRef}
            multiSelectMode={multiSelectMode}
            setMultiSelectMode={setMultiSelectMode}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onSelectAll={selectAll}
            onUpdateItem={updateQueueItem}
            onRemoveItem={removeQueueItem}
            onSync={handleSync}
            syncing={syncing}
            inspectorItem={inspectorItem}
            setInspectorItem={setInspectorItem}
            onSaveInspector={handleSaveInspector}
            duplicateWarning={duplicateWarning}
            setDuplicateWarning={setDuplicateWarning}
          />
        )}

        {activeSection === "library" && (
          <MediaLibraryView
            library={library}
            refreshing={refreshingLibrary}
            onRefresh={loadLibrary}
            onEdit={handleEditLibraryItem}
          />
        )}

        {activeSection === "recovery" && (
          <RecoveryCenter
            library={library}
            onRelink={handleRelink}
            onSync={loadLibrary}
            syncing={refreshingLibrary}
            recoveryId={recoveryId}
            setRecoveryId={setRecoveryId}
          />
        )}
      </main>

      <div className="admin-studio__storage-strip glass">
        <span className="mono">Vimeo {vimeo?.usedGB || 0}GB</span>
        <span className="mono">Publitio {publitio?.usedMB || 0}MB</span>
        <button type="button" className="icon-btn" onClick={() => refetch?.()} disabled={usageLoading} aria-label="Refresh storage">
          <FiRefreshCw size={12} className={usageLoading && !isAuditing ? "spin" : ""} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}