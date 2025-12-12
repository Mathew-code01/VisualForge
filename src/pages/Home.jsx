// src/pages/Home.jsx
// src/pages/Home.jsx
// src/pages/Home.jsx
// src/pages/Home.jsx
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import WorkGrid from "../components/WorkGrid";
import Contact from "./Contact";
import Loader from "../components/Loader.jsx";
import works from "../data/works";
import "../styles/pages/home.css";
import "../styles/theme.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [animateSections, setAnimateSections] = useState(false);

  useEffect(() => {
    console.log("[Home] Mounting, starting preload...");

    const featuredWorks = works.slice(0, 6);
    let loadedCount = 0;

    if (!featuredWorks.length) {
      console.log("[Home] No featured works found");
      setLoading(false);
      setAnimateSections(true);
      return;
    }

    const checkLoaded = () => {
      loadedCount++;
      console.log(`[Home] Image loaded ${loadedCount}/${featuredWorks.length}`);
      if (loadedCount === featuredWorks.length) {
        console.log("[Home] All featured images loaded, preparing fade-in...");

        // Delay slightly to ensure browser can trigger CSS animation
        setTimeout(() => {
          setLoading(false);
          setAnimateSections(true);
          console.log("[Home] Sections now animating");
        }, 50);
      }
    };

    featuredWorks.forEach((work) => {
      const img = new Image();
      img.src = work.thumbnail;
      if (img.complete) {
        console.log(`[Home] Image already cached: ${work.title}`);
        checkLoaded();
      } else {
        img.onload = checkLoaded;
        img.onerror = checkLoaded;
      }
    });
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="home-page-unique">
      {/* Hero Section */}
      <section
        id="hero"
        className={`home-section-unique ${animateSections ? "fade-in-up" : ""}`}
      >
        <Hero />
      </section>

      {/* Featured Works */}
      <section
        id="featured"
        className={`home-section-unique ${
          animateSections ? "fade-in-up delay-1" : ""
        }`}
      >
        <div className="home-container-unique">
          <h2 className="section-heading-unique">Cinematic Edits</h2>
          <p className="section-subheading-unique">
            Signature works blending <strong>story</strong>,{" "}
            <strong>rhythm</strong>, and <strong>emotion</strong>.
          </p>

          <WorkGrid
            featured
            uniqueClass="work-grid-unique"
            enableHoverPreview
            preload={true} // Preload images for faster display
            animate={animateSections} // Trigger animation after section fade-in
          />
        </div>
      </section>

      {/* Full Work Collection */}
      <section
        id="works"
        className={`home-section-unique ${
          animateSections ? "fade-in-up delay-2" : ""
        }`}
      >
        <div className="home-container-unique">
          <h2 className="section-heading-unique">All Projects</h2>
          <WorkGrid
            uniqueClass="work-grid-unique"
            enableHoverPreview
            preload={false} // Animate on scroll
            animate={animateSections}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`home-section-unique ${
          animateSections ? "fade-in-up delay-3" : ""
        }`}
      >
        <Contact />
      </section>
    </main>
  );
};

export default Home;

// ok can you give well struture netflex like 

// for a professional video editor website I recommend Option B — NETFLIX CINEMATIC STYLE.
// Why: it gives your portfolio the dramatic, premium depth editors love — heavy shadows, large thumbnails, floating panels and bold typography that emphasize the visuals (your strongest asset). It’s still usable and responsive but reads as “studio-grade” instead of just “portfolio”.