// src\components\layout\SiteFooter.jsx


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
  { label: "About BigDay", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const capabilityLinks = [
  { label: "Strategy", path: "/services/strategy" },
  { label: "Brand Identity", path: "/services/brand-identity" },
  { label: "Communication", path: "/services/communication" },
  { label: "Digital Experiences", path: "/services/digital-experiences" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: <FiInstagram />,
  },
  {
    label: "X / Twitter",
    href: "#",
    icon: <FiTwitter />,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: <FiLinkedin />,
  },
];

const disciplines = [
  {
    number: "01",
    title: "Strategy",
    icon: <FiAperture />,
  },
  {
    number: "02",
    title: "Creative",
    icon: <FiPlay />,
  },
  {
    number: "03",
    title: "AI Systems",
    icon: <FiCpu />,
  },
  {
    number: "04",
    title: "Digital",
    icon: <FiLayers />,
  },
];

function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const developerWhatsapp =
    "https://wa.me/2349065692168?text=Hello%20Mathew,%20I%20saw%20your%20work%20on%20BigDay%20and%20would%20like%20to%20discuss%20a%20project.";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bd-footer section-dark grain">
      <div className="bd-footer-shell">

       

        {/* =====================================================
            FOOTER IDENTITY
        ====================================================== */}

        <section className="bd-footer-identity">
          <div className="bd-footer-identity-main">
            <NavLink to="/" className="bd-footer-brand">
              <span className="bd-footer-brand-mark">
                <span>B</span>
                <span>D</span>
              </span>

              <span className="bd-footer-brand-name">
                BigDay<span>.</span>
              </span>
            </NavLink>

            <p className="bd-footer-identity-statement">
              Strategy, design, communication, and technology for ambitious
              ideas that deserve to be understood.
            </p>
          </div>

          <div className="bd-footer-identity-meta">
            <span className="bd-footer-meta-line" />

            <span>
              Creative technology
              <br />
              &amp; communication studio
            </span>
          </div>
        </section>

        {/* =====================================================
            MAIN NAVIGATION
        ====================================================== */}

        <div className="bd-footer-main">

          {/* Brand / introduction */}
          <div className="bd-footer-brand-column">
            <div className="bd-footer-column-index">
              <span>00</span>
              <span>BigDay</span>
            </div>

            <p className="bd-footer-brand-description">
              We make complex ideas clear through strategy, brand identity,
              communication, digital experiences, and emerging technology.
            </p>

            <div className="bd-footer-status">
              <span className="bd-footer-status-dot" />

              <span>
                Open for selected projects
              </span>
            </div>
          </div>

          {/* Company */}
          <nav className="bd-footer-column" aria-label="Company">
            <div className="bd-footer-column-heading">
              <span>01</span>
              <h3>Company</h3>
            </div>

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

          {/* Capabilities */}
          <nav className="bd-footer-column" aria-label="Capabilities">
            <div className="bd-footer-column-heading">
              <span>02</span>
              <h3>Capabilities</h3>
            </div>

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

          {/* Connect */}
          <div className="bd-footer-column bd-footer-connect">
            <div className="bd-footer-column-heading">
              <span>03</span>
              <h3>Connect</h3>
            </div>

            <a
              href="mailto:hello@bigday.com"
              className="bd-footer-email"
            >
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

        {/* =====================================================
            DISCIPLINES
        ====================================================== */}

        <section className="bd-footer-disciplines">
          <div className="bd-footer-disciplines-heading">
            <div className="bd-footer-column-heading">
              <span>04</span>
              <h3>How we create clarity</h3>
            </div>

            <p>
              Different disciplines. One goal:
              <strong> make ideas easier to understand.</strong>
            </p>
          </div>

          <div className="bd-footer-disciplines-grid">
            {disciplines.map((discipline) => (
              <div
                className="bd-footer-discipline"
                key={discipline.number}
              >
                <span className="bd-footer-discipline-number">
                  {discipline.number}
                </span>

                <span className="bd-footer-discipline-icon">
                  {discipline.icon}
                </span>

                <span className="bd-footer-discipline-title">
                  {discipline.title}
                </span>

                <FiArrowUpRight className="bd-footer-discipline-arrow" />
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            LARGE BRAND STATEMENT
        ====================================================== */}

        <section className="bd-footer-statement">
          <span className="bd-footer-statement-line" />

          <p>
            The best ideas deserve
            <span> to be understood.</span>
          </p>
        </section>

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}

        <div className="bd-footer-bottom">
          <div className="bd-footer-legal">
            <span>© {currentYear} BigDay.</span>

            <span className="bd-footer-legal-dot">•</span>

            <span>All rights reserved.</span>
          </div>

          <div className="bd-footer-credit">
            <span>Built with collaboration by</span>

            <a
              href={developerWhatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Mathew Oloyede
              <FiArrowUpRight />
            </a>
          </div>

          <button
            type="button"
            className="bd-footer-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
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
