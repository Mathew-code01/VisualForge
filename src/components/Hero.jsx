
// src/components/Hero.jsx

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Sparkles,
  Bot,
  Clapperboard,
} from "lucide-react";

import "../styles/components/hero.css";

// Assets
import theArchiveImg from "../assets/images/theArchive.webp";
import visualExcellenceImg from "../assets/images/visualExcellence.webp";

const heroSlides = [
  {
    id: "01",
    eyebrow: "Creative intelligence",
    title: "Build what comes next.",
    description:
      "BigDay brings creative direction, intelligent systems, and production together to help ambitious brands move from idea to execution.",
    image: theArchiveImg,
    category: "Creative Systems",
  },
  {
    id: "02",
    eyebrow: "Human × AI",
    title: "Ideas, amplified by intelligence.",
    description:
      "We combine human creativity with AI-powered workflows and collaborative agents to make modern creative work faster, sharper, and more scalable.",
    image: visualExcellenceImg,
    category: "AI Collaboration",
  },
];

const capabilities = [
  {
    icon: Sparkles,
    label: "Creative",
  },
  {
    icon: Bot,
    label: "AI Systems",
  },
  {
    icon: Clapperboard,
    label: "Production",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentSlide = heroSlides[index];

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const handleSlideChange = (nextIndex) => {
    setIndex(nextIndex);
  };

  return (
    <section
      className="bd-hero"
      aria-label="BigDay introduction"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="bd-hero-background" aria-hidden="true">
        {heroSlides.map((slide, slideIndex) => (
          <div
            key={slide.id}
            className={`bd-hero-background-slide ${
              slideIndex === index ? "is-active" : ""
            }`}
            style={{
              backgroundImage: `url("${slide.image}")`,
            }}
          />
        ))}

        <div className="bd-hero-gradient" />
        <div className="bd-hero-vignette" />
        <div className="bd-hero-grid" />
        <div className="bd-hero-noise" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="bd-hero-container">
        {/* ===================================================
            TOP META
        ==================================================== */}

        <div className="bd-hero-meta">
          <div className="bd-hero-status">
            <span className="bd-status-dot" />
            <span>BigDay / Creative Technology</span>
          </div>

          <div className="bd-hero-meta-right">
            <span className="bd-meta-line">Lagos · Global</span>
            <span className="bd-meta-line">Est. 2024</span>
          </div>
        </div>

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div className="bd-hero-content">
          <div
            className="bd-hero-copy"
            key={currentSlide.id}
          >
            <div className="bd-hero-eyebrow">
              <span className="bd-eyebrow-number">
                {currentSlide.id}
              </span>

              <span>{currentSlide.eyebrow}</span>
            </div>

            <h1 className="bd-hero-title">
              {currentSlide.title}
            </h1>

            <p className="bd-hero-description">
              {currentSlide.description}
            </p>

            {/* CTA */}
            <div className="bd-hero-actions">
              <NavLink
                to="/work"
                className="bd-hero-primary-btn"
              >
                <span>Explore BigDay</span>

                <span className="bd-btn-icon">
                  <ArrowUpRight size={17} strokeWidth={2.2} />
                </span>
              </NavLink>

              <NavLink
                to="/about"
                className="bd-hero-secondary-btn"
              >
                <span className="bd-play-icon">
                  <Play size={13} fill="currentColor" />
                </span>

                <span>Meet the company</span>
              </NavLink>
            </div>
          </div>

          {/* =================================================
              CAPABILITY PANEL
          ================================================== */}

          <div className="bd-hero-capabilities">
            <div className="bd-capabilities-heading">
              <span>What we build</span>
              <ArrowRight size={15} />
            </div>

            <div className="bd-capabilities-list">
              {capabilities.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    className="bd-capability-item"
                    key={item.label}
                  >
                    <span className="bd-capability-icon">
                      <Icon size={16} strokeWidth={1.8} />
                    </span>

                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===================================================
            BOTTOM INTERFACE
        ==================================================== */}

        <div className="bd-hero-bottom">
          {/* Slide controls */}
          <div className="bd-hero-pagination">
            <span className="bd-pagination-label">
              Selected direction
            </span>

            <div className="bd-pagination-controls">
              {heroSlides.map((slide, slideIndex) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`bd-pagination-btn ${
                    slideIndex === index ? "is-active" : ""
                  }`}
                  onClick={() => handleSlideChange(slideIndex)}
                  aria-label={`Show slide ${slideIndex + 1}`}
                  aria-current={
                    slideIndex === index ? "true" : undefined
                  }
                >
                  <span>0{slideIndex + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="bd-hero-scroll">
            <span className="bd-scroll-label">
              Scroll to explore
            </span>

            <span className="bd-scroll-arrow">
              <ArrowRight size={15} />
            </span>
          </div>

          {/* Current category */}
          <div className="bd-hero-current">
            <span className="bd-current-label">
              Current focus
            </span>

            <span className="bd-current-value">
              {currentSlide.category}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}