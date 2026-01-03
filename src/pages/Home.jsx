// src/pages/Home.jsx
// src/pages/Home.jsx
// src/pages/Home.jsx
// src/pages/Home.jsx
import { useState, useEffect, useRef, useMemo } from "react";
import Hero from "../components/Hero";
import WorkGrid from "../components/WorkGrid";
import TrustedBy from "../components/TrustedBy";
import Contact from "./Contact";
import Loader from "../components/Loader.jsx";
import useImagePreloader from "../hooks/useImagePreloader";
import "../styles/pages/home.css";

// Asset Imports
import editorialImg from "../assets/images/creativeEditorial.png";
import motionImg from "../assets/images/motion&VFX.png";
import chromaticImg from "../assets/images/chromaticFinishing.png";
import theArchiveImg from "../assets/images/theArchive.png";
import visualExcellenceImg from "../assets/images/visualExcellence.png";

const Home = () => {
  const scrollRefs = useRef([]);
  const [timerDone, setTimerDone] = useState(false);

  // Define critical images to preload before showing the UI
  const criticalImages = useMemo(() => [
    theArchiveImg,
    visualExcellenceImg,
    editorialImg,
    motionImg,
    chromaticImg
  ], []);

  const imagesLoaded = useImagePreloader(criticalImages);

  // Minimum wait time for the brand animation (Loader)
  useEffect(() => {
    const timer = setTimeout(() => setTimerDone(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only run Observer if content is revealed
    if (!timerDone || !imagesLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("section-visible");
        });
      },
      { threshold: 0.1 }
    );

    scrollRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, [timerDone, imagesLoaded]);

  // Show loader until BOTH the timer and image preloading are finished
  if (!timerDone || !imagesLoaded) return <Loader />;

  return (
    <main className="home-page-unique">
      <Hero />

      <TrustedBy />

      <section className="home-section-unique bg-deep" ref={(el) => (scrollRefs.current[0] = el)}>
        <div className="home-container-unique">
          <header className="section-header-block">
            <span className="section-tag-elite">Cinematic Archive</span>
            <h2 className="section-heading-unique">Selected Works</h2>
          </header>
          <WorkGrid featured={true} />
        </div>
      </section>

      <section className="home-section-unique bg-white" ref={(el) => (scrollRefs.current[1] = el)}>
        <div className="home-container-unique">
          <div className="statement-inner">
            <span className="section-tag-elite">Our Ethos</span>
            <h3>
              The art of the cut, <span className="statement-highlight"> perfected.</span>
            </h3>
            <p>
              We don't just assemble footage; we architect emotion. BigDay Media delivers 
              high-performance post-production for global brands.
            </p>
          </div>
        </div>
      </section>

      <section className="home-section-unique bg-deep" ref={(el) => (scrollRefs.current[2] = el)}>
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
                <p>High-tempo, narrative-driven pacing designed for digital landscapes.</p>
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
                <p>Expert color grading using industry-leading Resolve pipelines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section-unique bg-white" ref={(el) => (scrollRefs.current[3] = el)}>
        <Contact />
      </section>
    </main>
  );
};

export default Home;