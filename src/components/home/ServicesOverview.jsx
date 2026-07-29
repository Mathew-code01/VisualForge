// src\components\home\ServicesOverview.jsx
// src/components/home/ServicesOverview.jsx

import React from "react";
import "../../styles/components/ServicesOverview.css";

const methodSteps = [
  {
    number: "01",
    title: "Understand",
    description:
      "We start by understanding the challenge, the audience, and what actually needs to change.",
  },
  {
    number: "02",
    title: "Clarify",
    description:
      "We turn complexity into a clear direction, defining what matters and what does not.",
  },
  {
    number: "03",
    title: "Create",
    description:
      "We bring strategy and creative execution together to build something purposeful.",
  },
  {
    number: "04",
    title: "Refine",
    description:
      "We challenge the details, improve the experience, and keep refining until it feels right.",
  },
];

const principles = [
  "Strategic thinking",
  "Creative execution",
  "Emerging technologies",
];

const ServicesOverview = () => {
  return (
    <section
      className="services-overview section-light"
      data-theme="light"
      aria-labelledby="services-overview-title"
    >
      <div className="services-overview__glow" aria-hidden="true" />

      <div className="section-container services-overview__container">
        {/* =====================================================
            SECTION 06 — THE BIG DAY METHOD
        ===================================================== */}

        <header className="services-overview__header">
          <div className="services-overview__eyebrow eyebrow">
            <span>06</span>
            <span>The Big Day Method</span>
          </div>

          <div className="services-overview__intro">
            <h2
              id="services-overview-title"
              className="services-overview__title"
            >
              A simple process.
              <br />
              <span className="dark-gradient-text">
                Better outcomes.
              </span>
            </h2>

            <p className="services-overview__description">
              Every project starts differently. Our approach gives each one a
              clear path from the first question to the final detail.
            </p>
          </div>
        </header>

        {/* =====================================================
            METHOD
        ===================================================== */}

        <div className="services-overview__method">
          <div className="services-overview__method-label">
            <span>How we work</span>
            <span
              className="services-overview__method-line"
              aria-hidden="true"
            />
          </div>

          <div className="services-overview__steps">
            {methodSteps.map((step, index) => (
              <React.Fragment key={step.number}>
                <article className="services-overview__step">
                  <div className="services-overview__step-top">
                    <span className="services-overview__step-number">
                      {step.number}
                    </span>

                    <span
                      className="services-overview__step-dot"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="services-overview__step-content">
                    <h3>{step.title}</h3>

                    <p>{step.description}</p>
                  </div>
                </article>

                {index < methodSteps.length - 1 && (
                  <div
                    className="services-overview__connector"
                    aria-hidden="true"
                  >
                    <span />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* =====================================================
            06B — WHY BIG DAY
            Part of section 06, not a new section.
        ===================================================== */}

        <div className="services-overview__why">
          <div className="services-overview__why-meta">
            <span className="services-overview__why-number">06b</span>

            <span className="services-overview__why-label">
              Why Big Day
            </span>
          </div>

          <div className="services-overview__why-content">
            <div className="services-overview__statement">
              <p>We don't just make things</p>

              <h3>
                look <span>better.</span>
              </h3>

              <h3>
                We make them <span>easier</span>
              </h3>

              <p className="services-overview__statement-last">
                to understand.
              </p>
            </div>

            <div className="services-overview__principles">
              {principles.map((principle, index) => (
                <div
                  className="services-overview__principle"
                  key={principle}
                >
                  <span className="services-overview__principle-number">
                    0{index + 1}
                  </span>

                  <span className="services-overview__principle-name">
                    {principle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            CLOSING STATEMENT
        ===================================================== */}

        <footer className="services-overview__footer">
          <div
            className="services-overview__footer-line"
            aria-hidden="true"
          />

          <p>
            Strategy <span>+</span> Creativity <span>+</span> Technology
          </p>
        </footer>
      </div>
    </section>
  );
};

export default ServicesOverview;
;
