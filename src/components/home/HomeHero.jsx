// src\components\home\HomeHero.jsx

// src/components/home/HomeHero.jsx

import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  MoveRight,
} from "lucide-react";

import "../../styles/components/homeHero.css";

/* =========================================================
   BIG DAY — HOME HERO
========================================================= */

const CLARITY_LAYERS = [
  {
    number: "01",
    title: "Strategy",
    text: "Find the signal.",
  },
  {
    number: "02",
    title: "Brand Identity",
    text: "Make it recognizable.",
  },
  {
    number: "03",
    title: "Communication",
    text: "Make it understood.",
  },
  {
    number: "04",
    title: "Digital Experiences",
    text: "Make it useful.",
  },
];

export default function HomeHero() {
  return (
    <section
      className="home-hero"
      aria-labelledby="home-hero-title"
    >
      {/* =====================================================
          BACKGROUND SYSTEM
      ===================================================== */}

      <div
        className="home-hero__background"
        aria-hidden="true"
      >
        <div className="home-hero__background-glow home-hero__background-glow--one" />
        <div className="home-hero__background-glow home-hero__background-glow--two" />
        <div className="home-hero__grid" />
        <div className="home-hero__grain" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="home-hero__container">
        {/* ===================================================
            LEFT — STRATEGIC MESSAGE
        =================================================== */}

        <div className="home-hero__content">
          {/* Eyebrow */}

          <div className="home-hero__eyebrow">
            <span className="home-hero__eyebrow-line" />

            <span className="home-hero__eyebrow-text">
              Strategy · Design · Communication
            </span>

            <Sparkles
              size={13}
              strokeWidth={1.8}
              className="home-hero__eyebrow-icon"
              aria-hidden="true"
            />
          </div>

          {/* Main headline */}

          <h1
            id="home-hero-title"
            className="home-hero__title"
          >
            <span>Complex ideas</span>

            <span className="home-hero__title-muted">
              deserve clear
            </span>

            <span className="home-hero__title-shine">
              communication.
            </span>
          </h1>

          {/* Supporting copy */}

          <p className="home-hero__description">
            We help ambitious companies communicate ideas
            people understand through strategy, design, and
            visual storytelling.
          </p>

          {/* Actions */}

          <div className="home-hero__actions">
            <Link
              to="/contact"
              className="btn-primary home-hero__primary-action"
            >
              <span>Start a Project</span>

              <ArrowRight
                size={17}
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/work"
              className="btn-secondary home-hero__secondary-action"
            >
              <span>Explore Our Work</span>

              <ArrowUpRight
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Strategic statement */}

          <div className="home-hero__statement">
            <span className="home-hero__statement-mark">
              <MoveRight
                size={14}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </span>

            <span>
              From complex thinking to communication people
              can act on.
            </span>
          </div>
        </div>

        {/* ===================================================
            RIGHT — CLARITY SYSTEM
        =================================================== */}

        <div
          className="home-hero__visual"
          aria-label="Big Day clarity system"
        >
          {/* Visual halo */}

          <div
            className="home-hero__visual-halo"
            aria-hidden="true"
          />

          {/* Main system */}

          <div className="home-hero__system">
            {/* Top metadata */}

            <div className="home-hero__system-top">
              <span>BIG DAY / CLARITY SYSTEM</span>

              <span className="home-hero__system-status">
                <span className="home-hero__status-dot" />
                ACTIVE
              </span>
            </div>

            {/* Main diagram */}

            <div className="home-hero__diagram">
              {/* Orbital lines */}

              <div className="home-hero__orbit home-hero__orbit--outer" />
              <div className="home-hero__orbit home-hero__orbit--middle" />
              <div className="home-hero__orbit home-hero__orbit--inner" />

              {/* Connecting lines */}

              <span className="home-hero__connector home-hero__connector--one" />
              <span className="home-hero__connector home-hero__connector--two" />
              <span className="home-hero__connector home-hero__connector--three" />
              <span className="home-hero__connector home-hero__connector--four" />

              {/* Center */}

              <div className="home-hero__core">
                <div className="home-hero__core-inner">
                  <span className="home-hero__core-label">
                    THE
                  </span>

                  <strong>IDEA</strong>

                  <span className="home-hero__core-label">
                    MADE CLEAR
                  </span>
                </div>
              </div>

              {/* Nodes */}

              <div className="home-hero__node home-hero__node--one">
                <span>01</span>
                <strong>Understand</strong>
              </div>

              <div className="home-hero__node home-hero__node--two">
                <span>02</span>
                <strong>Clarify</strong>
              </div>

              <div className="home-hero__node home-hero__node--three">
                <span>03</span>
                <strong>Create</strong>
              </div>

              <div className="home-hero__node home-hero__node--four">
                <span>04</span>
                <strong>Refine</strong>
              </div>

              {/* Decorative points */}

              <span className="home-hero__point home-hero__point--one" />
              <span className="home-hero__point home-hero__point--two" />
              <span className="home-hero__point home-hero__point--three" />
            </div>

            {/* Bottom disciplines */}

            <div className="home-hero__system-bottom">
              <div className="home-hero__system-caption">
                <span className="home-hero__caption-line" />

                <span>FOUR LAYERS OF CLARITY</span>
              </div>

              <div className="home-hero__layers">
                {CLARITY_LAYERS.map((layer) => (
                  <div
                    key={layer.number}
                    className="home-hero__layer"
                  >
                    <span className="home-hero__layer-number">
                      {layer.number}
                    </span>

                    <div className="home-hero__layer-content">
                      <strong>{layer.title}</strong>

                      <span>{layer.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating labels */}

          <div className="home-hero__floating-tag home-hero__floating-tag--top">
            <span className="home-hero__floating-tag-dot" />

            <span>Clarity by design</span>
          </div>

          <div className="home-hero__floating-tag home-hero__floating-tag--bottom">
            <span>01 — 04</span>

            <span className="home-hero__floating-tag-divider" />

            <span>Big Day Method</span>
          </div>
        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <div
        className="home-hero__scroll"
        aria-hidden="true"
      >
        <span className="home-hero__scroll-label">
          Scroll to explore
        </span>

        <span className="home-hero__scroll-line">
          <span />
        </span>
      </div>
    </section>
  );
}