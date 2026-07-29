// src\components\work\WorkHero.jsx



import React from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import "../../styles/components/workHero.css";

const WorkHero = () => {
  const scrollToWork = () => {
    const target = document.getElementById("work-archive");

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      className="work-hero section-dark grain"
      data-theme="dark"
      aria-labelledby="work-hero-title"
    >
      {/* Atmospheric background */}
      <div className="work-hero__ambient" aria-hidden="true">
        <div className="work-hero__ambient-orb work-hero__ambient-orb--one" />
        <div className="work-hero__ambient-orb work-hero__ambient-orb--two" />
        <div className="work-hero__grid" />
      </div>

      <div className="work-hero__container container-wide">
        {/* Top metadata */}
        <div className="work-hero__top">
          <span className="work-hero__eyebrow eyebrow">
            Big Day / Work
          </span>

          <span className="work-hero__index mono">
            01 / 07
          </span>
        </div>

        {/* Main heading */}
        <div className="work-hero__intro">
          <h1
            id="work-hero-title"
            className="work-hero__title"
          >
            Selected work.
            <span>Ideas made real.</span>
          </h1>

          <div className="work-hero__description-wrap">
            <p className="work-hero__description">
              A selection of projects shaped through strategy,
              creative direction, communication, digital experience,
              and emerging technology.
            </p>

            <a
              href="/contact"
              className="work-hero__cta btn-primary"
              aria-label="Start a project with BigDay"
            >
              <span>Start a Project</span>
              <ArrowUpRight size={17} strokeWidth={1.8} />
            </a>
          </div>
        </div>

        {/* Cinematic visual */}
        <div className="work-hero__visual-wrap">
          <div className="work-hero__visual">
            {/* Replace this visual with your actual featured project image/video */}
            <div
              className="work-hero__visual-image"
              role="img"
              aria-label="BigDay selected work cinematic preview"
            />

            {/* Visual overlay */}
            <div className="work-hero__visual-overlay" />

            {/* Visual top information */}
            <div className="work-hero__visual-meta">
              <span className="mono">
                BigDay MA
              </span>

              <span className="mono">
                Selected / 001
              </span>
            </div>

            {/* Visual center mark */}
            <div className="work-hero__visual-center">
              <div className="work-hero__visual-ring">
                <span>BD</span>
              </div>
            </div>

            {/* Visual bottom information */}
            <div className="work-hero__visual-bottom">
              <div>
                <span className="work-hero__visual-label">
                  Featured direction
                </span>

                <strong>
                  Strategy / Creative / Digital
                </strong>
              </div>

              <span className="work-hero__visual-arrow">
                <ArrowUpRight size={22} strokeWidth={1.5} />
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          type="button"
          className="work-hero__scroll"
          onClick={scrollToWork}
          aria-label="Scroll to selected work"
        >
          <span className="work-hero__scroll-label">
            Explore selected work
          </span>

          <span className="work-hero__scroll-icon">
            <ArrowDown size={16} strokeWidth={1.6} />
          </span>
        </button>
      </div>
    </section>
  );
};

export default WorkHero;
