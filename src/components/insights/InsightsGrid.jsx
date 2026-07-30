// src\components\insights\InsightsGrid.jsx
/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import "../../styles/components/insights-grid.css";

const articles = [
  {
    id: 1,
    category: "Perspective",
    date: "Jul 18",
    title: "Why every great brand needs a clear point of view.",
    description:
      "Strong brands don't compete on aesthetics alone. They compete through clarity, conviction and consistent positioning.",
    readTime: "4 min",
  },
  {
    id: 2,
    category: "Technology",
    date: "Jul 11",
    title: "How AI changes creative work.",
    description:
      "Artificial intelligence isn't replacing creativity. It's changing where creative value is created.",
    readTime: "6 min",
  },
  {
    id: 3,
    category: "Communication",
    date: "Jun 28",
    title: "People don't remember everything. They remember clarity.",
    description:
      "The strongest communication removes friction instead of adding information.",
    readTime: "5 min",
  },
  {
    id: 4,
    category: "Creative",
    date: "Jun 17",
    title: "Design is editing. Not decorating.",
    description:
      "Every unnecessary element weakens the message. Great design is disciplined reduction.",
    readTime: "4 min",
  },
  {
    id: 5,
    category: "Strategy",
    date: "Jun 02",
    title: "The cost of confusing communication.",
    description:
      "When people don't understand what you do, trust disappears before interest begins.",
    readTime: "8 min",
  },
  {
    id: 6,
    category: "Brand",
    date: "May 19",
    title: "Recognition starts with consistency.",
    description:
      "Recognition isn't built through one campaign. It's built through repeated experiences.",
    readTime: "5 min",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function InsightsGrid() {
  return (
    <section className="ig section section-light">
      <div className="section-container">
        {/* Header */}

        <motion.div
          className="ig__header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow">Latest Writing</span>

          <h2 className="ig__title dark-gradient-text">
            Recent articles,
            <br />
            observations,
            <br />
            and perspectives.
          </h2>
        </motion.div>

        {/* Archive */}

        <motion.div
          className="ig__archive"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {articles.map((article) => (
            <motion.article
              key={article.id}
              variants={item}
              className="ig__article"
            >
              <a href="/" className="ig__link">
                {/* Left */}

                <div className="ig__meta">
                  <span className="ig__date">{article.date}</span>

                  <span className="ig__dot" />

                  <span className="ig__category">{article.category}</span>
                </div>

                {/* Middle */}

                <div className="ig__content">
                  <h3>{article.title}</h3>

                  <p>{article.description}</p>
                </div>

                {/* Right */}

                <div className="ig__right">
                  <span>{article.readTime}</span>

                  <ArrowUpRight size={22} className="ig__icon" />
                </div>
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}