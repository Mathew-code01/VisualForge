// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
import { useEffect } from "react";
import { FiArrowDown } from "react-icons/fi";
import WorkGrid from "../components/WorkGrid";
import "../styles/pages/work.css";
import builtForImpact from "../assets/images/builtForImpact.webp";

const Work = () => {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const scrollToFeatured = () => {
    const section = document.getElementById("featured");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="work-page-main">
      <section className="work-hero-elite">
        <img
          src={builtForImpact}
          alt="Studio Background"
          className="hero-image-bg"
        />
        <div className="hero-blur-bg"></div>
        <div className="section-inner">
          <div className="work-hero-content">
            <span className="hero-tag">Catalogue / {currentYear}</span>
            <h1 className="hero-display-title">
              Visual Excellence <br />
              <span className="text-outline">Built for Impact</span>
            </h1>
            <p className="hero-summary">
              High-performance post-production for brands demanding narrative
              precision.
            </p>
            <button onClick={scrollToFeatured} className="scroll-hint-btn">
              Explore the Archive <FiArrowDown />
            </button>
          </div>
        </div>
      </section>

      <section className="work-section-white" id="featured">
        <div className="section-inner">
          <header className="elite-header">
            <span className="section-tag-elite">Curated</span>
            <h2 className="title-md">Selected Works</h2>
          </header>
          <WorkGrid featured={true} />
        </div>
      </section>

      <section className="work-section-dark bg-deep">
        <div className="hero-blur-bg"></div>
        <div className="section-inner">
          <header className="elite-header">
            <span className="section-tag-elite">Repository</span>
            <h2 className="title-md-2">Motion Directory</h2>
          </header>
          <WorkGrid featured={false} />
        </div>
      </section>

      <section className="work-final-cta">
        <div className="cta-watermark">CREATIVE</div>
        <div className="section-inner">
          <h2 className="cta-headline">
            Let’s build <br />
            <span className="text-gradient">your vision.</span>
          </h2>
          <a href="/contact" className="elite-contact-btn">
            Start Booking
          </a>
        </div>
      </section>
    </main>
  );
};

export default Work;