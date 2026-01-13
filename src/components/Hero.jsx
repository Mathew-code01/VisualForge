// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
import { useEffect, useState } from "react";
import "../styles/components/hero.css";

// Assets
import theArchiveImg from "../assets/images/theArchive.webp";
import visualExcellenceImg from "../assets/images/visualExcellence.webp";

const heroSlides = [
  {
    label: "Editorial Studio",
    title: "The Archive",
    subtext:
      "High-performance editing for global commercials and narrative-driven campaigns.",
    image: theArchiveImg,
    id: "01",
  },
  {
    label: "Creative Finish",
    title: "Visual Excellence",
    subtext:
      "Defining the aesthetic of modern brand stories through precision post-production.",
    image: visualExcellenceImg,
    id: "02",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-viewport">
      {/* BACKGROUND ENGINE */}
      <div className="hero-bg-canvas">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide-frame ${index === i ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay-dark" />
          </div>
        ))}
        <div className="hero-noise-texture" />
      </div>

      {/* UI INTERFACE LAYER */}
      <div className="hero-ui-container">
        {/* Top Boundary */}
        <div className="hero-ui-top">
          <div className="ui-marker">
            <span className="dot animate-flicker"></span>
            <span className="ui-text">System Active</span>
          </div>
          <div className="ui-marker hide-mobile">
            <span className="ui-text">4K_RAW_SOURCE</span>
          </div>
          <div className="ui-marker">
            <span className="ui-text">Vol. {heroSlides[index].id}</span>
          </div>
        </div>

        {/* Central Content - Engineered Spacing */}
        <div className="hero-main-content" key={index}>
          <div className="content-wrap">
            <span className="hero-eyebrow">{heroSlides[index].label}</span>
            <h1 className="hero-display-title">{heroSlides[index].title}</h1>
            <p className="hero-body-text">{heroSlides[index].subtext}</p>

            <div className="hero-cta-row">
              <a href="/work" className="btn-cinematic-main">
                Explore Work
              </a>
              <button className="btn-reel-link">
                <span className="reel-circle">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="reel-label">Showreel '26</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Boundary */}
        <div className="hero-ui-bottom">
          <div className="ui-pagination">
            {heroSlides.map((_, i) => (
              <div
                key={i}
                className={`ui-dot ${index === i ? "active" : ""}`}
              />
            ))}
          </div>
          <div className="ui-scroll-box">
            <div className="scroll-line-wrap">
              <div className="scroll-line-moving"></div>
            </div>
            <span className="ui-text">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}