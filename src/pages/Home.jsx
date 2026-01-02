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
      { threshold: 0.15 }
    );
    scrollRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [loading]);

  if (loading) return <Loader />;

  return (
    <main className="home-page-unique">
      {/* --- HERO SECTION --- */}
      <Hero />

      {/* --- 1. TRUSTED BY (White Section) --- */}
      <TrustedBy />

      {/* --- 2. SELECTED WORKS (Deep Dark Section) --- */}
      <section
        className="home-section-unique bg-deep"
        ref={(el) => (scrollRefs.current[0] = el)}
      >
        <div className="home-container-unique">
          <header className="section-header-block">
            <span className="section-tag-elite">Showcase</span>
            <h2 className="section-heading-unique">Selected Works</h2>
          </header>
          <WorkGrid featured={true} />
        </div>
      </section>

      {/* --- 3. AGENCY STATEMENT (White Section) --- */}
      <section
        className="home-section-unique bg-white"
        ref={(el) => (scrollRefs.current[1] = el)}
      >
        <div className="home-container-unique">
          <div className="statement-inner">
            <span className="section-tag-elite">Our Philosophy</span>
            <h3>
              Storytelling,
              <span className="statement-highlight">refined.</span>
            </h3>
            <p>
              The cut is where the story begins. We provide elite
              post-production for brands that demand cinematic excellence and
              narrative precision.
            </p>
          </div>
        </div>
      </section>

      {/* --- 4. CAPABILITIES (Deep Dark Section) --- */}
      <section
        className="home-section-unique bg-deep"
        ref={(el) => (scrollRefs.current[2] = el)}
      >
        <div className="home-container-unique">
          <header className="section-header-block">
            <span className="section-tag-elite">Expertise</span>
            <h2 className="section-heading-unique">Our Capabilities</h2>
          </header>

          <div className="capabilities-grid-elite">
            {/* Item 1 - Creative Editorial */}
            <div className="cap-card">
              <div className="cap-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2000&auto=format&fit=crop"
                  alt="Creative Editorial"
                />
                <div className="cap-overlay" />
              </div>
              <div className="cap-content">
                <h3>Creative Editorial</h3>
                <p>
                  Narrative-driven pacing and storytelling that defines the soul
                  of your project.
                </p>
              </div>
            </div>

            {/* Item 2 - Motion & VFX */}
            <div className="cap-card">
              <div className="cap-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
                  alt="Motion Design"
                />
                <div className="cap-overlay" />
              </div>
              <div className="cap-content">
                <h3>Motion & VFX</h3>
                <p>
                  Sophisticated 3D motion design and seamless visual effects
                  built for modern media.
                </p>
              </div>
            </div>

            {/* Item 3 - Color Finishing */}
            <div className="cap-card">
              <div className="cap-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop"
                  alt="Color Grading"
                />
                <div className="cap-overlay" />
              </div>
              <div className="cap-content">
                <h3>Color Finishing</h3>
                <p>
                  Premium color grading and look development using
                  industry-standard pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. CONTACT (White Section) --- */}
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