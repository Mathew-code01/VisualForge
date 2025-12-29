// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import ContactForm from "../components/ContactForm";
import "../styles/pages/contact.css";

function Contact() {
  return (
    <section className="contact-page">
      <div className="contact-container">
        {/* Left Side: Editorial Info */}
        <div className="contact-editorial">
          <div className="editorial-content">
            <span className="subtitle">Let's Connect</span>
            <h1 className="hero-title">
              Tell us about <br /> your <span>vision</span>.
            </h1>
            <p className="description">
              Whether you're starting a new brand, looking for cinematic
              production, or just want to say hi—our door is always open.
            </p>

            <div className="contact-methods">
              <div className="method-item">
                <span className="method-label">Email us</span>
                <a href="mailto:studio@visualforge.com" className="method-link">
                  studio@BigDay-Media.com
                </a>
              </div>
              <div className="method-item">
                <span className="method-label">Call us</span>
                <a href="tel:+2349064583027" className="method-link">
                  +234 90 6458 3027
                </a>
              </div>
            </div>

            <div className="contact-social-row">
              <a href="#" className="s-link">
                Instagram
              </a>
              <a href="#" className="s-link">
                LinkedIn
              </a>
              <a href="#" className="s-link">
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="contact-form-section">
          <div className="form-card">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;