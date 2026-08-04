// src/pages/Work.jsx

// src/pages/Work.jsx

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Play, Quote } from "lucide-react";

import SmartVideo from "../components/SmartVideo";
import { getVideos } from "../firebase/uploadVideo.js";

import aflluxeLogo from "../assets/trusted/AFLLUXE-04.png";
import coloredBlackLogo from "../assets/trusted/Colored black.png";
import expetHubLogo from "../assets/trusted/Expet hub-05.png";
import newkrooLogo from "../assets/trusted/newkroo-logo-BBgxBlWa.png";
import ziboraLogo from "../assets/trusted/Zibora LOGO-02.png";
import zidexLogo from "../assets/trusted/zidex-logo-master.png";

import "../styles/pages/work.css";

const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const HERO_TAGS = ["Commercial", "Brand", "Motion", "Product", "Web", "Storytelling"];

const TRUSTED_LOGOS = [
  { name: "AFL Luxe", src: aflluxeLogo },
  { name: "Colored Black", src: coloredBlackLogo },
  { name: "ExPet Hub", src: expetHubLogo },
  { name: "Newkroo", src: newkrooLogo },
  { name: "Zibora", src: ziboraLogo },
  { name: "Zidex", src: zidexLogo },
];

const TESTIMONIALS = [
  { quote: "Exactly what we imagined.", client: "AFL Luxe", logo: aflluxeLogo },
  { quote: "Our audience finally understood the product.", client: "Newkroo", logo: newkrooLogo },
  { quote: "The quality exceeded expectations.", client: "Zibora", logo: ziboraLogo },
];

const STATS = [
  { value: "500+", label: "Projects" },
  { value: "50+", label: "Clients" },
  { value: "4K", label: "Delivery" },
];

const EDIT_STAGES = ["Raw", "Color", "Motion", "Final"];
const PROCESS_STAGES = ["Brief", "Storyboard", "Edit", "Delivery"];

const MASONRY_SPANS = ["normal", "tall", "wide", "normal", "tall", "wide"];

function sortNewestFirst(items) {
  return [...items].sort((a, b) => {
    const aTime = a?.createdAt?.seconds ?? Number(a?.year ?? 0);
    const bTime = b?.createdAt?.seconds ?? Number(b?.year ?? 0);
    return bTime - aTime;
  });
}

function ProjectCard({ project, index, variant = "grid" }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className={`work-card work-card--${variant}`}
      variants={staggerItem}
    >
      <Link to={`/work/${project.id}`} className="work-card__link" aria-label={project.title || "View project"}>
        <div className="work-card__media">
          <SmartVideo project={project} className="work-card__video" />
          <div className="work-card__overlay" />

          <div className="work-card__top">
            <span className="work-card__category">{project.category || "Selected Work"}</span>
            {project.resolution && <span className="work-card__meta mono">{project.resolution}</span>}
          </div>

          <span className="work-card__play" aria-hidden="true">
            <Play size={16} strokeWidth={0} fill="currentColor" />
          </span>

          <div className="work-card__bottom">
            <div className="work-card__info">
              <h3 className="work-card__title">{project.title || `Project ${number}`}</h3>

              <div className="work-card__details mono">
                {project.client && <span>{project.client}</span>}
                {project.duration && <span>{project.duration}</span>}
              </div>
            </div>

            <span className="work-card__arrow" aria-hidden="true">
              <ArrowUpRight size={16} strokeWidth={1.8} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Work() {
  const shouldReduceMotion = useReducedMotion();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

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
          console.error("Work video load failed:", error);
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
  const featuredProjects = ordered.slice(0, 6);
  const highlightProject = ordered[0] || null;
  const editShowcaseProject = ordered[2] || ordered[0] || null;

  /* Categories derived from real fetched data, so every filter chip
     shown is guaranteed to actually return results. */
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(ordered.map((p) => p.category).filter(Boolean))
    );
    return ["All", ...unique];
  }, [ordered]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return ordered;
    return ordered.filter((p) => p.category === activeCategory);
  }, [ordered, activeCategory]);

  const viewport = { once: true, margin: "-100px" };
  const motionProps = shouldReduceMotion
    ? {}
    : { initial: "hidden", whileInView: "show", viewport };

  return (
    <main className="work-page">
      {/* ============================================================
          1 — HERO (dark, video)
      ============================================================ */}

      <section className="work-hero theme-dark" data-theme="dark">
        {!loading && (
          <div className="work-hero__media">
            <SmartVideo project={heroProject} className="work-hero__video" />
            <div className="work-hero__overlay" />
          </div>
        )}

        <div className="work-hero__glow" aria-hidden="true" />

        <div className="container work-hero__inner">
          <motion.div
            variants={stagger}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "show"}
          >
            <motion.span className="eyebrow" variants={staggerItem}>
              Work
            </motion.span>

            <motion.h1 className="work-hero__title" variants={staggerItem}>
              Stories people <span className="gradient-text">remember.</span>
            </motion.h1>

            <motion.p className="work-hero__text" variants={staggerItem}>
              A collection of films, brands, and digital experiences created
              for ambitious companies.
            </motion.p>

            <motion.div className="work-hero__actions" variants={staggerItem}>
              <a href="#featured-work" className="btn btn-primary btn-lg">
                Explore Projects
                <ArrowRight size={16} strokeWidth={2} />
              </a>

              <Link to="/contact" className="btn btn-secondary btn-lg">
                Start a Project
              </Link>
            </motion.div>

            <motion.div className="work-hero__tags" variants={stagger}>
              {HERO_TAGS.map((tag) => (
                <motion.span className="work-hero__tag" key={tag} variants={staggerItem}>
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          2 — FEATURED WORK (light, masonry)
      ============================================================ */}

      <section id="featured-work" className="section work-featured theme-light" data-theme="light">
        <div className="container">
          <motion.div className="work-featured__head" variants={fadeUp} {...motionProps}>
            <span className="eyebrow">Featured Work</span>
            <span className="work-featured__count mono">
              {loading ? "—" : `${featuredProjects.length} Selected Projects`}
            </span>
          </motion.div>

          <motion.div className="work-featured__grid" variants={stagger} {...motionProps}>
            {loading ? (
              <div className="work-empty">Loading projects…</div>
            ) : featuredProjects.length ? (
              featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`work-featured__cell work-featured__cell--${MASONRY_SPANS[index % MASONRY_SPANS.length]}`}
                >
                  <ProjectCard project={project} index={index} variant="featured" />
                </div>
              ))
            ) : (
              <div className="work-empty">New work is currently in production.</div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          3 — FILTER + PORTFOLIO GRID (dark)
      ============================================================ */}

      <section className="section work-grid-section theme-dark" data-theme="dark">
        <div className="container">
          <motion.div className="work-grid__head" variants={fadeUp} {...motionProps}>
            <span className="eyebrow">Portfolio</span>
            <span className="work-grid__count mono">
              {loading ? "—" : `${filteredProjects.length} Projects`}
            </span>
          </motion.div>

          {categories.length > 1 && (
            <motion.div className="work-filter" variants={stagger} {...motionProps}>
              {categories.map((category) => (
                <motion.button
                  type="button"
                  key={category}
                  className={[
                    "work-filter__chip",
                    activeCategory === category ? "is-active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setActiveCategory(category)}
                  variants={staggerItem}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          )}

          <motion.div className="work-grid" variants={stagger} {...motionProps}>
            {loading ? (
              <div className="work-empty">Loading projects…</div>
            ) : filteredProjects.length ? (
              filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} variant="grid" />
              ))
            ) : (
              <div className="work-empty">No projects in this category yet.</div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          4 — SELECTED PROJECT HIGHLIGHT (light)
      ============================================================ */}

      {highlightProject && (
        <section className="work-highlight theme-light" data-theme="light">
          <div className="work-highlight__media">
            <SmartVideo project={highlightProject} className="work-highlight__video" />
            <div className="work-highlight__overlay" />
          </div>

          <div className="container work-highlight__inner">
            <motion.div variants={stagger} {...motionProps}>
              <motion.span className="eyebrow work-highlight__eyebrow" variants={staggerItem}>
                Featured Case Study
              </motion.span>

              <motion.h2 className="work-highlight__title" variants={staggerItem}>
                {highlightProject.title || "Selected Work"}
              </motion.h2>

              {highlightProject.description && (
                <motion.p className="work-highlight__text" variants={staggerItem}>
                  {highlightProject.description}
                </motion.p>
              )}

              <motion.div className="work-highlight__actions" variants={staggerItem}>
                <a href={highlightProject.url} target="_blank" rel="noreferrer" className="btn btn-primary">
                  Watch Film
                  <Play size={14} strokeWidth={0} fill="currentColor" />
                </a>

                <Link to={`/work/${highlightProject.id}`} className="btn btn-secondary">
                  Read Case Study
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ============================================================
          5 — BEHIND THE EDIT (dark)
      ============================================================ */}

      <section className="section work-edit theme-dark" data-theme="dark">
        <div className="container">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            Behind The Edit
          </motion.span>

          <motion.div className="work-edit__timeline" variants={stagger} {...motionProps}>
            <span className="work-edit__line" aria-hidden="true" />

            {EDIT_STAGES.map((stage, index) => (
              <motion.div className="work-edit__stage" key={stage} variants={staggerItem}>
                <span className="work-edit__dot" aria-hidden="true" />
                <span className="work-edit__number mono">0{index + 1}</span>
                <span className="work-edit__label">{stage}</span>
              </motion.div>
            ))}
          </motion.div>

          {editShowcaseProject && (
            <motion.div className="work-edit__media" variants={fadeUp} {...motionProps}>
              <SmartVideo project={editShowcaseProject} className="work-media" />
            </motion.div>
          )}
        </div>
      </section>

      {/* ============================================================
          6 — CLIENT RESULTS (light)
      ============================================================ */}

      <section className="section work-results theme-light" data-theme="light">
        <div className="container">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            Client Results
          </motion.span>

          <motion.div className="work-results__grid" variants={stagger} {...motionProps}>
            {TESTIMONIALS.map((item) => (
              <motion.figure className="work-results__card" key={item.client} variants={staggerItem}>
                <Quote size={22} strokeWidth={1.6} className="work-results__quote-icon" aria-hidden="true" />
                <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>

                <figcaption>
                  <img src={item.logo} alt={item.client} className="work-results__logo" />
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>

          <motion.div className="work-results__stats" variants={stagger} {...motionProps}>
            {STATS.map((stat) => (
              <motion.div className="work-results__stat" key={stat.label} variants={staggerItem}>
                <span className="work-results__stat-value gradient-text">{stat.value}</span>
                <span className="work-results__stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          7 — LOGO WALL (dark)
      ============================================================ */}

      <section className="work-logos theme-dark" data-theme="dark">
        <div className="container">
          <motion.span className="eyebrow work-logos__label" variants={fadeUp} {...motionProps}>
            Worked With
          </motion.span>
        </div>

        <div className="work-logos__marquee">
          <div className="work-logos__track">
            {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((logo, index) => (
              <div className="work-logos__item" key={`${logo.name}-${index}`}>
                <img src={logo.src} alt={logo.name} className="work-logos__logo" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          8 — PROCESS STRIP (light)
      ============================================================ */}

      <section className="work-process theme-light" data-theme="light">
        <div className="container">
          <motion.div className="work-process__row" variants={stagger} {...motionProps}>
            {PROCESS_STAGES.map((stage, index) => (
              <motion.div className="work-process__stage" key={stage} variants={staggerItem}>
                <span>{stage}</span>
                {index < PROCESS_STAGES.length - 1 && (
                  <ArrowRight size={16} strokeWidth={1.8} className="work-process__arrow" aria-hidden="true" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          9 — FINAL CTA (dark, video)
      ============================================================ */}

      <section className="work-cta theme-dark" data-theme="dark">
        {!loading && (
          <div className="work-cta__media">
            <SmartVideo project={ctaProject} className="work-cta__video" />
            <div className="work-cta__overlay" />
          </div>
        )}

        <motion.div className="container work-cta__inner" variants={stagger} {...motionProps}>
          <motion.h2 className="work-cta__title" variants={staggerItem}>
            Ready to create something memorable?
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