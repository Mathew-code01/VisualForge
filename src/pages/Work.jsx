// src/pages/Work.jsx
// src/pages/Work.jsx
// src/pages/Work.jsx
import { useEffect, useState, useRef } from "react";
import { getVideos } from "../firebase/uploadVideo.js";
import WorkCard from "../components/WorkCard";
import ParticleBackground from "../components/ParticleBackground";
import bgVideo from "../assets/videos/bg1.mp4";
import { FaStar, FaFolderOpen, FaArrowDown, FaThLarge } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import "../styles/pages/work.css";

const Work = () => {
  const [allWorks, setAllWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [floatingLights, setFloatingLights] = useState([]);

  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        const data = await getVideos();
        // Sorting by newest if 'createdAt' exists in your Firebase data
        const sortedData =
          data?.sort((a, b) => b.createdAt - a.createdAt) || [];
        setAllWorks(sortedData);
      } catch (error) {
        console.error("Firebase Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllVideos();
  }, []);

  useEffect(() => {
    const lightsArray = Array.from({ length: 15 }).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 2 + Math.random() * 10,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 20,
    }));
    setFloatingLights(lightsArray);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const featuredWorks = allWorks
    .filter((w) => w.isFeatured === true || w.isFeatured === "true")
    .slice(0, 3);

  return (
    <main className="portfolio-page">
      {/* --- HERO SECTION --- */}
      <section className="portfolio-hero" ref={heroRef}>
        <div className="hero-video-wrapper">
          <video
            className="hero-video"
            ref={videoRef}
            src={bgVideo}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="hero-vignette" />
        </div>

        <ParticleBackground className="hero-particles" />

        <div className="floating-lights">
          {floatingLights.map((light) => (
            <span
              key={light.id}
              className="floating-light"
              style={{
                top: `${light.top}%`,
                left: `${light.left}%`,
                width: `${light.size}px`,
                height: `${light.size}px`,
                animationDelay: `${light.delay}s`,
                animationDuration: `${light.duration}s`,
              }}
            />
          ))}
        </div>

        <div className="hero-content">
          <div className="reveal-text">
            <span className="pre-title">VisualForge Studio — Est. 2024</span>
          </div>
          <h1 className="portfolio-title">
            Creative <span className="gradient-text">Direction</span>
          </h1>
          <p className="portfolio-subtitle">
            Exploring the intersection of cinematic storytelling and technical
            precision.
          </p>
          <div className="hero-actions">
            <a href="#featured" className="scroll-hint">
              <FaArrowDown className="scroll-icon" />
              <span>View Portfolio</span>
            </a>
          </div>
        </div>
      </section>

      {/* --- FEATURED SECTION --- */}
      <section id="featured" className="portfolio-section featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <FaStar className="section-icon" /> Featured
            </h2>
            <span className="work-count">01 — 03</span>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loader-bar"></div>
              <p>Curating featured projects...</p>
            </div>
          ) : (
            <div className="portfolio-grid featured-layout">
              {featuredWorks.map((work) => (
                <WorkCard key={work.id} work={work} featured={true} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- ARCHIVE SECTION --- */}
      <section className="portfolio-section archive-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <FaFolderOpen className="section-icon" /> Full Archive
            </h2>
            <span className="work-count">
              Total Projects: {allWorks.length}
            </span>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loader-bar"></div>
              <p>Syncing database...</p>
            </div>
          ) : (
            <div className="portfolio-grid archive-layout">
              {allWorks.map((work) => (
                <WorkCard key={work.id} work={work} />
              ))}
            </div>
          )}

          {!loading && allWorks.length === 0 && (
            <div className="empty-state">
              <MdVideoLibrary size={50} />
              <p>The archive is currently being updated.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Work;