


// src\components\insights\InsightCategories.jsx


// src/components/insights/InsightsCategories.jsx
/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import "../../styles/components/insightsCategories.css";

const categories = [
  {
    title: "Strategy",
    description: "Finding direction before execution.",
  },
  {
    title: "Brand",
    description: "Building ideas people recognize.",
  },
  {
    title: "Communication",
    description: "Helping people understand.",
  },
  {
    title: "Technology",
    description: "Exploring emerging tools.",
  },
  {
    title: "Creative Process",
    description: "How ideas evolve.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 45,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function InsightsCategories() {
  return (
    <section
      className="section section-dark insights-categories-section grain"
      id="insight-categories"
    >
      <div className="section-container">

        {/* =========================
              HEADER
        ========================== */}

        <motion.div
          className="insights-categories-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
        >

          <span className="eyebrow">
            Explore
          </span>

          <h2 className="section-title">
            Different subjects.
            <br />
            One philosophy.
          </h2>

        </motion.div>

        {/* =========================
              LIST
        ========================== */}

        <motion.div
          className="insights-categories-list"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: .25,
          }}
        >

          {categories.map((category, index) => (
            <motion.article
              variants={item}
              key={category.title}
              className="insights-category-item"
            >

              {/* Number */}

              <div className="insights-category-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Divider */}

              <div className="insights-category-divider" />

              {/* Content */}

              <div className="insights-category-content">

                <h3>
                  {category.title}
                </h3>

                <p>
                  {category.description}
                </p>

              </div>

            </motion.article>
          ))}

        </motion.div>

        {/* =========================
              FOOTER COPY
        ========================== */}

        <motion.div
          className="insights-categories-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: .25 }}
          viewport={{ once: true }}
        >

          <p>
            Everything begins
            <br />
            with understanding.
          </p>

        </motion.div>

      </div>
    </section>
  );
}