// src\components\services\ServicesConnection.jsx


import React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

import "../../styles/components/services-connection.css";

const disciplines = [
  {
    number: "01",
    title: "Strategy",
    description: "Direction before execution.",
  },
  {
    number: "02",
    title: "Brand & Creative",
    description: "Ideas become identity and form.",
  },
  {
    number: "03",
    title: "Communication & Motion",
    description: "The work finds its voice and movement.",
  },
  {
    number: "04",
    title: "Digital Experience",
    description: "The idea becomes something people can experience.",
  },
  {
    number: "05",
    title: "AI & Technology",
    description: "Technology expands what the work can become.",
  },
];

const ServicesConnection = () => {
  return (
    <section
      className="services-connection section-light grain"
      data-theme="light"
      aria-labelledby="services-connection-title"
    >
      <div className="services-connection__container container-wide">
        {/* =========================================================
            HEADER
        ========================================================== */}
        <div className="services-connection__header">
          <div className="services-connection__eyebrow eyebrow">
            <span>03 — How we connect everything</span>
          </div>

          <div className="services-connection__heading-wrap">
            <h2
              id="services-connection-title"
              className="services-connection__title section-title"
            >
              The work doesn't
              <span className="services-connection__title-accent">
                {" "}
                happen in silos.
              </span>
            </h2>

            <p className="services-connection__intro">
              Strategy gives the idea direction. Creative gives it form.
              Communication gives it a voice. Digital turns it into an
              experience. Technology opens up what's possible.
            </p>
          </div>
        </div>

        {/* =========================================================
            CONNECTION SYSTEM
        ========================================================== */}
        <div
          className="services-connection__system"
          aria-label="How our disciplines connect"
        >
          <div className="services-connection__system-label">
            <span className="mono">One connected system</span>
          </div>

          <div className="services-connection__flow">
            {disciplines.map((discipline, index) => (
              <React.Fragment key={discipline.number}>
                <article className="services-connection__node">
                  <div className="services-connection__node-top">
                    <span className="services-connection__number">
                      {discipline.number}
                    </span>

                    <span className="services-connection__node-marker">
                      <span />
                    </span>
                  </div>

                  <div className="services-connection__node-content">
                    <h3>{discipline.title}</h3>
                    <p>{discipline.description}</p>
                  </div>

                  <span className="services-connection__node-line" />
                </article>

                {index < disciplines.length - 1 && (
                  <div
                    className="services-connection__connector"
                    aria-hidden="true"
                  >
                    <ArrowDown size={17} strokeWidth={1.5} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* =========================================================
            CLOSING STATEMENT
        ========================================================== */}
        <div className="services-connection__footer">
          <div className="services-connection__footer-line" />

          <div className="services-connection__footer-content">
            <p className="services-connection__statement">
              One project might need one discipline.
              <br />
              <strong>Another might need all five.</strong>
            </p>

            <div className="services-connection__footer-mark">
              <span>BIG DAY MA</span>
              <ArrowRight size={18} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesConnection;
