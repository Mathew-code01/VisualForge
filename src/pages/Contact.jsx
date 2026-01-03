// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
import { FiMail, FiPhone, FiArrowRight } from "react-icons/fi";
import { FaInstagram, FaLinkedin, FaVimeoV } from "react-icons/fa"; // Swapped Twitter for Vimeo
import ContactForm from "../components/ContactForm";
import "../styles/pages/contact.css";

function Contact() {
  return (
    <section className="contact-page-vibrant">
      <div className="contact-container">
        {/* Left Side: Editorial Info */}
        <div className="contact-editorial">
          <header className="editorial-header">
            <span className="subtitle">Project Inquiries</span>
            {/* Sizing reduced per client instructions */}
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
              <a href="#" className="social-icon-btn" title="Vimeo">
                <FaVimeoV /> {/* Essential for video editors */}
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Modern Form Card */}
        <div className="contact-form-section">
          {/* Ensure this card uses the Glassmorphism style: deep dark + high blur */}
          <div className="form-card-vibrant">
            <div className="form-header">
              <h3>Project Brief</h3>
              <p>
                Initiate the conversation. Share your project details and 
                our team will reach out to schedule a consultation.
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