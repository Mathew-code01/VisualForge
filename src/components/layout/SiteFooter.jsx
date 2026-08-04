

// src/components/layout/SiteFooter.jsx
// src/components/layout/SiteFooter.jsx

import { NavLink } from "react-router-dom";
import {
  FiArrowUpRight,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiArrowUp,
  FiPlay,
  FiCpu,
  FiLayers,
  FiAperture,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import "../../styles/components/siteFooter.css";

const companyLinks = [
  { label: "Home", path: "/" },
  { label: "Work", path: "/work" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const capabilityLinks = [
  { label: "Strategy", path: "/services/strategy" },
  { label: "Brand Identity", path: "/services/brand-identity" },
  { label: "Communication", path: "/services/communication" },
  { label: "Digital Experiences", path: "/services/digital-experiences" },
];

const socialLinks = [
  { label: "Instagram", href: "#", icon: <FiInstagram /> },
  { label: "X / Twitter", href: "#", icon: <FiTwitter /> },
  { label: "LinkedIn", href: "#", icon: <FiLinkedin /> },
];

const disciplines = [
  { number: "01", title: "Strategy", icon: <FiAperture /> },
  { number: "02", title: "Creative", icon: <FiPlay /> },
  { number: "03", title: "AI Systems", icon: <FiCpu /> },
  { number: "04", title: "Digital", icon: <FiLayers /> },
];

function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const developerWhatsapp =
    "https://wa.me/2349065692168?text=Hello%20Mathew,%20I%20saw%20your%20work%20on%20BigDay%20and%20would%20like%20to%20discuss%20a%20project.";

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bd-footer theme-dark noise" data-theme="dark">
      <div className="bd-footer-shell">
        {/* ================================================
            SECTION 1 — LARGE BRAND STATEMENT
        ================================================ */}

        <section className="bd-footer-hero">
          <NavLink to="/" className="bd-footer-brand">
            <span className="bd-footer-brand-mark">
              <span>B</span>
              <span>D</span>
            </span>
            <span className="bd-footer-brand-name">
              Big Day<span>.</span>
            </span>
          </NavLink>

          <h2 className="bd-footer-hero__statement">
            Turning complex ideas into
            <span className="gradient-text"> clear digital experiences.</span>
          </h2>
        </section>

        {/* ================================================
            SECTION 2 — FOUR COLUMNS
        ================================================ */}

        <div className="bd-footer-main">
          <div className="bd-footer-column bd-footer-status-column">
            <span className="eyebrow">Studio Status</span>
            <div className="bd-footer-status">
              <span className="bd-footer-status-dot" />
              <span>Available for selected projects</span>
            </div>
          </div>

          <nav className="bd-footer-column" aria-label="Company">
            <h3>Company</h3>
            <ul>
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <NavLink to={item.path}>
                    <span>{item.label}</span>
                    <FiArrowUpRight />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="bd-footer-column" aria-label="Capabilities">
            <h3>Capabilities</h3>
            <ul>
              {capabilityLinks.map((item) => (
                <li key={item.label}>
                  <NavLink to={item.path}>
                    <span>{item.label}</span>
                    <FiArrowUpRight />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="bd-footer-column bd-footer-connect">
            <h3>Connect</h3>

            <a href="mailto:hello@bigday.com" className="bd-footer-email">
              <FiMail />
              <span>hello@bigday.com</span>
            </a>

            <a
              href={developerWhatsapp}
              target="_blank"
              rel="noreferrer"
              className="bd-footer-whatsapp"
            >
              <FaWhatsapp />
              <span>Talk on WhatsApp</span>
              <FiArrowUpRight />
            </a>

            <div className="bd-footer-socials">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================
            DISCIPLINES STRIP
        ================================================ */}

        <div className="bd-footer-disciplines">
          {disciplines.map((discipline) => (
            <div className="bd-footer-discipline" key={discipline.number}>
              <span className="bd-footer-discipline-number mono">{discipline.number}</span>
              <span className="bd-footer-discipline-icon">{discipline.icon}</span>
              <span className="bd-footer-discipline-title">{discipline.title}</span>
              <FiArrowUpRight className="bd-footer-discipline-arrow" />
            </div>
          ))}
        </div>

        {/* ================================================
            SECTION 3 — LARGE CREATIVE STATEMENT
        ================================================ */}

        <section className="bd-footer-statement">
          <span className="gradient-line" />
          <p>
            Ideas become powerful
            <br />
            when people understand them.
          </p>
        </section>

        {/* ================================================
            SECTION 4 — BOTTOM BAR
        ================================================ */}

        <div className="bd-footer-bottom">
          <div className="bd-footer-legal">
            <span>© {currentYear} Big Day.</span>
            <span className="bd-footer-legal-dot">•</span>
            <span>All rights reserved.</span>
          </div>

          <div className="bd-footer-credit">
            <span>Built by</span>
            <a href={developerWhatsapp} target="_blank" rel="noreferrer">
              Mathew Oloyede
              <FiArrowUpRight />
            </a>
          </div>

          <button type="button" className="bd-footer-top" onClick={scrollToTop} aria-label="Back to top">
            <span>Back to top</span>
            <span className="bd-footer-top-icon">
              <FiArrowUp />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;