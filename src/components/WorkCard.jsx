// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
// src/components/WorkCard.jsx
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import "../styles/components/workcard.css";

const WorkCard = ({ work, delay = 0 }) => {
  const [loaded, setLoaded] = useState(false);
  const cardRef = useRef();

  // Fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current?.classList.add("fade-in-up");
          observer.unobserve(cardRef.current);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Link
      to={`/work/${work.id}`}
      ref={cardRef}
      className="work-card"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Thumbnail */}
      <div className={`work-thumb ${loaded ? "loaded" : ""}`}>
        <img
          src={work.thumbnail}
          alt={work.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />

        {/* Hover overlay */}
        <div className="hover-overlay">
          <div className="play-button">
            <FaPlay />
          </div>
        </div>
      </div>

      {/* Text Info */}
      <div className="work-info">
        <h3 className="work-title">{work.title}</h3>
        <p className="work-category">{work.category}</p>
      </div>
    </Link>
  );
};

export default WorkCard;
