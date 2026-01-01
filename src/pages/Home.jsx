// src/pages/Home.jsx
// src/pages/Home.jsx
// src/pages/Home.jsx
// src/pages/Home.jsx
import { useState, useEffect, useRef } from "react";
import Hero from "../components/Hero";
import WorkGrid from "../components/WorkGrid";
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

    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px",
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
        }
      });
    }, observerOptions);

    scrollRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [loading]);

  if (loading) return <Loader />;

  return (
    <main className="home-page-unique">
      {/* SECTION 0: HERO (Always Vibrant) */}
      <Hero />

      {/* SECTION 1: FEATURED WORK (White Band) */}
      <section
        className="home-section-unique bg-white"
        ref={(el) => (scrollRefs.current[0] = el)}
      >
        <div className="home-container-unique">
          <header className="section-header-block">
            <span className="section-index">01 — Selection</span>
            <h2 className="section-heading-unique">
              Featured <br />
              Creative
            </h2>
            <div className="accent-line"></div>
          </header>
          <div className="grid-interaction-wrapper">
            <WorkGrid featured={true} />
          </div>
        </div>
      </section>

      {/* SECTION 2: CAPABILITIES (Vibrant Blue Band) */}
      <section
        className="home-section-unique bg-vibrant"
        ref={(el) => (scrollRefs.current[1] = el)}
      >
        <div className="home-container-unique">
          <div className="capabilities-grid">
            <div className="cap-item">
              <h3>Post-Production</h3>
              <p>
                High-end editing that turns raw footage into cinematic stories.
              </p>
            </div>
            <div className="cap-item">
              <h3>Visual Media</h3>
              <p>
                Dynamic motion graphics and visual effects for modern brands.
              </p>
            </div>
            <div className="cap-item">
              <h3>Color Grading</h3>
              <p>Setting the mood with industry-standard color science.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FULL COLLECTION (White Band) */}
      <section
        className="home-section-unique bg-white"
        ref={(el) => (scrollRefs.current[2] = el)}
      >
        <div className="home-container-unique">
          <header className="section-header-block">
            <span className="section-index">02 — Archive</span>
            <h2 className="section-heading-unique">
              Full <br />
              Collection
            </h2>
            <div className="accent-line"></div>
          </header>
          <div className="grid-interaction-wrapper">
            <WorkGrid featured={false} />
          </div>
        </div>
      </section>

      {/* SECTION 4: CONTACT (Deep Anchor Band) */}
      <section
        className="home-section-unique bg-deep"
        ref={(el) => (scrollRefs.current[3] = el)}
      >
        <Contact />
      </section>
    </main>
  );
};

export default Home;