
// src/components/services/WhatWeCanBuild.jsx

import React, { useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Layers3,
  WandSparkles,
  Boxes,
  Play,
  BrainCircuit,
} from "lucide-react";

import "../../styles/components/whatWeCanBuild.css";

const BUILD_OPTIONS = [
  {
    id: "launch",
    number: "01",
    title: "Launch something new",
    description:
      "Launch a new brand, product, or business with a clear idea, identity, and digital presence.",
    tags: ["Strategy", "Brand", "Digital", "Communication"],
    icon: Sparkles,
  },
  {
    id: "clarify",
    number: "02",
    title: "Make something easier to understand",
    description:
      "Turn complex ideas into clear stories, experiences, and communication people can immediately understand.",
    tags: ["Strategy", "Motion", "Video", "Communication"],
    icon: WandSparkles,
  },
  {
    id: "digital",
    number: "03",
    title: "Build a digital experience",
    description:
      "Design and build websites, products, and digital platforms that are useful, intuitive, and built to perform.",
    tags: ["UX", "UI", "Product", "Development"],
    icon: Boxes,
  },
  {
    id: "transform",
    number: "04",
    title: "Transform an existing brand",
    description:
      "Bring clarity, consistency, and a stronger creative direction to an existing business.",
    tags: ["Strategy", "Identity", "Creative", "Digital"],
    icon: Layers3,
  },
  {
    id: "content",
    number: "05",
    title: "Create content that moves",
    description:
      "Build visual stories, campaigns, and content people remember across the channels that matter.",
    tags: ["Creative", "Video", "Motion", "Campaigns"],
    icon: Play,
  },
  {
    id: "future",
    number: "06",
    title: "Explore what's next",
    description:
      "Experiment with new technology, intelligent systems, automation, and emerging digital experiences.",
    tags: ["AI", "Automation", "Technology", "Prototyping"],
    icon: BrainCircuit,
  },
];

const WhatWeCanBuild = () => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (id) => {
    setActiveCard((current) => (current === id ? null : id));
  };

  return (
    <section
      className="what-build section section-dark grain"
      data-theme="dark"
      aria-labelledby="what-build-title"
    >
      <div className="what-build__orb what-build__orb--one" />
      <div className="what-build__orb what-build__orb--two" />

      <div className="section-container">
        {/* ============================================================
            HEADER
        ============================================================ */}
        <header className="what-build__header">
          <div className="what-build__eyebrow">
            <span className="eyebrow">04 — What we can build</span>
          </div>

          <div className="what-build__heading-wrap">
            <h2
              id="what-build-title"
              className="what-build__title section-title"
            >
              What are you
              <span className="what-build__title-accent">
                {" "}
                trying to do?
              </span>
            </h2>

            <p className="what-build__intro">
              You don't need to figure out which service you need. Start with
              the outcome. We'll help shape the strategy, creative, technology,
              and execution around it.
            </p>
          </div>
        </header>

        {/* ============================================================
            OUTCOME GRID
        ============================================================ */}
        <div className="what-build__grid">
          {BUILD_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isActive = activeCard === option.id;

            return (
              <article
                key={option.id}
                className={`what-build-card ${
                  isActive ? "what-build-card--active" : ""
                }`}
                onClick={() => handleCardClick(option.id)}
              >
                <button
                  type="button"
                  className="what-build-card__trigger"
                  aria-expanded={isActive}
                  aria-controls={`what-build-content-${option.id}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleCardClick(option.id);
                  }}
                >
                  <span className="what-build-card__top">
                    <span className="what-build-card__number">
                      {option.number}
                    </span>

                    <span className="what-build-card__icon">
                      <Icon size={19} strokeWidth={1.6} />
                    </span>
                  </span>

                  <span className="what-build-card__content">
                    <span className="what-build-card__title">
                      {option.title}
                    </span>

                    <span className="what-build-card__arrow">
                      <ArrowUpRight size={20} strokeWidth={1.7} />
                    </span>
                  </span>

                  <span className="what-build-card__description">
                    {option.description}
                  </span>
                </button>

                <div
                  id={`what-build-content-${option.id}`}
                  className="what-build-card__details"
                  aria-hidden={!isActive}
                >
                  <div className="what-build-card__tags">
                    {option.tags.map((tag) => (
                      <span key={tag} className="what-build-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="what-build-card__shine" />
              </article>
            );
          })}
        </div>

        {/* ============================================================
            FOOTER MESSAGE
        ============================================================ */}
        <div className="what-build__footer">
          <div className="what-build__footer-line" />

          <div className="what-build__footer-content">
            <span className="what-build__footer-label mono">
              Start with the outcome
            </span>

            <p className="what-build__footer-text">
              Tell us what you're trying to accomplish. We'll help you figure
              out what needs to happen next.
            </p>
          </div>

          <div className="what-build__footer-line" />
        </div>
      </div>
    </section>
  );
};

export default WhatWeCanBuild;
