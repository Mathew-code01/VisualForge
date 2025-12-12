// src/components/CoreValues.jsx

import { FaFilm, FaBezierCurve, FaMagic } from "react-icons/fa";
import "../styles/components/corevalues.css";

const CoreValues = () => {
  const values = [
    {
      icon: <FaFilm />,
      title: "Cinematic Video Editing",
      desc: "Transforming raw footage into compelling narratives with rhythm, emotion, and precision.",
    },
    {
      icon: <FaBezierCurve />,
      title: "UI/UX & Digital Design",
      desc: "Designing interfaces that combine aesthetic clarity with seamless user experience.",
    },
    {
      icon: <FaMagic />,
      title: "Motion & Visual Storytelling",
      desc: "Breathing life into ideas with color, motion, sound, and atmosphere.",
    },
  ];

  return (
    <div className="core-values container">
      <h2 className="cv-title">What We Do</h2>
      <p className="cv-subtitle">
        The foundation of our creative process — blending visuals, design, and storytelling.
      </p>

      <div className="cv-grid">
        {values.map((item, i) => (
          <div key={i} className="cv-card">
            <div className="cv-icon">{item.icon}</div>
            <h3 className="cv-card-title">{item.title}</h3>
            <p className="cv-card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreValues;
