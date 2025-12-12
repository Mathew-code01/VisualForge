// src/components/PortfolioPreview.jsx
// src/components/PortfolioPreview.jsx

import { Link } from "react-router-dom";
import works from "../data/works";
import WorkCard from "./WorkCard";
import "../styles/components/portfoliopreview.css";

const PortfolioPreview = () => {
  const preview = works.slice(0, 3);

  return (
    <section className="portfolio-preview container fade-section">
      <h2 className="pp-title fade-up">Portfolio Highlights</h2>

      <p className="pp-subtitle fade-up delay-1">
        A glimpse into some of our standout creative projects.
      </p>

      <div className="pp-grid">
        {preview.map((work, i) => (
          <div key={work.id} className={`fade-up delay-${i + 2}`}>
            <WorkCard work={work} />
          </div>
        ))}
      </div>

      <div className="pp-cta fade-up delay-5">
        <Link to="/portfolio" className="pp-btn">
          Explore Full Portfolio →
        </Link>
      </div>
    </section>
  );
};

export default PortfolioPreview;

