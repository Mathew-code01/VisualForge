// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
import "../styles/components/loader.css";

export default function Loader() {
  return (
    <div className="loader-wrapper">
      {/* Background Cinematic Glows */}
      <div className="ambient-light top-left" />
      <div className="ambient-light bottom-right" />

      <div className="loader-content">
        <div className="brand-section">
          <h1 className="loader-brand" data-text="BIGDAY MEDIA">
            BIGDAY MEDIA
          </h1>
          <div className="status-line">
            <span className="status-dot"></span>
            <span className="status-text">INITIALIZING CREATIVE ASSETS</span>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-track">
            <div className="progress-fill" />
          </div>

          <div className="technical-metadata">
            <div className="meta-item">
              <span className="label">ENCODING</span>
              <span className="value">4K_RAW</span>
            </div>
            <div className="meta-item">
              <span className="label">BITRATE</span>
              <span className="value">60.0 FPS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}