// src/pages/Contact.jsx
// src/pages/Contact.jsx
// src/pages/Contact.jsx

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Cpu,
  Layers,
  Mail,
  MessageSquare,
  Play,
  Rocket,
  Target,
  Users,
} from "lucide-react";

import SmartVideo from "../components/SmartVideo";
import { getVideos } from "../firebase/uploadVideo.js";

import "../styles/pages/contact.css";

const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const CONTACT_OPTIONS = [
  {
    icon: Rocket,
    title: "Start a Project",
    text: "For brands, products, websites and campaigns.",
  },
  {
    icon: Users,
    title: "Collaboration",
    text: "Creative partnerships and studio collaborations.",
  },
  {
    icon: MessageSquare,
    title: "General Inquiry",
    text: "Questions, partnerships and everything else.",
  },
];

const SERVICE_OPTIONS = [
  { number: "01", title: "Strategy", text: "Direction before execution." },
  { number: "02", title: "Brand Identity", text: "A brand people remember." },
  { number: "03", title: "Creative Direction", text: "Vision, held together." },
  { number: "04", title: "Digital Experiences", text: "Products built for growth." },
  { number: "05", title: "AI & Technology", text: "Tools for what's next." },
  { number: "06", title: "Content & Motion", text: "Stories that move." },
];

const BUDGET_OPTIONS = ["Under $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"];
const TIMELINE_OPTIONS = ["ASAP", "1–3 months", "3–6 months", "Flexible"];

const WHY_BIG_DAY = [
  { icon: Target, title: "Strategy First", text: "Every project begins with clarity." },
  { icon: Layers, title: "Multidisciplinary", text: "Design, communication and technology together." },
  { icon: Cpu, title: "Built for Ambitious Ideas", text: "We solve complex problems through thoughtful creativity." },
];

const FAQS = [
  { question: "How quickly do you reply?", answer: "Within 24 hours, typically sooner on weekdays." },
  { question: "What types of clients do you work with?", answer: "Ambitious brands, founders, and teams — startup to enterprise." },
  { question: "Can you work remotely?", answer: "Yes, our studio operates fully remote with clients worldwide." },
  { question: "How long do projects usually take?", answer: "Most engagements run 4–10 weeks depending on scope." },
  { question: "Do you build as well as design?", answer: "Yes — we take work from strategy through to shipped product." },
  { question: "Can you work with existing brands?", answer: "Absolutely, we regularly extend or evolve existing systems." },
];

function sortNewestFirst(items) {
  return [...items].sort((a, b) => {
    const aTime = a?.createdAt?.seconds ?? Number(a?.year ?? 0);
    const bTime = b?.createdAt?.seconds ?? Number(b?.year ?? 0);
    return bTime - aTime;
  });
}

function FloatingField({ id, label, type = "text", value, onChange, required, textarea, placeholder }) {
  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const Component = textarea ? "textarea" : "input";

  return (
    <div className={`contact-field ${hasValue ? "has-value" : ""}`}>
      <Component
        id={id}
        name={id}
        type={textarea ? undefined : type}
        rows={textarea ? 5 : undefined}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder || " "}
      />
      <label htmlFor={id}>{label}{required ? "" : " (optional)"}</label>
    </div>
  );
}

function FloatingSelect({ id, label, value, onChange, options, required }) {
  const hasValue = Boolean(value);

  return (
    <div className={`contact-field contact-field--select ${hasValue ? "has-value" : ""}`}>
      <select id={id} name={id} value={value} onChange={onChange} required={required}>
        <option value="" disabled hidden></option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
      <ChevronDown size={16} strokeWidth={1.8} className="contact-field__chevron" aria-hidden="true" />
    </div>
  );
}

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedService, setSelectedService] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
    updates: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const result = await getVideos();
        if (!controller.signal.aborted) {
          setVideos(Array.isArray(result) ? result : []);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Contact video load failed:", error);
          setVideos([]);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  const ordered = useMemo(() => sortNewestFirst(videos), [videos]);
  const ctaProject = ordered[0] || null;

  const handleChange = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectService = (title) => {
    setSelectedService(title);
    setForm((prev) => ({ ...prev, projectType: title }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const viewport = { once: true, margin: "-100px" };
  const motionProps = shouldReduceMotion
    ? {}
    : { initial: "hidden", whileInView: "show", viewport };

  return (
    <main className="contact-page">
      {/* ============================================================
          1 — HERO (dark)
      ============================================================ */}

      <section className="contact-hero theme-dark" data-theme="dark">
        <div className="contact-hero__mesh" aria-hidden="true" />
        <div className="contact-hero__glow contact-hero__glow--one" aria-hidden="true" />
        <div className="contact-hero__glow contact-hero__glow--two" aria-hidden="true" />

        <div className="container contact-hero__inner">
          <motion.div
            className="contact-hero__content"
            variants={stagger}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "show"}
          >
            <motion.span className="eyebrow" variants={staggerItem}>
              Contact
            </motion.span>

            <motion.h1 className="contact-hero__title" variants={staggerItem}>
              Let&apos;s build something <span className="gradient-text">people remember.</span>
            </motion.h1>

            <motion.p className="contact-hero__text" variants={staggerItem}>
              Whether you&apos;re launching a brand, creating a campaign, or
              solving a complex communication challenge, we&apos;d love to
              hear your story.
            </motion.p>

            <motion.div className="contact-hero__actions" variants={staggerItem}>
              <a href="#contact-form" className="btn btn-primary btn-lg">
                Start a Conversation
                <ArrowRight size={16} strokeWidth={2} />
              </a>

              <Link to="/work" className="btn btn-secondary btn-lg">
                View Our Work
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="contact-hero__card glass"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            <a href="mailto:hello@bigday.com" className="contact-hero__card-email">
              <Mail size={16} strokeWidth={1.8} aria-hidden="true" />
              hello@bigday.com
            </a>

            <div className="contact-hero__card-row">
              <span className="contact-hero__status-dot" />
              <span>Available for selected projects</span>
            </div>

            <div className="contact-hero__card-row">
              <Clock size={14} strokeWidth={1.8} aria-hidden="true" />
              <span>Average reply within 24 hours</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          2 — CONTACT OPTIONS (light)
      ============================================================ */}

      <section className="section contact-options theme-light" data-theme="light">
        <div className="container">
          <motion.div className="contact-options__grid" variants={stagger} {...motionProps}>
            {CONTACT_OPTIONS.map((option) => {
              const Icon = option.icon;

              return (
                <motion.div
                  className="contact-options__card"
                  key={option.title}
                  variants={staggerItem}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <span className="contact-options__icon">
                    <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="contact-options__title">{option.title}</h3>
                  <p className="contact-options__text">{option.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          3 — SERVICES SELECTION (dark)
      ============================================================ */}

      <section className="section contact-services theme-dark" data-theme="dark">
        <div className="container">
          <motion.div variants={fadeUp} {...motionProps}>
            <span className="eyebrow">What are you building?</span>
            <h2 className="contact-services__title">Choose what fits your project.</h2>
          </motion.div>

          <motion.div className="contact-services__grid" variants={stagger} {...motionProps}>
            {SERVICE_OPTIONS.map((service) => (
              <motion.button
                type="button"
                key={service.number}
                className={[
                  "contact-services__card",
                  selectedService === service.title ? "is-selected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleSelectService(service.title)}
                variants={staggerItem}
                aria-pressed={selectedService === service.title}
              >
                <span className="contact-services__number mono">{service.number}</span>
                <span className="contact-services__card-title">{service.title}</span>
                <span className="contact-services__card-text">{service.text}</span>

                {selectedService === service.title && (
                  <span className="contact-services__check" aria-hidden="true">
                    <Check size={14} strokeWidth={2.4} />
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          4 — CONTACT FORM (light)
      ============================================================ */}

      <section id="contact-form" className="section contact-form-section theme-light" data-theme="light">
        <div className="container">
          <div className="contact-form-section__grid">
            <motion.div className="contact-form-section__intro" variants={fadeUp} {...motionProps}>
              <span className="eyebrow">Get in Touch</span>
              <h2 className="contact-form-section__title">Tell us about your project.</h2>
              <p className="contact-form-section__text">The more context, the better we can help.</p>
            </motion.div>

            <motion.form
              className="contact-form glass"
              onSubmit={handleSubmit}
              variants={fadeUp}
              {...motionProps}
              noValidate
            >
              {submitted ? (
                <div className="contact-form__success" role="status">
                  <span className="contact-form__success-icon">
                    <Check size={22} strokeWidth={2.2} />
                  </span>
                  <h3>Message received.</h3>
                  <p>We&apos;ll be in touch within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="contact-form__row">
                    <FloatingField id="name" label="Full Name" value={form.name} onChange={handleChange("name")} required />
                    <FloatingField id="company" label="Company" value={form.company} onChange={handleChange("company")} />
                  </div>

                  <div className="contact-form__row">
                    <FloatingField id="email" label="Email Address" type="email" value={form.email} onChange={handleChange("email")} required />
                    <FloatingField id="phone" label="Phone Number" type="tel" value={form.phone} onChange={handleChange("phone")} />
                  </div>

                  <div className="contact-form__row">
                    <FloatingSelect
                      id="projectType"
                      label="Project Type"
                      value={form.projectType}
                      onChange={handleChange("projectType")}
                      options={SERVICE_OPTIONS.map((s) => s.title)}
                      required
                    />
                    <FloatingSelect
                      id="budget"
                      label="Budget Range"
                      value={form.budget}
                      onChange={handleChange("budget")}
                      options={BUDGET_OPTIONS}
                    />
                  </div>

                  <FloatingSelect
                    id="timeline"
                    label="Timeline"
                    value={form.timeline}
                    onChange={handleChange("timeline")}
                    options={TIMELINE_OPTIONS}
                  />

                  <FloatingField
                    id="message"
                    label="Message"
                    value={form.message}
                    onChange={handleChange("message")}
                    required
                    textarea
                  />

                  <label className="contact-form__checkbox">
                    <input type="checkbox" checked={form.updates} onChange={handleChange("updates")} />
                    <span className="contact-form__checkbox-box" aria-hidden="true">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>I&apos;m happy to receive occasional updates.</span>
                  </label>

                  <button type="submit" className="btn btn-primary btn-lg contact-form__submit">
                    Send Inquiry
                    <ArrowRight size={16} strokeWidth={2} />
                  </button>
                </>
              )}
            </motion.form>
          </div>
        </div>
      </section>

      {/* ============================================================
          5 — WHY BIG DAY (dark)
      ============================================================ */}

      <section className="section contact-why theme-dark" data-theme="dark">
        <div className="container">
          <motion.h2 className="contact-why__title" variants={fadeUp} {...motionProps}>
            Different challenges. One shared purpose.
          </motion.h2>

          <motion.div className="contact-why__grid" variants={stagger} {...motionProps}>
            {WHY_BIG_DAY.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div className="contact-why__card" key={item.title} variants={staggerItem}>
                  <span className="contact-why__icon">
                    <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="contact-why__card-title">{item.title}</h3>
                  <p className="contact-why__card-text">{item.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          6 — FAQ (light)
      ============================================================ */}

      <section className="section contact-faq theme-light" data-theme="light">
        <div className="container container-narrow">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            Questions
          </motion.span>

          <motion.div className="contact-faq__list" variants={stagger} {...motionProps}>
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <motion.div
                  className={["contact-faq__item", isOpen ? "is-open" : ""].filter(Boolean).join(" ")}
                  key={faq.question}
                  variants={staggerItem}
                >
                  <button
                    type="button"
                    className="contact-faq__trigger"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-trigger-${index}`}
                  >
                    <span>{faq.question}</span>
                    <span className="contact-faq__icon" aria-hidden="true">
                      <ChevronDown size={18} strokeWidth={1.8} />
                    </span>
                  </button>

                  <div
                    className="contact-faq__panel"
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${index}`}
                  >
                    <p className="contact-faq__answer">{faq.answer}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          7 — STUDIO AVAILABILITY (dark)
      ============================================================ */}

      <section className="section contact-availability theme-dark" data-theme="dark">
        <div className="container">
          <motion.div className="contact-availability__head" variants={fadeUp} {...motionProps}>
            <span className="contact-availability__status-dot" aria-hidden="true" />
            <h2 className="contact-availability__title">Available for selected projects</h2>
          </motion.div>

          <motion.div className="contact-availability__grid" variants={stagger} {...motionProps}>
            <motion.div className="contact-availability__stat" variants={staggerItem}>
              <span className="contact-availability__stat-label">Current Status</span>
              <span className="contact-availability__stat-value gradient-text">Accepting new work</span>
            </motion.div>

            <motion.div className="contact-availability__stat" variants={staggerItem}>
              <span className="contact-availability__stat-label">Average Response</span>
              <span className="contact-availability__stat-value gradient-text">Within 24 hours</span>
            </motion.div>

            <motion.div className="contact-availability__stat" variants={staggerItem}>
              <span className="contact-availability__stat-label">Project Start</span>
              <span className="contact-availability__stat-value gradient-text">Usually 1–3 weeks</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          8 — FINAL CTA (dark, video)
      ============================================================ */}

      <section className="contact-cta theme-dark" data-theme="dark">
        {!loading && (
          <div className="contact-cta__media">
            <SmartVideo project={ctaProject} className="contact-cta__video" />
            <div className="contact-cta__overlay" />
          </div>
        )}

        <motion.div className="container contact-cta__inner" variants={stagger} {...motionProps}>
          <motion.h2 className="contact-cta__title" variants={staggerItem}>
            Ready to make your idea impossible to ignore?
          </motion.h2>

          <motion.div className="contact-cta__actions" variants={staggerItem}>
            <a href="#contact-form" className="btn btn-primary btn-lg">
              Start a Project
              <ArrowRight size={16} strokeWidth={2} />
            </a>

            <Link to="/work" className="btn btn-secondary btn-lg">
              Explore Our Work
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}