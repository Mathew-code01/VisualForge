// src\components\home\HomeCTA.jsx


// src/components/home/HomeCTA.jsx

import React from "react";
import "../../styles/components/homeCTA.css";

const HomeCTA = () => {
  return (
    <section
      className="home-cta section-light"
      data-theme="light"
      aria-labelledby="home-cta-title"
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div className="home-cta__glow home-cta__glow--primary" aria-hidden="true" />
      <div className="home-cta__glow home-cta__glow--secondary" aria-hidden="true" />

      <div className="section-container home-cta__container">
        {/* =====================================================
            TOP STRUCTURE
        ===================================================== */}

        <div className="home-cta__top">
          <div className="home-cta__eyebrow eyebrow">
            <span>08</span>
            <span>Start a Conversation</span>
          </div>

          <span className="home-cta__top-index mono">
            Big Day MA
          </span>
        </div>

        {/* =====================================================
            MAIN CTA
        ===================================================== */}

        <div className="home-cta__content">
          <div className="home-cta__heading-wrap">
            <span className="home-cta__label">
              Final thought
            </span>

            <h2
              id="home-cta-title"
              className="home-cta__title"
            >
              Let&apos;s build something
              <br />
              <span>people understand.</span>
            </h2>
          </div>

          <div className="home-cta__action">
            <p className="home-cta__description">
              Have an idea, a challenge, or something that needs
              to become clearer? Let&apos;s turn it into something
              meaningful.
            </p>

            <a
              href="#contact"
              className="home-cta__button"
              aria-label="Start a conversation with Big Day MA"
            >
              <span>Start a Conversation</span>

              <span
                className="home-cta__button-icon"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* =====================================================
            BOTTOM STRUCTURE
        ===================================================== */}

        <div className="home-cta__bottom">
          <div className="home-cta__line" />

          <div className="home-cta__bottom-meta">
            <span>Strategy</span>
            <span>Creative</span>
            <span>Technology</span>
          </div>

          <span className="home-cta__year">
            © {new Date().getFullYear()} Big Day MA
          </span>
        </div>
      </div>
    </section>
  );
};

export default HomeCTA;

