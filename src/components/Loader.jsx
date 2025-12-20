// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
import "../styles/components/loader.css";

export default function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="loader-ambient-glow" />

      <div className="loader-content">
        <div className="loader-text-group">
          <h1 className="loader-brand" data-text="VisualForge">
            VisualForge
          </h1>
          <span className="loader-status">Initializing Creative Assets...</span>
        </div>

        <div className="loader-progress-container">
          <div className="loader-progress-bar">
            <div className="loader-progress-fill" />
          </div>
          <div className="loader-technical-data">
            <span>4K_RENDER_MODE</span>
            <span>FPS: 60.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}