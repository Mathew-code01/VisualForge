// src/components/WorkGrid.jsx
// src/components/WorkGrid.jsx
// src/components/WorkGrid.jsx
// src/components/WorkGrid.jsx
// src/components/WorkGrid.jsx
import WorkCard from "./WorkCard";
import works from "../data/works";
import "../styles/components/workgrid.css";

const WorkGrid = ({
  title = "Featured Work",
  featured = false,
  enableHoverPreview = false,
  preload = false,
}) => {
  const displayWorks = featured ? works.slice(0, 8) : works;

  return (
    <section className="nf-section">
      <h2 className="nf-section-title">{title}</h2>

      <div className="nf-row">
        {displayWorks.map((work, index) => (
          <WorkCard
            key={work.id}
            work={work}
            enableHoverPreview={enableHoverPreview}
            preload={preload}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkGrid;
