
// src/pages/Services.jsx
// src/pages/Services.jsx

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Target,
  Fingerprint,
  MessageSquare,
  LayoutGrid,
  Search,
  Sparkles,
  PenTool,
  RefreshCw,
  Compass,
  Palette,
  Film,
  Globe,
  Layers,
  Megaphone,
  Rocket,
  Plus,
  Minus,
} from "lucide-react";

import SmartVideo from "../components/SmartVideo";
import { getVideos } from "../firebase/uploadVideo.js";

import "../styles/pages/services.css";

const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const CAPABILITIES = [
  {
    number: "01",
    title: "Strategy",
    icon: Target,
    description: "We define what needs to be understood before anything is made.",
    bullets: ["Positioning", "Messaging", "Brand Direction"],
    diagram: ["Business Goal", "Audience", "Message", "Direction"],
  },
  {
    number: "02",
    title: "Brand Identity",
    icon: Fingerprint,
    description: "We build brands people recognize, remember, and trust.",
    bullets: ["Logo", "Visual System", "Guidelines"],
    diagram: ["Foundation", "Identity", "System", "Guidelines"],
  },
  {
    number: "03",
    title: "Communication",
    icon: MessageSquare,
    description: "We turn ideas into stories people can actually follow.",
    bullets: ["Motion", "Campaigns", "Storytelling"],
    diagram: ["Idea", "Narrative", "Motion", "Story"],
  },
  {
    number: "04",
    title: "Digital Experiences",
    icon: LayoutGrid,
    description: "We design websites and products that help businesses grow.",
    bullets: ["Websites", "Products", "Systems"],
    diagram: ["Research", "Design", "Build", "Growth"],
  },
];

const METHOD_STEPS = [
  { number: "01", title: "Understand", icon: Search, text: "We learn the business and the blocker." },
  { number: "02", title: "Clarify", icon: Compass, text: "We define the message and direction." },
  { number: "03", title: "Create", icon: PenTool, text: "We design the strategy, brand, and story." },
  { number: "04", title: "Refine", icon: RefreshCw, text: "We sharpen until the idea is unmistakable." },
];

const DELIVERABLES = [
  { label: "Brand Strategy", icon: Target },
  { label: "Creative Direction", icon: Sparkles },
  { label: "Motion Assets", icon: Film },
  { label: "Website Design", icon: Globe },
  { label: "Design System", icon: Layers },
  { label: "Campaign Toolkit", icon: Megaphone },
  { label: "Launch Support", icon: Rocket },
];

const COMPARISON_ROWS = [
  { before: "Confusing", after: "Clear" },
  { before: "Generic", after: "Strategic" },
  { before: "One-off", after: "Scalable" },
  { before: "Pretty", after: "Purposeful" },
];

const FAQS = [
  {
    question: "What does Big Day actually do?",
    answer: "We turn complex ideas into strategy, brand, and digital experiences people understand.",
  },
  {
    question: "Do you only design, or also build?",
    answer: "Both — we take work from strategy through to shipped websites and products.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Most engagements run 4–10 weeks depending on scope and discipline mix.",
  },
  {
    question: "Do we need to know exactly what we want?",
    answer: "No — clarifying the problem is part of the process, not a prerequisite for it.",
  },
  {
    question: "Can you work with our existing brand?",
    answer: "Yes, we regularly extend or evolve existing systems rather than starting over.",
  },
  {
    question: "How do we start a project?",
    answer: "Send us a brief through the contact page and we'll respond within two days.",
  },
];

function sortNewestFirst(items) {
  return [...items].sort((a, b) => {
    const aTime = a?.createdAt?.seconds ?? Number(a?.year ?? 0);
    const bTime = b?.createdAt?.seconds ?? Number(b?.year ?? 0);
    return bTime - aTime;
  });
}

function useSectionVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

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
          console.error("Services video load failed:", error);
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

  return {
    loading,
    heroProject: ordered[0] || null,
    ctaProject: ordered[1] || ordered[0] || null,
  };
}

export default function Services() {
  const shouldReduceMotion = useReducedMotion();
  const { loading, heroProject, ctaProject } = useSectionVideos();
  const [openFaq, setOpenFaq] = useState(0);

  const viewport = { once: true, margin: "-100px" };
  const motionProps = shouldReduceMotion
    ? {}
    : { initial: "hidden", whileInView: "show", viewport };

  return (
    <main className="services-page">
      {/* ============================================================
          1 — HERO (dark)
      ============================================================ */}

      <section className="services-hero theme-dark" data-theme="dark">
        {!loading && (
          <div className="services-hero__media">
            <SmartVideo project={heroProject} className="services-hero__video" />
            <div className="services-hero__overlay" />
          </div>
        )}

        <div className="services-hero__glow" aria-hidden="true" />

        <div className="container services-hero__inner">
          <motion.div
            variants={stagger}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "show"}
          >
            <motion.span className="eyebrow" variants={staggerItem}>
              Services
            </motion.span>

            <motion.h1 className="services-hero__title" variants={staggerItem}>
              We turn complex ideas
              <br />
              into <span className="gradient-text">clear experiences.</span>
            </motion.h1>

            <motion.p className="services-hero__text" variants={staggerItem}>
              From brand strategy to digital experiences, we help ambitious
              companies communicate with clarity.
            </motion.p>

            <motion.div variants={staggerItem}>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Start a Project
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="services-hero__labels"
            variants={shouldReduceMotion ? undefined : stagger}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "show"}
          >
            {["Strategy", "Brand", "Communication", "Digital"].map((label, i) => (
              <motion.span
                key={label}
                className="services-hero__label glass animate-float"
                style={{ animationDelay: `${i * 0.4}s` }}
                variants={staggerItem}
              >
                {label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          2 — THE PROBLEM (light)
      ============================================================ */}

      <section className="section services-problem theme-light" data-theme="light">
        <div className="container services-problem__inner">
          <motion.h2 className="services-problem__title" variants={fadeUp} {...motionProps}>
            Great ideas fail when
            <br />
            communication fails.
          </motion.h2>

          <motion.div className="services-problem__flow" variants={stagger} {...motionProps}>
            {["Complex Idea", "Confusion", "Lost Attention"].map((step, index) => (
              <motion.div className="services-problem__step" key={step} variants={staggerItem}>
                <span className="services-problem__node">{step}</span>
                {index < 2 && <span className="services-problem__arrow" aria-hidden="true" />}
              </motion.div>
            ))}
          </motion.div>

          <motion.p className="services-problem__closing gradient-text" variants={fadeUp} {...motionProps}>
            We create the clarity layer.
          </motion.p>
        </div>
      </section>

      {/* ============================================================
          3 — CAPABILITIES (dark) — editorial alternating blocks
      ============================================================ */}

      <section className="section services-capabilities theme-dark" data-theme="dark">
        <div className="container">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            Our Capabilities
          </motion.span>

          <div className="services-capabilities__list">
            {CAPABILITIES.map((service, index) => {
              const Icon = service.icon;
              const reversed = index % 2 !== 0;

              return (
                <motion.article
                  key={service.number}
                  className={[
                    "services-capabilities__block",
                    reversed ? "services-capabilities__block--reverse" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  variants={fadeUp}
                  {...motionProps}
                >
                  <div className="services-capabilities__visual">
                    <span className="services-capabilities__visual-glow" aria-hidden="true" />

                    <div className="services-capabilities__diagram">
                      {service.diagram.map((node, i) => (
                        <div className="services-capabilities__diagram-row" key={node}>
                          <span className="services-capabilities__diagram-node">{node}</span>
                          {i < service.diagram.length - 1 && (
                            <span className="services-capabilities__diagram-line" aria-hidden="true" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="services-capabilities__content">
                    <span className="services-capabilities__number mono">{service.number}</span>

                    <span className="services-capabilities__icon">
                      <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                    </span>

                    <h3 className="services-capabilities__title">{service.title}</h3>
                    <p className="services-capabilities__text">{service.description}</p>

                    <ul className="services-capabilities__bullets">
                      {service.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>

                    <Link
                      to={`/services#${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="services-capabilities__link"
                    >
                      <span>Explore {service.title}</span>
                      <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          4 — THE BIG DAY METHOD (light)
      ============================================================ */}

      <section className="section services-method theme-light" data-theme="light">
        <div className="container">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            How We Work
          </motion.span>

          <motion.div className="services-method__timeline" variants={stagger} {...motionProps}>
            <span className="services-method__line" aria-hidden="true" />

            {METHOD_STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <motion.div className="services-method__step" key={step.number} variants={staggerItem}>
                  <span className="services-method__dot" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.8} />
                  </span>
                  <span className="services-method__number mono">{step.number}</span>
                  <h3 className="services-method__title">{step.title}</h3>
                  <p className="services-method__text">{step.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          5 — WHAT YOU RECEIVE (dark)
      ============================================================ */}

      <section className="section services-deliverables theme-dark" data-theme="dark">
        <div className="container">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            What You Receive
          </motion.span>

          <motion.div className="services-deliverables__grid" variants={stagger} {...motionProps}>
            {DELIVERABLES.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div className="services-deliverables__item" key={item.label} variants={staggerItem}>
                  <span className="services-deliverables__icon">
                    <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="services-deliverables__label">{item.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          6 — WHY BIG DAY (light)
      ============================================================ */}

      <section className="section services-why theme-light" data-theme="light">
        <div className="container">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            Why Big Day
          </motion.span>

          <motion.div className="services-why__grid" variants={stagger} {...motionProps}>
            <motion.div className="services-why__column services-why__column--before" variants={staggerItem}>
              <span className="services-why__column-label">Traditional Agency</span>
            </motion.div>

            <motion.div className="services-why__column services-why__column--after" variants={staggerItem}>
              <span className="services-why__column-label">Big Day</span>
            </motion.div>
          </motion.div>

          <motion.div className="services-why__rows" variants={stagger} {...motionProps}>
            {COMPARISON_ROWS.map((row) => (
              <motion.div className="services-why__row" key={row.before} variants={staggerItem}>
                <span className="services-why__before">{row.before}</span>
                <ArrowRight size={16} strokeWidth={1.8} className="services-why__row-arrow" aria-hidden="true" />
                <span className="services-why__after gradient-text">{row.after}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          7 — FAQ (dark)
      ============================================================ */}

      <section className="section services-faq theme-dark" data-theme="dark">
        <div className="container container-narrow">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            Questions
          </motion.span>

          <motion.div className="services-faq__list" variants={stagger} {...motionProps}>
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <motion.div
                  className={["services-faq__item", isOpen ? "is-open" : ""].filter(Boolean).join(" ")}
                  key={faq.question}
                  variants={staggerItem}
                >
                  <button
                    type="button"
                    className="services-faq__trigger"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span className="services-faq__icon" aria-hidden="true">
                      {isOpen ? <Minus size={16} strokeWidth={2} /> : <Plus size={16} strokeWidth={2} />}
                    </span>
                  </button>

                  <div className="services-faq__panel">
                    <p className="services-faq__answer">{faq.answer}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          8 — FINAL CTA (dark)
      ============================================================ */}

      <section className="services-cta theme-dark" data-theme="dark">
        {!loading && (
          <div className="services-cta__media">
            <SmartVideo project={ctaProject} className="services-cta__video" />
            <div className="services-cta__overlay" />
          </div>
        )}

        <motion.div className="container services-cta__inner" variants={stagger} {...motionProps}>
          <motion.h2 className="services-cta__title" variants={staggerItem}>
            Let&apos;s make your idea
            <br />
            impossible to misunderstand.
          </motion.h2>

          <motion.div variants={staggerItem}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Start a Project
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}