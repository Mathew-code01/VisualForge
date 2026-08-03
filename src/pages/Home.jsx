<<<<<<< Updated upstream
// src\pages\Home.jsx

import Hero from "../components/home/HomeHero";
import WorkGrid from "../components/WorkGrid";
import TrustedBy from "../components/home/TrustedBy";
import ProblemSection from "../components/home/ProblemSection";
import ClaritySection from "../components/home/ClaritySection";
import FeaturedWork from "../components/home/FeaturedWork"
import ServicesOverview from "../components/home/ServicesOverview";
import InsightSection from "../components/home/InsightSection";
import HomeCTA from "../components/home/HomeCTA";
import SiteFooter from "../components/layout/SiteFooter";
import Contact from "./Contact";

import "../styles/pages/home.css";

const Home = () => {
  



  return (
    <main
      
    >
      {/* =====================================================
          HERO
      ====================================================== */}
      <Hero />

      {/* =====================================================
          TRUSTED BY
      ====================================================== */}
      <TrustedBy />

      <ProblemSection/>

      <ClaritySection/>

      <FeaturedWork/>

      <ServicesOverview />

      <InsightSection/>

      <HomeCTA/>

     

=======

/* eslint-disable no-unused-vars */

// src/pages/Home.jsx
// src/pages/Home.jsx
// src/pages/Home.jsx

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Clapperboard,
  Film,
  Palette,
  Sparkles,
  Layers,
  Youtube,
  Search,
  ClipboardList,
  Scissors,
  PackageCheck,
} from "lucide-react";

import HomeHero from "../components/home/HomeHero";
import SmartVideo from "../components/SmartVideo";
import { getVideos } from "../firebase/uploadVideo.js";

import "../styles/pages/home.css";

const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const MotionLink = motion(Link);

const SERVICES = [
  { number: "01", title: "Commercial Video Editing", icon: Clapperboard },
  { number: "02", title: "Wedding Films", icon: Film },
  { number: "03", title: "Social Media Content", icon: Sparkles },
  { number: "04", title: "Motion Graphics", icon: Layers },
  { number: "05", title: "Color Grading", icon: Palette },
  { number: "06", title: "YouTube Editing", icon: Youtube },
];

const PROCESS_STEPS = [
  { number: "01", title: "Discover", icon: Search, text: "We learn your story and goals." },
  { number: "02", title: "Plan", icon: ClipboardList, text: "We map the edit before we cut." },
  { number: "03", title: "Edit", icon: Scissors, text: "We shape footage into film." },
  { number: "04", title: "Deliver", icon: PackageCheck, text: "We ship, polished and on time." },
];

const STATS = [
  { value: "500+", label: "Videos Edited" },
  { value: "50+", label: "Clients" },
  { value: "4K", label: "Quality Delivery" },
];

const WHY_POINTS = [
  "Senior editors on every project",
  "Fixed scope, fixed price",
  "Cinema-grade color and sound",
];

function sortNewestFirst(items) {
  return [...items].sort((a, b) => {
    const aTime = a?.createdAt?.seconds ?? Number(a?.year ?? 0);
    const bTime = b?.createdAt?.seconds ?? Number(b?.year ?? 0);
    return bTime - aTime;
  });
}

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

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
          console.error("Home video load failed:", error);
          setVideos([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    load();
    return () => controller.abort();
  }, []);

  const ordered = useMemo(() => sortNewestFirst(videos), [videos]);

  const heroProject = ordered[0] || null;
  const showreelProjects = ordered.slice(0, 3);
  const beforeProject = ordered[3] || ordered[0] || null;
  const afterProject = ordered[0] || null;
  const aboutProject = ordered[1] || ordered[0] || null;
  const ctaProject = ordered[2] || ordered[0] || null;

  const viewport = { once: true, margin: "-100px" };
  const motionProps = shouldReduceMotion
    ? {}
    : { initial: "hidden", whileInView: "show", viewport };

  return (
    <main className="home">
      {/* ============================================================
          SECTION 1 — CINEMATIC HERO
      ============================================================ */}

      <HomeHero heroProject={heroProject} loading={loading} />

      {/* ============================================================
          SECTION 2 — SHOWREEL / FEATURED WORK
      ============================================================ */}

      <section className="section home-showreel">
        <div className="container-wide">
          <motion.div className="home-showreel__head" variants={fadeUp} {...motionProps}>
            <span className="eyebrow">Featured Work</span>
            <h2 className="home-showreel__title">Showreel</h2>
          </motion.div>

          <motion.div className="home-showreel__list" variants={stagger} {...motionProps}>
            {loading ? (
              <div className="home-showreel__empty">Loading reel…</div>
            ) : showreelProjects.length ? (
              showreelProjects.map((project, index) => (
                <motion.article
                  className="home-showreel__row"
                  key={project.id}
                  variants={staggerItem}
                >
                  <Link to={`/work/${project.id}`} className="home-showreel__media-link">
                    <motion.div
                      className="home-showreel__media"
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    >
                      <SmartVideo project={project} className="home-showreel__video home-media" />
                      <div className="home-showreel__media-overlay" />
                    </motion.div>
                  </Link>

                  <div className="home-showreel__meta">
                    <span className="mono home-showreel__index">0{index + 1}</span>
                    <h3 className="home-showreel__project-title">
                      {project.title || "Untitled Project"}
                    </h3>
                    <span className="home-showreel__category">
                      {project.category || "Selected Work"}
                    </span>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="home-showreel__empty">New work is currently in production.</div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — SERVICES
      ============================================================ */}

      <section className="section home-services">
        <div className="container">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            What We Create
          </motion.span>

          <motion.div className="home-services__list" variants={stagger} {...motionProps}>
            {SERVICES.map((service) => {
              const Icon = service.icon;

              return (
                <motion.div className="home-services__row" key={service.number} variants={staggerItem}>
                  <span className="mono home-services__number">{service.number}</span>
                  <span className="home-services__title">{service.title}</span>
                  <span className="home-services__icon">
                    <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <ArrowUpRight size={20} strokeWidth={1.8} className="home-services__arrow" aria-hidden="true" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4 — BEFORE & AFTER
      ============================================================ */}

      <section className="section home-compare">
        <div className="container">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            The Craft
          </motion.span>

          <motion.h2 className="home-compare__title" variants={fadeUp} {...motionProps}>
            Raw footage, refined.
          </motion.h2>

          <motion.div className="home-compare__grid" variants={stagger} {...motionProps}>
            <motion.div className="home-compare__panel" variants={staggerItem}>
              <span className="home-compare__label">Raw Footage</span>
              <div className="home-compare__media home-compare__media--raw">
                <SmartVideo project={beforeProject} className="home-media" />
              </div>
            </motion.div>

            <motion.div className="home-compare__arrow" variants={staggerItem} aria-hidden="true">
              <span />
              <span />
              <span />
            </motion.div>

            <motion.div className="home-compare__panel" variants={staggerItem}>
              <span className="home-compare__label home-compare__label--final">
                Final Cinematic Result
              </span>
              <div className="home-compare__media home-compare__media--final">
                <SmartVideo project={afterProject} className="home-media" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5 — PROCESS
      ============================================================ */}

      <section className="section home-process">
        <div className="container">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            Our Process
          </motion.span>

          <motion.div className="home-process__timeline" variants={stagger} {...motionProps}>
            <span className="home-process__line" aria-hidden="true" />

            {PROCESS_STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <motion.div className="home-process__step" key={step.number} variants={staggerItem}>
                  <span className="home-process__dot" aria-hidden="true">
                    <Icon size={16} strokeWidth={1.8} />
                  </span>
                  <span className="mono home-process__number">{step.number}</span>
                  <h3 className="home-process__title">{step.title}</h3>
                  <p className="home-process__text">{step.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6 — ABOUT BIG DAY
      ============================================================ */}

      <section className="home-about">
        <div className="home-about__media">
          <SmartVideo project={aboutProject} className="home-about__video home-media" />
          <div className="home-about__overlay" />
        </div>

        <div className="container home-about__content">
          <motion.div variants={stagger} {...motionProps}>
            <motion.span className="eyebrow" variants={staggerItem}>
              About Big Day
            </motion.span>

            <motion.h2 className="home-about__title" variants={staggerItem}>
              We don&apos;t just edit footage. We build cinema.
            </motion.h2>

            <motion.p className="home-about__text" variants={staggerItem}>
              Every frame is graded, paced, and scored with intent — because
              the best stories deserve to be felt, not just watched.
            </motion.p>

            <motion.ul className="home-about__list" variants={stagger}>
              {WHY_POINTS.map((point) => (
                <motion.li key={point} variants={staggerItem}>
                  <Check size={16} strokeWidth={2} aria-hidden="true" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 7 — CLIENT RESULTS
      ============================================================ */}

      <section className="section home-stats">
        <div className="container">
          <motion.div className="home-stats__grid" variants={stagger} {...motionProps}>
            {STATS.map((stat) => (
              <motion.div className="home-stats__item" key={stat.label} variants={staggerItem}>
                <span className="home-stats__value gradient-text">{stat.value}</span>
                <span className="home-stats__label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 8 — FINAL CTA
      ============================================================ */}

      <section className="home-cta">
        <div className="home-cta__media">
          <SmartVideo project={ctaProject} className="home-cta__video home-media" />
          <div className="home-cta__overlay" />
        </div>

        <motion.div
          className="container home-cta__inner"
          variants={stagger}
          {...motionProps}
        >
          <motion.h2 className="home-cta__title" variants={staggerItem}>
            Ready to create
            <br />
            something unforgettable?
          </motion.h2>

          <motion.div variants={staggerItem}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Start Your Project
            </Link>
          </motion.div>
        </motion.div>
      </section>
>>>>>>> Stashed changes
    </main>
  );
};

export default Home;