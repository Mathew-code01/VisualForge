// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
import { useEffect, useRef, useState } from "react";
import useParallax from "../hooks/useParallax";
import useIntersection from "../hooks/useIntersection";
import "../styles/components/hero.css";

const words = ["Cinematography", "Color Grading", "Motion Graphics", "Visual Storytelling"];
const subtitles = [
  "High-impact visuals crafted for modern brands.",
  "Atmospheric grading that defines the mood.",
  "Motion that breathes life into static ideas.",
  "Cinematic narratives that drive engagement."
];

// FIX 1: Add placeholder images so the map function actually renders layers
const fallbackImages = [
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=2000"
]; 

export default function Hero() {
  const [index, setIndex] = useState(0);
  const heroRef = useRef(null);
  const mediaRef = useRef(null);
  
  // FIX 2: Default to true if you want it visible immediately on load
  const visible = useIntersection(heroRef, "-10%") || true; 
  const mediaY = useParallax(mediaRef, 0.1);

  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % words.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={`hero-cinematic ${visible ? "is-active" : ""}`} ref={heroRef}>
      <div className="hero-visuals" ref={mediaRef} style={{ transform: `translate3d(0, ${mediaY}px, 0)` }}>
        {fallbackImages.map((img, i) => (
          <div key={i} className={`hero-bg-wrapper ${index === i ? "active" : ""}`}>
            <img src={img} alt="" className="hero-bg-image" />
          </div>
        ))}
        <div className="hero-overlay-dark" />
        <div className="hero-noise" />
      </div>

      <div className="hero-container">
        {/* FIX 3: Add key={index} to the content wrapper to restart animations on word change */}
        <div className="hero-content" key={index}>
          <div className="hero-pre-title">
            <span className="dot"></span>
            <span className="label">Based in Lagos / Available Globally</span>
          </div>

          <h1 className="hero-title">
            <span className="title-row">
              <span className="row-inner">Professional</span>
            </span>
            <span className="title-row primary">
              <span className="row-inner">{words[index]}</span>
            </span>
          </h1>

          <div className="hero-bottom-row">
            <p className="hero-subtext">{subtitles[index]}</p>
            <div className="hero-cta-group">
              <a href="/work" className="btn-elite">
                <span className="btn-text">View Showreel</span>
                <span className="btn-circle">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}