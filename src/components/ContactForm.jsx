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
          <label>Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="input-wrapper">
          <label>Work Email</label>
          <input
            type="email"
            placeholder="john@company.com"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
      </div>

      <div className="input-wrapper">
        <label>Project Details</label>
        <textarea
          rows="4"
          placeholder="Tell us about your project goals..."
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
            ? "Processing..."
            : status.success
            ? "Sent Successfully"
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