// src/components/home/ClaritySection.jsx

import React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Compass,
  Fingerprint,
  MessageCircle,
  MonitorSmartphone,
} from "lucide-react";

import "../../styles/components/ClaritySection.css";

const claritySteps = [
  {
    number: "01",
    title: "Strategy",
    description: "Define the message.",
    detail:
      "We find the idea at the center of your business and turn it into a clear direction.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Brand Identity",
    description: "Build a brand people recognize.",
    detail:
      "We create a distinct identity that makes your business recognizable, memorable, and consistent.",
    icon: Fingerprint,
  },
  {
    number: "03",
    title: "Communication",
    description: "Bring your story to life.",
    detail:
      "We shape the words, visuals, and experiences that help your audience understand what you do.",
    icon: MessageCircle,
  },
  {
    number: "04",
    title: "Digital Experiences",
    description: "Build systems that support growth.",
    detail:
      "We turn the brand into thoughtful digital experiences designed to evolve with your business.",
    icon: MonitorSmartphone,
  },
];

const ClaritySection = () => {
  return (
    <section
      className="section clarity-section section-light"
      id="clarity"
      aria-labelledby="clarity-section-title"
    >
      <div className="clarity-section__ambient" aria-hidden="true" />

      <div className="clarity-section__inner section-container">
        {/* =========================================================
            SECTION HEADER
        ========================================================= */}
        <div className="clarity-section__header">
          <div className="clarity-section__meta">
            <span className="clarity-section__number mono">04</span>

            <span className="clarity-section__eyebrow eyebrow">
              How We Create Clarity
            </span>
          </div>

          <div className="clarity-section__header-line divider-soft" />

          <div className="clarity-section__heading-wrap">
            <h2 id="clarity-section-title" className="clarity-section__title">
              Clarity isn&apos;t a single step.
              <span className="clarity-section__title-muted">
                {" "}
                It&apos;s built into everything.
              </span>
            </h2>

            <p className="clarity-section__intro">
              From the first idea to the final experience, we create clarity at
              every layer of the brand.
            </p>
          </div>
        </div>

        {/* =========================================================
            CLARITY PROCESS
        ========================================================= */}
        <div className="clarity-section__process">
          {claritySteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === claritySteps.length - 1;

            return (
              <article
                className={`clarity-card ${isLast ? "clarity-card--last" : ""}`}
                key={step.number}
              >
                {/* Card top */}
                <div className="clarity-card__top">
                  <span className="clarity-card__number mono">
                    {step.number}
                  </span>

                  <Icon
                    className="clarity-card__icon"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>

                {/* Card content */}
                <div className="clarity-card__content">
                  <h3 className="clarity-card__title">{step.title}</h3>

                  <p className="clarity-card__description">
                    {step.description}
                  </p>

                  <p className="clarity-card__detail">{step.detail}</p>
                </div>

                {/* Card footer */}
                <div className="clarity-card__footer">
                  <span className="clarity-card__footer-line" />

                  <span className="clarity-card__footer-label mono">
                    {isLast ? "Built to grow" : "Next layer"}
                  </span>

                  <span className="clarity-card__arrow">
                    {isLast ? (
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowDownRight
                        size={18}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* =========================================================
            BOTTOM STATEMENT
        ========================================================= */}
        <div className="clarity-section__bottom">
          <div className="clarity-section__bottom-mark">
            <span />
            <span />
            <span />
          </div>

          <p className="clarity-section__bottom-copy">
            Strategy gives it direction. Identity gives it recognition.
            Communication gives it meaning. Digital brings it into the world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClaritySection;
