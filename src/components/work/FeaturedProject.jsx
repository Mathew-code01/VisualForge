// src\components\work\FeaturedProject.jsx


import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiPlay,
  FiPlus,
} from "react-icons/fi";
import { getVideos } from "../../firebase/uploadVideo.js";
import "../../styles/components/featuredProject.css";

/* ================================================================
   FEATURED WORK
   ------------------------------------------------
   Editorial project showcase.

   Pulls projects directly from Firestore through getVideos().
   The first three projects become the featured case studies.

   Layout rhythm:
   PROJECT 01 → large visual / information
   PROJECT 02 → information / large visual
   PROJECT 03 → large visual / information
================================================================ */

const FeaturedWork = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadWorks = async () => {
      try {
        const data = await getVideos();

        if (mounted) {
          setWorks(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load featured work:", error);

        if (mounted) {
          setWorks([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadWorks();

    return () => {
      mounted = false;
    };
  }, []);

  const featuredWorks = useMemo(() => {
    return [...works]
      .sort((a, b) => {
        const yearA = Number(a.year || 0);
        const yearB = Number(b.year || 0);

        return yearB - yearA;
      })
      .slice(0, 3);
  }, [works]);

  return (
    <section
      className="featured-work-section section-dark"
      data-theme="dark"
      aria-labelledby="featured-work-heading"
    >
      <div className="featured-work-container">
        {/* ======================================================
            SECTION INTRO
        ====================================================== */}

        <header className="featured-work-intro">
          <div className="featured-work-intro-top">
            <span className="featured-work-eyebrow">
              <span className="featured-work-eyebrow-line" />
              02 — FEATURED WORK
            </span>

            <span className="featured-work-intro-index">
              SELECTED / 03
            </span>
          </div>

          <div className="featured-work-heading-grid">
            <h2
              id="featured-work-heading"
              className="featured-work-heading"
            >
              A few projects.
              <br />
              <span>A lot of thinking.</span>
            </h2>

            <div className="featured-work-intro-copy">
              <p>
                Every project starts with a different challenge. We bring
                strategy, creativity, communication, and technology together
                around what needs to change.
              </p>

              <div className="featured-work-intro-rule" />
            </div>
          </div>
        </header>

        {/* ======================================================
            PROJECTS
        ====================================================== */}

        <div className="featured-work-list">
          {loading ? (
            <FeaturedWorkSkeleton />
          ) : featuredWorks.length > 0 ? (
            featuredWorks.map((work, index) => (
              <FeaturedProject
                key={work.id}
                work={work}
                index={index}
              />
            ))
          ) : (
            <EmptyFeaturedWork />
          )}
        </div>
      </div>
    </section>
  );
};


/* ================================================================
   FEATURED PROJECT
================================================================ */

const FeaturedProject = ({ work, index }) => {
  const projectNumber = String(index + 1).padStart(2, "0");

  const title =
    work.title ||
    `Project ${projectNumber}`;

  const category =
    work.category ||
    "Creative Direction";

  const description =
    work.description ||
    "A selected project from the BigDay MA archive.";

  const year =
    work.year ||
    new Date().getFullYear();

  const thumbnail =
    work.thumbnail ||
    "";

  const isReversed = index % 2 === 1;

  return (
    <article
      className={`featured-project ${
        isReversed ? "featured-project--reverse" : ""
      }`}
    >
      {/* ======================================================
          PROJECT META / COPY
      ====================================================== */}

      <div className="featured-project-content">
        <div className="featured-project-topline">
          <span className="featured-project-number">
            {projectNumber}
          </span>

          <span className="featured-project-label">
            PROJECT {projectNumber}
          </span>
        </div>

        <div className="featured-project-copy">
          <div className="featured-project-category-row">
            <span className="featured-project-category">
              {category}
            </span>

            <span className="featured-project-year">
              {year}
            </span>
          </div>

          <h3 className="featured-project-title">
            {title}
          </h3>

          <p className="featured-project-description">
            {description}
          </p>

          <Link
            to={`/work/${work.id}`}
            className="featured-project-link"
            aria-label={`View case study for ${title}`}
          >
            <span>View Case Study</span>

            <span className="featured-project-link-icon">
              <FiArrowUpRight />
            </span>
          </Link>
        </div>

        <div className="featured-project-bottomline">
          <span>BIGDAY MA / WORK</span>
          <span>{projectNumber} / 03</span>
        </div>
      </div>

      {/* ======================================================
          PROJECT VISUAL
      ====================================================== */}

      <Link
        to={`/work/${work.id}`}
        className="featured-project-visual"
        aria-label={`Open ${title}`}
      >
        <div className="featured-project-media">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt=""
              loading={index === 0 ? "eager" : "lazy"}
              className="featured-project-image"
            />
          ) : (
            <div className="featured-project-placeholder">
              <span>IMAGE / {projectNumber}</span>
            </div>
          )}

          <div className="featured-project-media-shade" />

          <div className="featured-project-media-grid" />

          <div className="featured-project-media-top">
            <span>SELECTED WORK</span>

            <span>
              {projectNumber}
            </span>
          </div>

          <div className="featured-project-media-center">
            <span className="featured-project-play">
              <FiPlay />
            </span>
          </div>

          <div className="featured-project-media-bottom">
            <span>
              {category}
            </span>

            <span className="featured-project-media-arrow">
              <FiArrowUpRight />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};


/* ================================================================
   LOADING SKELETON
================================================================ */

const FeaturedWorkSkeleton = () => {
  return (
    <div className="featured-work-skeleton-list">
      {[1, 2, 3].map((item) => (
        <div
          className="featured-work-skeleton"
          key={item}
        >
          <div className="featured-work-skeleton-copy">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="featured-work-skeleton-media" />
        </div>
      ))}
    </div>
  );
};


/* ================================================================
   EMPTY STATE
================================================================ */

const EmptyFeaturedWork = () => {
  return (
    <div className="featured-work-empty">
      <div className="featured-work-empty-icon">
        <FiPlus />
      </div>

      <div>
        <span className="featured-work-empty-label">
          SELECTED WORK
        </span>

        <h3>
          The next chapter is
          <br />
          currently in production.
        </h3>

        <p>
          New projects will appear here as they are released.
        </p>
      </div>
    </div>
  );
};

export default FeaturedWork;

