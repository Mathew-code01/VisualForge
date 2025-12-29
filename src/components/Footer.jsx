// src/components/Footer.jsx
// src/components/Footer.jsx
// src/components/Footer.jsx
import { NavLink } from "react-router-dom";
import { FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import "../styles/components/footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="vf-footer">
      <div className="vf-footer-container">
        {/* Top Section: Brand & Action */}
        <div className="vf-footer-top">
          <div className="vf-footer-brand">
            <h2 className="footer-logo">BigDay-Media</h2>
            <p className="footer-tagline">
              Elevating stories through cinematic precision.
            </p>
          </div>

          <div className="vf-footer-cta">
            <p>Ready to start a project?</p>
            <NavLink to="/contact" className="footer-contact-link">
              Get in touch <span className="arrow">→</span>
            </NavLink>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Middle Section: Links & Social */}
        <div className="vf-footer-mid">
          <nav className="footer-nav">
            <div className="footer-nav-group">
              <h4>Navigation</h4>
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/work">Work</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
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
          </nav>

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
        </div>

        {/* Bottom Section: Copyright */}
        <div className="vf-footer-bottom">
          <div className="copyright">
            © {currentYear} BigDay-Media Studio. All rights reserved.
          </div>
          <div className="credits">
            Crafted with care by <span>Larry K.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;