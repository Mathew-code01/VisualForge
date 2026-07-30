

// src\components\work\HowWeThink.jsx

// src/components/work/HowWeThink.jsx

import React from "react";
import { ArrowUpRight } from "lucide-react";

import "../../styles/components/how-we-think.css";

const thinkingLayers = [
  {
    number: "01",
    title: "Strategy",
    description: "Find the signal.",
  },
  {
    number: "02",
    title: "Identity",
    description: "Make it recognizable.",
  },
  {
    number: "03",
    title: "Communication",
    description: "Make it understood.",
  },
  {
    number: "04",
    title: "Digital",
    description: "Make it useful.",
  },
];

const HowWeThink = () => {
  return (
    <section
      className="how-we-think section section-dark"
      data-theme="dark"
      aria-labelledby="how-we-think-title"
    >
      <div className="how-we-think__inner section-container">
        {/* =========================================================
            HEADER
        ========================================================= */}

        <header className="how-we-think__header">
          <div className="how-we-think__eyebrow eyebrow">
            04 — How We Think
          </div>

          <div className="how-we-think__intro">
            <h2
              id="how-we-think-title"
              className="how-we-think__title section-title"
            >
              The work is more than the output.
            </h2>

            <p className="how-we-think__description section-description">
              The strongest projects connect the idea behind the work with the
              experience people ultimately have. We look at the problem, the
              audience, the system, and the details together.
            </p>
          </div>
        </header>

        {/* =========================================================
            THINKING LAYERS
        ========================================================= */}

        <div className="how-we-think__layers">
          {thinkingLayers.map((layer) => (
            <article
              className="how-we-think__layer"
              key={layer.number}
            >
              <div className="how-we-think__layer-top">
                <span className="how-we-think__number mono">
                  {layer.number}
                </span>

                <ArrowUpRight
                  className="how-we-think__icon"
                  aria-hidden="true"
                />
              </div>

              <div className="how-we-think__layer-content">
                <h3 className="how-we-think__layer-title">
                  {layer.title}
                </h3>

                <p className="how-we-think__layer-description">
                  {layer.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeThink;