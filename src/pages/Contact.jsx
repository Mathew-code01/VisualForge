// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
import { FiMail, FiPhone, FiArrowRight } from "react-icons/fi";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import ContactForm from "../components/ContactForm";
import "../styles/pages/contact.css";

function Contact() {
  return (
    <section className="contact-page-vibrant">
      <div className="contact-container">
        {/* Left Side: Editorial Info */}
        <div className="contact-editorial">
          <header className="editorial-header">
            <span className="subtitle">Connect with BigDay</span>
            <h1 className="hero-title">
              Let's build <br /> your next <span>Vision</span>.
            </h1>
            <p className="description">
              From high-end post-production to cinematic storytelling, we’re
              here to elevate your brand to the global stage.
            </p>
          </header>

          <div className="contact-grid-info">
            <div className="info-block">
              <span className="block-label">General Inquiries</span>
              <a href="mailto:studio@BigDay-Media.com" className="block-link">
                studio@BigDay-Media.com
              </a>
            </div>

            <div className="info-block">
              <span className="block-label">New Business</span>
              <a href="tel:+2349064583027" className="block-link">
                +234 90 6458 3027
              </a>
            </div>
          </div>

          <div className="contact-social-footer">
            <span className="block-label">Follow our process</span>
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

        {/* Right Side: Modern Form Card */}
        <div className="contact-form-section">
          <div className="form-card-vibrant">
            <div className="form-header">
              <h3>Send a Message</h3>
              <p>
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;