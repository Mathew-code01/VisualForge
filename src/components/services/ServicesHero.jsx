// src\components\services\ServicesHero.jsx

import React from "react";
import { ArrowUpRight, MoveRight } from "lucide-react";

import "../../styles/components/servicesHero.css";

const ServicesHero = () => {
  return (
    <section
      className="services-hero section-light"
      data-theme="light"
      aria-labelledby="services-hero-title"
    >
      {/* Background system */}
      <div className="services-hero__background" aria-hidden="true">
        <div className="services-hero__glow" />
        <div className="services-hero__grid" />
        <div className="services-hero__orb services-hero__orb--one" />
        <div className="services-hero__orb services-hero__orb--two" />
      </div>

      <div className="services-hero__inner container-wide">
        {/* Top metadata */}
        <div className="services-hero__top">
          <span className="eyebrow">Big Day / Services</span>

          <span className="services-hero__index mono">Capabilities / 01</span>
        </div>

        {/* Main content */}
        <div className="services-hero__content">
          <div className="services-hero__headline-wrap">
            <h1 id="services-hero-title" className="services-hero__title">
              Strategy, creativity,
              <br />
              and technology{" "}
              <span className="services-hero__accent">working as one.</span>
            </h1>
          </div>

          <div className="services-hero__bottom">
            <div className="services-hero__statement">
              <span className="services-hero__statement-line" />

              <p>
                From strategy and brand identity to video, digital experiences,
                and emerging technology, we bring the right disciplines together
                around the problem.
              </p>
            </div>

            <div className="services-hero__actions">
              <a href="/contact" className="btn-primary services-hero__primary">
                <span>Start a Project</span>
                <ArrowUpRight size={17} strokeWidth={2} />
              </a>

              <a
                href="/work"
                className="btn-secondary services-hero__secondary"
              >
                <span>Explore Our Work</span>
                <MoveRight size={17} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>

        {/* Capability rail */}
        <div className="services-hero__rail">
          <div className="services-hero__rail-item">
            <span>01</span>
            <strong>Strategy</strong>
          </div>

          <div className="services-hero__rail-item">
            <span>02</span>
            <strong>Creative</strong>
          </div>

          <div className="services-hero__rail-item">
            <span>03</span>
            <strong>Communication</strong>
          </div>

          <div className="services-hero__rail-item">
            <span>04</span>
            <strong>Digital</strong>
          </div>

          <div className="services-hero__rail-item">
            <span>05</span>
            <strong>Technology</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;