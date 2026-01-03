// src/components/ContactForm.jsx
// src/components/ContactForm.jsx
// src/components/ContactForm.jsx
import { useState } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";
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
    // Simulate API logic
    await new Promise((r) => setTimeout(r, 2000));
    setStatus({ loading: false, success: true });
    setFormData({ name: "", email: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setStatus({ loading: false, success: false }), 5000);
  };

  return (
    <form className="contact-form-vibrant" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-wrapper">
          <label>Identity</label> {/* "Identity" or "Contact Name" */}
          <input
            type="text"
            placeholder="Name or Studio"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="input-wrapper">
          <label>Work Email</label>
          <input
            type="email"
            placeholder="email@company.com"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
      </div>

      <div className="input-wrapper">
        <label>Project Scope</label>{" "}
        {/* "Scope" is the industry term for Video Editors */}
        <textarea
          rows="4"
          placeholder="Briefly describe your vision and technical requirements..."
          required
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        ></textarea>
      </div>

      <button
        type="submit"
        className={`submit-btn-vibrant ${status.success ? "success" : ""}`}
        disabled={status.loading}
      >
        <span className="btn-content">
          {status.loading
            ? "Authenticating..."
            : status.success
            ? "Brief Transmitted"
            : "Send Inquiry"}
        </span>
        <span className="btn-icon">
          {status.success ? <FiCheck /> : <FiArrowRight />}
        </span>
      </button>
    </form>
  );
}

export default ContactForm;