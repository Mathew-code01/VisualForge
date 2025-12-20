// src/pages/About.jsx

// src/pages/About.jsx
// src/pages/About.jsx
// src/pages/About.jsx
import { useEffect, useRef, useMemo } from "react";
import {
  FaVideo,
  FaPalette,
  FaBolt,
  FaFilm,
  FaArrowRight,
  FaCogs,
  FaMagic,
  FaCheckCircle,
} from "react-icons/fa";
import bgVideo from "../assets/videos/bg1.mp4";
import "../styles/pages/about.css";

// --- Configuration Data ---
const PROCESS_STEPS = [
  {
    icon: <FaCogs />,
    title: "Discovery",
    desc: "Understanding your brand's DNA and project goals.",
  },
  {
    icon: <FaMagic />,
    title: "Forging",
    desc: "The creative phase where we edit, animate, and grade.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Delivery",
    desc: "Refining every pixel until it's ready for the world.",
  },
];

const EXPERTISE = [
  {
    icon: <FaVideo />,
    title: "Cinematography",
    desc: "Premium post-production & film editing.",
  },
  {
    icon: <FaBolt />,
    title: "Motion Design",
    desc: "Fluid animations that capture attention.",
  },
  {
    icon: <FaFilm />,
    title: "Color Grading",
    desc: "Scientific color science for mood & tone.",
  },
  {
    icon: <FaPalette />,
    title: "Visual Identity",
    desc: "Branding that lives in the digital space.",
  },
];

const About = () => {
  const heroRef = useRef(null);

  // Memoize light properties to prevent re-calculation on every render
  const lights = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: `light-${i}`,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 2 + Math.random() * 6,
        duration: 10 + Math.random() * 20,
        delay: Math.random() * 5,
      })),
    []
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const timer = setTimeout(
      () => heroRef.current?.classList.add("is-visible"),
      100
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="about-page">
      {/* --- HERO SECTION --- */}
      <section className="about-hero" ref={heroRef}>
        <div className="hero-video-container">
          <video
            className="hero-video"
            src={bgVideo}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="hero-overlay" />
        </div>

        <div className="floating-lights">
          {lights.map((light) => (
            <span
              key={light.id}
              className="about-light-orb"
              style={{
                top: `${light.top}%`,
                left: `${light.left}%`,
                width: `${light.size}px`,
                height: `${light.size}px`,
                animationDuration: `${light.duration}s`,
                animationDelay: `${light.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="hero-content">
          <span className="badge">Digital Post-Production Studio</span>
          <h1 className="about-title">
            Visual<span className="accent">Forge</span>
          </h1>
          <p className="about-subtitle">
            We don't just edit video. We forge{" "}
            <strong>cinematic experiences</strong>.
          </p>
        </div>
      </section>

      {/* --- TICKER --- */}
      <aside className="awards-ticker">
        <div className="ticker-track">
          {[1, 2].map(
            (
              group // Double for seamless loop
            ) => (
              <div key={group} className="ticker-group">
                <span>CINEMATOGRAPHY 2024</span> <span className="dot">•</span>
                <span>BEST MOTION GRAPHICS</span> <span className="dot">•</span>
                <span>CREATIVE EXCELLENCE</span> <span className="dot">•</span>
              </div>
            )
          )}
        </div>
      </aside>

      {/* --- THE VISION --- */}
      <section className="about-vision container">
        <div className="vision-grid">
          <div className="vision-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2070"
              alt="Creative Studio Setup"
              loading="lazy"
              onLoad={(e) => e.target.classList.add("loaded")}
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1492691523567-6170c3295db5?q=80&w=2071"; // Fallback image
              }}
            />
            <div className="experience-tag">Since 2016</div>
          </div>
          <article className="vision-text">
            <h2 className="section-label">The Vision</h2>
            <h3>
              Bridging the gap between <span>Art</span> and{" "}
              <span>Technology</span>.
            </h3>
            <p>
              Founded on the principle of technical excellence, VisualForge
              operates at the intersection of high-end cinematography and
              precision motion design.
            </p>
            <div className="vision-stats">
              <div className="mini-stat">
                <strong>8+</strong> Years
              </div>
              <div className="mini-stat">
                <strong>120+</strong> Projects
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* --- WORKFLOW --- */}
      <section className="about-process bg-alt">
        <div className="container">
          <h2 className="section-label centered">The Workflow</h2>
          <div className="process-grid">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.title} className="process-card">
                <span className="process-number">0{idx + 1}</span>
                <div className="process-icon">{step.icon}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPERTISE --- */}
      <section className="about-craft container">
        <header className="craft-header">
          <h2 className="section-label">Our Expertise</h2>
          <h3 className="craft-title">Mastering the Digital Alchemy</h3>
        </header>
        <div className="skills-grid">
          {EXPERTISE.map((skill) => (
            <div key={skill.title} className="skill-item">
              <div className="skill-icon-box">{skill.icon}</div>
              <div className="skill-content">
                <h4>{skill.title}</h4>
                <p>{skill.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="about-cta container">
        <div className="cta-card">
          <h2>Ready to tell your story?</h2>
          <p>Let's collaborate on your next visual masterpiece.</p>
          <div className="cta-group">
            <a href="/work" className="btn-main">
              View Archive <FaArrowRight />
            </a>
            <a href="/contact" className="btn-ghost">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;