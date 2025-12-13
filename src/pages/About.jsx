// src/pages/About.jsx

// src/pages/About.jsx
// src/pages/About.jsx
// src/pages/About.jsx
// src/pages/About.jsx
import { useEffect, useState } from "react";
import "../styles/pages/about.css";
import "../styles/theme.css";
import { FaVideo, FaPalette, FaBolt, FaFilm, FaLinkedin } from "react-icons/fa";

const About = () => {
  const [floatingLights, setFloatingLights] = useState([]);
  const lightsCount = 12;

  useEffect(() => {
    // Auto scroll to top when page is loaded
    window.scrollTo({ top: 0, behavior: "smooth" });

    const lightsArray = Array.from({ length: lightsCount }).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 5,
    }));
    setFloatingLights(lightsArray);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document
        .querySelectorAll(".af-about-hero .af-floating-light")
        .forEach((light, i) => {
          light.style.transform = `translate(${
            Math.sin(scrollY * 0.01 + i) * 20
          }px, ${Math.cos(scrollY * 0.01 + i) * 20}px)`;
        });
      const heroContent = document.querySelector(
        ".af-about-hero .af-hero-content"
      );
      if (heroContent)
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="af-about-page">
      {/* Hero Section */}
      <section className="af-about-hero">
        <video
          className="af-hero-video"
          src="src/assets/videos/bg1.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="af-floating-lights">
          {floatingLights.map((light) => (
            <span
              key={light.id}
              className="af-floating-light"
              style={{
                top: `${light.top}%`,
                left: `${light.left}%`,
                width: `${light.size}px`,
                height: `${light.size}px`,
                animationDelay: `${light.delay}s`,
              }}
            />
          ))}
        </div>
        <div className="af-hero-content">
          <h1 className="af-about-title">
            <FaVideo className="af-icon af-title-icon" /> VisualForge
          </h1>
          <p className="af-about-subtitle">
            Cinematic video edits that turn ideas into{" "}
            <strong>visual stories</strong>.
          </p>
          <p className="af-about-tagline">Where imagination meets motion ✨</p>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="af-about-highlights">
        <div className="af-highlight">
          <FaVideo className="af-highlight-icon" />
          <h3>120+</h3>
          <p>Videos Produced</p>
        </div>
        <div className="af-highlight">
          <FaPalette className="af-highlight-icon" />
          <h3>40+</h3>
          <p>Design Projects</p>
        </div>
        <div className="af-highlight">
          <FaBolt className="af-highlight-icon" />
          <h3>8 yrs</h3>
          <p>Creative Experience</p>
        </div>
      </section>

      {/* Craft / Skills Section */}
      <section className="af-about-craft">
        <h2 className="af-section-title">Our Craft</h2>
        <ul className="af-skills-list">
          <li>
            <FaVideo className="af-icon" /> Video Editing & Post-Production
          </li>
          <li>
            <FaBolt className="af-icon" /> Motion Graphics & Animation
          </li>
          <li>
            <FaFilm className="af-icon" /> Cinematic Color Grading
          </li>
          <li>
            <FaPalette className="af-icon" /> UI/UX & Digital Interfaces
          </li>
        </ul>
      </section>

      {/* work CTA */}
      <section className="af-about-portfolio-cta">
        <h2 className="af-section-title">Curious About Our Work?</h2>
        <p>
          Explore our cinematic projects that bring stories to life.{" "}
          <a href="/work" className="af-about-link">
            Check out the Project →
          </a>
        </p>
      </section>

      {/* Connect Section */}
      <section className="af-about-connect">
        <h2 className="af-section-title">Let’s Connect</h2>
        <p>
          Interested in collaborating or exploring opportunities?{" "}
          <a href="/contact" className="af-about-link">
            Get in touch
          </a>{" "}
          or connect on{" "}
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="af-about-link af-linkedin-link"
          >
            <FaLinkedin className="af-icon" /> LinkedIn
          </a>
          .
        </p>
      </section>
    </main>
  );
};

export default About;


