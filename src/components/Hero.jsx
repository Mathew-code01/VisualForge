// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
import { useEffect, useState } from "react";
import "../styles/components/hero.css";

// 1. Import your local assets
import theArchiveImg from "../assets/images/theArchive.webp";
import visualExcellenceImg from "../assets/images/visualExcellence.webp";

const heroSlides = [
  {
    label: "Editorial Studio",
    title: "The Archive",
    subtext: "High-performance editing for global commercials and narrative-driven campaigns.",
    image: theArchiveImg, // Use the imported variable
  },
  {
    label: "Creative Finish",
    title: "Visual Excellence",
    subtext: "Defining the aesthetic of modern brand stories through precision post-production.",
    image: visualExcellenceImg, // Use the imported variable
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
        <div className="hero-overlay-cinematic"></div>
      </div>

      <div className="hero-container">
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
            <a href="/work" className="btn-elite-primary">View Work</a>
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