// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
// src/components/Hero.jsx
import { useEffect, useRef, useState } from "react";
import useParallax from "../hooks/useParallax";
import useIntersection from "../hooks/useIntersection";
import "../styles/components/hero.css";
import "../styles/theme.css";

// ✅ Import images properly
import bgCinematography from "../assets/images/bg_cinematography.jpg";
import bgColorGrading from "../assets/images/bg_colorgrading.jpg";
import bgMotionGraphics from "../assets/images/bg_motiongraphics.jpg";
import bgEditing from "../assets/images/bg_editing.jpg";
import bgStorytelling from "../assets/images/bg_storytelling.jpg";

const fallbackImages = [
  bgCinematography,
  bgColorGrading,
  bgMotionGraphics,
  bgEditing,
  bgStorytelling,
];

const videoFiles = [
  "../assets/videos/bg1.mp4",
  "/assets/videos/bg2.mp4",
  "/assets/videos/bg3.mp4",
];

const words = [
  "Cinematography",
  "Color Grading",
  "Motion Graphics",
  "Editing",
  "Visual Storytelling",
];

const subtitles = [
  "High-impact visuals crafted for brands and creators.",
  "Cutting-edge editing built around emotion and pacing.",
  "Where motion, sound, and story come together.",
  "Designed for agencies, creators, and modern campaigns.",
  "Cinematic visuals that elevate your message.",
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [useVideo] = useState(false);

  const heroRef = useRef(null);
  const mediaRef = useRef(null);
  const overlayRef = useRef(null);
  const grainRef = useRef(null);
  const vignetteRef = useRef(null);

  const visible = useIntersection(heroRef, "-10%");
  const parallax = useParallax(mediaRef, 0.08);
  const overlayParallax = useParallax(overlayRef, 0.04);
  const grainParallax = useParallax(grainRef, 0.02);
  const vignetteParallax = useParallax(vignetteRef, 0.06);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((p) => (p + 1) % words.length);
      setSubtitleIndex((p) => (p + 1) % subtitles.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    function handle(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * -2;
      el.style.setProperty("--tiltX", x);
      el.style.setProperty("--tiltY", y);
    }
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const mediaIndex = wordIndex % fallbackImages.length;
  const bgImage = fallbackImages[mediaIndex];
  const bgVideo = videoFiles[mediaIndex];

  return (
    <section
      className={`hero-unique ${visible ? "is-visible-unique" : ""}`}
      ref={heroRef}
      aria-label="Cinematic visual showcase"
      style={{
        transform: `rotateX(calc(var(--tiltY,0)*2deg)) rotateY(calc(var(--tiltX,0)*2deg))`,
      }}
    >
      <div
        className="hero-media-wrapper-unique hero-layer"
        ref={mediaRef}
        style={{ transform: `translateY(${parallax}px)` }}
      >
        {useVideo ? (
          <video
            className="hero-media-unique hero-zoom-unique"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
        ) : (
          <img
            className="hero-media-unique hero-zoom-unique"
            src={bgImage}
            alt="Background visual"
          />
        )}
      </div>

      <div
        className="hero-overlay-unique hero-layer"
        ref={overlayRef}
        style={{ transform: `translateY(${overlayParallax}px)` }}
      ></div>

      <div
        className="hero-grain-unique hero-layer"
        ref={grainRef}
        style={{ transform: `translateY(${grainParallax}px)` }}
      ></div>

      <div
        className="hero-vignette-unique hero-layer"
        ref={vignetteRef}
        style={{ transform: `translateY(${vignetteParallax}px)` }}
      ></div>

      <div className={`hero-content-unique ${visible ? "enter-unique" : ""}`}>
        <h1 className="hero-title-unique">
          Professional{" "}
          <span className="changing-word-unique" aria-live="polite">
            {words[wordIndex]}
          </span>
        </h1>

        <p className="hero-subtitle-unique changing-subtitle-unique">
          {subtitles[subtitleIndex]}
        </p>

        <div className="hero-buttons-unique">
          <a className="hero-cta-primary-unique View" href="/work">
            View Work
          </a>

          <a className="hero-cta-secondary-unique" href="/work">
            Watch Showreel
          </a>
        </div>
      </div>
    </section>
  );
}

