
// src/pages/Insights.jsx

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Mail,
  ClipboardList,
  FileText,
  MessageSquare,
  Rocket,
} from "lucide-react";

import SmartVideo from "../components/SmartVideo";
import { getVideos } from "../firebase/uploadVideo.js";

import "../styles/pages/insights.css";

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

const HERO_KEYWORDS = [
  "Strategy",
  "Design",
  "Motion",
  "Storytelling",
  "Communication",
  "Brand",
  "Creative Thinking",
];

const FEATURED_ARTICLES = [
  {
    id: "clarity-over-creativity",
    category: "Brand Strategy",
    readTime: "5 min",
    title: "Why clarity beats creativity.",
    excerpt: "Clever rarely wins. Clear always does.",
  },
  {
    id: "storyboard-first",
    category: "Creative Process",
    readTime: "4 min",
    title: "The case for storyboarding everything.",
    excerpt: "The best edits are decided before the camera rolls.",
  },
  {
    id: "motion-with-meaning",
    category: "Motion",
    readTime: "6 min",
    title: "Motion should clarify, not decorate.",
    excerpt: "Every animation needs a reason to exist.",
  },
];

const CATEGORIES = [
  "All",
  "Brand",
  "Strategy",
  "Motion",
  "Design",
  "Storytelling",
  "Creative Process",
  "Communication",
  "UI/UX",
  "Digital",
];

const ARTICLES = [
  { id: "a1", category: "Brand", date: "Jan 12", readTime: "4 min", title: "What makes a brand feel trustworthy.", excerpt: "Trust is designed, not assumed." },
  { id: "a2", category: "Strategy", date: "Jan 08", readTime: "5 min", title: "Positioning before pixels.", excerpt: "Design can't fix an unclear strategy." },
  { id: "a3", category: "Motion", date: "Dec 29", readTime: "3 min", title: "The 3-second rule in video editing.", excerpt: "Attention is earned in the first cut." },
  { id: "a4", category: "Design", date: "Dec 21", readTime: "4 min", title: "Typography as tone of voice.", excerpt: "Fonts say things words don't." },
  { id: "a5", category: "Storytelling", date: "Dec 14", readTime: "6 min", title: "Structure is the story.", excerpt: "Great narratives share the same bones." },
  { id: "a6", category: "Creative Process", date: "Dec 05", readTime: "5 min", title: "How we run a kickoff call.", excerpt: "Good questions save weeks of revisions." },
  { id: "a7", category: "Communication", date: "Nov 27", readTime: "4 min", title: "Simplify before you explain.", excerpt: "Complexity is a design failure." },
  { id: "a8", category: "UI/UX", date: "Nov 19", readTime: "5 min", title: "Interfaces should disappear.", excerpt: "The best UI is the one nobody notices." },
  { id: "a9", category: "Digital", date: "Nov 10", readTime: "4 min", title: "Websites are first impressions now.", excerpt: "You have seconds, not minutes." },
];

const STUDIO_NOTES = [
  "Why we storyboard first.",
  "Every edit needs intention.",
  "Good branding removes friction.",
  "Motion should clarify.",
  "Typography communicates emotion.",
  "Ideas travel faster when simplified.",
];

const RESOURCES = [
  { icon: ClipboardList, title: "Brand Checklist", text: "Everything a brand system needs." },
  { icon: FileText, title: "Creative Brief Template", text: "Start every project aligned." },
  { icon: MessageSquare, title: "Messaging Framework", text: "Say the right thing, clearly." },
  { icon: Rocket, title: "Project Kickoff Guide", text: "The first 48 hours, mapped out." },
];

function sortNewestFirst(items) {
  return [...items].sort((a, b) => {
    const aTime = a?.createdAt?.seconds ?? Number(a?.year ?? 0);
    const bTime = b?.createdAt?.seconds ?? Number(b?.year ?? 0);
    return bTime - aTime;
  });
}

export default function Insights() {
  const shouldReduceMotion = useReducedMotion();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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
          console.error("Insights video load failed:", error);
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
  const newsletterProject = ordered[1] || ordered[0] || null;
  const ctaProject = ordered[2] || ordered[0] || null;

  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") return ARTICLES;
    return ARTICLES.filter((article) => article.category === activeCategory);
  }, [activeCategory]);

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const viewport = { once: true, margin: "-100px" };
  const motionProps = shouldReduceMotion
    ? {}
    : { initial: "hidden", whileInView: "show", viewport };

  return (
    <main className="insights-page">
      {/* ============================================================
          1 — HERO (dark)
      ============================================================ */}

      <section className="insights-hero theme-dark" data-theme="dark">
        {!loading && (
          <div className="insights-hero__media">
            <SmartVideo project={heroProject} className="insights-hero__video" />
            <div className="insights-hero__overlay" />
          </div>
        )}

        <div className="insights-hero__glow" aria-hidden="true" />

        <div className="container insights-hero__inner">
          <motion.div
            variants={stagger}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "show"}
          >
            <motion.span className="eyebrow" variants={staggerItem}>
              Insights
            </motion.span>

            <motion.h1 className="insights-hero__title" variants={staggerItem}>
              Ideas worth <span className="gradient-text">sharing.</span>
            </motion.h1>

            <motion.p className="insights-hero__text" variants={staggerItem}>
              Thoughts on branding, storytelling, design and communication
              from the Big Day studio.
            </motion.p>

            <motion.div className="insights-hero__actions" variants={staggerItem}>
              <a href="#featured-insights" className="btn btn-primary btn-lg">
                Read Articles
                <ArrowRight size={16} strokeWidth={2} />
              </a>

              <Link to="/contact" className="btn btn-secondary btn-lg">
                Start a Project
              </Link>
            </motion.div>
          </motion.div>

          <motion.div className="insights-hero__keywords" variants={stagger} {...motionProps}>
            {HERO_KEYWORDS.map((word, index) => (
              <motion.span
                key={word}
                className="insights-hero__keyword glass animate-float"
                style={{ animationDelay: `${index * 0.35}s` }}
                variants={staggerItem}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          2 — FEATURED INSIGHTS (light)
      ============================================================ */}

      <section id="featured-insights" className="section insights-featured theme-light" data-theme="light">
        <div className="container">
          <motion.div className="insights-featured__head" variants={fadeUp} {...motionProps}>
            <span className="eyebrow">Featured Articles</span>
            <h2 className="insights-featured__title">Latest thinking from the studio.</h2>
          </motion.div>

          <motion.div className="insights-featured__grid" variants={stagger} {...motionProps}>
            {FEATURED_ARTICLES.map((article) => (
              <motion.article className="insights-featured__card" key={article.id} variants={staggerItem}>
                <Link to={`/insights/${article.id}`} className="insights-featured__link">
                  <div className="insights-featured__thumb" aria-hidden="true">
                    <span className="insights-featured__thumb-glow" />
                  </div>

                  <div className="insights-featured__meta">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="insights-featured__card-title">{article.title}</h3>
                  <p className="insights-featured__excerpt">{article.excerpt}</p>

                  <span className="insights-featured__read">
                    Read Article
                    <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          3 — CATEGORIES (dark)
      ============================================================ */}

      <section className="insights-categories theme-dark" data-theme="dark">
        <div className="container">
          <motion.div className="insights-categories__row" variants={stagger} {...motionProps}>
            {CATEGORIES.map((category) => (
              <motion.button
                type="button"
                key={category}
                className={[
                  "insights-categories__chip",
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
        </div>
      </section>

      {/* ============================================================
          4 — ARTICLE GRID (dark)
      ============================================================ */}

      <section className="section insights-grid-section theme-dark" data-theme="dark">
        <div className="container">
          <motion.div className="insights-grid" variants={stagger} {...motionProps}>
            {filteredArticles.map((article) => (
              <motion.article className="insights-card" key={article.id} variants={staggerItem}>
                <Link to={`/insights/${article.id}`} className="insights-card__link">
                  <div className="insights-card__thumb" aria-hidden="true">
                    <span className="insights-card__thumb-glow" />
                  </div>

                  <div className="insights-card__meta">
                    <span>{article.category}</span>
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="insights-card__title">{article.title}</h3>
                  <p className="insights-card__excerpt">{article.excerpt}</p>

                  <span className="insights-card__read">
                    Read
                    <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          5 — BIG FEATURE ARTICLE (light)
      ============================================================ */}

      <section className="section insights-spotlight theme-light" data-theme="light">
        <div className="container">
          <div className="insights-spotlight__grid">
            <motion.div className="insights-spotlight__media media-frame" variants={fadeUp} {...motionProps}>
              <div className="insights-spotlight__thumb" aria-hidden="true">
                <span className="insights-spotlight__thumb-glow" />
              </div>
            </motion.div>

            <motion.div className="insights-spotlight__content" variants={stagger} {...motionProps}>
              <motion.span className="eyebrow" variants={staggerItem}>
                Spotlight
              </motion.span>

              <motion.h2 className="insights-spotlight__title" variants={staggerItem}>
                The Hidden Cost of Confusing Brands
              </motion.h2>

              <motion.p className="insights-spotlight__text" variants={staggerItem}>
                How simplifying communication creates stronger businesses.
              </motion.p>

              <motion.div className="insights-spotlight__actions" variants={staggerItem}>
                <Link to="/insights/hidden-cost-of-confusing-brands" className="btn btn-primary">
                  Read Story
                  <ArrowRight size={15} strokeWidth={2} />
                </Link>

                <button type="button" className="btn btn-secondary">
                  Share
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          6 — STUDIO NOTES (dark)
      ============================================================ */}

      <section className="section insights-notes theme-dark" data-theme="dark">
        <div className="container">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            Studio Notes
          </motion.span>

          <motion.div className="insights-notes__grid" variants={stagger} {...motionProps}>
            {STUDIO_NOTES.map((note) => (
              <motion.div className="insights-notes__card glass" key={note} variants={staggerItem}>
                <p>{note}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          7 — RESOURCES (light)
      ============================================================ */}

      <section className="section insights-resources theme-light" data-theme="light">
        <div className="container">
          <motion.span className="eyebrow" variants={fadeUp} {...motionProps}>
            Resources
          </motion.span>

          <motion.div className="insights-resources__grid" variants={stagger} {...motionProps}>
            {RESOURCES.map((resource) => {
              const Icon = resource.icon;

              return (
                <motion.a
                  href="#"
                  className="insights-resources__card"
                  key={resource.title}
                  variants={staggerItem}
                  onClick={(event) => event.preventDefault()}
                >
                  <span className="insights-resources__icon">
                    <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </span>

                  <h3 className="insights-resources__title">{resource.title}</h3>
                  <p className="insights-resources__text">{resource.text}</p>

                  <span className="insights-resources__download">
                    Download
                    <Download size={15} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          8 — NEWSLETTER (dark)
      ============================================================ */}

      <section className="insights-newsletter theme-dark" data-theme="dark">
        {!loading && (
          <div className="insights-newsletter__media">
            <SmartVideo project={newsletterProject} className="insights-newsletter__video" />
            <div className="insights-newsletter__overlay" />
          </div>
        )}

        <motion.div className="container insights-newsletter__inner" variants={stagger} {...motionProps}>
          <motion.h2 className="insights-newsletter__title" variants={staggerItem}>
            Stay inspired.
          </motion.h2>

          <motion.p className="insights-newsletter__text" variants={staggerItem}>
            Occasional insights from Big Day.
          </motion.p>

          <motion.form className="insights-newsletter__form" onSubmit={handleSubscribe} variants={staggerItem}>
            <div className="insights-newsletter__field">
              <Mail size={16} strokeWidth={1.8} aria-hidden="true" />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-label="Email address"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </motion.form>
        </motion.div>
      </section>

      {/* ============================================================
          9 — FINAL CTA (dark)
      ============================================================ */}

      <section className="insights-cta theme-dark" data-theme="dark">
        {!loading && (
          <div className="insights-cta__media">
            <SmartVideo project={ctaProject} className="insights-cta__video" />
            <div className="insights-cta__overlay" />
          </div>
        )}

        <motion.div className="container insights-cta__inner" variants={stagger} {...motionProps}>
          <motion.h2 className="insights-cta__title" variants={staggerItem}>
            Let&apos;s create ideas people remember.
          </motion.h2>

          <motion.div className="insights-cta__actions" variants={staggerItem}>
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
