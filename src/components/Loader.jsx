// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
import "../styles/components/loader.css";

export default function Loader() {
  return (
    <div className="loader-vibrant-clean">
      {/* Top and Bottom Decorative Lines */}
      <div className="loader-border-top" />
      <div className="loader-border-bottom" />

      <div className="loader-main-content">
        <div className="loader-text-reveal">
          <span className="loader-label">BigDay Media Agency</span>
          <h1 className="loader-giant-text">
            BIGDAY<span className="dot">.</span>
          </h1>
          <div className="loader-capabilities">
            <span>Strategy</span>
            <span className="sep">•</span>
            <span>Production</span>
            <span className="sep">•</span>
            <span>Design</span>
          </div>
        </div>

        <div className="loader-progress-block">
          <div className="loader-bar-bg">
            <div className="loader-bar-active" />
          </div>
          <div className="loader-percentage">
            <span>Loading Experience</span>
            <span className="pct-num">99%</span>
          </div>
        </div>
      </div>

      <div className="loader-corner-info">
        <span>EST 2024</span>
      </div>
    </div>
  );
}