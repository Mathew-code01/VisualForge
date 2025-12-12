// src/components/AboutPreview.jsx

// src/components/AboutPreview.jsx

import { Link } from "react-router-dom";
import "../styles/components/aboutpreview.css";

const AboutPreview = () => {
  return (
    <section className="about-preview container fade-section">
      <div className="about-content">
        <h2 className="about-title fade-up">Who We Are</h2>

        <p className="about-desc fade-up delay-1">
          We are a creative studio focused on crafting emotionally immersive
          experiences through video editing, motion graphics, and digital
          design. Every frame, pixel, and interaction is shaped with intention —
          turning ideas into living stories.
        </p>

        <Link to="/about" className="about-btn fade-up delay-2">
          Learn More →
        </Link>
      </div>

      <div className="about-image fade-up delay-3">
        <div className="about-img-wrapper">
          <img src="src/assets/images/bg3.jpg" alt="Studio" />
          <div className="about-img-overlay"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
