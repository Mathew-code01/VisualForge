// src/pages/Home.jsx
// src/pages/Home.jsx
// src/pages/Home.jsx
// src/pages/Home.jsx
import {  useEffect, useRef, useMemo } from "react";
import Hero from "../components/Hero";
import WorkGrid from "../components/WorkGrid";
import TrustedBy from "../components/TrustedBy";
import Contact from "./Contact";
import useImagePreloader from "../hooks/useImagePreloader";
import "../styles/pages/home.css";

// Asset Imports
import editorialImg from "../assets/images/creativeEditorial.webp";
import motionImg from "../assets/images/motion&VFX.webp";
import chromaticImg from "../assets/images/chromaticFinishing.webp";
import theArchiveImg from "../assets/images/theArchive.webp";
import visualExcellenceImg from "../assets/images/visualExcellence.webp";

const Home = () => {
  const scrollRefs = useRef([]);

  // Define critical images for Home
  const criticalImages = useMemo(
    () => [
      theArchiveImg,
      visualExcellenceImg,
      editorialImg,
      motionImg,
      chromaticImg,
    ],
    []
  );

  const imagesLoaded = useImagePreloader(criticalImages);

  useEffect(() => {
    // Only run Observer if images are ready
    if (!imagesLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("section-visible");
        });
      },
      { threshold: 0.1 }
    );

    scrollRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [imagesLoaded]);

  return (
    <main
      className={`home-page-unique ${
        imagesLoaded ? "page-ready" : "page-loading"
      }`}
    >
      <Hero />
      <TrustedBy />

      <section
        className="home-section-unique bg-deep"
        ref={(el) => (scrollRefs.current[0] = el)}
      >
        <div className="home-container-unique">
          <header className="section-header-block">
            <span className="section-tag-elite">Cinematic Archive</span>
            <h2 className="section-heading-unique bg-deep">Selected Works</h2>
          </header>
          <WorkGrid featured={true} />
        </div>
      </section>

      <section
        className="home-section-unique bg-white"
        ref={(el) => (scrollRefs.current[1] = el)}
      >
        <div className="home-container-unique">
          <div className="ethos-split-grid">
            <div className="ethos-visual">
              <div className="visual-image-container">
                <img src={visualExcellenceImg} alt="BigDay Media Excellence" />
                <div className="visual-border-accent"></div>
              </div>
            </div>

            <div className="ethos-content">
              <span className="section-tag-elite">Our Ethos</span>
              <h3 className="ethos-display-title">
                The art of the cut, <br />
                <span className="statement-highlight">perfected.</span>
              </h3>
              <div className="ethos-body">
                <p>
                  We don't just assemble footage; we architect emotion. BigDay
                  Media delivers high-performance post-production for global
                  brands demanding narrative precision.
                </p>
                <div className="ethos-stats-row">
                  <div className="ethos-stat">
                    <strong>120+</strong>
                    <span>Films Delivered</span>
                  </div>
                  <div className="ethos-stat">
                    <strong>08+</strong>
                    <span>Years Expertise</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="home-section-unique bg-deep"
        ref={(el) => (scrollRefs.current[2] = el)}
      >
        <div className="home-container-unique">
          <header className="section-header-block">
            <span className="section-tag-elite">Specializations</span>
            <h2 className="section-heading-unique">Core Disciplines</h2>
          </header>

          <div className="capabilities-grid-elite">
            <div className="cap-card">
              <div className="cap-image-wrapper">
                <img src={editorialImg} alt="Creative Editorial" />
                <div className="cap-overlay" />
              </div>
              <div className="cap-content">
                <h3>Creative Editorial</h3>
                <p>
                  High-tempo, narrative-driven pacing designed for digital
                  landscapes.
                </p>
              </div>
            </div>

            <div className="cap-card">
              <div className="cap-image-wrapper">
                <img src={motionImg} alt="Motion & VFX" />
                <div className="cap-overlay" />
              </div>
              <div className="cap-content">
                <h3>Motion & VFX</h3>
                <p>Seamless integration of 3D elements and motion design.</p>
              </div>
            </div>

            <div className="cap-card">
              <div className="cap-image-wrapper">
                <img src={chromaticImg} alt="Chromatic Finishing" />
                <div className="cap-overlay" />
              </div>
              <div className="cap-content">
                <h3>Chromatic Finishing</h3>
                <p>
                  Expert color grading using industry-leading Resolve pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="home-section-unique bg-white"
        ref={(el) => (scrollRefs.current[3] = el)}
      >
        <Contact />
      </section>
    </main>
  );
};

export default Home;