// src/components/Footer.jsx
// src/components/Footer.jsx
// src/components/Footer.jsx
// src/components/Footer.jsx
// src/components/Footer.jsx
import { NavLink } from "react-router-dom";
import { FiInstagram, FiLinkedin, FiArrowUpRight } from "react-icons/fi";
import { SiVimeo } from "react-icons/si"; // High-end video editors prioritize Vimeo
import "../styles/components/footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="vf-footer">
      <div className="vf-footer-container">
        
        {/* Top Section: High-Impact Agency CTA */}
        <div className="vf-footer-top">
          <div className="footer-brand-lockup">
            <div className="footer-logo-initials">BD</div>
            <div className="footer-logo-text">
              <span className="brand-name">BigDay</span>
              <span className="brand-sub">Studio</span> {/* 'Studio' over 'Agency' */}
            </div>
          </div>

          <div className="vf-footer-cta">
            <span className="cta-label">Have a vision?</span>
            <NavLink to="/contact" className="footer-contact-link">
              Start the Inquiry <FiArrowUpRight className="icon-up" />
            </NavLink>
          </div>
        </div>

        <div className="footer-main-grid">
          <div className="footer-nav-wrapper">
            <div className="footer-nav-group">
              <h4>Directory</h4> {/* 'Directory' over 'Explore' */}
              <ul>
                <li><NavLink to="/">Index</NavLink></li>
                <li><NavLink to="/work">Archive</NavLink></li>
                <li><NavLink to="/about">Studio</NavLink></li>
                <li><NavLink to="/contact">Inquiry</NavLink></li>
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
              <a href="#" aria-label="Vimeo"><SiVimeo /></a>
              <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
            </div>
            <button className="back-to-top" onClick={scrollToTop}>
               Top ↑
            </button>
          </div>
        </div>

        <div className="vf-footer-bottom">
          <div className="copyright">© {currentYear} BIGDAY MEDIA. ALL RIGHTS RESERVED.</div>
          <div className="credits">
            {/* Keeping it professional and minimalist */}
            Directed by <span>Larry K.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;