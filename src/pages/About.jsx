// src/pages/About.jsx

// src/pages/About.jsx
// src/pages/About.jsx
// src/pages/About.jsx
// src/pages/About.jsx
// src/pages/About.jsx
import { useEffect, useRef } from "react";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import "../styles/pages/about.css";

const PROCESS_STEPS = [
  {
    title: "Discovery",
    desc: "Understanding your brand's DNA and project goals.",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Forging",
    desc: "The creative phase where we edit, animate, and grade.",
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Delivery",
    desc: "Refining every pixel until it's ready for the world.",
    img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2000&auto=format&fit=crop",
  },
];

const About = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (heroRef.current) {
      heroRef.current.classList.add("is-visible");
    }
  }, []);

  return (
    <main className="about-page-standard">
      <section className="about-hero-editorial" ref={heroRef}>
        <div className="hero-bg-accent"></div>
        <div className="about-hero-container">
          <div className="hero-top-meta">
            <span className="meta-label">Who We Are</span>
            <span className="meta-line"></span>
          </div>

          <h1 className="about-display-title">
            Visual Excellence <br />
            <span className="text-outline">Built for Impact</span>
          </h1>

          <div className="hero-bottom-grid">
            <p className="hero-editorial-text">
              We operate at the intersection of high-end cinematography and
              precision motion design to build unforgettable brand stories.
            </p>
            <div className="scroll-indicator">
              <span className="scroll-text">Scroll to explore</span>
              <FiArrowDown />
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. THE VISION --- */}
      <section className="about-vision-section">
        <div className="vision-container">
          <div className="vision-left">
            <div className="vision-image-wrapper">
              <img
                src="https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Studio"
              />
              <div className="image-float-card">
                <strong>8+</strong>
                <span>Years of Excellence</span>
              </div>
            </div>
          </div>
          <div className="vision-right">
            <span className="section-tag-elite">The Vision</span>
            <h2 className="vision-heading">
              Bridging Art & <span>Technology.</span>
            </h2>
            <p className="vision-p">
              Founded on the principle of technical excellence, we don't just
              edit video; we engineer visual experiences that demand attention
              in a crowded landscape.
            </p>
            <div className="vision-stats">
              <div className="v-stat">
                <strong>120+</strong>
                <span>Projects</span>
              </div>
              <div className="v-stat">
                <strong>100%</strong>
                <span>Precision</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. WORKFLOW (Refined Landscape Cards) --- */}
      <section className="about-workflow-section bg-deep">
        <div className="about-container-unique">
          <header className="section-header-block">
            <span className="section-tag-elite">Workflow</span>
            <h2 className="section-heading-unique">Our Process</h2>
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

      {/* --- 4. FINAL CTA --- */}
      <section className="about-final-cta">
        <div className="cta-content-modern">
          <h2 className="cta-huge-text">
            Let's build your vision. <br />
            Get in touch
          </h2>
          <div className="cta-action-group">
            <a href="/contact" className="cta-btn-primary">
              Start a Project <FiArrowRight />
            </a>
            <a href="/work" className="cta-btn-link">
              View Portfolio
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;