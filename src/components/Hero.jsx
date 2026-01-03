// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
import { useEffect, useState } from "react";
import "../styles/components/hero.css";

const heroSlides = [
  {
    label: "Editorial Studio", // More professional than "National Expertise"
    title: "The Archive", // Focuses on the "Display of Work"
    subtext:
      "High-performance editing for global commercials and narrative-driven campaigns.",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000",
  },
  {
    label: "Creative Finish", // Focuses on the high-end output
    title: "Visual Excellence",
    subtext:
      "Defining the aesthetic of modern brand stories through precision post-production.",
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2000",
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
    <section className="hero-elite-centered">
      <div className="hero-bg-layer">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide-img ${index === i ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        {/* Cinematic dark overlay for text visibility */}
        <div className="hero-overlay-cinematic"></div>
      </div>

      <div className="hero-container">
        <div className="hero-inner-content" key={index}>
          <div className="reveal-box">
            {/* Reduced text sizes as per client style */}
            <span className="hero-tagline">{heroSlides[index].label}</span>
          </div>
          <div className="reveal-box">
            <h1 className="hero-main-title">{heroSlides[index].title}</h1>
          </div>
          <div className="reveal-box">
            {/* Better spacing and professional phrasing */}
            <p className="hero-description">{heroSlides[index].subtext}</p>
          </div>

          <div className="hero-cta-group">
            <a href="/work" className="btn-elite-primary">
              View Work {/* Removed 'Portfolio' for 'Work' */}
            </a>
            <button className="btn-showreel">
              <span className="play-circle">▶</span>
              <span className="link-text">Play Showreel</span>
              <span className="line-grow"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}