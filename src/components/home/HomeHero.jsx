

// src/components/home/HomeHero.jsx
// src/components/home/HomeHero.jsx

// src/components/home/HomeHero.jsx

// src/components/home/HomeHero.jsx

import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

import SmartVideo from "../SmartVideo";

import aflluxeLogo from "../../assets/trusted/AFLLUXE-04.png";
import coloredBlackLogo from "../../assets/trusted/Colored black.png";
import expetHubLogo from "../../assets/trusted/Expet hub-05.png";
import newkrooLogo from "../../assets/trusted/newkroo-logo-BBgxBlWa.png";
import ziboraLogo from "../../assets/trusted/Zibora LOGO-02.png";
import zidexLogo from "../../assets/trusted/zidex-logo-master.png";

import "../../styles/components/homeHero.css";

const EASE = [0.16, 1, 0.3, 1];

const TRUSTED_LOGOS = [
  {
    name: "AFLLUXE",
    image: aflluxeLogo,
  },
  {
    name: "Colored Black",
    image: coloredBlackLogo,
  },
  {
    name: "Expet Hub",
    image: expetHubLogo,
  },
  {
    name: "Newkroo",
    image: newkrooLogo,
  },
  {
    name: "Zibora",
    image: ziboraLogo,
  },
  {
    name: "Zidex",
    image: zidexLogo,
  },
];

const PARTICLES = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  left: `${index * 10 + 5}%`,
  delay: `${index * 0.7}s`,
  duration: `${12 + (index % 5)}s`,
}));

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE,
    },
  },
};

export default function HomeHero({
  heroProject,
  loading,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="home-hero theme-dark"
      data-theme="dark"
      aria-label="Big Day homepage hero"
    >
      {/* BACKGROUND MEDIA */}

      {!loading && (
        <div className="home-hero__background">
          <SmartVideo
            project={heroProject}
            className="home-hero__background-video"
          />

          <div className="home-hero__overlay" />
          <div className="home-hero__vignette" />

          <div className="home-hero__light home-hero__light--one" />
          <div className="home-hero__light home-hero__light--two" />

          <div className="home-hero__grain" />
        </div>
      )}


      {/* FLOATING AMBIENT ELEMENTS */}

      <div
        className="home-hero__particles"
        aria-hidden="true"
      >
        {PARTICLES.map((particle) => (
          <span
            key={particle.id}
            className="home-hero__particle"
            style={{
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>


      {/* HERO CONTENT */}

      <div className="home-hero__container">

        <motion.div
          className="home-hero__content"
          initial={shouldReduceMotion ? false : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >

          <motion.span
            className="eyebrow home-hero__eyebrow"
            variants={fadeUp}
          >
            Big Day Studio
          </motion.span>


          <motion.h1
            className="home-hero__title"
            variants={fadeUp}
          >
            Complex ideas
            <br />
            deserve clear
            <span className="gradient-text">
              {" "}communication.
            </span>
          </motion.h1>


          <motion.p
            className="home-hero__description"
            variants={fadeUp}
          >
            We help ambitious companies communicate ideas people
            understand through strategy, design, and visual storytelling.
          </motion.p>


          <motion.div
            className="home-hero__actions"
            variants={fadeUp}
          >

            <Link
              to="/contact"
              className="btn btn-primary btn-lg"
            >
              Start a Project

              <ArrowRight
                size={18}
              />
            </Link>


            <Link
              to="/work"
              className="btn btn-secondary btn-lg"
            >
              Explore Our Work
            </Link>

          </motion.div>


          <motion.button
            type="button"
            className="home-hero__reel-btn"
            variants={fadeUp}
          >

            <span className="home-hero__reel-icon">
              <Play
                size={13}
                fill="currentColor"
              />
            </span>

            Watch Showreel

          </motion.button>


        </motion.div>



        {/* HERO VISUAL SYSTEM PLACEHOLDER */}

        <motion.div
          className="home-hero__visual"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.92,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.2,
            ease: EASE,
            delay: 0.3,
          }}
        >

          <div className="home-hero__visual-card">

            <span>
              Strategy
            </span>

            <span>
              Design
            </span>

            <span>
              Storytelling
            </span>

          </div>

        </motion.div>


      </div>



      {/* TRUSTED BY */}

      <motion.div
        className="home-hero__trusted"
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 25,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 1,
        }}
      >

        <p>
          Trusted by ambitious brands
        </p>


        <div className="home-hero__logos">

          {TRUSTED_LOGOS.map((logo) => (

            <div
              className="home-hero__logo"
              key={logo.name}
            >

              <img
                src={logo.image}
                alt={logo.name}
                loading="lazy"
              />

            </div>

          ))}

        </div>


      </motion.div>




{/* ============================================================
    FLOATING MESSAGE SYSTEM
    Adds a premium "communication clarity" visual
============================================================ */}

<motion.div
  className="home-hero__system"
  initial={
    shouldReduceMotion
      ? false
      : {
          opacity: 0,
          y: 30,
        }
  }
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 1,
    delay: 0.8,
    ease: EASE,
  }}
>

  <div className="home-hero__system-header">

    <span className="home-hero__system-dot" />

    Communication System

  </div>


  <div className="home-hero__system-card">

    <span>
      Complex Idea
    </span>


    <div className="home-hero__system-line" />


    <strong>
      Clear Message
    </strong>


    <div className="home-hero__system-line" />


    <span className="active">
      People Understand
    </span>

  </div>


</motion.div>




{/* ============================================================
    SCROLL INDICATOR
============================================================ */}


<motion.div

  className="home-hero__scroll"

  initial={
    shouldReduceMotion
      ? false
      : {
          opacity:0,
        }
  }

  animate={{
    opacity:1,
  }}

  transition={{
    duration:.8,
    delay:1.5,
  }}

>


  <span>
    Scroll
  </span>


  <div className="home-hero__scroll-line">

    <motion.span

      animate={
        shouldReduceMotion
          ? undefined
          : {
              y:[
                "-100%",
                "100%"
              ],
            }
      }

      transition={{
        duration:2,
        repeat:Infinity,
        ease:"easeInOut",
      }}

    />

  </div>


</motion.div>

    </section>
  );
}