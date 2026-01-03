// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
import { useEffect, useState } from "react";
import "../styles/components/hero.css";

const heroSlides = [
  {
    label: "National Expertise",
    title: "Post-Production",
    subtext: "Precision editing for high-end commercials and cinematic storytelling.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000"
  },
  {
    label: "Global Visual Media",
    title: "Cinematic Narratives",
    subtext: "Crafting digital stories that resonate across international borders.",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2000"
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Slightly longer for readability
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-elite-centered">
      <div className="hero-bg-layer">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide-img ${index === i ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        {/* Subtle noise or grain overlay can be added here for extra texture */}
        <div className="hero-overlay-cinematic"></div>
      </div>

      <div className="hero-container">
        {/* Key change triggers the CSS animations for each slide change */}
        <div className="hero-inner-content" key={index}>
          <div className="reveal-box">
            <span className="hero-tagline">{heroSlides[index].label}</span>
          </div>
          <div className="reveal-box">
            <h1 className="hero-main-title">{heroSlides[index].title}</h1>
          </div>
          <div className="reveal-box">
            <p className="hero-description">{heroSlides[index].subtext}</p>
          </div>

          <div className="hero-cta-group">
            <a href="/work" className="btn-elite-primary">
              View Portfolio
            </a>
            <button className="btn-showreel">
              <span className="play-circle">▶</span>
              <span className="link-text">Watch Showreel</span>
              <span className="line-grow"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}