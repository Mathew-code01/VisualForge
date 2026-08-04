// src/pages/About.jsx

// src/pages/About.jsx
// src/pages/About.jsx
// src/pages/About.jsx
// src/pages/About.jsx

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Eye,
  Layers,
  Sparkles,
  Compass,
  Users,
  Repeat,
  Target,
  Search,
  Wand2,
  PenTool,
  RefreshCw,
  Quote,
} from "lucide-react";

import SmartVideo from "../components/SmartVideo";
import { getVideos } from "../firebase/uploadVideo.js";

import aflluxeLogo from "../assets/trusted/AFLLUXE-04.png";
import coloredBlackLogo from "../assets/trusted/Colored black.png";
import expetHubLogo from "../assets/trusted/Expet hub-05.png";
import newkrooLogo from "../assets/trusted/newkroo-logo-BBgxBlWa.png";
import ziboraLogo from "../assets/trusted/Zibora LOGO-02.png";
import zidexLogo from "../assets/trusted/zidex-logo-master.png";

import "../styles/pages/about.css";

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

const PILLARS = [
  {
    label: "Purpose",
    text: "To make complexity feel effortless to understand.",
  },
  {
    label: "Vision",
    text: "A world where great ideas are never lost in translation.",
  },
  {
    label: "Mission",
    text: "We craft strategy, design, and story into one clear voice.",
  },
];

const VALUES = [
  { icon: Eye, title: "Clarity", text: "We remove everything that isn't the idea." },
  { icon: Layers, title: "Craft", text: "Every frame, every pixel, considered." },
  { icon: Sparkles, title: "Curiosity", text: "We ask why before we ask how." },
  { icon: Users, title: "Collaboration", text: "The best work is never made alone." },
  { icon: Repeat, title: "Consistency", text: "Excellence, delivered the same way, every time." },
  { icon: Target, title: "Impact", text: "If it doesn't move people, it isn't finished." },
];

const STATS = [
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Clients" },
  { value: 8, suffix: "+", label: "Years Creating" },
  { value: 4, suffix: "K", label: "Delivery Quality" },
  { value: 100, suffix: "%", label: "Attention to Detail" },
];

const THINKING_STEPS = [
  { number: "01", title: "Understand", icon: Search, text: "We learn the business and the blocker." },
  { number: "02", title: "Simplify", icon: Wand2, text: "We strip the idea to what actually matters." },
  { number: "03", title: "Create", icon: PenTool, text: "We give the idea a form worth remembering." },
  { number: "04", title: "Refine", icon: RefreshCw, text: "We sharpen until nothing is left to remove." },
];

const TRUSTED_LOGOS = [
  { name: "AFL Luxe", src: aflluxeLogo },
  { name: "Colored Black", src: coloredBlackLogo },
  { name: "ExPet Hub", src: expetHubLogo },
  { name: "Newkroo", src: newkrooLogo },
  { name: "Zibora", src: ziboraLogo },
  { name: "Zidex", src: zidexLogo },
];

const TESTIMONIALS = [
  { quote: "Working with Big Day completely changed how customers understood our product.", client: "AFL Luxe" },
  { quote: "They didn't just make it look good. They made it make sense.", client: "Newkroo" },
  { quote: "Every deliverable felt considered, never generic.", client: "Zibora" },
];

const MASONRY_SPANS = ["tall", "normal", "wide", "normal", "wide", "tall"];

function sortNewestFirst(items) {
  return [...items].sort((a, b) => {
    const aTime = a?.createdAt?.seconds ?? Number(a?.year ?? 0);
    const bTime = b?.createdAt?.seconds ?? Number(b?.year ?? 0);
    return bTime - aTime;
  });
}

function useCountUp(target, duration = 1600) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;

    if (shouldReduceMotion) {
      setValue(target);
      return;
    }

    let frame;
    const start = performance.now();

    const tick = (now) => {
      const ratio = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setValue(Math.round(eased * target));

      if (ratio < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, shouldReduceMotion]);

  return [ref, value];
}

function StatItem({ stat }) {
  const [ref, value] = useCountUp(stat.value);

  return (
    <motion.div className="about-stats__item" variants={staggerItem} ref={ref}>
      <span className="about-stats__value gradient-text">
        {value}
        {stat.suffix}
      </span>
      <span className="about-stats__label">{stat.label}</span>
    </motion.div>
  );
}

export default function About() {
  const shouldReduceMotion = useReducedMotion();
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
          console.error("About video load failed:", error);
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
  const storyProject = ordered[1] || ordered[0] || null;
  const philosophyProject = ordered[2] || ordered[0] || null;
  const ctaProject = ordered[3] || ordered[0] || null;
  const cultureProjects = useMemo(() => {
    if (!ordered.length) return [];
    return Array.from({ length: 6 }, (_, i) => ordered[i % ordered.length]);
  }, [ordered]);

  const viewport = { once: true, margin: "-100px" };
  const motionProps = shouldReduceMotion
    ? {}
    : { initial: "hidden", whileInView: "show", viewport };

  return (
    <main className="about-page">
      {/* ============================================================
          1 — HERO (dark)
      ============================================================ */}

      <section className="about-hero theme-dark" data-theme="dark">
        {!loading && (
          <div className="about-hero__media">
            <SmartVideo project={heroProject} className="about-hero__video" />
            <div className="about-hero__overlay" />
          </div>
        )}

        <div className="about-hero__glow" aria-hidden="true" />

        <div className="container about-hero__inner">
          <motion.div
            variants={stagger}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "show"}
          >
            <motion.span className="eyebrow" variants={staggerItem}>
              About
            </motion.span>

            <motion.h1 className="about-hero__title" variants={staggerItem}>
              We believe every great idea
              <br />
              deserves to be <span className="gradient-text">understood.</span>
            </motion.h1>

            <motion.p className="about-hero__text" variants={staggerItem}>
              Big Day helps ambitious companies transform complexity into
              clear communication through strategy, design, and visual
              storytelling.
            </motion.p>

            <motion.div className="about-hero__actions" variants={staggerItem}>
              <Link to="/work" className="btn btn-secondary btn-lg">
                Our Work
              </Link>

              <Link to="/contact" className="btn btn-primary btn-lg">
                Start a Project
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          2 — OUR STORY (light)
      ============================================================ */}

      <section className="section about-story theme-light" data-theme="light">
        <div className="container">
          <div className="about-story__grid">
            <motion.div className="about-story__media media-frame" variants={fadeUp} {...motionProps}>
              <SmartVideo project={storyProject} className="about-media" />
            </motion.div>

            <motion.div className="about-story__content" variants={stagger} {...motionProps}>
              <motion.span className="eyebrow" variants={staggerItem}>
                Our Story
              </motion.span>

              <motion.h2 className="about-story__title" variants={staggerItem}>
                Built for clarity.
              </motion.h2>

              <motion.p className="about-story__text" variants={staggerItem}>
                We started Big Day with one belief: great ideas fail when
                people don&apos;t understand them. Everything we create exists
                to make ideas easier to see, feel, and remember.
              </motion.p>
            </motion.div>
          </div>

          <motion.div className="about-story__pillars" variants={stagger} {...motionProps}>
            {PILLARS.map((pillar) => (
              <motion.div className="about-story__pillar" key={pillar.label} variants={staggerItem}>
                <span className="about-story__pillar-label">{pillar.label}</span>
                <p>{pillar.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          3 — OUR VALUES (dark)
      ============================================================ */}

      <section className="section about-values theme-dark" data-theme="dark">
        <div className="container">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            Our Values
          </motion.span>

          <motion.div className="about-values__grid" variants={stagger} {...motionProps}>
            {VALUES.map((value) => {
              const Icon = value.icon;

              return (
                <motion.div
                  className="about-values__card glass"
                  key={value.title}
                  variants={staggerItem}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <span className="about-values__icon">
                    <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="about-values__title">{value.title}</h3>
                  <p className="about-values__text">{value.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          4 — BY THE NUMBERS (light)
      ============================================================ */}

      <section className="section about-stats theme-light" data-theme="light">
        <div className="container">
          <motion.div className="about-stats__grid" variants={stagger} {...motionProps}>
            {STATS.map((stat) => (
              <StatItem stat={stat} key={stat.label} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          5 — OUR PHILOSOPHY (dark)
      ============================================================ */}

      <section className="section about-philosophy theme-dark" data-theme="dark">
        <div className="container">
          <div className="about-philosophy__grid">
            <motion.div className="about-philosophy__content" variants={stagger} {...motionProps}>
              <Quote size={32} strokeWidth={1.4} className="about-philosophy__icon" aria-hidden="true" />

              <motion.h2 className="about-philosophy__quote" variants={staggerItem}>
                We don&apos;t create videos.
                <br />
                <span className="gradient-text">We create understanding.</span>
              </motion.h2>
            </motion.div>

            <motion.div className="about-philosophy__media media-frame" variants={fadeUp} {...motionProps}>
              <SmartVideo project={philosophyProject} className="about-media" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          6 — HOW WE THINK (light)
      ============================================================ */}

      <section className="section about-thinking theme-light" data-theme="light">
        <div className="container">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            How We Think
          </motion.span>

          <motion.div className="about-thinking__row" variants={stagger} {...motionProps}>
            <span className="about-thinking__line" aria-hidden="true" />

            {THINKING_STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <motion.div className="about-thinking__step" key={step.number} variants={staggerItem}>
                  <span className="about-thinking__dot" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.8} />
                  </span>
                  <span className="about-thinking__number mono">{step.number}</span>
                  <h3 className="about-thinking__title">{step.title}</h3>
                  <p className="about-thinking__text">{step.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          7 — STUDIO CULTURE (dark)
      ============================================================ */}

      <section className="section about-culture theme-dark" data-theme="dark">
        <div className="container">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            Studio Culture
          </motion.span>

          <motion.div className="about-culture__grid" variants={stagger} {...motionProps}>
            {cultureProjects.map((project, index) => (
              <motion.div
                key={`${project?.id || "culture"}-${index}`}
                className={`about-culture__cell about-culture__cell--${MASONRY_SPANS[index % MASONRY_SPANS.length]}`}
                variants={staggerItem}
              >
                <SmartVideo project={project} className="about-media" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          8 — RECOGNITION (light)
      ============================================================ */}

      <section className="section about-recognition theme-light" data-theme="light">
        <div className="container">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            Trusted By
          </motion.span>

          <div className="about-recognition__marquee">
            <div className="about-recognition__track">
              {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((logo, index) => (
                <div className="about-recognition__item" key={`${logo.name}-${index}`}>
                  <img src={logo.src} alt={logo.name} className="about-recognition__logo" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <motion.div className="about-recognition__grid" variants={stagger} {...motionProps}>
            {TESTIMONIALS.map((item) => (
              <motion.figure className="about-recognition__card" key={item.client} variants={staggerItem}>
                <Quote size={20} strokeWidth={1.6} className="about-recognition__quote-icon" aria-hidden="true" />
                <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
                <figcaption>{item.client}</figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          9 — FINAL CTA (dark)
      ============================================================ */}

      <section className="about-cta theme-dark" data-theme="dark">
        {!loading && (
          <div className="about-cta__media">
            <SmartVideo project={ctaProject} className="about-cta__video" />
            <div className="about-cta__overlay" />
          </div>
        )}

        <motion.div className="container about-cta__inner" variants={stagger} {...motionProps}>
          <motion.h2 className="about-cta__title" variants={staggerItem}>
            Let&apos;s create something people remember.
          </motion.h2>

          <motion.div className="about-cta__actions" variants={staggerItem}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Start a Project
              <ArrowRight size={16} strokeWidth={2} />
            </Link>

            <Link to="/work" className="btn btn-secondary btn-lg">
              View Our Work
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}