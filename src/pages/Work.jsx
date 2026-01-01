// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
import { FiArrowRight, FiArrowDown } from "react-icons/fi";
import WorkGrid from "../components/WorkGrid";
import "../styles/pages/work.css";

const Work = () => {
  const services = ["Post-Production", "Color Grading", "Visual Effects", "Creative Direction"];

  const scrollToFeatured = () => {
    document.getElementById("featured").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="work-page-main">
      {/* 1. HERO SECTION: High Energy */}
      <section className="work-hero-standard">
        <div className="hero-bg-canvas">
          <div className="glow-sphere"></div>
          <div className="grain-filter"></div>
        </div>
        
        <div className="work-hero-grid">
          <div className="work-hero-content">
            <span className="hero-tag">Portfolio 2026</span>
            <h1 className="hero-display-title">
              Visual <br /> 
              <span className="stroke-text">Excellence</span>
            </h1>
            <p className="hero-summary">
              High-end cinematic experiences for brands that demand technical
              precision and a creative edge.
            </p>
            <button onClick={scrollToFeatured} className="hero-action-btn">
              Explore Projects <FiArrowDown />
            </button>
          </div>

          <div className="hero-capabilities-grid">
            {services.map((service, index) => (
              <div key={index} className="capability-card">
                <span className="card-index">0{index + 1}</span>
                <span className="card-label">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROJECTS: Standard Grid */}
      <section className="work-section-vibrant" id="featured">
        <div className="section-inner">
          <header className="work-header-box">
            <div className="header-title-group">
              <span className="index-label">01</span>
              <h2 className="title-md">Selected <br/> Works</h2>
            </div>
            <p className="header-context">
              A curated selection of our most impactful visual stories.
            </p>
          </header>
          <WorkGrid featured={true} />
        </div>
      </section>

      {/* 3. ARCHIVE SECTION: Subtle Shift */}
      <section className="work-section-vibrant bg-offset">
        <div className="section-inner">
          <header className="work-header-box">
            <div className="header-title-group">
              <span className="index-label">02</span>
              <h2 className="title-md">Full <br/> Archive</h2>
            </div>
          </header>
          <WorkGrid featured={false} />
        </div>
      </section>

      {/* 4. CALL TO ACTION: The "Big Finish" */}
      <section className="work-page-cta">
        <div className="cta-wrap">
          <h2 className="cta-headline">Let's build <br/> your <span>vision.</span></h2>
          <a href="/contact" className="cta-massive-btn">
            <span>Start a Project</span>
            <FiArrowRight />
          </a>
        </div>
      </section>
    </main>
  );
};

export default Work;