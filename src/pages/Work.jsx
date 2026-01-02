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
      {/* SECTION 1: DARK HERO (Centered & Elegant) */}
      <section className="work-hero-elite">
        <div className="hero-blur-bg"></div>
        <div className="section-inner">
          <div className="work-hero-content">
            <span className="hero-tag">Portfolio 2026</span>
            <h1 className="hero-display-title">
              Visual Excellence <br /> Built for Impact
            </h1>
            <p className="hero-summary">
              Premium post-production and creative direction for brands that
              demand technical precision and a cinematic edge.
            </p>
            <button onClick={scrollToFeatured} className="scroll-hint-btn">
              Explore Works <FiArrowDown />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHITE ZEBRA (Featured Projects) */}
      <section className="work-section-white" id="featured">
        <div className="section-inner">
          <header className="elite-header">
            <h2 className="title-md">Selected Projects</h2>
            <p className="header-context">
              A curated selection of our most impactful visual stories.
            </p>
          </header>
          <WorkGrid featured={true} />
        </div>
      </section>

      {/* SECTION 3: DARK ZEBRA (Archive) */}
      <section className="work-section-dark">
        <div className="hero-blur-bg"></div>
        <div className="section-inner">
          <header className="elite-header">
            <h2 className="title-md">Motion Archive</h2>
            <p className="header-context">
              Extended capabilities and previous collaborations.
            </p>
          </header>
          <WorkGrid featured={false} />
        </div>
      </section>

      {/* SECTION 4: WHITE ZEBRA (CTA) */}
      <section className="work-final-cta">
        <div className="section-inner">
          <h2 className="cta-headline">
            Let's build <br /> your vision.
          </h2>
          <div className="cta-button-container">
            <a href="/contact" className="elite-contact-btn">
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Work;