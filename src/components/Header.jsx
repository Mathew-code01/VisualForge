// src/components/Header.jsx
// src/components/Header.jsx
// src/components/Header.jsx
// src/components/Header.jsx
// src/components/Header.jsx
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/components/header.css";

// Refined for a high-end "Work Display" aesthetic
const navigationItems = [
  { name: "Index", path: "/" },
  { name: "Archive", path: "/work" },
  { name: "Studio", path: "/about" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => { if (window.innerWidth > 1024) setMenuOpen(false); };

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
    <header className={`main-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-active" : ""}`}>
      <div className="header-container">
        <NavLink to="/" className="logo-box">
          <div className="logo-symbol">B<span>D</span></div>
          <div className="logo-text-wrapper">
            <span className="logo-brand">BigDay</span>
            {/* Reduced to 'Media' for a cleaner, ultra-minimalist look */}
            <span className="logo-suffix">Media</span>
          </div>
        </NavLink>

        <nav className="desktop-nav">
          <ul className="nav-list">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <NavLink to={item.path} className="nav-link">
                  <span className="link-text">{item.name}</span>
                  <span className="link-dot"></span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          {/* Punchier CTA for the minimalist aesthetic */}
          <NavLink to="/contact" className="cta-button">Booking</NavLink>
          
          <button className={`burger-btn ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <div className="burger-line line-top"></div>
            <div className="burger-line line-bottom"></div>
          </button>
        </div>
      </div>

      <div className={`mobile-drawer ${menuOpen ? "show" : ""}`}>
        <nav className="mobile-nav-content">
          {navigationItems.map((item) => (
            <NavLink key={item.name} to={item.path} className="m-link">
              <span className="m-text">{item.name}</span>
            </NavLink>
          ))}
          <NavLink to="/contact" className="m-link m-cta">Start a Project</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;