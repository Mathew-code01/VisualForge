// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
import { useEffect, useState } from "react";
import WorkGrid from "../components/WorkGrid";
import ParticleBackground from "../components/ParticleBackground";
import bgVideo from "../assets/videos/bg1.mp4";
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

const Work = () => {
  return (
    <main className="portfolio-page">
      {/* --- HERO SECTION --- */}
      <section className="portfolio-hero">
        <div className="hero-video-wrapper">
          <video
            className="hero-video"
            src={bgVideo}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="hero-vignette" />
        </div>

        <div className="hero-background-effects">
          <ParticleBackground className="hero-particles" />
          <FloatingLights count={15} />
        </div>

        <div className="hero-content">
          <span className="pre-title">VisualForge Studio — Est. 2024</span>
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