
// src/components/Header.jsx

import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/components/header.css";

const navigationItems = [
  {
    name: "Work",
    path: "/work",
  },
  {
    name: "Capabilities",
    path: "/services",
  },
  {
    name: "AI Agents",
    path: "/agents",
    featured: true,
  },
  {
    name: "Studio",
    path: "/about",
  },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  /* =========================================================
     SCROLL + RESIZE
     ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  /* =========================================================
     ROUTE CHANGE
     ========================================================= */

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);


  /* =========================================================
     BODY SCROLL LOCK
     ========================================================= */

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("nav-menu-open");
    } else {
      document.body.classList.remove("nav-menu-open");
    }

    return () => {
      document.body.classList.remove("nav-menu-open");
    };
  }, [menuOpen]);


  /* =========================================================
     ESCAPE KEY
     ========================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);


  /* =========================================================
     MENU TOGGLE
     ========================================================= */

  const toggleMenu = () => {
    setMenuOpen((current) => !current);
  };


  /* =========================================================
     CLOSE MENU
     ========================================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  return (
    <header
      className={[
        "main-header",
        scrolled ? "is-scrolled" : "",
        menuOpen ? "menu-active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="header-shell">
        <div className="header-container">

          {/* =================================================
              BRAND
              ================================================= */}

          <NavLink
            to="/"
            className="brand"
            aria-label="Bigday home"
            onClick={closeMenu}
          >
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark-letter">B</span>
              <span className="brand-mark-dot"></span>
            </span>

            <span className="brand-wordmark">
              BIGDAY
            </span>
          </NavLink>


          {/* =================================================
              DESKTOP NAVIGATION
              ================================================= */}

          <nav
            className="desktop-nav"
            aria-label="Primary navigation"
          >
            <ul className="nav-list">
              {navigationItems.map((item) => (
                <li key={item.name} className="nav-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      [
                        "nav-link",
                        item.featured ? "nav-link-featured" : "",
                        isActive ? "active" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")
                    }
                  >
                    <span className="nav-link-label">
                      {item.name}
                    </span>

                    {item.featured && (
                      <span className="nav-new-badge">
                        New
                      </span>
                    )}

                    <span
                      className="nav-link-indicator"
                      aria-hidden="true"
                    />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>


          {/* =================================================
              DESKTOP ACTIONS
              ================================================= */}

          <div className="header-actions">

            <NavLink
              to="/contact"
              className="header-contact-link"
            >
              Let's talk
            </NavLink>

            <NavLink
              to="/contact"
              className="header-cta"
            >
              <span>Start a project</span>

              <span
                className="header-cta-arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </NavLink>

            {/* Mobile menu button */}
            <button
              type="button"
              className={`menu-toggle ${
                menuOpen ? "is-open" : ""
              }`}
              onClick={toggleMenu}
              aria-label={
                menuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <span className="menu-toggle-lines">
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </div>


      {/* =====================================================
          MOBILE NAVIGATION
          ===================================================== */}

      <div
        id="mobile-navigation"
        className={`mobile-menu ${
          menuOpen ? "is-open" : ""
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-inner">

          {/* Mobile intro */}
          <div className="mobile-menu-intro">
            <span className="mobile-menu-kicker">
              BIGDAY
            </span>

            <p>
              Creative systems, digital experiences
              and intelligent technology.
            </p>
          </div>


          {/* Mobile links */}
          <nav
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            <ul className="mobile-nav-list">
              {navigationItems.map((item, index) => (
                <li
                  key={item.name}
                  className="mobile-nav-item"
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      [
                        "mobile-nav-link",
                        item.featured
                          ? "mobile-nav-link-featured"
                          : "",
                        isActive ? "active" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")
                    }
                    onClick={closeMenu}
                  >
                    <span className="mobile-nav-index">
                      0{index + 1}
                    </span>

                    <span className="mobile-nav-name">
                      {item.name}
                    </span>

                    <span
                      className="mobile-nav-arrow"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>


          {/* Mobile CTA */}
          <div className="mobile-menu-footer">

            <NavLink
              to="/contact"
              className="mobile-cta"
              onClick={closeMenu}
            >
              <span>
                Start a project
              </span>

              <span
                className="mobile-cta-arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </NavLink>

            <div className="mobile-meta">
              <span>
                Creative × Technology
              </span>

              <span>
                © {new Date().getFullYear()} Bigday
              </span>
            </div>
          </div>
        </div>
      </div>


      {/* =====================================================
          MOBILE BACKDROP
          ===================================================== */}

      <button
        type="button"
        className={`mobile-backdrop ${
          menuOpen ? "is-visible" : ""
        }`}
        onClick={closeMenu}
        aria-label="Close navigation menu"
        tabIndex={menuOpen ? 0 : -1}
      />
    </header>
  );
}

export default Header;