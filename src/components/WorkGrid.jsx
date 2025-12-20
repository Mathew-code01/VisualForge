// src/components/WorkGrid.jsx
// src/components/WorkGrid.jsx
// src/components/WorkGrid.jsx
// src/components/WorkGrid.jsx
import { useState, useEffect, useMemo } from "react";
import WorkCard from "./WorkCard";
import { getVideos } from "../firebase/uploadVideo.js";
import "../styles/components/workgrid.css";

// Separate Skeleton Component for a cleaner look
const GridSkeleton = () => (
  <div className="nf-row">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="work-card-skeleton" />
    ))}
  </div>
);

const WorkGrid = ({
  title = "Featured Work",
  featured = false,
  enableHoverPreview = true,
}) => {
  const [allWorks, setAllWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getVideos();
        setAllWorks(data);
      } catch (error) {
        console.error("Failed to fetch works:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Filter logic
  const categories = useMemo(
    () => ["All", ...new Set(allWorks.map((w) => w.category))],
    [allWorks]
  );

  const filteredWorks = useMemo(() => {
    let works =
      activeCategory === "All"
        ? allWorks
        : allWorks.filter((w) => w.category === activeCategory);
    return featured ? works.slice(0, 8) : works;
  }, [allWorks, activeCategory, featured]);

  return (
    <section className="nf-section cinematic-grid-section">
      <div className="section-header">
        <h2 className="nf-section-title">{title}</h2>

        {/* Category Filter - Essential for Premium feel */}
        {!featured && (
          <div className="filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${
                  activeCategory === cat ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <GridSkeleton />
      ) : (
        <div className="nf-row">
          {filteredWorks.length > 0 ? (
            filteredWorks.map((work, index) => (
              <WorkCard
                key={work.id}
                work={work}
                enableHoverPreview={enableHoverPreview}
                index={index}
              />
            ))
          ) : (
            <div className="empty-state">
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default WorkGrid;