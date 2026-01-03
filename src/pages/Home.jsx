// src/pages/Home.jsx
// src/pages/Home.jsx
// src/pages/Home.jsx
// src/pages/Home.jsx
// src/pages/Home.jsx
import { useState, useEffect, useRef } from "react";
import Hero from "../components/Hero";
import WorkGrid from "../components/WorkGrid";
import TrustedBy from "../components/TrustedBy";
import Contact from "./Contact";
import Loader from "../components/Loader.jsx";
import "../styles/pages/home.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const scrollRefs = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("section-visible");
        });
      },
      { threshold: 0.1 }
    );

    // Cleanly observe all refs
    scrollRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [loading]);

  if (loading) return <Loader />;

  return (
    <main className="home-page-unique">
      <Hero />

      {/* Zebra 1: White */}
      <TrustedBy />

      {/* Zebra 2: Deep Dark */}
      <section
        className="home-section-unique bg-deep"
        ref={(el) => (scrollRefs.current[0] = el)}
      >
        <div className="home-container-unique">
          <header className="section-header-block">
            <span className="section-tag-elite">Cinematic Archive</span>
            <h2 className="section-heading-unique">Selected Works</h2>
          </header>
          {/* WorkGrid should focus on UI/UX with clean hover states */}
          <WorkGrid featured={true} />
        </div>
      </section>

      {/* Zebra 3: White */}
      <section
        className="home-section-unique bg-white"
        ref={(el) => (scrollRefs.current[1] = el)}
      >
        <div className="home-container-unique">
          <div className="statement-inner">
            <span className="section-tag-elite">Our Ethos</span>
            <h3>
              The art of the cut,
              <span className="statement-highlight"> perfected.</span>
            </h3>
            <p>
              We don't just assemble footage; we architect emotion. BigDay Media
              delivers high-performance post-production for global brands that
              prioritize technical precision and narrative soul.
            </p>
          </div>
        </div>
      </section>

      {/* Zebra 4: Deep Dark */}
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
            {/* Discipline 1 */}
            <div className="cap-card">
              <div className="cap-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2000&auto=format&fit=crop"
                  alt="Editorial"
                />
                <div className="cap-overlay" />
              </div>
              <div className="cap-content">
                <h3>Creative Editorial</h3>
                <p>
                  High-tempo, narrative-driven pacing designed to capture and
                  hold attention in a digital-first landscape.
                </p>
              </div>
            </div>

            {/* Discipline 2 */}
            <div className="cap-card">
              <div className="cap-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
                  alt="Motion"
                />
                <div className="cap-overlay" />
              </div>
              <div className="cap-content">
                <h3>Motion & VFX</h3>
                <p>
                  Seamless integration of 3D elements and motion design to
                  elevate the visual language of your brand.
                </p>
              </div>
            </div>

            {/* Discipline 3 */}
            <div className="cap-card">
              <div className="cap-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop"
                  alt="Color"
                />
                <div className="cap-overlay" />
              </div>
              <div className="cap-content">
                <h3>Chromatic Finishing</h3>
                <p>
                  Expert color grading and look development using
                  industry-leading DaVinci Resolve pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zebra 5: White (Contact) */}
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