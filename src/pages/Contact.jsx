// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx
import {
  FaEnvelope,
  FaPhoneAlt,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import ContactForm from "../components/ContactForm";
import "../styles/pages/contact.css";
import "../styles/theme.css";

function Contact() {
  return (
    <section className="contact-page">
      {/* Header */}
      <div className="contact-header">
        <h1>Let’s Collaborate</h1>
        <p>
          Have an idea, project, or partnership in mind?  
          We’d love to hear from you and explore how we can create something
          impactful together.
        </p>
      </div>

      {/* Content */}
      <div className="contact-content">
        {/* Contact Info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <ul>
            <li>
              <a href="mailto:studio@email.com">
                <FaEnvelope className="icon" />
                studio@email.com
              </a>
            </li>
            <li>
              <a href="tel:+2349064583027">
                <FaPhoneAlt className="icon" />
                +234 90 6458 3027
              </a>
            </li>
          </ul>

          {/* Social Links */}
          <div className="contact-socials">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="social-circle"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="social-circle"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="social-circle"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-wrapper">
          <h2>Send Us a Message</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default Contact;
