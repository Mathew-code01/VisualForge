// src\components\work\CollaborationSection.jsx

import React from "react";
import "../../styles/components/collaborationSection.css";

const disciplines = [
  "STRATEGY",
  "CREATIVE",
  "COMMUNICATION",
  "DIGITAL",
  "AI / TECHNOLOGY",
];

const CollaborationSection = () => {
  return (
    <section
      className="collaboration-section section-dark grain"
      data-theme="dark"
      aria-labelledby="collaboration-heading"
    >
      <div className="collaboration-section__container section-container">
        {/* Header */}
        <div className="collaboration-section__header">
          <span className="eyebrow">05 — COLLABORATION</span>

          <div className="collaboration-section__heading-wrap">
            <h2
              id="collaboration-heading"
              className="collaboration-section__heading"
            >
              Different problems need different teams.
            </h2>

            <p className="collaboration-section__description">
              Some projects need strategy. Others need a new identity, a digital
              experience, a campaign, or a completely new way of working. We
              build the team around the problem.
            </p>
          </div>
        </div>

        {/* Disciplines */}
        <div className="collaboration-section__disciplines">
          {disciplines.map((discipline, index) => (
            <React.Fragment key={discipline}>
              <div className="collaboration-section__discipline">
                <span className="collaboration-section__discipline-number">
                  0{index + 1}
                </span>

                <span className="collaboration-section__discipline-name">
                  {discipline}
                </span>
              </div>

              {index < disciplines.length - 1 && (
                <span
                  className="collaboration-section__plus"
                  aria-hidden="true"
                >
                  +
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Closing statement */}
        <div className="collaboration-section__footer">
          <div className="collaboration-section__footer-line" />

          <p className="collaboration-section__footer-copy">
            One project might need one discipline. Another might need all five.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;