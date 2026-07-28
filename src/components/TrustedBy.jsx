// src/components/TrustedBy.jsx

// src/components/TrustedBy.jsx

import {
  SiSamsung,
  SiMercedes,
  SiNike,
  SiNetflix,
  SiAdidas,
  SiApple,
  SiSony,
  SiHonda,
} from "react-icons/si";

import "../styles/components/trustedBy.css";

const brandIcons = [
  {
    icon: <SiSamsung />,
    name: "Samsung",
  },
  {
    icon: <SiSony />,
    name: "Sony",
  },
  {
    icon: <SiMercedes />,
    name: "Mercedes-Benz",
  },
  {
    icon: <SiNike />,
    name: "Nike",
  },
  {
    icon: <SiNetflix />,
    name: "Netflix",
  },
  {
    icon: <SiAdidas />,
    name: "Adidas",
  },
  {
    icon: <SiHonda />,
    name: "Honda",
  },
  {
    icon: <SiApple />,
    name: "Apple",
  },
];

const TrustedBy = () => {
  return (
    <section
      className="trusted-by section-light"
      data-theme="light"
      aria-label="Brands and organizations we have worked with"
    >
      <div className="trusted-by__container">
        {/* Section label */}
        <div className="trusted-by__label">
          <span
            className="trusted-by__label-line"
            aria-hidden="true"
          />

          <span className="trusted-by__label-text">
            Trusted by
          </span>
        </div>

        {/* Logo marquee */}
        <div
          className="trusted-by__viewport"
          aria-label="Trusted brands"
        >
          <div className="trusted-by__track">
            {/* Primary logo set */}
            {brandIcons.map((brand) => (
              <div
                className="trusted-by__brand"
                key={`primary-${brand.name}`}
                aria-label={brand.name}
                title={brand.name}
              >
                <span
                  className="trusted-by__icon"
                  aria-hidden="true"
                >
                  {brand.icon}
                </span>

                <span className="trusted-by__brand-name">
                  {brand.name}
                </span>
              </div>
            ))}

            {/* Duplicate logo set for infinite marquee */}
            <div
              className="trusted-by__duplicate"
              aria-hidden="true"
            >
              {brandIcons.map((brand) => (
                <div
                  className="trusted-by__brand"
                  key={`duplicate-${brand.name}`}
                >
                  <span
                    className="trusted-by__icon"
                    aria-hidden="true"
                  >
                    {brand.icon}
                  </span>

                  <span className="trusted-by__brand-name">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
