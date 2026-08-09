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
  Check,
} from "lucide-react";

import {
  getVideos,
  updateVideoDescription,
  updateVideoMetadata,
} from "../firebase/uploadVideo.js";
import { deleteVideo } from "../firebase/deleteVideo.js";

import {
  SectionHeader,
  Badge,
  LoadingState,
  EmptyState,
  Modal,
  formatDuration,
  CATEGORIES,
  WEBSITE_SECTIONS,
  getSectionPositions,
} from "../components/admin/AdminShared.jsx";
import AdminNavigation from "../components/admin/AdminNavigation.jsx";

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


  const [editForm, setEditForm] = useState({
  title: "",
  description: "",
  category: "",
  websiteSection: "",
  displayPosition: "",
  placement: [],
  tags: [],
  pageVisibility: {},
  displaySettings: {},
  featured: false,
  order: 0,
  status: "active",
});

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
  const firstPlacement = vid.placement?.[0];

  setSelectedVideo(vid);

  setEditForm({
    title: vid.title || "",
    description: vid.description || "",
    category: vid.category || "",

    websiteSection:
      firstPlacement?.section ||
      vid.section ||
      "",

    displayPosition:
      firstPlacement?.position ||
      "",

    placement: Array.isArray(vid.placement)
      ? vid.placement
      : [],

    tags: Array.isArray(vid.tags)
      ? vid.tags
      : [],

    pageVisibility: {
      home: false,
      about: false,
      services: false,
      insights: false,
      work: false,
      contact: false,
      ...(vid.pageVisibility || {}),
    },

    displaySettings: {
      autoplay: true,
      muted: true,
      loop: true,
      priority: "normal",
      ...(vid.displaySettings || {}),
    },

    featured: Boolean(vid.featured),
    order: Number(vid.order || 0),
    status: vid.status || "active",
  });

  setIsEditing(false);
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

  const handleSaveVideo = async () => {
  if (!selectedVideo) return;

  setIsSaving(true);

  try {
    const placement =
      editForm.websiteSection && editForm.displayPosition
        ? [
            {
              section: editForm.websiteSection,
              position: editForm.displayPosition,
            },
          ]
        : [];

    const updates = {
      title: editForm.title.trim(),
      description: editForm.description.trim(),
      category: editForm.category,

      section: editForm.websiteSection,

      placement,

      tags: editForm.tags,

      pageVisibility: editForm.pageVisibility,

      displaySettings: editForm.displaySettings,

      featured: Boolean(editForm.featured),

      order: Number(editForm.order || 0),

      status: editForm.status,
    };

    await updateVideoMetadata(
      selectedVideo.id,
      updates
    );

    const updated = {
      ...selectedVideo,
      ...updates,
    };

    setVideos((prev) =>
      prev.map((video) =>
        video.id === selectedVideo.id
          ? updated
          : video
      )
    );

    setSelectedVideo(updated);
    setIsEditing(false);

    alert("Video settings saved successfully.");
  } catch (err) {
    console.error(err);
    alert("Failed to save video settings.");
  } finally {
    setIsSaving(false);
  }
};

  return (
  <div className="admin-shell">

    <AdminNavigation />

    <main className="admin-shell__content">
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
  <button
    type="button"
    className="icon-btn"
    onClick={() => openVideo(vid)}
    aria-label="Edit"
  >
    <Edit3 size={13} />
  </button>

  <a
    href={vid.url}
    target="_blank"
    rel="noreferrer"
    className="icon-btn"
    aria-label="Open source"
  >
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

      <Modal
  open={Boolean(selectedVideo)}
  onClose={() => {
    if (!isSaving) {
      setSelectedVideo(null);
      setIsEditing(false);
    }
  }}
  title={isEditing ? "Edit Video Asset" : selectedVideo?.title}
>
  {selectedVideo && (
    <div className="video-modal">

      {/* ======================================================
          VIDEO PREVIEW
      ====================================================== */}

      <div className="video-modal__player">
        <video
          src={selectedVideo.url}
          poster={selectedVideo.thumbnail}
          controls
          playsInline
        />
      </div>

      {/* ======================================================
          TECHNICAL META
      ====================================================== */}

      <div className="video-modal__meta">
        <Badge tone="neutral">
          {selectedVideo.category || "General"}
        </Badge>

        <span className="mono">
          {formatDuration(selectedVideo.duration)}
        </span>

        {selectedVideo.resolution && (
          <span className="mono">
            {selectedVideo.resolution}
          </span>
        )}

        {selectedVideo.platform && (
          <span className="mono">
            {selectedVideo.platform}
          </span>
        )}
      </div>

      {!isEditing ? (
        <>
          {/* ==================================================
              READ-ONLY VIEW
          ================================================== */}

          <div className="video-details-grid">

            <div className="video-detail-card">
              <span className="video-detail-card__label">
                Title
              </span>

              <strong>
                {selectedVideo.title || "Untitled"}
              </strong>
            </div>

            <div className="video-detail-card">
              <span className="video-detail-card__label">
                Category
              </span>

              <strong>
                {selectedVideo.category || "General"}
              </strong>
            </div>

            <div className="video-detail-card">
              <span className="video-detail-card__label">
                Website Section
              </span>

              <strong>
                {selectedVideo.section ||
                  selectedVideo.placement?.[0]?.section ||
                  "Not assigned"}
              </strong>
            </div>

            <div className="video-detail-card">
              <span className="video-detail-card__label">
                Position
              </span>

              <strong>
                {selectedVideo.placement?.[0]?.position ||
                  "Not assigned"}
              </strong>
            </div>

            <div className="video-detail-card">
              <span className="video-detail-card__label">
                Status
              </span>

              <Badge
                tone={
                  selectedVideo.status === "active"
                    ? "success"
                    : "neutral"
                }
              >
                {selectedVideo.status || "active"}
              </Badge>
            </div>

            <div className="video-detail-card">
              <span className="video-detail-card__label">
                Order
              </span>

              <strong>
                {Number(selectedVideo.order || 0)}
              </strong>
            </div>

            <div className="video-detail-card">
              <span className="video-detail-card__label">
                Featured
              </span>

              <strong>
                {selectedVideo.featured ? "Yes" : "No"}
              </strong>
            </div>

            <div className="video-detail-card">
              <span className="video-detail-card__label">
                Priority
              </span>

              <strong>
                {selectedVideo.displaySettings?.priority ||
                  "normal"}
              </strong>
            </div>

          </div>

          {/* ==================================================
              DESCRIPTION
          ================================================== */}

          <div className="video-modal__desc">
            <div className="video-modal__desc-head">
              <h4>Description</h4>
            </div>

            <p>
              {selectedVideo.description ||
                "No description yet."}
            </p>
          </div>

          {/* ==================================================
              VISIBILITY
          ================================================== */}

          <div className="video-settings-section">
            <div className="video-settings-section__head">
              <div>
                <span className="section-label">
                  Visibility
                </span>

                <h4>Website Pages</h4>
              </div>
            </div>

            <div className="visibility-summary">
              {Object.entries(
                selectedVideo.pageVisibility || {}
              )
                .filter(([, enabled]) => enabled)
                .map(([page]) => (
                  <Badge key={page} tone="neutral">
                    {page}
                  </Badge>
                ))}

              {!Object.values(
                selectedVideo.pageVisibility || {}
              ).some(Boolean) && (
                <span className="muted">
                  Not visible on any page
                </span>
              )}
            </div>
          </div>

          {/* ==================================================
              DISPLAY SETTINGS
          ================================================== */}

          <div className="video-settings-section">
            <div className="video-settings-section__head">
              <div>
                <span className="section-label">
                  Playback
                </span>

                <h4>Display Settings</h4>
              </div>
            </div>

            <div className="settings-summary">
              <Badge tone="neutral">
                Autoplay:{" "}
                {selectedVideo.displaySettings?.autoplay
                  ? "On"
                  : "Off"}
              </Badge>

              <Badge tone="neutral">
                Muted:{" "}
                {selectedVideo.displaySettings?.muted
                  ? "On"
                  : "Off"}
              </Badge>

              <Badge tone="neutral">
                Loop:{" "}
                {selectedVideo.displaySettings?.loop
                  ? "On"
                  : "Off"}
              </Badge>

              <Badge tone="neutral">
                Priority:{" "}
                {selectedVideo.displaySettings?.priority ||
                  "normal"}
              </Badge>
            </div>
          </div>

          {/* ==================================================
              EDIT BUTTON
          ================================================== */}

          <div className="video-modal__footer-actions">
            <button
              type="button"
              className="btn-solid"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 size={14} />
              Edit Video
            </button>
          </div>
        </>
      ) : (
        <>
          {/* ==================================================
              EDITOR
          ================================================== */}

          <div className="video-editor">

            {/* BASIC INFORMATION */}

            <section className="video-editor__section">
              <div className="video-editor__section-head">
                <span className="section-label">
                  Content
                </span>

                <h4>Basic Information</h4>
              </div>

              <div className="video-editor__grid">

                <label className="admin-field admin-field--full">
                  <span>Title</span>

                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Video title"
                  />
                </label>

                <label className="admin-field">
                  <span>Category</span>

                  <select
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                  >
                    <option value="">
                      Select category
                    </option>

                    {CATEGORIES.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="admin-field">
                  <span>Status</span>

                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                  >
                    <option value="active">
                      Active
                    </option>

                    <option value="draft">
                      Draft
                    </option>

                    <option value="archived">
                      Archived
                    </option>
                  </select>
                </label>

                <label className="admin-field admin-field--full">
                  <span>Description</span>

                  <textarea
                    rows={5}
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Describe this video..."
                  />
                </label>

              </div>
            </section>

            {/* WEBSITE PLACEMENT */}

            <section className="video-editor__section">

              <div className="video-editor__section-head">
                <span className="section-label">
                  Placement
                </span>

                <h4>Where should this video appear?</h4>
              </div>

              <div className="video-editor__grid">

                <label className="admin-field">
                  <span>Website Section</span>

                  <select
                    value={editForm.websiteSection}
                    onChange={(e) => {
                      const section = e.target.value;

                      setEditForm((prev) => ({
                        ...prev,
                        websiteSection: section,
                        displayPosition: "",
                      }));
                    }}
                  >
                    <option value="">
                      Select section
                    </option>

                    {WEBSITE_SECTIONS.map((section) => (
                      <option
                        key={section.id}
                        value={section.id}
                      >
                        {section.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="admin-field">
                  <span>Display Position</span>

                  <select
                    value={editForm.displayPosition}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        displayPosition: e.target.value,
                      }))
                    }
                    disabled={!editForm.websiteSection}
                  >
                    <option value="">
                      Select position
                    </option>

                    {getSectionPositions(
                      editForm.websiteSection
                    ).map((position) => (
                      <option
                        key={position.id}
                        value={position.id}
                      >
                        {position.label}
                      </option>
                    ))}
                  </select>
                </label>

              </div>
            </section>

            {/* PAGE VISIBILITY */}

            <section className="video-editor__section">

              <div className="video-editor__section-head">
                <span className="section-label">
                  Visibility
                </span>

                <h4>Show On Pages</h4>
              </div>

              <div className="checkbox-grid">

                {[
                  ["home", "Home"],
                  ["services", "Services"],
                  ["work", "Work"],
                  ["about", "About"],
                  ["insights", "Insights"],
                  ["contact", "Contact"],
                ].map(([key, label]) => (
                  <label
                    key={key}
                    className="admin-checkbox"
                  >
                    <input
                      type="checkbox"
                      checked={
                        Boolean(
                          editForm.pageVisibility[key]
                        )
                      }
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          pageVisibility: {
                            ...prev.pageVisibility,
                            [key]: e.target.checked,
                          },
                        }))
                      }
                    />

                    <span className="admin-checkbox__box">
                      <Check size={12} />
                    </span>

                    <span>{label}</span>
                  </label>
                ))}

              </div>
            </section>

            {/* PLAYBACK */}

            <section className="video-editor__section">

              <div className="video-editor__section-head">
                <span className="section-label">
                  Playback
                </span>

                <h4>Display Settings</h4>
              </div>

              <div className="checkbox-grid">

                {[
                  ["autoplay", "Autoplay"],
                  ["muted", "Muted"],
                  ["loop", "Loop"],
                ].map(([key, label]) => (
                  <label
                    key={key}
                    className="admin-checkbox"
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(
                        editForm.displaySettings[key]
                      )}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          displaySettings: {
                            ...prev.displaySettings,
                            [key]:
                              e.target.checked,
                          },
                        }))
                      }
                    />

                    <span className="admin-checkbox__box">
                      <Check size={12} />
                    </span>

                    <span>{label}</span>
                  </label>
                ))}

              </div>

              <div className="video-editor__grid">

                <label className="admin-field">
                  <span>Priority</span>

                  <select
                    value={
                      editForm.displaySettings.priority ||
                      "normal"
                    }
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        displaySettings: {
                          ...prev.displaySettings,
                          priority: e.target.value,
                        },
                      }))
                    }
                  >
                    <option value="low">
                      Low
                    </option>

                    <option value="normal">
                      Normal
                    </option>

                    <option value="high">
                      High
                    </option>
                  </select>
                </label>

                <label className="admin-field">
                  <span>Display Order</span>

                  <input
                    type="number"
                    min="0"
                    value={editForm.order}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        order: e.target.value,
                      }))
                    }
                  />
                </label>

              </div>
            </section>

            {/* FEATURED */}

            <section className="video-editor__section">

              <div className="video-editor__section-head">
                <span className="section-label">
                  Curation
                </span>

                <h4>Featured Content</h4>
              </div>

              <label className="admin-checkbox">
                <input
                  type="checkbox"
                  checked={editForm.featured}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      featured: e.target.checked,
                    }))
                  }
                />

                <span className="admin-checkbox__box">
                  <Check size={12} />
                </span>

                <span>
                  Feature this video on the website
                </span>
              </label>
            </section>

            {/* TAGS */}

            <section className="video-editor__section">

              <div className="video-editor__section-head">
                <span className="section-label">
                  Organization
                </span>

                <h4>Tags</h4>
              </div>

              <label className="admin-field admin-field--full">

                <span>
                  Tags{" "}
                  <small>
                    Separate with commas
                  </small>
                </span>

                <input
                  type="text"
                  value={editForm.tags.join(", ")}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      tags: e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean),
                    }))
                  }
                  placeholder="commercial, brand, campaign"
                />

              </label>

            </section>

            {/* TECHNICAL INFORMATION */}

            <section className="video-editor__section">

              <div className="video-editor__section-head">
                <span className="section-label">
                  Asset
                </span>

                <h4>Technical Information</h4>
              </div>

              <div className="technical-grid">

                <div>
                  <span>Platform</span>
                  <strong>
                    {selectedVideo.platform || "—"}
                  </strong>
                </div>

                <div>
                  <span>Resolution</span>
                  <strong>
                    {selectedVideo.resolution || "—"}
                  </strong>
                </div>

                <div>
                  <span>Duration</span>
                  <strong>
                    {formatDuration(
                      selectedVideo.duration
                    )}
                  </strong>
                </div>

                <div>
                  <span>File Size</span>
                  <strong>
                    {selectedVideo.size
                      ? `${selectedVideo.size} MB`
                      : "—"}
                  </strong>
                </div>

                <div>
                  <span>Resource ID</span>
                  <strong className="mono">
                    {selectedVideo.resourceId || "—"}
                  </strong>
                </div>

                <div>
                  <span>Uploader</span>
                  <strong>
                    {selectedVideo.uploaderId || "—"}
                  </strong>
                </div>

              </div>
            </section>

            {/* ACTIONS */}

            <div className="video-editor__actions">

              <button
                type="button"
                className="btn-outline"
                disabled={isSaving}
                onClick={() => {
                  openVideo(selectedVideo);
                }}
              >
                <X size={14} />
                Cancel
              </button>

              <button
                type="button"
                className="btn-solid"
                disabled={isSaving}
                onClick={handleSaveVideo}
              >
                <Save size={14} />

                {isSaving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </div>
        </>
      )}
    </div>
  )}
 </Modal>

      </div>

    </main>

  </div>
);