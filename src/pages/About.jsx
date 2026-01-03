// src/pages/About.jsx

// src/pages/About.jsx
// src/pages/About.jsx
// src/pages/About.jsx
import { useEffect, useRef } from "react";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import "../styles/pages/about.css";

const PROCESS_STEPS = [
  {
    title: "Pre-Visualization",
    desc: "Mapping the creative roadmap and deconstructing the project's technical requirements.",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000",
  },
  {
    title: "The Assembly",
    desc: "Where rhythm meets narrative. Precision editorial, sound architecture, and chromatic grading.",
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000",
  },
  {
    title: "Mastering",
    desc: "Comprehensive QC and optimization for high-fidelity playback across global platforms.",
    img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2000",
  },
];

const About = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (heroRef.current) heroRef.current.classList.add("is-visible");
  }, []);

  return (
    <main className="about-page-standard">
      {/* 1. HERO: Zebra Dark (Centered Hero Text) */}
      <section className="about-hero-editorial" ref={heroRef}>
        <div className="hero-bg-accent"></div>
        <div className="about-hero-container">
          <div className="hero-top-meta">
            <span className="meta-label">The Studio</span>
            <span className="meta-line"></span>
          </div>

          <h1 className="about-display-title">
            Visual Excellence <br />
            <span className="text-outline">Built for Impact</span>
          </h1>

          <div className="hero-bottom-grid">
            <p className="hero-editorial-text">
              We specialize in narrative-driven visual editorial, blending
              cinematic artistry with technical rigor to define the next
              generation of brand stories.
            </p>
            <div className="scroll-indicator">
              <span className="scroll-text">Studio Ethos</span>
              <FiArrowDown />
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISION: Zebra White */}
      <section className="about-vision-section">
        <div className="vision-container">
          <div className="vision-left">
            <div className="vision-image-wrapper">
              <img
                src="https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?w=800"
                alt="Studio"
              />
              <div className="image-float-card">
                <strong>08+</strong>
                <span>Years of Practice</span>{" "}
                {/* Removed '01, 02' style numbering as requested */}
              </div>
            </div>
          </div>
          <div className="vision-right">
            <span className="section-tag-elite">Our Philosophy</span>
            <h2 className="vision-heading">
              Where Art Meets <span>Technical Rigor.</span>
            </h2>
            <p className="vision-p">
              We engineer visual flow. By combining chromatic precision with an
              intuitive sense of timing, we transform raw assets into
              high-fidelity immersive experiences.
            </p>
            <div className="vision-stats">
              <div className="v-stat">
                <strong>120+</strong>
                <span>Global Deliveries</span>
              </div>
              <div className="v-stat">
                <strong>0ms</strong>
                <span>Framerate Deviation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORKFLOW: Zebra Dark */}
      <section className="about-workflow-section bg-deep">
        <div className="about-container-unique">
          <header className="section-header-block">
            <span className="section-tag-elite">Methodology</span>
            <h2 className="section-heading-unique">The Pipeline</h2>
          </header>

          <div className="process-grid-elite">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="process-card-landscape">
                <div className="process-image-wrapper">
                  <img src={step.img} alt={step.title} />
                  <div className="process-overlay" />
                </div>
                <div className="process-content">
                  <h3 className="p-card-title">{step.title}</h3>
                  <p className="p-card-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA: Zebra White */}
      <section className="about-final-cta">
        <div className="cta-content-modern">
          <h2 className="cta-huge-text">
            Elevate your <br />
            next narrative.
          </h2>
          <div className="cta-action-group">
            <a href="/contact" className="cta-btn-primary">
              Start Project <FiArrowRight />
            </a>
            <a href="/work" className="cta-btn-link">
              View Archive
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;