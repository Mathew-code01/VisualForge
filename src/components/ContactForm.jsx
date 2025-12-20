// src/components/ContactForm.jsx
// src/components/ContactForm.jsx
// src/components/ContactForm.jsx
// src/components/ContactForm.jsx
import { useState } from "react";
import "../styles/components/contactform.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, success: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false });
    // Simulate API
    await new Promise((r) => setTimeout(r, 2000));
    setStatus({ loading: false, success: true });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label>Your Name</label>
        <span className="bar"></span>
      </div>

      <div className="input-group">
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label>Work Email</label>
        <span className="bar"></span>
      </div>

      <div className="input-group">
        <textarea
          rows="1"
          required
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        ></textarea>
        <label>Project Brief</label>
        <span className="bar"></span>
      </div>

      <button type="submit" className="submit-btn" disabled={status.loading}>
        {status.loading
          ? "Sending..."
          : status.success
          ? "Message Sent"
          : "Inquire Now"}
        <span className="btn-arrow">→</span>
      </button>
    </form>
  );
}

export default ContactForm;