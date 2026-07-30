// src/pages/About.jsx

// src/pages/About.jsx
// src/pages/About.jsx
// src/pages/About.jsx

import AboutHero from "../components/about/AboutHero";
import AboutBelief from "../components/about/AboutBelief";
import AboutThinking from "../components/about/AboutThinking";
import AboutStudio from "../components/about/AboutStudio";
import AboutCTA from "../components/about/AboutCTA";

import "../styles/pages/about.css";


const About = () => {

  return (

    <main className="about-page">

      {/* 
        SECTION 01
        Introduction / Brand philosophy
      */}
      <AboutHero />


      {/*
        SECTION 02
        What we believe
      */}
      <AboutBelief />


      {/*
        SECTION 03
        Internal thinking / principles
        Dark emotional section
      */}
      <AboutThinking />


      {/*
        SECTION 04
        Studio disciplines
      */}
      <AboutStudio />


      {/*
        SECTION 05
        Final conversation section
      */}
      <AboutCTA />

    </main>

  );

};


export default About;