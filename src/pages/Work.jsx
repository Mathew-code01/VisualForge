// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import WorkCard from "../components/WorkCard";
import works from "../data/works";
import ParticleBackground from "../components/ParticleBackground";
import "../styles/pages/work.css";
import "../styles/theme.css";
import bgVideo from "../assets/videos/bg1.mp4";
import { FaStar, FaFolderOpen, FaArrowDown } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";

const Work = () => {
  const featuredWorks = works.slice(0, 6);
  const [floatingLights, setFloatingLights] = useState([]);
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const lightsCount = 12;

  // Add floating lights
  useEffect(() => {
    const lightsArray = Array.from({ length: lightsCount }).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 5,
    }));
    setFloatingLights(lightsArray);
  }, []);

  // Trigger video fade-in
  useEffect(() => {
    if (heroRef.current) heroRef.current.classList.add("is-visible");
  }, []);

  // Scroll parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (videoRef.current) {
        videoRef.current.style.transform = `translateY(${scrollY * 0.15}px) scale(1.07)`;
      }
      const lights = document.querySelectorAll(".floating-light");
      lights.forEach((light, index) => {
        const speed = (index + 1) * 0.02;
        light.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="portfolio-page">
      {/* Hero Section */}
      <section className="portfolio-hero" ref={heroRef}>
        {/* Video Background */}
        <div className="hero-video-wrapper premium-hero-video">
          <video
            className="hero-video"
            ref={videoRef}
            src={bgVideo}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Particle overlay */}
        <ParticleBackground className="hero-particles" />

        {/* Floating lights overlay */}
        <div className="floating-lights">
          {floatingLights.map((light) => (
            <span
              key={light.id}
              className="floating-light"
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

        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="portfolio-title">
            <MdVideoLibrary className="icon title-icon" /> VisualForge Showcase
          </h1>
          <p className="portfolio-subtitle">
            Showcasing cinematic video edits that transform ideas into{" "}
            <strong>visual stories</strong>.
          </p>
          <Link to="#featured" className="scroll-hint">
            <FaArrowDown className="icon scroll-icon" /> Explore Featured Work
          </Link>
        </div>

        {/* Fallback for no JS / video fail */}
        <noscript>
          <div className="hero-fallback">
            <h1 className="portfolio-title">VisualForge Showcase</h1>
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="floating-light-fallback"
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                }}
              />
            ))}
          </div>
        </noscript>
      </section>

      {/* Featured Projects */}
      <section id="featured" className="portfolio-section featured-section">
        <div className="container">
          <h2 className="section-title">
            <FaStar className="icon section-icon" /> Featured Projects
          </h2>
          <p className="section-desc">
            Our top cinematic edits — where storytelling meets craft.
          </p>
          <div className="portfolio-grid featured-grid">
            {featuredWorks.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        </div>
      </section>

      {/* Full Collection */}
      <section className="portfolio-section full-collection">
        <div className="container">
          <h2 className="section-title">
            <FaFolderOpen className="icon section-icon" /> Full Collection
          </h2>
          <p className="section-desc">
            Explore all works — diverse projects, unique styles, and cinematic
            creativity.
          </p>
          <div className="portfolio-grid">
            {works.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
          <div className="portfolio-cta">
            <Link to="/work/all" className="portfolio-link">
              Browse Full Collection →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Work;
