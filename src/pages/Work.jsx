// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
import { useState, useEffect } from "react";
import { FiArrowDown } from "react-icons/fi";
import WorkGrid from "../components/WorkGrid";
import Loader from "../components/Loader.jsx";
import "../styles/pages/work.css";

const Work = () => {
  const [loading, setLoading] = useState(true);

  // Automatically grab the current year for the high-end meta-tag
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Smooth scroll to top on page load
    window.scrollTo({ top: 0, behavior: "instant" });

    // Premium delay to allow the Loader to perform its animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const scrollToFeatured = () => {
    const section = document.getElementById("featured");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Render Loader if state is loading
  if (loading) return <Loader />;

  return (
    <main className="work-page-main">
      {/* SECTION 1: DARK HERO (Zebra Start: Deep Dark) */}
      <section className="work-hero-elite">
        <div className="hero-blur-bg"></div>
        <div className="section-inner">
          <div className="work-hero-content">
            {/* Automatic Year Loading */}
            <span className="hero-tag">Catalogue / {currentYear}</span>

            <h1 className="hero-display-title">
              Visual Excellence <br />
              <span className="text-outline">Built for Impact</span>
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
            <span className="section-tag-elite">Curated</span>
            <h2 className="title-md">Selected Works</h2>
            <p className="header-context">
              A showcase of cinematic campaigns and creative editorial designed
              for global reach.
            </p>
          </header>

          {/* WorkGrid with Clean UI/UX focus */}
          <WorkGrid featured={true} />
        </div>
      </section>

      {/* SECTION 3: DARK ZEBRA (Motion Archive) */}
      <section className="work-section-dark">
        <div className="hero-blur-bg"></div>
        <div className="section-inner">
          <header className="elite-header">
            <span className="section-tag-elite">Repository</span>
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
            {/* 'Inquiry' phrasing for a professional, expensive feel */}
            <a href="/contact" className="elite-contact-btn">
              Start Inquiry
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Work;