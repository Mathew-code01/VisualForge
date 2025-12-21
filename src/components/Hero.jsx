// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
import { useEffect, useRef, useState } from "react";
import useParallax from "../hooks/useParallax";
import useIntersection from "../hooks/useIntersection";
import "../styles/components/hero.css";

const words = [
  "Cinematography",
  "Color Grading",
  "Motion Graphics",
  "Visual Storytelling",
];
const subtitles = [
  "High-impact visuals crafted for modern brands.",
  "Atmospheric grading that defines the mood.",
  "Motion that breathes life into static ideas.",
  "Cinematic narratives that drive engagement.",
];

// High-quality, direct cinematic images
const fallbackImages = [
  "https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1920", // Camera/Cinematography
  "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=1920", // Studio/Coloring
  "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920", // Abstract/Motion
  "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=1920", // Storytelling/Mood
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const heroRef = useRef(null);
  const mediaRef = useRef(null);

  // Intersection logic - fallback to true if the hook isn't detecting properly
  const intersection = useIntersection(heroRef, "-10%");
  const visible = intersection || true;
  const mediaY = useParallax(mediaRef, 0.1);

  useEffect(() => {
    // Cycles every 5 seconds to match the word changes
    const id = setInterval(() => {
      setIndex((p) => (p + 1) % words.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className={`hero-cinematic ${visible ? "is-active" : ""}`}
      ref={heroRef}
    >
      <div
        className="hero-visuals"
        ref={mediaRef}
        style={{ transform: `translate3d(0, ${mediaY}px, 0)` }}
      >
        {fallbackImages.map((img, i) => (
          <div
            key={i}
            className={`hero-bg-wrapper ${index === i ? "active" : ""}`}
            style={{
              opacity: index === i ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
              position: "absolute",
              inset: 0,
            }}
          >
            <img
              src={img}
              alt={words[i]}
              className="hero-bg-image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
        {/* These layers sit on top of the images */}
        <div className="hero-overlay-dark" />
        <div className="hero-noise" />
      </div>

      <div className="hero-container">
        {/* Re-rendering this div on index change triggers the CSS entry animations */}
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