// src/components/ContactForm.jsx
// src/components/ContactForm.jsx
// src/components/ContactForm.jsx
// src/components/ContactForm.jsx
import { useState, useEffect } from "react";
import "../styles/components/contactform.css";
import "../styles/theme.css";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: "", error: "" });
  const [fade, setFade] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });
    setFade(false);

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: "", error: "Please fill in all fields." });
      setFade(true);
      return;
    }

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus({ loading: false, success: "✅ Your message has been sent!", error: "" });
      setFormData({ name: "", email: "", message: "" });
      setFade(true);
    } catch {
      setStatus({ loading: false, success: "", error: "❌ Something went wrong. Please try again." });
      setFade(true);
    }
  };

  useEffect(() => {
    if (fade) {
      const timer = setTimeout(() => setFade(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [fade]);

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {status.success && (
        <p className={`form-success ${!fade ? "fade-out" : ""}`}>{status.success}</p>
      )}
      {status.error && (
        <p className={`form-error ${!fade ? "fade-out" : ""}`}>{status.error}</p>
      )}

      <div className="form-group">
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Your Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Your Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          rows="5"
          required
        />
      </div>

      <button type="submit" className="btn" disabled={status.loading}>
        {status.loading ? <span className="spinner"></span> : "Send Message"}
      </button>
    </form>
  );
}

export default ContactForm;
