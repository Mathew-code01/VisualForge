// src/components/home/FeaturedWork.jsx

import React from "react";
import { ArrowUpRight } from "lucide-react";

import "../../styles/components/FeaturedWork.css";

const featuredWork = [
  {
    number: "01",
    title: "Case Study 01",
    category: "Brand Strategy / Identity",
    description:
      "A future BigDay MA case study will live here — showing the thinking, identity, and experience behind the work.",
  },
  {
    number: "02",
    title: "Case Study 02",
    category: "Communication / Digital",
    description:
      "A future project will showcase how strategy becomes communication and how communication becomes experience.",
  },
  {
    number: "03",
    title: "Case Study 03",
    category: "Brand / Digital Experience",
    description:
      "A future case study will document the systems and digital experiences built to help a brand move forward.",
  },
];

const FeaturedWork = () => {
  return (
    <section
      className="featured-work section-dark"
      id="selected-work"
      aria-labelledby="featured-work-title"
    >
      <div className="featured-work__ambient" aria-hidden="true" />

      <div className="featured-work__inner section-container">
        {/* =========================================================
            SECTION HEADER
        ========================================================= */}

        <header className="featured-work__header">
          <div className="featured-work__meta">
            <span className="featured-work__number mono">05</span>

            <span className="featured-work__eyebrow eyebrow">
              Selected Work
            </span>
          </div>

          <div className="featured-work__header-line divider-soft" />

          <div className="featured-work__heading-wrap">
            <div>
              <h2
                id="featured-work-title"
                className="featured-work__title"
              >
                Work that gives
                <span className="featured-work__title-muted">
                  {" "}
                  ideas a place to live.
                </span>
              </h2>
            </div>

            <p className="featured-work__intro">
              A selection of projects shaped through strategy, identity,
              communication, and digital experience.
            </p>
          </div>
        </header>

        {/* =========================================================
            WORK GRID
        ========================================================= */}

        <div className="featured-work__grid">
          {featuredWork.map((work) => (
            <article className="work-card" key={work.number}>
              {/* Project visual placeholder */}
              <div className="work-card__visual">
                <div className="work-card__visual-grid" aria-hidden="true" />

                <div className="work-card__visual-glow" aria-hidden="true" />

                <span className="work-card__placeholder mono">
                  Project Preview
                </span>

                <span className="work-card__coming-soon">
                  Coming soon
                </span>

                <div className="work-card__visual-index mono">
                  {work.number}
                </div>
              </div>

              {/* Project information */}
              <div className="work-card__content">
                <div className="work-card__top">
                  <span className="work-card__category mono">
                    {work.category}
                  </span>

                  <span className="work-card__arrow" aria-hidden="true">
                    <ArrowUpRight size={19} strokeWidth={1.5} />
                  </span>
                </div>

                <h3 className="work-card__title">{work.title}</h3>

                <p className="work-card__description">
                  {work.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* =========================================================
            BOTTOM STATEMENT
        ========================================================= */}

        <div className="featured-work__bottom">
          <span className="featured-work__bottom-line" />

          <p className="featured-work__bottom-copy">
            The work will speak for itself. For now, we&apos;re building what
            comes next.
          </p>

          <span className="featured-work__bottom-status mono">
            Archive in progress
          </span>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;