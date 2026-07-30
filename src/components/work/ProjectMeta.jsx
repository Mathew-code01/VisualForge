// src\components\work\ProjectMeta.jsx

import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import "../../styles/components/projectMeta.css";

/* ================================================================
   PROJECT META
   ------------------------------------------------
   Single project row used by the Section 03 archive.
================================================================ */

const ProjectMeta = ({ work, index }) => {
  const projectNumber = String(index + 1).padStart(2, "0");

  const title = work.title || `Project ${projectNumber}`;

  const category = work.category || "Creative Direction";

  const year = work.year || new Date().getFullYear();

  return (
    <Link
      to={`/work/${work.id}`}
      className="project-meta"
      aria-label={`View project: ${title}`}
    >
      {/* PROJECT NUMBER */}

      <div className="project-meta-number">
        <span>{projectNumber}</span>
      </div>

      {/* PROJECT INFORMATION */}

      <div className="project-meta-main">
        <h3 className="project-meta-title">{title}</h3>

        <span className="project-meta-category">{category}</span>
      </div>

      {/* YEAR */}

      <div className="project-meta-year">
        <span>{year}</span>
      </div>

      {/* VIEW PROJECT */}

      <div className="project-meta-action">
        <span className="project-meta-action-label">View project</span>

        <span className="project-meta-action-icon">
          <FiArrowUpRight />
        </span>
      </div>

      {/* HOVER LINE */}

      <span className="project-meta-hover-line" />
    </Link>
  );
};

export default ProjectMeta;