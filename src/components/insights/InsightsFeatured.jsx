// src\components\insights\InsightsFeatured.jsx

import "../../styles/components/insightsFeatured.css";
import { ArrowUpRight } from "lucide-react";

export default function InsightsFeatured() {
  return (
    <section className="section section-light bdm-insights-featured grain">
      <div className="section-container">
        <div className="bdm-insights-grid">
          {/* LEFT */}
          <div className="bdm-insights-content">
            <span className="eyebrow">Featured Article</span>

            <h2 className="bdm-insights-title">
              Why clarity is becoming
              <br />
              the greatest competitive advantage.
            </h2>

            <p className="bdm-insights-description">
              In a world overloaded with information, the brands that
              communicate clearly are the ones people remember.
            </p>

            <div className="bdm-insights-meta">
              <span>Perspective</span>
              <span className="bdm-meta-divider" />
              <span>7 min read</span>
              <span className="bdm-meta-divider" />
              <span>July 2026</span>
            </div>

            <a href="/" className="btn-secondary bdm-insights-button">
              Read Article
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* RIGHT */}
          <div className="bdm-insights-visual-wrapper">
            <div className="bdm-insights-cover">
              <div className="bdm-cover-glow" />
              <div className="bdm-cover-circle bdm-circle-one" />
              <div className="bdm-cover-circle bdm-circle-two" />
              <div className="bdm-cover-circle bdm-circle-three" />
              <div className="bdm-cover-line" />
            </div>

            <div className="bdm-insights-quote">
              <p>
                Clarity isn't simplicity.
                <br />
                It's making the important impossible to miss.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}