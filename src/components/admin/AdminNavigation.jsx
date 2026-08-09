// src/components/admin/AdminNavigation.jsx

// src/components/admin/AdminNavigation.jsx

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UploadCloud,
  Video,
  LogOut,
} from "lucide-react";

export default function AdminNavigation() {
  return (
    <aside className="admin-nav" aria-label="Admin navigation">
      <div className="admin-nav__inner">

        {/* BRAND */}
        <div className="admin-nav__brand">
          <span className="admin-nav__brand-mark">BIG DAY</span>
          <span className="admin-nav__brand-label">Admin</span>
        </div>

        {/* NAVIGATION */}
        <nav className="admin-nav__links">

          <NavLink
            to="/admin-upload"
            end
            className={({ isActive }) =>
              `admin-nav__link ${isActive ? "is-active" : ""}`
            }
          >
            <LayoutDashboard size={17} />
            <span>Overview</span>
          </NavLink>

          <NavLink
            to="/admin-upload"
            className={({ isActive }) =>
              `admin-nav__link ${isActive ? "is-active" : ""}`
            }
          >
            <UploadCloud size={17} />
            <span>Upload Media</span>
          </NavLink>

          <NavLink
            to="/admin-videos"
            className={({ isActive }) =>
              `admin-nav__link ${isActive ? "is-active" : ""}`
            }
          >
            <Video size={17} />
            <span>Video Library</span>
          </NavLink>

        </nav>

        {/* OPTIONAL FOOTER AREA */}
        <div className="admin-nav__footer">
          <span className="admin-nav__status">
            <span className="admin-nav__status-dot" />
            Admin workspace
          </span>
        </div>

      </div>
    </aside>
  );
}