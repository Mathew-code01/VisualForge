// src\components\about\AboutBelief.jsx

import React from "react";
import "../../styles/components/aboutBelief.css";

const beliefs = [
  {
    number: "01",
    title: "Understanding",
    description:
      "Every meaningful solution begins with asking better questions. Before we create, we listen. Before we design, we understand the people, context, and challenges that shape the work.",
  },
  {
    number: "02",
    title: "Simplicity",
    description:
      "Complexity isn't impressive. Clarity is. We remove unnecessary layers until ideas become focused, memorable, and easy for people to understand.",
  },
  {
    number: "03",
    title: "Meaning",
    description:
      "Design should do more than look beautiful. Every decision should help people understand something, feel something, or confidently take the next step.",
  },
];

const AboutBelief = () => {
  return (
    <section className="section section-light aboutBelief">
      <div className="section-container">
        <div className="aboutBelief__header">
          <span className="eyebrow">OUR BELIEF</span>

          <div className="aboutBelief__intro">
            <div className="aboutBelief__left">
              <h2 className="section-title">
                Clarity
                <br />
                creates trust.
              </h2>
            </div>

            <div className="aboutBelief__right">
              <p className="section-description">
                The strongest companies aren't always the loudest.
              </p>

              <p className="aboutBelief__paragraph">
                They're the easiest to understand.
              </p>

              <p className="aboutBelief__paragraph">
                We believe clarity gives people confidence.
              </p>

              <p className="aboutBelief__paragraph">
                Confidence creates trust.
              </p>

              <p className="aboutBelief__paragraph">Trust creates action.</p>

              <p className="aboutBelief__paragraph aboutBelief__paragraph--last">
                That's why every project begins by understanding the problem
                before creating the solution.
              </p>
            </div>
          </div>
        </div>

        <div className="aboutBelief__cards">
          {beliefs.map((item) => (
            <article className="aboutBelief__card surface" key={item.number}>
              <span className="aboutBelief__number">{item.number}</span>

              <h3 className="aboutBelief__title">{item.title}</h3>

              <div className="accent-line" />

              <p className="aboutBelief__text">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutBelief;