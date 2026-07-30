// src/pages/Work.jsx

import WorkHero from "../components/work/WorkHero";
import FeaturedWork from "../components/work/FeaturedProject";
import ProjectArchive from "../components/work/ProjectArchive";
import HowWeThink from "../components/work/HowWeThink";
import CollaborationSection from "../components/work/CollaborationSection";
import FinalCTASection from "../components/work/FinalCTASection";

import CaseStudyPreview from "../components/work/CaseStudyPreview";

import "../styles/pages/work.css";

const Work = () => {
  return (
    <main className="work-page-main">
      {/* ======================================================
          01 — WORK HERO
      ====================================================== */}

      <WorkHero />

      {/* ======================================================
          02 — FEATURED WORK
      ====================================================== */}

      <FeaturedWork />

      {/* ======================================================
          03 — PROJECT ARCHIVE
      ====================================================== */}

      <ProjectArchive />

      {/* ======================================================
          04 — HOW WE THINK
      ====================================================== */}

      <HowWeThink />

      {/* ======================================================
          05 — CASE STUDY PREVIEW
      ====================================================== */}

      <CaseStudyPreview />

      <CollaborationSection />

      <FinalCTASection />
    </main>
  );
};

export default Work;

