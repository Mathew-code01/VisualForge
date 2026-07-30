// src\components\insights\InsightsHero.jsx
/* eslint-disable no-unused-vars */
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import "../../styles/components/insightsHero.css";

const floatingLabels = [
  "Perspective",
  "Strategy",
  "Technology",
  "Communication",
];

const InsightsHero = () => {
  return (
    <section className="insights-hero section-dark grain">
      <div className="section-container">
        <div className="insights-hero-grid">
          {/* LEFT */}

          <motion.div
            className="insights-hero-content"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow">BIG DAY / INSIGHTS</span>

            <h1 className="insights-hero-title">
              Ideas worth
              <br />
              thinking about.
            </h1>

            <p className="insights-hero-description">
              Perspectives on strategy, creativity, communication, technology,
              and the decisions that shape meaningful work.
            </p>

            <div className="insights-hero-actions">
              <a href="#articles" className="btn-primary">
                Browse Articles
              </a>

              <a href="#latest" className="insights-latest-link">
                Latest Perspective
                <FiArrowRight />
              </a>
            </div>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            className="insights-editorial"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="editorial-grid" />

            <div className="editorial-title">THINK</div>

            {floatingLabels.map((item, index) => (
              <motion.div
                key={item}
                className={`editorial-tag tag-${index + 1}`}
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 7 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {item}
              </motion.div>
            ))}

            <div className="editorial-circle one" />
            <div className="editorial-circle two" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InsightsHero;