// src\components\work\FinalCTASection.jsx

import React from "react";
import { ArrowUpRight } from "lucide-react";
import "../../styles/components/finalCTASection.css";

const FinalCTASection = () => {
  return (
    <section
      className="final-cta-section section-light"
      data-theme="light"
      aria-labelledby="final-cta-heading"
    >
      <div className="final-cta-section__container section-container">
        {/* Eyebrow */}
        <span className="eyebrow">READY TO MAKE SOMETHING?</span>

        {/* Main Content */}
        <div className="final-cta-section__content">
          <h2 id="final-cta-heading" className="final-cta-section__heading">
            Let's make the next one worth showing.
          </h2>

          <div className="final-cta-section__bottom">
            <p className="final-cta-section__description">
              Have an idea, challenge, or opportunity? Tell us where you want to
              go and we'll help figure out what it takes to get there.
            </p>

            <a
              href="/contact"
              className="final-cta-section__button btn-primary"
            >
              <span>Start a Project</span>

              <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;