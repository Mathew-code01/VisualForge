// src\components\services\ServiceCTA.jsx

import React from "react";
import { ArrowUpRight } from "lucide-react";

import "../../styles/components/serviceCTA.css";

const ServiceCTA = () => {
  return (
    <section
      className="service-cta section-light"
      data-theme="light"
      aria-labelledby="service-cta-title"
    >
      <div className="service-cta__inner container">
        <div className="service-cta__top">
          <span className="service-cta__index mono">05 — CTA</span>

          <div className="service-cta__rule" aria-hidden="true" />
        </div>

        <div className="service-cta__content">
          <div className="service-cta__heading-wrap">
            <span className="service-cta__eyebrow eyebrow">
              Have something in mind?
            </span>

            <h2 id="service-cta-title" className="service-cta__title">
              Let&apos;s figure out what it needs.
            </h2>
          </div>

          <div className="service-cta__action">
            <p className="service-cta__description">
              Tell us about the idea, challenge, or opportunity. We&apos;ll
              figure out the right combination of strategy, creative,
              technology, and execution.
            </p>

            <a
              href="/contact"
              className="service-cta__button btn-primary"
              aria-label="Start a project with BigDay MA"
            >
              <span>Start a Project</span>

              <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTA;