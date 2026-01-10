// src/components/Footer.jsx
// src/components/Footer.jsx
// src/components/Footer.jsx
// src/components/Footer.jsx
// src/components/Footer.jsx
// src/components/Footer.jsx
// src/components/Footer.jsx
import { NavLink } from "react-router-dom";
import { FiInstagram, FiLinkedin, FiArrowUpRight, FiTwitter } from "react-icons/fi"; // Swapped FiFacebook for FiTwitter
import { FaWhatsapp } from "react-icons/fa"; 
import "../styles/components/footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Your professional WhatsApp link for Mathere
  const developerWhatsapp = "https://wa.me/2349065692168?text=Hello%20Mathere,%20I%20saw%20your%20work%20on%20BigDay%20Studio%20and%20would%20like%20to%20discuss%20a%20project.";

  return (
    <footer className="vf-footer">
      <div className="vf-footer-container">
        
        {/* Top Section: High-Impact Agency CTA */}
        <div className="vf-footer-top">
          <div className="footer-brand-lockup">
            <div className="footer-logo-initials">BD</div>
            <div className="footer-logo-text">
              <span className="brand-name">BigDay</span>
              <span className="brand-sub">Studio</span>
            </div>
          </div>

          <div className="vf-footer-cta">
            <span className="cta-label">Let's build your vision. Get in touch</span>
            <NavLink to="/contact" className="footer-contact-link">
              Start the Booking <FiArrowUpRight className="icon-up" />
            </NavLink>
          </div>
        </div>

        <div className="footer-main-grid">
          <div className="footer-nav-wrapper">
            <div className="footer-nav-group">
              <h4>Directory</h4>
              <ul>
                <li><NavLink to="/">Index</NavLink></li>
                <li><NavLink to="/work">Archive</NavLink></li>
                <li><NavLink to="/about">Studio</NavLink></li>
                <li><NavLink to="/contact">Booking</NavLink></li>
              </ul>
            </div>
            <div className="footer-nav-group">
              <h4>Social</h4>
              <ul>
                <li><a href="#" target="_blank" rel="noreferrer">Instagram</a></li>
                <li><a href="#" target="_blank" rel="noreferrer">X (Twitter)</a></li>
                <li><a href="#" target="_blank" rel="noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-info-group">
            <div className="footer-socials">
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="X (Twitter)"><FiTwitter /></a>
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
            Directed by <span>Larry K.</span> 
            <span className="dev-separator"> | </span> 
            Developed by <a href={developerWhatsapp} target="_blank" rel="noreferrer" className="dev-link">Mathew</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

// now

//  my client complain about this that is looking childish to him this 

// loader and also i should take note of where to use capital letters and 

// smaller letters and where to bold and fade and where to use colours and 

// where to make visible just something professional related to a website 

// footer bottom for video display of a video editor is works or job what 

// he as done now give me the full restruture code 