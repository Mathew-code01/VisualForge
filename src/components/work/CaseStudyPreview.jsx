// 

// src/components/work/CaseStudyPreview.jsx

import React from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import "../../styles/components/case-study-preview.css";

const processSteps = [
  {
    number: "01",
    label: "Challenge",
    description: "Understand what needs to change.",
  },
  {
    number: "02",
    label: "Strategy",
    description: "Find the clearest direction forward.",
  },
  {
    number: "03",
    label: "Creative",
    description: "Turn the thinking into an idea.",
  },
  {
    number: "04",
    label: "Experience",
    description: "Shape how the idea is encountered.",
  },
  {
    number: "05",
    label: "Result",
    description: "Measure what the work made possible.",
  },
];

const CaseStudyPreview = () => {
  return (
    <section
      className="case-study-preview section section-light"
      data-theme="light"
      aria-labelledby="case-study-preview-title"
    >
      <div className="case-study-preview__inner section-container">
        {/* =========================================================
            HEADER
        ========================================================= */}

        <header className="case-study-preview__header">
          <div className="case-study-preview__eyebrow eyebrow">
            05 — Case Study Preview
          </div>

          <div className="case-study-preview__intro">
            <h2
              id="case-study-preview-title"
              className="case-study-preview__title section-title"
            >
              Good work starts before the final image.
            </h2>

            <p className="case-study-preview__description section-description">
              Every project has a reason behind it. Our case studies go
              beyond the finished work to show how the problem was understood,
              how the direction was shaped, and how the final experience came
              together.
            </p>
          </div>
        </header>

        {/* =========================================================
            PROCESS
        ========================================================= */}

        <div className="case-study-preview__process">
          <div className="case-study-preview__process-label">
            <span className="mono">The process</span>

            <ArrowDown
              className="case-study-preview__process-arrow"
              aria-hidden="true"
            />
          </div>

          <div className="case-study-preview__steps">
            {processSteps.map((step, index) => (
              <React.Fragment key={step.number}>
                <article className="case-study-preview__step">
                  <div className="case-study-preview__step-top">
                    <span className="case-study-preview__step-number mono">
                      {step.number}
                    </span>

                    <ArrowUpRight
                      className="case-study-preview__step-icon"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="case-study-preview__step-content">
                    <h3 className="case-study-preview__step-title">
                      {step.label}
                    </h3>

                    <p className="case-study-preview__step-description">
                      {step.description}
                    </p>
                  </div>
                </article>

                {index < processSteps.length - 1 && (
                  <div
                    className="case-study-preview__connector"
                    aria-hidden="true"
                  >
                    <span />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* =========================================================
            STATEMENT
        ========================================================= */}

        <footer className="case-study-preview__statement">
          <div className="case-study-preview__statement-line" />

          <div className="case-study-preview__statement-content">
            <span className="case-study-preview__statement-label mono">
              Behind the work
            </span>

            <p className="case-study-preview__statement-text">
              We don't just show what we made. We show why it needed to exist.
            </p>

            <ArrowUpRight
              className="case-study-preview__statement-icon"
              aria-hidden="true"
            />
          </div>
        </footer>
      </div>
    </section>
  );
};

export default CaseStudyPreview;