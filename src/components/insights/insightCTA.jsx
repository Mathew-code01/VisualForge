

// src/components/insight/InsightsCTA.jsx
/* eslint-disable no-unused-vars */

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

import "../../styles/components/insightsCTA.css";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const editorialLines = [...Array(10)];

const particles = [...Array(24)];

export default function InsightsCTA() {
  return (
    <section className="icta section section-dark grain">
      {/* ===================================================== */}
      {/* Background Glow */}
      {/* ===================================================== */}

      <div className="icta__glow" />

      {/* ===================================================== */}
      {/* Floating Editorial Lines */}
      {/* ===================================================== */}

      <div className="icta__editorial">
        {editorialLines.map((_, index) => (
          <motion.span
            key={index}
            className={`icta__line icta__line--${index + 1}`}
            animate={{
              opacity: [0.05, 0.12, 0.05],
              x: [0, 12, 0],
            }}
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ===================================================== */}
      {/* Floating Dots */}
      {/* ===================================================== */}

      <div className="icta__particles">
        {particles.map((_, index) => (
          <motion.span
            key={index}
            className="icta__particle"
            animate={{
              y: [-10, 10, -10],
              opacity: [0.12, 0.55, 0.12],
            }}
            transition={{
              duration: 5 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* ===================================================== */}
      {/* Container */}
      {/* ===================================================== */}

      <div className="section-container">
        <div className="icta__wrapper">
          {/* ============================================= */}
          {/* Small Label */}
          {/* ============================================= */}

          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="icta__eyebrow eyebrow"
          >
            KEEP THE CONVERSATION GOING
          </motion.div>

          {/* ============================================= */}
          {/* Heading */}
          {/* ============================================= */}

          <motion.h2
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="icta__title"
          >
            Good ideas
            <br />
            become better
            <br />
            <span className="gradient-text">when they're shared.</span>
          </motion.h2>

          {/* ============================================= */}
          {/* Supporting Copy */}
          {/* ============================================= */}

          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="icta__description"
          >
            If something you've read sparked a question, challenged your
            perspective, or helped clarify an idea, we'd love to hear where your
            thinking is going next.
          </motion.p>

          {/* ============================================= */}
          {/* CTA Buttons */}
          {/* ============================================= */}

          <motion.div
            custom={0.45}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="icta__actions"
          >
            <a href="/contact" className="btn-primary icta__button">
              <span>Start a Conversation</span>

              <ArrowUpRight size={18} />
            </a>

            <a href="mailto:hello@bigday.com" className="icta__email">
              <Mail size={17} />

              <span>hello@bigday.com</span>
            </a>
          </motion.div>
          {/* ============================================= */}
          {/* Bottom Editorial Statement */}
          {/* ============================================= */}

          <motion.div
            className="icta__bottom"
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
              delay: 0.6,
            }}
            viewport={{
              once: true,
            }}
          >
            <div className="icta__bottom-line" />

            <p>Ideas evolve through conversation.</p>
          </motion.div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* Bottom Breathing Space */}
      {/* ===================================================== */}

      <div className="icta__space" />
    </section>
  );
}