

// src/components/about/AboutStudio.jsx

/* eslint-disable no-unused-vars */

import React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Palette,
  MessageSquareQuote,
  MonitorSmartphone,
  Cpu,
} from "lucide-react";

import "../../styles/components/aboutStudio.css";

const disciplines = [
  {
    icon: Compass,
    title: "Strategy",
    description: "Direction before execution.",
  },
  {
    icon: Palette,
    title: "Creative",
    description: "Ideas given recognizable form.",
  },
  {
    icon: MessageSquareQuote,
    title: "Communication",
    description: "Stories people remember.",
  },
  {
    icon: MonitorSmartphone,
    title: "Digital",
    description: "Useful experiences.",
  },
  {
    icon: Cpu,
    title: "Technology",
    description: "Tools for what's next.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
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

export default function AboutStudio() {
  return (
    <section
      className="abt-studio section section-light grain"
      aria-labelledby="about-studio-title"
    >
      <div className="section-container">
        <motion.div
          className="abt-studio__header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <span className="eyebrow">THE STUDIO</span>

          <h2 id="about-studio-title" className="section-title">
            A multidisciplinary studio built around
            <span className="blue-text"> clarity.</span>
          </h2>

          <p className="section-description">
            Big Day brings together strategy, creativity, communication, digital
            design, and emerging technology to solve problems from multiple
            perspectives.
          </p>

          <p className="section-description">
            Different projects require different expertise. We build the right
            combination around every challenge.
          </p>
        </motion.div>

        <motion.div
          className="abt-studio__disciplines"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          {disciplines.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                className="abt-studio__card"
                variants={fadeUp}
              >
                <div className="abt-studio__icon">
                  <Icon size={30} strokeWidth={1.7} />
                </div>

                <div className="abt-studio__content">
                  <h3 className="abt-studio__title">{item.title}</h3>

                  <p className="abt-studio__text">{item.description}</p>
                </div>

                {index !== disciplines.length - 1 && (
                  <span className="abt-studio__connector" aria-hidden="true" />
                )}
              </motion.article>
            );
          })}
        </motion.div>
        <motion.div
          className="abt-studio__footer"
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
            amount: 0.35,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
        >
          <div className="abt-studio__footer-line" />

          <p className="abt-studio__footer-text">Different disciplines.</p>

          <h3 className="abt-studio__footer-title">One shared purpose.</h3>

          <p className="abt-studio__footer-description">
            Helping ambitious ideas become understandable.
          </p>
        </motion.div>

        {/* Decorative Background */}

        <div className="abt-studio__background" aria-hidden="true">
          <div className="abt-studio__grid" />

          <span className="abt-studio__blob abt-studio__blob--one" />
          <span className="abt-studio__blob abt-studio__blob--two" />

          <svg
            className="abt-studio__network"
            viewBox="0 0 1200 500"
            preserveAspectRatio="none"
          >
            <path
              d="M120 250
                 C250 130,
                 420 130,
                 550 250
                 S860 370,
                 1080 250"
            />

            <circle cx="120" cy="250" r="5" />
            <circle cx="340" cy="170" r="5" />
            <circle cx="550" cy="250" r="5" />
            <circle cx="820" cy="320" r="5" />
            <circle cx="1080" cy="250" r="5" />
          </svg>
        </div>
      </div>
    </section>
  );
}