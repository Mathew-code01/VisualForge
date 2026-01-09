// src/pages/About.jsx

// src/pages/About.jsx
// src/pages/About.jsx
// src/pages/About.jsx
import { useState, useEffect, useRef, useMemo } from "react";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import Loader from "../components/Loader.jsx";
import useImagePreloader from "../hooks/useImagePreloader";

// Asset Imports
import heroImg from "../assets/images/builtForImpactAbout.webp";
import aitStudio from "../assets/images/aitStudio.webp";
import preVisImg from "../assets/images/pre-Visualization.webp";
import assemblyImg from "../assets/images/theAssembly.webp";
import masteringImg from "../assets/images/mastering.webp";

import "../styles/pages/about.css";

const PROCESS_STEPS = [
  {
    title: "Pre-Visualization",
    desc: "Mapping the creative roadmap with precision storyboarding and conceptual mood-boards.",
    img: preVisImg,
  },
  {
    title: "The Assembly",
    desc: "Where rhythm meets narrative. We weave raw sequences into a cohesive, high-impact flow.",
    img: assemblyImg,
  },
  {
    title: "Mastering",
    desc: "Comprehensive QC, chromatic balancing, and final high-fidelity polish for global delivery.",
    img: masteringImg,
  },
];

const About = () => {
  const [timerDone, setTimerDone] = useState(false);
  const heroRef = useRef(null);

  const aboutImages = useMemo(
    () => [heroImg, aitStudio, preVisImg, assemblyImg, masteringImg],
    []
  );

  const imagesLoaded = useImagePreloader(aboutImages);

  useEffect(() => {
    const timer = setTimeout(() => setTimerDone(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!timerDone || !imagesLoaded) return <Loader />;

  return (
    <main className="about-page-standard">
      {/* 1. HERO: Image + Black Blur Overlay */}
      <section className="about-hero-editorial" ref={heroRef}>
        {/* The Base Image */}
        <div className="hero-image-bg">
          <img src={heroImg} alt="Visual Excellence" />
        </div>

        {/* The Glassmorphism Blur & Gradient Layer */}
        <div className="hero-blur-overlay"></div>

        <div className="about-hero-container">
          <div className="hero-top-meta">
            <span className="meta-label">The Studio</span>
            <span className="meta-line"></span>
          </div>
          <h1 className="about-display-title">
            Visual Excellence <br />
            <span className="text-outline">Built for Impact</span>
          </h1>
          <p className="hero-editorial-text">
            We specialize in narrative-driven visual editorial, transforming
            conceptual ideas into immersive digital realities.
          </p>
          <div className="scroll-indicator">
            <span className="scroll-text">Studio Ethos</span>
            <FiArrowDown />
          </div>
        </div>
      </section>

      {/* 2. VISION: Zebra White */}
      <section className="about-vision-section">
        <div className="vision-container">
          <div className="vision-left">
            <div className="vision-image-wrapper">
              <img src={aitStudio} alt="BigDay Media Studio" />
              <div className="image-float-card">
                <strong>08+</strong>
                <span>Years of Practice</span>
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
      <section className="about-workflow-section">
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
        <div className="cta-background-watermark">IMPACT</div>
        <div className="cta-content-modern">
          <span className="section-tag-elite">Next Steps</span>
          <h2 className="cta-huge-text">
            Elevate your <br />
            <span className="text-gradient">next narrative.</span>
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