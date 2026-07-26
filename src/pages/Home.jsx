
import { useEffect, useMemo, useRef } from "react";
import Hero from "../components/Hero";
import WorkGrid from "../components/WorkGrid";
import TrustedBy from "../components/TrustedBy";
import Contact from "./Contact";
import useImagePreloader from "../hooks/useImagePreloader";
import "../styles/pages/home.css";

// Assets
import editorialImg from "../assets/images/creativeEditorial.webp";
import motionImg from "../assets/images/motion&VFX.webp";
import chromaticImg from "../assets/images/chromaticFinishing.webp";
import theArchiveImg from "../assets/images/theArchive.webp";
import visualExcellenceImg from "../assets/images/visualExcellence.webp";

const capabilities = [
  {
    number: "01",
    title: "Creative Editorial",
    description:
      "High-tempo, narrative-driven editing built around rhythm, emotion, and clarity for modern digital campaigns.",
    image: editorialImg,
  },
  {
    number: "02",
    title: "Motion & VFX",
    description:
      "Seamless motion systems, visual effects, and compositing that extend the story beyond the frame.",
    image: motionImg,
  },
  {
    number: "03",
    title: "Chromatic Finishing",
    description:
      "Precision color grading and finishing designed to give every project a distinctive visual identity.",
    image: chromaticImg,
  },
];

const Home = () => {
  const sectionRefs = useRef([]);

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
    if (!imagesLoaded) return;

    const sections = sectionRefs.current.filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [imagesLoaded]);

  const registerSection = (index) => (element) => {
    sectionRefs.current[index] = element;
  };

  return (
    <main
      className={`home-page ${
        imagesLoaded ? "page-ready" : "page-loading"
      }`}
    >
      {/* =====================================================
          HERO
      ====================================================== */}
      <Hero />

      {/* =====================================================
          TRUSTED BY
      ====================================================== */}
      <TrustedBy />

      {/* =====================================================
          SELECTED WORK
      ====================================================== */}
      <section
        className="home-section home-section--dark home-reveal"
        ref={registerSection(0)}
        aria-labelledby="selected-work-title"
      >
        <div className="home-container">
          <header className="section-heading">
            <div className="section-heading__meta">
              <span className="section-index">01</span>

              <span className="section-kicker">
                Cinematic Archive
              </span>
            </div>

            <div className="section-heading__content">
              <h2 id="selected-work-title">
                Selected
                <span> Work.</span>
              </h2>

              <p>
                A curated selection of projects shaped through editorial
                precision, visual storytelling, and considered finishing.
              </p>
            </div>
          </header>

          <div className="home-work-grid">
            <WorkGrid featured />
          </div>
        </div>
      </section>

      {/* =====================================================
          ETHOS
      ====================================================== */}
      <section
        className="home-section home-section--light home-reveal"
        ref={registerSection(1)}
        aria-labelledby="ethos-title"
      >
        <div className="home-container">
          <div className="ethos-layout">
            {/* Visual */}
            <div className="ethos-media">
              <div className="ethos-media__frame">
                <img
                  src={visualExcellenceImg}
                  alt="Visual excellence in post-production"
                  loading="lazy"
                  decoding="async"
                />

                <div className="ethos-media__gradient" />

                <div className="ethos-media__label">
                  <span>BIGDAY</span>
                  <span>VISUAL SYSTEMS</span>
                </div>
              </div>

              <div className="ethos-media__caption">
                <span>02 / 04</span>
                <span>Visual Excellence</span>
              </div>
            </div>

            {/* Content */}
            <div className="ethos-content">
              <div className="section-heading__meta">
                <span className="section-index">02</span>

                <span className="section-kicker">
                  Our Ethos
                </span>
              </div>

              <h2 id="ethos-title" className="ethos-title">
                The art of
                <br />
                <span>the cut, perfected.</span>
              </h2>

              <div className="ethos-copy">
                <p className="ethos-lead">
                  We don't simply assemble footage. We shape the emotion,
                  rhythm, and visual language behind every frame.
                </p>

                <p>
                  BigDay Media partners with ambitious brands, filmmakers,
                  and creative teams to transform raw ideas into polished
                  visual experiences.
                </p>
              </div>

              <div className="ethos-divider" />

              <div className="ethos-stats">
                <div className="ethos-stat">
                  <strong>120+</strong>
                  <span>Films Delivered</span>
                </div>

                <div className="ethos-stat">
                  <strong>08+</strong>
                  <span>Years Expertise</span>
                </div>

                <div className="ethos-stat">
                  <strong>4K</strong>
                  <span>Finishing Workflow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CAPABILITIES
      ====================================================== */}
      <section
        className="home-section home-section--dark home-reveal"
        ref={registerSection(2)}
        aria-labelledby="capabilities-title"
      >
        <div className="home-container">
          <header className="section-heading section-heading--capabilities">
            <div className="section-heading__meta">
              <span className="section-index">03</span>

              <span className="section-kicker">
                Specializations
              </span>
            </div>

            <div className="section-heading__content">
              <h2 id="capabilities-title">
                Core
                <span> Disciplines.</span>
              </h2>

              <p>
                From first cut to final grade, every discipline is built
                around one goal: making the work feel undeniable.
              </p>
            </div>
          </header>

          <div className="capabilities-grid">
            {capabilities.map((capability) => (
              <article
                className="capability-card"
                key={capability.number}
              >
                <div className="capability-card__media">
                  <img
                    src={capability.image}
                    alt={capability.title}
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="capability-card__overlay" />

                  <span className="capability-card__number">
                    {capability.number}
                  </span>
                </div>

                <div className="capability-card__body">
                  <div className="capability-card__title-row">
                    <h3>{capability.title}</h3>

                    <span className="capability-card__arrow">
                      ↗
                    </span>
                  </div>

                  <p>{capability.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT / PROJECT CTA
      ====================================================== */}
      <section
        className="home-contact-section home-reveal"
        ref={registerSection(3)}
        aria-labelledby="contact-section-title"
      >
        <div className="home-container home-container--contact">
          <div className="contact-intro">
            <span className="section-index">04</span>

            <span className="section-kicker">
              Start a Project
            </span>

            <h2 id="contact-section-title">
              Have a story
              <br />
              <span>worth telling?</span>
            </h2>

            <p>
              Tell us what you're building, what you're imagining, or what
              needs finishing. We'll take it from there.
            </p>
          </div>

          <div className="contact-component">
            <Contact />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;