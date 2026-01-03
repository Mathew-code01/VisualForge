// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
// src/components/Loader.jsx
import "../styles/components/loader.css";

export default function Loader() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="loader-agency-elite">
      {/* High-End Glassmorphism Background */}
      <div className="loader-glass-overlay" />
      
      <div className="loader-technical-grid">
        <div className="grid-line" />
        <div className="grid-line" />
      </div>

      <div className="loader-content-core">
        <div className="metadata-top">
          <span className="code-tag">BIGDAY_ARCHIVE_{currentYear}</span>
          <span className="status-blink">REC</span>
        </div>

        <h1 className="loader-title-cinematic">
          BIGDAY<span className="cursor">_</span>
        </h1>

        <div className="capabilities-editorial">
          <div className="cap-item"><span>Editorial</span></div>
          <div className="cap-item"><span>Color</span></div>
          <div className="cap-item"><span>VFX</span></div>
        </div>

        <div className="progress-technical">
          <div className="percentage-display">
            <span className="label">Buffering Master</span>
            <span className="number">099</span>
          </div>
          <div className="hairline-bar">
            <div className="fill" />
          </div>
        </div>
      </div>

      <div className="loader-footer-meta">
        <span>FRM_DEV: 0.00ms</span>
        <span>RES: 4K_UHD</span>
        <span>EST_2024</span>
      </div>
    </div>
  );
}