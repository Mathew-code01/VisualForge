// src\components\home\TrustedBy.jsx

// src/components/home/TrustedBy.jsx

import { ArrowUpRight } from "lucide-react";

import aflluxeLogo from "../../assets/trusted/AFLLUXE-04.png";
import coloredBlackLogo from "../../assets/trusted/Colored black.png";
import expetHubLogo from "../../assets/trusted/Expet hub-05.png";
import newkrooLogo from "../../assets/trusted/newkroo-logo-BBgxBlWa.png";
import ziboraLogo from "../../assets/trusted/Zibora LOGO-02.png";
import zidexLogo from "../../assets/trusted/zidex-logo-master.png";

import "../../styles/components/trustedby.css";

/* ============================================================
   TRUSTED CLIENTS
============================================================ */

const TRUSTED_CLIENTS = [
  {
    name: "AFL Luxe",
    logo: aflluxeLogo,
  },
  {
    name: "Colored Black",
    logo: coloredBlackLogo,
  },
  {
    name: "ExPet Hub",
    logo: expetHubLogo,
  },
  {
    name: "Newkroo",
    logo: newkrooLogo,
  },
  {
    name: "Zibora",
    logo: ziboraLogo,
  },
  {
    name: "Zidex",
    logo: zidexLogo,
  },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function TrustedBy() {
  return (
    <section
      className="trusted-by section-light"
      data-theme="light"
      aria-labelledby="trusted-by-title"
    >
      <div className="trusted-by__container">
        {/* ==================================================
            TOP HEADER
        ================================================== */}

        <header className="trusted-by__header">
          <div className="trusted-by__eyebrow eyebrow">
            <span>Trusted by</span>
          </div>

          <div className="trusted-by__heading-wrap">
            <div className="trusted-by__title-column">
              <h2 id="trusted-by-title" className="trusted-by__title">
                Trusted by ambitious teams
                <span>building what comes next.</span>
              </h2>
            </div>

            <div className="trusted-by__description-column">
              <p className="trusted-by__description">
                From growing businesses to ambitious brands, we help teams turn
                complex ideas into communication people can understand.
              </p>

              <div className="trusted-by__meta">
                <span className="trusted-by__meta-dot" />
                <span>Selected collaborations</span>
              </div>
            </div>
          </div>
        </header>

        {/* ==================================================
            DIVIDER
        ================================================== */}

        <div className="trusted-by__divider" aria-hidden="true" />

        {/* ==================================================
            LOGO GRID
        ================================================== */}

        <div
          className="trusted-by__logos"
          role="list"
          aria-label="Companies and brands we have worked with"
        >
          {TRUSTED_CLIENTS.map((client, index) => (
            <div
              key={client.name}
              className="trusted-by__logo-card"
              role="listitem"
              aria-label={client.name}
            >
              <div className="trusted-by__logo-index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="trusted-by__logo-inner">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="trusted-by__logo"
                  loading="lazy"
                  decoding="async"
                />

                <span className="trusted-by__logo-action" aria-hidden="true">
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.7}
                  />
                </span>
              </div>

              <div className="trusted-by__logo-name">
                {client.name}
              </div>
            </div>
          ))}
        </div>

        {/* ==================================================
            BOTTOM STATEMENT
        ================================================== */}

        <footer className="trusted-by__bottom">
          <div className="trusted-by__bottom-line" />

          <p className="trusted-by__bottom-text">
            Strategy
            <span>·</span>
            Identity
            <span>·</span>
            Communication
            <span>·</span>
            Digital Experiences
          </p>

          <div className="trusted-by__bottom-line" />
        </footer>
      </div>
    </section>
  );
}