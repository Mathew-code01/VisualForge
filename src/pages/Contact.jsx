// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
import { useEffect } from "react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import ContactForm from "../components/ContactForm";
import "../styles/pages/contact.css";

function Contact() {
  // Optional: Force scroll to top when landing on contact
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <section className="contact-page-vibrant">
        <div className="contact-container">
          {/* Left Side: Minimalist Editorial */}
          <div className="contact-editorial">
            <header className="editorial-header">
              <span className="section-tag-elite">Project Inquiries</span>
              <h1 className="hero-title">
                Let's build <br /> your vision.
              </h1>
              <p className="description">
                Collaborating with global brands to deliver high-performance
                visual editorial and cinematic excellence.
              </p>
            </header>

            <div className="contact-grid-info">
              <div className="info-block">
                <span className="block-label">Email</span>
                <a href="mailto:studio@BigDay-Media.com" className="block-link">
                  studio@BigDay-Media.com
                </a>
              </div>

              <div className="info-block">
                <span className="block-label">Business Direct</span>
                <a href="tel:+2349064583027" className="block-link">
                  +234 90 6458 3027
                </a>
              </div>
            </div>

            <div className="contact-social-footer">
              <span className="block-label">Studio Dispatch</span>
              <div className="social-links-vibrant">
                <a href="#" className="social-icon-btn" title="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className="social-icon-btn" title="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="#" className="social-icon-btn" title="Twitter">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Deep Dark Glassmorphism Card */}
          <div className="contact-form-section">
            <div className="form-card-vibrant glass-dark">
              <div className="form-header">
                <h3>Project Brief</h3>
                <p>Initiate the conversation. Share your project details.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;