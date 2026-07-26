
// src/components/Footer.jsx
// src/components/Footer.jsx

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

import "../styles/components/footer.css";

const companyLinks = [
  { label: "Home", path: "/" },
  { label: "Work", path: "/work" },
  { label: "About BigDay", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const capabilityLinks = [
  { label: "Creative Production", path: "/work" },
  { label: "Video & Motion", path: "/work" },
  { label: "AI & Automation", path: "/work" },
  { label: "Digital Experiences", path: "/work" },
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

function Footer() {
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
    <footer className="bd-footer">
      <div className="bd-footer-shell">
        {/* =====================================================
            FOOTER CTA
        ====================================================== */}

        <section className="bd-footer-cta">
          <div className="bd-footer-cta-glow" />

          <div className="bd-footer-cta-content">
            <div className="bd-footer-eyebrow">
              <span className="bd-footer-eyebrow-dot" />
              <span>Have a project in mind?</span>
            </div>

            <h2 className="bd-footer-cta-title">
              Let's build something
              <span> worth remembering.</span>
            </h2>

            <p className="bd-footer-cta-description">
              From creative production to digital experiences and intelligent
              systems, BigDay brings ideas, people, and technology together.
            </p>

            <NavLink to="/contact" className="bd-footer-cta-button">
              <span>Start a conversation</span>

              <span className="bd-footer-cta-icon">
                <FiArrowUpRight />
              </span>
            </NavLink>
          </div>

          {/* Decorative visual */}
          <div className="bd-footer-cta-visual" aria-hidden="true">
            <div className="bd-footer-orbit bd-footer-orbit-one">
              <span />
            </div>

            <div className="bd-footer-orbit bd-footer-orbit-two">
              <span />
            </div>

            <div className="bd-footer-visual-core">
              <span className="bd-footer-core-icon">
                <FiAperture />
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}

        <div className="bd-footer-main">
          {/* Brand */}
          <div className="bd-footer-brand-column">
            <NavLink to="/" className="bd-footer-brand">
              <span className="bd-footer-brand-mark">
                <span>B</span>
                <span>D</span>
              </span>

              <span className="bd-footer-brand-name">
                BigDay
              </span>
            </NavLink>

            <p className="bd-footer-brand-description">
              A creative technology company building memorable experiences
              through design, media, intelligent systems, and emerging
              technology.
            </p>

            <div className="bd-footer-status">
              <span className="bd-footer-status-dot" />
              <span>Building the next thing</span>
            </div>
          </div>

          {/* Company */}
          <div className="bd-footer-column">
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
          </div>

          {/* Capabilities */}
          <div className="bd-footer-column">
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
          </div>

          {/* Connect */}
          <div className="bd-footer-column bd-footer-connect">
            <h3>Connect</h3>

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
              <span>WhatsApp</span>
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
            COLLABORATORS / TECHNOLOGY STRIP
        ====================================================== */}

        <div className="bd-footer-collaboration">
          <div className="bd-footer-collaboration-label">
            <span>Collaboration</span>
          </div>

          <div className="bd-footer-collaboration-content">
            <div className="bd-collaboration-item">
              <span className="bd-collaboration-icon">
                <FiPlay />
              </span>

              <div>
                <strong>Creative</strong>
                <span>Production</span>
              </div>
            </div>

            <div className="bd-collaboration-divider" />

            <div className="bd-collaboration-item">
              <span className="bd-collaboration-icon">
                <FiCpu />
              </span>

              <div>
                <strong>AI</strong>
                <span>Systems</span>
              </div>
            </div>

            <div className="bd-collaboration-divider" />

            <div className="bd-collaboration-item">
              <span className="bd-collaboration-icon">
                <FiLayers />
              </span>

              <div>
                <strong>Digital</strong>
                <span>Experiences</span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            FOOTER BOTTOM
        ====================================================== */}

        <div className="bd-footer-bottom">
          <div className="bd-footer-legal">
            <span>
              © {currentYear} BigDay.
            </span>

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
            </a>
          </div>

          <button
            type="button"
            className="bd-footer-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;