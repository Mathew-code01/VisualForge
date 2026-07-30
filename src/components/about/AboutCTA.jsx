// src\components\about\AboutCTA.jsx

/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import "../../styles/components/AboutCTA.css";

export default function AboutCTA() {
  return (
    <section className="about-cta section-light" data-theme="light">
      {/* ABSTRACT LINES */}
      <div className="about-cta-lines">
        <span />
        <span />
        <span />
      </div>

      <div className="section-container">
        <motion.div
          className="about-cta-content"
          initial={{
            opacity: 0,
            y: 40,
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
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* LABEL */}

          <span className="eyebrow">START A CONVERSATION</span>

          {/* TITLE */}

          <h2 className="section-title">
            The best ideas deserve to be understood.
          </h2>

          {/* DESCRIPTION */}

          <p className="section-description">
            Whether you're building something new, refining an existing brand,
            or exploring what's possible with technology, we'd love to hear what
            you're working on.
          </p>

          {/* ACTIONS */}

          <div className="about-cta-actions">
            <motion.a
              href="#contact"
              className="btn-primary"
              whileHover={{
                y: -3,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              Start a Project
              <ArrowUpRight size={18} />
            </motion.a>

            <a href="mailto:hello@bigday.com" className="about-cta-email">
              hello@bigday.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}