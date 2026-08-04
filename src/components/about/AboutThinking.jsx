// src\components\about\AboutThinking.jsx

// src/components/about/AboutThinking.jsx

/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import "../../styles/components/aboutThinking.css";

const principles = [
  {
    number: "01",
    title: "Understand before creating.",
  },
  {
    number: "02",
    title: "Strategy before aesthetics.",
  },
  {
    number: "03",
    title: "Every detail communicates.",
  },
  {
    number: "04",
    title: "Technology should support people.",
  },
  {
    number: "05",
    title: "Good work is refined, never rushed.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const leftVariant = {
  hidden: {
    opacity: 0,
    x: -70,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const rightVariant = {
  hidden: {
    opacity: 0,
    x: 70,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeVariant = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AboutThinking() {
  return (
    <section
      className="abt-thinking section section-dark grain"
      aria-labelledby="about-thinking-title"
    >
      <div className="section-container">
        <motion.div
          className="abt-thinking__intro"
          variants={fadeVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <span className="eyebrow">HOW WE THINK</span>

          <h2 id="about-thinking-title" className="section-title">
            Every decision should make the idea{" "}
            <span className="blue-text">clearer.</span>
          </h2>
        </motion.div>

        <motion.div
          className="abt-thinking__principles"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          {principles.map((item, index) => (
            <motion.article
              key={item.number}
              className="abt-thinking__item"
              variants={index % 2 === 0 ? leftVariant : rightVariant}
            >
              <div className="abt-thinking__number-wrap">
                <motion.span
                  className="abt-thinking__number"
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  whileInView={{
                    opacity: 0.08,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 1,
                  }}
                >
                  {item.number}
                </motion.span>
              </div>

              <div className="abt-thinking__content">
                <h3 className="abt-thinking__heading">{item.title}</h3>

                <div className="abt-thinking__line" />
              </div>
            </motion.article>
          ))}
        </motion.div>
        <motion.div
          className="abt-thinking__closing"
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.45,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.15,
          }}
        >
          <div className="abt-thinking__quote-mark">"</div>

          <blockquote className="abt-thinking__quote">
            The goal isn't more design.
            <br />
            <span>The goal is better understanding.</span>
          </blockquote>
        </motion.div>

        {/* Ambient Background Elements */}

        <div className="abt-thinking__ambient" aria-hidden="true">
          <span className="abt-thinking__orb abt-thinking__orb--one" />
          <span className="abt-thinking__orb abt-thinking__orb--two" />
          <span className="abt-thinking__orb abt-thinking__orb--three" />

          <span className="abt-thinking__line-bg line-one" />
          <span className="abt-thinking__line-bg line-two" />
          <span className="abt-thinking__line-bg line-three" />

          <div className="abt-thinking__grid" />
        </div>
      </div>
    </section>
  );
}