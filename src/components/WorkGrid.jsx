// src/components/WorkGrid.jsx
// src/components/WorkGrid.jsx
// src/components/WorkGrid.jsx
// src/components/WorkGrid.jsx
import { useState, useEffect, useMemo } from "react";
import WorkCard from "./WorkCard";
import { getVideos } from "../firebase/uploadVideo.js";
import "../styles/components/workgrid.css";

const GridSkeleton = () => (
  <div className="work-grid-vibrant">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="work-card-skeleton" />
    ))}
  </div>
);

const WorkGrid = ({
  title, // Removed default to let parent (Work.jsx) handle it via section-labels
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

  const categories = useMemo(
    () => ["All", ...new Set(allWorks.map((w) => w.category))].filter(Boolean),
    [allWorks]
  );

  const filteredWorks = useMemo(() => {
    let works =
      activeCategory === "All"
        ? allWorks
        : allWorks.filter((w) => w.category === activeCategory);

    // Sort by year descending (newest first)
    works = [...works].sort((a, b) => (b.year || 0) - (a.year || 0));

    return featured ? works.slice(0, 6) : works;
  }, [allWorks, activeCategory, featured]);

  return (
    <div className="work-grid-container">
      <div className="grid-header-vibrant">
        {title && <h2 className="grid-title">{title}</h2>}

        {!featured && categories.length > 1 && (
          <div className="filter-system">
            <span className="filter-label">Filter By:</span>
            <div className="filter-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${
                    activeCategory === cat ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                  <span className="count">
                    (
                    {
                      allWorks.filter(
                        (w) => cat === "All" || w.category === cat
                      ).length
                    }
                    )
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <GridSkeleton />
      ) : (
        <div className="work-grid-vibrant">
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
            <div className="grid-empty-state">
              <h3>No projects in {activeCategory}</h3>
              <p>Check back soon for new releases.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkGrid;