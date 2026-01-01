// src/components/Footer.jsx
// src/components/Footer.jsx
// src/components/Footer.jsx
import { NavLink } from "react-router-dom";
import {
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiArrowUpRight,
} from "react-icons/fi";
import "../styles/components/footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="vf-footer">
      <div className="vf-footer-container">
        {/* Top Section: High Impact CTA */}
        <div className="vf-footer-top">
          <div className="vf-footer-brand">
            <h2 className="footer-logo">
              BIGDAY<span>.</span>
            </h2>
            <p className="footer-tagline">
              Premium post-production for brands that <br /> move the world.
            </p>
          </div>

          <div className="vf-footer-cta">
            <span className="cta-label">Have a vision?</span>
            <NavLink to="/contact" className="footer-contact-link">
              Let's Create It <FiArrowUpRight className="icon-up" />
            </NavLink>
          </div>
        </div>

        <div className="footer-main-grid">
          {/* Navigation Groups */}
          <div className="footer-nav-wrapper">
            <div className="footer-nav-group">
              <h4>Explore</h4>
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/work">Featured Work</NavLink>
                </li>
                <li>
                  <NavLink to="/about">Our Studio</NavLink>
                </li>
                <li>
                  <NavLink to="/services">Capabilities</NavLink>
                </li>
              </ul>
            </div>

            <div className="footer-nav-group">
              <h4>Legal</h4>
              <ul>
                <li>
                  <NavLink to="/privacy">Privacy Policy</NavLink>
                </li>
                <li>
                  <NavLink to="/terms">Terms of Service</NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact & Socials */}
          <div className="footer-info-group">
            <div className="footer-socials">
              <a href="#" aria-label="Instagram">
                <FiInstagram />
              </a>
              <a href="#" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="#" aria-label="YouTube">
                <FiYoutube />
              </a>
            </div>
            <button className="back-to-top" onClick={scrollToTop}>
              Back to Top ↑
            </button>
          </div>
        </div>

        {/* Bottom Section: Clean Credits */}
        <div className="vf-footer-bottom">
          <div className="copyright">© {currentYear} BigDay Media Studio.</div>
          <div className="credits">
            Design & Direction by <span>Larry K.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;