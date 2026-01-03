// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
import { FiArrowDown } from "react-icons/fi";
import WorkGrid from "../components/WorkGrid";
import "../styles/pages/work.css";

const Work = () => {
  const scrollToFeatured = () => {
    document.getElementById("featured").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="work-page-main">
      {/* SECTION 1: DARK HERO (Zebra Start: Deep Dark) */}
      <section className="work-hero-elite">
        <div className="hero-blur-bg"></div>
        <div className="section-inner">
          <div className="work-hero-content">
            {/* Removed 'Portfolio' for a more professional Archive Label */}
            <span className="hero-tag">Catalogue / 2026</span>
            
            <h1 className="hero-display-title">
              Visual Excellence <br /> Built for Impact
            </h1>
            
            <p className="hero-summary">
              High-performance post-production and creative direction for brands 
              demanding narrative precision and technical mastery.
            </p>

            <button onClick={scrollToFeatured} className="scroll-hint-btn">
              Explore the Archive <FiArrowDown />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHITE ZEBRA (Featured Projects) */}
      <section className="work-section-white" id="featured">
        <div className="section-inner">
          <header className="elite-header">
            {/* Reduced heading sizes per instructions */}
            <h2 className="title-md">Selected Works</h2>
            <p className="header-context">
              A curated showcase of cinematic campaigns and creative editorial.
            </p>
          </header>
          <WorkGrid featured={true} />
        </div>
      </section>

      {/* SECTION 3: DARK ZEBRA (Motion Archive) */}
      <section className="work-section-dark">
        <div className="hero-blur-bg"></div>
        <div className="section-inner">
          <header className="elite-header">
            <h2 className="title-md">Motion Directory</h2>
            <p className="header-context">
              Comprehensive capabilities across previous global collaborations.
            </p>
          </header>
          <WorkGrid featured={false} />
        </div>
      </section>

      {/* SECTION 4: WHITE ZEBRA (Final CTA) */}
      <section className="work-final-cta">
        <div className="section-inner">
          <h2 className="cta-headline">
            Let’s build <br /> your vision.
          </h2>
          <div className="cta-button-container">
            {/* Phrasing changed to 'Inquiry' for high-end feel */}
            <a href="/contact" className="elite-contact-btn">
              Inquiry
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Work;