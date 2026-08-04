

// src/components/contact/ContactForm.jsx

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import "../../styles/components/contactform.css";

const PROJECT_TYPES = [
  "Strategy",
  "Brand Identity",
  "Creative Direction",
  "Digital Experiences",
  "AI & Technology",
  "Content & Motion",
  "Not sure yet",
];

export default function ContactForm() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    projectType: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("submitted");
    // Wire this up to your backend / email service of choice.
  };

  return (
    <section
      id="contact-form"
      className="contact-form-section section-dark"
      data-theme="dark"
    >
      <div
        ref={ref}
        className={["contact-form__inner", "section-container", inView ? "is-in-view" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="contact-form__head">
          <span className="eyebrow">Tell Us More</span>
          <h2 className="contact-form__title">
            Send us the details, we'll take it from there.
          </h2>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-form__row">
            <div className="contact-form__field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={form.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="contact-form__row">
            <div className="contact-form__field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="contact-project-type">Project Type</label>
              <select
                id="contact-project-type"
                name="projectType"
                required
                value={form.projectType}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select one
                </option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="contact-form__field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-blue contact-form__submit">
            <span>Send Inquiry</span>
            <ArrowUpRight size={17} strokeWidth={2} />
          </button>

          <p
            className="contact-form__status"
            role="status"
            aria-live="polite"
          >
            {status === "submitted"
              ? "Thanks — we'll be in touch shortly."
              : ""}
          </p>
        </form>
      </div>
    </section>
  );
}