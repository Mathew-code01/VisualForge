// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
import { useEffect, useState } from "react";
import WorkGrid from "../components/WorkGrid";
import ParticleBackground from "../components/ParticleBackground";

import { FaArrowDown } from "react-icons/fa";
import "../styles/pages/work.css";

const FloatingLights = ({ count = 15 }) => {
  const [lights, setLights] = useState([]);

  useEffect(() => {
    const lightsArray = Array.from({ length: count }).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 2 + Math.random() * 10,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 20,
    }));
    setLights(lightsArray);
  }, [count]);

  return (
    <div className="floating-lights-container">
      {lights.map((light) => (
        <span
          key={light.id}
          className="floating-light"
          style={{
            top: `${light.top}%`,
            left: `${light.left}%`,
            width: `${light.size}px`,
            height: `${light.size}px`,
            animationDelay: `${light.delay}s`,
            animationDuration: `${light.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// src/pages/Work.jsx

const bgImageUrl = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop";

const Work = () => {
  return (
    <main className="portfolio-page">
      <section className="portfolio-hero">
        <div className="hero-video-wrapper">
          {/* Replaced video with the Cinematic Hero-style Image */}
          <img
            src={bgImageUrl}
            alt="Cinematic Background"
            className="hero-video"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              filter: "brightness(0.3) contrast(1.2) saturate(0.8)", // Mimics the Hero overlay
            }}
          />
          <div className="hero-vignette" />
        </div>

        <div className="hero-background-effects">
          <ParticleBackground className="hero-particles" />
          <FloatingLights count={15} />
        </div>

        <div className="hero-content">
          <span className="pre-title">BigDay-Media Studio — Est. 2024</span>
          <h1 className="portfolio-title">
            Creative <span className="gradient-text">Direction</span>
          </h1>
          <p className="portfolio-subtitle">
            Exploring the intersection of cinematic storytelling and technical
            precision.
          </p>
          <a href="#featured" className="scroll-hint">
            <FaArrowDown className="scroll-icon" />
            <span>View Portfolio</span>
          </a>
        </div>
      </section>

      {/* ... Rest of code */}

      {/* --- CONTENT SECTIONS --- */}
      <section id="featured" className="portfolio-section featured-section">
        <div className="container">
          <WorkGrid
            title="Featured Selection"
            featured={true}
            enableHoverPreview={true}
          />
        </div>
      </section>

      <section className="portfolio-section archive-section">
        <div className="container">
          <WorkGrid
            title="Full Archive"
            featured={false}
            enableHoverPreview={true}
          />
        </div>
      </section>
    </main>
  );
};

export default Work;