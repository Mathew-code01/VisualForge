// src/pages/Home.jsx
// src/pages/Home.jsx
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
          if (entry.isIntersecting) entry.target.classList.add("section-visible");
        });
      },
      { threshold: 0.15 }
    );
    scrollRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, [loading]);

  if (loading) return <Loader />;

  return (
    <main className="home-page-unique">
      <Hero />
      
      {/* 1. White Section */}
      <TrustedBy />

      {/* 2. Deep Dark Section - Featured Work */}
      <section className="home-section-unique bg-deep" ref={(el) => (scrollRefs.current[0] = el)}>
        <div className="home-container-unique">
          <header className="section-header-block">
            <span className="section-tag-elite">Portfolio</span>
            <h2 className="section-heading-unique">Selected Works</h2>
          </header>
          <WorkGrid featured={true} />
        </div>
      </section>

      {/* 3. White Section - Agency Statement */}
      <section className="home-section-unique bg-white" ref={(el) => (scrollRefs.current[1] = el)}>
        <div className="home-container-unique">
          <div className="statement-inner">
            <span className="section-tag-elite">BigDay Ethos</span>
            <h3>We don't just edit.<br />We engineer <span>impact.</span></h3>
            <p>Global standards. Cinematic precision. Your vision, forged.</p>
          </div>
        </div>
      </section>

      {/* 4. Deep Dark Section - Capabilities */}
      <section className="home-section-unique bg-deep" ref={(el) => (scrollRefs.current[2] = el)}>
        <div className="home-container-unique">
           <header className="section-header-block">
            <span className="section-tag-elite">Expertise</span>
            <h2 className="section-heading-unique">Our Capabilities</h2>
          </header>
          <div className="capabilities-grid">
            <div className="cap-item">
              <h3>Post-Production</h3>
              <p>High-end editing that turns raw footage into cinematic stories.</p>
            </div>
            <div className="cap-item">
              <h3>Visual Media</h3>
              <p>Dynamic motion graphics and visual effects for modern brands.</p>
            </div>
            <div className="cap-item">
              <h3>Color Grading</h3>
              <p>Setting the mood with industry-standard color science.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. White Section - Contact */}
      <section className="home-section-unique bg-white" ref={(el) => (scrollRefs.current[3] = el)}>
        <Contact />
      </section>
    </main>
  );
};

export default Home;