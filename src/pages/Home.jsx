// src\pages\Home.jsx

import Hero from "../components/home/HomeHero";
import WorkGrid from "../components/WorkGrid";
import TrustedBy from "../components/home/TrustedBy";
import ProblemSection from "../components/home/ProblemSection";
import ClaritySection from "../components/home/ClaritySection";
import FeaturedWork from "../components/home/FeaturedWork"
import ServicesOverview from "../components/home/ServicesOverview";
import InsightSection from "../components/home/InsightSection";
import HomeCTA from "../components/home/HomeCTA";
import SiteFooter from "../components/layout/SiteFooter";
import Contact from "./Contact";

import "../styles/pages/home.css";

const Home = () => {
  



  return (
    <main
      
    >
      {/* =====================================================
          HERO
      ====================================================== */}
      <Hero />

      {/* =====================================================
          TRUSTED BY
      ====================================================== */}
      <TrustedBy />

      <ProblemSection/>

      <ClaritySection/>

      <FeaturedWork/>

      <ServicesOverview />

      <InsightSection/>

      <HomeCTA/>

     

    </main>
  );
};

export default Home;