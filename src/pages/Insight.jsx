// src\pages\Insight.jsx

// src/pages/Insight.jsx

import React from "react";

import InsightsHero from "../components/insights/InsightsHero";
import InsightsFeatured from "../components/insights/InsightsFeatured";
import InsightsCategories from "../components/insights/InsightCategories";
import InsightsGrid from "../components/insights/InsightsGrid";
import InsightsCTA from "../components/insights/insightCTA";


export default function Insight() {
  return (
    <main className="insights-page">

      {/* =====================================================
          SECTION 01
          Editorial Hero
      ====================================================== */}

      <InsightsHero />


      {/* =====================================================
          SECTION 02
          Featured Insight
      ====================================================== */}

      <InsightsFeatured />


      {/* =====================================================
          SECTION 03
          Insight Categories
      ====================================================== */}

      <InsightsCategories />


      {/* =====================================================
          SECTION 04
          Insight Archive Grid
      ====================================================== */}

      <InsightsGrid />


      {/* =====================================================
          SECTION 05
          Conversation CTA
      ====================================================== */}

      <InsightsCTA />


    </main>
  );
}