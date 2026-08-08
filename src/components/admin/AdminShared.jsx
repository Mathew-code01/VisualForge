// src/components/admin/AdminShared.jsx

// src/components/admin/AdminShared.jsx

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, Inbox } from "lucide-react";

/* ============================================================
   SHARED CONSTANTS
============================================================ */

export const CATEGORIES = [
  "Video Editing",
  "Corporate",
  "Commercial",
  "Motivational",
  "Sports",
  "Social Media Content",
  "Promotional Video",
];

export const WEBSITE_SECTIONS = [
  {
    id: "home",
    label: "Home",
    positions: [
      { id: "hero", label: "Hero" },
      { id: "featured", label: "Featured" },
    ],
  },
  {
    id: "services",
    label: "Services",
    positions: [
      { id: "hero", label: "Hero" },
      { id: "featured", label: "Featured" },
    ],
  },
  {
    id: "work",
    label: "Work",
    positions: [
      { id: "hero", label: "Hero" },
      { id: "featured", label: "Featured" },
    ],
  },
  {
    id: "about",
    label: "About",
    positions: [
      { id: "hero", label: "Hero" },
      { id: "featured", label: "Featured" },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    positions: [
      { id: "hero", label: "Hero" },
      { id: "featured", label: "Featured" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    positions: [
      { id: "hero", label: "Hero" },
      { id: "featured", label: "Featured" },
    ],
  },
];

export function getSectionPositions(sectionId) {
  const section = WEBSITE_SECTIONS.find(
    (item) => item.id === sectionId
  );

  return section?.positions || [];
}

/* ============================================================
   HELPERS
============================================================ */

export function formatDuration(seconds) {
  const s = Math.round(Number(seconds) || 0);
  const mins = Math.floor(s / 60);
  const secs = String(s % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

export function formatBytes(mb) {
  if (!mb) return "0 MB";
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
  return `${mb} MB`;
}

/* ============================================================
   SECTION HEADER — reused by both admin pages
============================================================ */

export function SectionHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <header className="admin-section-header">
      <div>
        {eyebrow && <span className="section-label">{eyebrow}</span>}
        <h2 className="elegant-title">{title}</h2>
        {subtitle && <p className="admin-section-header__sub">{subtitle}</p>}
      </div>

      {actions && <div className="admin-section-header__actions">{actions}</div>}
    </header>
  );
}

/* ============================================================
   BADGE / STATUS PILL
============================================================ */

export function Badge({ tone = "neutral", children, icon: Icon }) {
  return (
    <span className={`admin-badge admin-badge--${tone}`}>
      {Icon && <Icon size={12} aria-hidden="true" />}
      {children}
    </span>
  );
}

/* ============================================================
   LOADING STATE
============================================================ */

export function LoadingState({ label = "Loading…" }) {
  return (
    <div className="admin-loading-state">
      <Loader2 size={22} className="spin" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

export function EmptyState({ title = "Nothing here yet", text, icon: Icon = Inbox }) {
  return (
    <div className="admin-empty-state">
      <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
      <strong>{title}</strong>
      {text && <p>{text}</p>}
    </div>
  );
}

/* ============================================================
   MODAL WRAPPER — centered on desktop, full-screen on mobile
============================================================ */

export function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div
        className="admin-modal glass"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal__head">
          <h3>{title}</h3>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="admin-modal__body">{children}</div>

        {footer && <div className="admin-modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}

/* ============================================================
   STORAGE METER
============================================================ */

export function StorageMeter({ label, used, percent, badge }) {
  return (
    <div className="storage-meter glass">
      <div className="storage-meter__head">
        <h4>{label}</h4>
        {badge && <span className="storage-meter__badge">{badge}</span>}
      </div>

      <div className="storage-meter__value">
        <strong>{used}</strong>
        <span>used</span>
      </div>

      <div className="storage-meter__bar">
        <div className="storage-meter__fill" style={{ width: `${Math.min(percent || 0, 100)}%` }} />
      </div>
    </div>
  );
}