

// src/components/home/HomeHero.jsx
// src/components/home/HomeHero.jsx

import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";

import SmartVideo from "../SmartVideo";

import "../../styles/components/homeHero.css";

const EASE = [0.16, 1, 0.3, 1];

const HEADLINE_LINES = ["We create", "visual stories", "that move people."];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.5 } },
};

const line = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  delay: `${(i % 7) * 0.6}s`,
  duration: `${9 + (i % 5)}s`,
}));

export default function HomeHero({ heroProject, loading }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="home-hero" aria-label="BIG DAY — cinematic introduction">
      {/* ============================================================
          BACKGROUND VIDEO
      ============================================================ */}

      {!loading && (
        <div className="home-hero__background">
          <SmartVideo project={heroProject} className="home-hero__background-video" />

          <div className="home-hero__overlay" />
          <div className="home-hero__vignette" />

          <div className="home-hero__light home-hero__light--one" />
          <div className="home-hero__light home-hero__light--two" />

          <div className="home-hero__grain" aria-hidden="true" />
        </div>
      )}

      {/* ============================================================
          AMBIENT PARTICLES
      ============================================================ */}

      <div className="home-hero__particles" aria-hidden="true">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="home-hero__particle"
            style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
          />
        ))}
      </div>

      {/* ============================================================
          BRAND MARK
      ============================================================ */}

      <motion.div
        className="home-hero__mark"
        initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        BIG DAY
      </motion.div>

      {/* ============================================================
          CENTER CONTENT
      ============================================================ */}

      <div className="home-hero__inner">
        <motion.h1
          className="home-hero__title"
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? undefined : "show"}
        >
          {HEADLINE_LINES.map((text) => (
            <motion.span
              key={text}
              className="home-hero__title-line"
              variants={shouldReduceMotion ? undefined : line}
            >
              {text}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="home-hero__description"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.15 }}
        >
          Professional video editing, cinematic storytelling, and visual
          experiences for brands and creators.
        </motion.p>

        <motion.div
          className="home-hero__actions"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.35 }}
        >
          <button type="button" className="home-hero__reel-btn">
            <span className="home-hero__reel-icon">
              <Play size={13} strokeWidth={0} fill="currentColor" />
            </span>
            Watch Showreel
          </button>

          <Link to="/contact" className="btn btn-primary btn-lg">
            Start Project
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </motion.div>
      </div>

      {/* ============================================================
          SCROLL INDICATOR — bottom right
      ============================================================ */}

      <motion.div
        className="home-hero__scroll"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.7 }}
      >
        <div className="home-hero__scroll-content">
          <span>Scroll</span>
          <strong>Explore</strong>
          <small className="mono">01 / 09</small>
        </div>

        <span className="home-hero__scroll-line">
          <motion.span
            className="home-hero__scroll-fill"
            animate={shouldReduceMotion ? undefined : { y: ["-100%", "100%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}