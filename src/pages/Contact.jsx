// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
import { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"; // Swapped FaVimeoV for FaTwitter
import ContactForm from "../components/ContactForm";
import Loader from "../components/Loader.jsx";
import "../styles/pages/contact.css";

function Contact() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to allow the cinematic loader to play
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="contact-page-vibrant">
      <div className="contact-container">
        {/* Left Side: Minimalist Editorial */}
        <div className="contact-editorial">
          <header className="editorial-header">
            <span className="subtitle">Project Inquiries</span>
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
              <span className="form-step-indicator">Step 01</span>
              <h3>Project Brief</h3>
              <p>
                Initiate the conversation. Share your project details and our
                team will reach out to schedule a consultation.
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