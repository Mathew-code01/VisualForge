// src/pages/Contact.jsx
// src/pages/Contact.jsx

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Cpu,
  Fingerprint,
  Film,
  Globe,
  Layers,
  Mail,
  MessageSquare,
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

const HERO_CHIPS = [
  { icon: Mail, label: "hello@bigday.com" },
  { icon: Globe, label: "Available Worldwide" },
  { icon: Check, label: "Replies within 24 Hours" },
  { icon: Layers, label: "Strategy · Motion · Brand · Digital" },
];

const CONTACT_OPTIONS = [
  { number: "01", icon: Rocket, title: "Start a Project", text: "For brands, products, campaigns and digital experiences." },
  { number: "02", icon: Users, title: "Creative Partnership", text: "Long-term collaboration." },
  { number: "03", icon: Target, title: "Brand Strategy", text: "Clarify positioning and messaging." },
  { number: "04", icon: Film, title: "Motion & Content", text: "Commercials and storytelling." },
  { number: "05", icon: Cpu, title: "AI & Technology", text: "Automation and intelligent digital products." },
  { number: "06", icon: MessageSquare, title: "General Inquiry", text: "Questions, partnerships or anything else." },
];

const SERVICE_OPTIONS = [
  { number: "01", icon: Target, title: "Strategy", text: "Direction before execution." },
  { number: "02", icon: Fingerprint, title: "Brand Identity", text: "A brand people remember." },
  { number: "03", icon: Layers, title: "Creative Direction", text: "Vision, held together." },
  { number: "04", icon: Globe, title: "Digital Experiences", text: "Products built for growth." },
  { number: "05", icon: Cpu, title: "AI & Technology", text: "Tools for what's next." },
  { number: "06", icon: Film, title: "Content & Motion", text: "Stories that move." },
];

const BUDGET_OPTIONS = ["Under $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"];
const TIMELINE_OPTIONS = ["ASAP", "1–3 months", "3–6 months", "Flexible"];

const FORM_BENEFITS = [
  "Strategy-first thinking",
  "Fast communication",
  "Senior creative team",
];

const WHY_WORK_WITH_US = [
  { number: "01", icon: Target, title: "Strategy before execution" },
  { number: "02", icon: Layers, title: "Built around clarity" },
  { number: "03", icon: Users, title: "Long-term creative partner" },
];

const AVAILABILITY_STATS = [
  { label: "Studio Status", value: "Available" },
  { label: "Average Response", value: "Within 24 hours" },
  { label: "Typical Engagement", value: "4–10 weeks" },
  { label: "Clients", value: "Worldwide" },
];

const FAQS = [
  { question: "How long do projects take?", answer: "Most engagements run 4–10 weeks depending on scope." },
  { question: "Do you work internationally?", answer: "Yes, our studio works with clients worldwide, fully remote." },
  { question: "Can you work with existing brands?", answer: "Absolutely, we regularly extend or evolve existing systems." },
  { question: "Do you only design?", answer: "No — we take work from strategy through to shipped product." },
  { question: "How do we begin?", answer: "Send us a brief through this page and we'll respond within a day." },
];

function sortNewestFirst(items) {
  return [...items].sort((a, b) => {
    const aTime = a?.createdAt?.seconds ?? Number(a?.year ?? 0);
    const bTime = b?.createdAt?.seconds ?? Number(b?.year ?? 0);
    return bTime - aTime;
  });
}

function FloatingField({ id, label, type = "text", value, onChange, required, textarea }) {
  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const Component = textarea ? "textarea" : "input";

  return (
    <div className={`contact-field ${hasValue ? "has-value" : ""} ${textarea ? "contact-field--textarea" : ""}`}>
      <Component
        id={id}
        name={id}
        type={textarea ? undefined : type}
        rows={textarea ? 5 : undefined}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
      />
      <label htmlFor={id}>
        {label}
        {required ? "" : " (optional)"}
      </label>
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
  const heroProject = ordered[0] || null;
  const ctaProject = ordered[1] || ordered[0] || null;

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
          1 — HERO (dark, video)
      ============================================================ */}

      <section className="contact-hero theme-dark" data-theme="dark">
        {!loading && (
          <div className="contact-hero__media">
            <SmartVideo project={heroProject} className="contact-hero__video" />
            <div className="contact-hero__overlay" />
          </div>
        )}

        <div className="contact-hero__glow" aria-hidden="true" />

        <div className="container contact-hero__inner">
          <motion.div
            variants={stagger}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "show"}
          >
            <motion.span className="eyebrow" variants={staggerItem}>
              Contact
            </motion.span>

            <motion.h1 className="contact-hero__title" variants={staggerItem}>
              Let&apos;s build something <span className="gradient-text">people understand.</span>
            </motion.h1>

            <motion.p className="contact-hero__text" variants={staggerItem}>
              Tell us about your project, challenge, or opportunity.
              We&apos;ll help find the clearest path forward.
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

          <motion.div className="contact-hero__chips" variants={stagger} {...motionProps}>
            {HERO_CHIPS.map((chip, index) => {
              const Icon = chip.icon;

              return (
                <motion.span
                  key={chip.label}
                  className="contact-hero__chip glass animate-float"
                  style={{ animationDelay: `${index * 0.4}s` }}
                  variants={staggerItem}
                >
                  <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
                  {chip.label}
                </motion.span>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          2 — CONTACT OPTIONS (light)
      ============================================================ */}

      <section className="section contact-options theme-light" data-theme="light">
        <div className="container">
          <motion.h2 className="contact-options__heading" variants={fadeUp} {...motionProps}>
            How can we help?
          </motion.h2>

          <motion.div className="contact-options__grid" variants={stagger} {...motionProps}>
            {CONTACT_OPTIONS.map((option) => {
              const Icon = option.icon;

              return (
                <motion.div
                  className="contact-options__card"
                  key={option.number}
                  variants={staggerItem}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <span className="contact-options__number mono">{option.number}</span>
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
          3 — PROJECT SERVICES (dark)
      ============================================================ */}

      <section className="section contact-services theme-dark" data-theme="dark">
        <div className="container">
          <motion.h2 className="contact-services__heading" variants={fadeUp} {...motionProps}>
            What are you building?
          </motion.h2>

          <motion.div className="contact-services__grid" variants={stagger} {...motionProps}>
            {SERVICE_OPTIONS.map((service) => {
              const Icon = service.icon;
              const isSelected = selectedService === service.title;

              return (
                <motion.button
                  type="button"
                  key={service.number}
                  className={["contact-services__card", isSelected ? "is-selected" : ""].filter(Boolean).join(" ")}
                  onClick={() => handleSelectService(service.title)}
                  variants={staggerItem}
                  aria-pressed={isSelected}
                >
                  <div className="contact-services__top">
                    <span className="contact-services__number mono">{service.number}</span>
                    <span className="contact-services__icon">
                      <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                  </div>

                  <span className="contact-services__card-title">{service.title}</span>
                  <span className="contact-services__card-text">{service.text}</span>

                  {isSelected && (
                    <span className="contact-services__check" aria-hidden="true">
                      <Check size={13} strokeWidth={2.4} />
                    </span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          4 — CONTACT FORM (light)
      ============================================================ */}

      <section id="contact-form" className="section contact-form-section theme-light" data-theme="light">
        <div className="container">
          <div className="contact-form-section__grid">
            <motion.div className="contact-form-section__intro" variants={stagger} {...motionProps}>
              <motion.span className="eyebrow" variants={staggerItem}>
                Get in Touch
              </motion.span>

              <motion.h2 className="contact-form-section__title" variants={staggerItem}>
                Tell us about your project.
              </motion.h2>

              <motion.p className="contact-form-section__text" variants={staggerItem}>
                Share a few details and we&apos;ll follow up with next steps.
              </motion.p>

              <motion.ul className="contact-form-section__benefits" variants={stagger}>
                {FORM_BENEFITS.map((benefit) => (
                  <motion.li key={benefit} variants={staggerItem}>
                    <Check size={15} strokeWidth={2.2} aria-hidden="true" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </motion.ul>
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
                    <FloatingField id="phone" label="Phone" type="tel" value={form.phone} onChange={handleChange("phone")} />
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

                  <FloatingField id="message" label="Message" value={form.message} onChange={handleChange("message")} required textarea />

                  <label className="contact-form__checkbox">
                    <input type="checkbox" checked={form.updates} onChange={handleChange("updates")} />
                    <span className="contact-form__checkbox-box" aria-hidden="true">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>I&apos;m happy to receive occasional insights.</span>
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
          5 — WHY WORK WITH BIG DAY (dark)
      ============================================================ */}

      <section className="section contact-why theme-dark" data-theme="dark">
        <div className="container">
          <motion.div className="contact-why__grid" variants={stagger} {...motionProps}>
            {WHY_WORK_WITH_US.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div className="contact-why__card" key={item.number} variants={staggerItem}>
                  <span className="contact-why__number mono">{item.number}</span>
                  <span className="contact-why__icon">
                    <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="contact-why__title">{item.title}</h3>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          6 — STUDIO AVAILABILITY (light)
      ============================================================ */}

      <section className="section contact-availability theme-light" data-theme="light">
        <div className="container">
          <motion.h2 className="contact-availability__title" variants={fadeUp} {...motionProps}>
            Currently accepting selected projects.
          </motion.h2>

          <motion.div className="contact-availability__card surface" variants={fadeUp} {...motionProps}>
            {AVAILABILITY_STATS.map((stat, index) => (
              <div className="contact-availability__stat" key={stat.label}>
                <span className="contact-availability__stat-label">{stat.label}</span>
                <span className="contact-availability__stat-value gradient-text">{stat.value}</span>
                {index === 0 && <span className="contact-availability__status-dot" aria-hidden="true" />}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          7 — FAQ (light)
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
            Ready to create something remarkable?
          </motion.h2>

          <motion.p className="contact-cta__text" variants={staggerItem}>
            Let&apos;s turn your complex idea into something people
            immediately understand.
          </motion.p>

          <motion.div className="contact-cta__actions" variants={staggerItem}>
            <a href="#contact-form" className="btn btn-primary btn-lg">
              Start a Conversation
              <ArrowRight size={16} strokeWidth={2} />
            </a>

            <Link to="/work" className="btn btn-secondary btn-lg">
              View Our Work
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}