// src/components/admin/AdminNavigation.jsx

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UploadCloud,
  Video,
} from "lucide-react";

export default function AdminNavigation() {
  return (
    <header className="admin-nav">
      <div className="admin-nav__inner">

        <div className="admin-nav__brand">
          <span className="admin-nav__brand-mark">BIG DAY</span>
          <span className="admin-nav__brand-label">Admin</span>
        </div>

        <nav className="admin-nav__links" aria-label="Admin navigation">

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `admin-nav__link ${isActive ? "is-active" : ""}`
            }
          >
            <LayoutDashboard size={15} />
            <span>Overview</span>
          </NavLink>

          <NavLink
            to="/admin-upload"
            className={({ isActive }) =>
              `admin-nav__link ${isActive ? "is-active" : ""}`
            }
          >
            <UploadCloud size={15} />
            <span>Upload Media</span>
          </NavLink>

          <NavLink
            to="/admin-videos"
            className={({ isActive }) =>
              `admin-nav__link ${isActive ? "is-active" : ""}`
            }
          >
            <Video size={15} />
            <span>Video Library</span>
          </NavLink>

        </nav>

      </div>
    </header>
  );
}