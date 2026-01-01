// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
import { useEffect, useState } from "react";
import "../styles/components/hero.css";

const heroSlides = [
  {
    topLine: "National",
    mainLine: "POST-PRODUCTION",
    bottomLine: "Expertise",
    subtext:
      "Precision editing for high-end commercials and cinematic storytelling.",
    // A high-end professional color grading / editing suite
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop",
  },
  {
    topLine: "Global",
    mainLine: "VISUAL MEDIA",
    bottomLine: "Agency",
    subtext:
      "Crafting digital narratives that resonate across international borders.",
    // A clean, vibrant creative workstation
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2000&auto=format&fit=crop",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-vibrant-white">
      <div className="hero-media-canvas">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`canvas-image ${index === i ? "active" : ""}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              zIndex: index === i ? 2 : 1,
            }}
          />
        ))}
        <div className="canvas-light-wash"></div>
      </div>

      <div className="hero-content-wrapper">
        <div className="hero-inner" key={index}>
          <div className="hero-meta">
            <span className="line"></span>
            <p>BigDay Media Agency</p>
          </div>

          <h1 className="hero-giant-text">
            <span className="text-top">{heroSlides[index].topLine}</span>
            <span className="text-solid">{heroSlides[index].mainLine}</span>
            <span className="text-outline">{heroSlides[index].bottomLine}</span>
          </h1>

          <div className="hero-footer-info">
            <div className="desc-glass-card">
              <p className="hero-desc">{heroSlides[index].subtext}</p>
            </div>

            <div className="hero-btns">
              <a href="/work" className="btn-vibrant">
                View Portfolio
              </a>
              <button className="btn-play-light">
                <span className="play-circle">▶</span>
                <span className="play-text">Showreel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}