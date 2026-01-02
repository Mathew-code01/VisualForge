// src/components/Footer.jsx
// src/components/Footer.jsx
// src/components/Footer.jsx
// src/components/Footer.jsx
import { NavLink } from "react-router-dom";
import { FiInstagram, FiTwitter, FiYoutube, FiArrowUpRight } from "react-icons/fi";
import "../styles/components/footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="vf-footer">
      <div className="vf-footer-container">
        
        {/* Top Section: Branding & High-Impact CTA */}
        <div className="vf-footer-top">
          <div className="footer-brand-lockup">
            <div className="footer-logo-initials">BD</div>
            <div className="footer-logo-text">
              <span className="brand-name">BigDay</span>
              <span className="brand-sub">Media Agency</span>
            </div>
          </div>

          <div className="vf-footer-cta">
            <span className="cta-label">Ready to start?</span>
            <NavLink to="/contact" className="footer-contact-link">
              Let's Create <FiArrowUpRight className="icon-up" />
            </NavLink>
          </div>
        </div>

        <div className="footer-main-grid">
          <div className="footer-nav-wrapper">
            <div className="footer-nav-group">
              <h4>Explore</h4>
              <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/work">Featured Work</NavLink></li>
                <li><NavLink to="/about">Our Studio</NavLink></li>
                <li><NavLink to="/services">Capabilities</NavLink></li>
              </ul>
            </div>
            <div className="footer-nav-group">
              <h4>Social</h4>
              <ul>
                <li><a href="#" target="_blank">Instagram</a></li>
                <li><a href="#" target="_blank">Vimeo</a></li>
                <li><a href="#" target="_blank">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-info-group">
            <div className="footer-socials">
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="YouTube"><FiYoutube /></a>
              <a href="#" aria-label="Twitter"><FiTwitter /></a>
            </div>
            <button className="back-to-top" onClick={scrollToTop}>
              Return to Top ↑
            </button>
          </div>
        </div>

        <div className="vf-footer-bottom">
          <div className="copyright">© {currentYear} BIGDAY MEDIA STUDIO. ALL RIGHTS RESERVED.</div>
          <div className="credits">
            Design & Direction by <span>Larry K.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;