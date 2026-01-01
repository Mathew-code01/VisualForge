// src/components/Header.jsx
// src/components/Header.jsx
// src/components/Header.jsx
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/components/header.css";

const navigationItems = [
  { name: "Discovery", path: "/", color: "#2b75ff" },
  {
    name: "Our Work",
    path: "/work",
    color: "#164bb2",
  },
  {
    name: "Agency",
    path: "/about",
    color: "#08008d",
  },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    // FIX: Auto-close menu if user expands the window to desktop size
    const handleResize = () => {
      if (window.innerWidth > 1024) setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = "unset";
  }, [location]);

  return (
    <header
      className={`main-header ${scrolled ? "is-scrolled" : ""} ${
        menuOpen ? "menu-active" : ""
      }`}
    >
      <div className="header-container">
        <NavLink to="/" className="logo-box">
          <div className="logo-symbol">
            B<span>D</span>
          </div>
          <div className="logo-text-wrapper">
            <span className="logo-brand">BigDay</span>
            <span className="logo-suffix">Media Agency</span>
          </div>
        </NavLink>

        <nav className="desktop-nav">
          <ul className="nav-list">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className="nav-link"
                  style={({ isActive }) => ({
                    "--hover-color": item.color,
                    color: isActive ? item.color : "inherit",
                  })}
                >
                  <span className="link-text">{item.name}</span>
                  <span
                    className="link-dot"
                    style={{ backgroundColor: item.color }}
                  ></span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <NavLink to="/contact" className="cta-button">
            Launch Project
          </NavLink>
          <button
            className={`burger-btn ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="burger-line line-top"></div>
            <div className="burger-line line-bottom"></div>
          </button>
        </div>
      </div>

      <div className={`mobile-drawer ${menuOpen ? "show" : ""}`}>
        <nav className="mobile-nav-content">
          {navigationItems.map((item, idx) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="m-link"
              style={{ "--idx": idx, "--m-color": item.color }}
            >
              <span className="m-num">0{idx + 1}</span>
              <span className="m-text">{item.name}</span>
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="m-link m-cta"
            style={{ "--idx": 3 }}
          >
            Contact Us
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;