// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
import { useEffect, useState } from "react";
import "../styles/components/hero.css";

const heroSlides = [
  {
    label: "National Expertise",
    title: "Post-Production",
    subtext:
      "Precision editing for high-end commercials and cinematic storytelling.",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop",
  },
  {
    label: "Global Visual Media",
    title: "Cinematic Narratives",
    subtext:
      "Crafting digital stories that resonate across international borders.",
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
    <section className="hero-elite-centered">
      {/* Background Layer */}
      <div className="hero-bg-layer">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide-img ${index === i ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        <div className="hero-overlay-minimal"></div>
      </div>

      {/* Content Layer */}
      <div className="container hero-container">
        <div className="hero-inner-content" key={index}>
          <span className="hero-tagline">{heroSlides[index].label}</span>
          <h1 className="hero-main-title">{heroSlides[index].title}</h1>
          <p className="hero-description">{heroSlides[index].subtext}</p>

          <div className="hero-cta-group">
            <a href="/work" className="btn-outline-box">
              <span>View Portfolio</span>
            </a>
            <button className="btn-text-link">
              <span className="link-icon">▶</span>
              <span className="link-text">Watch Showreel</span>
              <span className="link-underline"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}