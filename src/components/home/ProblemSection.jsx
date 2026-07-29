// src\components\home\ProblemSection.jsx

// src/components/home/ProblemSection.jsx

import React from "react";
import "../../styles/components/problemSection.css";

const ProblemSection = () => {
  return (
    <section
      className="problem-section section-dark grain"
      id="problem"
      aria-labelledby="problem-section-title"
    >
      <div className="problem-section__glow" aria-hidden="true" />

      <div className="problem-section__inner section-container">
        {/* =========================================================
            TOP META
        ========================================================= */}
        <div className="problem-section__top">
          <span className="problem-section__number mono">03</span>

          <span className="problem-section__label eyebrow">
            The Problem
          </span>
        </div>

        <div className="problem-section__divider divider-soft" />

        {/* =========================================================
            MAIN CONTENT
        ========================================================= */}
        <div className="problem-section__content">
          {/* LEFT — INTRO */}
          <div className="problem-section__intro">
            <p className="problem-section__kicker">
              Understanding comes first.
            </p>

            <h2
              id="problem-section-title"
              className="problem-section__title"
            >
              Great products fail when people{" "}
              <span className="problem-section__title-muted">
                don&apos;t understand them.
              </span>
            </h2>
          </div>

          {/* RIGHT — MESSAGE */}
          <div className="problem-section__message">
            <p className="problem-section__statement">
              People don&apos;t buy what they don&apos;t understand.
            </p>

            <p className="problem-section__supporting">
              That&apos;s why clarity matters.
            </p>
          </div>
        </div>

        {/* =========================================================
            CLARITY TRANSITION
        ========================================================= */}
        <div className="problem-section__clarity">
          <div className="problem-section__clarity-head">
            <span className="problem-section__clarity-label mono">
              The shift
            </span>

            <span className="problem-section__clarity-line" />
          </div>

          <div className="problem-section__sequence">
            <div className="problem-section__step">
              <span className="problem-section__step-index">01</span>

              <span className="problem-section__step-text">
                Complexity
              </span>
            </div>

            <span
              className="problem-section__arrow"
              aria-hidden="true"
            >
              →
            </span>

            <div className="problem-section__step">
              <span className="problem-section__step-index">02</span>

              <span className="problem-section__step-text">
                Confusion
              </span>
            </div>

            <span
              className="problem-section__arrow"
              aria-hidden="true"
            >
              →
            </span>

            <div className="problem-section__step problem-section__step--active">
              <span className="problem-section__step-index">03</span>

              <span className="problem-section__step-text">
                Clarity
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM STATEMENT
        ========================================================= */}
        <div className="problem-section__bottom">
          <span className="problem-section__bottom-line" />

          <p className="problem-section__bottom-copy">
            We turn complexity into something people can immediately
            understand, trust, and act on.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;