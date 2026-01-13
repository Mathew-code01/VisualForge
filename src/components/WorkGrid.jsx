// src/components/WorkGrid.jsx
// src/components/WorkGrid.jsx
// src/components/WorkGrid.jsx
// src/components/WorkGrid.jsx
import { useState, useEffect, useMemo, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
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

const WorkGrid = ({ title, featured = false, enableHoverPreview = true }) => {
  const [allWorks, setAllWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // Navigation State
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

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

  // Handle Scroll Visibility Logic
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);

      // Toggle a class for centering logic
      if (scrollWidth > clientWidth) {
        scrollRef.current.classList.add("is-overflowing");
      } else {
        scrollRef.current.classList.remove("is-overflowing");
      }
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [allWorks]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const categories = useMemo(
    () => ["All", ...new Set(allWorks.map((w) => w.category))].filter(Boolean),
    [allWorks]
  );

  const filteredWorks = useMemo(() => {
    let works =
      activeCategory === "All"
        ? allWorks
        : allWorks.filter((w) => w.category === activeCategory);
    works = [...works].sort((a, b) => (b.year || 0) - (a.year || 0));
    return featured ? works.slice(0, 6) : works;
  }, [allWorks, activeCategory, featured]);

  return (
    <div className="work-grid-container">
      <div className="grid-header-vibrant">
        {title && <h2 className="grid-title">{title}</h2>}

        {!featured && categories.length > 1 && (
          <div className="filter-system">
            <span className="filter-label">Filter By</span>

            <div className="filter-wrapper">
              <button
                className={`filter-nav-btn prev-btn ${
                  showLeftArrow ? "visible" : ""
                }`}
                onClick={() => scroll("left")}
              >
                <FiChevronLeft />
              </button>

              <div
                className="filter-pills"
                ref={scrollRef}
                onScroll={checkScroll}
              >
                {categories.map((cat) => {
                  const count = allWorks.filter(
                    (w) => cat === "All" || w.category === cat
                  ).length;

                  return (
                    <button
                      key={cat}
                      className={`filter-pill ${
                        activeCategory === cat ? "active" : ""
                      }`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                      <span className="cat-count">[{count}]</span>
                    </button>
                  );
                })}
              </div>

              <button
                className={`filter-nav-btn next-btn ${
                  showRightArrow ? "visible" : ""
                }`}
                onClick={() => scroll("right")}
              >
                <FiChevronRight />
              </button>
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