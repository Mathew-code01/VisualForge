// src/pages/About.jsx

// src/pages/About.jsx
// src/pages/About.jsx
// src/pages/About.jsx
// src/pages/About.jsx
// src/pages/About.jsx
// src/pages/About.jsx
import { useEffect, useRef } from "react";
// Removed unused icons to prevent further ESLint errors
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import "../styles/pages/about.css";

const PROCESS_STEPS = [
  { title: "Discovery", desc: "Understanding your brand's DNA and project goals.", index: "01" },
  { title: "Forging", desc: "The creative phase where we edit, animate, and grade.", index: "02" },
  { title: "Delivery", desc: "Refining every pixel until it's ready for the world.", index: "03" },
];

const About = () => {
  // 1. Ref is now defined
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Optional: Add a class for entrance animations
    if (heroRef.current) {
        heroRef.current.classList.add("is-visible");
    }
  }, []);

  return (
    <main className="about-page-standard">
      {/* 2. ATTACHED THE REF HERE to fix the error */}
      <section className="about-hero-editorial" ref={heroRef}>
        <div className="hero-bg-accent"></div>
        <div className="about-hero-container">
          <div className="hero-top-meta">
            <span className="meta-label">Who We Are</span>
            <span className="meta-line"></span>
          </div>
          
          <h1 className="about-display-title">
            Forging Digital <br />
            <span className="text-outline">Alchemy</span>
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
            <span className="section-index">01 — The Vision</span>
            <h2 className="vision-heading">Bridging Art & <span>Technology.</span></h2>
            <p className="vision-p">
              Founded on the principle of technical excellence, we don't just edit video; 
              we engineer visual experiences that demand attention in a crowded landscape.
            </p>
            <div className="vision-stats">
              <div className="v-stat"><strong>120+</strong><span>Projects</span></div>
              <div className="v-stat"><strong>100%</strong><span>Precision</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. WORKFLOW --- */}
      <section className="about-workflow-section">
        <div className="workflow-header">
          <h2 className="workflow-title">Our Process</h2>
          <div className="workflow-line"></div>
        </div>
        
        <div className="workflow-container">
          {PROCESS_STEPS.map((step, idx) => (
            <div key={idx} className="process-card-modern">
              <span className="p-card-num">{step.index}</span>
              <h4 className="p-card-title">{step.title}</h4>
              <p className="p-card-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 4. FINAL CTA --- */}
      <section className="about-final-cta">
        <div className="cta-content-modern">
          <h2 className="cta-huge-text">Ready to <br/>Start?</h2>
          <p className="cta-sub">Join the brands that demand visual excellence.</p>
          <div className="cta-action-group">
            <a href="/contact" className="cta-btn-primary">
              Get in touch <FiArrowRight />
            </a>
            <a href="/work" className="cta-btn-link">View Portfolio</a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;