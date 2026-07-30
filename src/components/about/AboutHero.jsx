// // src/components/about/AboutHero.jsx

import React from "react";
import "../../styles/components/aboutHero.css";

const AboutHero = () => {
  return (
    <section className="section section-light aboutHero">
      <div className="section-container">

        <div className="aboutHero__grid">

          {/* LEFT */}

          <div className="aboutHero__content">

            <span className="eyebrow">
              BIG DAY / ABOUT
            </span>

            <h1 className="display-lg aboutHero__title">
              We exist to make
              <br />
              complex ideas
              <br />
              understandable.
            </h1>

            <p className="aboutHero__description">
              Big Day MA is a creative technology company helping ambitious
              organizations communicate with greater clarity through strategy,
              design, communication, and digital experiences.
            </p>

            <p className="aboutHero__description aboutHero__description--secondary">
              We believe people shouldn't have to work hard to understand
              good ideas.
            </p>

            <div className="aboutHero__actions">

              <button className="btn-primary">
                Start a Project
              </button>

              <button className="btn-secondary">
                See Our Work
              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="aboutHero__visual">

            <div className="aboutHero__composition">

              <div className="aboutHero__circle aboutHero__circle--one" />

              <div className="aboutHero__circle aboutHero__circle--two" />

              <div className="aboutHero__circle aboutHero__circle--three" />

              <div className="aboutHero__editorial">

                <span>THE IDEA</span>

                <div className="aboutHero__line" />

                <span>UNDERSTOOD</span>

                <div className="aboutHero__line" />

                <span>REMEMBERED</span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutHero;