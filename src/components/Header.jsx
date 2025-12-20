// src/components/Header.jsx
// src/components/Header.jsx
// src/components/Header.jsx
import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/components/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  return (
    <header
      className={`header-wrapper ${scrolled ? "is-scrolled" : ""} ${
        menuOpen ? "menu-active" : ""
      }`}
    >
      <div className="header-container" ref={navRef}>
        {/* Left Side: Logo */}
        <NavLink to="/" className="logo-box" onClick={() => setMenuOpen(false)}>
          <div className="logo-visual">
            <span className="logo-dot"></span>
            <div className="logo-line"></div>
          </div>
          <h2 className="logo-text">VisualForge</h2>
        </NavLink>

        {/* Center: Desktop Nav */}
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

        {/* Right Side: CTA + Toggle */}
        <div className="header-actions">
          <NavLink to="/contact" className="cta-btn-header">
            Let's Talk
          </NavLink>

          <button
            className={`nav-toggle ${menuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
        </div>

        {/* Mobile Fullscreen Drawer */}
        <nav className={`nav-menu ${menuOpen ? "is-open" : ""}`}>
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
              <p>© 2025 VisualForge Studio</p>
              <div className="social-mini">TW / IG / BE</div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;