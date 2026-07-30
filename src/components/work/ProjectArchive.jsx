// src\components\work\ProjectArchive.jsx

import { useEffect, useMemo, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { getVideos } from "../../firebase/uploadVideo.js";
import ProjectMeta from "./ProjectMeta";
import "../../styles/components/projectArchive.css";

/* ================================================================
   PROJECT ARCHIVE
   ------------------------------------------------
   Section 03 — Complete project archive.

   Uses the same Firestore source as FeaturedProject.
   The archive contains every available project except the
   first three featured projects.
================================================================ */

const ProjectArchive = () => {
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
        console.error("Failed to load project archive:", error);

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

  const archiveWorks = useMemo(() => {
    return [...works]
      .sort((a, b) => {
        const yearA = Number(a.year || 0);
        const yearB = Number(b.year || 0);

        return yearB - yearA;
      })
      .slice(3);
  }, [works]);

  return (
    <section
      className="project-archive-section section-light"
      data-theme="light"
      aria-labelledby="project-archive-heading"
    >
      <div className="project-archive-container">
        {/* ======================================================
            SECTION INTRO
        ====================================================== */}

        <header className="project-archive-intro">
          <div className="project-archive-intro-top">
            <span className="project-archive-eyebrow">
              <span className="project-archive-eyebrow-line" />
              03 — PROJECT ARCHIVE
            </span>

            <span className="project-archive-index">ARCHIVE / ALL WORK</span>
          </div>

          <div className="project-archive-heading-grid">
            <h2
              id="project-archive-heading"
              className="project-archive-heading"
            >
              More work,
              <br />
              <span>different challenges.</span>
            </h2>

            <div className="project-archive-intro-copy">
              <p>
                A broader selection of projects, collaborations, and creative
                challenges across brand, digital, strategy, communication, and
                technology.
              </p>

              <div className="project-archive-intro-rule" />
            </div>
          </div>
        </header>

        {/* ======================================================
            ARCHIVE LIST
        ====================================================== */}

        <div className="project-archive-list">
          <div className="project-archive-list-header">
            <span>PROJECT</span>
            <span>DISCIPLINE</span>
            <span>YEAR</span>
            <span>VIEW</span>
          </div>

          {loading ? (
            <ProjectArchiveSkeleton />
          ) : archiveWorks.length > 0 ? (
            archiveWorks.map((work, index) => (
              <ProjectMeta key={work.id} work={work} index={index} />
            ))
          ) : (
            <ProjectArchiveEmpty />
          )}
        </div>
      </div>
    </section>
  );
};

/* ================================================================
   LOADING SKELETON
================================================================ */

const ProjectArchiveSkeleton = () => {
  return (
    <div className="project-archive-skeleton-list">
      {[1, 2, 3, 4].map((item) => (
        <div className="project-archive-skeleton-row" key={item}>
          <span />
          <span />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
};

/* ================================================================
   EMPTY STATE
================================================================ */

const ProjectArchiveEmpty = () => {
  return (
    <div className="project-archive-empty">
      <span className="project-archive-empty-mark">
        <FiArrowUpRight />
      </span>

      <div>
        <span className="project-archive-empty-label">PROJECT ARCHIVE</span>

        <h3>
          More work is
          <br />
          on the way.
        </h3>

        <p>The archive will grow as new projects are released.</p>
      </div>
    </div>
  );
};

export default ProjectArchive;