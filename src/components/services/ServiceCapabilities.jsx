// src\components\services\ServiceCapabilities.jsx


import React from "react";
import "../../styles/components/serviceCapabilities.css";

const capabilities = [
  {
    number: "01",
    title: "Strategy",
    statement: "Find the signal.",
    description:
      "We help define the opportunity, positioning, audience, messaging, and direction before the creative work begins.",
    services: [
      "Brand Strategy",
      "Positioning",
      "Messaging",
      "Audience Research",
      "Creative Strategy",
      "Campaign Strategy",
    ],
  },
  {
    number: "02",
    title: "Brand & Creative",
    statement: "Give the idea a recognizable form.",
    description:
      "We turn strategy into identities, visual systems, campaigns, and creative direction people can recognize.",
    services: [
      "Brand Identity",
      "Art Direction",
      "Creative Direction",
      "Visual Systems",
      "Campaign Concepts",
      "Graphic Design",
    ],
  },
  {
    number: "03",
    title: "Communication & Motion",
    statement: "Make the story move.",
    description:
      "We translate ideas into moving stories, campaign films, product content, and visual experiences designed to hold attention.",
    services: [
      "Video Editing",
      "Motion Design",
      "Explainer Videos",
      "Product Videos",
      "Campaign Films",
      "Social Content",
      "Visual Storytelling",
    ],
    featured: true,
  },
  {
    number: "04",
    title: "Digital Experiences",
    statement: "Make the idea useful.",
    description:
      "We design and build digital experiences that connect strong visual thinking with intuitive interaction and useful technology.",
    services: [
      "UX Strategy",
      "UI Design",
      "Product Design",
      "Web Design",
      "Design Systems",
      "Prototyping",
      "Web Development",
      "Interactive Experiences",
    ],
  },
  {
    number: "05",
    title: "AI & Emerging Technology",
    statement: "Build what's next.",
    description:
      "We explore new ways of working with intelligent systems, automation, and emerging technology to turn ambitious ideas into working experiences.",
    services: [
      "AI Systems",
      "AI Agents",
      "Automation",
      "Creative AI",
      "Intelligent Interfaces",
      "Rapid Prototyping",
      "Experimental Technology",
    ],
  },
];

const CapabilityMedia = () => {
  return (
    <div className="svc-capability-media" aria-label="Motion and video showcase">
      <div className="svc-capability-media__grid" />

      <div className="svc-capability-media__glow" />

      <div className="svc-capability-media__frame">
        <div className="svc-capability-media__topbar">
          <span>BIG DAY MA</span>

          <span className="svc-capability-media__status">
            <span className="svc-capability-media__status-dot" />
            MOTION / 03
          </span>
        </div>

        <div className="svc-capability-media__visual">
          <span className="svc-capability-media__orb svc-capability-media__orb--one" />
          <span className="svc-capability-media__orb svc-capability-media__orb--two" />

          <div className="svc-capability-media__center">
            <span className="svc-capability-media__center-line" />
            <span className="svc-capability-media__center-label">
              VISUAL
            </span>
          </div>

          <div className="svc-capability-media__play">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M8 5.5v13L18 12 8 5.5Z" />
            </svg>
          </div>
        </div>

        <div className="svc-capability-media__bottom">
          <span>STORY / MOTION / EDIT</span>
          <span>00:03:24</span>
        </div>
      </div>

      <div className="svc-capability-media__corner svc-capability-media__corner--tl" />
      <div className="svc-capability-media__corner svc-capability-media__corner--br" />
    </div>
  );
};

const CapabilityServices = ({ services }) => {
  return (
    <ul className="svc-capability-services">
      {services.map((service) => (
        <li key={service} className="svc-capability-service">
          <span className="svc-capability-service__dot" />
          <span>{service}</span>
        </li>
      ))}
    </ul>
  );
};

const CapabilityItem = ({ capability }) => {
  const {
    number,
    title,
    statement,
    description,
    services,
    featured,
  } = capability;

  return (
    <article
      className={`svc-capability ${
        featured ? "svc-capability--featured" : ""
      }`}
    >
      <div className="svc-capability__number" aria-hidden="true">
        {number}
      </div>

      <div className="svc-capability__main">
        <div className="svc-capability__heading">
          <span className="svc-capability__label">CAPABILITY</span>

          <h3 className="svc-capability__title">{title}</h3>
        </div>

        <div className="svc-capability__content">
          <div className="svc-capability__copy">
            <h4 className="svc-capability__statement">
              {statement}
            </h4>

            <p className="svc-capability__description">
              {description}
            </p>
          </div>

          <div className="svc-capability__services">
            <span className="svc-capability__services-label">
              SERVICES
            </span>

            <CapabilityServices services={services} />
          </div>
        </div>

        {featured && <CapabilityMedia />}
      </div>
    </article>
  );
};

const ServiceCapabilities = () => {
  return (
    <section
      className="svc-capabilities section-dark"
      data-theme="dark"
      aria-labelledby="service-capabilities-title"
    >
      <div className="svc-capabilities__ambient" aria-hidden="true">
        <span className="svc-capabilities__ambient-orb svc-capabilities__ambient-orb--one" />
        <span className="svc-capabilities__ambient-orb svc-capabilities__ambient-orb--two" />
      </div>

      <div className="svc-capabilities__container">
        <header className="svc-capabilities__header">
          <div className="svc-capabilities__header-meta">
            <span className="eyebrow">02 — Capabilities</span>

            <span className="svc-capabilities__header-index">
              05 DISCIPLINES
            </span>
          </div>

          <div className="svc-capabilities__header-grid">
            <h2
              id="service-capabilities-title"
              className="svc-capabilities__title"
            >
              What we{" "}
              <span className="svc-capabilities__title-accent">
                do.
              </span>
            </h2>

            <p className="svc-capabilities__intro">
              Different disciplines. One goal: making ambitious ideas
              clearer, more useful, and more memorable.
            </p>
          </div>
        </header>

        <div className="svc-capabilities__list">
          {capabilities.map((capability) => (
            <CapabilityItem
              key={capability.number}
              capability={capability}
            />
          ))}
        </div>

        <footer className="svc-capabilities__footer">
          <span className="svc-capabilities__footer-line" />

          <span className="svc-capabilities__footer-copy">
            Strategy → Creative → Motion → Digital → AI
          </span>

          <span className="svc-capabilities__footer-line" />
        </footer>
      </div>
    </section>
  );
};

export default ServiceCapabilities;
