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
  const [animateHero, setAnimateHero] = useState(false);
  const scrollRefs = useRef([]);

  // 1. Initial Loader logic
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // 2. Animation Logic
  useEffect(() => {
    if (loading) return;

    // Small delay to ensure DOM is painted before observing
    const timeout = setTimeout(() => {
      setAnimateHero(true);

      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
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
    }, 100);

    return () => clearTimeout(timeout);
  }, [loading]);

  if (loading) return <Loader />;

  return (
    <main className="home-page-unique">
      {/* Hero Section */}
      <section
        id="hero"
        className={`home-hero-wrapper ${animateHero ? "fade-in" : ""}`}
      >
        <Hero />
      </section>

      {/* Featured Section */}
      <section
        className="home-section-unique"
        ref={(el) => (scrollRefs.current[0] = el)}
      >
        <div className="home-container-unique">
          <header className="section-header-block">
            <span className="section-index">01</span>
            <h2 className="section-heading-unique">Featured Work</h2>
            <div className="accent-line"></div>
          </header>
          <div className="grid-interaction-wrapper">
            <WorkGrid featured={true} />
          </div>
        </div>
      </section>

      {/* Full Collection Section */}
      <section
        className="home-section-unique"
        ref={(el) => (scrollRefs.current[1] = el)}
      >
        <div className="home-container-unique">
          <header className="section-header-block">
            <span className="section-index">02</span>
            <h2 className="section-heading-unique">Full Collection</h2>
            <div className="accent-line"></div>
          </header>
          <div className="grid-interaction-wrapper">
            <WorkGrid featured={false} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="home-section-unique"
        ref={(el) => (scrollRefs.current[2] = el)}
      >
        <Contact />
      </section>
    </main>
  );
};

export default Home;