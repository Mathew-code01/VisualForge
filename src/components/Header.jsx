// src/components/Header.jsx
// src/components/Header.jsx
// src/components/Header.jsx
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/components/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // 1. Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Auto-Close Menu on Screen Resize (Fixes the "Stuck" menu issue)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && menuOpen) {
        setMenuOpen(false);
        document.body.style.overflow = "unset";
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  // 3. Reset menu on page navigation
  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = "unset";
  }, [location]);

  const toggleMenu = () => {
    const newState = !menuOpen;
    setMenuOpen(newState);
    document.body.style.overflow = newState ? "hidden" : "unset";
  };

  return (
    <header
      className={`main-header ${scrolled ? "is-scrolled" : ""} ${
        menuOpen ? "menu-active" : ""
      }`}
    >
      <div className="header-container">
        {/* Left: Logo */}
        <NavLink to="/" className="logo-box" onClick={() => setMenuOpen(false)}>
          <div className="logo-visual">
            <span className="logo-dot"></span>
            <div className="logo-line"></div>
          </div>
          <h2 className="logo-text">BigDay-Media</h2>
        </NavLink>

        {/* Center: Desktop Navigation - Always Horizontal on Top */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {["Home", "Work", "About"].map((item) => (
              <li key={item}>
                <NavLink
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="nav-link"
                >
                  <span className="link-text">{item}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: CTA + Mobile Toggle */}
        <div className="header-actions">
          <NavLink to="/contact" className="cta-btn-header">
            Let's Talk
          </NavLink>

          <button
            className={`nav-toggle ${menuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
        </div>

        {/* Fullscreen Drawer (The part that shows your background image) */}
        <nav className={`nav-menu ${menuOpen ? "is-open" : ""}`}>
          <div className="menu-bg-image"></div>
          <div className="menu-overlay"></div>
          <div className="menu-grain"></div>

          <div className="menu-content">
            <ul className="mobile-nav-list">
              {["Home", "Work", "About", "Contact"].map((item, idx) => (
                <li key={item} style={{ "--idx": idx }}>
                  <NavLink
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="mobile-link"
                  >
                    <span className="m-num">0{idx + 1}</span>
                    <span className="m-text">{item}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="menu-footer">
              <p>© 2025 BigDay-Media Studio</p>
              <div className="social-mini">TW / IG / BE</div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;